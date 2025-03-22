import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[80vh] flex items-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80")',
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white uppercase mb-4">
            AI-Powered Fake News Detector
          </h1>
          <p className="text-xl md:text-2xl text-white uppercase mb-6">
            Verify News in Seconds
          </p>
          <Link
            to="/verify"
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
          >
            Check News Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
