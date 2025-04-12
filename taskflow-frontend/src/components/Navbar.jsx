import React from 'react'

const Navbar = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-gray-800 bg-black z-20 relative">
      <h1 className="text-2xl font-bold text-white">TaskFlow</h1>
      <nav className="hidden md:flex space-x-6">
        <a href="#features" className="text-gray-300 hover:text-white">Features</a>
        <a href="#pricing" className="text-gray-300 hover:text-white">Pricing</a>
        <a href="#about" className="text-gray-300 hover:text-white">About</a>
        <a href="#contact" className="text-gray-300 hover:text-white">Contact</a>
      </nav>
      <button className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
        Get Started
      </button>
    </header>
  )
}

export default Navbar