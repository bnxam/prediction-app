// import React, { useState, useEffect } from 'react';
// import { Sidebar as ProSidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
// import { FaBars, FaHome, FaUser, FaCog, FaSignOutAlt, FaClock, FaChartLine, FaPeopleArrows, FaPersonBooth } from 'react-icons/fa';
// import LogoProfil from '../assets/images/portrait.jpg';
// import '../assets/css/CustomSidebar.css';
// import { Link, useLocation } from 'react-router-dom';
// import { FaArrowsDownToPeople, FaPeopleGroup, FaPeoplePulling, FaPeopleRobbery, FaPerson, FaPersonBurst, FaPersonChalkboard, FaPersonCircleCheck, FaPersonCircleMinus } from 'react-icons/fa6';

// function CustomSidebar() {
//   const { collapseSidebar } = useProSidebar();
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768); 
//   const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);
//   const location = useLocation();

//   const handleResize = () => {
//     const mobile = window.innerWidth < 768;
//     setIsMobile(mobile);
//     setIsCollapsed(mobile);
//     if (mobile) {
//       collapseSidebar();
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('resize', handleResize);
//     handleResize();
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//     collapseSidebar();
//   };

//   // Configuration des items de menu
//   const menuItems = [
//     { path: '/profilclient', icon: <img src={LogoProfil} alt="Profil" style={{ width: '25px', height: '25px', borderRadius: '50%' }} />, label: 'Profil' },
//    { path: '/dashboardclient', icon: <FaHome />, label: 'Dashboard' },
//   ];

//   return (
//     <>
//       {isMobile && (
//         <button 
//           onClick={toggleSidebar} 
//           className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded sm:hidden"
//         >
//           <FaBars />
//         </button>
//       )}

//       <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
//         <Menu
//           menuItemStyles={{
//             button: ({ level, active }) => ({
//               color: active ? '#364958' : '#fff',
//               backgroundColor: active ? '#94b4c1' : 'transparent',
//               borderRight: active ? '4px solid rgb(47, 78, 104)' : 'none',
//               '&:hover': {
//                 backgroundColor: '#94b4c1',
//                 color: '#364958',
//                 borderRight: '4px solid rgb(47, 78, 104)'
//               },
//             }),
//           }}
//         >
//           <div style={{ height: '60px' }}></div>

//           {menuItems.map((item) => (
//             <MenuItem 
//               key={item.path}
//               icon={item.icon}
//               component={<Link to={item.path} />}
//               active={location.pathname === item.path}
//             >
//               {item.label}
//             </MenuItem>
//           ))}
//         </Menu>

//         <div style={{ flexGrow: 1 }}></div>

//         <Menu
//           menuItemStyles={{
//             button: {
//               color: '#fff',
//               '&:hover': {
//                 backgroundColor: '#94b4c1',
//                 color: '#364958',
//                 borderRight: '4px solid #364958'
//               },
//             },
//           }}
//         >
//           <MenuItem icon={<FaSignOutAlt />}>Déconnexion</MenuItem>
//         </Menu>
//       </div>
//     </>
//   );
// }

// export default CustomSidebar;
import React, { useState, useEffect } from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaClock, FaChartLine, FaBars } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import LogoProfil from '../assets/images/portrait.jpg';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function CustomNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const navigate = useNavigate();

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Configuration des items de menu (adaptée de votre sidebar)
  const menuItems = [
    { path: '/profilclient', icon: <img src={LogoProfil} alt="Profil" className="w-6 h-6 rounded-full" />, label: 'Profil' },
    { path: '/dashboardclient', icon: <FaHome />, label: 'Dashboard' },
  ];
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/"); // 🔁 Redirection vers la page d'accueil
    window.location.reload(); // Pour réinitialiser tous les états React
  };


  return (
    <>
      {/* Navbar Desktop */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-gray-900/90 backdrop-blur-md py-2 shadow-xl' : 'bg-gray-900/80 backdrop-blur-sm py-3'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {/* MON APP */}
              </span>
            </div>

            {/* Menu Desktop */}
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 group ${location.pathname === item.path ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'}`}
                >
                  <span className="mr-2 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                  {location.pathname === item.path && (
                    <span className="ml-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* Bouton Déconnexion Desktop */}
            {/* <div className="hidden md:block ml-4">
              <button className="flex items-center px-4 py-2 rounded-full text-red-400 hover:bg-red-900/30 hover:text-white transition-all duration-300 group">
                <FaSignOutAlt className="mr-2 group-hover:rotate-180 transition-transform" />
                <span>Déconnexion</span>
              </button>
            </div> */}
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 rounded-full text-red-400 hover:bg-red-900/30 hover:text-white transition-all duration-300 group"
            >
              <FaSignOutAlt className="mr-2 group-hover:rotate-180 transition-transform" />
              <span>Déconnexion</span>
            </button>



            {/* Menu Mobile Burger */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none transition-all"
              >
                <FaBars className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-800/95 backdrop-blur-lg border-t border-gray-700 overflow-hidden transition-all duration-300">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-3 py-3 rounded-md text-base font-medium transition-all duration-300 ${location.pathname === item.path ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-300 hover:bg-gray-700'}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                  {location.pathname === item.path && (
                    <span className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                  )}
                </Link>
              ))}
              <div className="px-3 py-3">
                {/* <button className="flex items-center text-red-400 hover:text-white w-full">
                  <FaSignOutAlt className="mr-3" />
                  Déconnexion
                </button> */}
                <button
  onClick={() => {
    setIsMobileMenuOpen(false);
    handleLogout();
  }}
  className="flex items-center text-red-400 hover:text-white w-full"
>
  <FaSignOutAlt className="mr-3" />
  Déconnexion
</button>


              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Espace pour le contenu sous la navbar */}
      <div className="h-20"></div>
    </>
  );
}

export default CustomNavbar;