// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ProSidebarProvider } from 'react-pro-sidebar';
// import CustomSidebar from '../components/CustomSidebar';
// import ProfileInfo from '../components/profilComponents/ProfileInfo';
// import DateSelector from '../components/profilComponents/DateSelector';
// import UserBio from '../components/profilComponents/UserBio';
// import axios from 'axios';

// export default function Profil() {
//     const [user, setUser] = useState(null);
//     const [activeTab, setActiveTab] = useState('profile');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const role = localStorage.getItem('role');
//         if (role !== 'admin') {
//             navigate('/connexion');
//             return;
//         }

//         const token = localStorage.getItem('token');
//         if (!token) {
//             navigate('/connexion');
//             return;
//         }

//         axios.get('http://127.0.0.1:8000/admin/profile', {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         })
//         .then((res) => {
//             setUser({
//                 name: res.data.sub, // le champ `sub` dans le token (email)
//                 email: res.data.sub,
//                 phone: "", // À remplir si dispo dans d'autres endpoints
//                 address: "", // Idem
//                 photoUrl: "", // À gérer plus tard
//             });
//         })
//         .catch((err) => {
//             console.error("Erreur lors du chargement du profil admin :", err);
//             navigate('/connexion');
//         });
//     }, [navigate]);

//     if (!user) return <div className="p-8 text-red-500">Chargement...</div>;

//     return (
//         // <div className="flex h-screen bg-gray-70">
//         //     <ProSidebarProvider>
//         //         <CustomSidebar />
//         //     </ProSidebarProvider>
//         //     <div className="flex-1 p-8 pt-[90px] overflow-auto">
               
//         //             <ProfileInfo user={user} />
              
//         //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         //                 <div className="md:col-span-2">
//         //                     <DateSelector />
//         //                 </div>
//         //                 <div className="md:col-span-1">
//         //                     <UserBio />
//         //                 </div>
//         //             </div>
                
//         //     </div>
//         // </div>
//         <div className="flex h-screen bg-gray-70">
//   <ProSidebarProvider>
//     <CustomSidebar />
//   </ProSidebarProvider>

//   <div className="flex-1 p-8 pt-[90px] overflow-auto">
//     {/* Conteneur principal en deux colonnes */}
//     <div className="flex flex-col md:flex-row gap-8">
//       {/* Colonne gauche : Profil */}
//       <div className="w-full md:w-2/3 mt-6">
//         <ProfileInfo user={user} />
//       </div>

//       {/* Colonne droite : Date + Bio */}
//       <div className="w-full md:w-1/3 space-y-6">
//         <DateSelector />
//         <UserBio />
//       </div>
//     </div>
//   </div>
// </div>

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
          name: res.data.nom_entp || "",
          email: res.data.email,
          phone: res.data.phone || "",
          address: res.data.address || "",
          // photoUrl: res.data.pdp || "",
          photoUrl: res.data.pdp ? `http://127.0.0.1:8000/uploads/${res.data.pdp}` : "",
          bio: res.data.note || "",

        });
      })
      .catch((err) => {
        console.error("Erreur lors du chargement du profil admin :", err);
        navigate('/connexion');
      });
  }, [navigate]);


  if (!user) return <div className="p-8 text-red-500">Chargement...</div>;

  return (
    // <div className="flex h-screen bg-gray-70">
    //     <ProSidebarProvider>
    //         <CustomSidebar />
    //     </ProSidebarProvider>
    //     <div className="flex-1 p-8 pt-[90px] overflow-auto">

    //             <ProfileInfo user={user} />

    //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    //                 <div className="md:col-span-2">
    //                     <DateSelector />
    //                 </div>
    //                 <div className="md:col-span-1">
    //                     <UserBio />
    //                 </div>
    //             </div>

    //     </div>
    // </div>
    <div className="flex h-screen bg-gray-70">
      <ProSidebarProvider>
        <CustomSidebar />
      </ProSidebarProvider>

      <div className="flex-1 p-8 pt-[90px] overflow-auto">
        {/* Conteneur principal en deux colonnes */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Colonne gauche : Profil */}
          <div className="w-full md:w-2/3 mt-6">
            <ProfileInfo user={user} />
          </div>

          {/* Colonne droite : Date + Bio */}
          <div className="w-full md:w-1/3 space-y-6">
            <DateSelector />
            <UserBio initialBio={user.bio} />
          </div>
        </div>
      </div>
    </div>

  );
}
