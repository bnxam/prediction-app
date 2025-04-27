// src/components/PredBar.jsx
import React, { useState } from 'react';
import DataUpload from '../dataUpload';

const PredBar = () => {
  const [showInsertForm, setShowInsertForm] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-between bg-white p-4 rounded-lg shadow mb-6">
      
      {/* Input de période */}
      <input 
        type="text" 
        placeholder="Saisir la période..." 
        className="border border-gray-300 p-2 rounded-lg w-64"
      />

      {/* Bouton d'insertion */}
      <button 
        onClick={() => setShowInsertForm(!showInsertForm)}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
      >
        Insérer de nouvelles données
      </button>

      {/* Formulaire d'insertion affiché conditionnellement */}
      {showInsertForm && (
        <DataUpload/>
      )}

    </div>
  );
};

export default PredBar;
