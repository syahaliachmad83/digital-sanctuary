from sqlalchemy import Column, Integer, String, ForeignKey
from app.db.session import Base

class Node(Base):
    __tablename__ = "nodes"

    id = Column(Integer, primary_key=True, index=True)
    endpoint = Column(String, index=True, nullable=False) # Contoh: "Tokyo-Alpha-Node"
    traffic_type = Column(String, nullable=False)         # Contoh: "Encrypted HTTPS"
    status = Column(String, default="Active")             # Contoh: "Active"
    throughput = Column(String, nullable=False)           # Contoh: "1.2 TB/d"
    
    # Relasi: Node ini milik siapa? (Menyambung ke ID di tabel users)
    owner_id = Column(Integer, ForeignKey("users.id"))