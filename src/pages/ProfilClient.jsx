
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProSidebarProvider } from 'react-pro-sidebar';
import SidebarClient from '../components/SidebarClient';
import ProfilClientInfo from '../components/profilclientComponent/ProfilClientInfo';

export default function ProfilClient() {
    const [user, setUser] = useState(null);
useEffect(() => {
    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        console.log("Token:", token); // 👈 Ajoute ceci

        if (!token) {
            console.warn("Aucun token trouvé");
            return;
        }

        try {
            const res = await axios.get('http://127.0.0.1:8000/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Données utilisateur :", res.data); // 👈 Ajoute ceci

            const formattedUser = {
                name: `${res.data.nom} ${res.data.prenom}`,
                email: res.data.email,
                phone: res.data.telephone,
                address: res.data.adresse,
                photoUrl: "", // à gérer plus tard
            };

            // setUser(formattedUser);
            setUser(res.data);

        } catch (error) {
            console.error("Erreur lors du chargement du profil :", error);
        }
    };

    fetchUser();
}, []);



if (!user) return <div className="p-8 text-red-500">Chargement... (ou erreur)</div>;

    return (
        <div className="flex h-screen bg-gray-70">
            <ProSidebarProvider>
                <SidebarClient />
            </ProSidebarProvider>
            <div className="flex-1 p-8 overflow-auto">
                <ProfilClientInfo user={user} />
            </div>
        </div>
    );
}
