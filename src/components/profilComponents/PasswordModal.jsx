import React, { useState } from 'react';

const PasswordModal = ({ onClose }) => {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique future à connecter
    if (form.newPassword !== form.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
    } else {
      alert("Mot de passe modifié avec succès (simulé)");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Modifier mon mot de passe</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            name="currentPassword"
            placeholder="Ancien mot de passe"
            className="w-full border p-2 rounded"
            value={form.currentPassword}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="newPassword"
            placeholder="Nouveau mot de passe"
            className="w-full border p-2 rounded"
            value={form.newPassword}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer mot de passe"
            className="w-full border p-2 rounded"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          <div className="flex justify-end space-x-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
