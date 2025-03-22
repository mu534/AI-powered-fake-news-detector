import React from "react";
import NewsInput from "../components/NewsInput";

const Verify: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center border border-gray-200">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
          Verify News
        </h2>
        <h3 className="text-2xl font-semibold text-gray-600 mb-6">Article</h3>
        <NewsInput redirectTo="/results" />
      </div>
    </div>
  );
};

export default Verify;
