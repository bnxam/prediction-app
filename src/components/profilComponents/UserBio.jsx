// // UserBio.jsx
// import React, { useState } from "react";
// import { FaQuoteLeft } from "react-icons/fa";

// const UserBio = ({ initialBio = "" }) => {
//     const [bio, setBio] = useState(initialBio);
//     const [isEditing, setIsEditing] = useState(false);

//     const handleChange = (e) => setBio(e.target.value);

//     return (
//         <div className="w-full max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
//             <h2 className="text-xl font-bold flex items-center gap-2 text-blue-700 mb-2">
//                 <FaQuoteLeft /> Bio ou citation personnelle
//             </h2>
//             {isEditing ? (
//                 <textarea
//                     value={bio}
//                     onChange={handleChange}
//                     className="w-full p-3 border rounded-md text-sm text-gray-800 focus:ring focus:ring-blue-300"
//                     rows={4}
//                 />
//             ) : (
//                 <p className="text-gray-700 italic text-sm bg-gray-100 rounded-md p-3 min-h-[64px]">
//                     {bio || "Aucune bio n'a encore été renseignée."}
//                 </p>
//             )}
//             <div className="text-right mt-2">
//                 <button
//                     onClick={() => setIsEditing(!isEditing)}
//                     className="text-sm text-blue-600 hover:underline"
//                 >
//                     {isEditing ? "Enregistrer" : "Modifier"}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default UserBio;
// UserBio.jsx
import React, { useState, useEffect } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import axios from "axios";

const UserBio = ({ initialBio = "" }) => {
  const [bio, setBio] = useState(initialBio);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => setBio(e.target.value);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        "http://127.0.0.1:8000/admin/profile",
        { note: bio },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la bio :", error);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white p-6 rounded-3xl shadow-xl border border-purple-100">
      <h2 className="text-lg sm:text-xl font-semibold text-[#7c3aed] mb-4 flex items-center gap-2">
        <FaQuoteLeft className="text-[#f472b6]" />
        Bio ou citation personnelle
      </h2>

      {isEditing ? (
        <textarea
          value={bio}
          onChange={handleChange}
          className="w-full p-4 rounded-xl border border-purple-300 shadow-sm text-sm focus:ring-2 focus:ring-purple-300 focus:outline-none transition"
          rows={4}
        />
      ) : (
        <div className="bg-purple-50 text-[#4b5563] italic text-sm rounded-xl p-4 shadow-sm min-h-[80px]">
          {bio || "Aucune bio n'a encore été renseignée."}
        </div>
      )}

      <div className="text-right mt-4">
        <button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="bg-[#9333ea] text-white text-sm px-4 py-2 rounded-lg shadow hover:bg-[#7c3aed] transition duration-200"
        >
          {isEditing ? "Enregistrer" : "Modifier"}
        </button>
      </div>
    </div>
  );
};

export default UserBio;
