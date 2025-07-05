import React, { useRef, useState } from 'react';
import PasswordModal from "./PasswordModal";
import { Save, X, Edit, Lock, Camera, User, Mail, Home, Phone } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import axios from "axios";

const ProfileInfo = ({ user }) => {
    const [profileImage, setProfileImage] = useState(user.photoUrl || '');
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || ""
    });

    const fileInputRef = useRef();
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("http://127.0.0.1:8000/admin/upload-photo", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
            });

            setProfileImage(`http://127.0.0.1:8000/uploads/${res.data.filename}`);
        } catch (error) {
            console.error("Erreur upload image :", error);
        }
    };


    const triggerFileInput = () => fileInputRef.current.click();

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const cancelEdit = () => {
        setUserInfo(user);
        setIsEditing(false);
    };
    const handleSave = async () => {
        setIsSaving(true);

        try {
            const token = localStorage.getItem("token");

            const res = await axios.put("http://127.0.0.1:8000/admin/profile", {
                email: userInfo.email,
                nom_entp: userInfo.name,
                phone: userInfo.phone,
                address: userInfo.address,
                pdp: profileImage, // à adapter si c'est juste une URL
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setIsEditing(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (err) {
            console.error("Erreur lors de l'enregistrement :", err);
        } finally {
            setIsSaving(false);
        }
    };

    // const handleSave = async () => {
    //     setIsSaving(true);

    //     try {
    //         const token = localStorage.getItem("token");

    //         await axios.put("http://127.0.0.1:8000/admin/profile", {
    //             email: userInfo.email,
    //             nom_entp: userInfo.name,
    //             phone: userInfo.phone,
    //             address: userInfo.address,
    //             pdp: profileImage,
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });

    //         setIsEditing(false);
    //         setSaveSuccess(true);
    //         setTimeout(() => setSaveSuccess(false), 3000);
    //     } catch (err) {
    //         console.error("Erreur lors de l'enregistrement :", err);
    //     } finally {
    //         setIsSaving(false);
    //     }
    // };

    const fieldIcons = {
        name: <User className="w-4 h-4 text-blue-500 " />,
        email: <Mail className="w-4 h-4 text-purple-500" />,
        phone: <Phone className="w-4 h-4 text-green-500" />,
        address: <Home className="w-4 h-4 text-orange-500" />
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
        >
            {/* === SECTION INFOS PROFIL === */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
                    {/* Photo */}
                    <div className="relative">
                        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl group">
                            {/* <img
                                src={profileImage || "/default-profile.jpg"}
                                className="w-full h-full object-cover"
                                alt="Profil"
                            /> */}
                            <img
                                src={profileImage || "/default-profile.jpg"}
                                className="w-full h-full object-cover"
                                alt="Profil"
                            />

                            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Camera className="w-7 h-7 text-white" />
                            </div>
                        </div>
                        <button
                            onClick={triggerFileInput}
                            className="absolute -bottom-3 -right-3 bg-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
                            title="Changer la photo"
                        >
                            <Camera className="w-5 h-5 text-white" />
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>

                    {/* Infos personnelles + bouton modifier */}
                    <div className="flex-1 space-y-4 w-full">
                        {['name', 'email', 'phone', 'address'].map((field) => (
                            <div key={field} className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-5 pl-2 last:border-0">
                                <div className="flex items-center gap-2 text-gray-700 font-medium mb-2 sm:mb-0">
                                    {fieldIcons[field]}
                                    <span className="capitalize">{field === 'name' ? 'Nom complet' : field === 'address' ? 'Adresse' : field}</span>
                                </div>
                                {isEditing ? (
                                    <input
                                        type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                                        name={field}
                                        value={userInfo[field] || ''}
                                        onChange={handleChange}
                                        className="w-full sm:w-2/3 border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring focus:ring-blue-300"
                                        placeholder={`Saisir ${field}`}
                                    />
                                ) : (
                                    <span className="text-sm text-gray-800">{userInfo[field] || <span className="text-gray-400">Non spécifié</span>}</span>
                                )}
                            </div>
                        ))}

                        {/* Actions */}
                        <div className="flex justify-end gap-4 pt-4">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
                                    >
                                        {isSaving ? "Enregistrement..." : "Enregistrer"}
                                    </button>
                                    <button
                                        onClick={cancelEdit}
                                        className="bg-gray-200 text-gray-700 px-5 py-2 rounded-xl hover:bg-gray-300 transition"
                                    >
                                        Annuler
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="bg-[#E69200] text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition"
                                >
                                    Modifier le profil
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* === SECTION MOT DE PASSE === */}
            <div className="bg-white p-6 pt-8 pb-8 rounded-2xl shadow-xl">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Lock className="w-4 h-4 text-purple-500" />
                        <span>Mot de passe</span>
                    </div>
                    <button
                        onClick={() => setShowPasswordModal(true)}
                        className="text-sm text-[#e2c2a1] hover:text-purple-800 flex items-center gap-1"
                    >
                        <Edit size={14} />
                        Modifier
                    </button>
                </div>
            </div>

            {/* Message de succès */}
            <AnimatePresence>
                {saveSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded"
                    >
                        Profil mis à jour avec succès !
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showPasswordModal && (
                    <PasswordModal onClose={() => setShowPasswordModal(false)} />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ProfileInfo;
