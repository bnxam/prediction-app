// import React , {useState , useRef} from 'react';
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   Area,
// } from 'recharts';

// const Graphique = ({ data, minDomain, chartRef }) => {
//   return (
//     <div ref={chartRef} className="w-full h-full" >
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data}>
//           <defs>
//             <linearGradient id="colorValeur" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
//               <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
//             </linearGradient>
//           </defs>

//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="Date" />
//           <YAxis domain={[minDomain, 'auto']} />
//           <Tooltip />

//           <Line
//             type="monotone"
//             dataKey="Valeur"
//             stroke="#8884d8"
//             activeDot={{ r: 8 }}
//             strokeWidth={2}
//             dot={false}
//           />

//           <Area
//             type="monotone"
//             dataKey="Valeur"
//             stroke="none"
//             fill="url(#colorValeur)"
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default Graphique;
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

const Graphique = ({ data = [], predictions = [], minDomain, chartRef }) => {
  // Fusionner les données par date
  const dataMap = new Map();

  // Ajouter données réelles
  data.forEach((item) => {
    dataMap.set(item.date, {
      date: item.date,
      realValue: item.valeur,
      predictedValue: null,
    });
  });

  // Ajouter prédictions
  predictions.forEach((item) => {
    if (dataMap.has(item.date)) {
      dataMap.set(item.date, {
        ...dataMap.get(item.date),
        predictedValue: item.valeur,
      });
    } else {
      dataMap.set(item.date, {
        date: item.date,
        realValue: null,
        predictedValue: item.valeur,
      });
    }
  });

  const allData = Array.from(dataMap.values()).sort((a, b) =>
    new Date(a.date) - new Date(b.date)
  );

  return (
    <div ref={chartRef} className="w-full h-96 p-4 rounded-2xl bg-white shadow">
      <h3 className="text-lg font-bold text-gray-800 mb-3">
        Données réelles vs Prédictions
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={allData}>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
          <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 12 }} />
          <YAxis domain={[minDomain, 'auto']} tick={{ fill: "#6b7280", fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#ffffff", borderColor: "#d1d5db" }}
            labelStyle={{ color: "#374151", fontWeight: 500 }}
            itemStyle={{ fontSize: 13, color: "#111827" }}
          />
          <Legend
            wrapperStyle={{ fontSize: 13, color: "#4b5563" }}
            iconType="circle"
          />

          <Line
            type="monotone"
            dataKey="realValue"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 3, fill: "#2563eb" }}
            activeDot={{ r: 5 }}
            name="Données réelles"
            connectNulls
          />

          <Line
            type="monotone"
            dataKey="predictedValue"
            stroke="#22c55e"
            strokeWidth={2}
            dot={{ r: 3, fill: "#22c55e" }}
            activeDot={{ r: 5 }}
            name="Prédictions"
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graphique;
  
  // Filtrer les données par type
//   const historiqueData = data.filter((item) => item.Type === 'historique');
//   const predictionData = data.filter((item) => item.Type === 'prediction');

//   return (
//     <div ref={chartRef} className="w-full h-full">
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="Date" />
//           <YAxis domain={[minDomain, 'auto']} />
//           <Tooltip />
//           <Legend />

//           {/* Ligne pour les données historiques */}
//           <Line
//             data={historiqueData}
//             type="monotone"
//             dataKey="Valeur"
//             stroke="#1f77b4"
//             name="Historique"
//             strokeWidth={2}
//             dot={false}
//           />

//           {/* Ligne pour les données prédites */}
//           <Line
//             data={predictionData}
//             type="monotone"
//             dataKey="Valeur"
//             stroke="#d62728"
//             name="Prédiction"
//             strokeDasharray="5 5"
//             strokeWidth={2}
//             dot={false}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default Graphique;
