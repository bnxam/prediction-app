# # from pydantic import BaseModel, EmailStr

# # class UserBase(BaseModel):
# #     email: EmailStr

# # class UserCreate(UserBase):
# #     nom: str
# #     mdp: str

# # class UserUpdate(BaseModel):
# #     nom: str | None = None
# #     email: EmailStr | None = None
# #     mdp: str | None = None

# # class UserResponse(UserBase):
# #     id: int
# #     nom: str

# #     class Config:
# #         from_attributes = True

# from typing import Optional
# from pydantic import BaseModel, EmailStr

# class UserBase(BaseModel):
#     email: EmailStr

# class UserCreate(UserBase):
#     nom: str
#     mdp: str

# class UserUpdate(BaseModel):
#     nom: Optional[str] = None
#     email: Optional[EmailStr] = None
#     mdp: Optional[str] = None

# class UserResponse(UserBase):
#     id: int
#     nom: str

#     class Config:
#         from_attributes = True
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date
from typing import List

class ConsommationCreate(BaseModel):
    valeur: float
    date: date
    
class ConsommationGroupeeResponse(BaseModel):
    date: date
    valeur: float

class ConsommationResponse(BaseModel):
    id: int
    client_id: int

    class Config:
        from_attributes = True  

class UserCreate(BaseModel):
    code_client: str  
    nom: str
    prenom: str
    adresse: str
    telephone: str
    date_naissance: date
    email: EmailStr
    mdp: str
    consommations: List[ConsommationCreate]


class UserResponse(BaseModel):
    id: int
    code_client: str  
    nom: str
    prenom: str
    adresse: str
    telephone: str
    date_naissance: date
    email: EmailStr
    data: List[ConsommationResponse] = []

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    code_client: Optional[str] = None  
    nom: Optional[str] = None
    prenom: Optional[str] = None
    adresse: Optional[str] = None
    telephone: Optional[str] = None
    date_naissance: Optional[date] = None
    email: Optional[EmailStr] = None
    mdp: Optional[str] = None

