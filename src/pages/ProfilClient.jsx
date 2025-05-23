import React from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import SidebarClient from '../components/SidebarClient';
import ProfilClientInfo from '../components/profilclientComponent/ProfilClientInfo';

export default function ProfilClient() {
    const user = {
        name: "Dihya",
        email: "dihya@example.com",
        phone: "+33 6 12 34 56 78",
        address: "Tizi Ahmed, Tichy, Bejaia",
        photoUrl: ""
    };

    return (
        // <div className="p-8 min-h-screen bg-gray-100">
        //     <ProfilClientInfo user={client} />
        // </div>
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
