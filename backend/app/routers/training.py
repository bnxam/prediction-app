from app.models.model import Prediction, Arima, Sarima, Consommation , LSTM
from sqlalchemy.orm import Session
from sqlalchemy import func
from sklearn.metrics import mean_absolute_percentage_error, mean_squared_error
from statsmodels.tsa.arima.model import ARIMA 
from statsmodels.tsa.statespace.sarimax import SARIMAX
from itertools import product
import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.preprocessing import MinMaxScaler
from collections import defaultdict
from sklearn.metrics import mean_absolute_percentage_error

class ProgressCallback(tf.keras.callbacks.Callback):
    def __init__(self, total_epochs):
        super().__init__()
        self.total_epochs = total_epochs

    def on_epoch_end(self, epoch, logs=None):
        percent = ((epoch + 1) / self.total_epochs) * 100
        loss = logs.get("loss")
        print(f"\r🔄 Entraînement : {percent:.2f}% — Loss (MSE): {loss:.5f}", end='', flush=True)

def train_global_models(db: Session):
    # 1. Récupération des données globales
    result = (
        db.query(
            Consommation.date,
            func.sum(Consommation.valeur).label("valeur")
        )
        .group_by(Consommation.date)
        .order_by(Consommation.date)
        .all()
    )

    if len(result) < 15:
        print("Pas assez de données pour entraîner les modèles.")
        return

    df = pd.DataFrame(result, columns=["date", "valeur"])
    df["date"] = pd.to_datetime(df["date"])
    df.set_index("date", inplace=True)

    train_size = int(len(df) * 0.7)
    train, test = df[:train_size], df[train_size:]

    ### 2. Entraînement SARIMA ###
    best_rmse_s = float("inf")
    best_model_s = None
    best_params_s = None
    p = d = q = range(0, 2)
    P = D = Q = range(0, 2)
    seasonal_pdq = list(product(P, D, Q, [12]))
    pdq = list(product(p, d, q))

    for param in pdq:
        for seasonal in seasonal_pdq:
            try:
                model = SARIMAX(train, order=param, seasonal_order=seasonal, enforce_stationarity=False, enforce_invertibility=False)
                results = model.fit(disp=False)
                pred = results.predict(start=len(train), end=len(train)+len(test)-1)
                rmse = np.sqrt(mean_squared_error(test, pred))
                if rmse < best_rmse_s:
                    best_rmse_s = rmse
                    best_model_s = results
                    best_params_s = (param, seasonal)
            except:
                continue

    if best_model_s:
        if len(test) >= 12:
            mape_s = mean_absolute_percentage_error(
                test[:12],
                best_model_s.predict(start=len(train), end=len(train)+11)
            ) * 100
        else:
            mape_s = None

    ### 3. Entraînement ARIMA ###
    best_rmse_a = float("inf")
    best_model_a = None
    best_params_a = None
    pdq_arima = list(product(range(0, 3), repeat=3))

    for param in pdq_arima:
        try:
            model = ARIMA(train, order=param)
            results = model.fit()
            pred = results.predict(start=len(train), end=len(train)+len(test)-1)
            rmse = np.sqrt(mean_squared_error(test, pred))
            if rmse < best_rmse_a:
                best_rmse_a = rmse
                best_model_a = results
                best_params_a = param
        except:
            continue

    if best_model_a:
        if len(test) >= 12:
            mape_a = mean_absolute_percentage_error(
                test[:12],
                best_model_a.predict(start=len(train), end=len(train)+11)
            ) * 100
        else:
            mape_a = None

    ### 4. Enregistrement en base de données ###
    # new_pred = Prediction()
    # db.add(new_pred)
    # db.commit()
    # db.refresh(new_pred)

    if best_params_s:
        sarima_entry = Sarima(
            mape=mape_s,
            p=best_params_s[0][0],
            d=best_params_s[0][1],
            q=best_params_s[0][2],
            P=best_params_s[1][0],
            D=best_params_s[1][1],
            Q=best_params_s[1][2],
            s=best_params_s[1][3],
            pred_id=None
        )
        db.add(sarima_entry)

    if best_params_a:
        arima_entry = Arima(
            mape=round(mape_a,2),
            p=best_params_a[0],
            d=best_params_a[1],
            q=best_params_a[2],
            pred_id=None
        )
        db.add(arima_entry)

    db.commit()
    # print("Modèles SARIMA et ARIMA entraînés et enregistrés.")
    # print(best_model_a)
    # print(best_model_s)

    # LSTM entrainement :

    df = pd.DataFrame(result, columns=["date", "valeur"])
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

    sequence_length = 80 if len(df['valeur']) > 1000 else 3

    X, y = create_sequences(features, target, sequence_length)

    # # === 4. Modèle LSTM ===
    # model = tf.keras.models.Sequential([
    #     tf.keras.layers.Input(shape=(sequence_length, len(features_cols))),
    #     tf.keras.layers.LSTM(108, return_sequences=True),
    #     tf.keras.layers.LSTM(64, return_sequences=True),
    #     tf.keras.layers.LSTM(64),
    #     tf.keras.layers.Dense(1)
    # ])
    # model.compile(optimizer='adam', loss='mean_squared_error')
    # # model.fit(X, y, epochs=100, batch_size=16, verbose=0)
    # model.fit(X, y, epochs=100, batch_size=16, verbose=0)

#    from sklearn.metrics import mean_squared_error, mean_absolute_percentage_error

    unitsC1_list = [128, 32]
    unitsC2C3_list = [128,32]
    batch_sizes = [8, 16, 32]
    epochs_list = [ 150, 50]

    best_mse = float('inf')
    best_model = None
    best_params = {}

    for unitsC1 in unitsC1_list:
        for unitsC2 in unitsC2C3_list:
            for batch_size in batch_sizes:
                for epochs in epochs_list:
                    print(f"Testing: unitsC1={unitsC1}, unitsC2=unitsC3={unitsC2}, batch_size={batch_size}, epochs={epochs}")

                    model = tf.keras.models.Sequential([
                        tf.keras.layers.Input(shape=(sequence_length, len(features_cols))),
                        tf.keras.layers.LSTM(unitsC1, return_sequences=True),
                        tf.keras.layers.Dropout(0.2),
                        tf.keras.layers.LSTM(unitsC2, return_sequences=True),
                        tf.keras.layers.Dropout(0.2),
                        tf.keras.layers.LSTM(unitsC2),
                        tf.keras.layers.Dropout(0.2),
                        tf.keras.layers.Dense(1)
                    ])

                    optimizer = tf.keras.optimizers.Adam(learning_rate=0.001)
                    model.compile(optimizer=optimizer, loss='mean_squared_error')
                    model.fit(X, y, epochs=epochs, batch_size=batch_size, verbose=0)

                    preds = model.predict(X, verbose=0)
                    mse = mean_squared_error(y, preds)

                    print(f"--> MSE: {mse}")

                    if mse < best_mse:
                        best_mse = mse
                        best_model = model
                        best_preds = preds
                        best_params = {
                            'unitsC1': unitsC1,
                            'unitsC2': unitsC2,
                            'batch_size': batch_size,
                            'epochs': epochs
                        }

    # === Calcule du MAPE pour le meilleur modèle ===
    best_mape = mean_absolute_percentage_error(y, best_preds)

    print("\n✅ Meilleurs paramètres trouvés :")
    print(best_params)
    print(f"MSE : {best_mse}, MAPE : {best_mape}")

    # === Insertion dans la base de données ===
    lstm_model = LSTM(
        mape=best_mape,
        epochs=best_params["epochs"],
        batch_size=best_params["batch_size"],
        unitsC1=best_params["unitsC1"],
        unitsC2=best_params["unitsC2"],
        seq_length=sequence_length,
        pred_id=None 
    )

    db.add(lstm_model)
    
    if best_params_s:
        sarima_entry = Sarima(
            mape=mape_s,
            p=best_params_s[0][0],
            d=best_params_s[0][1],
            q=best_params_s[0][2],
            P=best_params_s[1][0],
            D=best_params_s[1][1],
            Q=best_params_s[1][2],
            s=best_params_s[1][3],
            pred_id=None
        )
        db.add(sarima_entry)

    if best_params_a:
        arima_entry = Arima(
            mape=mape_a,
            p=best_params_a[0],
            d=best_params_a[1],
            q=best_params_a[2],
            pred_id=None
        )
        db.add(arima_entry)

    db.commit()

    # # === 6. MAPE
    # y_pred = model.predict(X, verbose=0)
    # y_true_inv = scaler_val.inverse_transform(y.reshape(-1, 1))
    # y_pred_inv = scaler_val.inverse_transform(y_pred)
    # mape = mean_absolute_percentage_error(y_true_inv, y_pred_inv)


