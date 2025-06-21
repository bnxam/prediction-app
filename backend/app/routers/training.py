from app.models.model import Prediction, Arima, Sarima, Consommation
from sqlalchemy.orm import Session
from sqlalchemy import func
from sklearn.metrics import mean_absolute_percentage_error, mean_squared_error
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.statespace.sarimax import SARIMAX
from itertools import product
import pandas as pd
import numpy as np

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
    new_pred = Prediction()
    db.add(new_pred)
    db.commit()
    db.refresh(new_pred)

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
            pred_id=new_pred.id
        )
        db.add(sarima_entry)

    if best_params_a:
        arima_entry = Arima(
            mape=mape_a,
            p=best_params_a[0],
            d=best_params_a[1],
            q=best_params_a[2],
            pred_id=new_pred.id
        )
        db.add(arima_entry)

    db.commit()
    print("Modèles SARIMA et ARIMA entraînés et enregistrés.")
    print(best_model_a)
    print(best_model_s)
