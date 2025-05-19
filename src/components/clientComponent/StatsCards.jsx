import React from 'react';

const StatsCards = ({ data }) => {
  const values = data.map(d => d.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);

  const cards = [
    { label: 'Valeur maximale de consomation ', value: max, color: 'bg-green-200' },
    { label: 'Valeur minimale de consomation', value: min, color: 'bg-red-200' },
    { label: 'Moyenne', value: avg, color: 'bg-blue-200' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, idx) => (
        <div key={idx} className={`p-4 rounded-lg shadow ${card.color}`}>
          <h4 className="text-lg font-semibold">{card.label}</h4>
          <p className="text-2xl">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
