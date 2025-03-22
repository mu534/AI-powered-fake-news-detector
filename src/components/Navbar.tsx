import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white text-black p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Left Section: Logo and Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <svg
                className="h-4 w-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h4l3-7 3 7h4m-7 4v7m-4-7h8"
                />
              </svg>
            </div>
            <span className="text-xl font-bold">Fake News Verifier</span>
          </Link>
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link to="/verify" className="hover:text-blue-500">
            Verify
          </Link>
          <Link to="/results" className="hover:text-blue-500">
            Results
          </Link>
        </div>

        {/* Right Section: Buttons */}
        <div className="flex space-x-3 ">
          <Link
            to="/signup"
            className="border border-blue-500 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition"
          >
            Sign Up
          </Link>
          <Link
            to="/contact"
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
