from pydantic import BaseModel, EmailStr
from typing import Optional


# Properti dasar yang sama saat membuat maupun membaca user
class UserBase(BaseModel):
    email: EmailStr

# Properti spesifik saat User dibuat (Butuh password plain-text)
class UserCreate(UserBase):
    password: str

# Properti spesifik saat User dikembalikan ke API (JANGAN tampilkan password!)
class UserResponse(UserBase):
    id: int
    role: str
    is_active: bool
    nodes_protected: int
    integrity_score: int

    class Config:
        # Pydantic v2: from_attributes menggantikan orm_mode
        from_attributes = True

# Skema khusus untuk Update User (Semua field opsional)
class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    role: Optional[str] = None
    password: Optional[str] = None