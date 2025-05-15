import pandas as pd
from fastapi import UploadFile, File, Form
from fastapi.responses import JSONResponse
from io import StringIO
import io

from fastapi import APIRouter

router = APIRouter()

# -------------afficher la periode et le nom du fichier csv------------
# @router.post("/predict")
# async def lancer_prediction(
   
#     periode: int = Form(...),
#     fichier: UploadFile = File(...)

#     # fichier: Optional[UploadFile] = File(None)
# ):
#     # Ici tu peux enregistrer le fichier temporairement
#     # contenu = await fichier.read()
# # : traiter le fichier et lancer la prédiction

#     return JSONResponse(content={
#         "message": "Prédiction lancée",
       
       
#         "periode": periode,
#         "nom_fichier": fichier.filename
#     })



# -------------afficher la periode et les donnees du fichier csv-------------
# @router.post("/predict")
# async def lancer_prediction(
#     periode: int = Form(...),
#     fichier: UploadFile = File(...)
# ):
#     # Lire le contenu du fichier CSV
#     contents = await fichier.read()
#     df = pd.read_csv(io.StringIO(contents.decode("utf-8")))

#     # Extraire les données
#     dates = df["Date"].tolist()
#     valeurs = df["Valeur"].tolist()

#     return JSONResponse(content={
#         "message": "Données extraites avec succès",
#         "dates": dates,
#         "valeurs": valeurs
#     })




# from fastapi import APIRouter, UploadFile, File, Form
# from fastapi.responses import JSONResponse
# import pandas as pd
# import io
# from statsmodels.tsa.statespace.sarimax import SARIMAX

# router = APIRouter()

# @router.post("/predict")
# async def lancer_prediction(
#     periode: int = Form(...),
#     fichier: UploadFile = File(...)
# ):
#     try:
#         # Lire le contenu du fichier CSV
#         contents = await fichier.read()
#         df = pd.read_csv(io.StringIO(contents.decode("utf-8")))

#         # Convertir la colonne datetime en datetime
#         df["Date"] = pd.to_datetime(df["Date"])
#         df = df.sort_values("Date")

#         # Extraire la série temporelle
#         serie = df["Valeur"]

#         # Créer le modèle SARIMA (paramètres simples pour test)
#         model = SARIMAX(serie, order=(1, 1, 1), seasonal_order=(1, 1, 1, 24))
#         results = model.fit(disp=False)

#         # Faire la prédiction
#         forecast = results.forecast(steps=periode)
#         forecast_dates = pd.date_range(start=df["Date"].iloc[-1] + pd.Timedelta(hours=1), periods=periode, freq='H')

#         return JSONResponse(content={
#             "message": "Prédiction SARIMA effectuée avec succès",
#             "dates": forecast_dates.strftime("%Y-%m-%d %H:%M:%S").tolist(),
#             "valeurs": forecast.tolist()
#         })
#     except Exception as e:
#         return JSONResponse(status_code=500, content={
#             "message": f"Erreur lors de la prédiction : {str(e)}"
#         })


from fastapi import Form, File, UploadFile
from fastapi.responses import JSONResponse
import pandas as pd
import numpy as np
import io
from statsmodels.tsa.statespace.sarimax import SARIMAX
from itertools import product
from sklearn.metrics import mean_squared_error, mean_absolute_percentage_error
import warnings


# router = APIRouter()
warnings.filterwarnings("ignore")

@router.post("/predict")
async def lancer_prediction(periode: int = Form(...), fichier: UploadFile = File(...)):
    global last_prediction_result
    try:
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
        seasonal_pdq = [(x[0], x[1], x[2], 24) for x in pdq]     # 24 = périodicité horaire

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
            "meilleurs_parametres": {
                "order": best_params[0],
                "seasonal_order": best_params[1]
            },
            "criteres_information": {
                "AIC": round(best_results.aic, 2),
                "BIC": round(best_results.bic, 2)
            },
            "taux_erreur_mape": round(mape * 100, 2) if mape is not None else "Non calculé",
            "dates": forecast_dates.strftime("%Y-%m-%d %H:%M:%S").tolist(),
            "valeurs": forecast.tolist()
        }
    
        return JSONResponse(content=last_prediction_result)


    except Exception as e:
        return JSONResponse(status_code=500, content={
            "message": f"Erreur lors de la prédiction : {str(e)}"
        })


@router.get("/last_prediction")
async def get_last_prediction():
    if last_prediction_result:
        return JSONResponse(content=last_prediction_result)
    else:
        return JSONResponse(status_code=404, content={"message": "Aucune prédiction disponible pour le moment."})