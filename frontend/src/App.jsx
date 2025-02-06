import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Navbar } from "./components";
import { Jobs, Services, About, Careers } from "./pages";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import JobDetailsPage from "./components/JobDetails";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import herobg from "../src/assets/bgpattern4.jpg";
import StarsCanvas from "./components/canvas/Stars";

const App = () => {
  const [showFooter, setShowFooter] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(null);

  useEffect(() => {
    // Check authentication status
    const authToken = localStorage.getItem("authToken");
    setIsUserSignedIn(!!authToken); // Set to true if token exists, false otherwise
    // console.log("Auth Token:", authToken, "Is User Signed In:", !!authToken);

    // Handle footer visibility on scroll
    const handleScroll = () => {
      const threshold = 200;
      const hasScrolledToBottom =
        document.documentElement.scrollHeight -
          window.scrollY -
          window.innerHeight <
        threshold;
      setShowFooter(hasScrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isUserSignedIn === null) {
    return <div>Loading...</div>; // Show loading state while checking authentication
  }

  return (
    <Router>
      {/* Main Wrapper */}
      <div
        className="relative z-0 overflow-hidden h-full flex flex-col"
        style={{
          backgroundImage: `
     
      url(${herobg})
    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
        }}
      >
        <StarsCanvas />

        {/* Navbar */}
        <header className="w-full  z-10 flex justify-center shadow-md ">
          <Navbar />
        </header>

        {/* Main Content */}
        <main className="flex-grow relative z-0">
          <Routes>
            {/* Redirect unauthenticated users to SignIn */}
            <Route
              path="/"
              element={isUserSignedIn ? <Home /> : <Navigate to="/SignIn" />}
            />

            {/* Auth Routes */}
            <Route
              path="/SignUp"
              element={<SignUp setIsUserSignedIn={setIsUserSignedIn} />}
            />
            <Route
              path="/SignIn"
              element={<SignIn setIsUserSignedIn={setIsUserSignedIn} />}
            />

            {/* Other Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/services" element={<Services />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/Careers/:JobId" element={<JobDetailsPage />} />
          </Routes>
        </main>

        {/* Footer */}
        {showFooter && (
          <footer className="w-full mt-auto">
            <Footer />
          </footer>
        )}
      </div>
    </Router>
  );
};

export default App;
