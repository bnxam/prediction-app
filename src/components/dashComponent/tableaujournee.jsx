import React, { useState } from 'react';
import { format, parseISO, isSameDay } from 'date-fns';

export default function TableauJournee({ data }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const filteredData = data.filter(item => 
    isSameDay(parseISO(item.datetime), selectedDate)
  );

  return (
    <div className="  p-6 rounded-2xl mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Tableau de la journée</h2>

      <input 
        type="date" 
        value={format(selectedDate, 'yyyy-MM-dd')} 
        onChange={(e) => {
          const selected = e.target.value;
          const [year, month, day] = selected.split('-');
          setSelectedDate(new Date(year, month - 1, day)); // mois - 1 car JavaScript commence à 0
        }}
                className="w-full border focus:ring-3 focus:ring-purple-200 focus:border-purple-500 focus:outline-none border-gray-300 p-2 rounded mb-4"
      />

      {/* Tableau dans un conteneur avec scroll */}
      <div className="overflow-y-auto max-h-64 mt-4 border border-gray-200 rounded-md ">
        <table className="min-w-full table-fixed">
          <thead className="bg-purple-100">
            <tr>
              <th className="py-2 px-4 border border-gray-200 w-1/2">Heure</th>
              <th className="py-2 px-4 border border-gray-200 w-1/2">Valeur</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border">{format(parseISO(item.datetime), 'HH:mm')}</td>
                  <td className="py-2 px-4 border">{item.value}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="py-4 text-center text-gray-500">Aucune donnée pour cette date</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// import React, { useState } from 'react';
// import { format, parseISO, isSameDay } from 'date-fns';

// export default function TableauJournee({ data }) {
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   const filteredData = data.filter(item =>
//     isSameDay(parseISO(item.datetime), selectedDate)
//   );

//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-md h-full flex flex-col">
//       <h2 className="text-xl font-semibold text-gray-700 mb-4">Tableau de la journée</h2>

//       <input
//         type="date"
//         value={format(selectedDate, 'yyyy-MM-dd')}
//         onChange={(e) => {
//           const selected = e.target.value;
//           const [year, month, day] = selected.split('-');
//           setSelectedDate(new Date(year, month - 1, day));
//         }}
//         className="border p-2 rounded mb-4"
//       />

//       {/* Tableau dans un conteneur avec scroll qui prend tout l'espace disponible */}
//       <div className="flex-1 overflow-y-auto border rounded-md">
//         <table className="min-w-full table-fixed">
//           <thead className="bg-gray-100 sticky top-0">
//             <tr>
//               <th className="py-2 px-4 border w-1/2">Heure</th>
//               <th className="py-2 px-4 border w-1/2">Valeur</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.length > 0 ? (
//               filteredData.map((item, index) => (
//                 <tr key={index} className="text-center">
//                   <td className="py-2 px-4 border">{format(parseISO(item.datetime), 'HH:mm')}</td>
//                   <td className="py-2 px-4 border">{item.value}</td>
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

