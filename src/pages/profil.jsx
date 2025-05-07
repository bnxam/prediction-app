import React from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import CustomSidebar from '../components/CustomSidebar';
import ProfileInfo from '../components/profilComponents/ProfileInfo';
import DateSelector from '../components/profilComponents/DateSelector';
import UserBio from '../components/profilComponents/UserBio';
export default function Profil() {
    const user = {
        name: "Dihya",
        email: "dihya@example.com",
        phone: "+33 6 12 34 56 78",
        address: "Tizi Ahmed, Tichy, Bejaia",
        photoUrl: ""
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar fixe à gauche avec largeur bien définie */}
            <div className="fixed top-0 left-0 h-full w-64 z-50 bg-white shadow-md">
                <ProSidebarProvider>
                    <CustomSidebar />
                </ProSidebarProvider>
            </div>

            {/* Contenu principal avec un décalage à droite de la largeur de la sidebar */}
            <main className="ml-64 w-full p-4 sm:p-8 space-y-8">
                <ProfileInfo user={user} />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {/* Premier conteneur - Graphique */}
                    <div className="md:col-span-2 h-full  p-4 rounded-2xl ">
                        <DateSelector />
                    </div>

                    {/* Deuxième conteneur - Tableau */}
                    <div className="md:col-span-1 h-full flex flex-col p-4 rounded-2xl ">
                        <UserBio />
                    </div>
                </div>
            </main>
        </div>
    );
}
