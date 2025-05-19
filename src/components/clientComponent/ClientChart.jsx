// import React from 'react';
// import {
//   LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
// } from 'recharts';

// const ClientChart = ({ data }) => {
//   return (
//     <div className="w-full h-64 bg-white p-4 rounded shadow">
//       <h3 className="text-lg font-medium mb-2">Évolution mensuelle</h3>
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={data}>
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Line type="monotone" dataKey="value" stroke="#3b82f6" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ClientChart;
// import React from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from 'recharts';

// const ClientChart = ({ data, predictions = [] }) => {
//   const combinedData = [...data, ...predictions];

//   return (
//     <div className="w-full h-64 bg-white p-4 rounded shadow">
//       <h3 className="text-lg font-medium mb-2">Évolution mensuelle & Prédictions</h3>
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={combinedData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />

//           {/* Données réelles - bleu */}
//           <Line
//             type="monotone"
//             dataKey="value"
//             data={data}
//             stroke="#3b82f6"
//             name="Données réelles"
//             dot={{ r: 3 }}
//           />

//           {/* Prédictions - orange en pointillés */}
//           <Line
//             type="monotone"
//             dataKey="value"
//             data={predictions}
//             stroke="#f97316"
//             strokeDasharray="4 4"
//             name="Prédictions"
//             dot={{ r: 3 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ClientChart;
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';

const ClientChart = ({ data = [], predictions = [] }) => {
  // 1. Créer un seul tableau combiné avec toutes les données
  const allData = [...data, ...predictions];

  // 2. Trouver l'index où commencent les prédictions
  const predictionStartIndex = data.length;

  return (
    <div className="w-full h-64 bg-white p-4 rounded shadow">
      <h3 className="text-lg font-medium mb-2">Évolution mensuelle & Prédictions</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={allData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Ligne principale (toutes les données) */}
          <Line
            type="monotone"
            dataKey="value"
            data={data}
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Données réelles"
          />

          {/* Ligne de prédiction (qui commence après les données réelles) */}
          {predictions.length > 0 && (
            <Line
              type="monotone"
              dataKey="value"
              data={allData.slice(predictionStartIndex - 1)} // -1 pour connecter au dernier point réel
              stroke="#f97316"
              strokeDasharray="5 5"
              strokeWidth={2}
              dot={{
                r: 4,
                fill: ({ index }) => index > 0 ? '#f97316' : 'transparent' // Cache le point de connexion
              }}
              activeDot={{ r: 6 }}
              name="Prédictions"
              connectNulls
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClientChart;