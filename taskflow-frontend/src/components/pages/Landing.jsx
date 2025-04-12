import React from 'react'
import { Header, Navbar } from '../';
import Avatar from '../../assets/avatar.png';
import { CheckCircle, Users, ClipboardList, Activity } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Navbar */}
      <header className="top-0 left-0 right-0 flex justify-between items-center px-6 py-4 border-b border-gray-800 bg-black z-20 relative">
        <div className="flex items-center space-x-2">
          <span className="text-green-400 text-2xl">
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
        <button className="border border-gray-800 text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition">
          Get Started
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center relative overflow-hidden text-center px-4 pt-24 pb-16 bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Floating avatars */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-10 left-20 w-10 h-10 bg-white rounded-full opacity-20 animate-pulse"><img src={Avatar} alt="avatar" className="object-cover w-full h-full rounded-full"  /></div>
          <div className="absolute top-40 right-20 w-10 h-10 bg-white rounded-full opacity-20 animate-pulse"><img src={Avatar} alt="avatar" className="object-cover w-full h-full rounded-full"  /></div>
          <div className="absolute bottom-20 left-24 w-10 h-10 bg-white rounded-full opacity-20 animate-pulse"><img src={Avatar} alt="avatar" className="object-cover w-full h-full rounded-full"  /></div>
          <div className="absolute bottom-10 right-40 w-10 h-10 bg-white rounded-full opacity-20 animate-pulse"><img src={Avatar} alt="avatar" className="object-cover w-full h-full rounded-full"  /></div>
        </div>

        <div className="z-10">
          <div className="border border-gray-800 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 mb-6 w-fit mx-auto">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-white opacity-80">Simplify your team's workflow now</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Empower Your Team's <br /> Productivity in Real-Time
          </h1>
          <p className="text-gray-300 max-w-xl mx-auto text-lg mb-6">
            Manage projects, assign tasks, set deadlines, and track progress—all in one place. TaskFlow keeps your team aligned, organized, and always on track.
          </p>
          <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
            Get Started
          </button>
        </div>

        {/* Feature tags */}
        <div className="z-10 mt-10 flex flex-wrap justify-center gap-3">
          <span className="flex items-center space-x-1 border border-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium">
            <Users size={14} /> <span>Real-Time Collaboration</span>
          </span>
          <span className="flex items-center space-x-1 border border-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium">
            <ClipboardList size={14} /> <span>Smart Task Assignment</span>
          </span>
          <span className="flex items-center space-x-1 border border-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium">
            <Activity size={14} /> <span>Progress Tracking</span>
          </span>
        </div>
      </section>
      {/**Goals */}
      <section className="flex flex-col items-center justify-center relative overflow-hidden text-center px-4 pt-24 pb-16 bg-gradient-to-b from-black via-gray-900 to-black">
        <h2>These are Our Goal</h2>
        <div>
          <div>
            <h3>100% Remote Focus</h3>
            <p>Empower teams to achieve deep work and maintain peak productivity from anywhere in the world</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing;