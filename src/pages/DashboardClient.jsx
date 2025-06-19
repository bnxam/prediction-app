// import React, { useState, useRef, useEffect } from 'react';
// import { ProSidebarProvider } from 'react-pro-sidebar';
// import SidebarClient from '../components/SidebarClient';
// import CartesInfoClient from '../components/dashclientComponent/CartesInfoClient';
// import SalesChartClient from '../components/dashclientComponent/SalesChartClient';

// export default function DashboardClient() {
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const dropdownRef = useRef(null);


//     const salesData = [
//         { datetime: '2004-12-25 01:00:00', value: 16669.0 },
//         { datetime: '2004-12-25 02:00:00', value: 16218.0 },
//         { datetime: '2004-12-25 03:00:00', value: 16135.0 },
//         { datetime: '2004-12-25 04:00:00', value: 16107.0 },
//         { datetime: '2004-12-25 05:00:00', value: 16229.0 },
//         { datetime: '2004-12-25 06:00:00', value: 16470.0 },
//         { datetime: '2004-12-25 07:00:00', value: 16935.0 },
//         { datetime: '2004-12-25 08:00:00', value: 17548.0 },
//         { datetime: '2004-12-25 09:00:00', value: 17927.0 },
//         { datetime: '2004-12-25 10:00:00', value: 17837.0 },
//         { datetime: '2004-12-25 11:00:00', value: 17453.0 },
//         { datetime: '2004-12-25 12:00:00', value: 16891.0 },
//         { datetime: '2004-12-25 13:00:00', value: 15967.0 },
//         { datetime: '2004-12-25 14:00:00', value: 15088.0 },
//         { datetime: '2004-12-25 15:00:00', value: 14564.0 },
//         { datetime: '2004-12-25 16:00:00', value: 14394.0 },
//         { datetime: '2004-12-25 17:00:00', value: 14745.0 },
//         { datetime: '2004-12-25 18:00:00', value: 15856.0 },
//         { datetime: '2004-12-25 19:00:00', value: 16502.0 },
//         { datetime: '2004-12-25 20:00:00', value: 16678.0 },
//         { datetime: '2004-12-25 21:00:00', value: 16842.0 },
//         { datetime: '2004-12-25 22:00:00', value: 16621.0 },
//         { datetime: '2004-12-25 23:00:00', value: 16167.0 },
//         { datetime: '2004-12-26 00:00:00', value: 15676.0 },
//         { datetime: '2004-12-26 01:00:00', value: 15059.0 },
//         { datetime: '2004-12-26 02:00:00', value: 14617.0 },
//         { datetime: '2004-12-26 03:00:00', value: 14452.0 },
//         { datetime: '2004-12-26 04:00:00', value: 14465.0 },
//         { datetime: '2004-12-26 05:00:00', value: 14561.0 },
//         { datetime: '2004-12-26 06:00:00', value: 14862.0 },
//         { datetime: '2004-12-26 07:00:00', value: 15318.0 },
//         { datetime: '2004-12-26 08:00:00', value: 15865.0 },
//         { datetime: '2004-12-26 09:00:00', value: 16421.0 },
//         { datetime: '2004-12-26 10:00:00', value: 16751.0 },
//         { datetime: '2004-12-26 11:00:00', value: 16521.0 },
//         { datetime: '2004-12-26 12:00:00', value: 16047.0 },
//         { datetime: '2004-12-26 13:00:00', value: 15790.0 },
//         { datetime: '2004-12-26 14:00:00', value: 15702.0 },
//         { datetime: '2004-12-26 15:00:00', value: 15488.0 },
//         { datetime: '2004-12-26 16:00:00', value: 15607.0 },
//         { datetime: '2004-12-26 17:00:00', value: 16012.0 },
//         { datetime: '2004-12-26 18:00:00', value: 17243.0 },
//         { datetime: '2004-12-26 19:00:00', value: 17922.0 },
//         { datetime: '2004-12-26 20:00:00', value: 18064.0 },
//         { datetime: '2004-12-26 21:00:00', value: 18086.0 },
//         { datetime: '2004-12-26 22:00:00', value: 17834.0 },
//         { datetime: '2004-12-26 23:00:00', value: 17392.0 },
//         { datetime: '2004-12-27 00:00:00', value: 16842.0 },
//         { datetime: '2004-12-27 01:00:00', value: 16718.0 },
//         { datetime: '2004-12-27 02:00:00', value: 16150.0 },
//         { datetime: '2004-12-27 03:00:00', value: 16090.0 },
//         { datetime: '2004-12-27 04:00:00', value: 16223.0 },
//         { datetime: '2004-12-27 05:00:00', value: 16652.0 },
//         { datetime: '2004-12-27 06:00:00', value: 17317.0 },
//         { datetime: '2004-12-27 07:00:00', value: 18384.0 },
//         { datetime: '2004-12-27 08:00:00', value: 19366.0 },
//         { datetime: '2004-12-27 09:00:00', value: 19772.0 },
//         { datetime: '2004-12-27 10:00:00', value: 19792.0 },
//         { datetime: '2004-12-27 11:00:00', value: 19697.0 },
//         { datetime: '2004-12-27 12:00:00', value: 19193.0 },
//         { datetime: '2004-12-27 13:00:00', value: 18640.0 },
//         { datetime: '2004-12-27 14:00:00', value: 18066.0 },
//         { datetime: '2004-12-27 15:00:00', value: 17692.0 },
//         { datetime: '2004-12-27 16:00:00', value: 17522.0 },
//         { datetime: '2004-12-27 17:00:00', value: 17933.0 },
//         { datetime: '2004-12-27 18:00:00', value: 19353.0 },
//         { datetime: '2004-12-27 19:00:00', value: 20046.0 },
//         { datetime: '2004-12-27 20:00:00', value: 20127.0 },
//         { datetime: '2004-12-27 21:00:00', value: 20049.0 },
//         { datetime: '2004-12-27 22:00:00', value: 19751.0 },
//         { datetime: '2004-12-27 23:00:00', value: 19038.0 },
//         { datetime: '2004-12-28 00:00:00', value: 18133.0 },
//         { datetime: '2004-12-28 01:00:00', value: 17580.0 },
//         { datetime: '2004-12-28 02:00:00', value: 17158.0 },
//         { datetime: '2004-12-28 03:00:00', value: 17002.0 },
//         { datetime: '2004-12-28 04:00:00', value: 16923.0 },
//         { datetime: '2004-12-28 05:00:00', value: 17191.0 },
//         { datetime: '2004-12-28 06:00:00', value: 17908.0 },
//         { datetime: '2004-12-28 07:00:00', value: 18944.0 },
//         { datetime: '2004-12-28 08:00:00', value: 19752.0 },
//         { datetime: '2004-12-28 09:00:00', value: 19882.0 },
//         { datetime: '2004-12-28 10:00:00', value: 19544.0 },
//         { datetime: '2004-12-28 11:00:00', value: 19309.0 },
//         { datetime: '2004-12-28 12:00:00', value: 18756.0 },
//         { datetime: '2004-12-28 13:00:00', value: 18201.0 },
//         { datetime: '2004-12-28 14:00:00', value: 17666.0 },
//         { datetime: '2004-12-28 15:00:00', value: 17203.0 },
//         { datetime: '2004-12-28 16:00:00', value: 16935.0 },
//         { datetime: '2004-12-28 17:00:00', value: 17207.0 },
//         { datetime: '2004-12-28 18:00:00', value: 18349.0 },
//         { datetime: '2004-12-28 19:00:00', value: 18815.0 },
//         { datetime: '2004-12-28 20:00:00', value: 18599.0 },
//         { datetime: '2004-12-28 21:00:00', value: 18480.0 },
//         { datetime: '2004-12-28 22:00:00', value: 18135.0 },
//         { datetime: '2004-12-28 23:00:00', value: 17112.0 }];


//     // Gestion ouverture/fermeture dropdown
//     const toggleDropdown = () => {
//         setDropdownOpen(!dropdownOpen);
//     };

//     // Fermer dropdown si clic hors
//     useEffect(() => {
//         function handleClickOutside(event) {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setDropdownOpen(false);
//             }
//         }

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => {
//             document.removeEventListener("mousedown", handleClickOutside);
//         };
//     }, [dropdownRef]);

//     // Fonction de téléchargement
//     const handleDownload = (format) => {
//         if (format === 'csv') {
//             const csvContent = "data:text/csv;charset=utf-8,"
//                 + ['datetime,value', ...salesData.map(d => `${d.datetime},${d.value}`)].join('\n');

//             const encodedUri = encodeURI(csvContent);
//             const link = document.createElement("a");
//             link.setAttribute("href", encodedUri);
//             link.setAttribute("download", "sales_data.csv");
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//         }

//         else if (format === 'png' || format === 'pdf') {
//             const chartElement = document.querySelector("#chart-to-download");
//             if (!chartElement) return;

//             import('html2canvas').then(({ default: html2canvas }) => {
//                 html2canvas(chartElement).then(canvas => {
//                     if (format === 'png') {
//                         const link = document.createElement("a");
//                         link.href = canvas.toDataURL("image/png");
//                         link.download = "chart.png";
//                         link.click();
//                     } else if (format === 'pdf') {
//                         import('jspdf').then(({ jsPDF }) => {
//                             const pdf = new jsPDF();
//                             const imgData = canvas.toDataURL("image/png");
//                             pdf.addImage(imgData, 'PNG', 10, 10, 190, 100); // Ajuster dimensions selon besoin
//                             pdf.save("chart.pdf");
//                         });
//                     }
//                 });
//             });
//         }

//         setDropdownOpen(false);
//     };
//     return (
//         <div className="flex h-screen bg-gray-100">
//             <ProSidebarProvider>
//                 <SidebarClient />
//             </ProSidebarProvider>

//             <div className="flex-1 p-8 overflow-auto">
//                 {/* Cartes de statistiques */}
//                 <CartesInfoClient data={salesData} />



//                 {/* Graphique  */}

//                 <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all hover:shadow-2xl">
//                     <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white flex items-center">
//                         <h3 className="text-lg font-semibold text-gray-800">
//                             Mes données
//                         </h3>
//                         <div className="relative" ref={dropdownRef}>
//                             <button
//                                 onClick={toggleDropdown}
//                                 className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-200"
//                             // className="px-4 py-2 bg-[#7C4585] text-white rounded-lg hover:bg-indigo-500 transition duration-200"
//                             >
//                                 Télécharger
//                             </button>

//                             <div
//                                 className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg transform transition-all duration-200 origin-top ${dropdownOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
//                                     } z-20`}
//                             >
//                                 <button
//                                     onClick={() => handleDownload('csv')}
//                                     className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-lg"
//                                 >
//                                     Télécharger CSV
//                                 </button>
//                                 <button
//                                     onClick={() => handleDownload('png')}
//                                     className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                                 >
//                                     Télécharger PNG
//                                 </button>
//                                 <button
//                                     onClick={() => handleDownload('pdf')}
//                                     className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg"
//                                 >
//                                     Télécharger PDF
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="p-5">
//                         <SalesChartClient data={salesData} />
//                     </div>
//                 </div>


//             </div>
//         </div>
//     );
// }
import React, { useState, useRef, useEffect } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import SidebarClient from '../components/SidebarClient';
import CartesInfoClient from '../components/dashclientComponent/CartesInfoClient';
import SalesChartClient from '../components/dashclientComponent/SalesChartClient';
import axios from 'axios';

export default function DashboardClient() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Génération des données (fictives ici)
    // function generateDummyData() {
    //     const data = [
    //         { month: '2025-01', value: 100 },
    //         { month: '2025-02', value: 200 },
    //         { month: '2025-03', value: 180 },
    //         { month: '2025-04', value: 220 },
    //     ];

    //     const predictions = [
    //         { month: '2025-05', value: 240 },
    //         { month: '2025-06', value: 260 },
    //     ];

    //     return { data, predictions };
    // }

    // const { data, predictions } = generateDummyData();
    const [data, setData] = useState([]);
    const [predictions, setPredictions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); // ou sessionStorage selon ton app
                const response = await axios.get('http://localhost:8000/users/me/data', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setData(response.data.data || []);
                setPredictions(response.data.predictions || []);
            } catch (error) {
                console.error('Erreur lors du chargement des données du client:', error);
            }
        };

        fetchData();
    }, []);


    // Fusion des données pour le graphique et les téléchargements
    // const allData = [
    //     ...data.map(d => ({ month: d.month, realValue: d.value, predictedValue: null })),
    //     ...predictions.map(p => ({ month: p.month, realValue: null, predictedValue: p.value })),
    // ];
    const allData = [
    ...data.map(d => ({ month: d.date || d.month, realValue: d.valeur || d.value, predictedValue: null })),
    ...predictions.map(p => ({ month: p.date || p.month, realValue: null, predictedValue: p.valeur || p.value })),
];


    // Gestion ouverture / fermeture dropdown
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Fermer dropdown si clic hors
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Fonction de téléchargement
    const handleDownload = (format) => {
        if (format === 'csv') {
            const csvRows = [
                ['month', 'realValue', 'predictedValue'],
                ...allData.map(d =>
                    `${d.month},${d.realValue !== null ? d.realValue : ''},${d.predictedValue !== null ? d.predictedValue : ''}`
                ),
            ];
            const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "sales_data.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        else if (format === 'png' || format === 'pdf') {
            const chartElement = document.querySelector("#chart-to-download");
            if (!chartElement) return;

            import('html2canvas').then(({ default: html2canvas }) => {
                html2canvas(chartElement).then(canvas => {
                    if (format === 'png') {
                        const link = document.createElement("a");
                        link.href = canvas.toDataURL("image/png");
                        link.download = "chart.png";
                        link.click();
                    } else if (format === 'pdf') {
                        import('jspdf').then(({ jsPDF }) => {
                            const pdf = new jsPDF();
                            const imgData = canvas.toDataURL("image/png");
                            pdf.addImage(imgData, 'PNG', 10, 10, 190, 100); // Ajuste selon dimensions
                            pdf.save("chart.pdf");
                        });
                    }
                });
            });
        }

        setDropdownOpen(false);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <ProSidebarProvider>
                <SidebarClient />
            </ProSidebarProvider>

            <div className="flex-1 p-8 overflow-auto">
                {/* Cartes de statistiques */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all hover:shadow-2xl">
                    <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white flex items-center">

                        <h3 className="text-lg font-semibold text-gray-800">
                            Les Statistiques Clés de mes consommations
                        </h3>
                    </div>
                    <div className="p-5">
                        <CartesInfoClient data={allData} />
                    </div>
                </div>

                {/* Graphique + bouton de téléchargement */}
                <div className="mt-5 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all hover:shadow-2xl">
                    <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Mes données et leurs predictions
                        </h3>
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={toggleDropdown}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-200"
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

                    <div className="p-5" id="chart-to-download">
                        <SalesChartClient data={allData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
