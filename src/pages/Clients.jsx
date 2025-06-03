// import React, { useState } from 'react';
// import { ProSidebarProvider } from 'react-pro-sidebar';

// // Composants
// import CustomSidebar from '../components/CustomSidebar';
// import ClientSearch from '../components/clientComponent/ClientSearch';
// import ClientTable from '../components/clientComponent/ClientTable';
// import AddClientModal from '../components/clientComponent/AddClientModal';
// import EditClientModal from '../components/clientComponent/EditClientModal';
// import ClientDataViewer from '../components/clientComponent/ClientDataViewer';

// // Données fictives
// const dummyClients = [
//     {
//         id: 1,
//         agence: 'Paris',
//         type: 'Entreprise',
//         nature: 'Privée',
//         reference: 'REF123',
//         codeClient: 'CL001',
//         numeroFacture: 'FCT789',
//         // data: generateDummyData(),
//         ...generateDummyData(),

//     },
//     {
//         id: 2,
//         agence: 'Lyon',
//         type: 'Particulier',
//         nature: 'Publique',
//         reference: 'REF456',
//         codeClient: 'CL002',
//         numeroFacture: 'FCT456',
//         // data: generateDummyData(),
//         ...generateDummyData(),

//     },
// ];

// function generateDummyData() {
//   const data = [
//     { month: '2025-01', value: 100 },
//     { month: '2025-02', value: 200 },
//     { month: '2025-03', value: 180 },
//     { month: '2025-04', value: 220 },
//   ];

//   const predictions = [
//     { month: '2025-05', value: 240 },
//     { month: '2025-06', value: 260 },
//   ];

//   return { data, predictions };
// }


// const Clients = () => {
//     const [search, setSearch] = useState('');
//     const [clients, setClients] = useState(dummyClients);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [editModalOpen, setEditModalOpen] = useState(false);
//     const [selectedClient, setSelectedClient] = useState(null);
//     const [viewClient, setViewClient] = useState(null); // 👈 Contrôle de la vue

//     const filteredClients = clients.filter((client) =>
//         client.codeClient.toLowerCase().includes(search.toLowerCase())
//     );

//     const handleAddClient = (newClient) => {
//         const newId = clients.length + 1;
//         setClients([
//             ...clients,
//             { id: newId, ...newClient, data: generateDummyData() },
//         ]);
//     };

//     const handleEditClient = (clientId) => {
//         const client = clients.find((c) => c.id === clientId);
//         setSelectedClient(client);
//         setEditModalOpen(true);
//     };

//     const handleSaveEdit = (updatedClient) => {
//         setClients((prev) =>
//             prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
//         );
//     };

//     const handleViewClientData = (client) => {
//         setViewClient(client);
//     };

//     return (
//         <div className="flex h-screen bg-gray-100">
//             <ProSidebarProvider>
//                 <CustomSidebar />
//             </ProSidebarProvider>

//             <div className="flex-1 p-8 overflow-auto">
//                 <h1 className="text-xl font-semibold mb-4">
//                     {viewClient ? `Données du client ${viewClient.codeClient}` : 'Liste des Clients'}
//                 </h1>

//                 {/* 👉 Vue conditionnelle */}
//                 {!viewClient ? (
//                     <>
//                         <div className="flex items-center gap-4 mb-6">
//                             <ClientSearch
//                                 searchValue={search}
//                                 onSearchChange={setSearch}
//                                 onAddClient={() => setIsModalOpen(true)}
//                             />
//                         </div>

//                         <AddClientModal
//                             isOpen={isModalOpen}
//                             onClose={() => setIsModalOpen(false)}
//                             onSave={handleAddClient}
//                         />

//                         <ClientTable
//                             clients={filteredClients}
//                             onEdit={handleEditClient}
//                             onDelete={(id) =>
//                                 setClients((prev) => prev.filter((c) => c.id !== id))
//                             }
//                             onViewData={handleViewClientData}
//                         />

//                         <EditClientModal
//                             isOpen={editModalOpen}
//                             onClose={() => setEditModalOpen(false)}
//                             client={selectedClient}
//                             onSave={handleSaveEdit}
//                         />
//                     </>
//                 ) : (
//                     <ClientDataViewer
//                         client={viewClient}
//                         onBack={() => setViewClient(null)} // 👈 retour à la liste
//                     />
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Clients;

import React, { useState, useEffect } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';

// Composants
import CustomSidebar from '../components/CustomSidebar';
import ClientSearch from '../components/clientComponent/ClientSearch';
import ClientTable from '../components/clientComponent/ClientTable';
import AddClientModal from '../components/clientComponent/AddClientModal';
import EditClientModal from '../components/clientComponent/EditClientModal';
import ClientDataViewer from '../components/clientComponent/ClientDataViewer';
import axios from 'axios';

const Clients = () => {
    const [search, setSearch] = useState('');
    // const [users, setUsers] = useState(dummyUsers);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/users/', {
                    params: search ? { code_client: search } : {}
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Erreur lors du chargement des utilisateurs :', error);
            }
        };

        fetchUsers();
    }, [search]);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [viewUser, setViewUser] = useState(null);

    function generateDummyData() {
    const data = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        data.unshift({
            date: date.toISOString().split('T')[0],
            valeur: Math.floor(Math.random() * 100) + 1,
        });
    }
    return data;
}


    // const filteredUsers = users.filter((user) =>
    //     user.nom.toLowerCase().includes(search.toLowerCase())
    // );

    // const handleAddUser = (newUser) => {
    //     const newId = users.length + 1;
    //     setUsers([
    //         ...users,
    //         { 
    //             id: newId, 
    //             ...newUser, 
    //             photodeprofil: newUser.photodeprofil || 'https://example.com/default.jpg',
    //             data: generateDummyData() 
    //         },
    //     ]);
    // };

    // CE QUI ETE AJOUTE POUR LE BACKEND 

    // const handleAddUser = async (newUser) => {
    //     try {
    //         const response = await axios.post('http://localhost:8000/users/', newUser);
    //         const addedUser = response.data;

    //         setUsers((prev) => [
    //             ...prev,
    //             {
    //                 ...addedUser,
    //                 photodeprofil: addedUser.photodeprofil || 'https://example.com/default.jpg',
    //                 data: generateDummyData(),
    //             },
    //         ]);
    //     } catch (error) {
    //         if (error.response) {
    //             console.error('Erreur serveur:', error.response.data);
    //             alert(`Erreur : ${error.response.data.detail}`);
    //         } else {
    //             console.error('Erreur réseau:', error.message);
    //             alert('Erreur réseau : ' + error.message);
    //         }
    //     }
    // };
    const handleAddUser = (newUser) => {
        axios.post('http://127.0.0.1:8000/users/', newUser)
            .then(() => {
                // Recharge tous les utilisateurs depuis l’API
                return axios.get('http://127.0.0.1:8000/users/');
            })
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de l'ajout :", error);
            });
    };

    // modification du user 
    const handleEdit = (userId) => {
        const user = users.find((u) => u.id === userId);
        setSelectedUser(user);
        setEditModalOpen(true); // tu utilises déjà cet état
    };

    const handleUpdateUser = async (updatedUser) => {
        try {
            await axios.put(`http://127.0.0.1:8000/users/${updatedUser.id}`, updatedUser);
            const response = await axios.get('http://127.0.0.1:8000/users/');
            setUsers(response.data);
            setEditModalOpen(false);
            setSelectedUser(null);
        } catch (error) {
            console.error("Erreur lors de la mise à jour :", error);
        }
    };


    const handleSaveEdit = (updatedUser) => {
        setUsers((prev) =>
            prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );
    };

    // const handleViewUserData = (user) => {
    //     setViewUser(user);
    // };
    const handleViewUserData = (user) => {
    const data = generateDummyData();
    const predictions = generateDummyData().map(d => ({
        ...d,
        valeur: d.valeur + 10, // pour voir la différence
    }));

    setViewUser({
        ...user,
        data,
        predictions,
    });
};

    console.log("Utilisateurs reçus depuis l'API :", users);

    const handleDelete = async (userId) => {
        if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/users/${userId}`);
            // Mise à jour de la liste sans recharger la page
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };


    return (
        <div className="flex h-screen bg-gray-100">
            <ProSidebarProvider>
                <CustomSidebar />
            </ProSidebarProvider>

            <div className="flex-1 p-8 overflow-auto">
                <h1 className="text-xl font-semibold mb-4">
                    {viewUser ? `Données de l'utilisateur ${viewUser.nom}` : 'Liste des Utilisateurs'}
                </h1>

                {!viewUser ? (
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
                            onSave={handleAddUser}
                        />


                        <ClientTable
                            users={users} // <- plus besoin de filteredUsers
                            onEdit={handleEdit}

                            // onDelete={(id) =>
                            //     setUsers((prev) => prev.filter((u) => u.id !== id))
                            // }
                            onDelete={handleDelete}
                            onViewData={handleViewUserData}
                        />

                        <EditClientModal
                            isOpen={editModalOpen}
                            onClose={() => setEditModalOpen(false)}
                            user={selectedUser}
                            onSave={handleUpdateUser}

                        />
                    </>
                ) : (
                    <ClientDataViewer
                        user={viewUser}
                        onBack={() => setViewUser(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default Clients;
