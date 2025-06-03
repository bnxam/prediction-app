
///////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState } from 'react';

// const AddClientModal = ({ isOpen, onClose, onSave }) => {
//     const [formData, setFormData] = useState({
//         code_client: '',
//         nom: '',
//         prenom: '',
//         adresse: '',
//         telephone: '',
//         date_naissance: '',
//         email: '',
//         mdp: '',
//     });



//     const [errors, setErrors] = useState({});

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });

//         if (errors[name]) {
//             setErrors({ ...errors, [name]: '' });
//         }
//     };

//     const validate = () => {
//         const newErrors = {};
//         if (!formData.code_client.trim()) newErrors.code_client = 'Code client requis';
//         if (!formData.nom.trim()) newErrors.nom = 'Nom requis';
//         if (!formData.prenom.trim()) newErrors.prenom = 'Prénom requis';
//         if (!formData.adresse.trim()) newErrors.adresse = 'Adresse requise';
//         if (!formData.telephone.trim()) newErrors.telephone = 'Téléphone requis';
//         if (!formData.date_naissance.trim()) newErrors.date_naissance = 'Date de naissance requise';
//         if (!formData.email.trim()) {
//             newErrors.email = 'Email requis';
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//             newErrors.email = 'Format email invalide';
//         }
//         if (!formData.mdp.trim()) newErrors.mdp = 'Mot de passe requis';
//         return newErrors;
//     };

//     const handleSubmit = () => {
//         const validationErrors = validate();
//         if (Object.keys(validationErrors).length > 0) {
//             setErrors(validationErrors);
//             return;
//         }

//         onSave(formData);
//         onClose();
//         setFormData({
//             code_client: '', // ✅ ajouter cette ligne
//             nom: '',
//             prenom: '',
//             adresse: '',
//             telephone: '',
//             date_naissance: '',
//             email: '',
//             mdp: '',
//         });

//         setErrors({});
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-60">
//             <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-lg">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
//                     Ajouter un nouveau client
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {[
//                         { label: 'Code Client', name: 'code_client', type: 'text' },
//                         { label: 'Nom', name: 'nom', type: 'text' },
//                         { label: 'Prénom', name: 'prenom', type: 'text' },
//                         { label: 'Adresse', name: 'adresse', type: 'text' },
//                         { label: 'Téléphone', name: 'telephone', type: 'text' },
//                         { label: 'Date de naissance', name: 'date_naissance', type: 'date' },
//                         { label: 'Email', name: 'email', type: 'email' },
//                         { label: 'Mot de passe', name: 'mdp', type: 'password' },
//                     ].map(({ label, name, type }) => (
//                         <div key={name}>
//                             <label className="text-sm text-gray-600">{label}</label>
//                             <input
//                                 type={type}
//                                 name={name}
//                                 value={formData[name]}
//                                 onChange={handleChange}
//                                 className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 ${errors[name]
//                                     ? 'border-red-500 focus:ring-red-400'
//                                     : 'border-gray-300 focus:ring-yellow-400'
//                                     }`}
//                             />
//                             {errors[name] && (
//                                 <p className="text-xs text-red-500 mt-1">{errors[name]}</p>
//                             )}
//                         </div>
//                     ))}
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
//                         Ajouter
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddClientModal;
/////////////////////////////////////////////////////////////////////////////////
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


    const validate = () => {
        const newErrors = {};
        if (!formData.code_client.trim()) newErrors.code_client = 'Champ requis';
        if (!formData.nom.trim()) newErrors.nom = 'Champ requis';
        if (!formData.prenom.trim()) newErrors.prenom = 'Champ requis';
        if (!formData.adresse.trim()) newErrors.adresse = 'Champ requis';
        if (!formData.telephone.trim()) newErrors.telephone = 'Champ requis';
        if (!formData.date_naissance.trim()) newErrors.date_naissance = 'Champ requis';
        if (!formData.email.trim()) {
            newErrors.email = 'Champ requis';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email invalide';
        }
        if (!formData.mdp.trim()) newErrors.mdp = 'Champ requis';
        return newErrors;
    };

    const handleSubmit = () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        onSave(formData);
        onClose();
        setFormData({
            code_client: '',
            nom: '',
            prenom: '',
            adresse: '',
            telephone: '',
            date_naissance: '',
            email: '',
            mdp: '',
        });
        setErrors({});
    };

    const fieldConfig = [
        { label: 'Code Client', name: 'code_client', type: 'text', icon: <FiCode /> },
        { label: 'Nom', name: 'nom', type: 'text', icon: <FiUser /> },
        { label: 'Prénom', name: 'prenom', type: 'text', icon: <FiUser /> },
        { label: 'Adresse', name: 'adresse', type: 'text', icon: <FiHome /> },
        { label: 'Téléphone', name: 'telephone', type: 'tel', icon: <FiPhone /> },
        { label: 'Date de naissance', name: 'date_naissance', type: 'date', icon: <FiCalendar /> },
        { label: 'Email', name: 'email', type: 'email', icon: <FiMail /> },
        { label: 'Mot de passe', name: 'mdp', type: 'password', icon: <FiKey /> },
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
