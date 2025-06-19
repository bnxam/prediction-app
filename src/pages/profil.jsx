// import React from 'react';
// import { ProSidebarProvider } from 'react-pro-sidebar';
// import CustomSidebar from '../components/CustomSidebar';
// import ProfileInfo from '../components/profilComponents/ProfileInfo';
// import DateSelector from '../components/profilComponents/DateSelector';
// import UserBio from '../components/profilComponents/UserBio';
// export default function Profil() {
//     const user = {
//         name: "Dihya",
//         email: "dihya@example.com",
//         phone: "+33 6 12 34 56 78",
//         address: "Tizi Ahmed, Tichy, Bejaia",
//         photoUrl: ""
//     };

//     return (

//         <div className="flex h-screen bg-gray-70">
//             <ProSidebarProvider>
//                 <CustomSidebar />
//             </ProSidebarProvider>
//             <div className="flex-1 p-8 overflow-auto">
//                 <ProfileInfo user={user} />

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//                     {/* Premier conteneur - Graphique */}
//                     <div className="md:col-span-2 h-full  p-4 rounded-2xl ">
//                         <DateSelector />
//                     </div>

//                     {/* Deuxième conteneur - Tableau */}
//                     <div className="md:col-span-1 h-full flex flex-col p-4 rounded-2xl ">
//                         <UserBio />
//                     </div>
//                 </div>
//             </div>

//         </div>
//     );
// }

// import React, { useEffect, useState } from 'react';
// import { ProSidebarProvider } from 'react-pro-sidebar';
// import CustomSidebar from '../components/CustomSidebar';
// import ProfileInfo from '../components/profilComponents/ProfileInfo';
// import DateSelector from '../components/profilComponents/DateSelector';
// import UserBio from '../components/profilComponents/UserBio';
// // import { useNavigate } from 'react-router-dom';

// export default function Profil() {
//     const user = {
//         name: "Dihya",
//         email: "dihya@example.com",
//         phone: "+33 6 12 34 56 78",
//         address: "Tizi Ahmed, Tichy, Bejaia",
//         photoUrl: ""
//     };
//     // const navigate = useNavigate();

//     const [activeTab, setActiveTab] = useState('profile');

//     // useEffect(() => {
//     //     const role = localStorage.getItem('role');
//     //     if (role !== 'admin') {
//     //         navigate('/connexion'); // ou afficher une erreur
//     //     }
//     // }, [navigate]);

//     return (
//         <div className="flex h-screen bg-gray-70">
//             <ProSidebarProvider>
//                 <CustomSidebar />
//             </ProSidebarProvider>
//             <div className="flex-1 p-8 overflow-auto">
//                 {/* Navigation par onglets */}
//                 <div className="flex border-b border-gray-200 mb-8">
//                     <button
//                         onClick={() => setActiveTab('profile')}
//                         className={`px-4 py-3 font-medium text-sm ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                     >
//                         Profil
//                     </button>
//                     <button
//                         onClick={() => setActiveTab('stats')}
//                         className={`px-4 py-3 font-medium text-sm ${activeTab === 'stats' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
//                     >
//                         Statistiques
//                     </button>
//                 </div>

//                 {/* Contenu des onglets */}
//                 {activeTab === 'profile' ? (
//                     <ProfileInfo user={user} />
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         <div className="md:col-span-2">
//                             <DateSelector />
//                         </div>
//                         <div className="md:col-span-1">
//                             <UserBio />
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import CustomSidebar from '../components/CustomSidebar';
import ProfileInfo from '../components/profilComponents/ProfileInfo';
import DateSelector from '../components/profilComponents/DateSelector';
import UserBio from '../components/profilComponents/UserBio';
import axios from 'axios';

export default function Profil() {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role !== 'admin') {
            navigate('/connexion');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/connexion');
            return;
        }

        axios.get('http://127.0.0.1:8000/admin/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            setUser({
                name: res.data.sub, // le champ `sub` dans le token (email)
                email: res.data.sub,
                phone: "", // À remplir si dispo dans d'autres endpoints
                address: "", // Idem
                photoUrl: "", // À gérer plus tard
            });
        })
        .catch((err) => {
            console.error("Erreur lors du chargement du profil admin :", err);
            navigate('/connexion');
        });
    }, [navigate]);

    if (!user) return <div className="p-8 text-red-500">Chargement...</div>;

    return (
        <div className="flex h-screen bg-gray-70">
            <ProSidebarProvider>
                <CustomSidebar />
            </ProSidebarProvider>
            <div className="flex-1 p-8 pt-[90px] overflow-auto">
                <div className="flex border-b border-gray-200 mb-8">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`px-4 py-3 font-medium text-sm ${activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Profil
                    </button>
                    <button
                        onClick={() => setActiveTab('stats')}
                        className={`px-4 py-3 font-medium text-sm ${activeTab === 'stats' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Statistiques
                    </button>
                </div>

                {activeTab === 'profile' ? (
                    <ProfileInfo user={user} />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <DateSelector />
                        </div>
                        <div className="md:col-span-1">
                            <UserBio />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
