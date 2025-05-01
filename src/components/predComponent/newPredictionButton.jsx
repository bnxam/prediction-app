import { useState } from 'react';
import React from 'react';
import { Zap } from 'lucide-react';

const NewPredictionButton = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  return (

    <div className="flex justify-end mb-8 bg-white rounded-lg">
      <button 
      onClick={() => setShowPaymentForm(!showPaymentForm)}
      className="flex items-center gap-2 bg-yellow-600 hover:bg-fuchsia-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300 mx-auto mt-4 mb-4">
      
        Lancer une nouvelle prédiction
      </button>

      {showPaymentForm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="p-6 border rounded-2xl shadow-lg w-full max-w-md bg-amber-50 relative">
      <button
        onClick={() => setShowPaymentForm(false)}
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
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

    </div>
  );
};

export default NewPredictionButton;
