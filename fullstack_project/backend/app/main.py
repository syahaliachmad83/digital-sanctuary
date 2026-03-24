from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from app.models import node as node_model
from app.crud import node as crud_node
from app.schemas import node as schema_node

# Import dari folder internal kita
from app.core.security import verify_password, create_access_token, SECRET_KEY, ALGORITHM
from app.db.session import engine, Base, get_db, SessionLocal
from app.models import user as user_model
from app.crud import user as crud_user
from app.schemas import user as schema_user

# 1. Bangun Tabel Database (Jika belum ada)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Digital Sanctuary API")

# 2. Konfigurasi CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/login/access-token")

# ==========================================
# DATABASE SEEDER (OTOMATIS BUAT ADMIN)
# ==========================================
def init_db():
    db = SessionLocal()
    # Cek apakah admin sudah ada di SQLite
    user = crud_user.get_user_by_email(db, email="admin@example.com")
    if not user:
        # Jika belum, buatkan otomatis!
        print("Menciptakan user Admin pertama kali di Database...")
        admin_user = schema_user.UserCreate(email="admin@example.com", password="rahasia123")
        crud_user.create_user(db, admin_user)
    db.close()

# Jalankan seeder saat file ini dibaca
init_db()

# ==========================================
# ENDPOINTS API (Terhubung ke SQLite)
# ==========================================

@app.post("/api/v1/login/access-token", summary="Dapatkan Token JWT")
def login_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db) # <-- Koneksi DB disuntikkan di sini
):
    # 1. Cari user DI DATABASE SUNGGUHAN
    user = crud_user.get_user_by_email(db, email=form_data.username)
    
    # 2. Verifikasi
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email atau password salah",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    # 3. Buat dan kembalikan Token JWT jika login sukses
    access_token = create_access_token(subject=user.email)
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/v1/users/register", response_model=schema_user.UserResponse, summary="Daftar User Baru")
def register_user(
    user: schema_user.UserCreate, 
    db: Session = Depends(get_db)
):
    """Endpoint untuk mendaftarkan user baru ke dalam SQLite."""
    # 1. Cek apakah email sudah terdaftar
    db_user = crud_user.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=400, 
            detail="Email sudah terdaftar di sistem Sanctuary."
        )
    
    # 2. Buat user baru menggunakan fungsi CRUD kita
    return crud_user.create_user(db, user)

# Fungsi Helper agar tidak perlu mengulang logika JWT di setiap endpoint
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token tidak valid atau sudah kedaluwarsa",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = crud_user.get_user_by_email(db, email=email)
    if user is None:
        raise credentials_exception
    return user

@app.get("/api/v1/users/me", response_model=schema_user.UserResponse, summary="Dapatkan Profil")
def read_users_me(current_user: user_model.User = Depends(get_current_user)):
    """
    Endpoint ini otomatis memanggil get_current_user untuk memverifikasi token 
    lalu mengembalikan data profil user yang sedang login.
    """
    return current_user
    
# ==========================================
# ENDPOINTS USER MANAGEMENT (CRUD)
# ==========================================

@app.get("/api/v1/users", response_model=list[schema_user.UserResponse])
def get_all_users_api(
    db: Session = Depends(get_db),
    current_user: user_model.User = Depends(get_current_user)
):
    """Mendapatkan daftar semua user"""
    # Pengecekan RBAC: Hanya Admin yang boleh melihat daftar pengguna
    if current_user.role != "Admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Akses ditolak: Hanya Admin.")
    return crud_user.get_all_users(db)

@app.put("/api/v1/users/{user_id}", response_model=schema_user.UserResponse)
def update_user_api(
    user_id: int,
    user_in: schema_user.UserUpdate,
    db: Session = Depends(get_db),
    current_user: user_model.User = Depends(get_current_user)
):
    """Mengedit role/email/password user"""
    # Pengecekan RBAC: Hanya Admin yang boleh mengubah data pengguna
    if current_user.role != "Admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Akses ditolak: Hanya Admin.")
    updated_user = crud_user.update_user(db, user_id, user_in)
    if not updated_user:
        raise HTTPException(status_code=404, detail="User tidak ditemukan")
    return updated_user

# ==========================================
# ENDPOINTS NODES (CRUD)
# ==========================================

@app.get("/api/v1/nodes", response_model=list[schema_node.NodeResponse])
def read_nodes(
    db: Session = Depends(get_db),
    current_user: user_model.User = Depends(get_current_user)
):
    """Mengambil daftar node milik user yang sedang login"""
    return crud_node.get_nodes_by_user(db, user_id=current_user.id)

@app.post("/api/v1/nodes", response_model=schema_node.NodeResponse)
def create_new_node(
    node: schema_node.NodeCreate,
    db: Session = Depends(get_db),
    current_user: user_model.User = Depends(get_current_user)
):
    """Menambah node baru"""
    return crud_node.create_node(db=db, node=node, user_id=current_user.id)

@app.delete("/api/v1/nodes/{node_id}")
def delete_existing_node(
    node_id: int,
    db: Session = Depends(get_db),
    current_user: user_model.User = Depends(get_current_user)
):
    """Menghapus node"""
    deleted_node = crud_node.delete_node(db=db, node_id=node_id, user_id=current_user.id)
    if not deleted_node:
        raise HTTPException(status_code=404, detail="Node tidak ditemukan atau Anda tidak memiliki akses")
    return {"message": "Node berhasil dihapus"}
