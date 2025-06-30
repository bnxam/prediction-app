# from pydantic import BaseModel, EmailStr
# from typing import Optional

# class AdminCreate(BaseModel):
#     email: EmailStr
#     mdp: str
#     note: Optional[str] = None
#     pdp: Optional[str] = None
#     nom_entp: Optional[str] = None

# class AdminLogin(BaseModel):
#     email: EmailStr
#     mdp: str

# class AdminResponse(BaseModel):
#     id: int
#     email: EmailStr
#     note: Optional[str]
#     pdp: Optional[str]
#     nom_entp: Optional[str]

#     class Config:
#         orm_mode = True
from pydantic import BaseModel, EmailStr
from typing import Optional

class AdminCreate(BaseModel):
    email: EmailStr
    mdp: str
    note: Optional[str] = None
    pdp: Optional[str] = None
    nom_entp: Optional[str] = None

class AdminLogin(BaseModel):
    email: EmailStr
    mdp: str

class AdminResponse(BaseModel):
    id: int
    email: EmailStr
    note: Optional[str]
    pdp: Optional[str]
    nom_entp: Optional[str]
    phone: Optional[str]
    address: Optional[str]

    class Config:
        orm_mode = True

class AdminUpdate(BaseModel):
    nom_entp: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    pdp: Optional[str] = None  # URL ou nom de fichier si tu veux gérer les images
    note: Optional[str] = None 
    class Config:
        orm_mode = True