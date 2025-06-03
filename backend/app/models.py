from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey, func 
from sqlalchemy.orm import relationship
from app.database import Base


class Admin(Base):
    __tablename__ = "admin"

    id = Column(Integer, primary_key=True)
    email = Column(String)
    mdp = Column(String)
    note = Column(String)
    pdp = Column(String)
    nom_entp = Column(String)

 

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String)
    mdp = Column(String)
    note = Column(String)
    pdp = Column(String)
    code_client= Column(String, unique=True, index=True , nullable=False)
    nom = Column(String)
    prenom = Column(String)
    adresse = Column(String)
    date_naissance = Column(Date)
    telephone = Column(String)
    typeC = Column(String)


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
    
    
    arima = relationship("Arima", back_populates="prediction_rel", uselist=False, cascade="all, delete-orphan")
    sarima = relationship("Sarima", back_populates="prediction_rel", uselist=False, cascade="all, delete-orphan")
    lstm = relationship("LSTM", back_populates="prediction_rel", uselist=False, cascade="all, delete-orphan")

    points = relationship("PointPredit", back_populates="prediction",cascade="all, delete-orphan")



class PointPredit(Base):
    __tablename__ = "point_predit"

    id = Column(Integer, primary_key=True, index=True)
    dateP = Column(Date)
    valeur_predite = Column(Float)
    
    prediction_id = Column(Integer, ForeignKey("prediction.id"), nullable=False)
    prediction = relationship("Prediction", back_populates="points")


# class Modele(Base):
#     __tablename__ = "modele"

#     id = Column(Integer, primary_key=True, index=True)
#     mape = Column(Float)
#     typeM = Column(String)
    
#     predictions = relationship("Prediction", back_populates="modele", cascade="all, delete-orphan")


#     __mapper_args__ = {
#         'polymorphic_identity': 'modele',
#         'polymorphic_on': typeM
#     }



class LSTM(Base):
    __tablename__ = "lstm"

    id = Column(Integer, primary_key=True, index=True)
    mape = Column(Float)
    epochs = Column(Float)
    batch_size = Column(Integer)
    unitsC1 = Column(Integer)
    unitsC2 = Column(Integer)
    seq_length = Column(Integer)

    pred_id = Column(Integer, ForeignKey("prediction.id"), nullable=False, unique=True)

    prediction_rel = relationship("Prediction", back_populates="lstm")



class Arima(Base):
    __tablename__ = "arima"

    id = Column(Integer, primary_key=True, index=True)
    mape = Column(Float)
    p = Column(Integer)
    d = Column(Integer)
    q = Column(Integer)

    pred_id = Column(Integer, ForeignKey("prediction.id"), nullable=False, unique=True)

    prediction_rel = relationship("Prediction", back_populates="arima")

    
class Sarima(Base):
    __tablename__ = "sarima"

    id = Column(Integer, primary_key=True, index=True)
    mape = Column(Float)
    p = Column(Integer)
    d = Column(Integer)
    q = Column(Integer)
    s = Column(Integer)
    P = Column(Integer)
    D = Column(Integer)
    Q = Column(Integer)

    pred_id = Column(Integer, ForeignKey("prediction.id"), nullable=False, unique=True)
    
    prediction_rel = relationship("Prediction", back_populates="sarima")
