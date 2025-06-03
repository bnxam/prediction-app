from pydantic import BaseModel, EmailStr

class AdminLogin(BaseModel):
    email: EmailStr
    mdp: str

class AdminCreate(BaseModel):
    nom: str
    email: EmailStr
    mdp: str

class AdminResponse(BaseModel):
    id: int
    nom: str
    email: EmailStr

    class Config:
        orm_mode = True
