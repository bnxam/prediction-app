// import React, { useRef, useState, useEffect } from 'react';
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area
// } from 'recharts';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import { saveAs } from 'file-saver';

// export default function SalesChartClient({ data }) {
//   const chartRef = useRef();
//   const dropdownRef = useRef();
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const minValue = Math.min(...data.map(item => item.value));
//   const minDomain = minValue > 0 ? minValue * 0.9 : minValue * 1.1;

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
//     let csvContent = "Date,Valeur\n";
//     data.forEach(row => {
//       csvContent += `${row.datetime},${row.value}\n`;
//     });
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     saveAs(blob, 'donnees.csv');
//   };

//   const downloadPNG = async () => {
//     const input = chartRef.current;
//     const canvas = await html2canvas(input);
//     canvas.toBlob(blob => {
//       saveAs(blob, 'graphique.png');
//     });
//   };

//   const handleDownload = (format) => {
//     setDropdownOpen(false);
//     if (format === 'pdf') downloadPDF();
//     if (format === 'csv') downloadCSV();
//     if (format === 'png') downloadPNG();
//   };

//   return (
//     <div className="p-6 rounded-2xl mb-8 " ref={chartRef}>
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
//         {/* <h2 className="text-xl font-semibold text-gray-700">Dataset global de l'entreprise</h2> */}

        
//       </div>

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
// import React from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Legend
// } from 'recharts';

// const ClientChart = ({ data = [], predictions = [] }) => {
//   // Fusion des données avec des clés distinctes
//   const allData = [];

//   // Ajouter les données réelles
//   data.forEach((item) => {
//     allData.push({
//       month: item.month,
//       realValue: item.value,
//       predictedValue: null,
//     });
//   });

//   // Ajouter les prédictions (en conservant la date)
//   predictions.forEach((item) => {
//     allData.push({
//       month: item.month,
//       realValue: null,
//       predictedValue: item.value,
//     });
//   });

//   return (
//     <div className="w-full h-64 bg-white p-4 rounded shadow">
//       <h3 className="text-lg font-medium mb-2">Évolution mensuelle & Prédictions</h3>
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={allData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Legend />

//           {/* Données réelles */}
//           <Line
//             type="monotone"
//             dataKey="realValue"
//             stroke="#3b82f6"
//             strokeWidth={2}
//             dot={{ r: 4 }}
//             activeDot={{ r: 6 }}
//             name="Données réelles"
//             connectNulls
//           />

//           {/* Prédictions */}
//           <Line
//             type="monotone"
//             dataKey="predictedValue"
//             stroke="#f97316"
//             // strokeDasharray="5 5"
//             strokeWidth={2}
//             dot={{ r: 4 }}
//             activeDot={{ r: 6 }}
//             name="Prédictions"
//             connectNulls
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ClientChart;
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';

const SalesChartClient = ({ data = [] }) => {
  return (
    <div className="w-full h-64 bg-white p-4 rounded shadow">
      {/* <h3 className="text-lg font-medium mb-2">Évolution mensuelle & Prédictions</h3> */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          {/* Données réelles */}
          <Line
            type="monotone"
            dataKey="realValue"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Données réelles"
            connectNulls={false}
          />

          {/* Prédictions */}
          <Line
            type="monotone"
            dataKey="predictedValue"
            stroke="#f97316"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Prédictions"
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChartClient;
