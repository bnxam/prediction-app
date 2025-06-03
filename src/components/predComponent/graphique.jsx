import React , {useState , useRef} from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
} from 'recharts';

const Graphique = ({ data, minDomain, chartRef }) => {
  return (
    <div ref={chartRef} className="w-full h-full" >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="colorValeur" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis domain={[minDomain, 'auto']} />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="Valeur"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            strokeWidth={2}
            dot={false}
          />

          <Area
            type="monotone"
            dataKey="Valeur"
            stroke="none"
            fill="url(#colorValeur)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graphique;
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

// const Graphique = ({ data, minDomain, chartRef }) => {
//   // Séparer les données historiques et les prédictions
//   const historicalData = data.filter(item => item.Type === 'historique');
//   const predictionData = data.filter(item => item.Type === 'prediction');
//   console.log(predictionData)
//   return (
//     <div ref={chartRef} className="w-full h-full">
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data}>
//           <defs>
//             {/* Dégradé pour les données historiques */}
//             <linearGradient id="colorHistorique" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
//               <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
//             </linearGradient>
            
//             {/* Dégradé pour les prédictions */}
//             <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8} />
//               <stop offset="95%" stopColor="#ff7300" stopOpacity={0} />
//             </linearGradient>
//           </defs>

//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis 
//             dataKey="Date" 
//             tickFormatter={(date) => new Date(date).toLocaleDateString()}
//           />
//           <YAxis domain={[minDomain, 'auto']} />
//           <Tooltip 
//             formatter={(value, name, props) => [
//               value, 
//               props.payload.Type === 'historique' ? 'Historique' : 'Prédiction'
//             ]}
//           />
//           <Legend />

//           {/* Ligne et zone pour les données historiques */}
//           <Line
//             type="monotone"
//             dataKey="Valeur"
//             stroke="#8884d8"
//             strokeWidth={2}
//             dot={false}
//             name="Historique"
//             isAnimationActive={false}
//             connectNulls
//           />
//           <Area
//             type="monotone"
//             dataKey="Valeur"
//             stroke="none"
//             fill="url(#colorHistorique)"
//             fillOpacity={0.4}
//             activeDot={false}
//             isAnimationActive={false}
//             connectNulls
//           />

//           {/* Ligne et zone pour les prédictions */}
//           {predictionData.length > 0 && (
//             <>
//               <Line
//                 type="monotone"
//                 dataKey="Valeur"
//                 stroke="#ff7300"
//                 strokeWidth={2}
//                 strokeDasharray="5 5"
//                 dot={false}
//                 name="Prédiction"
//                 isAnimationActive={false}
//                 connectNulls
//               />
//               <Area
//                 type="monotone"
//                 dataKey="Valeur"
//                 stroke="none"
//                 fill="url(#colorPrediction)"
//                 fillOpacity={0.4}
//                 activeDot={false}
//                 isAnimationActive={false}
//                 connectNulls
//               />
//             </>
//           )}
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default Graphique;
