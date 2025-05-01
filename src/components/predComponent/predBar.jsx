// src/components/PredBar.jsx
import React, { useState } from 'react';
import DataUpload from '../dataUpload';

const PredBar = () => {
  const [showInsertForm, setShowInsertForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  return (
    <div>
      {/* Ligne contenant les 3 éléments principaux */}
      <div className="flex flex-wrap gap-4 mb-6">

        {/* Input de période */}
        <div className="bg-white/30 p-4 rounded-lg shadow w-full sm:w-auto flex-1">
          <input
            type="text"
            placeholder="Saisir la période..."
            className="border p-2 rounded-lg w-full border-gray-500 text-blue-950"
          />
        </div>

        {/* Bouton prédiction */}
        <div className=" bg-white/30 p-4 rounded-lg shadow w-full sm:w-auto flex-1">
          <button
            onClick={() => setShowPaymentForm(!showPaymentForm)}
            className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Lancer une nouvelle prédiction
          </button>
        </div>

        {/* Bouton d'insertion */}
        <div className="bg-white/30 p-4 rounded-lg shadow w-full sm:w-auto flex-1">
          <button
            onClick={() => setShowInsertForm(!showInsertForm)}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition"
          >
            Insérer de nouvelles données
          </button>
        </div>

      </div>

      {/* Formulaire de paiement */}
      {showPaymentForm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50 ">
          <div className="p-6 border rounded-2xl shadow-lg w-full max-w-md bg-white relative ">
            <button
              onClick={() => setShowPaymentForm(false)}
              className="absolute top-3 right-3 text-black hover:text-black"

            >
              ✖
            </button>

            <h2 className="text-xl font-bold mb-6 text-center">Paiement</h2>

            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nom complet"
                className="border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Numéro de carte"
                className="border border-gray-300 rounded-lg p-2"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="MM/AA"
                  className="border border-gray-300 rounded-lg p-2 w-1/2"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="border border-gray-300 rounded-lg p-2 w-1/2"
                />
              </div>

              <div className="flex justify-center gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowPaymentForm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPaymentForm(false);
                    console.log('Paiement effectué !');
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
                >
                  Payer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Formulaire d'insertion affiché conditionnellement */}
      {showInsertForm && (
        <div className="mt-4">
          <DataUpload />
        </div>
      )}
    </div>
  );
};

export default PredBar;
