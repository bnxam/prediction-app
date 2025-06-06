from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import models
from app.database import get_db
from app.models.model import Consommation
from app.schemas.userSchema import ConsommationGroupeeResponse
from sqlalchemy import func

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