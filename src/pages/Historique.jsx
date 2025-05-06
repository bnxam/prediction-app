import React from 'react';
import CustomSidebar from '../components/CustomSidebar';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const Historique = () => {
  const navigate = useNavigate();

  // Exemple de données - à remplacer par vos données réelles
  const [predictions, setPredictions] = React.useState([
    {
      id: 1,
      date: '01/01/2023',
      duree: '6 mois',
      methode: 'Random Forest',
      tauxErreur: '5.2%',
      status: 'En cours'
    },
    {
      id: 2,
      date: '15/02/2023',
      duree: '1 ans',
      methode: 'SVM',
      tauxErreur: '3.8%',
      status: 'En cours'
    },
    {
      id: 3,
      date: '10/03/2023',
      duree: '1 mois',
      methode: 'Réseau de neurones',
      tauxErreur: '7.1%',
      status: 'Finit'
    }
  ]);

  const handleRowClick = (predictionId) => {
    navigate(`/historique/${predictionId}`);
  };

  const handleDelete = (predictionId, e) => {
    e.stopPropagation(); // Empêche le déclenchement de handleRowClick
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette prédiction ?')) {
      setPredictions(predictions.filter(pred => pred.id !== predictionId));
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Terminé':
        return 'bg-green-100 text-green-800';
      case 'En cours':
        return 'bg-blue-100 text-blue-800';
      case 'Échoué':
        return 'bg-red-100 text-red-800';
      case 'Finit':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ProSidebarProvider>
        <CustomSidebar />
      </ProSidebarProvider>

      <div className="flex-1 p-8">

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <div className="flex flex-col bg-[#fff] p-6 rounded-l shadow-md">
            <label className="text-lg font-semibold mb-3 text-gray-700">Filtrer par année les prédictions dont vous avez efectuer</label>
            <select className="border border-gray-300 p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition">
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
            </select>
          </div>

          <div className="bg-[#fff] p-6 rounded-l shadow-md overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date de prédiction</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durée</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Méthode</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taux d'erreur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {predictions.map((prediction) => (
                  <tr 
                    key={prediction.id}
                    onClick={() => handleRowClick(prediction.id)}
                    className="hover:bg-green-50 cursor-pointer transition duration-150 ease-in-out"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{prediction.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prediction.duree}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prediction.methode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prediction.tauxErreur}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(prediction.status)}`}>
                        {prediction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={(e) => handleDelete(prediction.id, e)}
                        className="text-red-500 hover:text-red-700 focus:outline-none"
                        title="Supprimer"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Historique;