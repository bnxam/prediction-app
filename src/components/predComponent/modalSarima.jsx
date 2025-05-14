import React , { useState } from 'react';

export default function ModalSarima({ onClose }) {
  const [period, setPeriod] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Période:', period);
    console.log('Fichier importé:', file);
    // Tu pourras déclencher l'appel à l'API ici plus tard
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h2 className="text-lg font-semibold mb-4">Créer une prédiction avec SARIMA</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Période de prédiction (en jours)</label>
            <input
              type="number"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Importer un fichier CSV ou Excel</label>
            <input
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              onChange={(e) => setFile(e.target.files[0])}
              required
              className="w-full"
            />
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
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Lancer la prédiction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
