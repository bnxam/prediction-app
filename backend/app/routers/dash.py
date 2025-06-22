from fastapi import APIRouter, Depends, HTTPException, status, Query

from sqlalchemy.orm import Session
from app import models
from app.database import get_db
from app.models.model import Consommation
from app.schemas.userSchema import ConsommationGroupeeResponse
from sqlalchemy import func
from app.models.model import User  # Si pas déjà importé

router = APIRouter(
    prefix="/dash",
    tags=["dash"]
)


# @router.get("/", response_model=list[ConsommationResponse])
# def get_consommations_grouped(db: Session = Depends(get_db)):
#     result = (
#         db.query(
#             Consommation.date,
#             func.sum(Consommation.valeur).label("valeur")
#         )
#         .group_by(Consommation.date)
#         .all()
#     )

#     return result

# @router.get("/", response_model=list[ConsommationGroupeeResponse])
# def get_consommations_grouped(db: Session = Depends(get_db)):
#     result = (
#         db.query(
#             Consommation.date,
#             func.sum(Consommation.valeur).label("valeur")
#         )
#         .group_by(Consommation.date)
#         .all()
#     )
#     return [{"date": row.date, "valeur": row.valeur} for row in result]

@router.get("/", response_model=list[ConsommationGroupeeResponse])
def get_consommations_grouped(db: Session = Depends(get_db)):
    result = (
        db.query(
            Consommation.date,
            func.sum(Consommation.valeur).label("valeur")
        )
        .group_by(Consommation.date)
        .order_by(Consommation.date)  # <-- tri par date croissante
        .all()
    )
    return [{"date": row.date, "valeur": row.valeur} for row in result]

    # pourcentageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

@router.get("/consommation-par-client")
def get_consommation_par_client(
    db: Session = Depends(get_db),
    mois: str = Query(None, description="Format AAAA-MM, ex: 2025-06")
):
    from datetime import datetime

    query = (
        db.query(User.code_client, func.sum(Consommation.valeur).label("total"))
        .join(Consommation, User.id == Consommation.client_id)
    )

    if mois:
        try:
            debut = datetime.strptime(mois, "%Y-%m")
            fin = datetime(debut.year + int(debut.month / 12), (debut.month % 12) + 1, 1)
            query = query.filter(Consommation.date >= debut, Consommation.date < fin)
        except:
            raise HTTPException(status_code=400, detail="Format du mois invalide. Utiliser AAAA-MM.")

    results = (
        query.group_by(User.code_client)
        .order_by(func.sum(Consommation.valeur).desc())
        .all()
    )

    if len(results) <= 8:
        return [{"client": code, "consommation": total} for code, total in results]

    top_8 = results[:8]
    autres_total = sum(r[1] for r in results[8:])

    data = [{"client": code, "consommation": total} for code, total in top_8]
    data.append({"client": "Autres", "consommation": autres_total})
    return data
