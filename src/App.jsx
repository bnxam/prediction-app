

// Assure-toi que le chemin est correct
import React from 'react';
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Prediction from './pages/prediction';
import Historique from './pages/Historique';
import Acceuil from './pages/acceuil';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Traitement from './pages/traitement';
import Client from './pages/Clients';
import Profil from './pages/profil';
import ProfilClient from './pages/ProfilClient';
import DashboardClient from './pages/DashboardClient';
import PredictionDetail from './pages/predictionDetail';





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/historique" element={<Historique />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/traitement" element={<Traitement />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/Client" element={<Client/>} />
        <Route path="/profilclient" element={<ProfilClient/>} />
        <Route path="/dashboardclient" element={<DashboardClient/>} />
        <Route path="/historique/:predictionId" element={<PredictionDetail />} />

      </Routes>
    </BrowserRouter>
  );
}
export default App



