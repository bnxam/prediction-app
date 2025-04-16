import streamlit as st
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import streamlit.components.v1 as components
# from streamlit_component_lib import modal

# Sidebar navigation
# st.sidebar.image("logo.png", width=70)
st.set_page_config(layout="wide")

st.sidebar.button(" 📈 Prédiction")
st.sidebar.button(" 🔄 Historique")
st.sidebar.button("🚪 Se Déconnecter")

# Header
st.markdown("## Prédiction mensuelle du Jan 2026 à Déc 2026 en ????")

# Top controls
col1, col2, col3, col4 = st.columns([1.5, 2, 2, 2])

with col1:
    st.markdown("#### taux d'erreur")
    st.markdown("### 🔴 10 %")

with col2:
    method = st.selectbox("Méthode de prédiction", ["LSTM", "SARIMA"])

with col3:
    display_format = st.selectbox("Format d’affichage", ["Graphe", "Tableau"])

with col4:
    download_format = st.selectbox("Format de téléchargement", ["CSV", "PDF"])
    st.download_button("Télécharger", "Fichier.csv", file_name="prediction.csv")

# Fake prediction data
months = ["Jan 26", "Fév 26", "Mar 26", "Avr 26", "Mai 26", "Juin 26", "Juil 26",
          "Août 26", "Sep 26", "Oct 26", "Nov 26", "Déc 26"]
consumption = [15000, 27000, 35000, 38000, 34000, 30000, 25000, 22000, 28000, 45000, 37000, 20000]
df = pd.DataFrame({"Mois": months, "Consommation": consumption})

# Display data
if display_format == "Graphe":
    # fig, ax = plt.subplots(figsize=(12, 4))
    # ax.plot(df["Mois"], df["Consommation"], marker='o', color='orange')
    # ax.set_ylabel("Consommation")
    # ax.set_xlabel("Mois")
    # ax.set_title("Prédiction mensuelle")
    # ax.tick_params(axis='x', labelrotation=90)
    # ax.grid(True)
    # st.pyplot(fig)
    st.subheader("Valeurs au cours du temps")
    st.line_chart(df.set_index("Mois")['Consommation'])
else:
    st.table(df)

# Predicted cost
st.markdown("""
<div style='marign-top: 10px ;background-color:#0d1b2a;padding: 20px;border-radius: 10px;'>
    <h4>Le coût Prédit pour cette durées :</h4>
    <h1 style='color: #fff;'>40 000 000 DA</h1>
</div>
""", unsafe_allow_html=True)

# Affiche toujours la modale dans le DOM
# show_modal = st.button("➕ Crée une nouvelle prediction")

# CSS pour le modal
modal_css = """
<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5);
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal-container {
        background-color: white;
        padding: 2rem;
        border-radius: 10px;
        width: 80%;
        max-width: 600px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        max-height: 80vh;
        overflow-y: auto;
    }
    .modal-close {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }
</style>
"""

# JavaScript pour gérer le modal
modal_js = """
<script>
function toggleModal() {
    const modal = document.getElementById("streamlit-modal");
    modal.style.display = modal.style.display === "none" ? "flex" : "none";
}
</script>
"""

# Ajouter le CSS et JS à la page
st.markdown(modal_css, unsafe_allow_html=True)
st.markdown(modal_js, unsafe_allow_html=True)

# Gestion d'état
if 'modal_open' not in st.session_state:
    st.session_state.modal_open = False

# Bouton pour ouvrir le modal
if st.button("Afficher le modal"):
    st.session_state.modal_open = True

# Le modal lui-même
if st.session_state.modal_open:
    st.markdown("""
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    <div class="modal-overlay" id="streamlit-modal">
        <div class="modal-container">
            <span class="modal-close" onclick="toggleModal()">×</span>
            <div id="modal-content">
                <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1">
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1">
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
    """, unsafe_allow_html=True)
    
    # Injection du contenu dans le modal
    st.markdown("""
    <script>
    const content = `<h1>Titre du Modal</h1>
                     <p>Ceci est le contenu de votre modal.</p>
                     <button onclick="toggleModal()">Fermer</button>`;
    document.getElementById("modal-content").innerHTML = content;
    </script>
    """, unsafe_allow_html=True)