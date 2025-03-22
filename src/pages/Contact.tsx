import React from "react";
import { Link } from "react-router-dom";
import ContactForm from "../components/ContactForm";

const Contact: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Fake News</h2>
      <div className="mb-4 space-x-4">
        <Link to="/signup" className="text-blue-500">
          Sign Up
        </Link>
        <Link to="/contact" className="text-blue-500">
          Contact Us
        </Link>
      </div>
      <h3 className="text-xl font-medium mb-2">Contact Us</h3>
      <ContactForm />
    </div>
  );
};

export default Contact;
