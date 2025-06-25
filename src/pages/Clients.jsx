import React, { useState, useEffect } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';

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
                const response = await axios.get('http://localhost:8000/users/', {
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

    const handleAddUser = (newUser) => {
        console.log("Les infos à sauvegarder :", newUser);

        axios.post('http://localhost:8000/users/', newUser)

            .then(() => axios.get('http://localhost:8000/users/'))
            .then(response => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Erreur lors de l'ajout :", error);
                if (error.response) {
                    console.error("Détails de l'erreur :", error.response.data);
                }
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
            await axios.put(`http://localhost:8000/${updatedUser.id}`, updatedUser);
            const response = await axios.get('http://localhost:8000/users/');
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
    const handleViewUserData = async (user) => {
        try {
            // Récupère les données réelles depuis l'API
            const response = await axios.get(`http://localhost:8000/users/${user.id}`);
            console.log(response)
            setViewUser(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des données:", error);
        }
    };


    console.log("Utilisateurs reçus depuis l'API :", users);

    const handleDelete = async (userId) => {
        if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;

        try {
            await axios.delete(`http://localhost:8000/users/${userId}`);
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

            <div className="flex-1 p-8 pt-[120px] overflow-auto">
                {/* <h1 className="text-xl font-semibold mb-4">
                    {viewUser ? `Données de l'utilisateur ${viewUser.nom}` : ''}
                </h1> */}

                {!viewUser ? (
                    <>
                        {/* <div className="flex items-center gap-4 mb-6">
                            <ClientSearch
                                searchValue={search}
                                onSearchChange={setSearch}
                                onAddClient={() => setIsModalOpen(true)}
                            />
                            <div className="bg-white ">{nbusers}</div>
                        </div> */}
                        <div className="flex items-center mb-6">
                            {/* Barre de recherche (largeur auto) */}
                            <ClientSearch
                                searchValue={search}
                                onSearchChange={setSearch}
                                onAddClient={() => setIsModalOpen(true)}
                                clientsCount={users.length}
                            />

                            {/* Espace restant avec centrage du bloc client */}
                            
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