import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center border border-gray-200">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
