import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

const ClientHistogram = ({ data = [], predictions = [] }) => {
  // Fusionner les données comme dans ClientChart
  const dataMap = new Map();

  data.forEach((item) => {
    dataMap.set(item.date, {
      date: item.date,
      realValue: item.valeur,
      predictedValue: null,
    });
  });

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

  const allData = Array.from(dataMap.values()).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="w-full h-72 p-6 rounded-2xl">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Histogramme des Consommations
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={allData}>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
          <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 12 }} />
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
          <Bar
            dataKey="realValue"
            name="Données réelles"
            fill="#1e3a8a"
            radius={[6, 6, 0, 0]}
          />
          <Bar
            dataKey="predictedValue"
            name="Prédictions"
            fill="#10b981"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClientHistogram;
