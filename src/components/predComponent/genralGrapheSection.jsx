// import React from 'react';
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   Area,
//   Legend,
// } from 'recharts';

// export default function GeneralGraphesection({ data, minDomain, chartRef }) {



//   // Séparer les données historiques et les prédictions
//   const historicalData = data.filter(item => item.Type === 'historique');
//   const predictionData = data.filter(item => item.Type === 'prediction');
//   console.log(predictionData)
//   return (
//     <div ref={chartRef} className="w-full h-full">
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="Date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
//           <YAxis domain={[minDomain, 'auto']} />
//           <Tooltip />
//           <Legend />

//           {/* Historique */}
//           <Line
//             data={historicalData}
//             dataKey="Valeur"
//             stroke="#8884d8"
//             name="Historique"
//             dot={false}
//             isAnimationActive={false}
//           />
//           <Area
//             data={historicalData}
//             dataKey="Valeur"
//             fill="url(#colorHistorique)"
//             stroke="none"
//             fillOpacity={0.4}
//             isAnimationActive={false}
//           />

//           {/* Prédiction */}
//           {predictionData.length > 0 && (
//             <>
//               <Line
//                 data={predictionData}
//                 dataKey="Valeur"
//                 stroke="#ff7300"
//                 strokeDasharray="5 5"
//                 name="Prédiction"
//                 dot={false}
//                 isAnimationActive={false}
//               />
//               <Area
//                 data={predictionData}
//                 dataKey="Valeur"
//                 fill="url(#colorPrediction)"
//                 stroke="none"
//                 fillOpacity={0.4}
//                 isAnimationActive={false}
//               />
//             </>
//           )}
//         </LineChart>
//       </ResponsiveContainer>

//     </div>
//   );
// }
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

export default function GeneralGraphesection({ data = [], chartRef }) {
  // Fusionner les données dans une seule structure
  const allData = [];

  data.forEach((item) => {
    const existing = allData.find(d => d.Date === item.Date);

    if (existing) {
      if (item.Type === 'historique') {
        existing.realValue = item.Valeur;
      } else if (item.Type === 'prediction') {
        existing.predictedValue = item.Valeur;
      }
    } else {
      allData.push({
        Date: item.Date,
        realValue: item.Type === 'historique' ? item.Valeur : null,
        predictedValue: item.Type === 'prediction' ? item.Valeur : null,
      });
    }
  });

  return (
    <div ref={chartRef} className="w-full h-64 bg-white p-4 rounded shadow">
      <h3 className="text-lg font-medium mb-2">Évolution mensuelle & Prédictions</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={allData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Données réelles */}
          <Line
            type="monotone"
            dataKey="realValue"
            stroke="#3b82f6"
            strokeWidth={2}
            // dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Données réelles"
            connectNulls
          />

          {/* Prédictions */}
          <Line
            type="monotone"
            dataKey="predictedValue"
            stroke="#f97316"
            strokeWidth={2}
            // dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Prédictions"
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
