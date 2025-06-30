// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const PasswordModal = ({ onClose }) => {
//   const [form, setForm] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation de chargement
    
//     if (form.newPassword !== form.confirmPassword) {
//       alert("Les mots de passe ne correspondent pas");
//     } else {
//       alert("Mot de passe modifié avec succès (simulé)");
//       onClose();
//     }
//     setIsSubmitting(false);
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 backdrop-blur-sm bg-opacity-40 bg-opacity-70 flex justify-center items-center z-50 p-4"
//     >
//       <motion.div
//         initial={{ y: -50, scale: 0.95 }}
//         animate={{ y: 0, scale: 1 }}
//         exit={{ y: 50, opacity: 0 }}
//         className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white border-opacity-20 relative overflow-hidden"
//       >
//         {/* Effet de décoration */}
//         <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-purple-200 opacity-20"></div>
//         <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-indigo-200 opacity-20"></div>
        
//         <div className="relative z-10">
//           <div className="flex justify-between items-center mb-6">
//             <motion.h2 
//               initial={{ opacity: 0, x: -10 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.1 }}
//               className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
//             >
//               Modifier mon mot de passe
//             </motion.h2>
//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700 text-xl"
//             >
//               &times;
//             </motion.button>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//             >
//               <label className="block text-sm font-medium text-gray-700 mb-1">Ancien mot de passe</label>
//               <input
//                 type="password"
//                 name="currentPassword"
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm"
//                 value={form.currentPassword}
//                 onChange={handleChange}
//                 required
//               />
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//             >
//               <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
//               <input
//                 type="password"
//                 name="newPassword"
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm"
//                 value={form.newPassword}
//                 onChange={handleChange}
//                 required
//               />
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//             >
//               <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer mot de passe</label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm"
//                 value={form.confirmPassword}
//                 onChange={handleChange}
//                 required
//               />
//             </motion.div>

//             <motion.div 
//               className="flex justify-end space-x-4 pt-4"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5 }}
//             >
//               <motion.button
//                 type="button"
//                 onClick={onClose}
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//                 className="px-6 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition-all duration-200 shadow-md"
//               >
//                 Annuler
//               </motion.button>
//               <motion.button
//                 type="submit"
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//                 className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium transition-all duration-200 shadow-lg relative overflow-hidden"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting && (
//                   <motion.span 
//                     className="absolute inset-0 bg-white bg-opacity-20"
//                     initial={{ x: '-100%' }}
//                     animate={{ x: '100%' }}
//                     transition={{ duration: 1.5, repeat: Infinity }}
//                   />
//                 )}
//                 <span className="relative z-10">
//                   {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
//                 </span>
//               </motion.button>
//             </motion.div>
//           </form>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default PasswordModal;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const PasswordModal = ({ onClose }) => {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  if (form.newPassword !== form.confirmPassword) {
    alert("Les mots de passe ne correspondent pas");
    setIsSubmitting(false);
    return;
  }

  try {
    const token = localStorage.getItem("token");
    await axios.put("http://127.0.0.1:8000/admin/change-password", {
      current_password: form.currentPassword,
      new_password: form.newPassword
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    alert("Mot de passe modifié avec succès !");
    onClose();
  } catch (err) {
  console.error("Erreur :", err);
  if (err.response?.data?.detail) {
    alert(err.response.data.detail); // Affiche "Ancien mot de passe incorrect", etc.
  } else {
    alert("Erreur lors du changement de mot de passe");
  }
}


  setIsSubmitting(false);
};


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 backdrop-blur-sm bg-opacity-40 bg-opacity-70 flex justify-center items-center z-50 p-4"
    >
      <motion.div
        initial={{ y: -50, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white border-opacity-20 relative overflow-hidden"
      >
        {/* Effet de décoration */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-purple-200 opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-indigo-200 opacity-20"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <motion.h2 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Modifier mon mot de passe
            </motion.h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">Ancien mot de passe</label>
              <input
                type="password"
                name="currentPassword"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm"
                value={form.currentPassword}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
              <input
                type="password"
                name="newPassword"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm"
                value={form.newPassword}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer mot de passe</label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 shadow-sm"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div 
              className="flex justify-end space-x-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition-all duration-200 shadow-md"
              >
                Annuler
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium transition-all duration-200 shadow-lg relative overflow-hidden"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <motion.span 
                    className="absolute inset-0 bg-white bg-opacity-20"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
                <span className="relative z-10">
                  {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                </span>
              </motion.button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PasswordModal;