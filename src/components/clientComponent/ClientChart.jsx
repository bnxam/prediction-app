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
  // Créer un dictionnaire fusionné par date
  const dataMap = new Map();

  // Ajouter les données réelles
  data.forEach((item) => {
    dataMap.set(item.date, {
      month: item.date,
      realValue: item.valeur,
      predictedValue: null,
    });
  });

  // Ajouter les prédictions (fusion si même date)
  predictions.forEach((item) => {
    if (dataMap.has(item.date)) {
      // Fusionner si même date
      dataMap.set(item.date, {
        ...dataMap.get(item.date),
        predictedValue: item.valeur,
      });
    } else {
      dataMap.set(item.date, {
        month: item.date,
        realValue: null,
        predictedValue: item.valeur,
      });
    }
  });

  // Convertir la map en tableau trié par date
  const allData = Array.from(dataMap.values()).sort((a, b) =>
    new Date(a.month) - new Date(b.month)
  );

  return (
    <div className="w-full h-72  p-6 rounded-2xl">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Évolution mensuelle & Prédictions
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={allData}>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
          <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} />
          <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#ffffff", borderColor: "#d1d5db" }}
            labelStyle={{ color: "#374151", fontWeight: 500 }}
            itemStyle={{ fontSize: 13, color: "#111827" }}
          />
          <Legend
            wrapperStyle={{ fontSize: 13, color: "#4b5563" }}
            iconType="circle"
          />

          {/* Données réelles */}
          <Line
            type="monotone"
            dataKey="realValue"
            stroke="#1e3a8a" // bleu foncé
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#1e3a8a" }}
            activeDot={{ r: 6 }}
            name="Données réelles"
            connectNulls={false}
          />

          {/* Prédictions */}
          <Line
            type="monotone"
            dataKey="predictedValue"
            stroke="#10b981" // vert doux
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#10b981" }}
            activeDot={{ r: 6 }}
            name="Prédictions"
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>

  );
};

export default ClientChart;

// import React from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Legend
// } from 'recharts';

// const ClientChart = ({ data = [], predictions = [] }) => {
//   // Fusion des données avec des clés distinctes
//   const allData = [];

//   // Ajouter les données réelles
//   data.forEach((item) => {
//     allData.push({
//       month: item.date,
//       realValue: item.valeur,
//       predictedValue: null,
//     });
//   });

//   // Ajouter les prédictions (en conservant la date)
//   predictions.forEach((item) => {
//     allData.push({
//       month: item.date,
//       realValue: null,
//       predictedValue: item.valeur,
//     });
//   });

//   return (
//     <div className="w-full h-64 bg-white p-4 rounded shadow">
//       <h3 className="text-lg font-medium mb-2">Évolution mensuelle & Prédictions</h3>
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={allData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Legend />

//           {/* Données réelles */}
//           <Line
//             type="monotone"
//             dataKey="realValue"
//             stroke="#3b82f6"
//             strokeWidth={2}
//             dot={{ r: 4 }}
//             activeDot={{ r: 6 }}
//             name="Données réelles"
//             connectNulls
//           />

//           {/* Prédictions */}
//           <Line
//             type="monotone"
//             dataKey="predictedValue"
//             stroke="#f97316"
//             // strokeDasharray="5 5"
//             strokeWidth={2}
//             dot={{ r: 4 }}
//             activeDot={{ r: 6 }}
//             name="Prédictions"
//             connectNulls
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ClientChart;
