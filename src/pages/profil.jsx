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

        <div className="flex h-screen bg-gray-70">
            <ProSidebarProvider>
                <CustomSidebar />
            </ProSidebarProvider>
            <div className="flex-1 p-8 overflow-auto">
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
            </div>
        </div>
    );
}
