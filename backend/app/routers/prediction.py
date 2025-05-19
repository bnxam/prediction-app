from fastapi import APIRouter, Form, File, UploadFile
from io import StringIO
import io
from fastapi.responses import JSONResponse
import pandas as pd
import numpy as np
from statsmodels.tsa.statespace.sarimax import SARIMAX 
from statsmodels.tsa.arima.model import ARIMA
from itertools import product
from sklearn.metrics import mean_squared_error, mean_absolute_percentage_error
import warnings
import traceback

router = APIRouter()

# router = APIRouter()
warnings.filterwarnings("ignore")

@router.post("/predict")
async def predict_sarima(periode: int = Form(...), fichier: UploadFile = File(...),type_modele: str = Form(...)):
    global last_prediction_result
    try:
        if type_modele == "sarima" :
            # Lire le contenu du fichier CSV
            contents = await fichier.read()
            df = pd.read_csv(io.StringIO(contents.decode("utf-8")))

        
            df["Date"] = pd.to_datetime(df["Date"])
            df = df.sort_values("Date")

            # Extraire la série temporelle
            serie = df["Valeur"]

            # Définir les plages de recherche pour SARIMA
            p = d = q = range(0, 2)
            pdq = list(product(p, d, q))
            P= D = Q = range(0, 2)
            # seasonal_pdq = [(x[0], x[1], x[2], 24) for x in pdq]     # 24 = périodicité horaire
            seasonal_pdq = list(product(P, D, Q, [24]))

            best_rmse = float("inf")
            best_model = None
            best_params = None
            best_results = None

            train_size = int(len(serie) * 0.8)
            train, test = serie[:train_size], serie[train_size:]

            for param in pdq:
                for seasonal_param in seasonal_pdq:
                    try:
                        model = SARIMAX(train, order=param, seasonal_order=seasonal_param, enforce_stationarity=False, enforce_invertibility=False)
                        results = model.fit(disp=False)
                        pred = results.predict(start=len(train), end=len(train) + len(test) - 1)
                        rmse = np.sqrt(mean_squared_error(test, pred))

                        if rmse < best_rmse:
                            best_rmse = rmse
                            best_model = results
                            best_params = (param, seasonal_param)
                            best_results = results
                    except:
                        continue

            # Prédiction avec le meilleur modèle
            forecast = best_model.forecast(steps=periode)
            forecast_dates = pd.date_range(start=df["Date"].iloc[-1] + pd.Timedelta(hours=1), periods=periode, freq='H')

            # Calcul du taux d’erreur (MAPE)
            if len(test) >= periode:
                mape = mean_absolute_percentage_error(test[:periode], best_model.predict(start=len(train), end=len(train) + periode - 1))
            else:
                mape = None  # Pas assez de données pour MAPE

            last_prediction_result ={ 
                "message": "Prédiction SARIMA effectuée avec succès",
                "methode" : "SARIMA",
                "meilleurs_parametres": {
                    "order": best_params[0],
                    "seasonal_order": best_params[1]
                },
                "criteres_information": {
                    "AIC": round(best_results.aic, 2),
                    "BIC": round(best_results.bic, 2)
                },
                "dates_predit": {
                    "debut": forecast_dates[0].strftime("%Y-%m-%d"),
                    "fin": forecast_dates[-1].strftime("%Y-%m-%d")
                },
                "taux_erreur_mape": round(mape * 100, 2) if mape is not None else "Non calculé",
                "dates": forecast_dates.strftime("%Y-%m-%d %H:%M:%S").tolist(),
                "valeurs": forecast.tolist()
            }
        
            return JSONResponse(content=last_prediction_result)
        
        elif type_modele == "arima" :
             # Lire le contenu du fichier CSV

            contents = await fichier.read()
            df = pd.read_csv(io.StringIO(contents.decode("utf-8")))
        
            df["Date"] = pd.to_datetime(df["Date"])
            df = df.sort_values("Date")

            # Extraire la série temporelle
            serie = df["Valeur"]

            # Définir les plages de recherche pour SARIMA
            p = q = range(0, 4)
            d = range(0, 2)
            pdq = list(product(p, d, q))

            best_rmse = float("inf")
            best_model = None
            best_params = None
            best_results = None

            train_size = int(len(serie) * 0.8)
            train, test = serie[:train_size], serie[train_size:]

            for param in pdq:

                try:
                    model = ARIMA(train, order=param)
                    results = model.fit()
                    pred = results.predict(start=len(train), end=len(train) + len(test) - 1)
                    rmse = np.sqrt(mean_squared_error(test, pred))

                    if rmse < best_rmse:
                        best_rmse = rmse
                        best_model = results
                        best_params = param
                        best_results = results
                except:
                    continue

            # # Prédiction avec le meilleur modèle
            forecast = best_model.forecast(steps=periode)
            forecast_dates = pd.date_range(start=df["Date"].iloc[-1] + pd.Timedelta(hours=1), periods=periode, freq='H')
            
            # forecast = best_model.forecast(steps=periode)
            # forecast_dates = pd.date_range(start=df["Date"].iloc[-1] + pd.Timedelta(days=1), periods=periode, freq='D')

            if best_model is None:
                raise ValueError("Aucun modèle ARIMA na réussi à sajuster.")

            # Calcul du taux d’erreur (MAPE)
            if len(test) >= periode:
                mape = mean_absolute_percentage_error(test[:periode], best_model.predict(start=len(train), end=len(train) + periode - 1))
            else:
                mape = None  # Pas assez de données pour MAPE

            last_prediction_result ={
                "message": "Prédiction ARIMA effectuée avec succès",
                "meilleurs_parametres": {
                    "order": best_params
                },
                "methode" : "ARIMA",
                "serie_originale": serie.tolist() ,
                "criteres_information": {
                    "AIC": round(best_results.aic, 2),
                    "BIC": round(best_results.bic, 2)
                },
                "taux_erreur_mape": round(mape * 100, 2) if mape is not None else "Non calculé",
                "dates": forecast_dates.strftime("%Y-%m-%d").tolist(),  # format date simple
                "valeurs": forecast.tolist(),  # valeurs prédites
                "dates_predit": {
                    "debut": forecast_dates[0].strftime("%Y-%m-%d"),
                    "fin": forecast_dates[-1].strftime("%Y-%m-%d")
                },
            }
            import logging
            logging.info("Résultat de prédiction asmaaaa d zela: %s", last_prediction_result)
        
            return JSONResponse(content=last_prediction_result)
            
            
        
    except Exception as e:
        return JSONResponse(status_code=500, content={
            "message": f"Erreur lors de la prédiction : {str(e)}"
        })




# @router.post("/predictARIMA")
# async def predict_arima(periode: int = Form(...), fichier: UploadFile = File(...)):
#     global last_prediction_result
    


@router.get("/last_prediction")
async def get_last_prediction():
    if last_prediction_result:
        return JSONResponse(content=last_prediction_result)
    else:
        return JSONResponse(status_code=404, content={"message": "Aucune prédiction disponible pour le moment."})

