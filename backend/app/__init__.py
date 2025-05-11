# Rendre Base disponible au niveau du package
from app.database import Base
from app.models.user import User

__all__ = ["Base", "User"]