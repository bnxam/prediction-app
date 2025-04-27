import React from 'react';
import CustomSidebar from '../components/CustomSidebar';
import { ProSidebarProvider } from 'react-pro-sidebar';

const Historique = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <ProSidebarProvider>
        <CustomSidebar />
      </ProSidebarProvider>

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Historique</h1>

        {/* Conteneur 2 colonnes moderne */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Colonne 1 */}
          <div className="flex flex-col bg-white p-6 rounded-2xl shadow-md">
            <label className="text-lg font-semibold mb-3 text-gray-700">Recherche générale</label>
            <input
              type="text"
              placeholder="🔎 Taper pour rechercher..."
              className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Colonne 2 */}
          <div className="flex flex-col bg-white p-6 rounded-2xl shadow-md">
            <label className="text-lg font-semibold mb-3 text-gray-700">Filtrer par année</label>
            <select className="border border-gray-300 p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition">
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
            </select>

            <input
              type="text"
              placeholder="🔎 Recherche par année..."
              className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Historique;
