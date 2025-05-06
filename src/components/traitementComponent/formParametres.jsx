import React from 'react';

const FormParametres = () => {
    return (
        <div className="mt-8 w-full bg-white p-6 rounded-l shadow-md mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Paramètres du Modèle</h2>
            
            <form className="space-y-6">
                {/* Inputs in 2-column grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Column 1 */}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="epochs" className="block text-sm font-medium text-gray-700 mb-1">
                                Epochs
                            </label>
                            <input
                                type="number"
                                id="epochs"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition"
                                placeholder="Entrez le nombre d'epochs"
                            />
                        </div>

                        <div>
                            <label htmlFor="learningRate" className="block text-sm font-medium text-gray-700 mb-1">
                                Taux d'apprentissage
                            </label>
                            <input
                                type="number"
                                id="learningRate"
                                step="0.001"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition"
                                placeholder="0.001"
                            />
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="batchSize" className="block text-sm font-medium text-gray-700 mb-1">
                                Batch size
                            </label>
                            <input
                                type="number"
                                id="batchSize"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition"
                                placeholder="Taille du lot"
                            />
                        </div>

                        <div>
                            <label htmlFor="validationSplit" className="block text-sm font-medium text-gray-700 mb-1">
                                Validation split
                            </label>
                            <input
                                type="number"
                                id="validationSplit"
                                step="0.1"
                                max="0.9"
                                min="0.1"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 focus:outline-none transition"
                                placeholder="0.2"
                            />
                        </div>
                    </div>
                </div>

                {/* Buttons in 2-column grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <button
                        type="button"
                        className="w-full py-2.5 px-4 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition font-medium flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Choisir le modèle
                    </button>

                    <button
                        type="button"
                        className="w-full py-2.5 px-4 rounded-lg bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 transition font-medium flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                        Changer de modèle
                    </button>
                </div>

                {/* Full-width purchase button */}
                <button
                    type="button"
                    className="w-full py-3 px-4 rounded-lg bg-[#fbf8cc] text-[#936639] hover:bg-[#f5d491]  transition font-medium flex items-center justify-center gap-2 mt-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    Acheter le modèle
                </button>
            </form>
        </div>
    );
}

export default FormParametres;