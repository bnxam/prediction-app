import React from 'react';
import LogoProfil from '../../assets/images/portrait.jpg';

const ProfileImage = ({ onImageChange }) => (
  <div className="flex flex-col items-center mb-8 p-6 bg-white rounded shadow-md">
    <img
      src={LogoProfil}
      alt="Profil"
      className="w-32 h-32 rounded-full mb-4"
    />
    <button
      onClick={() => document.getElementById('fileInput').click()}
      className="px-4 py-2 rounded text-white"
      style={{ backgroundColor: '#000229' }}
    >
      Modifier la photo de profil
    </button>
    <input
      type="file"
      id="fileInput"
      onChange={onImageChange}
      style={{ display: 'none' }}
    />
  </div>
);

export default ProfileImage;
