import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Define the User type
interface User {
  id: string;
  email: string;
  role: string; // e.g., "user" or "admin"
}

// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Create the AuthContext with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          const response = await axios.get("http://localhost:5000/api/auth/me", {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          setUser(response.data.user);
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("token"); // Clear invalid token
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
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      setUser(response.data.user);
    } catch (error) {
      throw new Error(
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Failed to log in. Please check your credentials."
      );
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};