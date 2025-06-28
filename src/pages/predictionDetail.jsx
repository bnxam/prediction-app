import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import ModalSarima from '../components/predComponent/modalSarima';
import ModalArima from '../components/predComponent/modalArima';
import ModalLSTM from '../components/predComponent/modalLSTM';
import Graphique from '../components/predComponent/graphique';
import Tableau from '../components/predComponent/tableau';
import MethodSummary from '../components/predComponent/methodSummary';
import CustomSidebar from '../components/CustomSidebar';
import { ProSidebarProvider } from 'react-pro-sidebar';

export default function PredictionDetail() {
    const { predictionId } = useParams();
    const chartRef = useRef(null);

    const [predictionDone, setPredictionDone] = useState(false);
    const [data, setData] = useState([]);
    const [dataCom, setDataCom] = useState([]);
    const [metaInfo, setMetaInfo] = useState({});
    const [minDomain, setMinDomain] = useState(0);
    const [displayMode, setDisplayMode] = useState('graph');
    const [downloadFormat, setDownloadFormat] = useState('pdf');
    const [selectedModel, setSelectedModel] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:8000/historique/${predictionId}`);
                const json = await res.json();

                const historical = json.historique.map((item) => ({
                    date: item.date,
                    valeur: item.valeur,
                    type: 'historical',
                }));

                const predictions = json.predit.map((item) => ({
                    date: item.date,
                    valeur: item.valeur,
                    type: 'prediction',
                }));

                const allValues = [...historical, ...predictions].map((item) => item.valeur);
                const minVal = Math.min(...allValues);
                const calculatedMinDomain = minVal > 0 ? minVal * 0.9 : 0;

                setData(historical);
                setDataCom(predictions);
                setMinDomain(calculatedMinDomain);

                setMetaInfo({
                    methode: json.type,
                    dateDebut: json.periode_predite?.debut,
                    dateFin: json.periode_predite?.fin,
                    mape: json.mape,
                    params: json.parametres,
                });

                setPredictionDone(true);
            } catch (error) {
                console.error("Erreur fetch prédiction par ID :", error);
            }
        };

        fetchData();
    }, [predictionId]);

    const downloadPDF = async () => {
        const input = chartRef.current;
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('landscape');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('prediction.pdf');
    };

    const downloadCSV = () => {
        let csvContent = "Date,Valeur\n";
        [...data, ...dataCom].forEach(row => {
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

    const handleDownload = () => {
        if (downloadFormat === 'pdf') downloadPDF();
        else if (downloadFormat === 'csv') downloadCSV();
        else if (downloadFormat === 'png') downloadPNG();
    };

    return (
        <>
            <div className="flex h-screen">
                {/* Sidebar fixe à gauche */}
                <ProSidebarProvider>
                    <CustomSidebar />
                </ProSidebarProvider>

                {/* Contenu principal prend le reste */}
                <div className="flex-1 p-8 pt-[120px] overflow-auto bg-neutral-100">
                    {predictionDone && <>
                        <MethodSummary metaInfo={metaInfo} />

                        <div className="bg-white p-6 rounded-l shadow-md w-full mb-8 mt-8">
                            <h2 className="text-2xl font-bold mb-4 text-blue-950">Graphique de Prédiction (ID : {predictionId})</h2>
                            <div ref={chartRef}>
                                {displayMode === 'graph' ? (
                                    <Graphique data={data} predictions={dataCom} minDomain={minDomain} chartRef={chartRef} />
                                ) : (
                                    <Tableau data={[...data, ...dataCom]} />
                                )}
                            </div>
                        </div>

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
                                    value={selectedModel}
                                    onChange={(e) => setSelectedModel(e.target.value)}
                                >
                                    <option value="">-- Choisir un modèle --</option>
                                    <option value="lstm">LSTM</option>
                                    <option value="sarima">SARIMA</option>
                                    <option value="arima">ARIMA</option>
                                </select>

                                <button
                                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                                    disabled={!selectedModel}
                                    onClick={() => setShowModal(true)}
                                >
                                    Lancer la prédiction
                                </button>
                                {showModal && selectedModel === "lstm" && <ModalLSTM onClose={() => setShowModal(false)} onPredictionDone={() => setPredictionDone(true)} />}
                                {showModal && selectedModel === "sarima" && <ModalSarima onClose={() => setShowModal(false)} onPredictionDone={() => setPredictionDone(true)} />}
                                {showModal && selectedModel === "arima" && <ModalArima onClose={() => setShowModal(false)} onPredictionDone={() => setPredictionDone(true)} />}

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
                    </>}
                </div>
            </div>
        </>
    );
}
