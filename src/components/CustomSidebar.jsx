import React, { useState } from 'react';
import { Sidebar as ProSidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { FaBars, FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

import '../assets/css/CustomSidebar.css'
import LogoProfil from '../assets/images/portrait.jpg';
import { Link } from 'react-router-dom'; // Ajouter ce import



function CustomSidebar() {
  const { collapseSidebar } = useProSidebar();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    collapseSidebar();
    setCollapsed(!collapsed);
  };

  return (
    <div className="layout-container">
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>

        <Menu
          menuItemStyles={{
            button: {
              color: '#fff',
              '&:hover': {
                backgroundColor: '#ECDCAB',
                color: '#BF932A',
              },
            },
          }}
        >
          {/* Bouton pour ouvrir/fermer */}
          <MenuItem
            icon={<FaBars />}
            onClick={toggleSidebar}
            style={{ marginBottom: '20px' }}
          >
            {collapsed ? '' : 'Menu'}
          </MenuItem>

          {/* Image Profil */}
          <MenuItem
           icon={<img src={LogoProfil} alt="Profil" style={{ width: '25px', height: '25px', borderRadius: '50%' }} />}
          
          >
          Profil
          </MenuItem>

          {/* Autres liens */}
          <MenuItem icon={<FaHome />} >Dashboard</MenuItem>
          <MenuItem icon={<FaUser />} >Historique</MenuItem>
          <MenuItem icon={<FaCog />} >Prédiction</MenuItem>
         </Menu>

        {/* Partie Déconnexion tout en bas */}
        <div style={{ flexGrow: 1 }}></div> {/* Espace vide pour pousser Déconnexion en bas */}

        <Menu
          menuItemStyles={{
            button: {
              color: '#fff',
              '&:hover': {
                backgroundColor: '#ECDCAB',
                color: '#BF932A',
              },
            },
          }}
        >
          <MenuItem icon={<FaSignOutAlt />}>Déconnexion</MenuItem>
        </Menu>

      </div>

      <div className="content-container">
        {/* Ton contenu de page ici */}
      </div>
    </div>
  );
}

export default CustomSidebar;
