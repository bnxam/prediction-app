

# from sqlalchemy import Column, Integer, String, Float, Boolean, Date, ForeignKey, Table
# from sqlalchemy.orm import relationship
# from ..database import Base  # adapte le chemin selon ton projet

# # Table d'association entre modèles et données
# modeles_donnees = Table(
#     "modeles_donnees",
#     Base.metadata,
#     Column("modele_id", Integer, ForeignKey("modeles.id")),
#     Column("donnee_id", Integer, ForeignKey("donnees.id")),
# )

# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     nom = Column(String)
#     email = Column(String, unique=True, index=True)
#     mdp = Column(String)
#     secteur = Column(String)
#     photodeprofil = Column(String)

#     dataset = relationship("Dataset", back_populates="user", uselist=False)
#     modeles = relationship("Modele", back_populates="user")


# class Dataset(Base):
#     __tablename__ = "datasets"

#     id = Column(Integer, primary_key=True, index=True)
#     uniteX = Column(String)
#     uniteY = Column(String)
#     type = Column(String)

#     user_id = Column(Integer, ForeignKey("users.id"))
#     user = relationship("User", back_populates="dataset")

#     donnees = relationship("Donnee", back_populates="dataset", cascade="all, delete")


# class Donnee(Base):
#     __tablename__ = "donnees"

#     id = Column(Integer, primary_key=True, index=True)
#     x = Column(Float)
#     y = Column(Float)

#     dataset_id = Column(Integer, ForeignKey("datasets.id"))
#     dataset = relationship("Dataset", back_populates="donnees")

#     modeles = relationship("Modele", secondary=modeles_donnees, back_populates="donnees")


# class Modele(Base):
#     __tablename__ = "modeles"

#     id = Column(Integer, primary_key=True, index=True)
#     duree = Column(Float)
#     taux_derreur = Column(Float)
#     acheter = Column(Boolean)
#     datedeprediction = Column(Date)

#     user_id = Column(Integer, ForeignKey("users.id"))
#     user = relationship("User", back_populates="modeles")

#     donnees = relationship("Donnee", secondary=modeles_donnees, back_populates="modeles")

#     arima = relationship("Arima", back_populates="modele", cascade="all, delete", uselist=False)
#     sarima = relationship("Sarima", back_populates="modele", cascade="all, delete", uselist=False)
#     sarimax = relationship("Sarimax", back_populates="modele", cascade="all, delete", uselist=False)


# class Arima(Base):
#     __tablename__ = "arimas"

#     id = Column(Integer, primary_key=True, index=True)
#     p = Column(Float)
#     q = Column(Float)
#     d = Column(Integer)

#     modele_id = Column(Integer, ForeignKey("modeles.id"))
#     modele = relationship("Modele", back_populates="arima")


# class Sarima(Base):
#     __tablename__ = "sarimas"

#     id = Column(Integer, primary_key=True, index=True)
#     p = Column(Float)
#     q = Column(Float)
#     d = Column(Integer)
#     P = Column(Float)
#     Q = Column(Float)
#     D = Column(Integer)
#     s = Column(Integer)

#     modele_id = Column(Integer, ForeignKey("modeles.id"))
#     modele = relationship("Modele", back_populates="sarima")


# class Sarimax(Base):
#     __tablename__ = "sarimaxs"

#     id = Column(Integer, primary_key=True, index=True)
#     p = Column(Float)
#     q = Column(Float)
#     d = Column(Integer)
#     P = Column(Float)
#     Q = Column(Float)
#     D = Column(Integer)
#     s = Column(Integer)
#     exo = Column(Float)

#     modele_id = Column(Integer, ForeignKey("modeles.id"))
#     modele = relationship("Modele", back_populates="sarimax")

from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, func 
from sqlalchemy.orm import relationship
from ..database import Base


class Personne(Base):
    __tablename__ = 'personne'

    id = Column(Integer, primary_key=True)
    email = Column(String)
    mdp = Column(String)
    note = Column(String)
    pdp = Column(String)

    type = Column(String)  # Discriminant

    __mapper_args__ = {
        'polymorphic_identity': 'personne',
        'polymorphic_on': type
    }

class Admin(Base):
    __tablename__ = "admin"

    id = Column(Integer, ForeignKey('personne.id'), primary_key=True)
    nom_entp = Column(String)

    __mapper_args__ = {
        'polymorphic_identity': 'admin'
    }

# Table d'association entre modèles et données
modeles_donnees = Table(
    "modeles_donnees",
    Base.metadata,
    Column("modele_id", Integer, ForeignKey("modeles.id")),
    Column("donnee_id", Integer, ForeignKey("donnees.id")),
)
class Admin(Base):
    __tablename__ = "admin"  # ✅ double underscore

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String)
    mdp = Column(String)
    note = Column(String)
    pdp = Column(String)
    nom_entp = Column(String)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    code_client = Column(String, unique=True, index=True, nullable=False)

    nom = Column(String)
    prenom = Column(String)
    adresse = Column(String)
    telephone = Column(String)
    date_naissance = Column(Date)
    email = Column(String, unique=True, index=True)
    mdp = Column(String)

    __mapper_args__ = {
        'polymorphic_identity': 'client'
    }

    consommations = relationship("Consommation", back_populates="client")




class Dataset(Base):
    __tablename__ = "datasets"

    id = Column(Integer, primary_key=True, index=True)
    valeur = Column(Float)
    date = Column(Date)

    client_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    client = relationship("User", back_populates="consommations")


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    titre = Column(String)
    period = Column(Integer)
    date_cree = Column(Date, default=func.current_date())
    typeC = Column(String)
    
    modele_id = Column(Integer, ForeignKey("modeles.id"))
    modele = relationship("Model", back_populates="predictions")

    points = relationship("PointPredit", back_populates="prediction",cascade="all, delete-orphan")



class PointPredit(Base):
    __tablename__ = "points_predits"

    id = Column(Integer, primary_key=True, index=True)
    dateP = Column(Date)
    valeur_predite = Column(Float)
    
    prediction_id = Column(Integer, ForeignKey("predictions.id"), nullable=False)
    prediction = relationship("Prediction", back_populates="points")


class Model(Base):
    __tablename__ = "modeles"

    id = Column(Integer, primary_key=True, index=True)
    mape = Column(Float)
    typeM = Column(String)
    
    predictions = relationship("Prediction", back_populates="modele", cascade="all, delete-orphan")


    __mapper_args__ = {
        'polymorphic_identity': 'modele',
        'polymorphic_on': typeM
    }



class ModeleDeepLearning(Base):
    __tablename__ = "modeles_deep_learning"

    id = Column(Integer, ForeignKey('modeles.id'), primary_key=True)
    epochs = Column(Float)
    batch_size = Column(Integer)
    unitsC1 = Column(Integer)
    unitsC2 = Column(Integer)
    seq_length = Column(Integer)

    __mapper_args__ = {
        'polymorphic_identity': 'deeplearning'
    }

class ModeleStatique(Base):
    __tablename__ = "modeles_statiques"

    id = Column(Integer, ForeignKey('modeles.id'), primary_key=True)
    p = Column(Integer)
    d = Column(Integer)
    q = Column(Integer)

    sarima = relationship("Sarima", uselist=False, backref="modele_statique")

    __mapper_args__ = {
        'polymorphic_identity': 'arima'
    }

class Sarima(Base):
    __tablename__ = "sarima"

    id = Column(Integer, ForeignKey('modeles_statiques.id'), primary_key=True)
    s = Column(Integer)
    P = Column(Integer)
    D = Column(Integer)
    Q = Column(Integer)

    __mapper_args__ = {
        'polymorphic_identity': 'sarima'
    }