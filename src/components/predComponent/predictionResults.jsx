import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const PredictionResults = () => {
  const models = [
    {
      data: [
        { Date: '11/11/2002', Valeur: 34 },
        { Date: '12/11/2002', Valeur: 9 },
        { Date: '13/11/2002', Valeur: 6 },
        { Date: '14/11/2002', Valeur: 50 },
        { Date: '15/11/2002', Valeur: 55 },
        { Date: '16/11/2002', Valeur: 53 },
        { Date: '17/11/2002', Valeur: 20 },
        { Date: '18/11/2002', Valeur: 28 },
      ],
      params: "Couches: 2, Neurones: 64, Dropout: 0.2",
      metrics: "MAE: 2.34 | RMSE: 3.12 | R²: 0.92"
    },
    {
      data: [
        { Date: '11/11/2002', Valeur: 34 },
        { Date: '12/11/2002', Valeur: 9 },
        { Date: '13/11/2002', Valeur: 6 },
        { Date: '14/11/2002', Valeur: 50 },
        { Date: '15/11/2002', Valeur: 55 },
        { Date: '16/11/2002', Valeur: 53 },
        { Date: '17/11/2002', Valeur: 20 },
        { Date: '18/11/2002', Valeur: 28 },
      ],
      params: "Couches: 3, Neurones: 128, Dropout: 0.3",
      metrics: "MAE: 2.87 | RMSE: 3.45 | R²: 0.89"
    },
    {
      data: [
        { Date: '11/11/2002', Valeur: 34 },
        { Date: '12/11/2002', Valeur: 9 },
        { Date: '13/11/2002', Valeur: 6 },
        { Date: '14/11/2002', Valeur: 50 },
        { Date: '15/11/2002', Valeur: 55 },
        { Date: '16/11/2002', Valeur: 53 },
        { Date: '17/11/2002', Valeur: 20 },
        { Date: '18/11/2002', Valeur: 28 },
      ],
      params: "Couches: 1, Neurones: 32, Dropout: 0.1",
      metrics: "MAE: 3.12 | RMSE: 3.89 | R²: 0.85"
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Les anciennes prédiction</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {models.map((model, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg min-h-[260px] flex flex-col justify-between"
          >
            <div className="h-32 bg-gray-50 rounded mb-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={model.data}>
                  <XAxis dataKey="Date" stroke="#555" fontSize={10} />
                  <YAxis stroke="#555" fontSize={10} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="Valeur"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-gray-700">
              <p className="font-semibold text-blue-600 mb-1">Paramètres :</p>
              <p className="mb-2">{model.params}</p>
              <p className="font-semibold text-blue-600 mb-1">Performances :</p>
              <p>{model.metrics}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictionResults;