import React from 'react';
import CustomSidebar from '../components/CustomSidebar';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Graphe from '../components/traitementComponent/graphe'
import MethodSummary from '../components/predComponent/methodSummary';
import FormParametres from '../components/traitementComponent/formParametres';

const Traitement = () => {
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
    const maxValue = Math.max(...data.map(item => item.Valeur));

    return (
        <div className="flex h-screen bg-gray-200">
            <ProSidebarProvider>
                <CustomSidebar />
            </ProSidebarProvider>

            <div className="flex-1 p-8 overflow-auto">
                <div className="flex justify-between items-center mb-6 rounded p-3 bg-white shadow">
                    <h5 className="text-lg font-bold text-gray-600">Traitement</h5>
                    <h5 className="text-lg font-bold text-gray-600">Nom de l'entreprise</h5>
                </div>
                <MethodSummary />
                {/* Contenu principal avec le graphique */}
                <Graphe />
                <FormParametres/>

            </div>
        </div>
    );
}

export default Traitement;