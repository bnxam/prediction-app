import { User } from 'lucide-react';
import React, { useState , useEffect } from "react";
import logo from '../../assets/images/logo1.png';
import Connexion from '../acceuilComponent/connexion.jsx';
import Inscription from '../acceuilComponent/inscription.jsx';

function NavBar() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLoginSubmit = (formData) => {
        setIsProcessing(true);
        console.log('Login data:', formData);
        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            setShowLoginModal(false);
        }, 1500);
    };

    const handleRegisterSubmit = (formData) => {
        setIsProcessing(true);
        console.log('Register data:', formData);
        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            setShowRegisterModal(false);
        }, 1500);
    };

    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-40 ${scrolled
                    ? "bg-[#364958]/70 backdrop-blur-md shadow-lg" // Style solide au scroll
                    : "bg-transparent border-transparent" // Style initial transparent
                } transition-all duration-500 ease-in-out`}>
                <div className="container mx-auto px-5">
                    <div className="flex justify-between items-center py-3">
                        <a href="/" className="flex items-center space-x-2 group">
                            <img src={logo} alt="Logo" className="h-9" />
                        </a>

                        <div className="flex space-x-3">
                            <button
                                onClick={() => setShowLoginModal(true)}
                                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 rounded-full transition-all duration-300 hover:shadow-lg"
                            >
                                <User className="w-5 h-5" />
                                <span>Connexion</span>
                            </button>
                            <button
                                onClick={() => setShowRegisterModal(true)}
                                className="flex items-center space-x-2 bg-[#c1a34f] hover:bg-[#c9b06a] border border-[#8e742c] text-[#fff] px-4 py-2 rounded-full transition-all duration-300 hover:shadow-lg"
                            >
                                <span>S'inscrire</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Login Modal */}
            {showLoginModal && (
                <Connexion
                    onClose={() => setShowLoginModal(false)}
                    onSwitchToRegister={() => {
                        setShowLoginModal(false);
                        setShowRegisterModal(true);
                    }}
                    isProcessing={isProcessing}
                    onLoginSubmit={handleLoginSubmit}
                />
            )}

            {/* Register Modal */}
            {showRegisterModal && (
                <Inscription
                    onClose={() => setShowRegisterModal(false)}
                    onSwitchToLogin={() => {
                        setShowRegisterModal(false);
                        setShowLoginModal(true);
                    }}
                    isProcessing={isProcessing}
                    onRegisterSubmit={handleRegisterSubmit}
                />
            )}
        </>
    );
}

export default NavBar;