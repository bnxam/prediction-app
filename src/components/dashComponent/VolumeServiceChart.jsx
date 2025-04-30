// // // src/components/VolumeServiceChart.jsx
// // import React from 'react';
// // import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// // export default function VolumeServiceChart({ data }) {
// //   return (
// //     <div className="bg-white p-6 rounded-2xl shadow-md">
// //       <h2 className="text-xl font-semibold text-gray-700 mb-4">Volume vs Service Level</h2>
// //       <ResponsiveContainer width="100%" height={300}>
// //         <BarChart data={data}>
// //           <CartesianGrid strokeDasharray="3 3" />
// //           <XAxis dataKey="name" />
// //           <YAxis />
// //           <Tooltip />
// //           <Legend />
// //           <Bar dataKey="volume" fill="#8884d8" />
// //           <Bar dataKey="service" fill="#82ca9d" />
// //         </BarChart>
// //       </ResponsiveContainer>
// //     </div>
// //   );
// // }




// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// export default function VolumeServiceChart({ data }) {
//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-md">
//       <h2 className="text-xl font-semibold text-gray-700 mb-4">Évolution des valeurs</h2> {/* Tu peux changer le titre */}
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           {/* <XAxis dataKey="Date" /> Changer "name" -> "Date" */}
//           <XAxis dataKey="datetime" /> {/* Changer "name" -> "Date" */}
//           <YAxis />
//           <Tooltip />
//           {/* Ici, vu que tu as UNE seule valeur (Valeur), une seule Bar suffit */}
//           {/* <Bar dataKey="Valeur" fill="#8884d8" /> */}
//           <Bar dataKey="value" fill="#8884d8" />

//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function VolumeServiceChart({ data }) {
  // Trouver la valeur minimale dans les données
  const minValue = Math.min(...data.map(item => item.value));
  // Ajouter une marge en dessous de la valeur minimale (10%)
  const minDomain = minValue > 0 ? minValue * 0.9 : minValue * 1.1;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Évolution des valeurs</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="datetime" />
          <YAxis domain={[minDomain, 'auto']} />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}