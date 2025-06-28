from pydantic import BaseModel
from typing import List, Union, Optional
from datetime import date

class DonneesHistoriques(BaseModel):
    dates: List[str]
    valeurs: List[float]

class ParametresSARIMA(BaseModel):
    order: List[int]
    seasonal_order: Optional[List[int]] 

class DatesPrediction(BaseModel):
    debut: str
    fin: str

class ArchitectureLSTM(BaseModel):
    units1: int
    units2: int
    epochs: int
    batch_size: int
    seq_len: int
    
class PredictionPoint(BaseModel):
    date: str
    valeur: float

class LSTMPredictionResponse(BaseModel):
    resultats_prediction: List[PredictionPoint]
    forecast_dates: List[date]
    forecast: List[float]
    mape: float
    params: ArchitectureLSTM


class PredictionResponse(BaseModel):
    message: str
    methode: str
    meilleurs_parametres: ParametresSARIMA
    dates_predit: DatesPrediction
    taux_erreur_mape: Union[float, str]
    dates: List[str]
    valeurs: List[float]
    donnees_historiques: DonneesHistoriques
    architecture : ArchitectureLSTM

