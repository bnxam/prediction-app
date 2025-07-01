// import { X } from 'lucide-react';
// import { FaGoogle } from 'react-icons/fa';
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Connexion = ({ onClose, onSwitchToRegister, isProcessing, onLoginSubmit }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   onLoginSubmit({ email, password, rememberMe });
//   // };
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const response = await fetch("http://localhost:8000/auth/login", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/x-www-form-urlencoded",
//   //       },
//   //       body: new URLSearchParams({
//   //         username: email,
//   //         password: password,
//   //       }),
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error("Échec de la connexion");
//   //     }

//   //     const data = await response.json();
//   //     localStorage.setItem("token", data.access_token);

//   //     // Redirection vers la page profil
//   //     window.location.href = "/profilclient";
//   //   } catch (err) {
//   //     alert("Erreur : " + err.message);
//   //   }
//   // };
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // 👤 Tentative de connexion client
//       // const response = await axios.post(
//       //   'http://localhost:8000/login',
//       //   new URLSearchParams({
//       //     username: email,
//       //     password: password,
//       //   }),
//       //   {
//       //     headers: {
//       //       'Content-Type': 'application/x-www-form-urlencoded',
//       //     },
//       //   }
//       // );
//       const response = await axios.post(
//         'http://localhost:8000/auth/login',
//         new URLSearchParams({
//           username: email,
//           password: password,
//         }),
//         {
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//         }
//       );


//       const token = response.data.access_token;
//       localStorage.setItem('token', token);
//       localStorage.setItem('role', 'client');
//       navigate('/profilclient');
//     } catch (clientError) {
//       try {
//         // 👨‍💼 Tentative de connexion admin
//         const response = await axios.post('http://localhost:8000/admin/login', {
//           email: email,
//           mdp: password,
//         });

//         const token = response.data.access_token;
//         localStorage.setItem('token', token);
//         localStorage.setItem('role', 'admin');
//         navigate('/profil');
//       } catch (adminError) {
//         alert('Email ou mot de passe incorrect.');
//         console.error('Échec de connexion client ET admin');
//       }
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20">
//       <div className="bg-white rounded-lg shadow-md w-full max-w-md mx-4 border border-gray-200">
//         <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
//           <h3 className="text-lg font-semibold text-gray-800">Connexion</h3>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <div className="p-6">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="votre@email.com"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe*</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="••••••••"
//                 required
//                 minLength="6"
//               />
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={() => setRememberMe(!rememberMe)}
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-2 text-sm text-gray-600">Se souvenir de moi</label>
//               </div>
//               <a href="#" className="text-sm text-blue-600 hover:underline">Mot de passe oublié ?</a>
//             </div>

//             <button
//               type="submit"
//               disabled={isProcessing}
//               className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
//             >
//               {isProcessing ? (
//                 <div className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Connexion...
//                 </div>
//               ) : 'Se connecter'}
//             </button>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Connexion;

import { X } from 'lucide-react';
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Connexion = ({ onClose, onSwitchToRegister, isProcessing, onLoginSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/auth/login',
        new URLSearchParams({ username: email, password }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('role', 'client');
      navigate('/profilclient');
    } catch (clientError) {
      try {
        const response = await axios.post('http://localhost:8000/admin/login', {
          email, mdp: password
        });
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('role', 'admin');
        navigate('/profil');
      } catch (adminError) {
        alert('Email ou mot de passe incorrect.');
        console.error('Échec de connexion client ET admin');
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-blue-100/20">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 border border-blue-200">
        <div className="px-6 py-4 border-b border-blue-200 flex justify-between items-center bg-blue-50 rounded-t-xl">
          <h3 className="text-lg font-semibold text-blue-700">Connexion à votre espace</h3>
          <button onClick={onClose} className="text-blue-500 hover:text-blue-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">Adresse e-mail *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="ex: example@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-800 mb-1">Mot de passe *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="••••••••"
                required
                minLength="6"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                />
                <label className="ml-2 text-sm text-blue-700">Se souvenir de moi</label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">Mot de passe oublié ?</a>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion...
                </div>
              ) : 'Se connecter'}
            </button>

            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
