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

    class Config:
        orm_mode = True
