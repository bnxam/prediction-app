import React, { useState, useEffect } from 'react';
import { Sidebar as ProSidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { FaBars, FaHome, FaUser, FaCog, FaSignOutAlt, FaClock, FaChartLine, FaPeopleArrows, FaPersonBooth } from 'react-icons/fa';
import LogoProfil from '../assets/images/portrait.jpg';
import '../assets/css/CustomSidebar.css';
import { Link, useLocation } from 'react-router-dom';
import { FaArrowsDownToPeople, FaPeopleGroup, FaPeoplePulling, FaPeopleRobbery, FaPerson, FaPersonBurst, FaPersonChalkboard, FaPersonCircleCheck, FaPersonCircleMinus } from 'react-icons/fa6';

function CustomSidebar() {
  const { collapseSidebar } = useProSidebar();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); 
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);
  const location = useLocation();

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
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    collapseSidebar();
  };

  // Configuration des items de menu
  const menuItems = [
    { path: '/profilclient', icon: <img src={LogoProfil} alt="Profil" style={{ width: '25px', height: '25px', borderRadius: '50%' }} />, label: 'Profil' },
   { path: '/dashboardclient', icon: <FaHome />, label: 'Dashboard' },
  ];

  return (
    <>
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
            button: ({ level, active }) => ({
              color: active ? '#364958' : '#fff',
              backgroundColor: active ? '#94b4c1' : 'transparent',
              borderRight: active ? '4px solid rgb(47, 78, 104)' : 'none',
              '&:hover': {
                backgroundColor: '#94b4c1',
                color: '#364958',
                borderRight: '4px solid rgb(47, 78, 104)'
              },
            }),
          }}
        >
          <div style={{ height: '60px' }}></div>
          
          {menuItems.map((item) => (
            <MenuItem 
              key={item.path}
              icon={item.icon}
              component={<Link to={item.path} />}
              active={location.pathname === item.path}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>

        <div style={{ flexGrow: 1 }}></div>

        <Menu
          menuItemStyles={{
            button: {
              color: '#fff',
              '&:hover': {
                backgroundColor: '#94b4c1',
                color: '#364958',
                borderRight: '4px solid #364958'
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