# from fastapi import APIRouter,  Depends, Form, File, UploadFile
# from io import StringIO
# import io
# from fastapi.responses import JSONResponse
# import pandas as pd
# import numpy as np
# from statsmodels.tsa.statespace.sarimax import SARIMAX 
# from statsmodels.tsa.arima.model import ARIMA
# from itertools import product
# from sklearn.metrics import mean_squared_error, mean_absolute_percentage_error
# import warnings
# from app.database import get_db
# from app.models.model import Consommation , Sarima , Arima ,Prediction, PointPredit, LSTM
# from app.schemas.userSchema import ConsommationGroupeeResponse
# from app.schemas.prediction import PredictionResponse ,LSTMPredictionResponse
# from sqlalchemy import func
# from sqlalchemy.orm import Session
# from datetime import date
# from fastapi import HTTPException

# import tensorflow as tf
# from sklearn.preprocessing import MinMaxScaler
# from collections import defaultdict
# from sklearn.metrics import mean_absolute_percentage_error
# router = APIRouter()

# # router = APIRouter()
# warnings.filterwarnings("ignore")
# # def predict_lstm(data_list, nb_predict, db):
# #     print("je ss pas achou didifeghid daha ",data_list)
# #     lstm_config = db.query(LSTM).order_by(LSTM.id.desc()).first()
# #     if not lstm_config:
# #         raise HTTPException(status_code=404, detail="Configuration LSTM non trouvée")
# #     # === 1. Construction du DataFrame ===
# #     print("je ss pas achou didifeghid daha ",lstm_config)
    
# #     df = pd.DataFrame(data_list)
# #     df["date"] = pd.to_datetime(df["date"])
# #     df["valeur"] = df["valeur"].fillna(0)

# #     df["month"] = df["date"].dt.month
# #     df["year"] = df["date"].dt.year
# #     df["quarter"] = df["date"].dt.quarter

# #     # Encodage cyclique
# #     df["month_sin"] = np.sin(2 * np.pi * df["month"] / 12)
# #     df["month_cos"] = np.cos(2 * np.pi * df["month"] / 12)
# #     df["quarter_sin"] = np.sin(2 * np.pi * df["quarter"] / 4)
# #     df["quarter_cos"] = np.cos(2 * np.pi * df["quarter"] / 4)

# #     # Saisons
# #     df["is_winter"] = df["month"].isin([12, 1, 2]).astype(int)
# #     df["is_summer"] = df["month"].isin([6, 7, 8]).astype(int)

# #     # Moyenne mobile et lags
# #     df["moving_avg"] = df["valeur"].rolling(window=3).mean().fillna(method="bfill")
# #     df["lag_1"] = df["valeur"].shift(1).fillna(method="bfill")
# #     df["lag_3"] = df["valeur"].shift(3).fillna(method="bfill")

# #     # Normalisation
# #     scaler_val = MinMaxScaler()
# #     df["valeur_scaled"] = scaler_val.fit_transform(df[["valeur"]])
# #     df["year_scaled"] = MinMaxScaler().fit_transform(df[["year"]])
# #     df["moving_avg_scaled"] = MinMaxScaler().fit_transform(df[["moving_avg"]])
# #     df["lag_1_scaled"] = MinMaxScaler().fit_transform(df[["lag_1"]])
# #     df["lag_3_scaled"] = MinMaxScaler().fit_transform(df[["lag_3"]])

# #     # === 2. Séparation des features et target ===
# #     features_cols = [
# #         "valeur_scaled", "month_sin", "month_cos", "quarter_sin", "quarter_cos",
# #         "is_winter", "is_summer", "year_scaled", "moving_avg_scaled",
# #         "lag_1_scaled", "lag_3_scaled"
# #     ]
# #     features = df[features_cols].values
# #     target = df["valeur_scaled"].values

# #     # === 3. Création des séquences ===
# #     def create_sequences(features, targets, look_back):
# #         X, y = [], []
# #         for i in range(len(features) - look_back):
# #             X.append(features[i:i + look_back])
# #             y.append(targets[i + look_back])
# #         return np.array(X), np.array(y)

# #     X, y = create_sequences(features, target, lstm_config.seq_length)
# #     # print("les sequances",X)
# #     # print("les sequances",y)
# #     # === 4. Modèle LSTM ===
# #     model = tf.keras.models.Sequential([
# #         tf.keras.layers.Input(shape=(lstm_config.seq_length, len(features_cols))),
# #         tf.keras.layers.LSTM(108, return_sequences=True),
# #         tf.keras.layers.LSTM(64, return_sequences=True),
# #         tf.keras.layers.LSTM(64),
# #         tf.keras.layers.Dense(1)
# #     ])
# #     model.compile(optimizer='adam', loss='mean_squared_error')
# #     # model.fit(X, y, epochs=100, batch_size=16, verbose=0)
# #     history = model.fit(X, y, epochs=lstm_config.epochs, batch_size=lstm_config.batch_size, verbose=0)

# #     # === 5. Prédictions futures ===
# #     last_seq = features[-lstm_config.seq_length:]
# #     future_preds = []
# #     future_dates = pd.date_range(df["date"].iloc[-1] + pd.DateOffset(months=1), periods=nb_predict, freq='MS')

# #     for date in future_dates:
# #         month = date.month
# #         quarter = ((month - 1) // 3) + 1
# #         sin_m, cos_m = np.sin(2 * np.pi * month / 12), np.cos(2 * np.pi * month / 12)
# #         sin_q, cos_q = np.sin(2 * np.pi * quarter / 4), np.cos(2 * np.pi * quarter / 4)
# #         is_winter = int(month in [12, 1, 2])
# #         is_summer = int(month in [6, 7, 8])
# #         year_scaled = df["year_scaled"].iloc[-1]  # constante

# #         # Valeurs précédentes
# #         last_val = future_preds[-1] if future_preds else target[-1]
# #         lag_1, lag_3 = last_val, future_preds[-3] if len(future_preds) >= 3 else last_val
# #         moving_avg = np.mean(future_preds[-3:]) if len(future_preds) >= 3 else last_val

# #         lag_1_scaled = df["lag_1_scaled"].mean()
# #         lag_3_scaled = df["lag_3_scaled"].mean()
# #         moving_avg_scaled = df["moving_avg_scaled"].mean()

# #         input_vector = [
# #             last_val, sin_m, cos_m, sin_q, cos_q,
# #             is_winter, is_summer, year_scaled,
# #             moving_avg_scaled, lag_1_scaled, lag_3_scaled
# #         ]
# #         input_seq = np.vstack([last_seq[1:], input_vector])
# #         input_seq = input_seq.reshape(1, lstm_config.seq_length, len(features_cols))

# #         pred = model.predict(input_seq, verbose=0)[0, 0]
# #         future_preds.append(pred)
# #         last_seq = input_seq[0]

# #     future_preds_inv = scaler_val.inverse_transform(np.array(future_preds).reshape(-1, 1)).flatten()

# #     # === 6. MAPE
# #     y_pred = model.predict(X, verbose=0)
# #     y_true_inv = scaler_val.inverse_transform(y.reshape(-1, 1))
# #     y_pred_inv = scaler_val.inverse_transform(y_pred)
# #     mape = mean_absolute_percentage_error(y_true_inv, y_pred_inv)
# #     # === 7. Retour
# #     result = [{"date": d.strftime("%Y-%m-%d"), "valeur": float(v)} for d, v in zip(future_dates, future_preds_inv)]
# #     df_result = df.copy()
# #     # df_result = df_result.rename(columns={"date": "date", "valeur": "valeur"})

# #     # print ("athaaaa",future_preds_inv.tolist())
# #     print("forecast_dates", future_dates,
# #             "forecast", future_preds_inv.tolist(),
# #             "history", history,
# #             "mape", mape,
# #             "df", df)
# #     if nb_predict == 4:
# #         return result
# #     else:
# #         return {
# #             "resultats_prediction": result,
# #             "forecast_dates": future_dates,
# #             "forecast": future_preds_inv.tolist(),
# #             "mape": mape,
# #             "df": df,
# #             "params":{
# #                 "units1":lstm_config.unitsC1,
# #                 "units2":lstm_config.unitsC2,
# #                 "epochs":lstm_config.epochs,
# #                 "batch_size": lstm_config.batch_size,
# #                 "seq_len": lstm_config.seq_length,

# #             }

# #         }
# # ***********************
# def predict_lstm(data_list, nb_predict, sequence_length=10):
#     # === 1. Construction du DataFrame ===
#     df = pd.DataFrame(data_list)
#     df["date"] = pd.to_datetime(df["date"])
#     df["valeur"] = df["valeur"].fillna(0)

#     df["month"] = df["date"].dt.month
#     df["year"] = df["date"].dt.year
#     df["quarter"] = df["date"].dt.quarter

#     # Encodage cyclique
#     df["month_sin"] = np.sin(2 * np.pi * df["month"] / 12)
#     df["month_cos"] = np.cos(2 * np.pi * df["month"] / 12)
#     df["quarter_sin"] = np.sin(2 * np.pi * df["quarter"] / 4)
#     df["quarter_cos"] = np.cos(2 * np.pi * df["quarter"] / 4)

#     # Saisons
#     df["is_winter"] = df["month"].isin([12, 1, 2]).astype(int)
#     df["is_summer"] = df["month"].isin([6, 7, 8]).astype(int)

#     # Moyenne mobile et lags
#     df["moving_avg"] = df["valeur"].rolling(window=3).mean().fillna(method="bfill")
#     df["lag_1"] = df["valeur"].shift(1).fillna(method="bfill")
#     df["lag_3"] = df["valeur"].shift(3).fillna(method="bfill")

#     # Normalisation
#     scaler_val = MinMaxScaler()
#     df["valeur_scaled"] = scaler_val.fit_transform(df[["valeur"]])
#     df["year_scaled"] = MinMaxScaler().fit_transform(df[["year"]])
#     df["moving_avg_scaled"] = MinMaxScaler().fit_transform(df[["moving_avg"]])
#     df["lag_1_scaled"] = MinMaxScaler().fit_transform(df[["lag_1"]])
#     df["lag_3_scaled"] = MinMaxScaler().fit_transform(df[["lag_3"]])

#     # === 2. Séparation des features et target ===
#     features_cols = [
#         "valeur_scaled", "month_sin", "month_cos", "quarter_sin", "quarter_cos",
#         "is_winter", "is_summer", "year_scaled", "moving_avg_scaled",
#         "lag_1_scaled", "lag_3_scaled"
#     ]
#     features = df[features_cols].values
#     target = df["valeur_scaled"].values

#     # === 3. Création des séquences ===
#     def create_sequences(features, targets, look_back):
#         X, y = [], []
#         for i in range(len(features) - look_back):
#             X.append(features[i:i + look_back])
#             y.append(targets[i + look_back])
#         return np.array(X), np.array(y)

#     X, y = create_sequences(features, target, sequence_length)

#     # === 4. Modèle LSTM ===
#     model = tf.keras.models.Sequential([
#         tf.keras.layers.Input(shape=(sequence_length, len(features_cols))),
#         tf.keras.layers.LSTM(108, return_sequences=True),
#         tf.keras.layers.LSTM(64, return_sequences=True),
#         tf.keras.layers.LSTM(64),
#         tf.keras.layers.Dense(1)
#     ])
#     model.compile(optimizer='adam', loss='mean_squared_error')
#     # model.fit(X, y, epochs=100, batch_size=16, verbose=0)
#     history = model.fit(X, y, epochs=100, batch_size=16, verbose=0)

#     # === 5. Prédictions futures ===
#     last_seq = features[-sequence_length:]
#     future_preds = []
#     future_dates = pd.date_range(df["date"].iloc[-1] + pd.DateOffset(months=1), periods=nb_predict, freq='MS')

#     for date in future_dates:
#         month = date.month
#         quarter = ((month - 1) // 3) + 1
#         sin_m, cos_m = np.sin(2 * np.pi * month / 12), np.cos(2 * np.pi * month / 12)
#         sin_q, cos_q = np.sin(2 * np.pi * quarter / 4), np.cos(2 * np.pi * quarter / 4)
#         is_winter = int(month in [12, 1, 2])
#         is_summer = int(month in [6, 7, 8])
#         year_scaled = df["year_scaled"].iloc[-1]  # constante

#         # Valeurs précédentes
#         last_val = future_preds[-1] if future_preds else target[-1]
#         lag_1, lag_3 = last_val, future_preds[-3] if len(future_preds) >= 3 else last_val
#         moving_avg = np.mean(future_preds[-3:]) if len(future_preds) >= 3 else last_val

#         lag_1_scaled = df["lag_1_scaled"].mean()
#         lag_3_scaled = df["lag_3_scaled"].mean()
#         moving_avg_scaled = df["moving_avg_scaled"].mean()

#         input_vector = [
#             last_val, sin_m, cos_m, sin_q, cos_q,
#             is_winter, is_summer, year_scaled,
#             moving_avg_scaled, lag_1_scaled, lag_3_scaled
#         ]
#         input_seq = np.vstack([last_seq[1:], input_vector])
#         input_seq = input_seq.reshape(1, sequence_length, len(features_cols))

#         pred = model.predict(input_seq, verbose=0)[0, 0]
#         future_preds.append(pred)
#         last_seq = input_seq[0]

#     future_preds_inv = scaler_val.inverse_transform(np.array(future_preds).reshape(-1, 1)).flatten()

#     # === 6. MAPE
#     y_pred = model.predict(X, verbose=0)
#     y_true_inv = scaler_val.inverse_transform(y.reshape(-1, 1))
#     y_pred_inv = scaler_val.inverse_transform(y_pred)
#     mape = mean_absolute_percentage_error(y_true_inv, y_pred_inv)
#     # === 7. Retour
#     result = [{"date": d.strftime("%Y-%m-%d"), "valeur": float(v)} for d, v in zip(future_dates, future_preds_inv)]
#     df_result = df.copy()
#     # df_result = df_result.rename(columns={"date": "date", "valeur": "valeur"})

#     # print ("athaaaa",future_preds_inv.tolist())
#     print("resultats_prediction", result,
#             "forecast_dates", future_dates,
#             "forecast", future_preds_inv.tolist(),
#             "history", history,
#             "mape", mape,
#             "df", df)
#     if nb_predict == 4:
#         return result
#     else:
#         return {
#             "resultats_prediction": result,
#             "forecast_dates": future_dates,
#             "forecast": future_preds_inv.tolist(),
#             "history": history,
#             "mape": mape,
#             "df": df
#         }
# # *************

# # def predict_lstm(data_list, nb_predict, sequence_length=3, test_ratio=0.3):
# #     # Étape 1 : Extraction des valeurs
# #     valeurs = [item['valeur'] if item['valeur'] is not None else 0 for item in data_list]

# #     if len(valeurs) < sequence_length + 1:
# #         raise ValueError("Pas assez de données pour entraîner le modèle")

# #     # Étape 2 : Normalisation
# #     scaler = MinMaxScaler()
# #     valeurs_scaled = scaler.fit_transform(np.array(valeurs).reshape(-1, 1))

# #     # Étape 3 : Séparation train/test
# #     split_index = int(len(valeurs_scaled) * (1 - test_ratio))
# #     print('alalalalala',split_index)
# #     train_scaled = valeurs_scaled[:split_index]
# #     test_scaled = valeurs_scaled[split_index - sequence_length:]

# #     # Étape 4 : Séquences train
# #     X_train, y_train = [], []
# #     for i in range(len(train_scaled) - sequence_length):
# #         X_train.append(train_scaled[i:i + sequence_length])
# #         y_train.append(train_scaled[i + sequence_length])
# #     X_train = np.array(X_train)
# #     y_train = np.array(y_train)

# #     # Étape 5 : Séquences test
# #     X_test, y_test = [], []
# #     for i in range(len(test_scaled) - sequence_length):
# #         X_test.append(test_scaled[i:i + sequence_length])
# #         y_test.append(test_scaled[i + sequence_length])
# #     X_test = np.array(X_test)
# #     y_test = np.array(y_test)

# #     # Étape 6 : Modèle LSTM avec 2 couches
# #     model = tf.keras.models.Sequential([
# #         tf.keras.layers.LSTM(units=150, return_sequences=True, input_shape=(X_train.shape[1], X_train.shape[2])),
# #         tf.keras.layers.LSTM(units=250),
# #         tf.keras.layers.Dense(1)
# #     ])
# #     model.compile(optimizer='adam', loss='mean_squared_error')

# #     # Étape 7 : Entraînement
# #     history = model.fit(
# #         X_train, y_train,
# #         epochs=800,
# #         batch_size=18,
# #         validation_data=(X_test, y_test),
# #         callbacks=[tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=10)],
# #         verbose=1
# #     )

# #     # Étape 8 : Prédiction future
# #     pred_input = valeurs_scaled[-sequence_length:]
# #     predictions_scaled = []
# #     for _ in range(nb_predict):
# #         input_seq = pred_input.reshape(1, sequence_length, 1)
# #         pred = model.predict(input_seq, verbose=0)
# #         predictions_scaled.append(pred[0][0])
# #         pred_input = np.append(pred_input[1:], pred[0][0])

# #     # Étape 9 : Dénormalisation
# #     predictions = scaler.inverse_transform(np.array(predictions_scaled).reshape(-1, 1)).flatten()

# #     # Étape 10 : Génération des dates futures
# #     last_date = pd.to_datetime(data_list[-1]["date"])
# #     if nb_predict == 4:
# #         future_dates = [last_date + pd.DateOffset(months=3 * (i + 1)) for i in range(nb_predict)]
# #     else:
# #         future_dates = pd.date_range(start=last_date + pd.DateOffset(months=1), periods=nb_predict, freq='MS')

# #     result = [{"date": d.strftime("%Y-%m-%d"), "valeur": float(v)} for d, v in zip(future_dates, predictions)]

# #     # Étape 11 : Évaluation MAPE
# #     y_test_pred = model.predict(X_test, verbose=0)
# #     y_test_inv = scaler.inverse_transform(y_test.reshape(-1, 1))
# #     y_test_pred_inv = scaler.inverse_transform(y_test_pred)
# #     mape = mean_absolute_percentage_error(y_test_inv, y_test_pred_inv)

# #     # Étape 12 : DataFrame historique
# #     df = pd.DataFrame(data_list)
# #     df["date"] = pd.to_datetime(df["date"])
# #     df = df.rename(columns={"date": "Date", "valeur": "Valeur"})

# #     if nb_predict == 4:
# #         return result
# #     else:
# #         return {
# #             "resultats_prediction": result,
# #             "forecast_dates": future_dates,
# #             "forecast": predictions.tolist(),
# #             "history": history,
# #             "mape": mape,
# #             "df": df
# #         }

# def grouper_par_periode(consommations, periode):
#     if periode == 1:
#         return [{"date": c.date.isoformat(), "valeur": c.valeur} for c in consommations]

#     grouped = defaultdict(float)

#     for c in consommations:
#         d = c.date  # c.date est déjà un objet de type date

#         if periode == 4:  # Trimestre
#             trimestre = (d.month - 1) // 3 + 1
#             cle = (d.year, trimestre)  # tuple comme clé
#         elif periode == 12:  # Année
#             cle = (d.year,)
#         else:
#             cle = (d.isoformat(),)

#         grouped[cle] += c.valeur

#     resultat = []
#     for cle, valeur in grouped.items():
#         if len(cle) == 2:  # Trimestre
#             annee, trimestre = cle
#             mois_debut = (trimestre - 1) * 3 + 1
#             date_groupe = date(annee, mois_debut, 1).isoformat()
#         elif len(cle) == 1 and isinstance(cle[0], int):  # Année
#             date_groupe = date(cle[0], 1, 1).isoformat()
#         else:  # cas général (rare)
#             date_groupe = cle[0]

#         resultat.append({
#             "date": date_groupe,
#             "valeur": valeur
#         })

#     resultat.sort(key=lambda x: x["date"])
#     return resultat






# # methode post a refaire 

# @router.post("/predict", response_model=PredictionResponse)
# async def predict_sarima(periode: int = Form(...),titre: str = Form(...), type_modele: str = Form(...), db: Session = Depends(get_db)):
#     global last_prediction_result
#     last_prediction_result = {}
#     try:
#         result = (
#             db.query(
#                 Consommation.date,
#                 func.sum(Consommation.valeur).label("valeur")
#             )
#             .group_by(Consommation.date)
#             .order_by(Consommation.date)
#             .all()
#         )
#         print("Résultat brut SQL :", result)

#         # Transformation en DataFrame
#         df = pd.DataFrame(result, columns=["date", "valeur"])
#         print("DataFrame brut :", df.head())

#         # Conversion en datetime (optionnelle)
#         df["date"] = pd.to_datetime(df["date"])
#         df.set_index("date", inplace=True)
#         # print(result)
#         print(type_modele)
        
#         train_size = int(len(df) * 0.7)
#         train, test = df[:train_size], df[train_size:]

#         if type_modele == "sarima" :

#             # Récupération du dernier modèle SARIMA enregistré
#             sarima = db.query(Sarima).order_by(Sarima.id.desc()).first()
#             if not sarima:
#                 raise HTTPException(status_code=404, detail="Aucun modèle SARIMA trouvé en base.")
#             print(sarima)
#             # Récupération des paramètres depuis la BDD
#             order = (sarima.p, sarima.d, sarima.q)
#             seasonal_order = (sarima.P, sarima.D, sarima.Q, sarima.s)
#             mape = sarima.mape
#             print("order = (", sarima.p, sarima.d, sarima.q, ") seasonal_order = (", sarima.P, sarima.D, sarima.Q, sarima.s, ") mape = ", sarima.mape)

#             # Construction du modèle
#             model = SARIMAX(train, order=order, seasonal_order=seasonal_order,
#                             enforce_stationarity=False, enforce_invertibility=False)
#             results = model.fit(disp=False)

#             # Prédiction
#             forecast = results.forecast(steps=12)
#             forecast_dates = pd.date_range(start=df.index[-1] + pd.DateOffset(months=1), periods=12, freq='MS')
#             # 1. Charger la dernière prédiction SARIMA
#             last_prediction = db.query(Prediction)\
#                 .filter(Prediction.typeC == "SARIMA")\
#                 .order_by(Prediction.id.desc())\
#                 .first()

#             # 2. Récupérer ses points historiques
#             somme_historiques = 0
#             if last_prediction:
#                 historiques = db.query(PointPredit)\
#                     .filter(PointPredit.prediction_id == last_prediction.id)\
#                     .filter(PointPredit.typep == "historique")\
#                     .all()
#                 somme_historiques = sum(p.valeur_predite for p in historiques)

#             # 3. Calculer la somme des consommations actuelles
#             somme_actuelle = df["valeur"].sum()
#             print(titre)
#             # 4. Comparaison
#             if round(somme_actuelle, 2) != round(somme_historiques, 2):
#                 # 4. Création de l'objet Prediction
#                 prediction_obj = Prediction(
#                     titre=titre,
#                     period=periode,
#                     typeC="SARIMA"
#                 )
#                 db.add(prediction_obj)
#                 db.flush()  # Pour obtenir l'ID sans commit

#                 # 5. Ajouter les points forecast
#                 for date_, val in zip(forecast_dates, forecast.tolist()):
#                     point = PointPredit(
#                         dateP=date_,
#                         valeur_predite=val,
#                         typep="predit",
#                         prediction_id=prediction_obj.id
#                     )
#                     db.add(point)

#                 # 6. Ajouter les points historiques
#                 for date_, val in zip(df.index.tolist(), df["valeur"].tolist()):
#                     point = PointPredit(
#                         dateP=date_,
#                         valeur_predite=val,
#                         typep="historique",
#                         prediction_id=prediction_obj.id
#                     )
#                     db.add(point)

                
#                 last_sarima = db.query(Sarima).order_by(Sarima.id.desc()).first()

#                 # 3. Lui affecter la prédiction créée
#                 if last_sarima:
#                     last_sarima.pred_id = prediction_obj.id
#                     db.add(last_sarima)  
#                 db.commit()

#             # Construction du résultat final
#             last_prediction_result = {
#                 "message": "Prédiction SARIMA effectuée avec succès",
#                 "methode": "SARIMA",
#                 "meilleurs_parametres": {
#                     "order": order,
#                     "seasonal_order": seasonal_order
#                 },
#                 "dates_predit": {
#                     "debut": forecast_dates[0].strftime("%Y-%m-%d"),
#                     "fin": forecast_dates[-1].strftime("%Y-%m-%d")
#                 },
#                 "taux_erreur_mape": round(mape, 2) if mape is not None else "Non calculé",
#                 "dates": forecast_dates.strftime("%Y-%m-%d %H:%M:%S").tolist(),
#                 "valeurs": forecast.tolist(),
#                 "donnees_historiques": {
#                     "dates": df.index.strftime("%Y-%m-%d %H:%M:%S").tolist(),
#                     "valeurs": df["valeur"].tolist()
#                 }
#             }
           
#             return JSONResponse(content=last_prediction_result)
        
#         elif type_modele == "arima" :

#             arima = db.query(Arima).order_by(Arima.id.desc()).first()
#             order = (arima.p, arima.d, arima.q)
#             model = ARIMA(train, order=order)
#             results = model.fit()
#             forecast = results.forecast(steps=12)
#             forecast_dates = pd.date_range(start=df.index[-1] + pd.DateOffset(months=1), periods=12, freq='MS')
#             mape = arima.mape

#             last_prediction = db.query(Prediction)\
#                 .filter(Prediction.typeC == "ARIMA")\
#                 .order_by(Prediction.id.desc())\
#                 .first()

#             # 2. Récupérer ses points historiques
#             somme_historiques = 0
#             if last_prediction:
#                 historiques = db.query(PointPredit)\
#                     .filter(PointPredit.prediction_id == last_prediction.id)\
#                     .filter(PointPredit.typep == "historique")\
#                     .all()
#                 somme_historiques = sum(p.valeur_predite for p in historiques)

#             # 3. Calculer la somme des consommations actuelles
#             somme_actuelle = df["valeur"].sum()

#             # 4. Comparaison
#             if round(somme_actuelle, 2) != round(somme_historiques, 2):
#                 # 4. Création de l'objet Prediction
#                 prediction_obj = Prediction(
#                     titre=titre,
#                     period=periode,
#                     typeC="ARIMA"
#                 )
#                 db.add(prediction_obj)
#                 db.flush()  # Pour obtenir l'ID sans commit

#                 # 5. Ajouter les points forecast
#                 for date_, val in zip(forecast_dates, forecast.tolist()):
#                     point = PointPredit(
#                         dateP=date_,
#                         valeur_predite=val,
#                         typep="predit",
#                         prediction_id=prediction_obj.id
#                     )
#                     db.add(point)

#                 # 6. Ajouter les points historiques
#                 for date_, val in zip(df.index.tolist(), df["valeur"].tolist()):
#                     point = PointPredit(
#                         dateP=date_,
#                         valeur_predite=val,
#                         typep="historique",
#                         prediction_id=prediction_obj.id
#                     )
#                     db.add(point)

#                 last_arima = db.query(Arima).order_by(Arima.id.desc()).first()

#                 if last_arima:
#                     last_arima.pred_id = prediction_obj.id
#                     db.add(last_arima) 

#                 db.commit()
#             last_prediction_result ={
#                 "message": "Prédiction ARIMA effectuée avec succès",
#                 "meilleurs_parametres": {
#                     "order": order,
#                     "seasonal_order": None,
#                 },
#                 "methode" : "ARIMA",
#                 "serie_originale": df["valeur"].tolist(),
#                 "criteres_information": {
#                     "AIC": round(results.aic, 2),
#                     "BIC": round(results.bic, 2)
#                 },
#                 "taux_erreur_mape": round(mape, 2),
#                 "datesp": forecast_dates.strftime("%Y-%m-%d").tolist(),  # format date simple
#                 "valeursp": forecast.tolist(),  # valeurs prédites
#                 # "dates": forecast_dates.strftime("%Y-%m-%d").tolist(),  # format date simple
#                 # "valeurs": forecast.tolist(),  # valeurs prédites
#                 "dates": forecast_dates.strftime("%Y-%m-%d %H:%M:%S").tolist(),
#                 "valeurs": forecast.tolist(),
#                 "dates_predit": {
#                     "debut": forecast_dates[0].strftime("%Y-%m-%d"),
#                     "fin": forecast_dates[-1].strftime("%Y-%m-%d")
#                 },
#                 "donnees_historiques": {
#                     "dates": df.index.strftime("%Y-%m-%d %H:%M:%S").tolist(),
#                     "valeurs": df["valeur"].tolist()
#                 }
#             }
        
        
#             return JSONResponse(content=last_prediction_result)

#         elif type_modele == 'lstm':


#             # data_list = df.reset_index()
#             # data_list['date'] = data_list['date'].astype(str)  
#             # data_list = data_list.to_dict(orient='records')   
#             # # Ensuite, tu appelles :
#             # print("hello you",data_list)
#             # outputs = predict_lstm(data_list, nb_predict=12)
#             # print("Params from outputs:", outputs["params"])
            
#             data_list = df.reset_index()
#             data_list['date'] = data_list['date'].astype(str)  # convertir les dates en chaînes
#             data_list = data_list.to_dict(orient='records')    # [{'date': ..., 'valeur': ...}, {...}, ...]
#             # Ensuite, tu appelles :
#             outputs = predict_lstm(data_list, nb_predict=12)

#             # history = outputs["history"].history
#             # last_prediction_result = {
#             #     "message": "Prédiction LSTM effectuée avec succès",
#             #     "methode": "LSTM",
#             #     "architecture": {
#             #         "units1": outputs["params"]["units1"],
#             #         "units2": outputs["params"]["units2"],
#             #         "epochs": outputs["params"]["epochs"],
#             #         "batch_size": outputs["params"]["batch_size"],
#             #         "seq_len": outputs["params"]["seq_len"],
#             #     },
               
#             #     "dates_predit": {
#             #         "debut": outputs["forecast_dates"][0].strftime("%Y-%m-%d %H:%M:%S"),
#             #         "fin": outputs["forecast_dates"][-1].strftime("%Y-%m-%d %H:%M:%S")
#             #     },
#             #     "dates": [d.strftime("%Y-%m-%d %H:%M:%S") for d in outputs["forecast_dates"]],
#             #     "valeurs": outputs["forecast"],
#             #     "donnees_historiques": {
#             #         "dates": outputs["df"]["date"].dt.strftime("%Y-%m-%d %H:%M:%S").tolist(),
#             #         "valeurs": outputs["df"]["valeur"].tolist()
#             #     }
#             # }
#             history = outputs["history"].history
#             last_prediction_result = {
#                 "message": "Prédiction LSTM effectuée avec succès",
#                 "methode": "LSTM",
#                 "architecture": {
#                     "couches": [
#                         {"type": "LSTM", "units": 50},
#                         {"type": "Dense", "units": 1}
#                     ],
#                     "optimizer": "adam",
#                     "loss": "mean_squared_error",
#                     "epochs": 50,
#                     "batch_size": 32
#                 },
#                 "performance": {
#                     "loss": history["loss"][-1],
#                     "taux_erreur_mape": round(outputs["mape"] * 100, 2)
#                 },
#                 "dates_predit": {
#                     "debut": outputs["forecast_dates"][0].strftime("%Y-%m-%d %H:%M:%S"),
#                     "fin": outputs["forecast_dates"][-1].strftime("%Y-%m-%d %H:%M:%S")
#                 },
#                 "dates": [d.strftime("%Y-%m-%d %H:%M:%S") for d in outputs["forecast_dates"]],
#                 "valeurs": outputs["forecast"],
#                 "donnees_historiques": {
#                     "dates": outputs["df"]["date"].dt.strftime("%Y-%m-%d %H:%M:%S").tolist(),
#                     "valeurs": outputs["df"]["valeur"].tolist()
#                 }
#             }
#             # last_prediction_result = {
#             #     "message": "Prédiction LSTM effectuée avec succès",
#             #     "methode": "LSTM",
#             #     "architecture": {
#             #         "couches": [
#             #             {"type": "LSTM", "units": 50},
#             #             {"type": "Dense", "units": 1}
#             #         ],
#             #         "optimizer": "adam",
#             #         "loss": "mean_squared_error",
#             #         "epochs": 50,
#             #         "batch_size": 32
#             #     },
#             #     "performance": {
#             #         # "loss": outputs["history"].history['loss'][-1],
#             #         "taux_erreur_mape": round(outputs["mape"] * 100, 2)
#             #     },
#             #     "dates_predit": {
#             #         "debut": outputs["forecast_dates"][0].strftime("%Y-%m-%d %H:%M:%S"),
#             #         "fin": outputs["forecast_dates"][-1].strftime("%Y-%m-%d %H:%M:%S")
#             #     },
#             #     "dates": [d.strftime("%Y-%m-%d %H:%M:%S") for d in outputs["forecast_dates"]],
#             #     "valeurs": outputs["forecast"],
#             #     "donnees_historiques": {
#             #         "dates": outputs["df"]["Date"].dt.strftime("%Y-%m-%d %H:%M:%S").tolist(),
#             #         "valeurs": outputs["df"]["Valeur"].tolist()
#             #     }
#             # }

        
#         return JSONResponse(content=last_prediction_result)

                    
            
        
#     except Exception as e:
#         return JSONResponse(status_code=500, content={
#             "message": f"Erreur lors de la prédiction : {str(e)}"
#         })




# # @router.post("/predictARIMA")
# # async def predict_arima(periode: int = Form(...), fichier: UploadFile = File(...)):
# #     global last_prediction_result
    

             
            
        
#     except Exception as e:
#         return JSONResponse(status_code=500, content={
#             "message": f"Erreur lors de la prédiction : {str(e)}"
#         })

# @router.get("/last_prediction")
# async def get_last_prediction():
#     if last_prediction_result:
#         return JSONResponse(content=last_prediction_result)
#     else:
#         return JSONResponse(status_code=404, content={"message": "Aucune prédiction disponible pour le moment."})

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
from app.models.model import Consommation , Sarima , Arima ,Prediction, PointPredit ,LSTM
from app.schemas.userSchema import ConsommationGroupeeResponse
from app.schemas.prediction import SARIMAPredictionResponse
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
from sklearn.metrics import mean_absolute_percentage_error
from fastapi import HTTPException
router = APIRouter()

# router = APIRouter()
warnings.filterwarnings("ignore")

def predict_lstm(data_list, nb_predict, db , sequence_length=10):
    # import numpy as np
    # import pandas as pd
    # from sklearn.preprocessing import MinMaxScaler
    # from tensorflow.keras.models import Sequential
    # from tensorflow.keras.layers import Input, LSTM, Dense
    # from sklearn.metrics import mean_absolute_percentage_error
    # import tensorflow as tf

    # === 1. Construction du DataFrame ===
    # print("je ss pas acxhou didifeghid daha ",data_list)
    lstm_config = db.query(LSTM).order_by(LSTM.id.desc()).first()
    if not lstm_config:
        raise HTTPException(status_code=404, detail="Configuration LSTM non trouvée")
    # === 1. Construction du DataFrame ===
    print("je ss pas achou didifeghid daha ",lstm_config)
    df = pd.DataFrame(data_list)
    df["date"] = pd.to_datetime(df["date"])
    df["valeur"] = df["valeur"].fillna(0)

    df["month"] = df["date"].dt.month
    df["year"] = df["date"].dt.year
    df["quarter"] = df["date"].dt.quarter

    # Encodage cyclique
    df["month_sin"] = np.sin(2 * np.pi * df["month"] / 12)
    df["month_cos"] = np.cos(2 * np.pi * df["month"] / 12)
    df["quarter_sin"] = np.sin(2 * np.pi * df["quarter"] / 4)
    df["quarter_cos"] = np.cos(2 * np.pi * df["quarter"] / 4)

    # Saisons
    df["is_winter"] = df["month"].isin([12, 1, 2]).astype(int)
    df["is_summer"] = df["month"].isin([6, 7, 8]).astype(int)

    # Moyenne mobile et lags
    df["moving_avg"] = df["valeur"].rolling(window=3).mean().fillna(method="bfill")
    df["lag_1"] = df["valeur"].shift(1).fillna(method="bfill")
    df["lag_3"] = df["valeur"].shift(3).fillna(method="bfill")

    # Normalisation
    scaler_val = MinMaxScaler()
    df["valeur_scaled"] = scaler_val.fit_transform(df[["valeur"]])
    df["year_scaled"] = MinMaxScaler().fit_transform(df[["year"]])
    df["moving_avg_scaled"] = MinMaxScaler().fit_transform(df[["moving_avg"]])
    df["lag_1_scaled"] = MinMaxScaler().fit_transform(df[["lag_1"]])
    df["lag_3_scaled"] = MinMaxScaler().fit_transform(df[["lag_3"]])

    # === 2. Séparation des features et target ===
    features_cols = [
        "valeur_scaled", "month_sin", "month_cos", "quarter_sin", "quarter_cos",
        "is_winter", "is_summer", "year_scaled", "moving_avg_scaled",
        "lag_1_scaled", "lag_3_scaled"
    ]
    features = df[features_cols].values
    target = df["valeur_scaled"].values

    # === 3. Création des séquences ===
    def create_sequences(features, targets, look_back):
        X, y = [], []
        for i in range(len(features) - look_back):
            X.append(features[i:i + look_back])
            y.append(targets[i + look_back])
        return np.array(X), np.array(y)

    X, y = create_sequences(features, target, sequence_length)

    # === 4. Modèle LSTM ===
    model = tf.keras.models.Sequential([
        tf.keras.layers.Input(shape=(sequence_length, len(features_cols))),
        tf.keras.layers.LSTM(108, return_sequences=True),
        tf.keras.layers.LSTM(64, return_sequences=True),
        tf.keras.layers.LSTM(64),
        tf.keras.layers.Dense(1)
    ])
    model.compile(optimizer='adam', loss='mean_squared_error')
    # model.fit(X, y, epochs=100, batch_size=16, verbose=0)
    history = model.fit(X, y, epochs=100, batch_size=16, verbose=0)

    # === 5. Prédictions futures ===
    last_seq = features[-sequence_length:]
    future_preds = []
    future_dates = pd.date_range(df["date"].iloc[-1] + pd.DateOffset(months=1), periods=nb_predict, freq='MS')

    for date in future_dates:
        month = date.month
        quarter = ((month - 1) // 3) + 1
        sin_m, cos_m = np.sin(2 * np.pi * month / 12), np.cos(2 * np.pi * month / 12)
        sin_q, cos_q = np.sin(2 * np.pi * quarter / 4), np.cos(2 * np.pi * quarter / 4)
        is_winter = int(month in [12, 1, 2])
        is_summer = int(month in [6, 7, 8])
        year_scaled = df["year_scaled"].iloc[-1]  # constante

        # Valeurs précédentes
        last_val = future_preds[-1] if future_preds else target[-1]
        lag_1, lag_3 = last_val, future_preds[-3] if len(future_preds) >= 3 else last_val
        moving_avg = np.mean(future_preds[-3:]) if len(future_preds) >= 3 else last_val

        lag_1_scaled = df["lag_1_scaled"].mean()
        lag_3_scaled = df["lag_3_scaled"].mean()
        moving_avg_scaled = df["moving_avg_scaled"].mean()

        input_vector = [
            last_val, sin_m, cos_m, sin_q, cos_q,
            is_winter, is_summer, year_scaled,
            moving_avg_scaled, lag_1_scaled, lag_3_scaled
        ]
        input_seq = np.vstack([last_seq[1:], input_vector])
        input_seq = input_seq.reshape(1, sequence_length, len(features_cols))

        pred = model.predict(input_seq, verbose=0)[0, 0]
        future_preds.append(pred)
        last_seq = input_seq[0]

    future_preds_inv = scaler_val.inverse_transform(np.array(future_preds).reshape(-1, 1)).flatten()

    # === 6. MAPE
    y_pred = model.predict(X, verbose=0)
    y_true_inv = scaler_val.inverse_transform(y.reshape(-1, 1))
    y_pred_inv = scaler_val.inverse_transform(y_pred)
    mape = mean_absolute_percentage_error(y_true_inv, y_pred_inv)
    # === 7. Retour
    result = [{"date": d.strftime("%Y-%m-%d"), "valeur": float(v)} for d, v in zip(future_dates, future_preds_inv)]
    df_result = df.copy()
    # df_result = df_result.rename(columns={"date": "date", "valeur": "valeur"})

    # print ("athaaaa",future_preds_inv.tolist())
    print("resultats_prediction", result,
            "forecast_dates", future_dates,
            "forecast", future_preds_inv.tolist(),
            "history", history,
            "mape", mape,
            "df", df)
    if nb_predict == 4:
        return result
    else:
        # return {
        #     "resultats_prediction": result,
        #     "forecast_dates": future_dates,
        #     "forecast": future_preds_inv.tolist(),
        #     "mape": mape,
        #     "df": df_result
        # }
        # return {
        #     "resultats_prediction": result,
        #     "forecast_dates": future_dates,
        #     "forecast": future_preds_inv.tolist(),
        #     "mape": mape,
        #     "df": df_result,
        #     "history": history  # ✅ <-- ajoute ceci
        # }
        return {
            "resultats_prediction": result,
            "forecast_dates": future_dates,
            "forecast": future_preds_inv.tolist(),
            "history": history,
            "mape": mape,
            "df": df
        }


# def predict_lstm(data_list, nb_predict, sequence_length=3, test_ratio=0.3):
#     # Étape 1 : Extraction des valeurs
#     valeurs = [item['valeur'] if item['valeur'] is not None else 0 for item in data_list]

#     if len(valeurs) < sequence_length + 1:
#         raise ValueError("Pas assez de données pour entraîner le modèle")

#     # Étape 2 : Normalisation
#     scaler = MinMaxScaler()
#     valeurs_scaled = scaler.fit_transform(np.array(valeurs).reshape(-1, 1))

#     # Étape 3 : Séparation train/test
#     split_index = int(len(valeurs_scaled) * (1 - test_ratio))
#     print('alalalalala',split_index)
#     train_scaled = valeurs_scaled[:split_index]
#     test_scaled = valeurs_scaled[split_index - sequence_length:]

#     # Étape 4 : Séquences train
#     X_train, y_train = [], []
#     for i in range(len(train_scaled) - sequence_length):
#         X_train.append(train_scaled[i:i + sequence_length])
#         y_train.append(train_scaled[i + sequence_length])
#     X_train = np.array(X_train)
#     y_train = np.array(y_train)

#     # Étape 5 : Séquences test
#     X_test, y_test = [], []
#     for i in range(len(test_scaled) - sequence_length):
#         X_test.append(test_scaled[i:i + sequence_length])
#         y_test.append(test_scaled[i + sequence_length])
#     X_test = np.array(X_test)
#     y_test = np.array(y_test)

#     # Étape 6 : Modèle LSTM avec 2 couches
#     model = tf.keras.models.Sequential([
#         tf.keras.layers.LSTM(units=150, return_sequences=True, input_shape=(X_train.shape[1], X_train.shape[2])),
#         tf.keras.layers.LSTM(units=250),
#         tf.keras.layers.Dense(1)
#     ])
#     model.compile(optimizer='adam', loss='mean_squared_error')

#     # Étape 7 : Entraînement
#     history = model.fit(
#         X_train, y_train,
#         epochs=800,
#         batch_size=18,
#         validation_data=(X_test, y_test),
#         callbacks=[tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=10)],
#         verbose=1
#     )

#     # Étape 8 : Prédiction future
#     pred_input = valeurs_scaled[-sequence_length:]
#     predictions_scaled = []
#     for _ in range(nb_predict):
#         input_seq = pred_input.reshape(1, sequence_length, 1)
#         pred = model.predict(input_seq, verbose=0)
#         predictions_scaled.append(pred[0][0])
#         pred_input = np.append(pred_input[1:], pred[0][0])

#     # Étape 9 : Dénormalisation
#     predictions = scaler.inverse_transform(np.array(predictions_scaled).reshape(-1, 1)).flatten()

#     # Étape 10 : Génération des dates futures
#     last_date = pd.to_datetime(data_list[-1]["date"])
#     if nb_predict == 4:
#         future_dates = [last_date + pd.DateOffset(months=3 * (i + 1)) for i in range(nb_predict)]
#     else:
#         future_dates = pd.date_range(start=last_date + pd.DateOffset(months=1), periods=nb_predict, freq='MS')

#     result = [{"date": d.strftime("%Y-%m-%d"), "valeur": float(v)} for d, v in zip(future_dates, predictions)]

#     # Étape 11 : Évaluation MAPE
#     y_test_pred = model.predict(X_test, verbose=0)
#     y_test_inv = scaler.inverse_transform(y_test.reshape(-1, 1))
#     y_test_pred_inv = scaler.inverse_transform(y_test_pred)
#     mape = mean_absolute_percentage_error(y_test_inv, y_test_pred_inv)

#     # Étape 12 : DataFrame historique
#     df = pd.DataFrame(data_list)
#     df["date"] = pd.to_datetime(df["date"])
#     df = df.rename(columns={"date": "Date", "valeur": "Valeur"})

#     if nb_predict == 4:
#         return result
#     else:
#         return {
#             "resultats_prediction": result,
#             "forecast_dates": future_dates,
#             "forecast": predictions.tolist(),
#             "history": history,
#             "mape": mape,
#             "df": df
#         }

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

@router.post("/predict", response_model=SARIMAPredictionResponse)
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
        
        
        train_size = int(len(df) * 0.7)
        train, test = df[:train_size], df[train_size:]

        if type_modele == "sarima" :

            # Récupération du dernier modèle SARIMA enregistré
            sarima = db.query(Sarima).order_by(Sarima.id.desc()).first()
            # if not sarima:
            #     raise HTTPException(status_code=404, detail="Aucun modèle SARIMA trouvé en base.")

            # Récupération des paramètres depuis la BDD
            order = (sarima.p, sarima.d, sarima.q)
            seasonal_order = (sarima.P, sarima.D, sarima.Q, sarima.s)
            mape = sarima.mape

            # Construction du modèle
            model = SARIMAX(train, order=order, seasonal_order=seasonal_order,
                            enforce_stationarity=False, enforce_invertibility=False)
            results = model.fit(disp=False)

            # Prédiction
            forecast = results.forecast(steps=12)
            forecast_dates = pd.date_range(start=df.index[-1] + pd.DateOffset(months=1), periods=12, freq='MS')
            # 1. Charger la dernière prédiction SARIMA
            last_prediction = db.query(Prediction)\
                .filter(Prediction.typeC == "SARIMA")\
                .order_by(Prediction.id.desc())\
                .first()

            # 2. Récupérer ses points historiques
            somme_historiques = 0
            if last_prediction:
                historiques = db.query(PointPredit)\
                    .filter(PointPredit.prediction_id == last_prediction.id)\
                    .filter(PointPredit.typep == "historique")\
                    .all()
                somme_historiques = sum(p.valeur_predite for p in historiques)

            # 3. Calculer la somme des consommations actuelles
            somme_actuelle = df["valeur"].sum()

            # 4. Comparaison
            if round(somme_actuelle, 2) != round(somme_historiques, 2):
                # 4. Création de l'objet Prediction
                prediction_obj = Prediction(
                    titre=None,
                    period=periode,
                    typeC="SARIMA"
                )
                db.add(prediction_obj)
                db.flush()  # Pour obtenir l'ID sans commit

                # 5. Ajouter les points forecast
                for date_, val in zip(forecast_dates, forecast.tolist()):
                    point = PointPredit(
                        dateP=date_,
                        valeur_predite=val,
                        typep="predit",
                        prediction_id=prediction_obj.id
                    )
                    db.add(point)

                # 6. Ajouter les points historiques
                for date_, val in zip(df.index.tolist(), df["valeur"].tolist()):
                    point = PointPredit(
                        dateP=date_,
                        valeur_predite=val,
                        typep="historique",
                        prediction_id=prediction_obj.id
                    )
                    db.add(point)

                db.commit()

            # Construction du résultat final
            last_prediction_result = {
                "message": "Prédiction SARIMA effectuée avec succès",
                "methode": "SARIMA",
                "meilleurs_parametres": {
                    "order": order,
                    "seasonal_order": seasonal_order
                },
                "dates_predit": {
                    "debut": forecast_dates[0].strftime("%Y-%m-%d"),
                    "fin": forecast_dates[-1].strftime("%Y-%m-%d")
                },
                "taux_erreur_mape": round(mape, 2) if mape is not None else "Non calculé",
                "dates": forecast_dates.strftime("%Y-%m-%d %H:%M:%S").tolist(),
                "valeurs": forecast.tolist(),
                "donnees_historiques": {
                    "dates": df.index.strftime("%Y-%m-%d %H:%M:%S").tolist(),
                    "valeurs": df["valeur"].tolist()
                }
            }
           
            return JSONResponse(content=last_prediction_result)
        
        elif type_modele == "arima" :

            arima = db.query(Arima).order_by(Arima.id.desc()).first()
            order = (arima.p, arima.d, arima.q)
            model = ARIMA(train, order=order)
            results = model.fit()
            forecast = results.forecast(steps=12)
            forecast_dates = pd.date_range(start=df.index[-1] + pd.DateOffset(months=1), periods=12, freq='MS')
            mape = arima.mape
            last_prediction_result ={
                "message": "Prédiction ARIMA effectuée avec succès",
                "meilleurs_parametres": {
                    "order": order,
                    "seasonal_order": None,
                },
                "methode" : "ARIMA",
                "serie_originale": df["valeur"].tolist(),
                "criteres_information": {
                    "AIC": round(results.aic, 2),
                    "BIC": round(results.bic, 2)
                },
                "taux_erreur_mape": mape ,
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


            data_list = df.reset_index()
            data_list['date'] = data_list['date'].astype(str)  # convertir les dates en chaînes
            data_list = data_list.to_dict(orient='records')    # [{'date': ..., 'valeur': ...}, {...}, ...]
            # Ensuite, tu appelles :
            # outputs = predict_lstm(data_list, nb_predict=12,db=db)
            lstm_config = db.query(LSTM).order_by(LSTM.id.desc()).first()

            if not lstm_config:
                raise HTTPException(status_code=404, detail="Configuration LSTM non trouvée")
            # === 1. Construction du DataFrame ===
            # print("je ss pas achou didifeghid daha ",df)
            df = pd.DataFrame(data_list)
            df["date"] = pd.to_datetime(df["date"])
            df["valeur"] = df["valeur"].fillna(0)

            df["month"] = df["date"].dt.month
            df["year"] = df["date"].dt.year
            df["quarter"] = df["date"].dt.quarter

            # Encodage cyclique
            df["month_sin"] = np.sin(2 * np.pi * df["month"] / 12)
            df["month_cos"] = np.cos(2 * np.pi * df["month"] / 12)
            df["quarter_sin"] = np.sin(2 * np.pi * df["quarter"] / 4)
            df["quarter_cos"] = np.cos(2 * np.pi * df["quarter"] / 4)

            # Saisons
            df["is_winter"] = df["month"].isin([12, 1, 2]).astype(int)
            df["is_summer"] = df["month"].isin([6, 7, 8]).astype(int)

            # Moyenne mobile et lags
            df["moving_avg"] = df["valeur"].rolling(window=3).mean().fillna(method="bfill")
            df["lag_1"] = df["valeur"].shift(1).fillna(method="bfill")
            df["lag_3"] = df["valeur"].shift(3).fillna(method="bfill")

            # Normalisation
            scaler_val = MinMaxScaler()
            df["valeur_scaled"] = scaler_val.fit_transform(df[["valeur"]])
            df["year_scaled"] = MinMaxScaler().fit_transform(df[["year"]])
            df["moving_avg_scaled"] = MinMaxScaler().fit_transform(df[["moving_avg"]])
            df["lag_1_scaled"] = MinMaxScaler().fit_transform(df[["lag_1"]])
            df["lag_3_scaled"] = MinMaxScaler().fit_transform(df[["lag_3"]])

            # === 2. Séparation des features et target ===
            features_cols = [
                "valeur_scaled", "month_sin", "month_cos", "quarter_sin", "quarter_cos",
                "is_winter", "is_summer", "year_scaled", "moving_avg_scaled",
                "lag_1_scaled", "lag_3_scaled"
            ]
            features = df[features_cols].values
            target = df["valeur_scaled"].values

            # === 3. Création des séquences ===
            def create_sequences(features, targets, look_back):
                X, y = [], []
                for i in range(len(features) - look_back):
                    X.append(features[i:i + look_back])
                    y.append(targets[i + look_back])
                return np.array(X), np.array(y)

            X, y = create_sequences(features, target, lstm_config.seq_length)
            # print("LSTM Configuration Parameters:")
            # print("ID:", lstm_config.id)
            # print("Units couche 1:", lstm_config.unitsC1)
            # print("Units couche 2:", lstm_config.unitsC2)
            # print("Epochs:", lstm_config.epochs)
            # print("Batch size:", lstm_config.batch_size)
            # print("Sequence length:", lstm_config.seq_length)
            epochs = int(lstm_config.epochs)
            # === 4. Modèle LSTM ===
            model = tf.keras.models.Sequential([
                tf.keras.layers.Input(shape=(lstm_config.seq_length, len(features_cols))),
                tf.keras.layers.LSTM(lstm_config.unitsC1, return_sequences=True),
                tf.keras.layers.LSTM(lstm_config.unitsC1, return_sequences=True),
                tf.keras.layers.LSTM(lstm_config.unitsC1),
                tf.keras.layers.Dense(1)
            ])
            model.compile(optimizer='adam', loss='mean_squared_error')
            # model.fit(X, y, epochs=100, batch_size=16, verbose=0)
            history = model.fit(X, y, epochs=epochs, batch_size= lstm_config.batch_size, verbose=0)

            # === 5. Prédictions futures ===
            last_seq = features[-lstm_config.seq_length:]
            future_preds = []
            future_dates = pd.date_range(df["date"].iloc[-1] + pd.DateOffset(months=1), periods=12, freq='MS')

            for date in future_dates:
                month = date.month
                quarter = ((month - 1) // 3) + 1
                sin_m, cos_m = np.sin(2 * np.pi * month / 12), np.cos(2 * np.pi * month / 12)
                sin_q, cos_q = np.sin(2 * np.pi * quarter / 4), np.cos(2 * np.pi * quarter / 4)
                is_winter = int(month in [12, 1, 2])
                is_summer = int(month in [6, 7, 8])
                year_scaled = df["year_scaled"].iloc[-1]  # constante

                # Valeurs précédentes
                last_val = future_preds[-1] if future_preds else target[-1]
                lag_1, lag_3 = last_val, future_preds[-3] if len(future_preds) >= 3 else last_val
                moving_avg = np.mean(future_preds[-3:]) if len(future_preds) >= 3 else last_val

                lag_1_scaled = df["lag_1_scaled"].mean()
                lag_3_scaled = df["lag_3_scaled"].mean()
                moving_avg_scaled = df["moving_avg_scaled"].mean()

                input_vector = [
                    last_val, sin_m, cos_m, sin_q, cos_q,
                    is_winter, is_summer, year_scaled,
                    moving_avg_scaled, lag_1_scaled, lag_3_scaled
                ]
                input_seq = np.vstack([last_seq[1:], input_vector])
                input_seq = input_seq.reshape(1, lstm_config.seq_length, len(features_cols))

                pred = model.predict(input_seq, verbose=0)[0, 0]
                future_preds.append(pred)
                last_seq = input_seq[0]

            future_preds_inv = scaler_val.inverse_transform(np.array(future_preds).reshape(-1, 1)).flatten()
            # print("les val future",future_preds_inv)
            # === 6. MAPE
            y_pred = model.predict(X, verbose=0)
            y_true_inv = scaler_val.inverse_transform(y.reshape(-1, 1))
            y_pred_inv = scaler_val.inverse_transform(y_pred)
            mape = mean_absolute_percentage_error(y_true_inv, y_pred_inv)
            # === 7. Retour
            result = [{"date": d.strftime("%Y-%m-%d"), "valeur": float(v)} for d, v in zip(future_dates, future_preds_inv)]
            df_result = df.copy()
            # df_result = df_result.rename(columns={"date": "date", "valeur": "valeur"})
            print("\n===== Résultat Final de la Prédiction LSTM =====")
            print("Message :", "Prédiction LSTM effectuée avec succès")
            print("Méthode :", "LSTM")
            print("\n-- Architecture --")
            print("  Couches :")
            print("    - LSTM, units:", lstm_config.unitsC1)
            print("    - Dense, units:", lstm_config.unitsC2)
            print("  Optimizer :", "adam")
            print("  Loss :", "mean_squared_error")
            print("  Epochs :", lstm_config.epochs)
            print("  Batch Size :", lstm_config.batch_size)

            print("\n-- Performance --")
            print("  Loss final :", history.history["loss"][-1])
            print("  Taux d'erreur MAPE :", round(mape * 100, 2), "%")

            print("\n-- Période prédite --")
            print("  Début :", future_dates[0].strftime("%Y-%m-%d %H:%M:%S"))
            print("  Fin   :", future_dates[-1].strftime("%Y-%m-%d %H:%M:%S"))

            print("\n-- Dates prédites --")
            for d in future_dates:
                print(" ", d.strftime("%Y-%m-%d %H:%M:%S"))

            print("\n-- Valeurs prédites --")
            print(future_preds_inv.tolist())
            historical_dates = [str(d) for d in df["date"].tolist()]
            print("\n-- Données Historiques --")
            print("  Dates :",historical_dates)
            print("  Valeurs :", df["valeur"].tolist())

            print("===== Fin =====\n")

            # print ("athaaaa",future_preds_inv.tolist())
            print("resultats_prediction", result,
                    "forecast_dates", future_dates,
                    "forecast", future_preds_inv.tolist(),
                    "history",history.history["loss"][-1],
                    "mape", mape)
            history = history
            last_prediction_result = {
                "message": "Prédiction LSTM effectuée avec succès",
                "methode": "LSTM",
                "architecture": {
                    "couches": [
                        {"type": "LSTM", "units": lstm_config.unitsC1},
                        {"type": "Dense", "units": lstm_config.unitsC2}
                    ],
                    "optimizer": "adam",
                    "loss": "mean_squared_error",
                    "epochs": epochs,
                    "batch_size": lstm_config.batch_size
                },
                "performance": {
                    "loss": history.history["loss"][-1],
                    "taux_erreur_mape": round(mape * 100, 2)
                },
                "dates_predit": {
                    "debut": future_dates[0].strftime("%Y-%m-%d"),
                    "fin": future_dates[-1].strftime("%Y-%m-%d")
                },
                "dates": [d.strftime("%Y-%m-%d %H:%M:%S") for d in future_dates],
                "valeurs": future_preds_inv.tolist(),
                "donnees_historiques": {
                    "dates": historical_dates,
                    "valeurs": df["valeur"].tolist()
                }
            }
            # last_prediction_result = {
            #     "message": "Prédiction LSTM effectuée avec succès",
            #     "methode": "LSTM",
            #     "architecture": {
            #         "couches": [
            #             {"type": "LSTM", "units": 50},
            #             {"type": "Dense", "units": 1}
            #         ],
            #         "optimizer": "adam",
            #         "loss": "mean_squared_error",
            #         "epochs": 50,
            #         "batch_size": 32
            #     },
            #     "performance": {
            #         # "loss": outputs["history"].history['loss'][-1],
            #         "taux_erreur_mape": round(outputs["mape"] * 100, 2)
            #     },
            #     "dates_predit": {
            #         "debut": outputs["forecast_dates"][0].strftime("%Y-%m-%d %H:%M:%S"),
            #         "fin": outputs["forecast_dates"][-1].strftime("%Y-%m-%d %H:%M:%S")
            #     },
            #     "dates": [d.strftime("%Y-%m-%d %H:%M:%S") for d in outputs["forecast_dates"]],
            #     "valeurs": outputs["forecast"],
            #     "donnees_historiques": {
            #         "dates": outputs["df"]["Date"].dt.strftime("%Y-%m-%d %H:%M:%S").tolist(),
            #         "valeurs": outputs["df"]["Valeur"].tolist()
            #     }
            # }

        
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
