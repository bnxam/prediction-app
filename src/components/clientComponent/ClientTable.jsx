// // components/clients/ClientTable.jsx
// import React from 'react';
// import { Trash2, Pencil } from 'lucide-react';


// const ClientTable = ({ clients, onEdit, onDelete, onViewData }) => {
//     return (
//         <div className="overflow-x-auto rounded-xl shadow bg-white">
//             <table className="min-w-full text-sm text-gray-700">
//                 <thead className="bg-gray-100 text-left">
//                     <tr>
//                         <th className="p-4">ID</th>
//                         <th className="p-4">Agence</th>
//                         <th className="p-4">Type Client</th>
//                         <th className="p-4">Nature</th>
//                         <th className="p-4">Référence</th>
//                         <th className="p-4">Code Client</th>
//                         <th className="p-4">Numéro Facture</th>
//                         <th className="p-4">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {clients.map((client) => (
//                         <tr key={client.id} className="hover:bg-yellow-50 transition">
//                             <td className="p-4">{client.id}</td>
//                             <td className="p-4">{client.agence}</td>
//                             <td className="p-4">{client.type}</td>
//                             <td className="p-4">{client.nature}</td>
//                             <td className="p-4">{client.reference}</td>
//                             <td className="p-4 font-medium text-blue-600">{client.codeClient}</td>
//                             <td className="p-4">{client.numeroFacture}</td>
//                             <td className="p-4">
//                                 <div className="flex items-center gap-1 whitespace-nowrap">
                                    
//                                     <button
//                                         onClick={() => onViewData(client)}
//                                         className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs hover:bg-blue-600"
//                                     >
//                                         Visualiser les données
//                                     </button>

//                                     <button className="px-3 py-1 bg-green-500 text-white rounded-full text-xs hover:bg-green-600">
//                                         Lancer Prédiction
//                                     </button>
//                                     <button
//                                         onClick={() => onEdit(client.id)}
//                                         className="p-2 rounded-full hover:bg-yellow-100 text-yellow-600"
//                                         title="Modifier"
//                                     >
//                                         <Pencil className="w-4 h-4" />
//                                     </button>
//                                     <button
//                                         onClick={() => onDelete(client.id)}
//                                         className="p-2 rounded-full hover:bg-red-100 text-red-600"
//                                         title="Supprimer"
//                                     >
//                                         <Trash2 className="w-4 h-4" />
//                                     </button>

//                                 </div>
//                             </td>

//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ClientTable;
// components/clients/ClientTable.jsx
import React from 'react';
import { Trash2, Pencil } from 'lucide-react';

const ClientTable = ({ clients, onEdit, onDelete, onViewData }) => {
    return (
        <div className="overflow-x-auto rounded-xl shadow bg-white">
            <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="p-4">ID</th>
                        <th className="p-4">Agence</th>
                        <th className="p-4">Type Client</th>
                        <th className="p-4">Nature</th>
                        <th className="p-4">Référence</th>
                        <th className="p-4">Code Client</th>
                        <th className="p-4">Numéro Facture</th>
                        <th className="p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id} className="hover:bg-yellow-50 transition">
                            <td className="p-4">{client.id}</td>
                            <td className="p-4">{client.agence}</td>
                            <td className="p-4">{client.type}</td>
                            <td className="p-4">{client.nature}</td>
                            <td className="p-4">{client.reference}</td>
                            <td className="p-4 font-medium text-blue-600">{client.codeClient}</td>
                            <td className="p-4">{client.numeroFacture}</td>
                            <td className="p-4">
                                <div className="flex items-center gap-1 whitespace-nowrap">
                                    <button
                                        onClick={() => onViewData(client)}
                                        className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs hover:bg-blue-600"
                                    >
                                        Visualiser les données
                                    </button>
                                    {/* <button className="px-3 py-1 bg-green-500 text-white rounded-full text-xs hover:bg-green-600">
                                        Lancer Prédiction
                                    </button> */}
                                    <button
                                        onClick={() => onEdit(client.id)}
                                        className="p-2 rounded-full hover:bg-yellow-100 text-yellow-600"
                                        title="Modifier"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(client.id)}
                                        className="p-2 rounded-full hover:bg-red-100 text-red-600"
                                        title="Supprimer"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientTable;
