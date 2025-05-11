from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.userSchema import UserCreate, UserUpdate, UserResponse
from app.models.user import User
from app.database import get_db
from passlib.context import CryptContext

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Create user
@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email déjà enregistré")
    
    hashed_password = pwd_context.hash(user.mdp)
    db_user = User(nom=user.nom, email=user.email, mdp=hashed_password)
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Get all users
@router.get("/", response_model=list[UserResponse])
async def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

# Get user by ID
@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    return user

# Update user
@router.put("/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: int, 
    user_data: UserUpdate, 
    db: Session = Depends(get_db)
):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    
    if user_data.nom:
        db_user.nom = user_data.nom
    if user_data.email:
        db_user.email = user_data.email
    if user_data.mdp:
        db_user.mdp = pwd_context.hash(user_data.mdp)
    
    db.commit()
    db.refresh(db_user)
    return db_user

# Delete user
@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    
    db.delete(user)
    db.commit()
    return None