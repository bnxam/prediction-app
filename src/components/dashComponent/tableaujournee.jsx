// import React, { useState } from 'react';
// import { format, parseISO, isSameDay } from 'date-fns';

// export default function TableauJournee({ data }) {
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const filteredData = data.filter(item => 
//     isSameDay(parseISO(item.date), selectedDate)
//   );

//   return (
//     <div className="  p-6 rounded-2xl mb-8">
//       <h2 className="text-xl font-semibold text-gray-700 mb-4">Tableau de la journée</h2>

//       <input 
//         type="date" 
//         value={format(selectedDate, 'yyyy-MM-dd')} 
//         onChange={(e) => {
//           const selected = e.target.valeur;
//           const [year, month, day] = selected.split('-');
//           setSelectedDate(new Date(year, month - 1, day)); // mois - 1 car JavaScript commence à 0
//         }}
//                 className="w-full border focus:ring-3 focus:ring-purple-200 focus:border-purple-500 focus:outline-none border-gray-300 p-2 rounded mb-4"
//       />

//       {/* Tableau dans un conteneur avec scroll */}
//       <div className="overflow-y-auto max-h-64 mt-4 border border-gray-200 rounded-md ">
//         <table className="min-w-full table-fixed">
//           <thead className="bg-purple-100">
//             <tr>
//               <th className="py-2 px-4 border border-gray-200 w-1/2">Heure</th>
//               <th className="py-2 px-4 border border-gray-200 w-1/2">Valeur</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.length > 0 ? (
//               filteredData.map((item, index) => (
//                 <tr key={index} className="text-center">
//                   <td className="py-2 px-4 border">{format(parseISO(item.date), 'HH:mm')}</td>
//                   <td className="py-2 px-4 border">{item.valeur}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="2" className="py-4 text-center text-gray-500">Aucune donnée pour cette date</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useMemo } from 'react';

export default function TableauJournee({ data }) {
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    if (data.length > 0 && !selectedYear) {
      const years = data.map(item => item.date?.slice(0, 4)).filter(Boolean);
      const sortedYears = Array.from(new Set(years)).sort();
      setSelectedYear(sortedYears[0]);
    }
  }, [data, selectedYear]);

  const availableYears = useMemo(() => {
    const years = new Set(data.map(item => item.date?.slice(0, 4)));
    return ['all', ...Array.from(years).sort()];
  }, [data]);

  const filteredData = useMemo(() => {
    if (selectedYear === 'all') return data;
    return data.filter(item => item.date?.startsWith(selectedYear));
  }, [data, selectedYear]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">📊 Synthèse mensuelle de consommation par année</h2>

        <select
          value={selectedYear || ''}
          onChange={e => setSelectedYear(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {availableYears.map((year, index) => (
            <option key={index} value={year}>
              {year === 'all' ? 'Toutes les années' : year}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-auto rounded-xl">
        <table className="min-w-full text-sm text-gray-700 border border-gray-200">
          <thead className="bg-indigo-50 text-indigo-700 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 border-b text-left font-medium">📅 Date</th>
              <th className="px-4 py-3 border-b text-left font-medium">⚡ Consommation (MW)</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-4 py-2 border-b">{item.date}</td>
                <td className="px-4 py-2 border-b">{item.valeur}</td>
              </tr>
            ))}

            {filteredData.length === 0 && (
              <tr>
                <td colSpan="2" className="px-4 py-3 text-center text-gray-400 italic">
                  Aucune donnée disponible pour cette année.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
