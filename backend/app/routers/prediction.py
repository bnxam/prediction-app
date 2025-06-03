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
# # import traceback
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import LSTM, Dense, Dropout
import tensorflow as tf
from sklearn.preprocessing import MinMaxScaler

router = APIRouter()

# router = APIRouter()
warnings.filterwarnings("ignore")

@router.post("/predict")
async def predict_sarima(periode: int = Form(...), fichier: UploadFile = File(...),type_modele: str = Form(...)):
    global last_prediction_result
    try:
        contents = await fichier.read()
        df = pd.read_csv(io.StringIO(contents.decode("utf-8")))
    
        df["Date"] = pd.to_datetime(df["Date"])
        df = df.sort_values("Date")

        # Extraire la série temporelle
        serie = df["Valeur"]
        if type_modele == "sarima" :

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
                "valeurs": forecast.tolist(),
                "donnees_historiques": {
                    "dates": df["Date"].dt.strftime("%Y-%m-%d %H:%M:%S").tolist(),
                    "valeurs": df["Valeur"].tolist()
            }
            }
        
            return JSONResponse(content=last_prediction_result)
        
        elif type_modele == "arima" :
             # Lire le contenu du fichier CSV

            

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
                "datesp": forecast_dates.strftime("%Y-%m-%d").tolist(),  # format date simple
                "valeursp": forecast.tolist(),  # valeurs prédites
                "dates": forecast_dates.strftime("%Y-%m-%d").tolist(),  # format date simple
                "valeurs": forecast.tolist(),  # valeurs prédites
                "dates_predit": {
                    "debut": forecast_dates[0].strftime("%Y-%m-%d"),
                    "fin": forecast_dates[-1].strftime("%Y-%m-%d")
                },
                "donnees_historiques": {
                    "dates": df["Date"].dt.strftime("%Y-%m-%d %H:%M:%S").tolist(),
                    "valeurs": df["Valeur"].tolist()
            }
            }
            import logging
            logging.info("Résultat de prédiction asmaaaa d zela: %s", last_prediction_result)
        
            return JSONResponse(content=last_prediction_result)

        elif type_modele == 'lstm':
            
            # Normalisation des données
            
            scaler = MinMaxScaler()
            values = df["Valeur"].values.reshape(-1, 1)
            scaled_values = scaler.fit_transform(values)
            
            # Création des séquences
            def create_sequences(data, seq_length):
                X, y = [], []
                for i in range(len(data)-seq_length):
                    X.append(data[i:i+seq_length])
                    y.append(data[i+seq_length])
                return np.array(X), np.array(y)
            
            seq_length = 3  # Utiliser 24 heures comme séquence historique
            X, y = create_sequences(scaled_values, seq_length)
            
            # Division train/test
            train_size = int(len(X) * 0.8)
            X_train, X_test = X[:train_size], X[train_size:]
            y_train, y_test = y[:train_size], y[train_size:]
            model = tf.keras.models.Sequential([
                tf.keras.layers.LSTM(units=50, return_sequences=True, input_shape=(seq_length, 1)),
                # tf.keras.Dropout(0.2),
                tf.keras.layers.LSTM(units=50),
                # tf.keras.Dropout(0.2),
                tf.keras.layers.Dense(1)
            ])
            model.compile(optimizer='adam', loss='mean_squared_error')
            history = model.fit(
                X_train, y_train,
                epochs=25,  # Large marge (EarlyStopping gère l'arrêt)
                batch_size=12,  # Ni trop petit ni trop grand
                validation_data=(X_test, y_test),
                callbacks=[tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=10)],
                verbose=1
            )
                # Prédiction sur les données de test pour calculer l'erreur
            test_predict = model.predict(X_test)
            test_predict = scaler.inverse_transform(test_predict)
            y_test_actual = scaler.inverse_transform(y_test.reshape(-1, 1))
            
            # Calcul du MAPE
            mape = mean_absolute_percentage_error(y_test_actual, test_predict)
            
            # Prédiction future
            last_sequence = scaled_values[-seq_length:]
            predictions = []
            
            for _ in range(periode):
                next_pred = model.predict(last_sequence.reshape(1, seq_length, 1))
                predictions.append(next_pred[0,0])
                last_sequence = np.append(last_sequence[1:], next_pred[0,0])
            
            predictions = scaler.inverse_transform(np.array(predictions).reshape(-1, 1))
            forecast = predictions.flatten().tolist()
            
            forecast_dates = pd.date_range(
                start=df["Date"].iloc[-1] + pd.Timedelta(hours=1),
                periods=periode,
                freq='H'
            )
            
            

            last_prediction_result = {
            "message": "Prédiction LSTM effectuée avec succès",
            "methode": "LSTM",
            "architecture": {
                "couches": [
                    {"type": "LSTM", "units": 50},
                    {"type": "LSTM", "units": 50},
                    {"type": "Dense", "units": 1}
                ],
                "optimizer": "adam",
                "loss": "mean_squared_error",
                "epochs": 50,
                "batch_size": 32
            },
            "performance": {
                "loss": history.history['loss'][-1],
                "val_loss": history.history['val_loss'][-1],
                "taux_erreur_mape": round(mape * 100, 2)
            },
            "dates_predit": {
                "debut": forecast_dates[0].strftime("%Y-%m-%d %H:%M:%S"),
                "fin": forecast_dates[-1].strftime("%Y-%m-%d %H:%M:%S")
            },
            "dates": forecast_dates.strftime("%Y-%m-%d %H:%M:%S").tolist(),
            "valeurs": forecast,
            "donnees_historiques": {
                "dates": df["Date"].dt.strftime("%Y-%m-%d %H:%M:%S").tolist(),
                "valeurs": df["Valeur"].tolist()
            }
        }
        
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

