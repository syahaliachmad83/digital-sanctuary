from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import get_password_hash
from app.schemas.user import UserUpdate

def get_user_by_email(db: Session, email: str):
    """Mencari user di database berdasarkan email."""
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate):
    """Membuat user baru dan menyimpannya ke database."""
    # 1. Hash password sebelum masuk database!
    hashed_password = get_password_hash(user.password)
    
    # 2. Buat objek model SQLAlchemy
    db_user = User(email=user.email, hashed_password=hashed_password)
    
    # 3. Simpan ke database
    db.add(db_user)
    db.commit()
    db.refresh(db_user) # Ambil data terbaru (termasuk ID yang di-generate otomatis)
    return db_user

def get_all_users(db: Session):
    """Mengambil daftar semua user di database"""
    return db.query(User).all()

def update_user(db: Session, user_id: int, user_update: UserUpdate):
    """Mengupdate data user yang ada"""
    db_user = db.query(User).filter(User.id == user_id).first()
    
    if not db_user:
        return None
        
    # Hanya update field yang dikirim dari React
    if user_update.email:
        db_user.email = user_update.email
    if user_update.role:
        db_user.role = user_update.role
    if user_update.password:
        # Jangan lupa di-hash ulang jika password diganti!
        db_user.hashed_password = get_password_hash(user_update.password)
        
    db.commit()
    db.refresh(db_user)
    return db_user