import React from 'react';
// import Sidebar from '../components/sidebar'; 
import PredBar from '../components/predComponent/predBar';
// import NewPredictionButton from '../components/predComponent/newPredictionButton';
import GrapheSection from '../components/predComponent/grapheSection';
// import GrapheAction from '../components/predComponent/grapheAction';
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
      <div className="flex-1 p-8 pt-[120px] overflow-auto bg-neutral-100">
        


        {/* <NewPredictionButton/>   */}
        
        <GrapheSection />
        {/* <GrapheAction/> */}

        {/* <PredBar /> */}
        {/* <PredictionResults /> */}
      </div>
    </div>
  );
};

export default Prediction;
