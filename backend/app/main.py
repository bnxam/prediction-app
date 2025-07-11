
# from fastapi import FastAPI
# from app.routers import users, prediction, auth
# from app.database import engine
# from app.models.model import Base
# # from app.models.models import Base 
# from fastapi.middleware.cors import CORSMiddleware
# import uvicorn

# from app.routers import admin  # adapte le chemin selon ta structure


# # Création des tables
# Base.metadata.create_all(bind=engine)

# # App FastAPI
# app = FastAPI(
#     title="API Client Prediction",
#     version="1.0.0",
#     description="API pour la gestion des utilisateurs et des prédictions"
# )

# # CORS pour React
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Routes
# # app.include_router(auth.router, prefix="/auth")  # Seulement cette ligne
# # app.include_router(users.router)
# # app.include_router(prediction.router)
# # app.include_router(admin.router)
# app.include_router(auth.router, prefix="/auth")      # /auth/login pour clients
# app.include_router(users.router, prefix="/users")    # /users/
# app.include_router(prediction.router, prefix="/pred")
# app.include_router(admin.router, prefix="/admin")    # /admin/login pour admin


# # # Dépendance pour la BDD
# # def get_db():
# #     db = SessionLocal()
# #     try:
# #         yield db
# #     finally:
# #         db.close()

# # ⚙️ Lancement
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from app.database import engine, SessionLocal
# from app.routers import users, prediction

# # 💡 Importe tous les modèles ici pour que SQLAlchemy les "voit"
# from app import models

# # ✅ Création des tables
# models.Base.metadata.create_all(bind=engine)

# app = FastAPI()



from fastapi import FastAPI
from app.routers import users, prediction, auth , dash , historique
from app.database import engine
from app.models.model import Base
# from app.models.models import Base 
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from app.routers import admin  
from fastapi.staticfiles import StaticFiles

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

app.mount("/uploads", StaticFiles(directory="app/uploads"), name="uploads")
# Routes

app.include_router(auth.router, prefix="/auth")
app.include_router(users.router)
app.include_router(prediction.router)
app.include_router(admin.router)
app.include_router(dash.router)
app.include_router(historique.router)

# # Dépendance pour la BDD
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# ⚙️ Lancement
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

    