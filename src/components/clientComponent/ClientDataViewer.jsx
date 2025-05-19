import React from 'react';
import StatsCards from './StatsCards';
import ClientChart from './ClientChart';
import ClientDataTable from './ClientDataTable';

const ClientDataViewer = ({ client, onBack }) => {
  return (
    <div className="space-y-6 mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Données de {client.codeClient}</h2>
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
        >
          ← Retour à la liste
        </button>
      </div>

      <StatsCards data={client.data} />
      <ClientChart data={client.data} predictions={client.predictions} />
      <ClientDataTable data={client.data} />
    </div>
  );
};

export default ClientDataViewer;
