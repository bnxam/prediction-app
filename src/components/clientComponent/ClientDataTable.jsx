import React from 'react';

const ClientDataTable = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-medium mb-2">Tableau des données</h3>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Mois</th>
            <th className="p-2 text-left">Valeur</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{d.month}</td>
              <td className="p-2">{d.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientDataTable;
