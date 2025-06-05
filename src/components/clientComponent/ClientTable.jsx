// import React from 'react';
// import { Trash2, Pencil } from 'lucide-react';

// const ClientTable = ({ clients, onEdit, onDelete, onViewData }) => {
//   return (
//     <div className="overflow-x-auto rounded-xl shadow bg-white">
//       <table className="min-w-full text-sm text-gray-700">
//         <thead className="bg-gray-100 text-left">
//           <tr>
//             <th className="p-4">ID</th>
//             <th className="p-4">Agence</th>
//             <th className="p-4">Type Client</th>
//             <th className="p-4">Nature</th>
//             <th className="p-4">Référence</th>
//             <th className="p-4">Code Client</th>
//             <th className="p-4">Numéro Facture</th>
//             <th className="p-4">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {clients.map((client) => (
//             <tr key={client.id} className="hover:bg-[#F2F9FF] transition">
//               <td className="p-4">{client.id}</td>
//               <td className="p-4">{client.agence}</td>
//               <td className="p-4">{client.type}</td>
//               <td className="p-4">{client.nature}</td>
//               <td className="p-4">{client.reference}</td>
//               <td className="p-4 font-medium text-blue-600">{client.codeClient}</td>
//               <td className="p-4">{client.numeroFacture}</td>
//               <td className="p-4">
//                 <div className="flex items-center gap-1 whitespace-nowrap">
//                   {/* Bouton Visualiser - Version améliorée */}
//                   <button
//                     onClick={() => onViewData(client)}
//                     // className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-xs font-medium shadow hover:shadow-md transition-all hover:scale-105 active:scale-95"
//                     className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-xs font-medium shadow hover:shadow-md transition-all hover:shadow-md transition-all hover:scale-105 active:scale-95"
//                   >
//                     Visualiser les données
//                   </button>

//                   {/* Bouton Modifier - Version améliorée */}
//                   <button
//                     onClick={() => onEdit(client.id)}
//                     className="p-2 rounded-full hover:bg-yellow-100 text-yellow-600 transition-colors hover:rotate-12 hover:scale-110 active:scale-95"
//                     title="Modifier"
//                   >
//                     <Pencil className="w-4 h-4" />
//                   </button>

//                   {/* Bouton Supprimer - Version améliorée */}
//                   <button
//                     onClick={() => onDelete(client.id)}
//                     className="p-2 rounded-full hover:bg-red-100 text-red-600 transition-colors hover:-rotate-12 hover:scale-110 active:scale-95"
//                     title="Supprimer"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ClientTable;
import React from 'react';
import { Trash2, Pencil } from 'lucide-react';

const ClientTable = ({ users, onEdit, onDelete, onViewData }) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow bg-white">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-100 text-left">
        {/* <thead className="bg-[#FBF8EF] text-left"> */}
          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">Code Client</th> 
            <th className="p-4">Nom</th>
            <th className="p-4">Prénom</th>
            <th className="p-4">Date de Naissance</th>
            <th className="p-4">Adresse</th>
            <th className="p-4">Téléphone</th>
            <th className="p-4">Email</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-[#F2F9FF] transition">
              <td className="p-4">{user.id}</td>
              {/* <td className="p-4">{user.code_client}</td>  */}
              <td className="p-4 text-blue-600 font-semibold ">{user.code_client}</td>
              <td className="p-4 font-medium">{user.nom}</td>
              <td className="p-4">{user.prenom}</td>
              <td className="p-4">{user.date_naissance}</td>
              <td className="p-4">{user.adresse}</td>
              <td className="p-4">{user.telephone}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <button
                    onClick={() => onViewData(user)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-xs font-medium shadow hover:shadow-md transition-all hover:scale-105 active:scale-95"
                  >
                    Visualiser les données
                  </button>

                  <button
                    onClick={() => onEdit(user.id)}
                    className="p-2 rounded-full hover:bg-yellow-100 text-yellow-600 transition-colors hover:rotate-12 hover:scale-110 active:scale-95"
                    title="Modifier"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onDelete(user.id)}
                    className="p-2 rounded-full hover:bg-red-100 text-red-600 transition-colors hover:-rotate-12 hover:scale-110 active:scale-95"
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
