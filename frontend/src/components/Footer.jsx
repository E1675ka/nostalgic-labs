import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "../constants";
import { menu, close, Nlogo } from "../assets";
import SocialMediaIcons from "./SocialMediaIcons";
import { styles } from "../styles";

const Footer = () => {
  const [toggle, setToggle] = useState(false); // Toggle for mobile menu
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Auth state
  const location = useLocation(); // Current route
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsAuthenticated(!!authToken); // Check if user is authenticated
  }, [location]); // Re-run whenever the location changes


  const handleLinkClick = () => setToggle(false); // Close menu on link click

  return (
    <nav className="w-full py-6  px-10 md:w-full md:px-2 my-3 sm:py-4 sm:px-3 rounded-md xl:w-full items-center md:py-2 top-0 z-20 bg-purple-500/25 shadow-sm shadow-purple-900">
      <div className="sm:gap-60  md:gap-10 xl:gap-80 flex justify-between items-center max-w-full sm:px-[1rem] md:px-[2rem] lg:px-[3rem]">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={handleLinkClick}
        >
          <Link
            className={`flex items-center pr-4  hover:text-purple-900 text-purple-700 font-bold text-[13px] cursor-pointer `}
            to="/About"
            type="mail"
          >
            All Rights Reserved  nostalgicLabs 2024&copy;
          </Link>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-1 justify-center items-center">
          {isAuthenticated ? (
            <ul className="list-none flex flex-row gap-10 relative items-center">
              {navLinks
                .filter((navLink) => navLink.showforAuth === true) // Only show links for authenticated users
                .map((navLink) => (
                  <li
                    key={navLink.id}
                    className=" group hover:text-purple-900 hover:underline-offset-2 text-[13px] font-medium cursor-pointer relative"
                  >
                    <NavLink
                      to={`/${navLink.id}`}
                      className={({ isActive }) =>
                        isActive
                          ? "text-purple-900 font-extrabold"
                          : "text-purple-900"
                      }
                      onClick={handleLinkClick}
                    >
                      {navLink.title}
                    </NavLink>
                    <span className="absolute left-0 bottom-0 h-1 w-0 bg-purple-800 transition-all duration-300 ease-in-out group-hover:w-10"></span>
                  </li>
                ))}
            </ul>
          ) : null}
        </div>
        <SocialMediaIcons />
      </div>
    </nav>
  );
};

export default Footer;
