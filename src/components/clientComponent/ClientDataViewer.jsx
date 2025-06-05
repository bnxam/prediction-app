// import React from 'react';
// import { ArrowLeft, BarChart2, Activity, Database } from 'lucide-react';
// import StatsCards from './StatsCards';
// import ClientChart from './ClientChart';
// import ClientDataTable from './ClientDataTable';

// const ClientDataViewer = ({ client, onBack }) => {
//   return (
//     <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
//       {/* Header avec effet de verre */}
//       <div className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100">
//         <div className="flex items-center space-x-4">
//           <div className="p-3 bg-blue-100/50 rounded-xl">
//             <Database className="w-6 h-6 text-blue-600" />
//           </div>
//           <div className="flex items-center space-x-3">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Données du client {client.codeClient}
//             </h2>
//           </div>

//         </div>

//         {/* Bouton retour premium */}
//         <button
//           onClick={onBack}
//           className="flex items-center space-x-2 px-5 py-3 bg-[#94caf7] from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-gray-300 group"
//         >
//           <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
//           <span className="font-medium">Retour à la liste</span>
//         </button>
//       </div>

//       {/* Section Stats avec animation */}
//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all hover:shadow-2xl">
//         <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white flex items-center">
//           <Activity className="w-5 h-5 text-blue-600 mr-2" />
//           <h3 className="text-lg font-semibold text-gray-800">
//             Statistiques Clés
//           </h3>
//         </div>
//         <div className="p-5">
//           <StatsCards data={client.data} />
//         </div>
//       </div>

//       {/* Section Graphique avec effet de profondeur */}
//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all hover:shadow-2xl">
//         <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white flex items-center">
//           <BarChart2 className="w-5 h-5 text-purple-600 mr-2" />
//           <h3 className="text-lg font-semibold text-gray-800">
//            Données et Prédiction
//           </h3>
          
//         </div>
//         <div className="p-5">
//           <ClientChart data={client.data} predictions={client.predictions} />
//         </div>
//       </div>

//       {/* Tableau de données premium */}
//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all hover:shadow-2xl">
//         <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-green-50 to-white">
//           <h3 className="text-lg font-semibold text-gray-800 flex items-center">
//             <span className="bg-green-600 text-white p-1 rounded mr-3">
//               <Database className="w-4 h-4" />
//             </span>
//             Données Brutes
//           </h3>
//         </div>
//         <div className="p-1">
//           <ClientDataTable data={client.data} />
//         </div>
//       </div>

//       {/* Footer discret
//       <div className="text-center text-xs text-gray-400 pt-4">
//         Données actualisées en temps réel • Dernière mise à jour : {new Date().toLocaleString()}
//       </div> */}
//     </div>
//   );
// };

// export default ClientDataViewer;


import React from 'react';
import { ArrowLeft, BarChart2, Activity, Database, User } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Enregistrement des composants ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ClientChart = ({ data }) => {
  // Préparation des données pour le graphique
  const chartData = {
    labels: data.map(item => new Date(item.date).toLocaleDateString('fr-FR')),
    datasets: [{
      label: 'Consommation (kWh)',
      data: data.map(item => item.valeur),
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Historique des consommations'
      }
    },
    scales: {
      y: { beginAtZero: false }
    }
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

const ClientDataTable = ({ data }) => {
  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('fr-FR');
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Consommation (kWh)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="p-3">{formatDate(item.date)}</td>
              <td className="p-3">{item.valeur.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const StatsCards = ({ data }) => {
  if (!data || data.length === 0) return null;

  const values = data.map(item => item.valeur);
  const sum = values.reduce((a, b) => a + b, 0);
  const avg = sum / values.length;
  const max = Math.max(...values);
  const min = Math.min(...values);

  const stats = [
    { title: 'Moyenne', value: avg.toFixed(2), bg: 'bg-blue-50' },
    { title: 'Totale', value: sum.toFixed(2), bg: 'bg-green-50' },
    { title: 'Maximum', value: max.toFixed(2), bg: 'bg-yellow-50' },
    { title: 'Minimum', value: min.toFixed(2), bg: 'bg-red-50' },
    { title: 'Dernier', value: values[values.length-1].toFixed(2), bg: 'bg-purple-50' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className={`${stat.bg} p-4 rounded-lg`}>
          <p className="text-sm text-gray-500">{stat.title}</p>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

const ClientDataViewer = ({ user, onBack }) => {
  const hasData = user.data && user.data.length > 0;

  // Debug: affiche les données reçues
  console.log('Données du client:', {
    info: {
      nom: user.nom,
      prenom: user.prenom,
      code_client: user.code_client
    },
    dataPoints: user.data?.length || 0,
    sampleData: user.data?.slice(0, 3)
  });

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* En-tête */}
      <div className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100/50 rounded-xl">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {user.nom} {user.prenom}
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
              <p className="text-sm text-gray-500">Client #{user.code_client}</p>
              {user.telephone && <p className="text-sm text-gray-500">{user.telephone}</p>}
              {user.email && <p className="text-sm text-gray-500">{user.email}</p>}
            </div>
          </div>
        </div>

        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-5 py-3 bg-blue-100 hover:bg-blue-200 text-gray-700 rounded-xl transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Retour</span>
        </button>
      </div>

      {/* Statistiques */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white flex items-center">
          <Activity className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">
            Statistiques Clés
          </h3>
        </div>
        <div className="p-5">
          {hasData ? (
            <StatsCards data={user.data} />
          ) : (
            <p className="text-center py-4 text-gray-500">Aucune donnée disponible</p>
          )}
        </div>
      </div>

      {/* Graphique */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white flex items-center">
          <BarChart2 className="w-5 h-5 text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">
            Historique des Consommations
          </h3>
        </div>
        <div className="p-5">
          {hasData ? (
            <ClientChart data={user.data} />
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              Aucune donnée à afficher
            </div>
          )}
        </div>
      </div>

      {/* Tableau de données */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-green-50 to-white">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Database className="w-5 h-5 text-green-600 mr-2" />
            Détails des Relevés
          </h3>
        </div>
        <div className="p-1">
          {hasData ? (
            <ClientDataTable data={user.data} />
          ) : (
            <p className="text-center py-8 text-gray-500">
              Aucun relevé de consommation disponible
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDataViewer;


// import React from 'react';
// import { ArrowLeft, BarChart2, Activity, Database, User } from 'lucide-react'; // Ajout de User ici
// import StatsCards from './StatsCards';
// import ClientChart from './ClientChart';
// import ClientDataTable from './ClientDataTable';

// const ClientDataViewer = ({ user, onBack }) => {
//   // Fonction pour calculer les statistiques de base
//   const calculateStats = (data) => {
//     if (!data || data.length === 0) return null;
    
//     const values = data.map(item => item.valeur);
//     const sum = values.reduce((a, b) => a + b, 0);
//     const avg = sum / values.length;
//     const max = Math.max(...values);
//     const min = Math.min(...values);
    
//     return {
//       moyenne: avg.toFixed(2),
//       totale: sum.toFixed(2),
//       maximum: max.toFixed(2),
//       minimum: min.toFixed(2),
//       dernier: values[values.length - 1].toFixed(2)
//     };
//   };

//   const stats = calculateStats(user.data);
//   const hasData = user.data && user.data.length > 0;

//   return (
//     <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100">
//         <div className="flex items-center space-x-4">
//           <div className="p-3 bg-blue-100/50 rounded-xl">
//             <User className="w-6 h-6 text-blue-600" />
//           </div>
//           <div>
//             <h2 className="text-xl font-semibold text-gray-800">
//               {user.nom} {user.prenom}
//             </h2>
//             <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
//               <p className="text-sm text-gray-500">Client #{user.code_client}</p>
//               {user.telephone && <p className="text-sm text-gray-500">{user.telephone}</p>}
//               {user.email && <p className="text-sm text-gray-500">{user.email}</p>}
//             </div>
//           </div>
//         </div>

//         <button
//           onClick={onBack}
//           className="flex items-center space-x-2 px-5 py-3 bg-blue-100 hover:bg-blue-200 text-gray-700 rounded-xl transition-all duration-300"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           <span className="font-medium">Retour</span>
//         </button>
//       </div>

//       {/* Section Statistiques */}
//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//         <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white flex items-center">
//           <Activity className="w-5 h-5 text-blue-600 mr-2" />
//           <h3 className="text-lg font-semibold text-gray-800">
//             Statistiques Clés
//           </h3>
//         </div>
//         <div className="p-5">
//           {hasData ? (
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//               <div className="bg-blue-50 p-4 rounded-lg">
//                 <p className="text-sm text-gray-500">Moyenne</p>
//                 <p className="text-2xl font-bold">{stats.moyenne}</p>
//               </div>
//               <div className="bg-green-50 p-4 rounded-lg">
//                 <p className="text-sm text-gray-500">Totale</p>
//                 <p className="text-2xl font-bold">{stats.totale}</p>
//               </div>
//               <div className="bg-yellow-50 p-4 rounded-lg">
//                 <p className="text-sm text-gray-500">Maximum</p>
//                 <p className="text-2xl font-bold">{stats.maximum}</p>
//               </div>
//               <div className="bg-red-50 p-4 rounded-lg">
//                 <p className="text-sm text-gray-500">Minimum</p>
//                 <p className="text-2xl font-bold">{stats.minimum}</p>
//               </div>
//               <div className="bg-purple-50 p-4 rounded-lg">
//                 <p className="text-sm text-gray-500">Dernier relevé</p>
//                 <p className="text-2xl font-bold">{stats.dernier}</p>
//               </div>
//             </div>
//           ) : (
//             <p className="text-center py-4 text-gray-500">Aucune donnée disponible</p>
//           )}
//         </div>
//       </div>

//       {/* Section Graphique */}
//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//         <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white flex items-center">
//           <BarChart2 className="w-5 h-5 text-purple-600 mr-2" />
//           <h3 className="text-lg font-semibold text-gray-800">
//             Historique des Consommations
//           </h3>
//         </div>
//         <div className="p-5">
//           {hasData ? (
//             <ClientChart data={user.data} />
//           ) : (
//             <div className="h-64 flex items-center justify-center text-gray-500">
//               Aucune donnée à afficher
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Tableau de données */}
//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//         <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-green-50 to-white">
//           <h3 className="text-lg font-semibold text-gray-800 flex items-center">
//             <Database className="w-5 h-5 text-green-600 mr-2" />
//             Détails des Relevés
//           </h3>
//         </div>
//         <div className="p-1">
//           {hasData ? (
//             <ClientDataTable data={user.data} />
//           ) : (
//             <p className="text-center py-8 text-gray-500">
//               Aucun relevé de consommation disponible
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientDataViewer;
