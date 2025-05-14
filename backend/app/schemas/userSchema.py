# from pydantic import BaseModel, EmailStr

# class UserBase(BaseModel):
#     email: EmailStr

# class UserCreate(UserBase):
#     nom: str
#     mdp: str

# class UserUpdate(BaseModel):
#     nom: str | None = None
#     email: EmailStr | None = None
#     mdp: str | None = None

# class UserResponse(UserBase):
#     id: int
#     nom: str

#     class Config:
#         from_attributes = True

from typing import Optional
from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    nom: str
    mdp: str

class UserUpdate(BaseModel):
    nom: Optional[str] = None
    email: Optional[EmailStr] = None
    mdp: Optional[str] = None

class UserResponse(UserBase):
    id: int
    nom: str

    class Config:
        from_attributes = True
