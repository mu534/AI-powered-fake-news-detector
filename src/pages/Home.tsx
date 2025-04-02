import React from "react";
import { Link } from "react-router-dom";
import cyber from "../assets/images/cyber.png";

const Home: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-20 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80")',
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Column: Description */}
            <div className="space-y-6 animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
                Unmask the Truth with AI
              </h1>
              <p className="text-lg md:text-xl font-light text-blue-100">
                Instantly detect fake news with our cutting-edge AI technology.
                Stay informed, not misled.
              </p>
              <Link
                to="/verify"
                className="inline-block bg-white text-blue-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                Verify News Now
              </Link>
            </div>

            {/* Right Column: Cybersecurity Image Placeholder */}
            <div className="relative flex justify-center animate-fade-in-right">
              <div className="w-80 h-80 md:w-96 md:h-96 bg-white rounded-xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src={cyber}
                  alt="Cybersecurity protection"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                  Powered by AI
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
