from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

mot_de_passe = "admin123"  # 🔐 Choisis un mot de passe fixe
hash = pwd_context.hash(mot_de_passe)
print(f"Mot de passe hashé : {hash}")
