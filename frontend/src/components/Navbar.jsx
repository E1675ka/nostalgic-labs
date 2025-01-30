import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "../constants";
import { menu, close, Nlogo } from "../assets";

const Navbar = () => {
  const [toggle, setToggle] = useState(false); // Toggle for mobile menu
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Auth state
  const location = useLocation(); // Current route
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsAuthenticated(!!authToken); // Check if user is authenticated
  }, [location]); // Re-run whenever the location changes

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear token
    setIsAuthenticated(false);
    navigate("/SignUp");
  };

  const handleLinkClick = () => setToggle(false); // Close menu on link click

  return (
    <nav className="w-full py-6  px-10 md:w-full md:px-2 my-3 mx-3 sm:py-4 sm:px-3 rounded-md xl:w-full items-center md:py-2 top-0 z-20 bg-purple-400/50 shadow-md shadow-purple-300/40 max-w-[1410px]">
      <div className="sm:gap-60  md:gap-10 xl:gap-80 flex justify-between items-center sm:px-[1rem] md:px-[2rem] lg:px-[3rem]">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={handleLinkClick}
        >
          <img
            src={Nlogo}
            alt="logo"
            width="300px"
            className="w-9 h-9 object-contain"
          />
          <p className="text-purple-700 text-[13px] font-bold cursor-pointer flex">
            Nostalgic
            <span className="sm:block hidden">&nbsp; | &nbsp; Labs</span>
          </p>
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
                    className="text-purple-700 group hover:text-purple-900 hover:underline-offset-2 text-[13px] font-medium cursor-pointer relative"
                  >
                    <NavLink
                      to={`/${navLink.id}`}
                      className={({ isActive }) =>
                        isActive
                          ? "text-purple-900 font-bold"
                          : "text-purple-700"
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

        {/* Auth Buttons */}
        {/* <div className="flex gap-4 justify-end">
          {isAuthenticated ? (
            <button
              className="bg-purple-600  text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/SignIn" onClick={handleLinkClick}>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition w-full">
                  Sign In
                </button>
              </Link>
              <Link to="/SignUp" onClick={handleLinkClick}>
                <button className="bg-transparent text-white border border-white px-4 py-2 rounded-md hover:bg-white hover:text-violet-800 transition w-full">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div> */}

        {/* Mobile Menu Toggle */}

        {/* Mobile Menu */}
        {toggle && (
          <div className="p-6 bg-violet-400/80 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-md sm:top-16 sm:right-4 md:top-20 md:right-8 lg:top-24 lg:right-16 xl:top-28 xl:right-20">
            <ul className="list-none flex flex-col gap-4">
              {navLinks
                .filter((navLink) => {
                  if (navLink.showforAuth === null) return true; // Show for both
                  return navLink.showforAuth === isAuthenticated; // Show only if it matches auth state
                })
                .map((navLink) => (
                  <li
                    key={navLink.id}
                    className="text-white font-medium cursor-pointer"
                  >
                    <NavLink
                      to={`/${navLink.id}`}
                      className={({ isActive }) =>
                        isActive ? "font-bold underline" : "text-white"
                      }
                      onClick={handleLinkClick}
                    >
                      {navLink.title}
                    </NavLink>
                  </li>
                ))}
              {isAuthenticated ? (
                <li>
                  <button
                    className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-700 hover:text-white transition w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/SignIn" onClick={handleLinkClick}>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition w-full">
                        Sign In
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/SignUp" onClick={handleLinkClick}>
                      <button className="bg-transparent text-white border border-white px-4 py-2 rounded-md hover:bg-white hover:text-violet-800 transition w-full">
                        Sign Up
                      </button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
        <div className="flex ml-30">
          <img
            src={toggle ? close : menu}
            className="w-[28px] h-[28px] object-contain cursor-pointer flex items-end   "
            onClick={() => setToggle(!toggle)}
            alt="menu-toggle"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
