import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-neutral-950 py-10 px-6 md:px-16 text-gray-400 text-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#privacy" className="hover:text-white">Privacy Policy</a>
            <a href="#terms" className="hover:text-white">Terms of Service</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
  )
}

export default Footer;