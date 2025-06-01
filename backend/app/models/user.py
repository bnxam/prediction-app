# from sqlalchemy import Column, Integer, String
# from ..database import Base  # Import depuis le package models

# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     nom = Column(String(50), nullable=False)
#     email = Column(String(50), unique=True, nullable=False)
#     mdp = Column(String(255), nullable=False)

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

from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from ..database import Base

class Utilisateur(Base):
    __tablename__ = "utilisateurs"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    mdp = Column(String)

    admin = relationship("Admin", back_populates="utilisateur", uselist=False)
    client = relationship("Client", back_populates="utilisateur", uselist=False)


class Admin(Base):
    __tablename__ = "admins"

    idA = Column(Integer, primary_key=True, index=True)
    nom_entp = Column(String)
    attribute5 = Column(Integer)

    utilisateur_id = Column(Integer, ForeignKey("utilisateurs.id"))
    utilisateur = relationship("Utilisateur", back_populates="admin")


class Client(Base):
    __tablename__ = "clients"

    idC = Column(Integer, primary_key=True, index=True)
    code_client= Column(String, unique=True, index=True , nullable=False)
    nom = Column(String)
    prenom = Column(String)
    adresse = Column(String)
    date_naissance = Column(Date)
    telephone = Column(String)

    utilisateur_id = Column(Integer, ForeignKey("utilisateurs.id"))
    utilisateur = relationship("Utilisateur", back_populates="client")

    consommations = relationship("Consommation", back_populates="client")
    predictions = relationship("Prediction", back_populates="client")
    modeles = relationship("Model", back_populates="client")


class Consommation(Base):
    __tablename__ = "consommations"

    id = Column(Integer, primary_key=True, index=True)
    valeur = Column(Float)
    date = Column(Date)

    client_id = Column(Integer, ForeignKey("clients.id"))
    client = relationship("Client", back_populates="consommations")


class Prediction(Base):
    __tablename__ = "predictions"

    idP = Column(Integer, primary_key=True, index=True)
    titre = Column(Integer)
    period = Column(Integer)
    date_cree = Column(Date)

    client_id = Column(Integer, ForeignKey("clients.id"))
    client = relationship("Client", back_populates="predictions")

    points = relationship("PointPredit", back_populates="prediction", cascade="all, delete")


class PointPredit(Base):
    __tablename__ = "points_predits"

    idPP = Column(Integer, primary_key=True, index=True)
    dateP = Column(Date)
    valeur_predite = Column(Float)

    prediction_id = Column(Integer, ForeignKey("predictions.idP"))
    prediction = relationship("Prediction", back_populates="points")


class Model(Base):
    __tablename__ = "modeles"

    idM = Column(Integer, primary_key=True, index=True)
    mape = Column(Float)

    client_id = Column(Integer, ForeignKey("clients.id"))
    client = relationship("Client", back_populates="modeles")

    modele_statique = relationship("ModeleStatique", back_populates="modele", uselist=False, cascade="all, delete")
    modele_deep_learning = relationship("ModeleDeepLearning", back_populates="modele", uselist=False, cascade="all, delete")
    sarima = relationship("Sarima", back_populates="modele", uselist=False, cascade="all, delete")


class ModeleStatique(Base):
    __tablename__ = "modeles_statiques"

    idMC = Column(Integer, primary_key=True, index=True)
    p = Column(Integer)
    d = Column(Integer)
    q = Column(Integer)

    modele_id = Column(Integer, ForeignKey("modeles.idM"))
    modele = relationship("Model", back_populates="modele_statique")


class ModeleDeepLearning(Base):
    __tablename__ = "modeles_deep_learning"

    idMM = Column(Integer, primary_key=True, index=True)
    epochs = Column(Float)
    batch_size = Column(Integer)
    unitsC1 = Column(Integer)
    unitsC2 = Column(Integer)
    seq_length = Column(Integer)

    modele_id = Column(Integer, ForeignKey("modeles.idM"))
    modele = relationship("Model", back_populates="modele_deep_learning")


class Sarima(Base):
    __tablename__ = "sarimas"

    idS = Column(Integer, primary_key=True, index=True)
    s = Column(Integer)
    p = Column(Integer)
    d = Column(Integer)
    q = Column(Integer)
    P = Column(Integer)
    D = Column(Integer)
    Q = Column(Integer)

    modele_id = Column(Integer, ForeignKey("modeles.idM"))
    modele = relationship("Model", back_populates="sarima")
