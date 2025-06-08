import React from 'react';

// const ClientDataTable = ({ data }) => {
//   return (
//     <div className="bg-white p-4 rounded shadow">
//       <h3 className="text-lg font-medium mb-2">Tableau des données</h3>
//       <table className="w-full table-auto">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 text-left">Mois</th>
//             <th className="p-2 text-left">Valeur</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((d, idx) => (
//             <tr key={idx} className="border-t">
//               <td className="p-2">{d.month}</td>
//               <td className="p-2">{d.value}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ClientDataTable;
const ClientDataTable = ({ data }) => {
  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('fr-FR');
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Consommation (kWh)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="p-3">{formatDate(item.date)}</td>
              <td className="p-3">{item.valeur.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ClientDataTable;