

 // Assure-toi que le chemin est correct
import React from 'react';
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Prediction from './pages/prediction';
import Historique from './pages/Historique';
import Dashboard from './pages/dashboard';



function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/historique" element={<Historique />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App



