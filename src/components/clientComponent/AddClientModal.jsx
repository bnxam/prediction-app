// // components/clients/AddClientModal.jsx
// import React, { useState } from 'react';
// import { X } from 'lucide-react';

// const AddClientModal = ({ isOpen, onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     agence: '',
//     typeClient: '',
//     nature: '',
//     reference: '',
//     codeClient: '',
//     numeroFacture: '',
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//     onClose(); // Ferme le modal après enregistrement
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-white bg-opacity-30 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative animate-fade-in">
//         {/* Close Button */}
//         <button
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//           onClick={onClose}
//         >
//           <X className="w-5 h-5" />
//         </button>

//         <h2 className="text-xl font-semibold text-gray-700 mb-4">Ajouter un nouveau client</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="text-sm text-gray-600">Agence</label>
//               <input
//                 name="agence"
//                 value={formData.agence}
//                 onChange={handleChange}
//                 className="w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               />
//             </div>
//             <div>
//               <label className="text-sm text-gray-600">Type Client</label>
//               <input
//                 name="typeClient"
//                 value={formData.typeClient}
//                 onChange={handleChange}
//                 className="w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               />
//             </div>
//             <div>
//               <label className="text-sm text-gray-600">Nature</label>
//               <input
//                 name="nature"
//                 value={formData.nature}
//                 onChange={handleChange}
//                 className="w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               />
//             </div>
//             <div>
//               <label className="text-sm text-gray-600">Référence</label>
//               <input
//                 name="reference"
//                 value={formData.reference}
//                 onChange={handleChange}
//                 className="w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               />
//             </div>
//             <div>
//               <label className="text-sm text-gray-600">Code Client</label>
//               <input
//                 name="codeClient"
//                 value={formData.codeClient}
//                 onChange={handleChange}
//                 className="w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               />
//             </div>
//             <div>
//               <label className="text-sm text-gray-600">Numéro Facture</label>
//               <input
//                 name="numeroFacture"
//                 value={formData.numeroFacture}
//                 onChange={handleChange}
//                 className="w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               />
//             </div>
//           </div>

//           <div className="pt-4 text-right">
//             <button
//               type="submit"
//               className="bg-yellow-400 hover:bg-yellow-500 text-white px-5 py-2 rounded-full text-sm font-medium"
//             >
//               Enregistrer
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddClientModal;
import React, { useState } from 'react';

const AddClientModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        agence: '',
        type: '',
        nature: '',
        reference: '',
        codeClient: '',
        numeroFacture: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Supprime l'erreur en temps réel
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.agence.trim()) newErrors.agence = 'Agence requise';
        if (!formData.type.trim()) newErrors.type = 'Type requis';
        if (!formData.nature.trim()) newErrors.nature = 'Nature requise';
        if (!formData.reference.trim()) newErrors.reference = 'Référence requise';
        if (!formData.codeClient.trim()) newErrors.codeClient = 'Code client requis';
        if (!formData.numeroFacture.trim()) newErrors.numeroFacture = 'N° facture requis';
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
            agence: '',
            type: '',
            nature: '',
            reference: '',
            codeClient: '',
            numeroFacture: '',
        });
        setErrors({});
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-60 ">
            <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                    Ajouter un nouveau client
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { label: 'Agence', name: 'agence' },
                        { label: 'Type Client', name: 'type' },
                        { label: 'Nature', name: 'nature' },
                        { label: 'Référence', name: 'reference' },
                        { label: 'Code Client', name: 'codeClient' },
                        { label: 'Numéro Facture', name: 'numeroFacture' }
                    ].map(({ label, name }) => (
                        <div key={name}>
                            <label className="text-sm text-gray-600">{label}</label>
                            <input
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 ${
                                    errors[name]
                                        ? 'border-red-500 focus:ring-red-400'
                                        : 'border-gray-300 focus:ring-yellow-400'
                                }`}
                            />
                            {errors[name] && (
                                <p className="text-xs text-red-500 mt-1">{errors[name]}</p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-end mt-6 space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 rounded-lg bg-yellow-400 text-white hover:bg-yellow-500"
                    >
                        Ajouter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddClientModal;
