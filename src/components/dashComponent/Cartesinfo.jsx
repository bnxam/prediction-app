// import React from 'react';
// export default function Cartesinfo({ title, value, backgroundColor, children }) {
//   return (
//     <div className={`
//       ${backgroundColor} 
//       p-4 rounded-xl shadow-sm  // Réduit le padding de p-6 à p-4
//       border border-gray-100
//       transition-all duration-200 
//       hover:shadow-md hover:border-gray-200
//       flex flex-col items-center
//       min-h-[120px]  // Réduit la hauteur minimale de 160px à 120px
//     `}>
//       <h3 className="text-sm font-medium text-gray-600">{title}</h3> 
//       {value && <p className="text-2xl font-bold my-1 text-gray-900">{value}</p>}  
//       {children}
//     </div>
//   );
// }
// Cartesinfo.js
import React from 'react';

export default function Cartesinfo({ title, value, backgroundColor, icon }) {
  return (
    <div className={`
      ${backgroundColor} 
      p-4 rounded-xl shadow-sm
      border border-gray-100
      transition-all duration-200 
      hover:shadow-md hover:border-gray-200
      flex flex-col items-center justify-center
      min-h-[120px] relative
    `}>
      {/* Conteneur icône + titre */}
      <div className="flex items-center gap-2 mb-2">
        {icon && <div className="[&>svg]:h-5 [&>svg]:w-5">
          {icon}
        </div>}
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      </div>

      {value && <p className="text-xl font-bold text-gray-700">{value}</p>}
    </div>
  );
}