# from fastapi import FastAPI
# from app.routers import users
# from app.database import engine
# from app.models import user

# # # Création des tables
# user.Base.metadata.create_all(bind=engine)
# # # Instance FastAPI
# # app = FastAPI()

# # # Inclusion des routes
# # app.include_router(users.router)

# from fastapi import FastAPI, Depends, HTTPException
# from sqlalchemy.orm import Session
# # from . import models, schemas
# # from .database import SessionLocal, engine
# from app.routers import prediction
# from app.database import SessionLocal, engine
#    # si tu exécutes sans structure de package
# from fastapi.middleware.cors import CORSMiddleware
# import uvicorn 

# from app.routers import users
# app.include_router(users.router)

# # models.Base.metadata.create_all(bind=engine)

# app = FastAPI()
# app.include_router(prediction.router)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],  # ou "*" temporairement
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)

# from fastapi import FastAPI, Depends, HTTPException
# from sqlalchemy.orm import Session
# from app.routers import users, prediction, auth
# from app.database import SessionLocal, engine
# from fastapi.middleware.cors import CORSMiddleware
# import uvicorn
# from app.models import user


# # Création des tables à partir des modèles
# user.Base.metadata.create_all(bind=engine)

# # Création de l'application FastAPI
# app = FastAPI()

# # Middleware CORS (React communique avec FastAPI)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],  # ou "*" temporairement
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Inclusion des routes utilisateurs et prédictions
# app.include_router(users.router)
# app.include_router(prediction.router)
# app.include_router(auth.router) 
# # Fonction pour récupérer la session DB
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# # Lancement du serveur si ce fichier est exécuté directement
# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)
# from fastapi import FastAPI
# from app.routers import users, prediction, auth
# from app.database import SessionLocal, engine
# from app.models.user import Base  # Ou depuis app.models si centralisé
# from fastapi.middleware.cors import CORSMiddleware
# import uvicorn
# from app.routers import auth

# # Création des tables à partir des modèles
# Base.metadata.create_all(bind=engine)

# # Création de l'application FastAPI
# app = FastAPI(
#     title="API Client Prediction",
#     version="1.0.0",
#     description="API pour la gestion des utilisateurs et des prédictions"
# )

# # Middleware CORS (React communique avec FastAPI)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],  # Autorise le frontend React
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Inclusion des routes
# # app.include_router(auth.router)       # Authentification d'abord
# app.include_router(users.router)      # Routes utilisateurs
# app.include_router(prediction.router) # Routes prédictions
# app.include_router(auth.router, prefix="/auth")


# # Lancement du serveur si exécuté directement
# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)
from fastapi import FastAPI
from app.routers import users, prediction, auth
from app.database import engine
from app.models.user import Base
from fastapi.middleware.cors import CORSMiddleware
import uvicorn


# Création des tables
Base.metadata.create_all(bind=engine)

# App FastAPI
app = FastAPI(
    title="API Client Prediction",
    version="1.0.0",
    description="API pour la gestion des utilisateurs et des prédictions"
)

# CORS pour React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(auth.router, prefix="/auth")  # Seulement cette ligne
app.include_router(users.router)
app.include_router(prediction.router)
# app.include_router(admin.router)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
