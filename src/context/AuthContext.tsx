import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Define the User type
interface User {
  id: string;
  email: string;
  role: string; // e.g., "user" or "admin"
}

// Define FactCheck types
interface FactCheckResult {
  claim: string;
  claimant: string;
  date: string;
  publisher: string;
  rating: string;
  url: string;
  image: string | null;
}

interface NewsResult {
  title: string;
  description: string;
  url: string;
  image: string | null;
  publishedAt: string;
  source: string;
}

interface FactCheckResponse {
  factCheckResults: FactCheckResult[];
  newsResults: NewsResult[];
}

// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  factCheck: (
    content: string,
    includeNews?: boolean
  ) => Promise<FactCheckResponse>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const FACT_CHECK_URL = `${API_URL}/fact-check`;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          const response = await axios.get(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          setUser(response.data.user);
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Failed to log in. Please check your credentials."
      );
    }
  };

  // Fact-check function (no token required)
  const factCheck = async (
    content: string,
    includeNews: boolean = false
  ): Promise<FactCheckResponse> => {
    try {
      const headers: { [key: string]: string } = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`; // Include token if present
      }
      const response = await axios.post(
        FACT_CHECK_URL,
        { content, includeNews },
        { headers }
      );
      return response.data as FactCheckResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Fact-check failed";
        if (status === 404) {
          throw new Error("No fact-check results found for this content.");
        }
        throw new Error(`Request failed with status ${status}: ${message}`);
      }
      throw new Error("Fact-check failed. Please try again.");
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
        setToken,
        setUser,
        factCheck,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
