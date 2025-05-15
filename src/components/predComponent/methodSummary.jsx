import React from 'react';
import PercentageCircle from './PercentageCircle';

const MethodSummary = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
      {/* Parameters Card - Centered content */}
      <div className="bg-[#ACE2E1] border-2 border-[#8fc9c7] p-4 md:p-6 rounded-sm shadow-md hover:shadow-lg transition duration-300 hover:scale-105 flex-1 flex flex-col items-center justify-center text-center">
        <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2">Méthode utilisée</h3>
        <p className="text-sm md:text-gray-600">LSTM</p>
      </div>
      <div className=" bg-[#B4EBE6] border-2 border-[#80cec6] p-4 md:p-6 rounded-sm shadow-md hover:shadow-lg transition duration-300 hover:scale-105 flex-1 flex flex-col items-center justify-center text-center">
        <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2">Paramètres</h3>
        <p className="text-sm md:text-gray-600">lr=0.001, epochs=50</p>
      </div>
      <div className=" bg-[#C4E1F6] border-2 border-[#8fc9c7] p-4 md:p-6 rounded-sm shadow-md hover:shadow-lg transition duration-300 hover:scale-105 flex-1 flex flex-col items-center justify-center text-center">
        <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2">Période prédite </h3>
        <p className="text-sm md:text-gray-600">25-12-2004 , 28-12-2004</p>
      </div>

      {/* Percentage Circle Card - Centered content */}
      <div className=" bg-[#F8E1B7] border-2 border-[#e0be84] p-4 md:p-6 rounded-sm shadow-md hover:shadow-lg transition duration-300 hover:scale-105 flex-1 flex flex-col items-center justify-center">
        <div className="w-[60px] md:w-[80px] h-[60px] md:h-[80px] flex items-center justify-center">
          <PercentageCircle percentage={4} />
        </div>
      </div>
    </div>
  );
};

export default MethodSummary;