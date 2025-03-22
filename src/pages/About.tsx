import React from "react";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Fake News</h2>
      <p className="mb-4">Verify</p>
      <div className="space-y-2">
        <Link to="/about" className="block text-blue-500">
          About us
        </Link>
        <Link to="/features" className="block text-blue-500">
          Features
        </Link>
        <Link to="/help" className="block text-blue-500">
          Help Center
        </Link>
        <Link to="/contact" className="block text-blue-500">
          Contact us
        </Link>
        <Link to="/faqs" className="block text-blue-500">
          FAQs
        </Link>
        <Link to="/careers" className="block text-blue-500">
          Careers
        </Link>
      </div>
      <p className="mt-4">Verify</p>
      <p className="mt-2">English</p>
      <p className="mt-2">Made with Visily</p>
    </div>
  );
};

export default About;
