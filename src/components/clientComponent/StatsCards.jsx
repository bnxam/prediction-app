// import React from 'react';



// const StatsCards = ({ data }) => {
//   if (!data || data.length === 0) return null;

//   const values = data.map(item => item.valeur);
//   const sum = values.reduce((a, b) => a + b, 0);
//   const avg = sum / values.length;
//   const max = Math.max(...values);
//   const min = Math.min(...values);

//   const stats = [
//     { title: 'Moyenne', value: avg.toFixed(2), bg: 'bg-blue-50' },
//     { title: 'Totale', value: sum.toFixed(2), bg: 'bg-green-50' },
//     { title: 'Maximum', value: max.toFixed(2), bg: 'bg-yellow-50' },
//     { title: 'Minimum', value: min.toFixed(2), bg: 'bg-red-50' },
//     { title: 'Dernier', value: values[values.length-1].toFixed(2), bg: 'bg-purple-50' }
//   ];

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//       {stats.map((stat, index) => (
//         <div key={index} className={`${stat.bg} p-4 rounded-lg`}>
//           <p className="text-sm text-gray-500">{stat.title}</p>
//           <p className="text-2xl font-bold">{stat.value}</p>
//         </div>
//       ))}
//     </div>
//   );
// };
// export default StatsCards;
import React from 'react';
import backcard5 from '../../assets/images/backcard5.jpg';

const StatsCards = ({ data }) => {
  if (!data || data.length === 0) return null;

  const values = data.map(item => item.valeur);
  const sum = values.reduce((a, b) => a + b, 0);
  const avg = sum / values.length;
  const max = Math.max(...values);
  const min = Math.min(...values);

  // Tous les emojis en bleu avec différentes nuances
  const stats = [
    { 
      title: 'Moyenne', 
      value: avg.toFixed(2), 
      emoji: '📊',  // Graphique
      color: 'bg-blue-50 text-blue-400 border-blue-100'
    },
    { 
      title: 'Total', 
      value: sum.toFixed(2), 
      emoji: '🔋',  // Batterie
      color: 'bg-blue-100 text-blue-500 border-blue-200' 
    },
    { 
      title: 'Maximum', 
      value: max.toFixed(2), 
      emoji: '⬆️',  // Flèche haut
      color: 'bg-blue-200 text-blue-600 border-blue-300' 
    },
    { 
      title: 'Minimum', 
      value: min.toFixed(2), 
      emoji: '⬇️',  // Flèche bas
      color: 'bg-blue-300 text-blue-700 border-blue-400' 
    },
    { 
      title: 'Dernier', 
      value: values[values.length - 1].toFixed(2), 
      emoji: '⏱',  // Chrono
      color: 'bg-blue-400 text-blue-800 border-blue-500' 
    }
  ];

  return (
    <div
      className="rounded-2xl p-6 shadow-xl bg-cover bg-center"
      style={{
        backgroundImage: `url(${backcard5})`,
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(255,255,255,0.3)',
      }}
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/80 rounded-xl p-5 text-center shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-sm border border-gray-100"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center mx-auto mb-3 rounded-full text-2xl ${stat.color} border-2`}
            >
              {stat.emoji}
            </div>
            <p className="text-sm text-gray-600 font-semibold">{stat.title}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;
