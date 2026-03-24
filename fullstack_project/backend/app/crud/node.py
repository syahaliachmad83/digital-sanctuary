from sqlalchemy.orm import Session
from app.models.node import Node
from app.schemas.node import NodeCreate

def get_nodes_by_user(db: Session, user_id: int):
    """Mengambil semua node milik user tertentu"""
    return db.query(Node).filter(Node.owner_id == user_id).all()

def create_node(db: Session, node: NodeCreate, user_id: int):
    """Membuat node baru untuk user tertentu"""
    db_node = Node(**node.model_dump(), owner_id=user_id)
    db.add(db_node)
    db.commit()
    db.refresh(db_node)
    return db_node

def delete_node(db: Session, node_id: int, user_id: int):
    """Menghapus node (hanya jika node itu milik user yang sedang login)"""
    db_node = db.query(Node).filter(Node.id == node_id, Node.owner_id == user_id).first()
    if db_node:
        db.delete(db_node)
        db.commit()
    return db_node