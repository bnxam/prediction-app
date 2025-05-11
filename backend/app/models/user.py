from sqlalchemy import Column, Integer, String
from ..database import Base  # Import depuis le package models

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String(50), nullable=False)
    email = Column(String(50), unique=True, nullable=False)
    mdp = Column(String(255), nullable=False)