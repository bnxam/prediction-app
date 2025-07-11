import React, { useState } from 'react';

export default function ModalLSTM({ onClose, onPredictionDone }) {
  const [period, setPeriod] = useState(12);
  const [titre, setTitre] = useState("");
  const handleValidate = async () => {
    const formData = new FormData();
    // formData.append("type_modele", selectedMethod);
    formData.append("periode", period);
    formData.append("titre", titre);
    formData.append("type_modele", "lstm");

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Échecccccc de la prédiction");
      }

      const data = await response.json();
      console.log("Réponse du serveur :", data);
      alert("Prédiction lancée avec succès !");
      onPredictionDone();
      onClose();

      // Tu peux aussi stocker la prédiction reçue ou l'afficher
      // setPredictionResult(data);

    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Une erreur est survenue lors de la prédiction.");
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Période:', period);
    // Tu pourras déclencher l'appel à l'API ici plus tard
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-lg font-semibold mb-4">Créer une prédiction avec LSTM</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Période de prédiction (en jours)</label>
            <input
              type="number"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div> */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre
            </label>
            <input
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Période de prédiction
            </label>
            <select
              value={period}
              onChange={(e) => setPeriod(Number(e.target.value))}
              required
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-purple-300"
            >
              <option value="">-- Sélectionnez une période --</option>
              <option value={12}>Mois</option>
              <option value={4}>Trimestre</option>
              <option value={12}>Année</option>
            </select>
          </div>

          

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Annuler
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              onClick={handleValidate}
            >
              Lancer la prédiction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
