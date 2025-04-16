import streamlit as st
from PIL import Image
import base64

# Configuration de la page
st.set_page_config(page_title="Accueil Entreprise & Prédiction", layout="wide")

# Fonction pour afficher une image de fond avec overlay
def background_image(image_path):
    with open(image_path, "rb") as f:
        data = f.read()
        encoded = base64.b64encode(data).decode()
    
    #  Injecte du code HTML et CSS personnalisé dans l'application Streamlit.
    st.markdown(f"""
    <style>
    .hero-section {{
        position: relative;
        background-image: url('data:image/png;base64,{encoded}');
        background-size: cover;
        background-position: center;
        height: 550px;
        display: flex;
        align-items: center;
        justify-content: left;
        padding-left: 5%;
        color: white;
    }}
    .hero-content h1 {{
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }}
    .hero-content p {{
        font-size: 1.2rem;
        margin-bottom: 1rem;
    }}
    .hero-content button {{
        padding: 0.5rem 1rem;
        background-color: #1f1f1f;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }}
    .dark-navbar {{
        background-color: #1f1f1f;
        padding: 1rem;
        text-align: right;
    }}
    .dark-navbar button {{
        background-color: white;
        color: black;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }}
    .info-blocks {{
        display: flex;
        justify-content: space-around;
        padding: 2rem 5%;
    }}
    .info-block {{
        background-color: #1f1f1f;
        color: white;
        padding: 1rem;
        border-radius: 10px;
        width: 30%;
        text-align: center;
    }}
    .middle-section {{
        text-align: center;
        margin: 3rem 0;
    }}
    .middle-section button {{
        background-color: #1f1f1f;
        color: white;
        padding: 0.8rem 2rem;
        border-radius: 5px;
        border: none;
    }}
    .footer-section {{
        background-color: #1f1f1f;
        color: white;
        padding: 3rem 5%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }}
    .footer-section input, .footer-section textarea {{
        width: 100%;
        padding: 0.5rem;
        margin-bottom: 1rem;
        border: none;
        border-radius: 5px;
    }}
    .footer-section button {{
        padding: 0.5rem 1.5rem;
        border: none;
        background-color: white;
        color: black;
        font-weight: bold;
        border-radius: 5px;
    }}
    </style>
    """, unsafe_allow_html=True)

# NAVBAR
st.markdown("<div class='dark-navbar'><button onclick=\"window.location.href='#login'\">Connexion</button></div>", unsafe_allow_html=True)




# HERO IMAGE + TEXTE
background_image("image_fond.jpg")
st.markdown("""
<div class="hero-section">
    <div class="hero-content">
        <h1>Entreprise & Prédiction</h1>
        <p>Anticipez votre avenir avec nos modèles prédictifs intelligents</p>
        <button>En savoir plus</button>
    </div>
</div>
""", unsafe_allow_html=True)

# BLOCS D'INFORMATION
st.markdown("""
<div class="info-blocks">
    <div class="info-block">
        <h3>Analyse Précise</h3>
        <p>Des modèles avancés pour des prévisions fiables.</p>
    </div>
    <div class="info-block">
        <h3>Adapté à votre entreprise</h3>
        <p>Personnalisation selon votre domaine et vos données.</p>
    </div>
    <div class="info-block">
        <h3>Facilité d'utilisation</h3>
        <p>Interface intuitive, prédictions rapides.</p>
    </div>
</div>
""", unsafe_allow_html=True)

# SECTION MILIEU
st.markdown("""
<div class="middle-section">
    <h2>Si vous voulez nous suivre, inscrivez-vous</h2>
    <button>Inscrivez-vous</button>
</div>
""", unsafe_allow_html=True)

# FORMULAIRE DE CONNEXION (Modal simulé)
with st.expander("Connexion", expanded=False):
    st.subheader("Se connecter")
    col1, col2 = st.columns(2)
    with col1:
        email = st.text_input("Adresse e-mail")
        password = st.text_input("Mot de passe", type="password")
        st.button("Connexion")
    with col2:
        st.markdown("---")
        st.markdown("Ou connectez-vous avec :")
        st.button("Connexion avec Google")

# FOOTER
st.markdown("""
<div class="footer-section">
    <div style="flex: 1; min-width: 300px;">
        <input type="text" placeholder="Nom">
        <input type="email" placeholder="Email">
        <textarea rows="4" placeholder="Votre message..."></textarea>
        <label><input type="checkbox"> Je ne suis pas un robot</label><br>
        <button>Envoyer</button>
    </div>
    <div style="flex: 1; min-width: 300px;">
        <h3>Contact</h3>
        <p>Écrivez-nous pour toute demande d'information.</p>
        <p><strong>contact@entreprise.com</strong></p>
    </div>
</div>
""", unsafe_allow_html=True)

# COPYRIGHT
st.markdown("""
    <div style='text-align: center; font-size: 0.8em; color: gray; padding: 1rem;'>
        Projet Prédictif &copy; 2025 - Tous droits réservés
    </div>
""")
