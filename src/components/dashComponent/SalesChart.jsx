import React, { useRef, useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area
} from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { min } from 'date-fns';

export default function SalesChart({ data }) {
  const chartRef = useRef();
  const dropdownRef = useRef();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const minValeur = Math.min(...data.map(item => item.valeur));
  
  const minDomain = minValeur > 0 ? minValeur * 0.9 : minValeur * 1.1;
  console.log("a verifier", data);
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
      csvContent += `${row.date},${row.valeur}\n`;
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
            className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg transform transition-all duration-200 origin-top ${dropdownOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
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
          <XAxis dataKey="date" />
          <YAxis domain={[minDomain, 'auto']} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="valeur"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            strokeWidth={2}
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="valeur"
            stroke="none"
            fill="url(#colorValeur)"
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}
SalesChart.js
// import React, { useRef, useState, useEffect } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import { saveAs } from 'file-saver';

// const SalesChart = ({ data }) => {
//   const chartRef = useRef();
//   const dropdownRef = useRef();
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const minValeur = Math.min(...data.map(item => item.valeur));
//   const minDomain = minValeur > 0 ? minValeur * 0.9 : minValeur * 1.1;

//   const toggleDropdown = () => setDropdownOpen(prev => !prev);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const downloadPDF = async () => {
//     const input = chartRef.current;
//     const canvas = await html2canvas(input);
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('landscape');
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save('graphique.pdf');
//   };

//   const downloadCSV = () => {
//     const csvContent = "Date,Valeur\n" + data.map(row => `${row.date},${row.valeur}`).join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     saveAs(blob, 'donnees.csv');
//   };

//   const downloadPNG = async () => {
//     const input = chartRef.current;
//     const canvas = await html2canvas(input);
//     canvas.toBlob(blob => saveAs(blob, 'graphique.png'));
//   };

//   const handleDownload = (format) => {
//     setDropdownOpen(false);
//     const downloadActions = {
//       pdf: downloadPDF,
//       csv: downloadCSV,
//       png: downloadPNG
//     };
//     downloadActions[format]?.();
//   };

//   return (
//     <div className="space-y-4" ref={chartRef}>
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//         <h2 className="text-xl font-semibold text-gray-800">Dataset global de l'entreprise</h2>
        
//         <div className="relative" ref={dropdownRef}>
//           <button
//             onClick={toggleDropdown}
//             className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-sm"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
//             </svg>
//             Télécharger
//           </button>

//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-20 overflow-hidden">
//               {['csv', 'png', 'pdf'].map((format) => (
//                 <button
//                   key={format}
//                   onClick={() => handleDownload(format)}
//                   className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-150 flex items-center gap-2"
//                 >
//                   <FileIcon format={format} />
//                   {format.toUpperCase()}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="h-80">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
//             <defs>
//               <linearGradient id="colorValeur" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#7C4585" stopOpacity={0.8} />
//                 <stop offset="95%" stopColor="#7C4585" stopOpacity={0.1} />
//               </linearGradient>
//             </defs>
//             <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//             <XAxis 
//               dataKey="date" 
//               tick={{ fill: '#6b7280' }}
//               axisLine={{ stroke: '#e5e7eb' }}
//             />
//             <YAxis 
//               domain={[minDomain, 'auto']} 
//               tick={{ fill: '#6b7280' }}
//               axisLine={{ stroke: '#e5e7eb' }}
//             />
//             <Tooltip 
//               contentStyle={{
//                 backgroundColor: '#ffffff',
//                 border: '1px solid #e5e7eb',
//                 borderRadius: '0.5rem',
//                 boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
//               }}
//             />
//             <Area
//               type="monotone"
//               dataKey="valeur"
//               stroke="none"
//               fill="url(#colorValeur)"
//               fillOpacity={1}
//             />
//             <Line
//               type="monotone"
//               dataKey="valeur"
//               stroke="#7C4585"
//               strokeWidth={2}
//               activeDot={{ r: 8, fill: '#7C4585' }}
//               dot={false}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// const FileIcon = ({ format }) => {
//   const icons = {
//     pdf: (
//       <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//       </svg>
//     ),
//     png: (
//       <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//       </svg>
//     ),
//     csv: (
//       <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//       </svg>
//     )
//   };
//   return icons[format] || null;
// };

// export default SalesChart;