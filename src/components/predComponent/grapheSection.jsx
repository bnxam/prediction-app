import React, { useRef, useState } from 'react';
import { Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const GrapheSection = () => {
  const chartRef = useRef(); // Référence graphe ou tableau
  const [displayMode, setDisplayMode] = useState('graph'); // 'graph' ou 'table'

  const data = [
    { Date: '11/11/2002', Valeur: 34 },
    { Date: '12/11/2002', Valeur: 9 },
    { Date: '13/11/2002', Valeur: 6 },
    { Date: '14/11/2002', Valeur: 50 },
    { Date: '15/11/2002', Valeur: 55 },
    { Date: '16/11/2002', Valeur: 53 },
    { Date: '17/11/2002', Valeur: 20 },
    { Date: '18/11/2002', Valeur: 28 },
  ];

  const downloadPDF = () => {
    const input = chartRef.current;
    if (!input) return;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      // Choisir le nom du fichier selon ce qui est affiché
      const filename = displayMode === 'graph' ? 'graphe-prediction.pdf' : 'tableau-prediction.pdf';
      pdf.save(filename);
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full mb-8 flex flex-col">

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
        <div>
          <h2 className="text-2xl font-bold mb-2">Graphique de Prédiction</h2>
          <p className="text-gray-500">Visualisez vos résultats ici.</p>
        </div>

        {/* Choix du format */}
        <select
          className="border border-gray-300 rounded-lg p-2"
          value={displayMode}
          onChange={(e) => setDisplayMode(e.target.value)}
        >
          <option value="graph">Afficher : Graphique</option>
          <option value="table">Afficher : Tableau</option>
        </select>

        <button
          className="mt-4 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
          onClick={downloadPDF}
        >
          <Download size={20} />
          Télécharger
        </button>
      </div>

      {/* Partie affichage : Graphique ou Tableau */}
      <div ref={chartRef} className="mt-8 w-full min-h-72 bg-white p-4 rounded-lg style={{ backgroundColor: 'white' }}  ">
        {displayMode === 'graph' ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="Valeur" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Valeur</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{row.Date}</td>
                    <td className="py-2 px-4 border-b">{row.Valeur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default GrapheSection;
