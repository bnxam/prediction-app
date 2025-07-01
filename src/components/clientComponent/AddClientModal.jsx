import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUserPlus, FiKey, FiMail, FiPhone, FiHome, FiCalendar, FiUser, FiCode } from 'react-icons/fi';

const AddClientModal = ({ isOpen, onClose, onSave }) => {

    const [formData, setFormData] = useState({
        code_client: '',
        nom: '',
        prenom: '',
        adresse: '',
        telephone: '',
        date_naissance: '',
        email: '',
        mdp: '',
        fichier_donnees: null, // 👈 nouveau champ
    });


    const [errors, setErrors] = useState({});

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    //     if (errors[name]) setErrors({ ...errors, [name]: '' });
    // };
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'fichier_donnees') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    const resetForm = () => {
        setFormData({
            code_client: '',
            nom: '',
            prenom: '',
            adresse: '',
            telephone: '',
            date_naissance: '',
            email: '',
            mdp: '',
            fichier_donnees: null,
        });
        setErrors({});
    };
    const validate = () => {
        const newErrors = {};
        if (!formData.code_client.trim()) newErrors.code_client = 'Champ requis';
        if (!formData.nom.trim()) newErrors.nom = 'Champ requis';
        if (!formData.prenom.trim()) newErrors.prenom = 'Champ requis';
        if (!formData.adresse.trim()) newErrors.adresse = 'Champ requis';
        // if (!formData.telephone.trim()) newErrors.telephone = 'Champ requis';
        if (!formData.telephone.trim()) {
            newErrors.telephone = 'Le numéro de téléphone est requis';
        } else if (!/^((\+213)|0)(5|6|7)[0-9]{8}$/.test(formData.telephone)) {
            newErrors.telephone = 'Numéro de téléphone invalide ';
        }

        if (!formData.date_naissance.trim()) newErrors.date_naissance = 'Champ requis';
        if (!formData.email.trim()) {
            newErrors.email = 'Champ requis';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email invalide';
        }
        // if (!formData.mdp.trim()) newErrors.mdp = 'Champ requis';
        return newErrors;
    };



const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    const { fichier_donnees, ...clientData } = formData;

    if (fichier_donnees) {
        const reader = new FileReader();

        reader.onload = async (event) => {
            const fileContent = event.target.result;

            const rows = fileContent
                .split('\n')
                .map(row => row.split(',').map(cell => cell.trim()));
            const headers = rows[0];
            const dataRows = rows.slice(1).filter(row => row.length === headers.length);

            const donneesFichier = dataRows.map(row => {
                const obj = {};
                headers.forEach((header, i) => {
                    if (header === "valeur") {
                        obj[header] = parseFloat(row[i]);
                    } else if (header === "date") {
                        // Formatage robuste de la date
                        const dateStr = row[i];
                        const dateObj = new Date(dateStr);
                        
                        // Vérification que la date est valide
                        if (isNaN(dateObj.getTime())) {
                            console.error(`Date invalide: ${dateStr}`);
                            return null;
                        }
                        
                        // Formatage en YYYY-MM-DD
                        const year = dateObj.getFullYear();
                        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                        const day = String(dateObj.getDate()).padStart(2, '0');
                        obj[header] = `${year}-${month}-${day}`;
                    } else {
                        obj[header] = row[i];
                    }
                });
                return obj;
            }).filter(item => item !== null); // Filtre les éventuelles dates invalides

            const payload = {
                ...clientData,
                consommations: donneesFichier,
            };

            console.log("Payload envoyé à l'API:", payload); // Pour débogage
            onSave(payload);
            onClose();
            resetForm();
        };

        reader.readAsText(fichier_donnees);
    } else {
        const payload = {
            ...clientData,
            consommations: [],
        };
        onSave(payload);
        onClose();
        resetForm();
    }
};



    const fieldConfig = [
        { label: 'Code Client', name: 'code_client', type: 'text', icon: <FiCode /> },
        { label: 'Nom', name: 'nom', type: 'text', icon: <FiUser /> },
        { label: 'Prénom', name: 'prenom', type: 'text', icon: <FiUser /> },
        { label: 'Adresse', name: 'adresse', type: 'text', icon: <FiHome /> },
        { label: 'Téléphone', name: 'telephone', type: 'tel', icon: <FiPhone /> },
        { label: 'Date de naissance', name: 'date_naissance', type: 'date', icon: <FiCalendar /> },
        { label: 'Email', name: 'email', type: 'email', icon: <FiMail /> },
        // { label: 'Mot de passe', name: 'mdp', type: 'password', icon: <FiKey /> },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-60">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                        {/* Header avec dégradé */}
                        <div className="p-4 bg-yellow-400">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <FiUserPlus className="text-white text-lg" />
                                    <h2 className="text-lg font-semibold text-white">
                                        Ajouter un client
                                    </h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-white hover:bg-white/20 p-1 rounded-full"
                                >
                                    <FiX className="text-lg" />
                                </button>
                            </div>
                        </div>

                        {/* Contenu */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {fieldConfig.map(({ label, name, type, icon }) => (
                                    <div key={name} className="mb-3">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {label}
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                                                {icon}
                                            </div>
                                            <input
                                                type={type}
                                                name={name}
                                                value={formData[name]}
                                                onChange={handleChange}
                                                className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-1 ${errors[name]
                                                    ? 'border-red-400 focus:ring-red-200'
                                                    : 'border-gray-300 focus:border-amber-400 focus:ring-amber-100'
                                                    }`}
                                            />
                                        </div>
                                        {errors[name] && (
                                            <p className="text-xs text-red-500 mt-1">
                                                {errors[name]}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="md:col-span-2 mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Fichier de données (CSV ou Excel)
                                </label>
                                <input
                                    type="file"
                                    name="fichier_donnees"
                                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={handleChange}
                                    className="w-full border-gray-300 border rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
                                />
                                {errors.fichier_donnees && (
                                    <p className="text-xs text-red-500 mt-1">{errors.fichier_donnees}</p>
                                )}
                            </div>


                            {/* Boutons */}
                            <div className="flex justify-end mt-6 space-x-3">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onClose}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                                >
                                    Annuler
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSubmit}
                                    className="px-4 py-2 bg-yellow-400  text-white rounded-lg hover:from-amber-500 hover:to-orange-600"
                                >
                                    Ajouter
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AddClientModal;
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   FiX, FiUserPlus, FiMail, FiPhone,
//   FiHome, FiCalendar, FiUser, FiCode
// } from 'react-icons/fi';

// const AddClientModal = ({ isOpen, onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     code_client: '',
//     nom: '',
//     prenom: '',
//     adresse: '',
//     telephone: '',
//     date_naissance: '',
//     email: '',
//     fichier_donnees: null,
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'fichier_donnees') {
//       setFormData({ ...formData, [name]: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//     if (errors[name]) setErrors({ ...errors, [name]: '' });
//   };

//   const resetForm = () => {
//     setFormData({
//       code_client: '',
//       nom: '',
//       prenom: '',
//       adresse: '',
//       telephone: '',
//       date_naissance: '',
//       email: '',
//       fichier_donnees: null,
//     });
//     setErrors({});
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.code_client.trim()) newErrors.code_client = 'Champ requis';
//     if (!formData.nom.trim()) newErrors.nom = 'Champ requis';
//     if (!formData.prenom.trim()) newErrors.prenom = 'Champ requis';
//     if (!formData.adresse.trim()) newErrors.adresse = 'Champ requis';
//     if (!formData.telephone.trim()) newErrors.telephone = 'Champ requis';
//     if (!formData.date_naissance.trim()) newErrors.date_naissance = 'Champ requis';
//     if (!formData.email.trim()) {
//       newErrors.email = 'Champ requis';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Email invalide';
//     }
//     return newErrors;
//   };

//   const handleSubmit = () => {
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     const { fichier_donnees, ...clientData } = formData;

//     if (fichier_donnees) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const fileContent = event.target.result;
//         const rows = fileContent.split('\n').map(row => row.split(',').map(cell => cell.trim()));
//         const headers = rows[0];
//         const dataRows = rows.slice(1).filter(row => row.length === headers.length);

//         const donneesFichier = dataRows.map(row => {
//           const obj = {};
//           headers.forEach((header, i) => {
//             if (header === "valeur") {
//               obj[header] = parseFloat(row[i]);
//             } else if (header === "date") {
//               const dateObj = new Date(row[i]);
//               if (isNaN(dateObj.getTime())) return null;
//               const y = dateObj.getFullYear();
//               const m = String(dateObj.getMonth() + 1).padStart(2, '0');
//               const d = String(dateObj.getDate()).padStart(2, '0');
//               obj[header] = `${y}-${m}-${d}`;
//             } else {
//               obj[header] = row[i];
//             }
//           });
//           return obj;
//         }).filter(item => item !== null);

//         const payload = { ...clientData, consommations: donneesFichier };
//         onSave(payload);
//         onClose();
//         resetForm();
//       };
//       reader.readAsText(fichier_donnees);
//     } else {
//       const payload = { ...clientData, consommations: [] };
//       onSave(payload);
//       onClose();
//       resetForm();
//     }
//   };

//   const fieldConfig = [
//     { label: 'Code Client', name: 'code_client', type: 'text', icon: <FiCode /> },
//     { label: 'Nom', name: 'nom', type: 'text', icon: <FiUser /> },
//     { label: 'Prénom', name: 'prenom', type: 'text', icon: <FiUser /> },
//     { label: 'Adresse', name: 'adresse', type: 'text', icon: <FiHome /> },
//     { label: 'Téléphone', name: 'telephone', type: 'tel', icon: <FiPhone /> },
//     { label: 'Date de naissance', name: 'date_naissance', type: 'date', icon: <FiCalendar /> },
//     { label: 'Email', name: 'email', type: 'email', icon: <FiMail /> },
//   ];

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100"
//           >
//             {/* Header */}
//             <div className="p-4 bg-blue-100">
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center gap-2 text-blue-800">
//                   <FiUserPlus className="text-xl" />
//                   <h2 className="text-lg font-semibold">Nouveau client</h2>
//                 </div>
//                 <button onClick={onClose} className="text-blue-800 hover:text-red-400">
//                   <FiX className="text-xl" />
//                 </button>
//               </div>
//             </div>

//             {/* Form */}
//             <div className="p-6 bg-white">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {fieldConfig.map(({ label, name, type, icon }) => (
//                   <div key={name}>
//                     <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
//                         {icon}
//                       </div>
//                       <input
//                         type={type}
//                         name={name}
//                         value={formData[name]}
//                         onChange={handleChange}
//                         className={`w-full pl-10 pr-3 py-2 rounded-md bg-gray-50 border ${errors[name]
//                           ? 'border-red-400'
//                           : 'border-slate-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-200'
//                           } focus:outline-none`}
//                       />
//                     </div>
//                     {errors[name] && (
//                       <p className="text-xs text-red-500 mt-1">{errors[name]}</p>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Fichier CSV */}
//               <div className="mt-5">
//                 <label className="block text-sm font-medium text-slate-600 mb-1">
//                   Fichier CSV ou Excel
//                 </label>
//                 <input
//                   type="file"
//                   name="fichier_donnees"
//                   accept=".csv,.xlsx,.xls"
//                   onChange={handleChange}
//                   className="w-full rounded-md bg-gray-50 border border-slate-300 py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
//                 />
//                 {errors.fichier_donnees && (
//                   <p className="text-xs text-red-500 mt-1">{errors.fichier_donnees}</p>
//                 )}
//               </div>

//               {/* Buttons */}
//               <div className="flex justify-end gap-3 mt-6">
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   onClick={onClose}
//                   className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition"
//                 >
//                   Annuler
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   onClick={handleSubmit}
//                   className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//                 >
//                   Ajouter
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default AddClientModal;
