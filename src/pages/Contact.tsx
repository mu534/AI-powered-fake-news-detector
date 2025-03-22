import React from "react";

import ContactForm from "../components/ContactForm";

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-5xl w-full flex flex-col md:flex-row items-center">
          {/* Left Column */}
          <div className="md:w-1/2 p-6 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <img
              src="https://via.placeholder.com/400x300?text=Person+Working"
              alt="Person working at desk"
              className="w-full max-w-sm mx-auto rounded-lg shadow-md"
            />
          </div>

          {/* Right Column (Form) */}
          <div className="md:w-1/2 p-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
