
// // pages/Clients.jsx
// import React, { useState } from 'react';
// import { ProSidebarProvider } from 'react-pro-sidebar';

// // Import des composants
// import CustomSidebar from '../components/CustomSidebar';
// import ClientSearch from '../components/clientComponent/ClientSearch';
// import ClientTable from '../components/clientComponent/ClientTable';
// import AddClientModal from '../components/clientComponent/AddClientModal';
// import EditClientModal from '../components/clientComponent/EditClientModal';
// import ClientDataViewer from '../components/clientComponent/ClientDataViewer'; // 👈 Affichage des données client

// // Données fictives pour débuter (tu peux les remplacer par un fetch plus tard)
// const dummyClients = [
//     {
//         id: 1,
//         agence: 'Paris',
//         type: 'Entreprise',
//         nature: 'Privée',
//         reference: 'REF123',
//         codeClient: 'CL001',
//         numeroFacture: 'FCT789',
//         data: generateDummyData(), // 👈 Données simulées
//     },
//     {
//         id: 2,
//         agence: 'Lyon',
//         type: 'Particulier',
//         nature: 'Publique',
//         reference: 'REF456',
//         codeClient: 'CL002',
//         numeroFacture: 'FCT456',
//         data: generateDummyData(),
//     },
// ];

// // Fonction utilitaire : génère 12 valeurs aléatoires (pour les mois)
// function generateDummyData() {
//     const data = [];
//     for (let i = 1; i <= 12; i++) {
//         data.push({
//             month: `2025-${i < 10 ? '0' + i : i}`,
//             value: Math.floor(Math.random() * 1000),
//         });
//     }
//     return data;
// }

// const Clients = () => {
//     // État pour la recherche dans la barre
//     const [search, setSearch] = useState('');

//     // Liste des clients (initialisée avec les clients fictifs)
//     const [clients, setClients] = useState(dummyClients);

//     // État du modal d'ajout
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     // État du modal d'édition
//     const [editModalOpen, setEditModalOpen] = useState(false);
//     const [selectedClient, setSelectedClient] = useState(null); // Client à éditer

//     // État du client sélectionné pour visualiser les données
//     const [viewClient, setViewClient] = useState(null);

//     // Filtrage en fonction du champ de recherche
//     const filteredClients = clients.filter((client) =>
//         client.codeClient.toLowerCase().includes(search.toLowerCase())
//     );

//     // Ajout d'un nouveau client
//     const handleAddClient = (newClient) => {
//         const newId = clients.length + 1;
//         setClients([
//             ...clients,
//             { id: newId, ...newClient, data: generateDummyData() }, // Ajoute aussi des données fictives
//         ]);
//     };

//     // Lorsqu'on clique sur "Éditer"
//     const handleEditClient = (clientId) => {
//         const client = clients.find((c) => c.id === clientId);
//         setSelectedClient(client);
//         setEditModalOpen(true);
//     };

//     // Sauvegarde de l'édition d'un client
//     const handleSaveEdit = (updatedClient) => {
//         setClients((prev) =>
//             prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
//         );
//     };

//     // Lorsqu'on clique sur "Visualiser les données"
//     const handleViewClientData = (client) => {
//         setViewClient(client);
//     };

//     return (
//         <div className="flex h-screen bg-gray-70">
//             {/* Sidebar fixe à gauche */}
//             <ProSidebarProvider>
//                 <CustomSidebar />
//             </ProSidebarProvider>

//             {/* Contenu principal à droite */}
//             <div className="flex-1 p-8 overflow-auto">
//                 <h1 className="text-xl font-semibold mb-4">Liste des Clients</h1>

//                 {/* Barre de recherche + bouton d'ajout */}
//                 <div className="flex items-center gap-4 mb-6">
//                     <ClientSearch
//                         searchValue={search}
//                         onSearchChange={setSearch}
//                         onAddClient={() => setIsModalOpen(true)}
//                     />
//                 </div>

//                 {/* Modal pour ajouter un client */}
//                 <AddClientModal
//                     isOpen={isModalOpen}
//                     onClose={() => setIsModalOpen(false)}
//                     onSave={handleAddClient}
//                 />

//                 {/* Tableau des clients avec boutons Éditer / Supprimer / Visualiser */}
//                 <ClientTable
//                     clients={filteredClients}
//                     onEdit={handleEditClient}
//                     onDelete={(id) =>
//                         setClients((prev) => prev.filter((c) => c.id !== id))
//                     }
//                     onViewData={handleViewClientData} // 👈 handler pour voir les données
//                 />

//                 {/* Modal pour éditer un client */}
//                 <EditClientModal
//                     isOpen={editModalOpen}
//                     onClose={() => setEditModalOpen(false)}
//                     client={selectedClient}
//                     onSave={handleSaveEdit}
//                 />

//                 {/* Affichage du dashboard avec stats, graph, tableau */}

//                 {viewClient && (
//                     <ClientDataViewer client={viewClient} />
//                 )}


//             </div>
//         </div>
//     );
// };

// export default Clients;
// pages/Clients.jsx
import React, { useState } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';

// Composants
import CustomSidebar from '../components/CustomSidebar';
import ClientSearch from '../components/clientComponent/ClientSearch';
import ClientTable from '../components/clientComponent/ClientTable';
import AddClientModal from '../components/clientComponent/AddClientModal';
import EditClientModal from '../components/clientComponent/EditClientModal';
import ClientDataViewer from '../components/clientComponent/ClientDataViewer';

// Données fictives
const dummyClients = [
    {
        id: 1,
        agence: 'Paris',
        type: 'Entreprise',
        nature: 'Privée',
        reference: 'REF123',
        codeClient: 'CL001',
        numeroFacture: 'FCT789',
        // data: generateDummyData(),
        ...generateDummyData(),

    },
    {
        id: 2,
        agence: 'Lyon',
        type: 'Particulier',
        nature: 'Publique',
        reference: 'REF456',
        codeClient: 'CL002',
        numeroFacture: 'FCT456',
        // data: generateDummyData(),
        ...generateDummyData(),

    },
];

function generateDummyData() {
  const data = [
    { month: '2025-01', value: 100 },
    { month: '2025-02', value: 200 },
    { month: '2025-03', value: 180 },
    { month: '2025-04', value: 220 },
  ];

  const predictions = [
    { month: '2025-05', value: 240 },
    { month: '2025-06', value: 260 },
  ];

  return { data, predictions };
}


const Clients = () => {
    const [search, setSearch] = useState('');
    const [clients, setClients] = useState(dummyClients);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [viewClient, setViewClient] = useState(null); // 👈 Contrôle de la vue

    const filteredClients = clients.filter((client) =>
        client.codeClient.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddClient = (newClient) => {
        const newId = clients.length + 1;
        setClients([
            ...clients,
            { id: newId, ...newClient, data: generateDummyData() },
        ]);
    };

    const handleEditClient = (clientId) => {
        const client = clients.find((c) => c.id === clientId);
        setSelectedClient(client);
        setEditModalOpen(true);
    };

    const handleSaveEdit = (updatedClient) => {
        setClients((prev) =>
            prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
        );
    };

    const handleViewClientData = (client) => {
        setViewClient(client);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <ProSidebarProvider>
                <CustomSidebar />
            </ProSidebarProvider>

            <div className="flex-1 p-8 overflow-auto">
                <h1 className="text-xl font-semibold mb-4">
                    {viewClient ? `Données du client ${viewClient.codeClient}` : 'Liste des Clients'}
                </h1>

                {/* 👉 Vue conditionnelle */}
                {!viewClient ? (
                    <>
                        <div className="flex items-center gap-4 mb-6">
                            <ClientSearch
                                searchValue={search}
                                onSearchChange={setSearch}
                                onAddClient={() => setIsModalOpen(true)}
                            />
                        </div>

                        <AddClientModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSave={handleAddClient}
                        />

                        <ClientTable
                            clients={filteredClients}
                            onEdit={handleEditClient}
                            onDelete={(id) =>
                                setClients((prev) => prev.filter((c) => c.id !== id))
                            }
                            onViewData={handleViewClientData}
                        />

                        <EditClientModal
                            isOpen={editModalOpen}
                            onClose={() => setEditModalOpen(false)}
                            client={selectedClient}
                            onSave={handleSaveEdit}
                        />
                    </>
                ) : (
                    <ClientDataViewer
                        client={viewClient}
                        onBack={() => setViewClient(null)} // 👈 retour à la liste
                    />
                )}
            </div>
        </div>
    );
};

export default Clients;
