from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import Admin
from schemas.adminSchema import AdminCreate, AdminLogin, AdminResponse
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

router = APIRouter(prefix="/admin", tags=["Admin"])

# Configuration JWT
SECRET_KEY = "votre_cle_secrete"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/register", response_model=AdminResponse)
def register_admin(admin: AdminCreate, db: Session = Depends(get_db)):
    db_admin = db.query(Admin).filter(Admin.email == admin.email).first()
    if db_admin:
        raise HTTPException(status_code=400, detail="Email déjà utilisé")
    
    hashed_password = get_password_hash(admin.mdp)
    new_admin = Admin(
        email=admin.email,
        mdp=hashed_password,
        note=admin.note,
        pdp=admin.pdp,
        nom_entp=admin.nom_entp
    )
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)
    return new_admin

@router.post("/login")
def login_admin(admin: AdminLogin, db: Session = Depends(get_db)):
    db_admin = db.query(Admin).filter(Admin.email == admin.email).first()
    if not db_admin or not verify_password(admin.mdp, db_admin.mdp):
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect")
    
    token = create_access_token(data={"sub": db_admin.email})
    return {"access_token": token, "token_type": "bearer"}
