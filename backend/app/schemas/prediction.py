from pydantic import BaseModel
from typing import List, Union, Optional

class DonneesHistoriques(BaseModel):
    dates: List[str]
    valeurs: List[float]

class ParametresSARIMA(BaseModel):
    order: List[int]
    seasonal_order: List[int]

class DatesPrediction(BaseModel):
    debut: str
    fin: str

class SARIMAPredictionResponse(BaseModel):
    message: str
    methode: str
    meilleurs_parametres: ParametresSARIMA
    dates_predit: DatesPrediction
    taux_erreur_mape: Union[float, str]
    dates: List[str]
    valeurs: List[float]
    donnees_historiques: DonneesHistoriques
