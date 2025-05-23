import React, { useRef, useState } from 'react';
import PasswordModal from "../profilComponents/PasswordModal";
import { Save, X, Edit, Lock, Camera } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

const ProfilClientInfo = ({ user }) => {
    const [profileImage, setProfileImage] = useState(user.photoUrl || '');
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState(user);
    const fileInputRef = useRef();
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [isHoveringImage, setIsHoveringImage] = useState(false);

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

    return (
        <motion.div 
            className="bg-[#f2f9ff] from-blue-50/80 to-white/90 p-10 rounded-3xl shadow-2xl backdrop-blur-sm border-2 border-white/20 w-full max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* En-tête avec animation */}
            <motion.div 
                className="mb-10 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800">
                    Mon Profil 
                </h2>
                <p className="text-gray-500/90 mt-2 text-lg font-light">
                   mes informations numériques
                </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
                {/* Photo de profil - Version ultra stylisée */}
                <motion.div 
                    className="relative shrink-0"
                    whileHover={{ scale: 1.02 }}
                    onHoverStart={() => setIsHoveringImage(true)}
                    onHoverEnd={() => setIsHoveringImage(false)}
                >
                    <div className="w-44 h-44 rounded-full overflow-hidden border-[6px] border-white/90 shadow-[0_10px_40px_rgba(0,0,0,0.15)] relative">
                        <motion.img
                            src={profileImage || "/default-profile.jpg"}
                            // alt="Photo profil client"
                            className="w-full h-full object-cover"
                            animate={{
                                scale: isHoveringImage ? 1.05 : 1,
                                filter: isHoveringImage ? 'brightness(1.05)' : 'brightness(1)'
                            }}
                            transition={{ duration: 0.3 }}
                        />
                        <AnimatePresence>
                            {isHoveringImage && (
                                <motion.div 
                                    className="absolute inset-0 bg-black/20 rounded-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                    <motion.button
                        onClick={() => fileInputRef.current.click()}
                        className="absolute -bottom-3 -right-3 bg-gradient-to-br from-amber-500 to-amber-600 p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                        title="Modifier la photo"
                    >
                        <Camera className="w-6 h-6 text-white" />
                        <span className="sr-only">Modifier photo</span>
                    </motion.button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </motion.div>

                {/* Section informations client */}
                <div className="flex-1 space-y-6 w-full">
                    {['name', 'email', 'phone', 'address'].map((field) => (
                        <motion.div 
                            key={field}
                            className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center"
                            whileHover={{ x: 5 }}
                        >
                            <label className="text-sm font-medium text-gray-600/90 capitalize md:text-right md:pt-2 col-span-1 flex items-center justify-end">
                                <span className="bg-white/80 px-3 py-1.5 rounded-lg shadow-inner border border-gray-100">
                                    {field === 'name' ? 'Nom' : 
                                     field === 'email' ? 'Email' :
                                     field === 'phone' ? 'Téléphone' : 'Adresse'}
                                </span>
                            </label>
                            {isEditing ? (
                                <div className="col-span-4">
                                    <motion.input
                                        type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                                        name={field}
                                        value={userInfo[field] || ''}
                                        onChange={handleChange}
                                        className="w-full border-2 border-gray-200/80 bg-white/90 px-5 py-3 rounded-2xl focus:ring-4 focus:ring-indigo-200/50 focus:border-indigo-400 transition-all duration-300 text-gray-700 placeholder-gray-400/70 shadow-inner"
                                        placeholder={`Saisir ${field === 'name' ? 'le nom' : field === 'email' ? "l'email" : field === 'phone' ? 'le téléphone' : "l'adresse"}...`}
                                        whileFocus={{ scale: 1.01 }}
                                    />
                                </div>
                            ) : (
                                <div className="col-span-4 text-gray-800 break-words py-3 px-5 bg-white/80 rounded-2xl min-h-[52px] flex items-center shadow-inner border border-gray-100/80 hover:border-indigo-200 transition-colors">
                                    {userInfo[field] || <span className="text-gray-400/80 italic">Non spécifié</span>}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Actions client */}
            <motion.div 
                className="flex flex-wrap justify-center gap-5 mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                {isEditing ? (
                    <>
                        <motion.button 
                            onClick={() => setIsEditing(false)}
                            className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Save size={20} className="text-white/90" />
                            <span className="text-lg">Enregistrer</span>
                        </motion.button>
                        <motion.button 
                            onClick={() => {
                                setUserInfo(user);
                                setIsEditing(false);
                            }}
                            className="flex items-center gap-3 bg-white border-2 border-gray-200/80 hover:border-gray-300 text-gray-700 font-medium px-8 py-4 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <X size={20} className="text-gray-600" />
                            <span className="text-lg">Annuler</span>
                        </motion.button>
                    </>
                ) : (
                    <motion.button
                        className="flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                        onClick={() => setIsEditing(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Edit size={20} className="text-white/90" />
                        <span className="text-lg">Modifier Profil</span>
                    </motion.button>
                )}

                <motion.button
                    className="flex items-center gap-3 bg-white border-2 border-gray-200/80 hover:border-indigo-200 text-gray-700 font-medium px-8 py-4 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={() => setShowPasswordModal(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Lock size={20} className="text-indigo-600" />
                    <span className="text-lg">Modifier Mot de Passe</span>
                </motion.button>
            </motion.div>

            <AnimatePresence>
                {showPasswordModal && (
                    <PasswordModal onClose={() => setShowPasswordModal(false)} />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ProfilClientInfo;