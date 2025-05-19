import React from 'react';
import { Search } from 'lucide-react';

const ClientSearch = ({ searchValue, onSearchChange, onAddClient }) => {
    return (
        <div className="mb-6 flex items-center w-full">
            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Rechercher par code client"
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition text-sm"
                />
            </div>

            <button
                onClick={onAddClient}
                className="ml-2 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow"
            >
                + Ajouter un client
            </button>
        </div>
    );
};

export default ClientSearch;
