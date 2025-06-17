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

def get_current_admin(token: str = Depends(oauth2_scheme_admin)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("role") != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Non autorisé."
            )
        return payload
    except jwt.JWTError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Token invalide."
        )

@router.get("/profile")
def read_admin_profile(current_admin: dict = Depends(get_current_admin)):
    return {"message": f"Bienvenue, administrateur {current_admin['sub']}"}