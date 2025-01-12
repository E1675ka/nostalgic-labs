import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom"; // Import useLocation to get the current route
import { navLinks } from "../constants";
import { menu, close,Nlogo } from "../assets";
import { styles } from "../styles";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const location = useLocation(); // Get the current route

  const handleLinkClick = () => {
    setToggle(false);
  };
 

  return (
    <nav
      className={`w-full py-6 px-10 md:w-full md:px-20 my-3 mx-3 sm:py-4 sm:px-3 rounded-md xl:w-full  items-center md:py-2  top-0 z-20 bg-purple-500/25 shadow-sm shadow-purple-900`}
    >
      <div className="w-full sm:gap-60 flex justify-between md:gap-10 xl:gap-80  items-center max-w-7xl mx-auto">
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
          <p className="text-black text-[13px] font-bold cursor-pointer flex">
           Nostalgic<span className="sm:block hidden">&nbsp; | &nbsp; Labs</span>
          </p>
        </Link>
        <div className=" flex flex-1 justify-end items-center">
        <ul className="list-none hidden sm:flex sm:hidden md:flex flex-row gap-10 relative">
          {navLinks.map((navLink) => (
            <li
              key={navLink.id}
              className={`${
                toggle ? "  text-white" : "text-black group "
              } hover:text-purple-900 hover:underline-offset-2 text-[13px] font-medium cursor-pointer relative`}
            >
              
              <NavLink
                to={`/${navLink.id}`}
                onClick={handleLinkClick}
                activeClassName={navLink.id === "Home" ? "active" : ""}
              >
                {navLink.title}
              </NavLink>
          <span className="absolute left-0 bottom-0 h-1 w-0 bg-purple-800 transition-all duration-300 ease-in-out group-hover:w-10"></span>
            </li>
          ))}

        </ul>



        {/* <div className=" flex flex-1 justify-end items-center"> */}
          <img
            src={toggle ? close : menu}
            className="w-[28px] h-[28px] object-contain md:hidden cursor-pointer"
            onClick={() => setToggle(!toggle)}
            alt="icons"
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-violet-800 absolute top-20 md:hidden right-0 mx-4 my-2 min-w-[140px] z-10 rounded-md`}
          >
            <ul className="list-none flex justify-end md:hidden items-start flex-col gap-4">
              {navLinks.map((navLink) => (
                <li
                  key={navLink.id}
                  className={`${
                    toggle ? "text-white" : "text-secondary "
                  } font-poppins text-[16px] font-medium cursor-pointer  `}
                >
                  <NavLink
                    to={`/${navLink.id}`}
                    onClick={handleLinkClick}
                    activeClassName={navLink.id === "Home" ? "active" : ""}
                  >
                    {navLink.title}
                  </NavLink>

                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
