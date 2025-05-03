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
