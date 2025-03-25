import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Client-side validation
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
      const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000/api/auth/login";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to log in.");
        } else {
          const text = await response.text();
          console.error("Non-JSON response:", {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            body: text,
          });
          throw new Error(
            "Received an unexpected response from the server. Please try again later."
          );
        }
      }

      const { accessToken, refreshToken } = await response.json();
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message === "Failed to fetch") {
          setError(
            "Cannot connect to the server. Please ensure the backend is running."
          );
        } else {
          setError(
            err.message || "An error occurred during login. Please try again."
          );
        }
        console.error("Login error:", err);
      } else {
        setError(
          "An unexpected error occurred during login. Please try again."
        );
        console.error("Login error (non-Error type):", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-20">
      <h2 className="text-3xl font-bold text-center mb-6">Log In</h2>
      <form onSubmit={handleLogin} className="space-y-4">
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {error && (
          <div className="text-center text-lg text-red-500">
            <p>{error}</p>
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
        >
          {loading ? "Logging In..." : "Log In"}
        </button>
      </form>
      <p className="mt-4 text-center">
        Don’t have an account?{" "}
        <a href="/signup" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login;
