import React, { createContext, useState, useContext } from 'react';

const PredictionContext = createContext();

export const usePrediction = () => useContext(PredictionContext);

export const PredictionProvider = ({ children }) => {
  const [selectedData, setSelectedData] = useState([]);

  return (
    <PredictionContext.Provider value={{ selectedData, setSelectedData }}>
      {children}
    </PredictionContext.Provider>
  );
};
