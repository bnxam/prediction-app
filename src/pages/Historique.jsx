// import React from 'react';
// import CustomSidebar from '../components/CustomSidebar';
// import { ProSidebarProvider } from 'react-pro-sidebar';
// import { useNavigate } from 'react-router-dom';
// // import { FaTrash } from 'react-icons/fa';
// import { Trash2 } from 'lucide-react';  

// const Historique = () => {
//   const navigate = useNavigate();

//   // Exemple de données - à remplacer par vos données réelles
//   const [predictions, setPredictions] = React.useState([
//     {
//       id: 1,
//       date: '01/01/2023',
//       titre: 'titre',
//       duree: '6 mois',
//       methode: 'Random Forest',
//       tauxErreur: '5.2%',
//       status: 'En cours'
//     },
//     {
//       id: 2,
//       date: '15/02/2023',
//       titre: 'titre',
//       duree: '1 ans',
//       methode: 'SVM',
//       tauxErreur: '3.8%',
//       status: 'En cours'
//     },
//     {
//       id: 3,
//       date: '10/03/2023',
//       titre: 'titre',
//       duree: '1 mois',
//       methode: 'Réseau de neurones',
//       tauxErreur: '7.1%',
//       status: 'Finit'
//     }
//   ]);

//   const handleRowClick = (predictionId) => {
//     navigate(`/historique/${predictionId}`);
//   };

//   const handleDelete = (predictionId, e) => {
//     e.stopPropagation(); // Empêche le déclenchement de handleRowClick
//     if (window.confirm('Êtes-vous sûr de vouloir supprimer cette prédiction ?')) {
//       setPredictions(predictions.filter(pred => pred.id !== predictionId));
//     }
//   };

//   const getStatusClass = (status) => {
//     switch (status) {
//       case 'Terminé':
//         return 'bg-green-100 text-green-800';
//       case 'En cours':
//         return 'bg-blue-100 text-blue-800';
//       case 'Échoué':
//         return 'bg-red-100 text-red-800';
//       case 'Finit':
//         return 'bg-purple-100 text-purple-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <ProSidebarProvider>
//         <CustomSidebar />
//       </ProSidebarProvider>

//       <div className="flex-1 p-8 pt-[110px] overflow-auto">

//         <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
//           <div className="flex flex-col bg-[#FFF] p-6 rounded-l shadow-md">
//             <label className="text-lg font-semibold mb-3 text-gray-700">Filtrer par année les prédictions dont vous avez efectuer</label>
//             <select className="border border-gray-300 p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition">
//               <option>2023</option>
//               <option>2024</option>
//               <option>2025</option>
//             </select>
//           </div>
//           <div className="overflow-x-auto rounded-l shadow bg-white">
//             <table className="min-w-full text-sm text-gray-700">
//               <thead className="bg-[#c9dde0] text-left">
//                 <tr>
//                   <th className="p-4">Date de prédiction</th>
//                   <th className="p-4">Titre</th>
//                   <th className="p-4">Durée</th>
//                   <th className="p-4">Méthode</th>
//                   <th className="p-4">Taux d'erreur</th>
//                   <th className="p-4">Statut</th>
//                   <th className="p-4">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {predictions.map((prediction) => (
//                   <tr
//                     key={prediction.id}
//                     onClick={() => handleRowClick(prediction.id)}
//                     className="hover:bg-[#F2F9FF] transition cursor-pointer"
//                   >
//                     <td className="p-4">{prediction.date}</td>
//                     <td className="p-4">{prediction.titre}</td>
//                     <td className="p-4">{prediction.duree}</td>
//                     <td className="p-4">{prediction.methode}</td>
//                     <td className="p-4">{prediction.tauxErreur}</td>
//                     <td className="p-4">
//                       <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClass(prediction.status)}`}>
//                         {prediction.status}
//                       </span>
//                     </td>
//                     <td className="p-4">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleDelete(prediction.id);
//                         }}
//                         className="p-2 rounded-full hover:bg-red-100 text-red-600 transition-colors hover:scale-110 active:scale-95"
//                         title="Supprimer"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Historique;

import React from 'react';
import CustomSidebar from '../components/CustomSidebar';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Trash2, Search } from 'lucide-react';

const Historique = () => {
  const navigate = useNavigate();

  // Données de démonstration
  const [predictions, setPredictions] = React.useState([
    {
      id: 1,
      date: '01/01/2023',
      titre: 'Analyse marché Q1',
      duree: '6 mois',
      methode: 'Random Forest',
      tauxErreur: '5.2%',
      status: 'En cours'
    },
    {
      id: 2,
      date: '15/02/2023',
      titre: 'Prévision ventes',
      duree: '1 ans',
      methode: 'SVM',
      tauxErreur: '3.8%',
      status: 'En cours'
    },
    {
      id: 3,
      date: '10/03/2023',
      titre: 'Tendance clients',
      duree: '1 mois',
      methode: 'Réseau de neurones',
      tauxErreur: '7.1%',
      status: 'Terminé'
    }
  ]);

  const [searchYear, setSearchYear] = React.useState('');
  const [searchTitle, setSearchTitle] = React.useState('');

  const filteredPredictions = predictions.filter(pred => {
    const matchesYear = searchYear ? pred.date.includes(`/${searchYear}`) : true;
    const matchesTitle = searchTitle ?
      pred.titre.toLowerCase().includes(searchTitle.toLowerCase()) : true;
    return matchesYear && matchesTitle;
  });

  const handleRowClick = (predictionId) => {
    navigate(`/historique/${predictionId}`);
  };

  const handleDelete = (predictionId, e) => {
    e.stopPropagation();
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
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <ProSidebarProvider>
        <CustomSidebar />
      </ProSidebarProvider>

      <div className="flex-1 p-8 pt-[110px] overflow-auto">
        <div className="grid grid-cols-1 gap-8">
          {/* Section de filtrage avec le nouveau style */}
          <div className=" pt-8 pb-6 rounded-lg ">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Filtre par année - Style personnalisé */}
              <div className="relative w-full">
                <div className="relative">
                  <select
                    value={searchYear}
                    onChange={(e) => setSearchYear(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 rounded-lg border border-[#315B6D]/30 bg-white text-[#315B6D] focus:outline-none focus:ring-2 focus:ring-[#04CBEA]/50 focus:border-[#04CBEA] transition-all duration-200 appearance-none"
                  >
                    <option value="">Toutes années</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#315B6D]">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Filtre par titre - Style identique à votre exemple */}
              <div className="relative w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#315B6D] w-5 h-5" />
                  <input
                    type="text"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    placeholder="Rechercher par titre..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#315B6D]/30 bg-white text-[#315B6D] focus:outline-none focus:ring-2 focus:ring-[#04CBEA]/50 focus:border-[#04CBEA] transition-all duration-200"
                  />
                  {searchTitle && (
                    <button
                      onClick={() => setSearchTitle('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#315B6D]/50 hover:text-[#FF8C1F] transition-colors"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Tableau des résultats */}
          <div className="overflow-x-auto rounded-l shadow bg-white">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-[#c9dde0] text-left">
                <tr>
                  <th className="p-4">Date</th>
                  <th className="p-4">Titre</th>
                  <th className="p-4">Durée</th>
                  <th className="p-4">Méthode</th>
                  <th className="p-4">Précision</th>
                  <th className="p-4">Statut</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPredictions.length > 0 ? (
                  filteredPredictions.map((prediction) => (
                    <tr
                      key={prediction.id}
                      onClick={() => handleRowClick(prediction.id)}
                      className="hover:bg-[#F2F9FF] transition cursor-pointer"
                    >
                      <td className="p-4">{prediction.date}</td>
                      <td className="p-4 font-medium text-[#315B6D]">{prediction.titre}</td>
                      <td className="p-4">{prediction.duree}</td>
                      <td className="p-4 text-[#04CBEA]">{prediction.methode}</td>
                      <td className="p-4">{prediction.tauxErreur}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClass(prediction.status)}`}>
                          {prediction.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={(e) => handleDelete(prediction.id, e)}
                          className="p-2 rounded-full hover:bg-red-100 text-red-600 transition-colors hover:scale-110 active:scale-95"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-4 text-center text-gray-500">
                      Aucune prédiction trouvée
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Historique;