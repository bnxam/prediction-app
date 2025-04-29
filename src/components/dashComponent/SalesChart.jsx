// // // src/components/SalesChart.jsx
// // import React from 'react';
// // import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// // export default function SalesChart({ data }) {
// //   return (
// //     <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
// //       <h2 className="text-xl font-semibold text-gray-700 mb-4">Dataset global de l'entreprise</h2>
// //       <ResponsiveContainer width="100%" height={300}>
// //         <LineChart data={data}>
// //           <CartesianGrid strokeDasharray="3 3" />
// //           <XAxis dataKey="name" />
// //           <YAxis />
// //           <Tooltip />
// //           <Line type="monotone" dataKey="uv" stroke="#8884d8" activeDot={{ r: 8 }} />
// //           <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
// //         </LineChart>
// //       </ResponsiveContainer>
// //     </div>
// //   );
// // }

// // import React from 'react';
// // import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// // export default function SalesChart({ data }) {
// //   return (
// //     <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
// //       <h2 className="text-xl font-semibold text-gray-700 mb-4">Dataset global de l'entreprise</h2>
// //       <ResponsiveContainer width="100%" height={300}>
// //         <LineChart data={data}>
// //           <CartesianGrid strokeDasharray="3 3" />
// //           <XAxis dataKey="Date" /> {/* ICI changer "name" -> "Date" */}
// //           <YAxis />
// //           <Tooltip />
// //           <Line type="monotone" dataKey="Valeur" stroke="#8884d8" activeDot={{ r: 8 }} /> {/* ICI changer "uv" -> "Valeur" */}
// //         </LineChart>
// //       </ResponsiveContainer>
// //     </div>
// //   );
// // }
// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';

// export default function SalesChart({ data }) {
//   return (
//     <div className="p-6 rounded-2xl mb-8">
//       <h2 className="text-xl font-semibold text-gray-700 mb-4">Dataset global de l'entreprise</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data}>
//           {/* Définir un dégradé ici */}
//           <defs>
//             <linearGradient id="colorValeur" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
//               <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
//             </linearGradient>
//           </defs>

//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="datetime" />
//           <YAxis />
//           <Tooltip />

//           {/* Courbe normale */}
//           <Line 
//             type="monotone" 
//             dataKey="value" //si c'etait l'autre dataset , on fait Valeur et non pas value 
//             stroke="#8884d8" 
//             activeDot={{ r: 8 }} 
//             strokeWidth={2}
//             dot={false}   // <--- C'est ça qui enlève les points
//           />

//           {/* OMBRE dessous (Area) */}
//           <Area 
//             type="monotone" 
//             dataKey="value" //Valeur
//             stroke="none" 
//             fill="url(#colorValeur)" 
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }


import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';

export default function SalesChart({ data }) {
  // Trouver la valeur minimale dans les données
  const minValue = Math.min(...data.map(item => item.value));
  // Optionnel: Ajouter une marge en dessous de la valeur minimale
  const minDomain = minValue > 0 ? minValue * 0.9 : minValue * 1.1;

  return (
    <div className="p-6 rounded-2xl mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Dataset global de l'entreprise</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="colorValeur" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="datetime" />
          <YAxis domain={[minDomain, 'auto']} />
          <Tooltip />

          <Line 
            type="monotone" 
            dataKey="value"
            stroke="#8884d8" 
            activeDot={{ r: 8 }} 
            strokeWidth={2}
            dot={false}
          />

          <Area 
            type="monotone" 
            dataKey="value"
            stroke="none" 
            fill="url(#colorValeur)" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
