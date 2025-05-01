
import React, { useState } from 'react';
import Sidebar from '../components/sidebar'; 
import CustomSidebar from '../components/CustomSidebar';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Header from '../components/profilComponent/Header';
import ProfileImage from '../components/profilComponent/ProfileImage';
import CalendarSection from '../components/profilComponent/CalendarSection';
import PaymentsSection from '../components/profilComponent/PaymentsSection';
import LogoutButton from '../components/profilComponent/LogoutButton';

const Profile = () => {
  const [profilePic, setProfilePic] = useState('https://via.placeholder.com/150');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const predictionDates = [
    new Date(2025, 3, 15),
    new Date(2025, 3, 20),
    new Date(2025, 3, 25),
  ];

  const payments = [
    { date: '2025-04-01', amount: '230000 DA' },
    { date: '2025-04-10', amount: '750000 DA' },
    { date: '2025-04-18', amount: '10050 DA' },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const totalPayments = payments.reduce((acc, payment) => {
    const amountNumber = parseFloat(payment.amount.replace(' DA', '').replace('DA', '').replace(' ', ''));
    return acc + amountNumber;
  }, 0);

  return (
    <div className="flex h-screen bg-neutral-200">
          <ProSidebarProvider>
         <CustomSidebar />
      </ProSidebarProvider>
      <div className="flex-1 p-8 overflow-auto" style={{ backgroundColor: '#E5E5E5' }}>
        <Header title="Mon Profil" username="Nom de l'utilisateur" />
        <ProfileImage onImageChange={handleImageChange} />
        <div className="flex space-x-6 mb-8">
          <CalendarSection predictionDates={predictionDates} selectedDate={selectedDate} onDateChange={setSelectedDate} />
          <PaymentsSection payments={payments} totalPayments={totalPayments} />
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Profile;
