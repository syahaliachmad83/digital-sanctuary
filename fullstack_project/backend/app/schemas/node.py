from pydantic import BaseModel

# Properties dasar
class NodeBase(BaseModel):
    endpoint: str
    traffic_type: str
    status: str = "Active"
    throughput: str

# Saat Create dari React (Data yang sama dengan dasar)
class NodeCreate(NodeBase):
    pass

# Saat Read dikirim ke React (Tambah ID dan Owner)
class NodeResponse(NodeBase):
    id: int
    owner_id: int

    class Config:
        from_attributes = True