from fastapi import APIRouter,  Depends, Form, File, UploadFile
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
from app.database import get_db
from app.models.model import Consommation
from app.schemas.userSchema import ConsommationGroupeeResponse
from sqlalchemy import func
from sqlalchemy.orm import Session
from datetime import date
import datetime

# # import traceback
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import LSTM, Dense, Dropout
import tensorflow as tf
from sklearn.preprocessing import MinMaxScaler
from collections import defaultdict

router = APIRouter()

# router = APIRouter()
warnings.filterwarnings("ignore")

# def predict_lstm(data_list,nb_predict, sequence_length=3):
#     print(">>>> nb_predict reçu :", nb_predict)
#     # Étape 1 : Extraire les valeurs
#     # valeurs = [item['valeur'] for item in data_list]
#     valeurs = [item['valeur'] if item['valeur'] is not None else 0 for item in data_list]

    
#     if len(valeurs) < sequence_length + 1:
#         raise ValueError("Pas assez de données pour entraîner le modèle")

#     # Étape 2 : Normalisation
#     scaler = MinMaxScaler()
#     valeurs_scaled = scaler.fit_transform(np.array(valeurs).reshape(-1, 1))

#     # Étape 3 : Créer les séquences X et y
#     X = []
#     y = []
#     for i in range(len(valeurs_scaled) - sequence_length):
#         X.append(valeurs_scaled[i:i+sequence_length])
#         y.append(valeurs_scaled[i+sequence_length])
    
#     X = np.array(X)
#     y = np.array(y)

    
#     # Étape 4 : Construire le modèle LSTM
#     model = tf.keras.models.Sequential()
#     model.add(tf.keras.layers.LSTM(50, activation='relu', input_shape=(sequence_length, 1)))
#     model.add(tf.keras.layers.Dense(1))
#     model.compile(optimizer='adam', loss='mse')

#     # Étape 5 : Entraîner le modèle
#     model.fit(X, y, epochs=50, verbose=0)

#     # Étape 6 : Prédire les 3 prochaines valeurs
#     pred_input = valeurs_scaled[-sequence_length:]  # Derniers points
#     predictions = []
    
#     # for _ in range(nb_predict):
#     #     input_seq = pred_input.reshape(1, sequence_length, 1)
#     #     pred = model.predict(input_seq, verbose=0)
#     #     predictions.append(pred[0][0])
#     #     pred_input = np.append(pred_input[1:], pred[0][0])  # glisser la fenêtre
#     for idx in range(nb_predict):
#         print(f"Prédiction {idx+1} sur {nb_predict}")
#         input_seq = pred_input.reshape(1, sequence_length, 1)
#         pred = model.predict(input_seq, verbose=0)
#         predictions.append(pred[0][0])
#         pred_input = np.append(pred_input[1:], pred[0][0])
#     # Étape 7 : Dénormalisation
#     predictions = scaler.inverse_transform(np.array(predictions).reshape(-1, 1)).flatten()
#     # Étape 8 : Générer les dates futures (trimestre suivant chaque fois)
#     last_date_str = data_list[-1]["date"]
#     last_date = pd.to_datetime(last_date_str)
#     if nb_predict == 4:
#         future_dates = [last_date + pd.DateOffset(months=3 * (i + 1)) for i in range(nb_predict)]
#     else :
#         future_dates = pd.date_range(start=last_date + pd.DateOffset(months=1), periods=nb_predict, freq='MS')

#     # Étape 9 : Retourner les résultats
#     result = [{"date": d.strftime("%Y-%m-%d"), "valeur": float(v)} for d, v in zip(future_dates, predictions)]
#     print(result)
#     return result
def predict_lstm(data_list, nb_predict, sequence_length=3, test_ratio=0.2): 
    # Étape 1 : Extraction des valeurs
    valeurs = [item['valeur'] if item['valeur'] is not None else 0 for item in data_list]

    if len(valeurs) < sequence_length + 1:
        raise ValueError("Pas assez de données pour entraîner le modèle")

    # Étape 2 : Normalisation
    scaler = MinMaxScaler()
    valeurs_scaled = scaler.fit_transform(np.array(valeurs).reshape(-1, 1))

    # Étape 3 : Séparation train/test
    split_index = int(len(valeurs_scaled) * (1 - test_ratio))
    train_scaled = valeurs_scaled[:split_index]
    test_scaled = valeurs_scaled[split_index - sequence_length:]

    # Étape 4 : Séquences train
    X_train, y_train = [], []
    for i in range(len(train_scaled) - sequence_length):
        X_train.append(train_scaled[i:i + sequence_length])
        y_train.append(train_scaled[i + sequence_length])
    X_train = np.array(X_train)
    y_train = np.array(y_train)

    # Étape 5 : Séquences test
    X_test, y_test = [], []
    for i in range(len(test_scaled) - sequence_length):
        X_test.append(test_scaled[i:i + sequence_length])
        y_test.append(test_scaled[i + sequence_length])
    X_test = np.array(X_test)
    y_test = np.array(y_test)

    # Étape 6 : Construction du modèle
    model = tf.keras.models.Sequential()
    model.add(tf.keras.layers.LSTM(50, activation='relu', input_shape=(sequence_length, 1)))
    model.add(tf.keras.layers.Dense(1))
    model.compile(optimizer='adam', loss='mse')

    # Étape 7 : Entraînement du modèle
    history = model.fit(X_train, y_train, epochs=50, batch_size=32, validation_data=(X_test, y_test), verbose=0)

    # Étape 8 : Prédiction future
    pred_input = valeurs_scaled[-sequence_length:]
    predictions_scaled = []

    for _ in range(nb_predict):
        input_seq = pred_input.reshape(1, sequence_length, 1)
        pred = model.predict(input_seq, verbose=0)
        predictions_scaled.append(pred[0][0])
        pred_input = np.append(pred_input[1:], pred[0][0])

    # Étape 9 : Dénormalisation des prédictions
    predictions = scaler.inverse_transform(np.array(predictions_scaled).reshape(-1, 1)).flatten()

    # Étape 10 : Génération des dates futures
    last_date = pd.to_datetime(data_list[-1]["date"])
    if nb_predict == 4:
        future_dates = [last_date + pd.DateOffset(months=3 * (i + 1)) for i in range(nb_predict)]
    else:
        future_dates = pd.date_range(start=last_date + pd.DateOffset(months=1), periods=nb_predict, freq='MS')

    # Étape 11 : Format résultat principal
    result = [{"date": d.strftime("%Y-%m-%d"), "valeur": float(v)} for d, v in zip(future_dates, predictions)]

    # Étape 12 : Calcul du MAPE sur les données test
    y_test_pred = model.predict(X_test, verbose=0)
    y_test_inv = scaler.inverse_transform(y_test.reshape(-1, 1))
    y_test_pred_inv = scaler.inverse_transform(y_test_pred)
    mape = mean_absolute_percentage_error(y_test_inv, y_test_pred_inv)

    # Étape 13 : Création du dataframe historique
    df = pd.DataFrame(data_list)
    df["date"] = pd.to_datetime(df["date"])
    df = df.rename(columns={"date": "Date", "valeur": "Valeur"})

    if nb_predict == 4:

        return result
    # Étape 14 : Retour des résultats complets pour last_prediction_result
    else : 
        return {
            "resultats_prediction": result,
            "forecast_dates": future_dates,
            "forecast": predictions.tolist(),
            "history": history,
            "mape": mape,
            "df": df
        }
# ********************************
# def predict_lstm(data_list, nb_predict, sequence_length=3, test_ratio=0.2):

#     # Étape 1 : Extraire les valeurs en remplaçant les None par 0
#     valeurs = [item['valeur'] if item['valeur'] is not None else 0 for item in data_list]

#     if len(valeurs) < sequence_length + 1:
#         raise ValueError("Pas assez de données pour entraîner le modèle")

#     # Étape 2 : Normalisation
#     scaler = MinMaxScaler()
#     valeurs_scaled = scaler.fit_transform(np.array(valeurs).reshape(-1, 1))

#     # Étape 3 : Séparation en train/test
#     split_index = int(len(valeurs_scaled) * (1 - test_ratio))
#     train_scaled = valeurs_scaled[:split_index]
#     test_scaled = valeurs_scaled[split_index - sequence_length:]  # pour garder continuité

#     # Étape 4 : Création des séquences pour l'entraînement
#     X_train, y_train = [], []
#     for i in range(len(train_scaled) - sequence_length):
#         X_train.append(train_scaled[i:i + sequence_length])
#         y_train.append(train_scaled[i + sequence_length])

#     # Étape 5 : Création des séquences pour le test (pas utilisé ici mais utile si tu veux évaluer)
#     X_test, y_test = [], []
#     for i in range(len(test_scaled) - sequence_length):
#         X_test.append(test_scaled[i:i + sequence_length])
#         y_test.append(test_scaled[i + sequence_length])

#     X_train = np.array(X_train)
#     y_train = np.array(y_train)

#     # Étape 6 : Construire le modèle LSTM
#     model = tf.keras.models.Sequential()
#     model.add(tf.keras.layers.LSTM(50, activation='relu', input_shape=(sequence_length, 1)))
#     model.add(tf.keras.layers.Dense(1))
#     model.compile(optimizer='adam', loss='mse')

#     # Étape 7 : Entraîner le modèle
#     history = model.fit(X_train, y_train, epochs=50, verbose=0)

#     # Étape 8 : Prédire les futures valeurs
#     pred_input = valeurs_scaled[-sequence_length:]
#     predictions = []

#     for idx in range(nb_predict):
#         input_seq = pred_input.reshape(1, sequence_length, 1)
#         pred = model.predict(input_seq, verbose=0)
#         predictions.append(pred[0][0])
#         pred_input = np.append(pred_input[1:], pred[0][0])

#     # Étape 9 : Dénormalisation
#     predictions = scaler.inverse_transform(np.array(predictions).reshape(-1, 1)).flatten()
#     print("Prédiction",predictions)

#     # Étape 10 : Génération des dates futures
#     last_date_str = data_list[-1]["date"]
#     last_date = pd.to_datetime(last_date_str)

#     if nb_predict == 4:
#         future_dates = [last_date + pd.DateOffset(months=3 * (i + 1)) for i in range(nb_predict)]
#         result = [{"date": d.strftime("%Y-%m-%d"), "valeur": float(v)} for d, v in zip(future_dates, predictions)]

#         return result

#     else:
#         future_dates = pd.date_range(start=last_date + pd.DateOffset(months=1), periods=nb_predict, freq='MS')
#          # Étape 11 : Format résultat principal
#         print("date future",future_dates)
#         result = [{"date": d.strftime("%Y-%m-%d"), "valeur": float(v)} for d, v in zip(future_dates, predictions)]

#         # Étape 12 : Calcul du MAPE sur les données test
#         y_test_pred = model.predict(X_test, verbose=0)
#         y_test_inv = scaler.inverse_transform(y_test.reshape(-1, 1))
#         y_test_pred_inv = scaler.inverse_transform(y_test_pred)
#         mape = mean_absolute_percentage_error(y_test_inv, y_test_pred_inv)
#         print("le mape",mape)

#         # Étape 13 : Création du dataframe historique
#         df = pd.DataFrame(data_list)
#         df["date"] = pd.to_datetime(df["date"])
#         df = df.rename(columns={"date": "Date", "valeur": "Valeur"})
#         print("**********",df)
#         # Étape 14 : Retour des résultats complets pour last_prediction_result
#         return {
#             "resultats_prediction": result,
#             "forecast_dates": future_dates,
#             "forecast": predictions.tolist(),
#             "history": history,
#             "mape": mape,
#             "df": df
#         }
        
    
#     # Étape 11 : Format du résultat
# *******************************

def grouper_par_periode(consommations, periode):
    if periode == 1:
        return [{"date": c.date.isoformat(), "valeur": c.valeur} for c in consommations]

    grouped = defaultdict(float)

    for c in consommations:
        d = c.date  # c.date est déjà un objet de type date

        if periode == 4:  # Trimestre
            trimestre = (d.month - 1) // 3 + 1
            cle = (d.year, trimestre)  # tuple comme clé
        elif periode == 12:  # Année
            cle = (d.year,)
        else:
            cle = (d.isoformat(),)

        grouped[cle] += c.valeur

    resultat = []
    for cle, valeur in grouped.items():
        if len(cle) == 2:  # Trimestre
            annee, trimestre = cle
            mois_debut = (trimestre - 1) * 3 + 1
            date_groupe = date(annee, mois_debut, 1).isoformat()
        elif len(cle) == 1 and isinstance(cle[0], int):  # Année
            date_groupe = date(cle[0], 1, 1).isoformat()
        else:  # cas général (rare)
            date_groupe = cle[0]

        resultat.append({
            "date": date_groupe,
            "valeur": valeur
        })

    resultat.sort(key=lambda x: x["date"])
    return resultat






# methode post a refaire 

@router.post("/predict")
async def predict_sarima(periode: int = Form(...), type_modele: str = Form(...), db: Session = Depends(get_db)):
    global last_prediction_result
    last_prediction_result = {}
    try:
        result = (
            db.query(
                Consommation.date,
                func.sum(Consommation.valeur).label("valeur")
            )
            .group_by(Consommation.date)
            .order_by(Consommation.date)
            .all()
        )

        # Transformation en DataFrame
        df = pd.DataFrame(result, columns=["date", "valeur"])
        
        # Conversion en datetime (optionnelle)
        df["date"] = pd.to_datetime(df["date"])
        df.set_index("date", inplace=True)
        
        
        train_size = int(len(df) * 0.8)
        train, test = df[:train_size], df[train_size:]

        if type_modele == "sarima" :

            # Définir les plages de recherche pour SARIMA
            p = d = q = range(0, 2)
            pdq = list(product(p, d, q))
            P= D = Q = range(0, 2)
            # seasonal_pdq = [(x[0], x[1], x[2], 24) for x in pdq]     # 24 = périodicité horaire
            seasonal_pdq = list(product(P, D, Q, [12]))

            best_rmse = float("inf")
            best_model = None
            best_params = None
            best_results = None


            for param in pdq:
                print("the seasonal param",param)
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

        
            forecast = best_model.forecast(steps=12)
            forecast_dates = pd.date_range(start=df.index[-1] + pd.DateOffset(months=1), periods=12, freq='MS')
          

            # Calcul du taux d’erreur (MAPE)
            if len(test) >= 12:
                mape = mean_absolute_percentage_error(test[:periode], best_model.predict(start=len(train), end=len(train) + periode - 1))
            else:
                mape = None  # Pas assez de données pour MAPE
            last_prediction_result = {
                "message": "Prédiction SARIMA effectuée avec succès",
                "methode": "SARIMA",
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
                    "dates": df.index.strftime("%Y-%m-%d %H:%M:%S").tolist(),
                    "valeurs": df["valeur"].tolist()
                }
            }

           
            return JSONResponse(content=last_prediction_result)
        
        elif type_modele == "arima" :

            # Définir les plages de recherche pour SARIMA
            p = q = range(0, 4)
            d = range(0, 2)
            pdq = list(product(p, d, q))

            best_rmse = float("inf")
            best_model = None
            best_params = None
            best_results = None


            for param in pdq:

                try:
                    print("the param",param)
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
            if best_model is None:
                raise ValueError("Aucun modèle ARIMA na réussi à sajuster.")

            # forecast = best_model.forecast(steps=12)
            # print("la valeur predite",forecast)
            # forecast_dates = pd.date_range(start=df.index[-1] + pd.DateOffset(months=1), periods=12, freq='MS')
            
            forecast = best_model.forecast(steps=12)
            forecast_dates = pd.date_range(start=df.index[-1] + pd.DateOffset(months=1), periods=12, freq='MS')
            
            
            # forecast = best_model.forecast(steps=periode)
            # forecast_dates = pd.date_range(start=df["Date"].iloc[-1] + pd.Timedelta(days=1), periods=periode, freq='D')


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
                "serie_originale": df["valeur"].tolist(),
                "criteres_information": {
                    "AIC": round(best_results.aic, 2),
                    "BIC": round(best_results.bic, 2)
                },
                "taux_erreur_mape": round(mape * 100, 2) if mape is not None else "Non calculé",
                "datesp": forecast_dates.strftime("%Y-%m-%d").tolist(),  # format date simple
                "valeursp": forecast.tolist(),  # valeurs prédites
                # "dates": forecast_dates.strftime("%Y-%m-%d").tolist(),  # format date simple
                # "valeurs": forecast.tolist(),  # valeurs prédites
                "dates": forecast_dates.strftime("%Y-%m-%d %H:%M:%S").tolist(),
                "valeurs": forecast.tolist(),
                "dates_predit": {
                    "debut": forecast_dates[0].strftime("%Y-%m-%d"),
                    "fin": forecast_dates[-1].strftime("%Y-%m-%d")
                },
                "donnees_historiques": {
                    "dates": df.index.strftime("%Y-%m-%d %H:%M:%S").tolist(),
                    "valeurs": df["valeur"].tolist()
                }
            }
        
        
            return JSONResponse(content=last_prediction_result)

        elif type_modele == 'lstm':
            
            # Normalisation des données
            
            # scaler = MinMaxScaler()
            # values = df["Valeur"].values.reshape(-1, 1)
            # scaled_values = scaler.fit_transform(values)
            
            # # Création des séquences
            # def create_sequences(data, seq_length):
            #     X, y = [], []
            #     for i in range(len(data)-seq_length):
            #         X.append(data[i:i+seq_length])
            #         y.append(data[i+seq_length])
            #     return np.array(X), np.array(y)
            
            # seq_length = 3  # Utiliser 24 heures comme séquence historique
            # X, y = create_sequences(scaled_values, seq_length)
            
            # Division train/test
            # train_size = int(len(X) * 0.8)
            # X_train, X_test = X[:train_size], X[train_size:]
            # y_train, y_test = y[:train_size], y[train_size:]
            # model = tf.keras.models.Sequential([
            #     tf.keras.layers.LSTM(units=50, return_sequences=True, input_shape=(seq_length, 1)),
            #     # tf.keras.Dropout(0.2),
            #     tf.keras.layers.LSTM(units=50),
            #     # tf.keras.Dropout(0.2),
            #     tf.keras.layers.Dense(1)
            # ])
            # model.compile(optimizer='adam', loss='mean_squared_error')
            # history = model.fit(
            #     X_train, y_train,
            #     epochs=25,  # Large marge (EarlyStopping gère l'arrêt)
            #     batch_size=12,  # Ni trop petit ni trop grand
            #     validation_data=(X_test, y_test),
            #     callbacks=[tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=10)],
            #     verbose=1
            # )
            #     # Prédiction sur les données de test pour calculer l'erreur
            # test_predict = model.predict(X_test)
            # test_predict = scaler.inverse_transform(test_predict)
            # y_test_actual = scaler.inverse_transform(y_test.reshape(-1, 1))
            
            # # Calcul du MAPE
            # mape = mean_absolute_percentage_error(y_test_actual, test_predict)
            
            # # Prédiction future
            # last_sequence = scaled_values[-seq_length:]
            # predictions = []
            
            # for _ in range(periode):
            #     next_pred = model.predict(last_sequence.reshape(1, seq_length, 1))
            #     predictions.append(next_pred[0,0])
            #     last_sequence = np.append(last_sequence[1:], next_pred[0,0])
            
            # predictions = scaler.inverse_transform(np.array(predictions).reshape(-1, 1))
            # forecast = predictions.flatten().tolist()
            
            # forecast_dates = pd.date_range(
            #     start=df["Date"].iloc[-1] + pd.Timedelta(hours=1),
            #     periods=periode,
            #     freq='H'
            # )


            data_list = df.reset_index()
            data_list['date'] = data_list['date'].astype(str)  # convertir les dates en chaînes
            data_list = data_list.to_dict(orient='records')    # [{'date': ..., 'valeur': ...}, {...}, ...]
            
            # Ensuite, tu appelles :
            outputs = predict_lstm(data_list, nb_predict=12)

            last_prediction_result = {
                "message": "Prédiction LSTM effectuée avec succès",
                "methode": "LSTM",
                "architecture": {
                    "couches": [
                        {"type": "LSTM", "units": 50},
                        {"type": "Dense", "units": 1}
                    ],
                    "optimizer": "adam",
                    "loss": "mean_squared_error",
                    "epochs": 50,
                    "batch_size": 32
                },
                "performance": {
                    "loss": outputs["history"].history['loss'][-1],
                    "val_loss": outputs["history"].history['val_loss'][-1],
                    "taux_erreur_mape": round(outputs["mape"] * 100, 2)
                },
                "dates_predit": {
                    "debut": outputs["forecast_dates"][0].strftime("%Y-%m-%d %H:%M:%S"),
                    "fin": outputs["forecast_dates"][-1].strftime("%Y-%m-%d %H:%M:%S")
                },
                "dates": [d.strftime("%Y-%m-%d %H:%M:%S") for d in outputs["forecast_dates"]],
                "valeurs": outputs["forecast"],
                "donnees_historiques": {
                    "dates": outputs["df"]["Date"].dt.strftime("%Y-%m-%d %H:%M:%S").tolist(),
                    "valeurs": outputs["df"]["Valeur"].tolist()
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

