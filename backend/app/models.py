from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, func 
from sqlalchemy.orm import relationship
from app.database import Base


class Personne(Base):
    __tablename__ = 'personne'

    id = Column(Integer, primary_key=True)
    email = Column(String)
    mdp = Column(String)
    note = Column(String)
    pdp = Column(String)

    typeP = Column(String)  # Discriminant

    __mapper_args__ = {
        'polymorphic_identity': 'personne',
        'polymorphic_on': typeP
    }

class Admin(Base):
    __tablename__ = "admin"

    id = Column(Integer, ForeignKey('personne.id'), primary_key=True)
    nom_entp = Column(String)

    __mapper_args__ = {
        'polymorphic_identity': 'admin'
    }


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, ForeignKey('personne.id'), primary_key=True)
    code_client= Column(String, unique=True, index=True , nullable=False)
    nom = Column(String)
    prenom = Column(String)
    adresse = Column(String)
    date_naissance = Column(Date)
    telephone = Column(String)
    typeC = Column(String)

    __mapper_args__ = {
        'polymorphic_identity': 'client'
    }

    consommations = relationship("Consommation", back_populates="client")


class Consommation(Base):
    __tablename__ = "consommation"

    id = Column(Integer, primary_key=True, index=True)
    valeur = Column(Float)
    date = Column(Date)

    client_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    client = relationship("User", back_populates="consommations")


class Prediction(Base):
    __tablename__ = "prediction"

    id = Column(Integer, primary_key=True, index=True)
    titre = Column(String)
    period = Column(Integer)
    date_cree = Column(Date, default=func.current_date())
    typeC = Column(String)
    
    modele_id = Column(Integer, ForeignKey("modele.id"))
    modele = relationship("Modele", back_populates="predictions")

    points = relationship("PointPredit", back_populates="prediction",cascade="all, delete-orphan")



class PointPredit(Base):
    __tablename__ = "point_predit"

    id = Column(Integer, primary_key=True, index=True)
    dateP = Column(Date)
    valeur_predite = Column(Float)
    
    prediction_id = Column(Integer, ForeignKey("prediction.id"), nullable=False)
    prediction = relationship("Prediction", back_populates="points")


class Modele(Base):
    __tablename__ = "modele"

    id = Column(Integer, primary_key=True, index=True)
    mape = Column(Float)
    typeM = Column(String)
    
    predictions = relationship("Prediction", back_populates="modele", cascade="all, delete-orphan")


    __mapper_args__ = {
        'polymorphic_identity': 'modele',
        'polymorphic_on': typeM
    }



class ModeleDeepLearning(Base):
    __tablename__ = "modele_deep_learning"

    id = Column(Integer, ForeignKey('modele.id'), primary_key=True)
    epochs = Column(Float)
    batch_size = Column(Integer)
    unitsC1 = Column(Integer)
    unitsC2 = Column(Integer)
    seq_length = Column(Integer)

    __mapper_args__ = {
        'polymorphic_identity': 'deeplearning'
    }

class ModeleStatique(Base):
    __tablename__ = "modele_statique"

    id = Column(Integer, ForeignKey('modele.id'), primary_key=True)
    p = Column(Integer)
    d = Column(Integer)
    q = Column(Integer)

    sarima = relationship("Sarima", uselist=False, backref="modele_statique")

    __mapper_args__ = {
        'polymorphic_identity': 'arima'
    }

class Sarima(Base):
    __tablename__ = "sarima"

    id = Column(Integer, ForeignKey('modele_statique.id'), primary_key=True)
    s = Column(Integer)
    P = Column(Integer)
    D = Column(Integer)
    Q = Column(Integer)

    __mapper_args__ = {
        'polymorphic_identity': 'sarima'
    }