// import React, { useState } from 'react';

// const GrapheAction = () => {
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [showPaymentForm, setShowPaymentForm] = useState(false);

//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4 justify-end mb-8 relative">

//       <div className="flex flex-wrap gap-4 justify-end">
//         {/* Bouton pour ouvrir le modal de confirmation */}
//         <button 
//           onClick={() => setIsConfirmModalOpen(true)}
//           className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg"
//         >
//           Choisir un modèle
//         </button>

//         {/* Bouton pour afficher le formulaire de paiement */}
//         <button 
//           onClick={() => setShowPaymentForm(!showPaymentForm)}
//           className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
//         >
//           Acheter le graphe
//         </button>
//       </div>

//       {/* Modal de confirmation */}
//       {isConfirmModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-2xl shadow-lg w-96 text-center">
//             <h2 className="text-xl font-bold mb-4">Confirmation</h2>
//             <p className="text-gray-600 mb-6">Voulez-vous vraiment choisir un nouveau modèle ?</p>

//             <div className="flex justify-center gap-4">
//               <button 
//                 onClick={() => setIsConfirmModalOpen(false)}
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg"
//               >
//                 Annuler
//               </button>
//               <button 
//                 onClick={() => {
//                   setIsConfirmModalOpen(false);
//                   console.log('Modèle choisi confirmé !');
//                 }}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg"
//               >
//                 Confirmer
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Formulaire de paiement (affiché sous les boutons) */}
//       {showPaymentForm && (
//         <div className="mt-6 p-6 border rounded-2xl shadow-inner bg-gray-50 w-full max-w-md mx-auto">
//           <h2 className="text-xl font-bold mb-6 text-center">Paiement</h2>

//           <form className="flex flex-col gap-4">
//             <input
//               type="text"
//               placeholder="Nom complet"
//               className="border border-gray-300 rounded-lg p-2"
//             />
//             <input
//               type="text"
//               placeholder="Numéro de carte"
//               className="border border-gray-300 rounded-lg p-2"
//             />
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 placeholder="MM/AA"
//                 className="border border-gray-300 rounded-lg p-2 w-1/2"
//               />
//               <input
//                 type="text"
//                 placeholder="CVC"
//                 className="border border-gray-300 rounded-lg p-2 w-1/2"
//               />
//             </div>

//             <div className="flex justify-center gap-4 mt-4">
//               <button
//                 type="button"
//                 onClick={() => setShowPaymentForm(false)}
//                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg"
//               >
//                 Annuler
//               </button>
//               <button
//                 type="submit"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setShowPaymentForm(false);
//                   console.log('Paiement effectué !');
//                 }}
//                 className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
//               >
//                 Payer
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//     </div>
//   );
// };

// export default GrapheAction;

















import React, { useRef, useState } from 'react';
import { Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DataUpload from '../dataUpload';
 
const GrapheAction = () => {
  const chartRef = useRef(); // Référence graphe ou tableau
  const [displayMode, setDisplayMode] = useState('graph'); // 'graph' ou 'table'
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showInsertForm, setShowInsertForm] = useState(false);

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

  // const downloadPDF = () => {
  //   const input = chartRef.current;
  //   if (!input) return;
  //   html2canvas(input, { scale: 2 }).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF({
  //       orientation: 'landscape',
  //       unit: 'px',
  //       format: [canvas.width, canvas.height],
  //     });
  //     pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  //     // Choisir le nom du fichier selon ce qui est affiché
  //     const filename = displayMode === 'graph' ? 'graphe-prediction.pdf' : 'tableau-prediction.pdf';
  //     pdf.save(filename);
  //   });
  // };


  // État pour stocker le format sélectionné
  const [downloadFormat, setDownloadFormat] = useState('pdf');

  // Fonction pour gérer le téléchargement
  const handleDownload = () => {
    switch(downloadFormat) {
      case 'pdf':
        // Logique pour générer/télécharger PDF
        console.log('Génération PDF...');
        downloadPDF();
        break;
      case 'csv':
        // Logique pour générer/télécharger CSV
        console.log('Génération CSV...');
        downloadCSV();
        break;
      case 'png':
        // Logique pour générer/télécharger PNG
        console.log('Génération PNG...');
        downloadPNG();
        break;
      default:
        console.log('Format non supporté');
    }
  };
  return (
    <>

      {/* /////////////////// Pred bar Section */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 mt-5">
        {/* Format d'affichage */}
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <h5 className="text-md font-semibold text-gray-700 mb-2">Format d'affichage</h5>
          <select
            className="w-full border border-gray-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none p-2 rounded-md text-gray-700"
            value={displayMode}
            onChange={(e) => setDisplayMode(e.target.value)}
          >
            <option value="graph">Graphique</option>
            <option value="table">Tableau</option>
          </select>
        </div>

        {/* Méthode de prédiction */}
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <h5 className="text-md font-semibold text-gray-700 mb-2">Crrée une prédiction</h5>
          <select
            className="w-full border border-gray-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none p-2 rounded-md text-gray-700"
          >
            <option value="graph">LSTM</option>
            <option value="table">SARIMA</option>
          </select>
        </div>

        {/* Format de Téléchargement */}
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <h5 className="text-md font-semibold text-gray-700 mb-2">Format de téléchargement</h5>
          <select
            className="w-full border border-gray-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none p-2 rounded-md text-gray-700"
            value={downloadFormat}
            onChange={(e) => setDownloadFormat(e.target.value)}
          >
            <option value="pdf">PDF</option>
            <option value="csv">CSV</option>
            <option value="png">PNG</option>
          </select>

          {/* Bouton de téléchargement */}
          <button
            onClick={handleDownload}
            className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Télécharger
          </button>
        </div>

        {/* Bouton prédiction */}
        {/* <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <button
            onClick={() => setShowPaymentForm(!showPaymentForm)}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 shadow hover:shadow-md"
          >
            Nouvelle prédiction
          </button>
        </div> */}
      </div>

      {/* Formulaire de paiement */}
      {showPaymentForm && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50 ">
          <div className="p-6 border rounded-2xl shadow-lg w-full max-w-md bg-white relative ">
            <button
              onClick={() => setShowPaymentForm(false)}
              className="absolute top-3 right-3 text-black hover:text-black"

            >
              ✖
            </button>

            <h2 className="text-xl font-bold mb-6 text-center">Paiement</h2>

            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nom complet"
                className="border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Numéro de carte"
                className="border border-gray-300 rounded-lg p-2"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="MM/AA"
                  className="border border-gray-300 rounded-lg p-2 w-1/2"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="border border-gray-300 rounded-lg p-2 w-1/2"
                />
              </div>

              <div className="flex justify-center gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowPaymentForm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPaymentForm(false);
                    console.log('Paiement effectué !');
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
                >
                  Payer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Formulaire d'insertion affiché conditionnellement */}
      {showInsertForm && (
        <div className="mt-4">
          <DataUpload />
        </div>
      )}



      <div className="bg-white p-6 rounded-2xl shadow-md w-full mb-8  mt-8 flex flex-col">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
          <div>
            {/* <h2 className="text-2xl font-bold mb-2 text-blue-950">Graphique de Prédiction</h2> */}
            <p className="text-gray-500">Visualisez vos résultats ici.</p>
          </div>


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

        {/* <div className="flex flex-wrap gap-4 justify-end pt-5"> */}
        {/* Bouton pour ouvrir le modal de confirmation */}
        {/* <button
            onClick={() => setIsConfirmModalOpen(true)}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
          >
            Choisir ce modèle
          </button> */}

        {/* Bouton pour afficher le formulaire de paiement */}
        {/* <button
            onClick={() => setShowPaymentForm(!showPaymentForm)}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
          >
            Acheter ce modèle
          </button>
        </div> */}

        {/* Modal de confirmation */}
        {isConfirmModalOpen && (
          <div className="fixed inset-0 backdrop-blur-sm  bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-96 text-center">
              <h2 className="text-xl font-bold mb-4">Confirmation</h2>
              <p className="text-gray-600 mb-6">Voulez-vous vraiment choisir ce modèle comme votre nouveau modèle de prediction ?</p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setIsConfirmModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  onClick={() => {
                    setIsConfirmModalOpen(false);
                    console.log('Modèle choisi confirmé !');
                  }}
                  className="bg-amber-300 hover:bg-amber-200 text-black py-2 px-4 rounded-lg"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Formulaire de paiement (affiché sous les boutons) */}
        {showPaymentForm && (


          <div
            className="mt-6 p-6 border rounded-2xl shadow-inner  w-full max-w-md mx-auto bg-gray-50">
            <h2 className="text-xl font-bold mb-6 text-center">Paiement</h2>

            <form className="flex flex-col gap-4 ">
              <input
                type="text"
                placeholder="Nom complet"
                className="border border-gray-300 rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Numéro de carte"
                className="border border-gray-300 rounded-lg p-2"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="MM/AA"
                  className="border border-gray-300 rounded-lg p-2 w-1/2"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="border border-gray-300 rounded-lg p-2 w-1/2"
                />
              </div>

              <div className="flex justify-center gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowPaymentForm(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPaymentForm(false);
                    console.log('Paiement effectué !');
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
                >
                  Payer
                </button>
              </div>
            </form>
          </div>
        )}

      </div>



    </>
  );
};

export default GrapheAction;

