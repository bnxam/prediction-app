// import React, { useRef, useState } from 'react';
// import PasswordModal from "../profilComponents/PasswordModal";
// import { Save, X, Edit, Lock, Camera } from "lucide-react";
// import { motion, AnimatePresence } from 'framer-motion';

// const ProfilClientInfo = ({ user }) => {
//     const [profileImage, setProfileImage] = useState(user.photoUrl || '');
//     const [isEditing, setIsEditing] = useState(false);
//     const [userInfo, setUserInfo] = useState(user);
//     const fileInputRef = useRef();
//     const [showPasswordModal, setShowPasswordModal] = useState(false);
//     const [isHoveringImage, setIsHoveringImage] = useState(false);

//     const handleImageChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const imageURL = URL.createObjectURL(file);
//             setProfileImage(imageURL);
//         }
//     };

//     const handleChange = (e) => {
//         setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
//     };

//     return (
//         <motion.div 
//             className="bg-[#f2f9ff] from-blue-50/80 to-white/90 p-10 rounded-3xl shadow-2xl backdrop-blur-sm border-2 border-white/20 w-full max-w-4xl mx-auto"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//         >
//             {/* En-tête avec animation */}
//             <motion.div 
//                 className="mb-10 text-center"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//             >
//                 <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800">
//                     Mon Profil 
//                 </h2>
//                 <p className="text-gray-500/90 mt-2 text-lg font-light">
//                    mes informations numériques
//                 </p>
//             </motion.div>

//             <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
//                 {/* Photo de profil - Version ultra stylisée */}
//                 <motion.div 
//                     className="relative shrink-0"
//                     whileHover={{ scale: 1.02 }}
//                     onHoverStart={() => setIsHoveringImage(true)}
//                     onHoverEnd={() => setIsHoveringImage(false)}
//                 >
//                     <div className="w-44 h-44 rounded-full overflow-hidden border-[6px] border-white/90 shadow-[0_10px_40px_rgba(0,0,0,0.15)] relative">
//                         <motion.img
//                             src={profileImage || "/default-profile.jpg"}
//                             // alt="Photo profil client"
//                             className="w-full h-full object-cover"
//                             animate={{
//                                 scale: isHoveringImage ? 1.05 : 1,
//                                 filter: isHoveringImage ? 'brightness(1.05)' : 'brightness(1)'
//                             }}
//                             transition={{ duration: 0.3 }}
//                         />
//                         <AnimatePresence>
//                             {isHoveringImage && (
//                                 <motion.div 
//                                     className="absolute inset-0 bg-black/20 rounded-full"
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     exit={{ opacity: 0 }}
//                                 />
//                             )}
//                         </AnimatePresence>
//                     </div>
//                     <motion.button
//                         onClick={() => fileInputRef.current.click()}
//                         className="absolute -bottom-3 -right-3 bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
//                         whileHover={{ scale: 1.1, rotate: 15 }}
//                         whileTap={{ scale: 0.9 }}
//                         title="Modifier la photo"
//                     >
//                         <Camera className="w-6 h-6 text-white" />
//                         <span className="sr-only">Modifier photo</span>
//                     </motion.button>
//                     <input
//                         type="file"
//                         accept="image/*"
//                         ref={fileInputRef}
//                         onChange={handleImageChange}
//                         className="hidden"
//                     />
//                 </motion.div>

//                 {/* Section informations client */}
//                 <div className="flex-1 space-y-6 w-full">
//                     {['name', 'email', 'phone', 'address'].map((field) => (
//                         <motion.div 
//                             key={field}
//                             className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center"
//                             whileHover={{ x: 5 }}
//                         >
//                             <label className="text-sm font-medium text-gray-600/90 capitalize md:text-right md:pt-2 col-span-1 flex items-center justify-end">
//                                 <span className="bg-white/80 px-3 py-1.5 rounded-lg shadow-inner border border-gray-100">
//                                     {field === 'name' ? 'Nom' : 
//                                      field === 'email' ? 'Email' :
//                                      field === 'phone' ? 'Téléphone' : 'Adresse'}
//                                 </span>
//                             </label>
//                             {isEditing ? (
//                                 <div className="col-span-4">
//                                     <motion.input
//                                         type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
//                                         name={field}
//                                         value={userInfo[field] || ''}
//                                         onChange={handleChange}
//                                         className="w-full border-2 border-gray-200/80 bg-white/90 px-5 py-3 rounded-2xl focus:ring-4 focus:ring-indigo-200/50 focus:border-indigo-400 transition-all duration-300 text-gray-700 placeholder-gray-400/70 shadow-inner"
//                                         placeholder={`Saisir ${field === 'name' ? 'le nom' : field === 'email' ? "l'email" : field === 'phone' ? 'le téléphone' : "l'adresse"}...`}
//                                         whileFocus={{ scale: 1.01 }}
//                                     />
//                                 </div>
//                             ) : (
//                                 <div className="col-span-4 text-gray-800 break-words py-3 px-5 bg-white/80 rounded-2xl min-h-[52px] flex items-center shadow-inner border border-gray-100/80 hover:border-indigo-200 transition-colors">
//                                     {userInfo[field] || <span className="text-gray-400/80 italic">Non spécifié</span>}
//                                 </div>
//                             )}
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>

//             {/* Actions client */}
//             <motion.div 
//                 className="flex flex-wrap justify-center gap-5 mt-12"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.4 }}
//             >
//                 {isEditing ? (
//                     <>
//                         <motion.button 
//                             onClick={() => setIsEditing(false)}
//                             className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             <Save size={20} className="text-white/90" />
//                             <span className="text-lg">Enregistrer</span>
//                         </motion.button>
//                         <motion.button 
//                             onClick={() => {
//                                 setUserInfo(user);
//                                 setIsEditing(false);
//                             }}
//                             className="flex items-center gap-3 bg-white border-2 border-gray-200/80 hover:border-gray-300 text-gray-700 font-medium px-8 py-4 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             <X size={20} className="text-gray-600" />
//                             <span className="text-lg">Annuler</span>
//                         </motion.button>
//                     </>
//                 ) : (
//                     <motion.button
//                         className="flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
//                         onClick={() => setIsEditing(true)}
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                     >
//                         <Edit size={20} className="text-white/90" />
//                         <span className="text-lg">Modifier Profil</span>
//                     </motion.button>
//                 )}

//                 <motion.button
//                     className="flex items-center gap-3 bg-white border-2 border-gray-200/80 hover:border-indigo-200 text-gray-700 font-medium px-8 py-4 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg"
//                     onClick={() => setShowPasswordModal(true)}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                 >
//                     <Lock size={20} className="text-indigo-600" />
//                     <span className="text-lg">Modifier Mot de Passe</span>
//                 </motion.button>
//             </motion.div>

//             <AnimatePresence>
//                 {showPasswordModal && (
//                     <PasswordModal onClose={() => setShowPasswordModal(false)} />
//                 )}
//             </AnimatePresence>
//         </motion.div>
//     );
// };

// export default ProfilClientInfo;


import React, { useRef, useState, useEffect } from 'react';
import PasswordModal from "../profilComponents/PasswordModal";
import { Save, X, Edit, Lock, Camera, User, Mail, Home, Phone, Calendar } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

const ProfilClientInfo = ({ user }) => {
    // Initialisation des états avec des valeurs par défaut
    const [profileImage, setProfileImage] = useState(user.photoUrl || '');
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    
    const [userInfo, setUserInfo] = useState({});
    
    useEffect(() => {
        if (user) {
            setUserInfo({
                clientCode: user.code_client || "CL-00000",
                lastName: user.nom || "",
                firstName: user.prenom || "",
                birthDate: user.date_naissance?.slice(0, 10) || "",
                address: user.adresse || "",
                phone: user.telephone || "",
                email: user.email || "",
                bio: user.bio || "Aucune bio pour le moment..."
            });
        }
    }, [user]);

    const fileInputRef = useRef();
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setProfileImage(imageURL);
        }
    };

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await fetch(`http://localhost:8000/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    code_client: userInfo.clientCode,
                    nom: userInfo.lastName,
                    prenom: userInfo.firstName,
                    adresse: userInfo.address,
                    telephone: userInfo.phone,
                    date_naissance: userInfo.birthDate,
                    email: userInfo.email
                })
            });

            if (!response.ok) throw new Error("Erreur lors de la mise à jour");

            await response.json();
            setIsEditing(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error(error);
            alert("Échec de la mise à jour du profil");
        } finally {
            setIsSaving(false);
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    const fieldIcons = {
        clientCode: <User className="w-4 h-4 text-blue-500" />,
        lastName: <User className="w-4 h-4 text-blue-500" />,
        firstName: <User className="w-4 h-4 text-blue-500" />,
        birthDate: <Calendar className="w-4 h-4 text-blue-500" />,
        address: <Home className="w-4 h-4 text-blue-500" />,
        phone: <Phone className="w-4 h-4 text-blue-500" />,
        email: <Mail className="w-4 h-4 text-blue-500" />
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 max-w-6xl mx-auto min-h-screen"
        >
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-gray-800">Paramètres du compte</h1>
                <p className="text-gray-500 mt-2">Gérez vos informations personnelles et vos préférences</p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Colonne de gauche - Informations principales */}
                <div className="flex-1 space-y-8">
                    {/* Section Informations personnelles */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                    >
                        <motion.div variants={itemVariants}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <User className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800">Informations personnelles</h2>
                            </div>
                        </motion.div>

                        {[
                            { field: 'clientCode', label: 'Code client', type: 'text', editable: false },
                            { field: 'lastName', label: 'Nom', type: 'text' },
                            { field: 'firstName', label: 'Prénom', type: 'text' },
                            { field: 'birthDate', label: 'Date de naissance', type: 'date' },
                            { field: 'address', label: 'Adresse', type: 'text' },
                            { field: 'phone', label: 'Téléphone', type: 'tel' }
                        ].map(({ field, label, type, editable = true }) => (
                            <motion.div 
                                key={field} 
                                variants={itemVariants}
                                className="py-4 border-b border-gray-100 last:border-0"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        {fieldIcons[field]}
                                        <span>{label}</span>
                                    </div>

                                    {isEditing && editable ? (
                                        <motion.input
                                            type={type}
                                            name={field}
                                            value={userInfo[field] || ''}
                                            onChange={handleChange}
                                            className="w-1/2 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder={`Saisir ${label.toLowerCase()}`}
                                            whileFocus={{ scale: 1.02 }}
                                        />
                                    ) : (
                                        <span className="text-right font-medium">
                                            {userInfo[field] || <span className="text-gray-400">Non spécifié</span>}
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Section Informations du compte */}
                    <motion.div 
                        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <Lock className="w-5 h-5 text-purple-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">Informations du compte</h2>
                        </div>

                        <div className="py-4 border-b border-gray-100">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Mail className="w-4 h-4 text-purple-500" />
                                    <span>Email</span>
                                </div>
                                {isEditing ? (
                                    <motion.input
                                        type="email"
                                        name="email"
                                        value={userInfo.email || ''}
                                        onChange={handleChange}
                                        className="w-1/2 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        placeholder="Saisir votre email"
                                        whileFocus={{ scale: 1.02 }}
                                    />
                                ) : (
                                    <span className="text-right font-medium">{userInfo.email}</span>
                                )}
                            </div>
                        </div>

                        <div className="py-4 flex justify-between items-center">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Lock className="w-4 h-4 text-purple-500" />
                                <span>Mot de passe</span>
                            </div>
                            <motion.button
                                onClick={() => setShowPasswordModal(true)}
                                className="text-purple-600 flex items-center gap-2 hover:text-purple-800 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Edit size={16} />
                                <span>Modifier</span>
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Boutons d'action */}
                    <motion.div 
                        className="flex justify-end gap-4 mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {isEditing ? (
                            <>
                                <motion.button
                                    onClick={handleSave}
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={isSaving}
                                >
                                    {isSaving ? (
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <Save size={16} />
                                    )}
                                    <span>{isSaving ? 'Enregistrement...' : 'Enregistrer'}</span>
                                </motion.button>
                                <motion.button
                                    onClick={() => setIsEditing(false)}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl transition-all flex items-center gap-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <X size={16} />
                                    <span>Annuler</span>
                                </motion.button>
                            </>
                        ) : (
                            <motion.button
                                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                                onClick={() => setIsEditing(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Edit size={16} />
                                <span>Modifier le profil</span>
                            </motion.button>
                        )}
                    </motion.div>

                    <AnimatePresence>
                        {saveSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg"
                            >
                                Profil mis à jour avec succès !
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Colonne de droite - Photo de profil et bio */}
                <div className="lg:w-96 space-y-8 ">
                    <motion.div 
                        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 "
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Photo de profil</h2>

                        <div className="flex flex-col items-center ">
                            <motion.div 
                                className="relative mb-6"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl relative group ]">
                                    <img
                                        src={profileImage || "/default-profile.jpg"}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        alt="Photo de profil"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Camera className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <motion.button
                                    onClick={() => fileInputRef.current.click()}
                                    className="absolute -bottom-3 -right-3 bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all"
                                    title="Modifier la photo"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Camera className="w-5 h-5 text-white" />
                                </motion.button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </motion.div>

                            <div className="flex gap-4">
                                <motion.button 
                                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Mettre à jour
                                </motion.button>
                                <motion.button 
                                    className="text-red-500 hover:text-red-700 font-medium transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Supprimer
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 bg-[#D4EBF8]"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                                <Edit className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">Bio</h2>
                        </div>

                        {isEditing ? (
                            <motion.textarea
                                name="bio"
                                value={userInfo.bio}
                                onChange={handleChange}
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 h-40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                placeholder="Décrivez-vous en quelques mots..."
                                whileFocus={{ scale: 1.01 }}
                            />
                        ) : (
                            <p className="text-gray-700 leading-relaxed">
                                {userInfo.bio || "Aucune bio pour le moment..."}
                            </p>
                        )}
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {showPasswordModal && (
                    <PasswordModal onClose={() => setShowPasswordModal(false)} />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ProfilClientInfo;