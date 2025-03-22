import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic (e.g., API call)
    console.log("Subscribed with email:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gray-800 text-white p-20 mb-12">
      <div className="max-w-6xl mx-auto">
        {/* Subscribe Section */}
        <div className="text-center mb-6">
          <p className="text-lg mb-2">Subscribe to our newsletter</p>
          <form
            onSubmit={handleSubscribe}
            className="flex justify-center items-center space-x-2"
          >
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Input your email"
                className="pl-10 pr-4 py-2 rounded-1-full border border-white focus:outline-none text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-full hover:bg-blue-600"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Middle Section */}
        <div className="flex justify-between items-center border-t border-b border-gray-600 py-4 mb-4">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-blue-500 rounded-full mr-2"></div>
            <p className="text-lg">Fake News Verifier</p>
          </div>
          <div className="flex space-x-4">
            <Link to="/pricing" className="hover:text-gray-300">
              Pricing
            </Link>
            <Link to="/about" className="hover:text-gray-300">
              About us
            </Link>
            <Link to="/features" className="hover:text-gray-300">
              Features
            </Link>
            <Link to="/help" className="hover:text-gray-300">
              Help Center
            </Link>
            <Link to="/contact" className="hover:text-gray-300">
              Contact us
            </Link>
            <Link to="/faqs" className="hover:text-gray-300">
              FAQs
            </Link>
            <Link to="/careers" className="hover:text-gray-300">
              Careers
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-center">
          <div>
            <p>
              © 2024 Brand, Inc. •{" "}
              <a href="/privacy" className="hover:text-gray-300">
                Privacy
              </a>{" "}
              •{" "}
              <a href="/terms" className="hover:text-gray-300">
                Terms
              </a>{" "}
              •{" "}
              <a href="/sitemap" className="hover:text-gray-300">
                Sitemap
              </a>
            </p>
            <div className="mt-2">
              <select className="bg-gray-700 text-white p-1 rounded">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-9.019-7.619-11.018-3.869v-2z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
