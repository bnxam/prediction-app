import React from 'react';

const ProfileCard = ({ name, email, phone, address }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-500 text-2xl">👤</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{name}</h2>
            <p>{email}</p>
            <p>{phone}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">{address}</p>
        </div>
      </div>
    );
  };
  
  export default ProfileCard;
  
  