import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, token, setToken, setUser } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setIsOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white text-black p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Left Section: Logo and Links */}
        <div className="flex items-center justify-between w-full md:w-auto">
          {/* Logo */}
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
            <span className="text-2xl font-extrabold text-gray-800">
              TruthGuard
            </span>
          </Link>

          {/* Hamburger Icon (visible on mobile) */}
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Menu Links (hidden on mobile, visible on larger screens) */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 z-10`}
        >
          <Link
            to="/"
            className="block md:inline-block py-2 md:py-0 hover:text-blue-500"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/verify"
            className="block md:inline-block py-2 md:py-0 hover:text-blue-500"
            onClick={() => setIsOpen(false)}
          >
            Verify
          </Link>
          <Link
            to="/results"
            className="block md:inline-block py-2 md:py-0 hover:text-blue-500"
            onClick={() => setIsOpen(false)}
          >
            Results
          </Link>
          <Link
            to="/VerificationGuide"
            className="block md:inline-block py-2 md:py-0 hover:text-blue-500"
            onClick={() => setIsOpen(false)}
          >
            Verification Guide
          </Link>
          {/* Show Admin link only for users with "admin" role */}
          {token && user?.role === "admin" && (
            <Link
              to="/admin"
              className="block md:inline-block py-2 md:py-0 hover:text-blue-500"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          )}

          {/* Auth Links/Buttons */}
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 mt-4 md:mt-0">
            {token ? (
              <>
                <span className="block md:inline-block py-2 md:py-0 text-gray-800">
                  {user?.email} ({user?.role})
                </span>
                <button
                  onClick={handleLogout}
                  className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Log In
                </Link>
              </>
            )}
            <Link
              to="/contact"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-center"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
