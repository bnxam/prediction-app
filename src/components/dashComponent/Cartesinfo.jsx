// import React from 'react';

// export default function Cartesinfo({ title, value, change, backgroundColor }) {
//   return (
//     <div className={`${backgroundColor} p-6 rounded-sm shadow-md text-center transition duration-300 hover:scale-105 hover:shadow-lg flex-1`}>
//       <h3 className="text-lg font-bold mb-2 text-gray-800">{title}</h3>
//       <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
//       <p className="text-sm text-gray-600">{change}</p>
//     </div>
//   );
// }
import React from 'react';

export default function Cartesinfo({ title, value, change, backgroundColor, children }) {
  return (
    <div className={`${backgroundColor} p-6 rounded-sm shadow-md text-center transition duration-300 hover:scale-105 hover:shadow-lg flex-1`}>
      <h3 className="text-lg font-bold mb-2 text-gray-800">{title}</h3>
      {value && <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>}
      {change && <p className="text-sm text-gray-600">{change}</p>}
      {children}
    </div>
  );
}