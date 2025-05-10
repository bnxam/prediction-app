from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.database import engine, get_db, Base
from app.models.user import User

# Créer les tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "API is running!"}

@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users
