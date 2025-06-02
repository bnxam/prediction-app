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
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, SessionLocal
from app.routers import users, prediction

# 💡 Importe tous les modèles ici pour que SQLAlchemy les "voit"
from app import models

# ✅ Création des tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# # Inclusion des routes
# app.include_router(users.router)
# app.include_router(prediction.router)

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # ou "*" temporairement
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dépendance pour la BDD
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ⚙️ Lancement
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
