# from fastapi import APIRouter, Depends, HTTPException, status
# from sqlalchemy.orm import Session
# from app.schemas.userSchema import UserCreate, UserUpdate, UserResponse
# from app import models
# from app.database import get_db
# from passlib.context import CryptContext
# from app.routers.auth import get_current_user
# from app.models.model import User
# # from app.models import User
#   # Tu dois avoir cette dépendance définie dans auth.py
# router = APIRouter(
#     prefix="/users",
#     tags=["users"]
# )

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# # ✅ Mettre cette route EN PREMIER
# @router.get("/me", response_model=UserResponse)
# async def get_current_user_data(current_user: User = Depends(get_current_user)):
#     return current_user
#     #modification des informations du client par lui meme 
# @router.put("/me", response_model=UserResponse)
# def update_current_user(
#     user_update: UserUpdate,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user)
# ):
#     update_data = user_update.dict(exclude_unset=True)

#     if "mdp" in update_data and update_data["mdp"]:
#         update_data["mdp"] = pwd_context.hash(update_data["mdp"])

#     for key, value in update_data.items():
#         setattr(current_user, key, value)

#     db.commit()
#     db.refresh(current_user)
#     return current_user

# # Create user
# @router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
# async def create_user(user: UserCreate, db: Session = Depends(get_db)):
#     # Vérifie si l'email existe déjà
#     if db.query(User).filter(User.email == user.email).first():
#         raise HTTPException(status_code=400, detail="Email déjà enregistré")

#     # Vérifie si le code client existe déjà
#     if db.query(User).filter(User.code_client == user.code_client).first():
#         raise HTTPException(status_code=400, detail="Code client déjà utilisé")

#     # Hash du mot de passe
#     hashed_password = pwd_context.hash(user.mdp)

#     # Création de l'utilisateur
#     db_user = User(
#         code_client=user.code_client,
#         nom=user.nom,
#         prenom=user.prenom,
#         adresse=user.adresse,
#         telephone=user.telephone,
#         date_naissance=user.date_naissance,
#         email=user.email,
#         mdp=hashed_password
#     )

#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user


# # Get all users
# # @router.get("/", response_model=list[UserResponse])
# # async def get_users(db: Session = Depends(get_db)):
# #     return db.query(User).all()
# @router.get("/", response_model=list[UserResponse])
# async def get_users(code_client: str = None, db: Session = Depends(get_db)):
#     if code_client:
#         return db.query(User).filter(User.code_client.ilike(f"%{code_client}%")).all()
#     return db.query(User).all()


# # Get user by ID
# @router.get("/{user_id}", response_model=UserResponse)
# async def get_user(user_id: int, db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.id == user_id).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
#     return user

# # Update user
# @router.put("/{user_id}", response_model=UserResponse)
# def update_user(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)):
#     db_user = db.query(User).filter(User.id == user_id).first()
#     if not db_user:
#         raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    
#     update_data = user_update.dict(exclude_unset=True)

#     if "mdp" in update_data and update_data["mdp"]:
#         update_data["mdp"] = pwd_context.hash(update_data["mdp"])

#     for key, value in update_data.items():
#         setattr(db_user, key, value)

#     db.commit()
#     db.refresh(db_user)
#     return db_user

# # # Delete user
# @router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
# async def delete_user(user_id: int, db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.id == user_id).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
#     db.delete(user)
#     db.commit()
#     return None

#     db.delete(user)
#     db.commit()
#     return None
 
# @router.get("/")
# async def test_users():
#     return {"message": "Route users active"}
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.userSchema import UserCreate, UserUpdate, UserResponse
from app import models
from app.database import get_db
from passlib.context import CryptContext
from app.routers.auth import get_current_user
from app.models.model import User ,Consommation
# from app.models import User
  # Tu dois avoir cette dépendance définie dans auth.py
router = APIRouter(
    prefix="/users",
    tags=["users"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# ✅ Mettre cette route EN PREMIER
@router.get("/me", response_model=UserResponse)
async def get_current_user_data(current_user: User = Depends(get_current_user)):
    return current_user
    #modification des informations du client par lui meme 
@router.put("/me", response_model=UserResponse)
def update_current_user(
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    update_data = user_update.dict(exclude_unset=True)

    if "mdp" in update_data and update_data["mdp"]:
        update_data["mdp"] = pwd_context.hash(update_data["mdp"])

    for key, value in update_data.items():
        setattr(current_user, key, value)

    db.commit()
    db.refresh(current_user)
    return current_user

# Create user
@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Vérifie si l'email existe déjà
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email déjà enregistré")

    # Vérifie si le code client existe déjà
    if db.query(User).filter(User.code_client == user.code_client).first():
        raise HTTPException(status_code=400, detail="Code client déjà utilisé")

    # Hash du mot de passe
    hashed_password = pwd_context.hash(user.mdp)

    # Création de l'utilisateur
    db_user = User(
        code_client=user.code_client,
        nom=user.nom,
        prenom=user.prenom,
        adresse=user.adresse,
        telephone=user.telephone,
        date_naissance=user.date_naissance,
        email=user.email,
        mdp=hashed_password
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    if user.consommations:
        for conso in user.consommations:
            db_cons = Consommation(
                valeur=conso.valeur,
                date=conso.date,
                client_id=db_user.id
            )
            db.add(db_cons)
        db.commit()

    return db_user


# Get all users
# @router.get("/", response_model=list[UserResponse])
# async def get_users(db: Session = Depends(get_db)):
#     return db.query(User).all()
@router.get("/", response_model=list[UserResponse])
async def get_users(code_client: str = None, db: Session = Depends(get_db)):
    if code_client:
        return db.query(User).filter(User.code_client.ilike(f"%{code_client}%")).all()
    return db.query(User).all()


# Get user by ID
# @router.get("/{user_id}", response_model=UserResponse)
# async def get_user(user_id: int, db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.id == user_id).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
#     return user

@router.get("/{user_id}")
async def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    
    # Récupère les consommations associées
    consommations = db.query(Consommation).filter(Consommation.client_id == user_id).all()
    
    grouped_data = []  # Liste pour stocker les résultats groupés
    s = 0              # Compteur de groupes
    i = 0              # Index de départ
    
    while i < len(consommations):
        # Initialiser la somme pour ce groupe
        somme_valeur = 0
        
        # Prendre la date du premier élément du groupe
        date_groupe = consommations[i].date.isoformat()
        
        # Somme des 3 valeurs consécutives (ou moins si fin de liste)
        for j in range(i, min(i + 3, len(consommations))):
            somme_valeur += consommations[j].valeur
        
        # Ajouter le groupe au résultat
        grouped_data.append({
            "date": date_groupe,
            "valeur": somme_valeur
        })
        
        # Passer au prochain groupe de 3
        i += 3
        s += 1
    
    return {
        **user.__dict__,
        "data": grouped_data
    }
    # return {
    #     **user.__dict__,
    #     "data": [{"date": c.date.isoformat(), "valeur": c.valeur} for c in consommations]
    # }

# Update user
@router.put("/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    
    update_data = user_update.dict(exclude_unset=True)

    if "mdp" in update_data and update_data["mdp"]:
        update_data["mdp"] = pwd_context.hash(update_data["mdp"])

    for key, value in update_data.items():
        setattr(db_user, key, value)

    db.commit()
    db.refresh(db_user)
    return db_user
@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
    db.delete(user)
    db.commit()
    return None

    db.delete(user)
    db.commit()
    return None
 
