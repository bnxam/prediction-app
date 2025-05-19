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

import React, { useRef, useState } from 'react';
import PasswordModal from "./PasswordModal";
import { Save, X, Edit, Lock, Camera } from "lucide-react";

const ProfileInfo = ({ user }) => {
    const [profileImage, setProfileImage] = useState(user.photoUrl || '');
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState(user);
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

    const toggleEdit = () => setIsEditing(!isEditing);

    const cancelEdit = () => {
        setUserInfo(user);
        setIsEditing(false);
    };

    return (
        <div className="bg-[#ffe3ad] p-8 rounded-2xl shadow-xl border-2 border-[#5C7285] w-full  mx-auto">
            {/* Header avec titre */}
            <div className="mb-8 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-800">Mon Profil</h2>
                <p className="text-gray-500 mt-1">Gérez vos informations personnelles</p>
            </div>

            <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
                {/* Photo de profil - Version améliorée */}
                <div className="relative group shrink-0">
                    <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                        <img
                            src={profileImage || "/default-profile.jpg"}
                            alt="Profil"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                    </div>
                    <button
                        onClick={triggerFileInput}
                        className="absolute -bottom-2 -right-2 bg-[#af7c49] p-2.5 rounded-full shadow-lg hover:bg-[#af7c49] transition-all duration-300 flex items-center justify-center"
                        title="Changer la photo"
                    >
                        <Camera className="w-5 h-5 text-white" />
                        <span className="sr-only">Changer la photo</span>
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        className="hidden"
                    />
                </div>

                {/* Infos utilisateur - Version améliorée */}
                <div className="flex-1 space-y-5 w-full">
                    {['name', 'email', 'phone', 'address'].map((field) => (
                        <div key={field} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-start">
                            <label className="text-sm font-semibold text-gray-600 capitalize md:text-right md:pt-2.5 col-span-1">
                                {field}
                            </label>
                            {isEditing ? (
                                <div className="col-span-3">
                                    <input
                                        type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                                        name={field}
                                        value={userInfo[field] || ''}
                                        onChange={handleChange}
                                        className="w-full border border-gray-200 bg-white px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition text-gray-700 placeholder-gray-400"
                                        placeholder={`Entrez votre ${field}`}
                                    />
                                </div>
                            ) : (
                                <div className="col-span-3 text-gray-800 break-words py-2.5 px-4 bg-gray-50 rounded-xl min-h-[44px] flex items-center">
                                    {userInfo[field] || <span className="text-gray-400 italic">Non renseigné</span>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Boutons - Version améliorée */}
            <div className="flex flex-wrap justify-center gap-4 mt-10">
                {isEditing ? (
                    <>
                        <button 
                            onClick={toggleEdit}
                            className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            <Save size={18} />
                            <span>Enregistrer les modifications</span>
                        </button>
                        <button 
                            onClick={cancelEdit}
                            className="flex items-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            <X size={18} />
                            <span>Annuler</span>
                        </button>
                    </>
                ) : (
                    <button
                        className="flex items-center gap-3 bg-[#e09443] hover:bg-[#e09443] text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                        onClick={toggleEdit}
                    >
                        <Edit size={18} />
                        <span>Modifier le profil</span>
                    </button>
                )}

                <button
                    className="flex items-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                    onClick={() => setShowPasswordModal(true)}
                >
                    <Lock size={18} />
                    <span>Changer le mot de passe</span>
                </button>
            </div>

            {showPasswordModal && <PasswordModal onClose={() => setShowPasswordModal(false)} />}
        </div>
    );
};

export default ProfileInfo;