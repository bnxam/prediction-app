import streamlit as st
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

# Sidebar navigation
# st.sidebar.image("logo.png", width=70)
st.sidebar.markdown("### Dashboard")
st.sidebar.markdown("### 📈 Prédiction")
st.sidebar.markdown("### 🔄 Historique")
st.sidebar.button("🚪 Se Déconnecter")

# Header
st.markdown("## Prédiction mensuelle du Jan 2026 à Déc 2026 en ????")

# Top controls
col1, col2, col3, col4 = st.columns([1.5, 2, 2, 2])

with col1:
    st.markdown("#### taux d'erreur")
    st.markdown("### 🔴 10 %")

with col2:
    method = st.selectbox("Méthode de prédiction", ["LSTM", "ARIMA", "MLP"])

with col3:
    display_format = st.selectbox("Format d’affichage", ["Graphe", "Tableau"])

with col4:
    download_format = st.selectbox("Format de téléchargement", ["CSV", "Excel"])
    st.download_button("Télécharger", "Fichier.csv", file_name="prediction.csv")

# Fake prediction data
months = ["Jan 26", "Fév 26", "Mar 26", "Avr 26", "Mai 26", "Juin 26", "Juil 26",
          "Août 26", "Sep 26", "Oct 26", "Nov 26", "Déc 26"]
consumption = [15000, 27000, 35000, 38000, 34000, 30000, 25000, 22000, 28000, 45000, 37000, 20000]
df = pd.DataFrame({"Mois": months, "Consommation": consumption})

# Display data
if display_format == "Graphe":
    fig, ax = plt.subplots()
    ax.plot(df["Mois"], df["Consommation"], marker='o', color='orange')
    ax.set_ylabel("Consommation")
    ax.set_xlabel("Mois")
    ax.set_title("Prédiction mensuelle")
    ax.grid(True)
    st.pyplot(fig)
else:
    st.table(df)

# Predicted cost
st.markdown("""
<div style='background-color:#d3e1ea;padding: 20px;border-radius: 10px;'>
    <h4>Le coût Prédit pour cette durées :</h4>
    <h1 style='color: navy;'>40 000 000 DA</h1>
</div>
""", unsafe_allow_html=True)

# New prediction button
if st.button("➕ Crée une nouvelle prediction"):
    st.success("Nouvelle prédiction en cours...")

