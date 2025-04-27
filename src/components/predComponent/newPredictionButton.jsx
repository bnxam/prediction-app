import React from 'react';
import { Zap } from 'lucide-react';

const NewPredictionButton = () => {
  return (
    <div className="flex justify-end mb-8">
      <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
        <Zap size={20} />
        Lancer une nouvelle prédiction
      </button>
    </div>
  );
};

export default NewPredictionButton;
