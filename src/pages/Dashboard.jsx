// import React, { useState, useEffect } from 'react';
// import { ProSidebarProvider } from 'react-pro-sidebar';
// import CustomSidebar from '../components/CustomSidebar';
// import Cartesinfo from '../components/dashComponent/Cartesinfo';
// import SalesChart from '../components/dashComponent/SalesChart';
// import VolumeServiceChart from '../components/dashComponent/VolumeServiceChart';
// import TableauJournee from '../components/dashComponent/tableaujournee';
// import axios from 'axios';

// // import RevenueChart from '../components/RevenueChart';
// export default function Dashboard() {

//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get("http://localhost:8000/dash");
//                 console.log("la somme des données ", response);
//                 const formatted = response.data.map(item => ({
//                     date: item.date,
//                     valeur: item.valeur,
//                 }));

//                 setData(formatted);
//             } catch (error) {
//                 console.error("Erreur lors de la récupération des données :", error);
//             }
//         };

//         fetchData();
//     }, []);  
//     const handleFileUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 const content = e.target.result;
//                 // Ici vous pouvez traiter le contenu CSV
//                 console.log(content);
//                 alert(`Fichier ${file.name} importé avec succès!`);
//             };
//             reader.readAsText(file);
//         }
//     };
//     const valeurs = data.map(item => item.valeur);

//     // Calculer la valeur minimale
//     const valeurMin = valeurs.length ? Math.min(...valeurs) : 0;

//     // Calculer la valeur maximale
//     const valeurMax = valeurs.length ? Math.max(...valeurs) : 0;

//     // Calculer la moyenne
//     const moyenne = valeurs.length
//         ? (valeurs.reduce((acc, val) => acc + val, 0) / valeurs.length).toFixed(2)
//         : 0;
//     return (
//         <div className="flex h-screen bg-gray-100">
//             <ProSidebarProvider>
//                 <CustomSidebar />
//             </ProSidebarProvider>

//             <div className="flex-1 p-8 pt-[120px] overflow-auto">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                     <Cartesinfo
//                         title="Valeur minimale"
//                         value={`${valeurMin} MW`}
//                         // change="+12% d'hier"
//                         backgroundColor="bg-fuchsia-100"
//                     />
//                     <Cartesinfo
//                         title="Valeur maximale"
//                         value={`${valeurMax} MW`}
//                         // change="+8% d'hier"
//                         backgroundColor="bg-amber-50"
//                     />
//                     <Cartesinfo
//                         title="Moyenne"
//                         value={`${moyenne} MW`}
//                         // change="+4% d'hier"
//                         backgroundColor="bg-emerald-50"
//                     />
//                     {/* <Cartesinfo
//                         title="Importer des données"
//                         backgroundColor="bg-blue-50"
//                     >
//                         <label className="mt-4 inline-block px-4 py-2 bg-blue-800 text-white rounded-md cursor-pointer hover:bg-blue-700 transition">
//                             Choisir un fichier CSV
//                             <input
//                                 type="file"
//                                 accept=".csv"
//                                 onChange={handleFileUpload}
//                                 className="hidden"
//                             />
//                         </label>
//                     </Cartesinfo> */}
//                 </div>

//                 {/* Le reste de votre code reste inchangé */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//                     <div className="md:col-span-2 h-full bg-white p-4 rounded-2xl shadow-md">
//                         <SalesChart data={data} />
//                     </div>
//                     <div className="md:col-span-1 h-full flex flex-col bg-white p-4 rounded-2xl shadow-md">
//                         <TableauJournee data={data} />
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <VolumeServiceChart data={data} />
//                     <TableauJournee data={data} />
//                 </div>
//             </div>
//         </div>
//     );
// }
// import React, { useState, useEffect } from 'react';
// import { ProSidebarProvider } from 'react-pro-sidebar';
// import CustomSidebar from '../components/CustomSidebar';
// import Cartesinfo from '../components/dashComponent/Cartesinfo';
// import SalesChart from '../components/dashComponent/SalesChart';
// import VolumeServiceChart from '../components/dashComponent/VolumeServiceChart';
// import TableauJournee from '../components/dashComponent/tableaujournee';
// import axios from 'axios';

// export default function Dashboard() {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get("http://localhost:8000/dash");
//                 const formatted = response.data.map(item => ({
//                     date: item.date,
//                     valeur: item.valeur,
//                 }));
//                 setData(formatted);
//             } catch (error) {
//                 console.error("Erreur lors de la récupération des données :", error);
//             }
//         };

//         fetchData();
//     }, []);

//     const valeurs = data.map(item => item.valeur);
//     const valeurMin = valeurs.length ? Math.min(...valeurs) : 0;
//     const valeurMax = valeurs.length ? Math.max(...valeurs) : 0;
//     const moyenne = valeurs.length
//         ? (valeurs.reduce((acc, val) => acc + val, 0) / valeurs.length).toFixed(2)
//         : 0;

//     return (
//         <div className="flex h-screen bg-gray-100">
//             <ProSidebarProvider>
//                 <CustomSidebar />
//             </ProSidebarProvider>

//             <div className="flex-1 p-8 pt-[120px] overflow-auto">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {/* Colonne gauche (8/12) → lg:col-span-2 */}
//                     <div className="lg:col-span-2 space-y-6">
//                         {/* Cartes info alignées horizontalement */}
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             <Cartesinfo
//                                 title="Valeur minimale"
//                                 value={`${valeurMin} MW`}
//                                 backgroundColor="bg-fuchsia-100"
//                             />
//                             <Cartesinfo
//                                 title="Valeur maximale"
//                                 value={`${valeurMax} MW`}
//                                 backgroundColor="bg-amber-50"
//                             />
//                             <Cartesinfo
//                                 title="Moyenne"
//                                 value={`${moyenne} MW`}
//                                 backgroundColor="bg-emerald-50"
//                             />
//                         </div>

//                         {/* SalesChart en dessous des cartes */}
//                         <div className="bg-white p-4 rounded-2xl shadow-md h-full">
//                             <h2 className="text-lg font-semibold mb-2">Sales Chart</h2>
//                             <SalesChart data={data} />
//                         </div>
//                     </div>

//                     {/* Colonne droite (4/12) */}
//                     <div className="space-y-6">
//                         {/* Div vide en face des cartes */}
//                         <div className="bg-white rounded-xl shadow-md p-4 min-h-[160px] flex items-center justify-center text-gray-400 text-sm">
//                             Zone future (contenu à venir)
//                         </div>

//                         {/* VolumeServiceChart en dessous de la div vide */}
//                         <div className="bg-white p-4 rounded-2xl shadow-md h-full">
//                             {/* <h2 className="text-lg font-semibold mb-2">Volume Service Chart</h2> */}
//                             <VolumeServiceChart data={data} />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     );
// }
import React, { useState, useEffect } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import axios from 'axios';
import CustomSidebar from '../components/CustomSidebar';
import Cartesinfo from '../components/dashComponent/Cartesinfo';
import SalesChart from '../components/dashComponent/SalesChart';
import VolumeServiceChart from '../components/dashComponent/VolumeServiceChart';
import TableauJournee from '../components/dashComponent/tableaujournee';
import fondcarteinfo from '../assets/images/fond carteinfo.jpg';
import CerclePourcentage from '../components/dashComponent/CerclePourcentage';



const Dashboard = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/dash");
                const formatted = response.data.map(item => ({
                    date: item.date,
                    valeur: item.valeur,
                }));
                setData(formatted);
            } catch (err) {
                console.error("Erreur lors de la récupération des données :", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const calculateStats = () => {
        const valeurs = data.map(item => item.valeur);
        const hasData = valeurs.length > 0;

        return {
            min: hasData ? Math.min(...valeurs) : 0,
            max: hasData ? Math.max(...valeurs) : 0,
            avg: hasData ? (valeurs.reduce((acc, val) => acc + val, 0) / valeurs.length) : 0
        };
    };

    const { min, max, avg } = calculateStats();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Erreur: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50">
            <ProSidebarProvider>
                <CustomSidebar />
            </ProSidebarProvider>

            <main className="flex-1 p-6 pt-24 overflow-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Info Cards */}

                        <div
                            className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl relative overflow-hidden"
                            style={{
                                backgroundImage: `url(${fondcarteinfo})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }}
                        >
                            {/* Overlay pour lisibilité */}
                            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] -z-10"></div>

                            <Cartesinfo
                                title="Valeur minimale"
                                value={`${min.toFixed(2)} MW`}
                                icon={<MinIcon />}
                                backgroundColor="bg-white/90 hover:bg-white" // Fond blanc légèrement transparent
                            />
                            <Cartesinfo
                                title="Valeur maximale"
                                value={`${max.toFixed(2)} MW`}
                                icon={<MaxIcon />}
                                backgroundColor="bg-white/90 hover:bg-white"
                            />
                            <Cartesinfo
                                title="Moyenne"
                                value={`${avg.toFixed(2)} MW`}
                                icon={<AvgIcon />}
                                backgroundColor="bg-white/90 hover:bg-white"
                            />
                        </div>

                        {/* Sales Chart */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <SalesChart data={data} />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Placeholder */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[160px]">
                            <div className="text-gray-400 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <CerclePourcentage />
                        </div>

                        {/* Volume Service Chart */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <VolumeServiceChart data={data} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const MinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
    </svg>
);

const MaxIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
);

const AvgIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);
export default Dashboard;