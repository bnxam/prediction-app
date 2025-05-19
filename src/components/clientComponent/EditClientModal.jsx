import React, { useState, useEffect } from 'react';

const EditClientModal = ({ isOpen, onClose, client, onSave }) => {
    const [formData, setFormData] = useState(client || {});

    useEffect(() => {
        setFormData(client || {});
    }, [client]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    if (!isOpen || !client) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-40 ">
            <div className="bg-white w-full max-w-2xl p-6 rounded-2xl shadow-lg animate-fade-in">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                    Modifier les informations du client
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm text-gray-600">Agence</label>
                        <input
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            name="agence"
                            value={formData.agence || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Type Client</label>
                        <input
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            name="type"
                            value={formData.type || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Nature</label>
                        <input
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            name="nature"
                            value={formData.nature || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Référence</label>
                        <input
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            name="reference"
                            value={formData.reference || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Code Client</label>
                        <input
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            name="codeClient"
                            value={formData.codeClient || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-600">Numéro Facture</label>
                        <input
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            name="numeroFacture"
                            value={formData.numeroFacture || ''}
                            onChange={handleChange}
                        />
                    </div>
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
                        Enregistrer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditClientModal;
