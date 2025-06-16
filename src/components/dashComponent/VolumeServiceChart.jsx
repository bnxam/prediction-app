import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function VolumeServiceChart({ data }) {
  // Trouver la valeur minimale dans les données
  const minValue = Math.min(...data.map(item => item.valeur));
  // Ajouter une marge en dessous de la valeur minimale (10%)
  const minDomain = minValue > 0 ? minValue * 0.9 : minValue * 1.1;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Évolution des valeurs</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[minDomain, 'auto']} />
          <Tooltip />
          <Bar dataKey="valeur" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}