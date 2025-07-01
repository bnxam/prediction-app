# from fastapi import APIRouter, Depends, HTTPException, status, Query

# from sqlalchemy.orm import Session
# from app import models
# from app.database import get_db
# from app.models.model import Prediction ,PointPredit
# from app.schemas.userSchema import ConsommationGroupeeResponse
# from sqlalchemy import func

# router = APIRouter(
#     prefix="/historique",
#     tags=["historique"]
# )

# # @router.get("/predictions")
# # def get_historique_predictions(db: Session = Depends(get_db)):
# #     predictions = db.query(Prediction).order_by(Prediction.date_cree.desc()).all()

# #     resultats = []
# #     for prediction in predictions:
# #         points_historiques = db.query(PointPredit)\
# #             .filter(PointPredit.prediction_id == prediction.id)\
# #             .filter(PointPredit.typep == "historique")\
# #             .order_by(PointPredit.dateP)\
# #             .all()

# #         donnees_historiques = [
# #             {
# #                 "date": point.dateP.strftime("%Y-%m-%d"),
# #                 "valeur": point.valeur_predite
# #             }
# #             for point in points_historiques
# #         ]

# #         resultats.append({
# #             "id_prediction": prediction.id,
# #             "date_prediction": prediction.date_cree.strftime("%Y-%m-%d"),
# #             "periode": prediction.period,
# #             "type": prediction.typeC,  # Ici on précise bien le type de modèle
# #             "donnees_historiques": donnees_historiques
# #         })

# #     return {"historique": resultats}

# @router.get("/predictions")
# def get_historique_predictions(db: Session = Depends(get_db)):
#     predictions = db.query(Prediction).all()

#     historique = []
#     for pred in predictions:
#         # Détection du type et récupération du mape
#         if pred.typeC == "SARIMA" and pred.sarima:
#             mape = pred.sarima.mape
#         elif pred.typeC == "ARIMA" and pred.arima:
#             mape = pred.arima.mape
#         elif pred.typeC == "LSTM" and pred.lstm:
#             mape = pred.lstm.mape
#         else:
#             mape = None

#         historique.append({
#             "id_prediction": pred.id,
#             "titre": pred.titre,
#             "periode": pred.period,
#             "type": pred.typeC,
#             "date_prediction": pred.date_cree.strftime("%Y-%m-%d"),
#             "mape": round(mape * 100, 2) if mape is not None else None
#         })

#     return {"historique": historique}
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.model import Prediction, PointPredit
from app.database import get_db

router = APIRouter(
    prefix="/historique",
    tags=["historique"]
)

@router.get("/")
def get_historique_predictions(db: Session = Depends(get_db)):
    predictions = db.query(Prediction).all()

    historique = []
    for pred in predictions:
        # Récupération du mape selon le type
        if pred.typeC == "SARIMA" and pred.sarima:
            mape = pred.sarima.mape
        elif pred.typeC == "ARIMA" and pred.arima:
            mape = pred.arima.mape
        elif pred.typeC == "LSTM" and pred.lstm:
            mape = pred.lstm.mape
        else:
            mape = None

        historique.append({
            "id_prediction": pred.id,
            "titre": pred.titre,
            "periode": pred.period,
            "type": pred.typeC,
            "date_prediction": pred.date_cree.strftime("%Y-%m-%d"),
            "mape": round(mape , 2) if mape is not None else None
        })

    return {"historique": historique}


# 🔴 Route DELETE pour supprimer une prédiction (et les points liés)
@router.delete("/predictions/{prediction_id}", status_code=204)
def supprimer_prediction(prediction_id: int, db: Session = Depends(get_db)):
    prediction = db.query(Prediction).filter(Prediction.id == prediction_id).first()
    
    if not prediction:
        raise HTTPException(status_code=404, detail="Prédiction non trouvée")
    
    db.delete(prediction)
    db.commit()

    return {"message": "Prédiction supprimée avec succès"}


# @router.get("/{prediction_id}")
# def get_prediction_by_id(prediction_id: int, db: Session = Depends(get_db)):
#     pred = db.query(Prediction).filter(Prediction.id == prediction_id).first()
#     if not pred:
#         raise HTTPException(status_code=404, detail="Prédiction non trouvée")

#     points = db.query(PointPredit).filter(PointPredit.prediction_id == prediction_id).all()
#     points_predit = [{"date": p.dateP.strftime("%Y-%m-%d"), "valeur": p.valeur_predite} for p in points if p.typep == "predit"]
#     points_hist = [{"date": p.dateP.strftime("%Y-%m-%d"), "valeur": p.valeur_predite} for p in points if p.typep == "historique"]

#     # MAPE
#     if pred.typeC == "SARIMA" and pred.sarima:
#         mape = round(pred.sarima.mape,2)
#         params = {"p": pred.sarima.p, "d": pred.sarima.d, "q": pred.sarima.q}
#     elif pred.typeC == "ARIMA" and pred.arima:
#         mape = round(pred.arima.mape,2)
#         params = {"p": pred.arima.p, "d": pred.arima.d, "q": pred.arima.q}
#     elif pred.typeC == "LSTM" and pred.lstm:
#         mape = round(pred.lstm.mape,2)
#         params = {
#             "epochs": pred.lstm.epochs,
#             "batch_size": pred.lstm.batch_size,
#             "unitsC1": pred.lstm.unitsC1,
#             "unitsC2": pred.lstm.unitsC2,
#             "seq_length": pred.lstm.seq_length
#         }
#     else:
#         mape = None
#         params = {}
    
#     # Période prédite (si disponible)
#     if points_predit:
#         periode_predite = {
#             "debut": points_predit[0]["date"],
#             "fin": points_predit[-1]["date"]
#         }
#     else:
#         periode_predite = None
#     # print(periode_predite)
#     return {
#         "id": pred.id,
#         "titre": pred.titre,
#         "type": pred.typeC,
#         "periode": pred.period,
#         "date_prediction": pred.date_cree.strftime("%Y-%m-%d"),
#         "periode_predite": periode_predite,
#         "mape": round(mape, 2) if mape is not None else None,
#         "parametres": params,
#         "predit": points_predit,
#         "historique": points_hist
#     }
@router.get("/{prediction_id}")
def get_prediction_by_id(prediction_id: int, db: Session = Depends(get_db)):
    pred = db.query(Prediction).filter(Prediction.id == prediction_id).first()
    if not pred:
        raise HTTPException(status_code=404, detail="Prédiction non trouvée")

    points = db.query(PointPredit).filter(PointPredit.prediction_id == prediction_id).all()
    points_predit = [{"date": p.dateP.strftime("%Y-%m-%d"), "valeur": p.valeur_predite} for p in points if p.typep == "predit"]
    points_hist = [{"date": p.dateP.strftime("%Y-%m-%d"), "valeur": p.valeur_predite} for p in points if p.typep == "historique"]

    # MAPE + paramètres
    if pred.typeC == "SARIMA" and pred.sarima:
        mape = round(pred.sarima.mape, 2)
        params = {
            "p": pred.sarima.p,
            "d": pred.sarima.d,
            "q": pred.sarima.q,
            "order": [pred.sarima.p, pred.sarima.d, pred.sarima.q],
            "P": pred.sarima.P,
            "D": pred.sarima.D,
            "Q": pred.sarima.Q,
            "s": pred.sarima.s,
            "seasonal_order": [pred.sarima.P, pred.sarima.D, pred.sarima.Q, pred.sarima.s]
        }
    elif pred.typeC == "ARIMA" and pred.arima:
        mape = round(pred.arima.mape, 2)
        params = {
            "p": pred.arima.p,
            "d": pred.arima.d,
            "q": pred.arima.q,
            "order": [pred.arima.p, pred.arima.d, pred.arima.q]
        }
    elif pred.typeC == "LSTM" and pred.lstm:
        mape = round(pred.lstm.mape, 2)
        params = {
            "epochs": pred.lstm.epochs,
            "batch_size": pred.lstm.batch_size,
            "units1": pred.lstm.unitsC1,
            "units2": pred.lstm.unitsC2,
            "seq_length": pred.lstm.seq_length
        }
    else:
        mape = None
        params = {}

    # Période prédite
    if points_predit:
        periode_predite = {
            "debut": points_predit[0]["date"],
            "fin": points_predit[-1]["date"]
        }
    else:
        periode_predite = None

    return {
        "id": pred.id,
        "titre": pred.titre,
        "type": pred.typeC,
        "periode": pred.period,
        "date_prediction": pred.date_cree.strftime("%Y-%m-%d"),
        "debut": points_predit[0]["date"],
        "fin": points_predit[-1]["date"],
        "mape": mape,
        "parametres": params,
        "predit": points_predit,
        "historique": points_hist
    }
