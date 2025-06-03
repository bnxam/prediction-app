// import React, { useRef, useState } from 'react';
// import PasswordModal from "./PasswordModal";


// const ProfileInfo = ({ user }) => {
//     const [profileImage, setProfileImage] = useState(user.photoUrl || '');
//     const [isEditing, setIsEditing] = useState(false);
//     const [userInfo, setUserInfo] = useState(user);
//     const fileInputRef = useRef();
//     const [showPasswordModal, setShowPasswordModal] = useState(false);


//     const handleImageChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const imageURL = URL.createObjectURL(file);
//             setProfileImage(imageURL);
//         }
//     };

//     const triggerFileInput = () => {
//         fileInputRef.current.click();
//     };

//     const handleChange = (e) => {
//         setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
//     };

//     const toggleEdit = () => {
//         setIsEditing(!isEditing);
//     };

//     const cancelEdit = () => {
//         setUserInfo(user); // reset to original
//         setIsEditing(false);
//     };

//     return (
//         <>
//             <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col space-y-8 w-full max-w-4xl">
//                 <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-10">
//                     {/* Photo de profil */}
//                     <div className="relative w-36 h-36">
//                         <img
//                             src={profileImage || "https://via.placeholder.com/150"}
//                             alt="Profil"
//                             className="w-full h-full object-cover rounded-full border-4 border-gray-200 shadow"
//                         />

//                         <button
//                             onClick={triggerFileInput}
//                             className="absolute bottom-0 right-0 bg-white border rounded-full p-2 shadow hover:bg-gray-100 transition"
//                             title="Changer la photo"
//                         >
//                             📷
//                         </button>
//                         <input
//                             type="file"
//                             accept="image/*"
//                             ref={fileInputRef}
//                             onChange={handleImageChange}
//                             className="hidden"
//                         />
//                     </div>

//                     {/* Infos utilisateur */}
//                     <div className="flex flex-col space-y-6 text-gray-700 w-full">
//                         {[
//                             { label: "Nom", name: "name", type: "text" },
//                             { label: "Email", name: "email", type: "email" },
//                             { label: "Téléphone", name: "phone", type: "tel" },
//                             { label: "Adresse", name: "address", type: "text" },
//                         ].map(({ label, name, type }) => (
//                             <div key={name} className="flex flex-col md:flex-row md:items-center md:space-x-4">
//                                 <div className="w-32 font-medium text-sm">{label} :</div>
//                                 {isEditing ? (
//                                     <input
//                                         type={type}
//                                         name={name}
//                                         value={userInfo[name]}
//                                         onChange={handleChange}
//                                         className="flex-1 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 transition w-full md:w-auto"
//                                     />
//                                 ) : (
//                                     <div className="flex-1 text-base text-gray-800">{userInfo[name]}</div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>

//                 </div>

//                 {/* Boutons */}
//                 <div className="flex flex-col md:flex-row justify-center gap-4 pt-4">
//                     {isEditing ? (
//                         <>
//                             <button
//                                 className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300"
//                                 onClick={toggleEdit}
//                             >
//                                 💾 Enregistrer
//                             </button>
//                             <button
//                                 className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300"
//                                 onClick={cancelEdit}
//                             >
//                                 ❌ Annuler
//                             </button>
//                         </>
//                     ) : (
//                         <button
//                             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300"
//                             onClick={toggleEdit}
//                         >
//                             ✏️ Modifier mes informations
//                         </button>
//                     )}

//                     <button
//                         className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300"
//                         onClick={() => setShowPasswordModal(true)}
//                     >
//                         🔒 Modifier mon mot de passe
//                     </button>
//                 </div>

//             </div>

//             {/* Modale mot de passe */}
//             {showPasswordModal && (
//                 <PasswordModal onClose={() => setShowPasswordModal(false)} />
//             )}
//         </>
//     );

// };

// export default ProfileInfo;
//ProfileInfo
// import React, { useRef, useState } from 'react';
// import PasswordModal from "./PasswordModal";
// import { Save, X } from "lucide-react";


// const ProfileInfo = ({ user }) => {
//     const [profileImage, setProfileImage] = useState(user.photoUrl || '');
//     const [isEditing, setIsEditing] = useState(false);
//     const [userInfo, setUserInfo] = useState(user);
//     const fileInputRef = useRef();
//     const [showPasswordModal, setShowPasswordModal] = useState(false);

//     const handleImageChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const imageURL = URL.createObjectURL(file);
//             setProfileImage(imageURL);
//         }
//     };

//     const triggerFileInput = () => fileInputRef.current.click();

//     const handleChange = (e) => {
//         setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
//     };

//     const toggleEdit = () => setIsEditing(!isEditing);

//     const cancelEdit = () => {
//         setUserInfo(user);
//         setIsEditing(false);
//     };

//     return (
//         <div className="bg-[#f4f2f2] p-6 rounded-2xl shadow-xl flex flex-col space-y-6 w-full max-w-4xl mx-auto">
//             <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-10">
//                 {/* Photo de profil */}
//                 <div className="relative w-32 h-32 md:w-36 md:h-36">
//                     <img
//                         src={profileImage || "/default-profile.jpg"}
//                         alt="Profil"
//                         className="w-full h-full object-cover rounded-full border-4 border-gray-200 shadow"
//                     />
//                     <button
//                         onClick={triggerFileInput}
//                         className="absolute bottom-0 right-0 bg-white border rounded-full p-2 shadow hover:bg-gray-100 transition"
//                         title="Changer la photo"
//                     >
//                         📷
//                     </button>
//                     <input
//                         type="file"
//                         accept="image/*"
//                         ref={fileInputRef}
//                         onChange={handleImageChange}
//                         className="hidden"
//                     />
//                 </div>

//                 {/* Infos utilisateur */}
//                 <div className="flex flex-col space-y-4 text-gray-700 w-full">
//                     {['name', 'email', 'phone', 'address'].map((field) => (
//                         <div key={field} className="flex flex-col md:flex-row md:items-center md:space-x-4">
//                             <div className="w-28 font-medium text-sm capitalize">{field} :</div>
//                             {isEditing ? (
//                                 <input
//                                     type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
//                                     name={field}
//                                     value={userInfo[field] || ''}
//                                     onChange={handleChange}
//                                     className="flex-1 border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 w-full"
//                                 />
//                             ) : (
//                                 <div className="flex-1 text-base text-gray-800 break-words">{userInfo[field]}</div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Boutons */}
//             <div className="flex flex-col md:flex-row justify-center gap-4 pt-4">
//                 {isEditing ? (
//                     <>

//                     <button onClick={toggleEdit} className="flex items-center gap-2 bg-[#493D9E] hover:bg-[#493D9E] text-white font-semibold px-5 py-2 rounded-lg">
//                             <Save className="w-5 h-5" />
//                             Enregistrer
//                         </button>

//                         <button onClick={cancelEdit} className="flex items-center gap-2 bg-[#A31D1D] hover:bg-[#A31D1D] text-white font-semibold px-5 py-2 rounded-lg">
//                             <X className="w-5 h-5" />
//                             Annuler
//                         </button>
//                     </>
//                 ) : (
//                     <button
//                         className="bg-[#632268] hover:bg-[#632268]/90 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
//                         onClick={toggleEdit}
//                     >
//                         ✏️ Modifier mes informations
//                     </button>
//                 )}

//                 <button
//                     className=" bg-[#1a759f] hover:bg-[#219EBC]/90 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
//                     onClick={() => setShowPasswordModal(true)}
//                 >
//                     🔒 Modifier mon mot de passe
//                 </button>
//             </div>

//             {showPasswordModal && <PasswordModal onClose={() => setShowPasswordModal(false)} />}
//         </div>
//     );
// };

// export default ProfileInfo;

// import React, { useRef, useState, useEffect } from 'react';
// import PasswordModal from "./PasswordModal";
// import { Save, X, Edit, Lock, Camera, User, Mail, Home, Phone, Calendar } from "lucide-react";
// import { motion, AnimatePresence } from 'framer-motion';

// const ProfileInfo = ({ user }) => {
//     const [profileImage, setProfileImage] = useState(user.photoUrl || '');
//     const [isEditing, setIsEditing] = useState(false);
//     const [isSaving, setIsSaving] = useState(false);
//     const [saveSuccess, setSaveSuccess] = useState(false);
//     const [userInfo, setUserInfo] = useState({
//         name: user.name || "",
//         email: user.email || "",
//         phone: user.phone || "",
//         address: user.address || "",
//         bio: user.bio || "Aucune bio pour le moment..."
//     });
    
//     const fileInputRef = useRef();
//     const [showPasswordModal, setShowPasswordModal] = useState(false);

//     const handleImageChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const imageURL = URL.createObjectURL(file);
//             setProfileImage(imageURL);
//         }
//     };

//     const triggerFileInput = () => fileInputRef.current.click();

//     const handleChange = (e) => {
//         setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         // Simulation d'une requête API
//         await new Promise(resolve => setTimeout(resolve, 1500));
//         setIsEditing(false);
//         setSaveSuccess(true);
//         setTimeout(() => setSaveSuccess(false), 3000);
//         setIsSaving(false);
//     };

//     const cancelEdit = () => {
//         setUserInfo(user);
//         setIsEditing(false);
//     };

//     // Animation variants
//     const containerVariants = {
//         hidden: { opacity: 0 },
//         show: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.1
//             }
//         }
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         show: { opacity: 1, y: 0 }
//     };

//     const fieldIcons = {
//         name: <User className="w-4 h-4 text-blue-500" />,
//         email: <Mail className="w-4 h-4 text-purple-500" />,
//         phone: <Phone className="w-4 h-4 text-green-500" />,
//         address: <Home className="w-4 h-4 text-orange-500" />
//     };

//     return (
//         <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-lg"
//         >
//             <motion.div
//                 initial={{ y: -20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="mb-8"
//             >
//                 <h1 className="text-3xl font-bold text-gray-800">Mon Profil</h1>
//                 <p className="text-gray-500 mt-2">Gérez vos informations personnelles</p>
//             </motion.div>

//             <div className="flex flex-col lg:flex-row gap-8">
//                 {/* Colonne de gauche - Informations principales */}
//                 <div className="flex-1 space-y-8">
//                     {/* Section Informations personnelles */}
//                     <motion.div 
//                         variants={containerVariants}
//                         initial="hidden"
//                         animate="show"
//                         className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
//                     >
//                         <motion.div variants={itemVariants}>
//                             <div className="flex items-center gap-3 mb-6">
//                                 <div className="p-2 bg-blue-100 rounded-lg">
//                                     <User className="w-5 h-5 text-blue-600" />
//                                 </div>
//                                 <h2 className="text-xl font-semibold text-gray-800">Informations personnelles</h2>
//                             </div>
//                         </motion.div>

//                         {['name', 'email', 'phone', 'address'].map((field) => (
//                             <motion.div 
//                                 key={field} 
//                                 variants={itemVariants}
//                                 className="py-4 border-b border-gray-100 last:border-0"
//                             >
//                                 <div className="flex justify-between items-center">
//                                     <div className="flex items-center gap-3 text-gray-600">
//                                         {fieldIcons[field]}
//                                         <span className="capitalize">{field === 'name' ? 'Nom complet' : field === 'address' ? 'Adresse' : field}</span>
//                                     </div>

//                                     {isEditing ? (
//                                         <motion.input
//                                             type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
//                                             name={field}
//                                             value={userInfo[field] || ''}
//                                             onChange={handleChange}
//                                             className="w-1/2 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                                             placeholder={`Saisir ${field === 'name' ? 'nom complet' : field}`}
//                                             whileFocus={{ scale: 1.02 }}
//                                         />
//                                     ) : (
//                                         <span className="text-right font-medium">
//                                             {userInfo[field] || <span className="text-gray-400">Non spécifié</span>}
//                                         </span>
//                                     )}
//                                 </div>
//                             </motion.div>
//                         ))}
//                     </motion.div>

//                     {/* Section Informations du compte */}
//                     <motion.div 
//                         className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.3 }}
//                     >
//                         <div className="flex items-center gap-3 mb-6">
//                             <div className="p-2 bg-purple-100 rounded-lg">
//                                 <Lock className="w-5 h-5 text-purple-600" />
//                             </div>
//                             <h2 className="text-xl font-semibold text-gray-800">Sécurité du compte</h2>
//                         </div>

//                         <div className="py-4 flex justify-between items-center">
//                             <div className="flex items-center gap-3 text-gray-600">
//                                 <Lock className="w-4 h-4 text-purple-500" />
//                                 <span>Mot de passe</span>
//                             </div>
//                             <motion.button
//                                 onClick={() => setShowPasswordModal(true)}
//                                 className="text-purple-600 flex items-center gap-2 hover:text-purple-800 transition-colors"
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                             >
//                                 <Edit size={16} />
//                                 <span>Modifier</span>
//                             </motion.button>
//                         </div>
//                     </motion.div>

//                     {/* Boutons d'action */}
//                     <motion.div 
//                         className="flex justify-end gap-4 mt-8"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.4 }}
//                     >
//                         {isEditing ? (
//                             <>
//                                 <motion.button
//                                     onClick={handleSave}
//                                     className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.95 }}
//                                     disabled={isSaving}
//                                 >
//                                     {isSaving ? (
//                                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                         </svg>
//                                     ) : (
//                                         <Save size={16} />
//                                     )}
//                                     <span>{isSaving ? 'Enregistrement...' : 'Enregistrer'}</span>
//                                 </motion.button>
//                                 <motion.button
//                                     onClick={cancelEdit}
//                                     className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl transition-all flex items-center gap-2"
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.95 }}
//                                 >
//                                     <X size={16} />
//                                     <span>Annuler</span>
//                                 </motion.button>
//                             </>
//                         ) : (
//                             <motion.button
//                                 className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
//                                 onClick={() => setIsEditing(true)}
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                             >
//                                 <Edit size={16} />
//                                 <span>Modifier le profil</span>
//                             </motion.button>
//                         )}
//                     </motion.div>

//                     <AnimatePresence>
//                         {saveSuccess && (
//                             <motion.div
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 exit={{ opacity: 0, y: -20 }}
//                                 className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg"
//                             >
//                                 Profil mis à jour avec succès !
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </div>

//                 {/* Colonne de droite - Photo de profil et bio */}
//                 <div className="lg:w-96 space-y-8">
//                     <motion.div 
//                         className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
//                         initial={{ opacity: 0, x: 20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 0.2 }}
//                     >
//                         <h2 className="text-xl font-semibold text-gray-800 mb-6">Photo de profil</h2>

//                         <div className="flex flex-col items-center">
//                             <motion.div 
//                                 className="relative mb-6"
//                                 whileHover={{ scale: 1.02 }}
//                             >
//                                 <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl relative group">
//                                     <img
//                                         src={profileImage || "/default-profile.jpg"}
//                                         className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//                                         alt="Photo de profil"
//                                     />
//                                     <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                                         <Camera className="w-8 h-8 text-white" />
//                                     </div>
//                                 </div>
//                                 <motion.button
//                                     onClick={triggerFileInput}
//                                     className="absolute -bottom-3 -right-3 bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all"
//                                     title="Modifier la photo"
//                                     whileHover={{ scale: 1.1 }}
//                                     whileTap={{ scale: 0.9 }}
//                                 >
//                                     <Camera className="w-5 h-5 text-white" />
//                                 </motion.button>
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     ref={fileInputRef}
//                                     onChange={handleImageChange}
//                                     className="hidden"
//                                 />
//                             </motion.div>

//                             <div className="flex gap-4">
//                                 <motion.button 
//                                     className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.95 }}
//                                     onClick={triggerFileInput}
//                                 >
//                                     Mettre à jour
//                                 </motion.button>
//                                 <motion.button 
//                                     className="text-red-500 hover:text-red-700 font-medium transition-colors"
//                                     whileHover={{ scale: 1.05 }}
//                                     whileTap={{ scale: 0.95 }}
//                                     onClick={() => setProfileImage('')}
//                                 >
//                                     Supprimer
//                                 </motion.button>
//                             </div>
//                         </div>
//                     </motion.div>

//                     <motion.div 
//                         className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 bg-[#D4EBF8]"
//                         initial={{ opacity: 0, x: 20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: 0.3 }}
//                     >
//                         <div className="flex items-center gap-3 mb-6">
//                             <div className="p-2 bg-indigo-100 rounded-lg">
//                                 <Edit className="w-5 h-5 text-indigo-600" />
//                             </div>
//                             <h2 className="text-xl font-semibold text-gray-800">Bio</h2>
//                         </div>

//                         {isEditing ? (
//                             <motion.textarea
//                                 name="bio"
//                                 value={userInfo.bio}
//                                 onChange={handleChange}
//                                 className="w-full border border-gray-200 rounded-xl px-4 py-3 h-40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//                                 placeholder="Décrivez-vous en quelques mots..."
//                                 whileFocus={{ scale: 1.01 }}
//                             />
//                         ) : (
//                             <p className="text-gray-700 leading-relaxed">
//                                 {userInfo.bio || "Aucune bio pour le moment..."}
//                             </p>
//                         )}
//                     </motion.div>
//                 </div>
//             </div>

//             <AnimatePresence>
//                 {showPasswordModal && (
//                     <PasswordModal onClose={() => setShowPasswordModal(false)} />
//                 )}
//             </AnimatePresence>
//         </motion.div>
//     );
// };

// export default ProfileInfo;
////////////////////////////////////////////////////////////////////////
import React, { useRef, useState, useEffect } from 'react';
import PasswordModal from "./PasswordModal";
import { Save, X, Edit, Lock, Camera, User, Mail, Home, Phone } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

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

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setProfileImage(imageURL);
        }
    };

    const triggerFileInput = () => fileInputRef.current.click();

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setIsSaving(true);
        // Simulation d'une requête API
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsEditing(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        setIsSaving(false);
    };

    const cancelEdit = () => {
        setUserInfo(user);
        setIsEditing(false);
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
        name: <User className="w-4 h-4 text-blue-500" />,
        email: <Mail className="w-4 h-4 text-purple-500" />,
        phone: <Phone className="w-4 h-4 text-green-500" />,
        address: <Home className="w-4 h-4 text-orange-500" />
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-lg"
        >
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-gray-800">Mon Profil</h1>
                <p className="text-gray-500 mt-2">Gérez vos informations personnelles</p>
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

                        {['name', 'email', 'phone', 'address'].map((field) => (
                            <motion.div 
                                key={field} 
                                variants={itemVariants}
                                className="py-4 border-b border-gray-100 last:border-0"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        {fieldIcons[field]}
                                        <span className="capitalize">{field === 'name' ? 'Nom complet' : field === 'address' ? 'Adresse' : field}</span>
                                    </div>

                                    {isEditing ? (
                                        <motion.input
                                            type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                                            name={field}
                                            value={userInfo[field] || ''}
                                            onChange={handleChange}
                                            className="w-1/2 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder={`Saisir ${field === 'name' ? 'nom complet' : field}`}
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
                            <h2 className="text-xl font-semibold text-gray-800">Sécurité du compte</h2>
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
                                    onClick={cancelEdit}
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

                {/* Colonne de droite - Photo de profil seulement */}
                <div className="lg:w-96">
                    <motion.div 
                        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Photo de profil</h2>

                        <div className="flex flex-col items-center">
                            <motion.div 
                                className="relative mb-6"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl relative group">
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
                                    onClick={triggerFileInput}
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
                                    onClick={triggerFileInput}
                                >
                                    Mettre à jour
                                </motion.button>
                                <motion.button 
                                    className="text-red-500 hover:text-red-700 font-medium transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setProfileImage('')}
                                >
                                    Supprimer
                                </motion.button>
                            </div>
                        </div>
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

export default ProfileInfo;