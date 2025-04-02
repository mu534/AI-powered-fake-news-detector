import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  useEffect(() => {
    setIsOpen(false);
  }, [navigate]);

  return (
    <nav className="bg-gradient-to-r from-indigo-900 to-blue-800 text-white py-4 shadow-lg sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md transform hover:scale-105 transition-transform duration-300">
            <svg
              className="h-6 w-6 text-indigo-900"
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
          <span className="text-3xl font-bold tracking-tight">TruthGuard</span>
        </Link>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-blue-300 rounded p-2"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Menu Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-8 absolute md:static top-16 left-0 w-full md:w-auto bg-indigo-900 md:bg-transparent p-6 md:p-0 transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
            <Link
              to="/"
              className="text-lg font-medium hover:text-blue-300 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/verify"
              className="text-lg font-medium hover:text-blue-300 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Verify
            </Link>
            <Link
              to="/results"
              className="text-lg font-medium hover:text-blue-300 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Results
            </Link>
            <Link
              to="/verification-guide"
              className="text-lg font-medium hover:text-blue-300 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Guide
            </Link>
            {token && user?.role === "admin" && (
              <Link
                to="/admin"
                className="text-lg font-medium hover:text-blue-300 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
            )}
          </div>

          {/* Auth Section */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-6 md:mt-0 md:ml-8">
            {token ? (
              <button
                onClick={handleLogout}
                className="bg-transparent border-2 border-white px-4 py-2 rounded-full hover:bg-white hover:text-indigo-900 transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-transparent border-2 border-white px-4 py-2 rounded-full hover:bg-white hover:text-indigo-900 transition-all duration-300 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-indigo-900 px-4 py-2 rounded-full hover:bg-blue-100 transition-all duration-300 text-center font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
