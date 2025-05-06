import React from 'react';
import CustomSidebar from '../components/CustomSidebar';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Graphe from '../components/traitementComponent/graphe'
import MethodSummary from '../components/predComponent/methodSummary';
import FormParametres from '../components/traitementComponent/formParametres';
import PredictionResults from '../components/predComponent/predictionResults';

const Traitement = () => {

    return (
        <div className="flex h-screen bg-gray-200">
            <ProSidebarProvider>
                <CustomSidebar />
            </ProSidebarProvider>

            <div className="flex-1 p-8 overflow-auto">
                
                <MethodSummary />
                {/* Contenu principal avec le graphique */}
                <FormParametres/>
                <Graphe />
                
                <PredictionResults />

            </div>
        </div>
    );
}

export default Traitement;