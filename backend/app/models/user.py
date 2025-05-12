# from sqlalchemy import Column, Integer, String
# from ..database import Base  # Import depuis le package models

# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     nom = Column(String(50), nullable=False)
#     email = Column(String(50), unique=True, nullable=False)
#     mdp = Column(String(255), nullable=False)

from sqlalchemy import Column, Integer, String, Float, Boolean, Date, ForeignKey, Table
from sqlalchemy.orm import relationship
from ..database import Base  # adapte le chemin selon ton projet

# Table d'association entre modèles et données
modeles_donnees = Table(
    "modeles_donnees",
    Base.metadata,
    Column("modele_id", Integer, ForeignKey("modeles.id")),
    Column("donnee_id", Integer, ForeignKey("donnees.id")),
)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String)
    email = Column(String, unique=True, index=True)
    mdp = Column(String)
    secteur = Column(String)
    photodeprofil = Column(String)

    dataset = relationship("Dataset", back_populates="user", uselist=False)
    modeles = relationship("Modele", back_populates="user")


class Dataset(Base):
    __tablename__ = "datasets"

    id = Column(Integer, primary_key=True, index=True)
    uniteX = Column(String)
    uniteY = Column(String)
    type = Column(String)

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="dataset")

    donnees = relationship("Donnee", back_populates="dataset", cascade="all, delete")


class Donnee(Base):
    __tablename__ = "donnees"

    id = Column(Integer, primary_key=True, index=True)
    x = Column(Float)
    y = Column(Float)

    dataset_id = Column(Integer, ForeignKey("datasets.id"))
    dataset = relationship("Dataset", back_populates="donnees")

    modeles = relationship("Modele", secondary=modeles_donnees, back_populates="donnees")


class Modele(Base):
    __tablename__ = "modeles"

    id = Column(Integer, primary_key=True, index=True)
    duree = Column(Float)
    taux_derreur = Column(Float)
    acheter = Column(Boolean)
    datedeprediction = Column(Date)

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="modeles")

    donnees = relationship("Donnee", secondary=modeles_donnees, back_populates="modeles")

    arima = relationship("Arima", back_populates="modele", cascade="all, delete", uselist=False)
    sarima = relationship("Sarima", back_populates="modele", cascade="all, delete", uselist=False)
    sarimax = relationship("Sarimax", back_populates="modele", cascade="all, delete", uselist=False)


class Arima(Base):
    __tablename__ = "arimas"

    id = Column(Integer, primary_key=True, index=True)
    p = Column(Float)
    q = Column(Float)
    d = Column(Integer)

    modele_id = Column(Integer, ForeignKey("modeles.id"))
    modele = relationship("Modele", back_populates="arima")


class Sarima(Base):
    __tablename__ = "sarimas"

    id = Column(Integer, primary_key=True, index=True)
    p = Column(Float)
    q = Column(Float)
    d = Column(Integer)
    P = Column(Float)
    Q = Column(Float)
    D = Column(Integer)
    s = Column(Integer)

    modele_id = Column(Integer, ForeignKey("modeles.id"))
    modele = relationship("Modele", back_populates="sarima")


class Sarimax(Base):
    __tablename__ = "sarimaxs"

    id = Column(Integer, primary_key=True, index=True)
    p = Column(Float)
    q = Column(Float)
    d = Column(Integer)
    P = Column(Float)
    Q = Column(Float)
    D = Column(Integer)
    s = Column(Integer)
    exo = Column(Float)

    modele_id = Column(Integer, ForeignKey("modeles.id"))
    modele = relationship("Modele", back_populates="sarimax")
