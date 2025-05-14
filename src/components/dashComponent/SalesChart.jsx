// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';

// export default function SalesChart({ data }) {
//   // Trouver la valeur minimale dans les données
//   const minValue = Math.min(...data.map(item => item.value));
//   // Optionnel: Ajouter une marge en dessous de la valeur minimale
//   const minDomain = minValue > 0 ? minValue * 0.9 : minValue * 1.1;

//   return (
//     <div className="p-6 rounded-2xl mb-8">
//       <h2 className="text-xl font-semibold text-gray-700 mb-4">Dataset global de l'entreprise</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data}>
//           <defs>
//             <linearGradient id="colorValeur" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
//               <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
//             </linearGradient>
//           </defs>

//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="datetime" />
//           <YAxis domain={[minDomain, 'auto']} />
//           <Tooltip />

//           <Line 
//             type="monotone" 
//             dataKey="value"
//             stroke="#8884d8" 
//             activeDot={{ r: 8 }} 
//             strokeWidth={2}
//             dot={false}
//           />

//           <Area 
//             type="monotone" 
//             dataKey="value"
//             stroke="none" 
//             fill="url(#colorValeur)" 
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
import React, { useRef, useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area
} from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

export default function SalesChart({ data }) {
  const chartRef = useRef();
  const dropdownRef = useRef();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const minValue = Math.min(...data.map(item => item.value));
  const minDomain = minValue > 0 ? minValue * 0.9 : minValue * 1.1;

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const downloadPDF = async () => {
    const input = chartRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('landscape');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('graphique.pdf');
  };

  const downloadCSV = () => {
    let csvContent = "Date,Valeur\n";
    data.forEach(row => {
      csvContent += `${row.datetime},${row.value}\n`;
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'donnees.csv');
  };

  const downloadPNG = async () => {
    const input = chartRef.current;
    const canvas = await html2canvas(input);
    canvas.toBlob(blob => {
      saveAs(blob, 'graphique.png');
    });
  };

  const handleDownload = (format) => {
    setDropdownOpen(false);
    if (format === 'pdf') downloadPDF();
    if (format === 'csv') downloadCSV();
    if (format === 'png') downloadPNG();
  };

  return (
    <div className="p-6 rounded-2xl mb-8 " ref={chartRef}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-xl font-semibold text-gray-700">Dataset global de l'entreprise</h2>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-200"
            // className="px-4 py-2 bg-[#7C4585] text-white rounded-lg hover:bg-indigo-500 transition duration-200"
          >
            Télécharger
          </button>

          <div
            className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg transform transition-all duration-200 origin-top ${
              dropdownOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
            } z-20`}
          >
            <button
              onClick={() => handleDownload('csv')}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-lg"
            >
              Télécharger CSV
            </button>
            <button
              onClick={() => handleDownload('png')}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Télécharger PNG
            </button>
            <button
              onClick={() => handleDownload('pdf')}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg"
            >
              Télécharger PDF
            </button>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="colorValeur" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="datetime" />
          <YAxis domain={[minDomain, 'auto']} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            strokeWidth={2}
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="none"
            fill="url(#colorValeur)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
