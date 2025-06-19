
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProSidebarProvider } from 'react-pro-sidebar';
import SidebarClient from '../components/SidebarClient';
import ProfilClientInfo from '../components/profilclientComponent/ProfilClientInfo';

export default function ProfilClient() {
    const [user, setUser] = useState(null);
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const token = localStorage.getItem('token');
    //         console.log("Token:", token); // 👈 Ajoute ceci

    //         if (!token) {
    //             console.warn("Aucun token trouvé");
    //             return;
    //         }

    //         try {
    //             const res = await axios.get('http://127.0.0.1:8000/users/me', {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             });

    //             console.log("Données utilisateur :", res.data); // 👈 Ajoute ceci

    //             const formattedUser = {
    //                 name: `${res.data.nom} ${res.data.prenom}`,
    //                 email: res.data.email,
    //                 phone: res.data.telephone,
    //                 address: res.data.adresse,
    //                 photoUrl: "", // à gérer plus tard
    //             };

    //             // setUser(formattedUser);
    //             setUser(res.data);

    //         } catch (error) {
    //             console.error("Erreur lors du chargement du profil :", error);
    //         }
    //     };

    //     fetchUser();
    // }, []);

    // useEffect(() => {
    //     const role = localStorage.getItem('role');
    //     if (role !== 'client') {
    //         navigate('/connexion');
    //     }
    // }, []);

    // useEffect(() => {
    //     const savedUser = localStorage.getItem("user");
    //     if (savedUser) {
    //         setUser(JSON.parse(savedUser));
    //         return;
    //     }

    //     const fetchUser = async () => {
    //         const token = localStorage.getItem('token');
    //         if (!token) return;

    //         try {
    //             const res = await axios.get('http://127.0.0.1:8000/users/me', {
    //                 headers: { Authorization: `Bearer ${token}` },
    //             });
    //             localStorage.setItem("user", JSON.stringify(res.data));
    //             setUser(res.data);
    //         } catch (error) {
    //             console.error("Erreur de chargement :", error);
    //         }
    //     };

    //     fetchUser();
    // }, []);
    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role !== 'client') {
            navigate('/connexion');
        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const res = await axios.get('http://127.0.0.1:8000/users/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data); // Ne plus utiliser localStorage
            } catch (error) {
                console.error("Erreur de chargement :", error);
            }
        };

        fetchUser();
    }, []);

    if (!user) return <div className="p-8 text-red-500"></div>;

    return (
        <div className="flex h-screen bg-gray-70">
            <ProSidebarProvider>
                <SidebarClient  />
            </ProSidebarProvider>
            <div className="flex-1 p-8 pt-[120px] overflow-auto">
                <ProfilClientInfo user={user} />
            </div>
        </div>
    );
}
