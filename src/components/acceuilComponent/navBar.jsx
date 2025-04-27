import { Menu, User } from 'lucide-react';
import React from "react";
import logo from '../../assets/images/2logo.png';
import '../../assets/css/acceuil.css'

function NavBar() {
  return (
    <header className="nav header-area header-sticky shadow-md py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a href="/" className="logo">
            <img src={logo} alt="adna predict logo" className="h-12" />
          </a>
          
          
          <div className="flex items-center space-x-4">
            <button className="border border-red-800 text-red-800 px-4 py-2 rounded-md hover:bg-red-800 hover:text-white transition flex items-center">
              <User className="mr-2 h-4 w-4" />
              Sign In/Up
            </button>
            
            <button className="md:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;