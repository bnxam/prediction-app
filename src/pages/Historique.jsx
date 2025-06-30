import React from 'react';
import CustomSidebar from '../components/CustomSidebar';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronDown, Trash2, Search, Eye } from 'lucide-react';

const Historique = () => {
  const navigate = useNavigate();
  const [predictions, setPredictions] = React.useState([]);
  const [searchYear, setSearchYear] = React.useState('');
  const [searchTitle, setSearchTitle] = React.useState('');

  React.useEffect(() => {
    fetch("http://localhost:8000/historique")
      .then((response) => response.json())
      .then((data) => {
        const transformed = data.historique.map((item) => ({
          id: item.id_prediction,
          date: item.date_prediction,
          titre: item.titre || "—",
          duree: item.periode + " mois",
          methode: item.type,
          tauxErreur: item.mape !== null ? item.mape + "%" : "—",
          status: "Terminé"
        }));
        setPredictions(transformed);
      })
      .catch((error) => {
        console.error("Erreur de chargement :", error);
      });
  }, []);

  const filteredPredictions = predictions.filter(pred => {
    const matchesYear = searchYear ? pred.date.includes(searchYear) : true;
    const matchesTitle = searchTitle ? pred.titre.toLowerCase().includes(searchTitle.toLowerCase()) : true;
    return matchesYear && matchesTitle;
  });

  const handleRowClick = (predictionId) => {
    navigate(`/historique/${predictionId}`);
  };

  //  const handleDelete = async (predictionId, e) => {
  //   e.stopPropagation();
  //   if (window.confirm('Êtes-vous sûr de vouloir supprimer cette prédiction ?')) {
  //     try {
  //       const response = await fetch(`http://localhost:8000/historique/predictions/${predictionId}`, {
  //         method: "DELETE"
  //       });

  //       if (response.ok) {
  //         // Supprimer localement après suppression réussie côté serveur
  //         setPredictions(predictions.filter(pred => pred.id !== predictionId));
  //       } else {
  //         alert("Erreur lors de la suppression sur le serveur.");
  //       }
  //     } catch (error) {
  //       console.error("Erreur :", error);
  //       alert("Une erreur s'est produite.");
  //     }
  //   }
  // };


  const getStatusClass = (status) => {
    switch (status) {
      case 'Terminé': return 'bg-green-100 text-green-800';
      case 'En cours': return 'bg-blue-100 text-blue-800';
      case 'Échoué': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <ProSidebarProvider>
        <CustomSidebar />
      </ProSidebarProvider>

      <div className="flex-1 p-8 pt-[110px] overflow-auto">
        <div className="grid grid-cols-1 gap-8">
          <div className="pt-8 pb-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

          <div className="overflow-x-auto rounded-l shadow bg-white">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-[#c9dde0] text-left">
                <tr >
                  <th className="p-4">Date</th>
                  <th className="p-4">Titre</th>
                  <th className="p-4">Durée</th>
                  <th className="p-4">Méthode</th>
                  <th className="p-4">Précision</th>
                  <th className="p-4">Statut</th>
                  {/* <th className="p-4">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredPredictions.length > 0 ? (
                  filteredPredictions.map((prediction) => (
                    <tr
                     key={prediction.id} onClick={() => handleRowClick(prediction.id)}
                      className="hover:bg-[#F2F9FF] transition cursor-pointer"
                    >
                      <td className="p-4">{prediction.date}</td>
                      <td className="p-4 font-medium max-w-[110px] truncate text-[#315B6D]" title={prediction.titre}>{prediction.titre}</td>
                      <td className="p-4">{prediction.duree}</td>
                      <td className="p-4 text-[#04CBEA]">{prediction.methode}</td>
                      <td className="p-4">{prediction.tauxErreur}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClass(prediction.status)}`}>
                          {prediction.status}
                        </span>
                      </td>
                      {/* <td className="border px-4 py-2">
                        <Link
                          to={`/prediction/${prediction.id}`}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Voir
                        </Link>
                      </td> */}
                      {/* <td className="p-4 flex gap-2">
                        <button
                          onClick={(e) => handleRowClick(prediction.id)}
                          className="p-2 rounded-full hover:bg-green-100 text-green-600 transition-colors"
                          title="Visualiser"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => handleDelete(prediction.id, e)}
                          className="p-2 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td> */}
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
