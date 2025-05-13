import React ,{ useState} from 'react';

const Tableau = ({data}) => {

    const [selectedDate, setSelectedDate] = useState('');

  const filteredData = selectedDate
    ? data.filter((row) => {
      const rowDate = new Date(row.datetime).toISOString().split('T')[0];
      return rowDate === selectedDate;
    })
    : data;
  return (
    <div className="bg-[#fffde9] rounded-l shadow-md border border-[#e6dea9] overflow-hidden">
      {/* Barre de recherche */}
      <div className="p-4 border-b border-[#e6dea9] bg-[#fdf8c4]">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-[#7a6f39]">Recherche par date</label>
          <span className="text-xs text-[#7a6f39]">{filteredData.length} enregistrements</span>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-[#e6dea9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-[#e6dea9] rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#fdf8c4] focus:border-[#fdf8c4] transition duration-150 text-[#7a6f39]"
          />
        </div>
      </div>

      {/* Tableau */}
      <div className="overflow-y-auto" style={{ maxHeight: '24rem' }}>
        <table className="min-w-full divide-y divide-[#e6dea9]">
          <thead className="bg-[#fdf8c4] sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#7a6f39] uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#7a6f39] uppercase tracking-wider">Valeur</th>
            </tr>
          </thead>
          <tbody className="bg-[#fffcd6] divide-y divide-[#e6dea9]">
            {filteredData.map((row, index) => (
              <tr key={index} className="bg-[#fffcd6] hover:bg-[#fdf8c4]">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#5b5028]">
                  {new Date(row.datetime).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#7a6f39] font-semibold">
                  {row.value.toLocaleString('fr-FR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tableau;
