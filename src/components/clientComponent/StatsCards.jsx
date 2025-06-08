import React from 'react';
// const StatsCards = ({ data }) => {
//   const values = data.map(d => d.value);
//   const max = Math.max(...values);
//   const min = Math.min(...values);
//   const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);

//   const cards = [
//     { label: 'Valeur maximale de consomation ', value: max, color: 'bg-green-200' },
//     { label: 'Valeur minimale de consomation', value: min, color: 'bg-red-200' },
//     { label: 'Moyenne', value: avg, color: 'bg-blue-200' },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {cards.map((card, idx) => (
//         <div key={idx} className={`p-4 rounded-lg shadow ${card.color}`}>
//           <h4 className="text-lg font-semibold">{card.label}</h4>
//           <p className="text-2xl">{card.value}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StatsCards;



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

// import React from 'react';
// import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';

// const StatsCards = ({ data }) => {
//   const values = data.map(d => d.value);
//   const max = Math.max(...values);
//   const min = Math.min(...values);
//   const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);

//   const cards = [
//     { 
//       label: 'Consommation maximale', 
//       value: max, 
//       icon: <ArrowUp className="w-5 h-5" />,
//       bgColor: 'bg-green-50',
//       textColor: 'text-green-600',
//       borderColor: 'border-green-100'
//     },
//     { 
//       label: 'Consommation minimale', 
//       value: min, 
//       icon: <ArrowDown className="w-5 h-5" />,
//       bgColor: 'bg-red-50',
//       textColor: 'text-red-600',
//       borderColor: 'border-red-100'
//     },
//     { 
//       label: 'Moyenne de consommation', 
//       value: avg, 
//       icon: <TrendingUp className="w-5 h-5" />,
//       bgColor: 'bg-blue-50',
//       textColor: 'text-blue-600',
//       borderColor: 'border-blue-100'
//     },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//       {cards.map((card, idx) => (
//         <div 
//           key={idx} 
//           className={`p-5 rounded-xl shadow-sm border ${card.bgColor} ${card.borderColor} transition-all hover:shadow-md`}
//         >
//           <div className="flex items-center space-x-3 mb-3">
//             <div className={`p-2 rounded-lg ${card.textColor}/20 ${card.textColor}`}>
//               {card.icon}
//             </div>
//             <h4 className="font-medium text-gray-700">{card.label}</h4>
//           </div>
//           <p className={`text-3xl font-semibold ${card.textColor}`}>
//             {card.value}
//           </p>
//           <p className="text-sm text-gray-500 mt-1">
//             {idx === 2 ? 'sur toute la période' : ''}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };
// 
export default StatsCards;
