import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
from streamlit_option_menu import option_menu

# Configuration de la page
st.set_page_config(layout="wide", page_title="Dashboard Énergie", initial_sidebar_state="expanded")

# ------ Style CSS personnalisé ------
st.markdown("""
    <style>
        .sidebar-logo {
            position: relative;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .sidebar-logo img {
            width: 80px;
            border-radius: 50%;
            object-fit: cover;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }

        .logout-container {
            position: fixed;
            bottom: 30px;
            left: 20px;
            width: 250px;
        }
        body {
            background-color: #f0f0f5;
        }
    </style>
""", unsafe_allow_html=True)

# ------ Sidebar ------
with st.sidebar:
    # Logo
    st.markdown('<div class="sidebar-logo">', unsafe_allow_html=True)
    try:
        st.image("portrait.jpg", width=80)
    except Exception:
        st.warning("Image du logo introuvable.")
    st.markdown('</div>', unsafe_allow_html=True)

    # Menu
    selected = option_menu(
        menu_title=None,
        options=["Dashboard", "Historique", "Prédictions"],
        icons=["speedometer", "clock-history", "bar-chart-line"],
        default_index=0,
        styles={
            "container": {"padding": "0!important", "background-color": "#f8f8ff"},
            "icon": {"color": "#6a0dad", "font-size": "20px"},
            "nav-link": {
                "font-size": "16px",
                "text-align": "left",
                "margin": "15px 5px",
                "border-radius": "10px",
                "color": "#333",
                "padding": "10px 15px",
            },
            "nav-link-selected": {
                "background-color": "#d1b3ff",
                "color": "#000",
                "font-weight": "bold",
                "border-radius": "10px",
            }
        }
    )

    # Déconnexion placée en bas
    st.markdown("""
        <div class="logout-container">
            <hr style="margin-top:20px;margin-bottom:10px;">
            <a href="#" style="
                display: flex;
                align-items: center;
                gap: 10px;
                color: #6a0dad;
                font-weight: bold;
                text-decoration: none;
                font-size: 16px;
            ">
                🔒 Déconnexion
            </a>
        </div>
    """, unsafe_allow_html=True)

# Données fournies
data = {
    'datetime': [
        '2004-12-25 01:00:00', '2004-12-25 02:00:00', '2004-12-25 03:00:00',
        '2004-12-25 04:00:00', '2004-12-25 05:00:00', '2004-12-25 06:00:00',
        '2004-12-25 07:00:00', '2004-12-25 08:00:00', '2004-12-25 09:00:00',
        '2004-12-25 10:00:00', '2004-12-25 11:00:00', '2004-12-25 12:00:00',
        '2004-12-25 13:00:00', '2004-12-25 14:00:00', '2004-12-25 15:00:00',
        '2004-12-25 16:00:00', '2004-12-25 17:00:00', '2004-12-25 18:00:00',
        '2004-12-25 19:00:00', '2004-12-25 20:00:00', '2004-12-25 21:00:00',
        '2004-12-25 22:00:00', '2004-12-25 23:00:00', '2004-12-26 00:00:00',
        '2004-12-26 01:00:00', '2004-12-26 02:00:00', '2004-12-26 03:00:00',
        '2004-12-26 04:00:00', '2004-12-26 05:00:00', '2004-12-26 06:00:00',
        '2004-12-26 07:00:00', '2004-12-26 08:00:00', '2004-12-26 09:00:00',
        '2004-12-26 10:00:00', '2004-12-26 11:00:00', '2004-12-26 12:00:00',
        '2004-12-26 13:00:00', '2004-12-26 14:00:00', '2004-12-26 15:00:00',
        '2004-12-26 16:00:00', '2004-12-26 17:00:00', '2004-12-26 18:00:00',
        '2004-12-26 19:00:00', '2004-12-26 20:00:00', '2004-12-26 21:00:00',
        '2004-12-26 22:00:00', '2004-12-26 23:00:00', '2004-12-27 00:00:00',
        '2004-12-27 01:00:00', '2004-12-27 02:00:00', '2004-12-27 03:00:00',
        '2004-12-27 04:00:00', '2004-12-27 05:00:00', '2004-12-27 06:00:00',
        '2004-12-27 07:00:00', '2004-12-27 08:00:00', '2004-12-27 09:00:00',
        '2004-12-27 10:00:00', '2004-12-27 11:00:00', '2004-12-27 12:00:00',
        '2004-12-27 13:00:00', '2004-12-27 14:00:00', '2004-12-27 15:00:00',
        '2004-12-27 16:00:00', '2004-12-27 17:00:00', '2004-12-27 18:00:00',
        '2004-12-27 19:00:00', '2004-12-27 20:00:00', '2004-12-27 21:00:00',
        '2004-12-27 22:00:00', '2004-12-27 23:00:00', '2004-12-28 00:00:00',
        '2004-12-28 01:00:00', '2004-12-28 02:00:00', '2004-12-28 03:00:00',
        '2004-12-28 04:00:00', '2004-12-28 05:00:00', '2004-12-28 06:00:00',
        '2004-12-28 07:00:00', '2004-12-28 08:00:00', '2004-12-28 09:00:00',
        '2004-12-28 10:00:00', '2004-12-28 11:00:00', '2004-12-28 12:00:00',
        '2004-12-28 13:00:00', '2004-12-28 14:00:00', '2004-12-28 15:00:00',
        '2004-12-28 16:00:00', '2004-12-28 17:00:00', '2004-12-28 18:00:00',
        '2004-12-28 19:00:00', '2004-12-28 20:00:00', '2004-12-28 21:00:00',
        '2004-12-28 22:00:00', '2004-12-28 23:00:00'
    ],
    'value': [
        16669.0, 16218.0, 16135.0, 16107.0, 16229.0, 16470.0, 16935.0,
        17548.0, 17927.0, 17837.0, 17453.0, 16891.0, 15967.0, 15088.0,
        14564.0, 14394.0, 14745.0, 15856.0, 16502.0, 16678.0, 16842.0,
        16621.0, 16167.0, 15676.0, 15059.0, 14617.0, 14452.0, 14465.0,
        14561.0, 14862.0, 15318.0, 15865.0, 16421.0, 16751.0, 16521.0,
        16047.0, 15790.0, 15702.0, 15488.0, 15607.0, 16012.0, 17243.0,
        17922.0, 18064.0, 18086.0, 17834.0, 17392.0, 16842.0, 16718.0,
        16150.0, 16090.0, 16223.0, 16652.0, 17317.0, 18384.0, 19366.0,
        19772.0, 19792.0, 19697.0, 19193.0, 18640.0, 18066.0, 17692.0,
        17522.0, 17933.0, 19353.0, 20046.0, 20127.0, 20049.0, 19751.0,
        19038.0, 18133.0, 17580.0, 17158.0, 17002.0, 16923.0, 17191.0,
        17908.0, 18944.0, 19752.0, 19882.0, 19544.0, 19309.0, 18756.0,
        18201.0, 17666.0, 17203.0, 16935.0, 17207.0, 18349.0, 18815.0,
        18599.0, 18480.0, 18135.0, 17112.0
    ]
}

# Vérifier la cohérence des longueurs
if len(data['datetime']) == len(data['value']):
    df = pd.DataFrame(data)
    df['datetime'] = pd.to_datetime(df['datetime'])
else:
    st.error("Les longueurs des colonnes ne sont pas égales.")
    st.stop()

# --- ENTÊTE PRINCIPALE ---
st.title("Dataset Global de l’Entreprise")

col1, col2 = st.columns([3, 1])

with col1:
    st.subheader("Valeurs au cours du temps")
    st.line_chart(df.set_index("datetime")['value'])

    st.markdown("### 🔍 Statistiques")
    st.write(f"🔺 **Maximum** : {df['value'].max()} MW")
    st.write(f"🔻 **Minimum** : {df['value'].min()} MW")
    st.write(f"📊 **Moyenne** : {int(df['value'].mean())} MW")

with col2:
    st.subheader("📅 Sélectionnez une date")
    selected_date = st.date_input("Choisissez la date", value=pd.to_datetime("2004-12-25"))

    filtered_data = df[df['datetime'].dt.date == selected_date]
    if not filtered_data.empty:
        st.write(f"Valeurs pour le {selected_date}:")
        st.write(filtered_data[['datetime', 'value']])
    else:
        st.warning("Aucune donnée disponible pour cette date.")



col3, col4 = st.columns(2)

with col3:
        st.subheader("📊 Histogramme interactif")
        st.bar_chart(df.set_index("datetime")['value'])

with col4:
        st.subheader("📈 Consommation du dernier jour")
        last_day = df['datetime'].dt.date.max()
        last_day_data = df[df['datetime'].dt.date == last_day]
        st.line_chart(last_day_data.set_index('datetime')['value'])
        st.caption(f"Consommation pour le {last_day}")
