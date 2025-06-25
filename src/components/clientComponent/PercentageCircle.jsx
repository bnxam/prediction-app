// import React from 'react';

// const PercentageCircle = ({ percentage }) => {
//   const radius = 40;
//   const stroke = 10;
//   const normalizedRadius = radius - stroke / 2;
//   const circumference = 2 * Math.PI * normalizedRadius;
//   const strokeDashoffset = circumference - (percentage / 100) * circumference;

//   return (
//     <div className="flex items-center gap-4 mt-6 p-4 rounded-xl shadow-md border border-green-700"
//          style={{ backgroundColor: '#ecf4fe' }}>
//       <div className="relative w-20 h-20">
//         <svg height={radius * 2} width={radius * 2}>
//           {/* Cercle de fond */}
//           <circle
//             stroke="#A7F3D0" // vert clair (emerald-200)
//             fill="transparent"
//             strokeWidth={stroke}
//             r={normalizedRadius}
//             cx={radius}
//             cy={radius}
//           />
//           {/* Cercle de progression */}
//           <circle
//             stroke="#1e3a8a" // jaune
//             fill="transparent"
//             strokeWidth={stroke}
//             strokeLinecap="round"
//             strokeDasharray={`${circumference} ${circumference}`}
//             strokeDashoffset={strokeDashoffset}
//             r={normalizedRadius}
//             cx={radius}
//             cy={radius}
//             style={{ transition: 'stroke-dashoffset 0.5s ease' }}
//           />
//         </svg>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <span className="text-sm font-bold text-white">{percentage}%</span>
//         </div>
//       </div>

//       <div className="flex flex-col justify-center">
//         <p className="text-sm text-white">Taux d'erreur de prédiction</p>
//         <p className="text-base font-semibold text-white">Sur les données fournies</p>
//       </div>
//     </div>
//   );
// };

// export default PercentageCircle;
import React from 'react';

const PercentageCircle = ({ percentage }) => {
  const radius = 40;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-4 mt-6 p-4 rounded-xl shadow-md border border-blue-900"
         style={{ backgroundColor: '#475569' }}>
      <div className="relative w-20 h-20">
        <svg height={radius * 2} width={radius * 2}>
          {/* Cercle de fond */}
          <circle
            stroke="#c7d2e0" // gris bleuté clair
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Cercle de progression */}
          <circle
            stroke="#FACC15" // jaune vif pour contraster
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-white">{percentage}%</span>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-sm text-gray-200">Taux d'erreur de prédiction</p>
        <p className="text-base font-semibold text-white">Sur les données fournies</p>
      </div>
    </div>
  );
};

export default PercentageCircle;
