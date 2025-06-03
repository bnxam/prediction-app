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
import { ArrowLeft, BarChart2, Activity, Database, User, Mail, Key, Briefcase, Image } from 'lucide-react';
import StatsCards from './StatsCards';
import ClientChart from './ClientChart';
import ClientDataTable from './ClientDataTable';

const ClientDataViewer = ({ user, onBack }) => {
  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Header avec effet de verre */}
      <div className="flex justify-between items-center p-4 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-100/50 rounded-xl">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex items-center space-x-3">
            {user.photodeprofil && (
              <img 
                src={user.photodeprofil} 
                alt="Profil" 
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
                onError={(e) => e.target.style.display = 'none'}
              />
            )}
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {user.nom}
              </h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Bouton retour premium */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-5 py-3 bg-[#94caf7] from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-gray-300 group"
        >
          <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
          <span className="font-medium">Retour à la liste</span>
        </button>
      </div>

      {/* Section Infos Utilisateur */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all hover:shadow-2xl">
          <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white flex items-center">
            <User className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">
              Informations Personnelles
            </h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Briefcase className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Secteur</p>
                <p className="font-medium">{user.secteur}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Key className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Mot de passe</p>
                <p className="font-medium">••••••••</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all hover:shadow-2xl">
          <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white flex items-center">
            <Image className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">
              Photo de Profil
            </h3>
          </div>
          <div className="p-5 flex justify-center">
            {user.photodeprofil ? (
              <img 
                src={user.photodeprofil} 
                alt="Profil" 
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150';
                }}
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>
        </div>
      </div> */}

      {/* Section Stats avec animation */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all hover:shadow-2xl">
        <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white flex items-center">
          <Activity className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">
            Statistiques Clés
          </h3>
        </div>
        <div className="p-5">
          <StatsCards data={user.data} />
        </div>
      </div>

      {/* Section Graphique avec effet de profondeur */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all hover:shadow-2xl">
        <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white flex items-center">
          <BarChart2 className="w-5 h-5 text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">
            Données et Prédiction
          </h3>
        </div>
        <div className="p-5">
          <ClientChart data={user.data} predictions={user.predictions} />
        </div>
      </div>

      {/* Tableau de données premium */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform transition-all hover:shadow-2xl">
        <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-green-50 to-white">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <span className="bg-green-600 text-white p-1 rounded mr-3">
              <Database className="w-4 h-4" />
            </span>
            Données Brutes
          </h3>
        </div>
        <div className="p-1">
          <ClientDataTable data={user.data} />
        </div>
      </div>
    </div>
  );
};

export default ClientDataViewer;
