import { X } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';
import React, { useState } from "react";

const Connexion = ({ onClose, onSwitchToRegister, isProcessing, onLoginSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSubmit({ email, password, rememberMe });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md mx-4 border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Connexion</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe*</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
                minLength="6"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-600">Se souvenir de moi</label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">Mot de passe oublié ?</a>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion...
                </div>
              ) : 'Se connecter'}
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-gray-500">ou continuer avec</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center space-x-2 text-gray-700 hover:bg-gray-50 transition"
            >
              <FaGoogle className="text-red-500" />
              <span>Google</span>
            </button>

            <div className="text-center text-sm text-gray-600">
              Pas de compte ?{' '}
              <button 
                type="button" 
                onClick={onSwitchToRegister}
                className="text-blue-600 hover:underline"
              >
                S'inscrire
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Connexion;