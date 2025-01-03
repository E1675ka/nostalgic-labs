import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Hero, Navbar } from "./components";
import { Help, InternetPlans } from "./pages";
import Home from "./pages/Home";
import Footer from "./components/Footer";

const App = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Adjust the threshold as needed
      const threshold =200;

      // Check if user has scrolled close to the bottom
      if (documentHeight - scrollTop - windowHeight < threshold) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Router>
        <div className="relative z-0 bg-slate-900/10">
          <div className=" bg-cover  w-full m-2  z-10 flex justify-center bg-no-repeat  bg-center">
            <Navbar />
          </div>  
          <div className="relative z-1 bg-slate-00 h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/help" element={<Help />} />
              <Route path="/internetPlans" element={<InternetPlans />} />
            </Routes>
          </div>
          {showFooter && (
            <div className="bg-slate-950 fixed bottom-0 w-screen p-2 mt-2  ">
              <Footer />
            </div>
          )}
        </div>
      </Router>
    </>
  );
};

export default App;
