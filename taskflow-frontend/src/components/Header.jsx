import React from "react";

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center relative overflow-hidden text-center px-4 pt-24 pb-16">
        {/* Floating avatars */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-10 left-20 w-10 h-10 bg-white rounded-full opacity-20 animate-pulse" />
          <div className="absolute top-40 right-20 w-10 h-10 bg-white rounded-full opacity-20 animate-pulse" />
          <div className="absolute bottom-20 left-24 w-10 h-10 bg-white rounded-full opacity-20 animate-pulse" />
          <div className="absolute bottom-10 right-40 w-10 h-10 bg-white rounded-full opacity-20 animate-pulse" />
        </div>

        <div className="z-10">
          <button className="bg-white text-black rounded-full px-4 py-1 text-sm mb-6">
            Simplify your team's workflow now
          </button>
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
          <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-medium">
            Real-Time Collaboration
          </span>
          <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-medium">
            Smart Task Assignment
          </span>
          <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-medium">
            Progress Tracking
          </span>
        </div>
      </section>
  );
}

export default HeroSection;