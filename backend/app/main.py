# # from fastapi import FastAPI, Depends
# # from sqlalchemy.orm import Session
# # from app.database import engine, get_db, Base
# # from app.models.user import User

# # # Créer les tables
# # Base.metadata.create_all(bind=engine)

# # app = FastAPI()

# # @app.get("/")
# # def read_root():
# #     return {"message": "API is running!"}

# # @app.get("/users")
# # def get_users(db: Session = Depends(get_db)):
# #     users = db.query(User).all()
# #     return users
# from fastapi import FastAPI, Depends, HTTPException
# from sqlalchemy.orm import Session
# from . import models, schemas
# from .database import SessionLocal, engine

# models.Base.metadata.create_all(bind=engine)

# app = FastAPI()

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# @app.post("/utilisateur/", response_model=schemas.UtilisateurResponse)
# def creer_utilisateur(utilisateur: schemas.UtilisateurCreate, db: Session = Depends(get_db)):
#     db_user = models.Utilisateur(**utilisateur.dict())
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user

# @app.put("/utilisateur/{user_id}", response_model=schemas.UtilisateurResponse)
# def modifier_utilisateur(user_id: int, utilisateur: schemas.UtilisateurUpdate, db: Session = Depends(get_db)):
#     db_user = db.query(models.Utilisateur).filter(models.Utilisateur.id == user_id).first()
#     if not db_user:
#         raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

#     for key, value in utilisateur.dict(exclude_unset=True).items():
#         setattr(db_user, key, value)

#     db.commit()
#     db.refresh(db_user)
#     return db_user

from fastapi import FastAPI
from app.routers import users
from app.database import engine
from app.models import user

# Création des tables
user.Base.metadata.create_all(bind=engine)

# Instance FastAPI
app = FastAPI()

# Inclusion des routes
app.include_router(users.router)

