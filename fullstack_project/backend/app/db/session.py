from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# 1. URL Database (Ini akan membuat file 'sanctuary.db' di folder utama backend)
SQLALCHEMY_DATABASE_URL = "sqlite:///./sanctuary.db"

# 2. Membuat Engine
# connect_args={"check_same_thread": False} wajib untuk SQLite di FastAPI
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

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