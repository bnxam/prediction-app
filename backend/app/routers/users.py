from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.userSchema import UserCreate, UserUpdate, UserResponse 
from app import models
from app.database import get_db
from passlib.context import CryptContext
from app.routers.auth import get_current_user
from app.models.model import User ,Consommation
from app.routers.prediction import predict_lstm
import math

# from app.models import User
  # Tu dois avoir cette dépendance définie dans auth.py
router = APIRouter(
    prefix="/users",
    tags=["users"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# ✅ Mettre cette route EN PREMIER

def clean_data(data):
    for item in data:
        if "valeur" in item and (item["valeur"] is not None):
            if math.isnan(item["valeur"]) or math.isinf(item["valeur"]):
                item["valeur"] = None
    return data
@router.get("/me", response_model=UserResponse)
async def get_current_user_data(current_user: User = Depends(get_current_user)):
    return current_user
    #modification des informations du client par lui meme 
# dihya cote client 
@router.get("/me/data")
async def get_my_data(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    consommations = db.query(Consommation).filter(Consommation.client_id == current_user.id).all()

    grouped_data = []
    s = 0
    i = 0

    while i < len(consommations):
        somme_valeur = 0
        date_groupe = consommations[i].date.isoformat()

        for j in range(i, min(i + 3, len(consommations))):
            if consommations[j].valeur is not None:
                somme_valeur += consommations[j].valeur

        if somme_valeur == 0:
            grouped_data.append({
                "date": date_groupe,
                "valeur": None
            })
        else:
            grouped_data.append({
                "date": date_groupe,
                "valeur": somme_valeur
            })

        i += 3
        s += 1

    grouped_data = clean_data(grouped_data)
    predictions = predict_lstm(grouped_data, 4)
    predictions = clean_data(predictions)

    return {
        "data": grouped_data,
        "predictions": predictions
    }


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
    
    mdp_from_date = user.date_naissance.strftime("%d%m%Y") 
    # Hash du mot de passe
    hashed_password = pwd_context.hash(mdp_from_date)

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
            print(conso.valeur)
            print(conso.date)
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
            if consommations[j].valeur is not None:
                somme_valeur += consommations[j].valeur
        
        # Ajouter le groupe au résultat
        # grouped_data.append({
        #     "date": date_groupe,
        #     "valeur": somme_valeur
        # })

        if somme_valeur == 0:
            grouped_data.append({
                "date": date_groupe,
                "valeur": None
            })
        else:
            grouped_data.append({
                "date": date_groupe,
                "valeur": somme_valeur
            })
        
        # Passer au prochain groupe de 3
        i += 3
        s += 1
    predictions = predict_lstm(grouped_data,4)

    grouped_data = clean_data(grouped_data)
    predictions = clean_data(predictions)
    return {
        **user.__dict__,
        "data": grouped_data,
        "predictions": predictions
    }

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
    
    # Supprime d'abord les consommations associées
    db.query(Consommation).filter(Consommation.client_id == user_id).delete()
    
    # Puis supprime l'utilisateur
    db.delete(user)
    db.commit()
    return None
# @router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
# async def delete_user(user_id: int, db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.id == user_id).first()
#     if not user:
#         raise HTTPException(status_code=404, detail="Utilisateur non trouvé")
#     db.delete(user)
#     db.commit()
#     return None

