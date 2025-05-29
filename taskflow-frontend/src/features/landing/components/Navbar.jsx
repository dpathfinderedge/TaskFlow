import React from 'react';
import { CheckCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="top-0 left-0 right-0 flex justify-between items-center px-6 py-4 border-b border-gray-800 bg-black/20 backdrop-blur z-20 fixed">
        <div className="flex items-center space-x-2">
          <span className="text-blue-400 text-2xl">
            <CheckCircle size={28} />
          </span>
          <h1 className="text-2xl font-bold text-white">TaskFlow</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#features" className="text-gray-300 hover:text-white">Features</a>
          <a href="#pricing" className="text-gray-300 hover:text-white">Pricing</a>
          <a href="#about" className="text-gray-300 hover:text-white">About</a>
          <a href="#contact" className="text-gray-300 hover:text-white">Contact</a>
        </nav>
        <a href="/register" className="border border-gray-800 text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition">
          Get Started
        </a>
      </header>
  )
}

export default Navbar;