import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Verify from "./pages/Verify";
import Results from "./pages/Results";
import About from "./pages/About";
import Contact from "./pages/Contact";
import VerificationGuide from "./pages/VerificationGuide";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/results" element={<Results />} />
              <Route
                path="/VerificationGuide"
                element={<VerificationGuide />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
