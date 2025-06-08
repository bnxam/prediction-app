import React, { useState, useEffect } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import CustomSidebar from '../components/CustomSidebar';
import Cartesinfo from '../components/dashComponent/Cartesinfo';
import SalesChart from '../components/dashComponent/SalesChart';
import VolumeServiceChart from '../components/dashComponent/VolumeServiceChart';
import TableauJournee from '../components/dashComponent/tableaujournee';
import axios from 'axios';

// import RevenueChart from '../components/RevenueChart';
export default function Dashboard() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/dash");
                console.log("la somme des données ", response);
                const formatted = response.data.map(item => ({
                    date: item.date,
                    valeur: item.valeur,
                }));

                setData(formatted);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    }, []);  
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                // Ici vous pouvez traiter le contenu CSV
                console.log(content);
                alert(`Fichier ${file.name} importé avec succès!`);
            };
            reader.readAsText(file);
        }
    };
    const valeurs = data.map(item => item.valeur);

    // Calculer la valeur minimale
    const valeurMin = valeurs.length ? Math.min(...valeurs) : 0;

    // Calculer la valeur maximale
    const valeurMax = valeurs.length ? Math.max(...valeurs) : 0;

    // Calculer la moyenne
    const moyenne = valeurs.length
        ? (valeurs.reduce((acc, val) => acc + val, 0) / valeurs.length).toFixed(2)
        : 0;
    return (
        <div className="flex h-screen bg-gray-100">
            <ProSidebarProvider>
                <CustomSidebar />
            </ProSidebarProvider>

            <div className="flex-1 p-8 overflow-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Cartesinfo
                        title="Valeur minimale"
                        value={`${valeurMin} MW`}
                        // change="+12% d'hier"
                        backgroundColor="bg-fuchsia-100"
                    />
                    <Cartesinfo
                        title="Valeur maximale"
                        value={`${valeurMax} MW`}
                        // change="+8% d'hier"
                        backgroundColor="bg-amber-50"
                    />
                    <Cartesinfo
                        title="Moyenne"
                        value={`${moyenne} MW`}
                        // change="+4% d'hier"
                        backgroundColor="bg-emerald-50"
                    />
                    {/* <Cartesinfo
                        title="Importer des données"
                        backgroundColor="bg-blue-50"
                    >
                        <label className="mt-4 inline-block px-4 py-2 bg-blue-800 text-white rounded-md cursor-pointer hover:bg-blue-700 transition">
                            Choisir un fichier CSV
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </label>
                    </Cartesinfo> */}
                </div>

                {/* Le reste de votre code reste inchangé */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="md:col-span-2 h-full bg-white p-4 rounded-2xl shadow-md">
                        <SalesChart data={data} />
                    </div>
                    <div className="md:col-span-1 h-full flex flex-col bg-white p-4 rounded-2xl shadow-md">
                        <TableauJournee data={data} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <VolumeServiceChart data={data} />
                    <TableauJournee data={data} />
                </div>
            </div>
        </div>
    );
}