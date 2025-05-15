import React, { useEffect, useState, useRef} from 'react';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Graphique from './graphique';
import Tableau from './tableau';
import ModalSarima from './modalSarima';

const GrapheSection = () => {
  const [predictionDone, setPredictionDone] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [showModal, setShowModal] = useState(false);
  

  const handleModelChange = (e) => {
    const value = e.target.value;
    setSelectedModel(value);
    if (value === 'sarima') {
      setShowModal(true);
    }
  };
  const [data, setData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:8000/last_prediction');
      const json = await res.json();

      if (json.dates && json.valeurs) {
        const combined = json.dates.map((date, index) => ({
          Date: date,
          Valeur: json.valeurs[index],
        }));

        setData(combined);
      } else {
        console.warn("Aucune donnée de prédiction trouvée.");
      }
    } catch (err) {
      console.error("Erreur lors du fetch :", err);
    }
  };

  if (predictionDone) {
    fetchData();
    setPredictionDone(false); // pour éviter de boucler
  }
}, [predictionDone]);

  const [displayMode, setDisplayMode] = useState('graph');
  const [downloadFormat, setDownloadFormat] = useState('pdf');

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
    canvas.toBlob((blob) => {
      saveAs(blob, 'graphique.png');
    });
  };

  const handleDownload = () => {
    switch (downloadFormat) {
      case 'pdf':
        downloadPDF();
        break;
      case 'csv':
        downloadCSV();
        break;
      case 'png':
        downloadPNG();
        break;
      default:
        console.log('Format non supporté');
    }
  };



  // const data = [
  //   { datetime: '2004-12-25 01:00:00', value: 16669.0 },
  //   { datetime: '2004-12-25 02:00:00', value: 16218.0 },
  //   { datetime: '2004-12-25 03:00:00', value: 16135.0 },
  //   { datetime: '2004-12-25 04:00:00', value: 16107.0 },
  //   { datetime: '2004-12-25 05:00:00', value: 16229.0 },
  //   { datetime: '2004-12-25 06:00:00', value: 16470.0 },
  //   { datetime: '2004-12-25 07:00:00', value: 16935.0 },
  //   { datetime: '2004-12-25 08:00:00', value: 17548.0 },
  //   { datetime: '2004-12-25 09:00:00', value: 17927.0 },
  //   { datetime: '2004-12-25 10:00:00', value: 17837.0 },
  //   { datetime: '2004-12-25 11:00:00', value: 17453.0 },
  //   { datetime: '2004-12-25 12:00:00', value: 16891.0 },
  //   { datetime: '2004-12-25 13:00:00', value: 15967.0 },
  //   { datetime: '2004-12-25 14:00:00', value: 15088.0 },
  //   { datetime: '2004-12-25 15:00:00', value: 14564.0 },
  //   { datetime: '2004-12-25 16:00:00', value: 14394.0 },
  //   { datetime: '2004-12-25 17:00:00', value: 14745.0 },
  //   { datetime: '2004-12-25 18:00:00', value: 15856.0 },
  //   { datetime: '2004-12-25 19:00:00', value: 16502.0 },
  //   { datetime: '2004-12-25 20:00:00', value: 16678.0 },
  //   { datetime: '2004-12-25 21:00:00', value: 16842.0 },
  //   { datetime: '2004-12-25 22:00:00', value: 16621.0 },
  //   { datetime: '2004-12-25 23:00:00', value: 16167.0 },
  //   { datetime: '2004-12-26 00:00:00', value: 15676.0 },
  //   { datetime: '2004-12-26 01:00:00', value: 15059.0 },
  //   { datetime: '2004-12-26 02:00:00', value: 14617.0 },
  //   { datetime: '2004-12-26 03:00:00', value: 14452.0 },
  //   { datetime: '2004-12-26 04:00:00', value: 14465.0 },
  //   { datetime: '2004-12-26 05:00:00', value: 14561.0 },
  //   { datetime: '2004-12-26 06:00:00', value: 14862.0 },
  //   { datetime: '2004-12-26 07:00:00', value: 15318.0 },
  //   { datetime: '2004-12-26 08:00:00', value: 15865.0 },
  //   { datetime: '2004-12-26 09:00:00', value: 16421.0 },
  //   { datetime: '2004-12-26 10:00:00', value: 16751.0 },
  //   { datetime: '2004-12-26 11:00:00', value: 16521.0 },
  //   { datetime: '2004-12-26 12:00:00', value: 16047.0 },
  //   { datetime: '2004-12-26 13:00:00', value: 15790.0 },
  //   { datetime: '2004-12-26 14:00:00', value: 15702.0 },
  //   { datetime: '2004-12-26 15:00:00', value: 15488.0 },
  //   { datetime: '2004-12-26 16:00:00', value: 15607.0 },
  //   { datetime: '2004-12-26 17:00:00', value: 16012.0 },
  //   { datetime: '2004-12-26 18:00:00', value: 17243.0 },
  //   { datetime: '2004-12-26 19:00:00', value: 17922.0 },
  //   { datetime: '2004-12-26 20:00:00', value: 18064.0 },
  //   { datetime: '2004-12-26 21:00:00', value: 18086.0 },
  //   { datetime: '2004-12-26 22:00:00', value: 17834.0 },
  //   { datetime: '2004-12-26 23:00:00', value: 17392.0 },
  //   { datetime: '2004-12-27 00:00:00', value: 16842.0 },
  //   { datetime: '2004-12-27 01:00:00', value: 16718.0 },
  //   { datetime: '2004-12-27 02:00:00', value: 16150.0 },
  //   { datetime: '2004-12-27 03:00:00', value: 16090.0 },
  //   { datetime: '2004-12-27 04:00:00', value: 16223.0 },
  //   { datetime: '2004-12-27 05:00:00', value: 16652.0 },
  //   { datetime: '2004-12-27 06:00:00', value: 17317.0 },
  //   { datetime: '2004-12-27 07:00:00', value: 18384.0 },
  //   { datetime: '2004-12-27 08:00:00', value: 19366.0 },
  //   { datetime: '2004-12-27 09:00:00', value: 19772.0 },
  //   { datetime: '2004-12-27 10:00:00', value: 19792.0 },
  //   { datetime: '2004-12-27 11:00:00', value: 19697.0 },
  //   { datetime: '2004-12-27 12:00:00', value: 19193.0 },
  //   { datetime: '2004-12-27 13:00:00', value: 18640.0 },
  //   { datetime: '2004-12-27 14:00:00', value: 18066.0 },
  //   { datetime: '2004-12-27 15:00:00', value: 17692.0 },
  //   { datetime: '2004-12-27 16:00:00', value: 17522.0 },
  //   { datetime: '2004-12-27 17:00:00', value: 17933.0 },
  //   { datetime: '2004-12-27 18:00:00', value: 19353.0 },
  //   { datetime: '2004-12-27 19:00:00', value: 20046.0 },
  //   { datetime: '2004-12-27 20:00:00', value: 20127.0 },
  //   { datetime: '2004-12-27 21:00:00', value: 20049.0 },
  //   { datetime: '2004-12-27 22:00:00', value: 19751.0 },
  //   { datetime: '2004-12-27 23:00:00', value: 19038.0 },
  //   { datetime: '2004-12-28 00:00:00', value: 18133.0 },
  //   { datetime: '2004-12-28 01:00:00', value: 17580.0 },
  //   { datetime: '2004-12-28 02:00:00', value: 17158.0 },
  //   { datetime: '2004-12-28 03:00:00', value: 17002.0 },
  //   { datetime: '2004-12-28 04:00:00', value: 16923.0 },
  //   { datetime: '2004-12-28 05:00:00', value: 17191.0 },
  //   { datetime: '2004-12-28 06:00:00', value: 17908.0 },
  //   { datetime: '2004-12-28 07:00:00', value: 18944.0 },
  //   { datetime: '2004-12-28 08:00:00', value: 19752.0 },
  //   { datetime: '2004-12-28 09:00:00', value: 19882.0 },
  //   { datetime: '2004-12-28 10:00:00', value: 19544.0 },
  //   { datetime: '2004-12-28 11:00:00', value: 19309.0 },
  //   { datetime: '2004-12-28 12:00:00', value: 18756.0 },
  //   { datetime: '2004-12-28 13:00:00', value: 18201.0 },
  //   { datetime: '2004-12-28 14:00:00', value: 17666.0 },
  //   { datetime: '2004-12-28 15:00:00', value: 17203.0 },
  //   { datetime: '2004-12-28 16:00:00', value: 16935.0 },
  //   { datetime: '2004-12-28 17:00:00', value: 17207.0 },
  //   { datetime: '2004-12-28 18:00:00', value: 18349.0 },
  //   { datetime: '2004-12-28 19:00:00', value: 18815.0 },
  //   { datetime: '2004-12-28 20:00:00', value: 18599.0 },
  //   { datetime: '2004-12-28 21:00:00', value: 18480.0 },
  //   { datetime: '2004-12-28 22:00:00', value: 18135.0 },
  //   { datetime: '2004-12-28 23:00:00', value: 17112.0 }
  // ];
  const minValue = Math.min(...data.map(item => item.value));
  // Optionnel: Ajouter une marge en dessous de la valeur minimale
  const minDomain = minValue > 0 ? minValue * 0.9 : minValue * 1.1;


  return (
    <>


      <div className="bg-white p-6 rounded-l shadow-md w-full mb-8  mt-8 flex flex-col">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
          <div>
            {/* <h2 className="text-2xl font-bold mb-2 text-blue-950">Graphique de Prédiction</h2> */}
            {/* <p className="text-gray-500">Visualisez vos résultats ici.</p> */}
          </div>
        </div>

        {/* Partie affichage : Graphique ou Tableau */}
        <div ref={chartRef} className="mt-8 w-full min-h-72 bg-white p-4 rounded-lg style={{ backgroundColor: 'white' }}  ">
          {displayMode === 'graph' ? (

            <Graphique data={data} minDomain={minDomain} chartRef={chartRef} />
          ) : (

            <Tableau data={data} />


          )}
        </div>




      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 mt-5">
        {/* Format d'affichage */}
        <div className="bg-white p-4 rounded-l shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
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
        <div className="bg-white p-4 rounded-l shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <h5 className="text-md font-semibold text-gray-700 mb-2">Créer une prédiction</h5>
          <select
            className="w-full border border-gray-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none p-2 rounded-md text-gray-700"
            onChange={handleModelChange}
          >
            <option value="">-- Choisir un modèle --</option>
            <option value="lstm">LSTM</option>
            <option value="sarima">SARIMA</option>
          </select>

          {showModal && (
            <ModalSarima onClose={() => setShowModal(false)}
               onPredictionDone={() => setPredictionDone(true)} />
          )}
        </div>

        {/* Format de Téléchargement */}
        <div className="bg-white p-4 rounded-l shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <h5 className="text-md font-semibold text-gray-700 mb-2">Format de téléchargement</h5>
          <select
            className="w-full border border-gray-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none p-2 rounded-md text-gray-700 transition-colors"
            value={downloadFormat}
            onChange={(e) => setDownloadFormat(e.target.value)}
            aria-label="Select download format"
          >
            <option value="pdf">PDF (Graphique)</option>
            <option value="csv">CSV (Données brutes)</option>
            <option value="png">PNG (Image)</option>
          </select>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={!chartRef.current} // Disable if no chart data
            className={`mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2 ${!chartRef.current ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            aria-label="Download button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Télécharger
          </button>
        </div>


        {/* partie du graphe */}



      </div>
    </>

  );
};


export default GrapheSection;