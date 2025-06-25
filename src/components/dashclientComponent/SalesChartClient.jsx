
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

// const SalesChartClient = ({ data = [] }) => {
//   return (
//     <div className="w-full h-64 bg-white p-4 rounded shadow">
//       {/* <h3 className="text-lg font-medium mb-2">Évolution mensuelle & Prédictions</h3> */}
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={data}>
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
//             connectNulls={false}
//           />

//           {/* Prédictions */}
//           <Line
//             type="monotone"
//             dataKey="predictedValue"
//             stroke="#f97316"
//             strokeWidth={2}
//             dot={{ r: 4 }}
//             activeDot={{ r: 6 }}
//             name="Prédictions"
//             connectNulls={false}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default SalesChartClient;
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

const SalesChartClient = ({ data = [] }) => {
  return (
    <div className="w-full h-72 ">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Évolution mensuelle & Prédictions
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
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
            stroke="#1e3a8a"
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
            stroke="#10b981"
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

export default SalesChartClient;

