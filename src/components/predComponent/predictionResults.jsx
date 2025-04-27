import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PredictionResults = () => {
  const data = [
    { Date: '11/11/2002', Valeur: 34 },
    { Date: '12/11/2002', Valeur: 9 },
    { Date: '13/11/2002', Valeur: 6 },
    { Date: '14/11/2002', Valeur: 50 },
    { Date: '15/11/2002', Valeur: 55 },
    { Date: '16/11/2002', Valeur: 53 },
    { Date: '17/11/2002', Valeur: 20 },
    { Date: '18/11/2002', Valeur: 28 },
  ];

  const renderMiniChart = (chartData) => (
    <ResponsiveContainer width="100%" height={80}>
      <LineChart data={chartData}>
        <Line type="monotone" dataKey="Valeur" stroke="#8884d8" strokeWidth={2} dot={false} />
        <XAxis dataKey="Date" tickLine={false} axisLine={true} style={{ fontSize: '0.6rem' }} /> {/* Afficher l'axe X */}
        <YAxis tickLine={false} axisLine={true} style={{ fontSize: '0.6rem' }} /> {/* Afficher l'axe Y */}
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Résultats de Prédiction</h2>

      {/* Petites prévisualisations des résultats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border border-gray-200 rounded-lg">
          <p className="text-gray-600 mb-2">Méthode : GRU</p>
          <div className="h-24 bg-gray-100 rounded flex items-center justify-center">
            {data.length > 0 ? renderMiniChart(data) : <p className="text-sm text-gray-400">Pas de données</p>}
          </div>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <p className="text-gray-600 mb-2">Méthode : SARIMA</p>
          <div className="h-24 bg-gray-100 rounded flex items-center justify-center">
            {data.length > 0 ? renderMiniChart(data) : <p className="text-sm text-gray-400">Pas de données</p>}
          </div>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <p className="text-gray-600 mb-2">Méthode : ARIMA</p>
          <div className="h-24 bg-gray-100 rounded flex items-center justify-center">
            {data.length > 0 ? renderMiniChart(data) : <p className="text-sm text-gray-400">Pas de données</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResults;