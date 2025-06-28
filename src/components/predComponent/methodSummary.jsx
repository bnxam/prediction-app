import React from 'react';
import PercentageCircle from './PercentageCircle';

const MethodSummary = ({ metaInfo }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
      {/* Parameters Card - Centered content */}
      <div className="bg-[#ACE2E1] border-2 border-[#8fc9c7] p-4 md:p-6 rounded-sm shadow-md hover:shadow-lg transition duration-300 hover:scale-105 flex-1 flex flex-col items-center justify-center text-center">
        <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2">Méthode utilisée</h3>
        <p className="text-sm md:text-gray-600">{metaInfo.methode}</p>
      </div>
      <div className="bg-[#B4EBE6] border-2 border-[#80cec6] p-4 md:p-6 rounded-sm shadow-md hover:shadow-lg transition duration-300 hover:scale-105 flex-1 flex flex-col items-center justify-center text-center">
        <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2">Paramètres</h3>

        {metaInfo.methode === "ARIMA" && metaInfo.params?.order && (
          <p className="text-sm text-gray-600">(p,d,q) = {metaInfo.params?.order?.join(', ')}</p>
        )}
        {metaInfo.methode === "LSTM" && metaInfo.params && (
          <div className="text-sm text-gray-600 space-y-1">
            <p>Units1 : {metaInfo.params.units1}</p>
            <p>Units2 : {metaInfo.params.units2}</p>
            <p>Epochs: {metaInfo.params.epochs}</p>
            <p>Batch size : {metaInfo.params.batch_size}</p>
            <p>Longueur des séquences : {metaInfo.params.seq_len}</p>
          </div>
        )}

        {metaInfo.methode === "SARIMA" && metaInfo.params?.order && metaInfo.params?.seasonal_order && (
          <>
            <p className="text-sm text-gray-600">(p,d,q) = ({metaInfo.params.order.join(', ')})</p>
            <p className="text-sm text-gray-600">(P,D,Q,s) = ({metaInfo.params.seasonal_order.join(', ')})</p>
          </>
        )}
      </div>
      <div className=" bg-[#C4E1F6] border-2 border-[#86bfe8] p-4 md:p-6 rounded-sm shadow-md hover:shadow-lg transition duration-300 hover:scale-105 flex-1 flex flex-col items-center justify-center text-center">
        <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2">Période prédite </h3>
        <p className="text-sm md:text-gray-600"> {metaInfo.debut} , {metaInfo.fin}</p>
      </div>

      {/* Percentage Circle Card - Centered content */}
      <div className=" bg-[#F8E1B7] border-2 border-[#e0be84] p-4 md:p-6 rounded-sm shadow-md hover:shadow-lg transition duration-300 hover:scale-105 flex-1 flex flex-col items-center justify-center">
        <div className="w-[60px] md:w-[80px] h-[60px] md:h-[80px] flex items-center justify-center">
          <PercentageCircle percentage={metaInfo.mape} />
        </div>
      </div>
    </div>
  );
};

export default MethodSummary;