// import React, { useState, useEffect } from 'react';

// const EditClientModal = ({ isOpen, onClose, client, onSave }) => {
//     const [formData, setFormData] = useState(client || {});

//     useEffect(() => {
//         setFormData(client || {});
//     }, [client]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = () => {
//         onSave(formData);
//         onClose();
//     };

//     if (!isOpen || !client) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-40 ">
//             <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-lg animate-fade-in">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
//                     Modifier les informations du client
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <label className="text-sm text-gray-600">Agence</label>
//                         <input
//                             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                             name="agence"
//                             value={formData.agence || ''}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div>
//                         <label className="text-sm text-gray-600">Type Client</label>
//                         <input
//                             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                             name="type"
//                             value={formData.type || ''}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div>
//                         <label className="text-sm text-gray-600">Nature</label>
//                         <input
//                             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                             name="nature"
//                             value={formData.nature || ''}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div>
//                         <label className="text-sm text-gray-600">Référence</label>
//                         <input
//                             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                             name="reference"
//                             value={formData.reference || ''}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div>
//                         <label className="text-sm text-gray-600">Code Client</label>
//                         <input
//                             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                             name="codeClient"
//                             value={formData.codeClient || ''}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div>
//                         <label className="text-sm text-gray-600">Numéro Facture</label>
//                         <input
//                             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                             name="numeroFacture"
//                             value={formData.numeroFacture || ''}
//                             onChange={handleChange}
//                         />
//                     </div>
//                 </div>

//                 <div className="flex justify-end mt-6 space-x-3">
//                     <button
//                         onClick={onClose}
//                         className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
//                     >
//                         Annuler
//                     </button>
//                     <button
//                         onClick={handleSubmit}
//                         className="px-4 py-2 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500"
//                     >
//                         Enregistrer
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditClientModal;

import React, { useState, useEffect } from 'react';
import { FiX, FiUser, FiMail, FiPhone, FiHome, FiCalendar, FiKey, FiCode } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const EditClientModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    code_client: '',
    nom: '',
    prenom: '',
    adresse: '',
    telephone: '',
    date_naissance: '',
    email: '',
    // mdp: '',
    fichier_donnees: null,
  });

  // pour gerer l'erreur du format du num de tel  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        code_client: user.code_client || '',
        nom: user.nom || '',
        prenom: user.prenom || '',
        adresse: user.adresse || '',
        telephone: user.telephone || '',
        date_naissance: user.date_naissance || '',
        email: user.email || '',
        // mdp: '',
        fichier_donnees: null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'fichier_donnees') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // pour gerer le format du nom tel 
  const validate = () => {
    const newErrors = {};

    // Validation du téléphone
    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Champ vide';
    } else if (!/^((\+213)|0)(5|6|7)[0-9]{8}$/.test(formData.telephone)) {
      newErrors.telephone = 'Format invalide (ex : 06XXXXXXXX ou +2136XXXXXXXX)';
    }

    return newErrors;
  };



  // const handleSubmit = () => {
  //   onSave({ ...user, ...formData });
  //   onClose();
  // };
  const handleSubmit = () => {
  const newErrors = {};

  // ✅ Validation téléphone
  const phoneRegex = /^(0[5-7]|(\+213))[0-9]{8}$/;
  if (!phoneRegex.test(formData.telephone)) {
    newErrors.telephone = "Numéro invalide (ex : 06xxxxxxxx ou +213xxxxxxxx)";
  }

  // ✅ Validation email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    newErrors.email = "Adresse email invalide";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  onSave({ ...user, ...formData });
  onClose();
};



  if (!isOpen || !user) return null;

  const fields = [
    { label: 'Code Client', name: 'code_client', type: 'text', icon: <FiCode /> },
    { label: 'Nom', name: 'nom', type: 'text', icon: <FiUser /> },
    { label: 'Prénom', name: 'prenom', type: 'text', icon: <FiUser /> },
    { label: 'Adresse', name: 'adresse', type: 'text', icon: <FiHome /> },
    { label: 'Téléphone', name: 'telephone', type: 'tel', icon: <FiPhone /> },
    { label: 'Date de naissance', name: 'date_naissance', type: 'date', icon: <FiCalendar /> },
    { label: 'Email', name: 'email', type: 'email', icon: <FiMail /> },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100"
        >
          {/* Header */}
          <div className="p-4 bg-blue-100">
            <div className="flex justify-between items-center text-blue-800">
              <h2 className="text-lg font-semibold">Modifier le client</h2>
              <button onClick={onClose} className="hover:text-red-400">
                <FiX className="text-xl" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map(({ label, name, type, icon }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      {icon}
                    </div>
                    {/* <input
                      className="w-full pl-10 pr-3 py-2 rounded-md bg-gray-50 border border-slate-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-200 focus:outline-none"
                      name={name}
                      type={type}
                      value={formData[name]}
                      onChange={handleChange}
                    /> */}
                    <input
                      className={`w-full pl-10 pr-3 py-2 rounded-md bg-gray-50 border ${errors[name] ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:ring-blue-200'
                        } focus:outline-none`}
                      name={name}
                      type={type}
                      value={formData[name]}
                      onChange={handleChange}
                    />
                    {errors[name] && (
                      <p className="text-xs text-red-500 mt-1">{errors[name]}</p>
                    )}

                  </div>
                </div>
              ))}



              {/* Fichier données */}
              <div className="md:col-span-2 mt-2">
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Fichier CSV ou Excel
                </label>
                <input
                  type="file"
                  name="fichier_donnees"
                  accept=".csv, .xlsx, .xls"
                  onChange={handleChange}
                  className="w-full rounded-md bg-gray-50 border border-slate-300 py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition"
              >
                Annuler
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Enregistrer
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EditClientModal;

// import React, { useState, useEffect } from 'react';

// const EditClientModal = ({ isOpen, onClose, user, onSave }) => {
//     const [formData, setFormData] = useState({
//         code_client: '',
//         nom: '',
//         prenom: '',
//         adresse: '',
//         telephone: '',
//         date_naissance: '',
//         email: '',
//         mdp: '',
//         fichier_donnees: null, // 👈 nouveau champ
//     });


//     useEffect(() => {
//         if (user) {
//             setFormData({
//                 code_client: user.code_client || '',
//                 nom: user.nom || '',
//                 prenom: user.prenom || '',
//                 adresse: user.adresse || '',
//                 telephone: user.telephone || '',
//                 date_naissance: user.date_naissance || '',
//                 email: user.email || '',
//                 mdp: ''
//             });

//         }
//     }, [user]);

//     // const handleChange = (e) => {
//     //     setFormData({ ...formData, [e.target.name]: e.target.value });
//     // };
//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === 'fichier_donnees') {
//             setFormData({ ...formData, [name]: files[0] });
//         } else {
//             setFormData({ ...formData, [name]: value });
//         }
//     };

//     const handleSubmit = () => {
//         onSave({ ...user, ...formData });
//         onClose();
//     };

//     if (!isOpen || !user) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-40">
//             <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-lg animate-fade-in">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
//                     Modifier les informations du client
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <label className="text-sm text-gray-600">Code Client</label>
//                         <input
//                             className="w-full border border-gray-300 rounded-lg p-2"
//                             name="code_client"
//                             value={formData.code_client}
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div>
//                         <label className="text-sm text-gray-600">Nom</label>
//                         <input
//                             className="w-full border border-gray-300 rounded-lg p-2"
//                             name="nom"
//                             value={formData.nom}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div>
//                         <label className="text-sm text-gray-600">Prénom</label>
//                         <input
//                             className="w-full border border-gray-300 rounded-lg p-2"
//                             name="prenom"
//                             value={formData.prenom}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div>
//                         <label className="text-sm text-gray-600">Adresse</label>
//                         <input
//                             className="w-full border border-gray-300 rounded-lg p-2"
//                             name="adresse"
//                             value={formData.adresse}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div>
//                         <label className="text-sm text-gray-600">Téléphone</label>
//                         <input
//                             className="w-full border border-gray-300 rounded-lg p-2"
//                             name="telephone"
//                             value={formData.telephone}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div>
//                         <label className="text-sm text-gray-600">Date de naissance</label>
//                         <input
//                             className="w-full border border-gray-300 rounded-lg p-2"
//                             name="date_naissance"
//                             type="date"
//                             value={formData.date_naissance}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div>
//                         <label className="text-sm text-gray-600">Email</label>
//                         <input
//                             className="w-full border border-gray-300 rounded-lg p-2"
//                             name="email"
//                             type="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                             pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
//                             title="Veuillez entrer une adresse email valide"
//                         />
//                     </div>

//                     <div className="md:col-span-2">
//                         <label className="text-sm text-gray-600">Mot de passe (laisser vide si inchangé)</label>
//                         <input
//                             className="w-full border border-gray-300 rounded-lg p-2"
//                             name="mdp"
//                             type="password"
//                             value={formData.mdp}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div className="md:col-span-2">
//                         <label className="text-sm text-gray-600">Importer un fichier (CSV ou Excel)</label>
//                         <input
//                             type="file"
//                             name="fichier_donnees"
//                             accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
//                             onChange={handleChange}
//                             className="w-full border border-gray-300 rounded-lg p-2"
//                         />
//                     </div>

//                 </div>

//                 <div className="flex justify-end mt-6 space-x-3">
//                     <button
//                         onClick={onClose}
//                         className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
//                     >
//                         Annuler
//                     </button>
//                     <button
//                         onClick={handleSubmit}
//                         className="px-4 py-2 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 transition-colors"
//                     >
//                         Enregistrer
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditClientModal;
