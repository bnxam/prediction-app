import React from 'react';
import { ArrowLeft, BarChart2, Activity, Database, User } from 'lucide-react';
import StatsCards from './StatsCards';
import ClientChart from './ClientChart';
import ClientDataTable from './ClientDataTable';



const ClientDataViewer = ({ user, onBack }) => {
  const hasData = user.data && user.data.length > 0;

 

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
            <ClientChart data={user.data} predictions={user.predictions} />
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
