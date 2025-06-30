# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from passlib.context import CryptContext
# from jose import jwt
# from datetime import datetime, timedelta

# from app.database import get_db
# from app.models import Admin
# from app.schemas import adminSchemas as schemas  # adapte selon ton arborescence
# from fastapi.security import OAuth2PasswordBearer
# from fastapi import status
# router = APIRouter(prefix="/admin", tags=["admin"])

# # JWT et sécurité
# SECRET_KEY = "admin-secret-key"  # À sécuriser via .env
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 365  # 1 an aussi

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# def create_access_token(data: dict, expires_delta: timedelta = None):
#     to_encode = data.copy()
#     expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
#     to_encode.update({"exp": expire})
#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# @router.post("/register", response_model=schemas.AdminResponse)
# def register(admin: schemas.AdminCreate, db: Session = Depends(get_db)):
#     existing = db.query(Admin).filter(Admin.email == admin.email).first()
#     if existing:
#         raise HTTPException(status_code=400, detail="Cet administrateur existe déjà.")
    
#     hashed_mdp = pwd_context.hash(admin.mdp)
#     new_admin = Admin(
#         email=admin.email,
#         mdp=hashed_mdp,
#         note=admin.note,
#         pdp=admin.pdp,
#         nom_entp=admin.nom_entp
#     )
#     db.add(new_admin)
#     db.commit()
#     db.refresh(new_admin)
#     return new_admin


# @router.post("/login")
# def login(admin: schemas.AdminLogin, db: Session = Depends(get_db)):
#     db_admin = db.query(Admin).filter(Admin.email == admin.email).first()
#     if not db_admin or not pwd_context.verify(admin.mdp, db_admin.mdp):
#         raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect.")
    
#     token = create_access_token(data={"sub": db_admin.email, "role": "admin"})
#     return {"access_token": token, "token_type": "bearer"}
# oauth2_scheme_admin = OAuth2PasswordBearer(tokenUrl="/admin/login")

# def get_current_admin(token: str = Depends(oauth2_scheme_admin)):
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         if payload.get("role") != "admin":
#             raise HTTPException(
#                 status_code=status.HTTP_403_FORBIDDEN,
#                 detail="Non autorisé."
#             )
#         return payload
#     except jwt.JWTError:
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Token invalide."
#         )

# @router.get("/profile")
# def read_admin_profile(current_admin: dict = Depends(get_current_admin)):
#     return {"message": f"Bienvenue, administrateur {current_admin['sub']}"}

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

from app.database import get_db
from app.models import Admin
from app.schemas import adminSchemas as schemas  # adapte selon ton arborescence
from fastapi.security import OAuth2PasswordBearer
from fastapi import status
# pour la modification du  mot de passe 
from pydantic import BaseModel

router = APIRouter(prefix="/admin", tags=["admin"])

# JWT et sécurité
SECRET_KEY = "admin-secret-key"  # À sécuriser via .env
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 365  # 1 an aussi

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


@router.post("/register", response_model=schemas.AdminResponse)
def register(admin: schemas.AdminCreate, db: Session = Depends(get_db)):
    existing = db.query(Admin).filter(Admin.email == admin.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Cet administrateur existe déjà.")
    
    hashed_mdp = pwd_context.hash(admin.mdp)
    new_admin = Admin(
        email=admin.email,
        mdp=hashed_mdp,
        note=admin.note,
        pdp=admin.pdp,
        nom_entp=admin.nom_entp
    )
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)
    return new_admin


@router.post("/login")
def login(admin: schemas.AdminLogin, db: Session = Depends(get_db)):
    db_admin = db.query(Admin).filter(Admin.email == admin.email).first()
    if not db_admin or not pwd_context.verify(admin.mdp, db_admin.mdp):
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect.")
    
    token = create_access_token(data={"sub": db_admin.email, "role": "admin"})
    return {"access_token": token, "token_type": "bearer"}
oauth2_scheme_admin = OAuth2PasswordBearer(tokenUrl="/admin/login")

# def get_current_admin(token: str = Depends(oauth2_scheme_admin)):
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         if payload.get("role") != "admin":
#             raise HTTPException(
#                 status_code=status.HTTP_403_FORBIDDEN,
#                 detail="Non autorisé."
#             )
#         return payload
#     except jwt.JWTError:
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN,
#             detail="Token invalide."
#         )
def get_current_admin(token: str = Depends(oauth2_scheme_admin), db: Session = Depends(get_db)) -> Admin:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("role") != "admin":
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Non autorisé.")

        email = payload.get("sub")
        admin = db.query(Admin).filter(Admin.email == email).first()
        if not admin:
            raise HTTPException(status_code=404, detail="Administrateur introuvable.")
        return admin
    except jwt.JWTError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Token invalide.")

# @router.get("/profile")
# def read_admin_profile(current_admin: dict = Depends(get_current_admin)):
#     return {"message": f"Bienvenue, administrateur {current_admin['sub']}"}
@router.get("/profile", response_model=schemas.AdminResponse)
def read_admin_profile(current_admin: Admin = Depends(get_current_admin)):
    return current_admin

    # la modification des inormation de l'admin 
@router.put("/profile", response_model=schemas.AdminResponse)
def update_admin_profile(
    update_data: schemas.AdminUpdate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    if update_data.email:
        current_admin.email = update_data.email
    if update_data.nom_entp:
        current_admin.nom_entp = update_data.nom_entp
    if update_data.phone:
        current_admin.phone = update_data.phone
    if update_data.address:
        current_admin.address = update_data.address
    if update_data.pdp:
        current_admin.pdp = update_data.pdp
    if update_data.note:
        current_admin.note = update_data.note

    db.commit()
    db.refresh(current_admin)
    return current_admin

    # la photo de profil
from fastapi import File, UploadFile
import shutil
import os

UPLOAD_DIR = "app/uploads"  # tu peux choisir un autre dossier

@router.post("/upload-photo")
def upload_photo(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    filename = f"admin_{current_admin.id}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    # Créer le dossier s'il n'existe pas
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Enregistrer le chemin dans la base
    current_admin.pdp = filename
    db.commit()
    db.refresh(current_admin)

    return {"filename": filename}

class PasswordChangeRequest(BaseModel):
    current_password: str
    new_password: str

@router.put("/change-password")
def change_password(
    data: PasswordChangeRequest,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    # Vérification de l’ancien mot de passe
    if not pwd_context.verify(data.current_password, current_admin.mdp):
        raise HTTPException(status_code=400, detail="Ancien mot de passe incorrect.")

    # Mise à jour avec le nouveau mot de passe
    hashed_new_password = pwd_context.hash(data.new_password)
    current_admin.mdp = hashed_new_password
    db.commit()

    return {"message": "Mot de passe mis à jour avec succès"}