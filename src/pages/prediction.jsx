import React from 'react';
import Sidebar from '../components/sidebar'; 
import PredBar from '../components/predComponent/predBar';
import NewPredictionButton from '../components/predComponent/newPredictionButton';
import GrapheSection from '../components/predComponent/grapheSection';
import GrapheAction from '../components/predComponent/grapheAction';
import MethodSummary from '../components/predComponent/methodSummary';
import PredictionResults from '../components/predComponent/predictionResults';
import CustomSidebar from '../components/CustomSidebar';
import { ProSidebarProvider } from 'react-pro-sidebar';

const Prediction = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar fixe à gauche */}
        <ProSidebarProvider>
              <CustomSidebar />
            </ProSidebarProvider>

      {/* Contenu principal prend le reste */}
      <div className="flex-1 p-8   overflow-auto bg-neutral-200">
        <div className="flex justify-between items-center mb-6 rounded  p-3  bg-white shadow">
          <h5 className="text-lg font-bold text-gray-600 ">Prediction</h5>
          <h5 className="text-lg font-bold text-gray-600 ">Nom de l'entreprise</h5>
        </div>

       <PredBar />
    <NewPredictionButton/>  
    <GrapheSection/>
    <GrapheAction/>
    <MethodSummary/>
    <PredictionResults/>
      </div>
    </div>
  );
};

export default Prediction;
