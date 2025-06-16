import React from 'react';

export default function Cartesinfo({ title, value,  backgroundColor, children }) {
  return (
<div className={`
  ${backgroundColor} 
  p-6 rounded-xl shadow-sm 
  border border-gray-100  // Bordure subtile
  transition-all duration-200 
  hover:shadow-md hover:border-gray-200
  flex flex-col items-center
  min-h-[160px]
`}>
  <h3 className="text-lg font-medium text-gray-600">{title}</h3>
  {value && <p className="text-3xl font-bold my-2 text-gray-900">{value}</p>}
  
  {children}
</div>
  );
}