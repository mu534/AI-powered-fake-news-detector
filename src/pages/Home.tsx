import React from "react";
import { Link } from "react-router-dom";
import cyber from "../assets/images/cyber.png";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Now acts as the first button */}
      <Link
        to="/verify"
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden group transition-all duration-500 hover:bg-slate-800"
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 animate-gradient-shift"></div>
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-6 animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 group-hover:from-cyan-400 group-hover:to-blue-300 transition-all duration-500">
                Unmask the Truth with AI
              </h1>
              <p className="text-lg md:text-xl font-light text-slate-300 group-hover:text-slate-200 transition-colors duration-500">
                Instantly detect fake news with our cutting-edge AI technology.
                Stay informed, not misled.
              </p>
              <div className="flex space-x-4">
                <div className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl shadow-blue-500/20">
                  Verify News Now
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="relative flex justify-center animate-fade-in-right">
              <div className="w-80 h-80 md:w-96 md:h-96 bg-slate-800 rounded-xl shadow-2xl overflow-hidden transform rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <img
                  src={cyber}
                  alt="Cybersecurity protection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Powered by AI
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Home;
