from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# 1. URL Database (Ini akan membuat file 'sanctuary.db' di folder utama backend)
SQLALCHEMY_DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./sanctuary.db" # Default fallback
)

# Perbaikan untuk Render: 
# Render terkadang menggunakan format 'postgres://' di environment variable mereka.
# SQLAlchemy modern membutuhkan format 'postgresql://'.
if SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)

# 2. Membuat Engine
# connect_args={"check_same_thread": False} wajib untuk SQLite di FastAPI
if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    # Pengaturan khusus untuk SQLite
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
else:
    # Pengaturan untuk PostgreSQL/MySQL
    engine = create_engine(SQLALCHEMY_DATABASE_URL)

# 3. Membuat Session Factory (Pabrik Sesi)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. Membuat Base Class untuk Model-model kita nanti
Base = declarative_base()

# 5. Dependency (Fungsi untuk dipanggil di setiap endpoint agar mendapat sesi DB)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()