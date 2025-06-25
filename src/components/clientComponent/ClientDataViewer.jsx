// import React from 'react';
// import { ArrowLeft, BarChart2, Activity, Database, User } from 'lucide-react';
// import StatsCards from './StatsCards';
// import ClientChart from './ClientChart';
// import ClientDataTable from './ClientDataTable';



// const ClientDataViewer = ({ user, onBack }) => {
//   const hasData = user.data && user.data.length > 0;



//   return (
//     <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
//       {/* En-tête */}
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

//       {/* Statistiques */}
//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//         <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white flex items-center">
//           <Activity className="w-5 h-5 text-blue-600 mr-2" />
//           <h3 className="text-lg font-semibold text-gray-800">
//             Statistiques Clés
//           </h3>
//         </div>
//         <div className="p-5">
//           {hasData ? (
//             <StatsCards data={user.data} />
//           ) : (
//             <p className="text-center py-4 text-gray-500">Aucune donnée disponible</p>
//           )}
//         </div>
//       </div>

//       {/* Graphique */}
//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//         <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white flex items-center">
//           <BarChart2 className="w-5 h-5 text-purple-600 mr-2" />
//           <h3 className="text-lg font-semibold text-gray-800">
//             Historique des Consommations
//           </h3>
//         </div>
//         <div className="p-5">
//           {hasData ? (
//             <ClientChart data={user.data} predictions={user.predictions} />
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
// import React from 'react';
// import { ArrowLeft, BarChart2, Database, User } from 'lucide-react';
// import StatsCards from './StatsCards';
// import ClientChart from './ClientChart';
// import ClientDataTable from './ClientDataTable';

// const ClientDataViewer = ({ user, onBack }) => {
//   const hasData = user.data && user.data.length > 0;

//   return (
//     <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">

//       {/* Section 1 : Les cartes statistiques */}
//       <StatsCards data={user.data} />

//       {/* Section 2 : Chart + Infos client (grille 2/3 - 1/3) */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* 2/3 : Le graphique */}
//         <div className="md:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-100">
//           <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white flex items-center">
//             <BarChart2 className="w-5 h-5 text-purple-600 mr-2" />
//             <h3 className="text-lg font-semibold text-gray-800">
//               Historique des Consommations
//             </h3>
//           </div>
//           <div className="p-5">
//             {hasData ? (
//               <ClientChart data={user.data} predictions={user.predictions} />
//             ) : (
//               <div className="h-64 flex items-center justify-center text-gray-500">
//                 Aucune donnée à afficher
//               </div>
//             )}
//           </div>
//         </div>

//         {/* 1/3 : Infos client */}
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col justify-between">
//           <div className="flex items-center space-x-4 mb-4">
//             <div className="p-3 bg-blue-100/50 rounded-xl">
//               <User className="w-6 h-6 text-blue-600" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800">
//                 {user.nom} {user.prenom}
//               </h2>
//               <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
//                 <p className="text-sm text-gray-500">Client #{user.code_client}</p>
//               </div>
//             </div>
//           </div>

//           {user.telephone && (
//             <p className="text-sm text-gray-600 mb-2">
//               📞 Téléphone : {user.telephone}
//             </p>
//           )}
//           {user.email && (
//             <p className="text-sm text-gray-600 mb-2">
//               ✉️ Email : {user.email}
//             </p>
//           )}

//           <button
//             onClick={onBack}
//             className="mt-4 flex items-center space-x-2 px-5 py-3 bg-blue-100 hover:bg-blue-200 text-gray-700 rounded-xl transition-all duration-300 self-start"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             <span className="font-medium">Retour</span>
//           </button>
//         </div>
//       </div>

//       {/* Section 3 : Tableau de données */}
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
import React from 'react';
import { ArrowLeft, BarChart2, Database, User } from 'lucide-react';
import StatsCards from './StatsCards';
import ClientChart from './ClientChart';
import ClientDataTable from './ClientDataTable';
import PercentageCircle from './PercentageCircle';
import ClientHistogram from './ClientHistogram';


const ClientDataViewer = ({ user, onBack }) => {
  const hasData = user.data && user.data.length > 0;

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">

      {/* En-tête principal : bouton retour + titre */}
      <div className="flex justify-between items-center mb-4">

        <h1 className="text-2xl font-bold text-gray-800">Données de l'utilisateur {user.code_client}</h1>
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-5 py-2 bg-[#C5D3E8] hover:bg-blue-200 text-gray-700 rounded-xl transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Retour à la page précedente</span>
        </button>
      </div>

      {/* Section 1 : Les cartes statistiques */}
      <StatsCards data={user.data} />

      {/* Section 2 : Chart + Infos client (3/4 - 1/4) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* 3/4 : ClientChart */}
        <div className="md:col-span-3 bg-white rounded-2xl shadow-xl border border-gray-100">
          <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white flex items-center">
            <BarChart2 className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">
              Historique des Consommations
            </h3>
          </div>
          <div className="p-5">
            {hasData ? (
              <ClientChart data={user.data} predictions={user.predictions} />
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                Aucune donnée à afficher
              </div>
            )}
          </div>
        </div>

        {/* 1/4 : Infos client */}
        <div className="md:col-span-1 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 flex flex-col justify-start">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-blue-100/50 rounded-xl">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {user.nom} {user.prenom}
              </h2>
            </div>
          </div>

          {user.telephone && (
            <p className="text-sm text-gray-600 mb-2">
              📞 Téléphone : {user.telephone}
            </p>
          )}
          {user.email && (
            <p className="text-sm text-gray-600 mb-2">
              ✉️ Email : {user.email}
            </p>
          )}
          <PercentageCircle percentage={7.3} />

        </div>
      </div>

      {/* Section 3 : Tableau de données */}
      {/* Section 3 : Histogramme + Mini Tableau (2/3 - 1/3) */}
      {hasData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Histogramme - 2/3 */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white flex items-center">
              <BarChart2 className="w-5 h-5 text-indigo-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Histogramme de consommation</h3>
            </div>
            <div className="p-5">
              <ClientHistogram data={user.data} />
            </div>
          </div>

          {/* Tableau réduit - 1/3 */}
          <div className="md:col-span-1 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-white flex items-center">
              <Database className="w-5 h-5 text-emerald-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Derniers relevés</h3>
            </div>
            <div className="p-3">
              <ClientDataTable data={user.data.slice(-5)} /> {/* derniers relevés */}
            </div>
          </div>
        </div>
      )}
  
    </div>
  );
};

export default ClientDataViewer;
