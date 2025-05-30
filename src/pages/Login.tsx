import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    try {
      await login(email, password); // Use AuthContext login
      navigate("/verify");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during login. Please try again."
      );
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 py-12">
      <div className="max-w-md w-full mx-4 p-8 bg-white rounded-2xl shadow-xl transform transition-all duration-500 hover:shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-indigo-900 mb-8">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              required
              placeholder="••••••••"
            />
          </div>
          {error && (
            <div className="text-center text-red-600 bg-red-100 p-3 rounded-lg animate-pulse">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 disabled:bg-indigo-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
