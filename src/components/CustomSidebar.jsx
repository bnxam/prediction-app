import React, { useState, useEffect } from 'react';
import { Sidebar as ProSidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { FaBars, FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import LogoProfil from '../assets/images/portrait.jpg';
import '../assets/css/CustomSidebar.css';
import { Link } from 'react-router-dom';

function CustomSidebar() {
  const { collapseSidebar } = useProSidebar();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); 
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);

  const handleResize = () => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setIsCollapsed(mobile);
    if (mobile) {
      collapseSidebar();
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Pour appliquer au premier chargement
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    collapseSidebar();
  };

  return (
    <>
      {/* Bouton burger visible uniquement sur mobile */}
      {isMobile && (
        <button 
          onClick={toggleSidebar} 
          className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded sm:hidden"
        >
          <FaBars />
        </button>
      )}

      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
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
          <div style={{ height: '60px' }}></div> {/* ESPACE AVANT PROFIL */}
          <MenuItem component={<Link to="/profile" />} icon={<img src={LogoProfil} alt="Profil" style={{ width: '25px', height: '25px', borderRadius: '50%' }} />}
          >
          Profil
          </MenuItem>
          <MenuItem icon={<FaHome />} component={<Link to="/dashboard" />}>Dashboard</MenuItem>
          <MenuItem icon={<FaCog />} component={<Link to="/prediction" />}>Prédiction</MenuItem>
          <MenuItem icon={<FaUser />} component={<Link to="/historique" />}>Historique</MenuItem>
        </Menu>

        <div style={{ flexGrow: 1 }}></div>

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
    </>
  );
}

export default CustomSidebar;









