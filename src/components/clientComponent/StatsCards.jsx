import React from 'react';



const StatsCards = ({ data }) => {
  if (!data || data.length === 0) return null;

  const values = data.map(item => item.valeur);
  const sum = values.reduce((a, b) => a + b, 0);
  const avg = sum / values.length;
  const max = Math.max(...values);
  const min = Math.min(...values);

  const stats = [
    { title: 'Moyenne', value: avg.toFixed(2), bg: 'bg-blue-50' },
    { title: 'Totale', value: sum.toFixed(2), bg: 'bg-green-50' },
    { title: 'Maximum', value: max.toFixed(2), bg: 'bg-yellow-50' },
    { title: 'Minimum', value: min.toFixed(2), bg: 'bg-red-50' },
    { title: 'Dernier', value: values[values.length-1].toFixed(2), bg: 'bg-purple-50' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className={`${stat.bg} p-4 rounded-lg`}>
          <p className="text-sm text-gray-500">{stat.title}</p>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};
export default StatsCards;
