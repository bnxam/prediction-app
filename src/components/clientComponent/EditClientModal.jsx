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

const EditClientModal = ({ isOpen, onClose, user, onSave }) => {
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
                mdp: ''
            });

        }
    }, [user]);

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'fichier_donnees') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = () => {
        onSave({ ...user, ...formData });
        onClose();
    };

    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-40">
            <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-lg animate-fade-in">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                    Modifier les informations du client
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-gray-600">Code Client</label>
                        <input
                            className="w-full border border-gray-300 rounded-lg p-2"
                            name="code_client"
                            value={formData.code_client}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Nom</label>
                        <input
                            className="w-full border border-gray-300 rounded-lg p-2"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Prénom</label>
                        <input
                            className="w-full border border-gray-300 rounded-lg p-2"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Adresse</label>
                        <input
                            className="w-full border border-gray-300 rounded-lg p-2"
                            name="adresse"
                            value={formData.adresse}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Téléphone</label>
                        <input
                            className="w-full border border-gray-300 rounded-lg p-2"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Date de naissance</label>
                        <input
                            className="w-full border border-gray-300 rounded-lg p-2"
                            name="date_naissance"
                            type="date"
                            value={formData.date_naissance}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            className="w-full border border-gray-300 rounded-lg p-2"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                            title="Veuillez entrer une adresse email valide"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="text-sm text-gray-600">Mot de passe (laisser vide si inchangé)</label>
                        <input
                            className="w-full border border-gray-300 rounded-lg p-2"
                            name="mdp"
                            type="password"
                            value={formData.mdp}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-sm text-gray-600">Importer un fichier (CSV ou Excel)</label>
                        <input
                            type="file"
                            name="fichier_donnees"
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>

                </div>

                <div className="flex justify-end mt-6 space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500 transition-colors"
                    >
                        Enregistrer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditClientModal;
