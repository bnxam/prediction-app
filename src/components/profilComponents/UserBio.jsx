// UserBio.jsx
import React, { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";

const UserBio = ({ initialBio = "" }) => {
    const [bio, setBio] = useState(initialBio);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => setBio(e.target.value);

    return (
        <div className="w-full max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold flex items-center gap-2 text-blue-700 mb-2">
                <FaQuoteLeft /> Bio ou citation personnelle
            </h2>
            {isEditing ? (
                <textarea
                    value={bio}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md text-sm text-gray-800 focus:ring focus:ring-blue-300"
                    rows={4}
                />
            ) : (
                <p className="text-gray-700 italic text-sm bg-gray-100 rounded-md p-3 min-h-[64px]">
                    {bio || "Aucune bio n'a encore été renseignée."}
                </p>
            )}
            <div className="text-right mt-2">
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-sm text-blue-600 hover:underline"
                >
                    {isEditing ? "Enregistrer" : "Modifier"}
                </button>
            </div>
        </div>
    );
};

export default UserBio;
