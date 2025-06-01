import React, { useEffect, useState, useRef } from 'react';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Graphique from './graphique';
import Tableau from './tableau';
import ModalSarima from './modalSarima';
import ModalArima from './modalArima';
import ModalLSTM from './modalLSTM';
import MethodSummary from './methodSummary';
import GeneralGraphesection from './genralGrapheSection';
import Comparaison from './comparaison';

const GrapheSection = () => {
  const [predictionDone, setPredictionDone] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleModelChange = (e) => {
    const model = e.target.value;
    setSelectedModel(model);
    if (model) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  const [metaInfo, setMetaInfo] = useState({
    dateDebut: null,
    dateFin: null,
    methode: "",
    mape: "",
    params: {},
    criteresInfo: {}
  });
  const [data, setData] = useState([]);
  const [dataCom, setDataCom] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8000/last_prediction');
        const json = await res.json();

        if (json.dates && json.valeurs) {
          // Créer un tableau combiné pour les prédictions
          const predictions = json.dates.map((date, index) => ({
            Date: date,
            Valeur: json.valeurs[index],
            Type: 'prediction' // Pour distinguer les prédictions
          }));

          // Créer un tableau combiné pour les données historiques si elles existent
          const historique = json.donnees_historiques ?
            json.donnees_historiques.dates.map((dateH, index) => ({
              Date: dateH,
              Valeur: json.donnees_historiques.valeurs[index],
              Type: 'historique' // Pour distinguer les données historiques
            })) : [];

          // Combiner les deux tableaux (historique + prédictions)
          const combined = [...historique, ...predictions];


          setDataCom(combined);
          setData(predictions);

          setMetaInfo({
            methode: json.methode,
            dateDebut: json.dates[0],
            debut: json.dates_predit?.debut,
            fin: json.dates_predit?.fin,
            mape: json.taux_erreur_mape ?? json.performance?.taux_erreur_mape ?? null,
            params: json.meilleurs_parametres ?? json.architecture ?? null,
            criteresInfo: json.criteres_information ?? {
              ...(json.performance && {
                loss: json.performance.loss,
                val_loss: json.performance.val_loss
              })
            }
          });
          setPredictionDone(true);

        } else {
          console.warn("Aucune donnée de prédiction trouvée.");
        }
      } catch (err) {
        console.error("Erreur lors du fetch :", err);
      }
    };

    if (predictionDone) {
      fetchData();
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



  const minValue = Math.min(...data.map(item => item.value));
  // Optionnel: Ajouter une marge en dessous de la valeur minimale
  const minDomain = minValue > 0 ? minValue * 0.5 : minValue * 1.1;


  return (
    <>
      {predictionDone && <><MethodSummary metaInfo={metaInfo} />

        <div className="bg-white p-6 rounded-l shadow-md w-full mb-8  mt-8 flex flex-col">

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-blue-950">Graphique de Prédiction</h2>
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
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex-1 mt-8 w-full min-h-72 bg-white p-4 rounded-lg style={{ backgroundColor: 'white' }}  ">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
              <div>
                <h2 className="text-l mb-2 text-blue-950">Graphique Comparatif </h2>
                {/* <p className="text-gray-500">Visualisez vos résultats ici.</p> */}
              </div>
            </div>
            <Comparaison data={dataCom} minDomain={minDomain} chartRef={chartRef} />
          </div>
          <div className="flex-1 mt-8 w-full min-h-72 bg-white p-4 rounded-lg style={{ backgroundColor: 'white' }}  ">
            <div>
              <h2 className="text-l mb-2 text-blue-950">Graphique Générale </h2>
              {/* <p className="text-gray-500">Visualisez vos résultats ici.</p> */}
            </div>
            <GeneralGraphesection data={dataCom} minDomain={minDomain} chartRef={chartRef} />
          </div>
        </div>
      </>

      }
      <div className="flex flex-col md:flex-row gap-4 mb-6 mt-5">
        {/* Format d'affichage */}
        {predictionDone &&
          <div className="bg-white p-4 rounded-l flex-1 flex flex-col shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
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
        }
        {/* Méthode de prédiction */}
        <div className="bg-white p-4 rounded-l shadow-md flex-1 flex flex-col border border-gray-100 hover:shadow-lg transition-shadow">
          <h5 className="text-md font-semibold text-gray-700 mb-2">Créer une prédiction</h5>
          <select
            className="w-full border border-gray-200 focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none p-2 rounded-md text-gray-700"
            onChange={handleModelChange}
          >
            <option value="">-- Choisir un modèle --</option>
            <option value="lstm">LSTM</option>
            <option value="sarima">SARIMA</option>
            <option value="arima">ARIMA</option>
          </select>

          {showModal && selectedModel === "lstm" && (
            <ModalLSTM onClose={() => setShowModal(false)}
              onPredictionDone={() => setPredictionDone(true)} />
          )}

          {showModal && selectedModel === "sarima" && (
            <ModalSarima onClose={() => setShowModal(false)}
              onPredictionDone={() => setPredictionDone(true)} />
          )}
          {showModal && selectedModel === "arima" && (
            <ModalArima onClose={() => setShowModal(false)}
              onPredictionDone={() => setPredictionDone(true)} />
          )}
        </div>

        {/* Format de Téléchargement */}
        {predictionDone &&
          <div className="bg-white p-4 rounded-l flex-1 flex flex-col shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
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

        }
      </div>
    </>

  );
};


export default GrapheSection;