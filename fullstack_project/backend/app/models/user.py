from sqlalchemy import Column, Integer, String, Boolean
from app.db.session import Base

class User(Base):
    __tablename__ = "users" # Nama tabel di database

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="User")
    is_active = Column(Boolean, default=True)
    
    # Metrik tambahan untuk Dashboard "Digital Sanctuary" kita
    nodes_protected = Column(Integer, default=0)
    integrity_score = Column(Integer, default=100)