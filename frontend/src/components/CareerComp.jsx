import React, { useState, useEffect } from "react";
import { CareerPrev } from "../constants/index";
import { SectionWrapper } from "../hoc";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { Link } from "react-router-dom";
// ReadMore Component
const ReadMore = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  if (!text) {
    return null; // Safeguard: If no text is provided, render nothing
  }

  return (
    <p className="text-[16px] flex-wrap text-purple-180 cursor-pointer w-full bg-purple-200/60 gap-4 shadow-md  mt-1 p-3 flex items-center hover:shadow-sm hover:shadow-purple-200 rounded-md  ">
      {isExpanded ? text : `${text.slice(0, maxLength)}...`}
      <span
        onClick={toggleReadMore}
        className="text-blue-500 cursor-pointer ml-2 text-[16px] hover:text-slate-100"
      >
        {isExpanded ? "Read Less" : "Read More"}
      </span>
    </p>
  );
};

// Cards Component
const Cards = ({
  Business,
  Locations,
  Type,
  JobDescription,
  JobSummary,
  Responsibilities,
  Qualifications,
  Compensation,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const [cardStyle, setCardStyle] = useState({
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 1s ease-in-out",
    transform: "scale(1)",
    backgroundColor:"",
    width: "900px",
    height: "700px",
    marginBottom: "1.5rem",
    display: "flex",
    flexDirection: "column",
    padding: "1.5rem",
  });

  const handleResize = () => {
    setCardStyle((prevStyle) => ({
      ...prevStyle,
      width: window.innerWidth <= 720 ? "100%" : "full",
      height: window.innerWidth <= 720 ? "auto" : "auto",
    }));
  };

  useEffect(() => {
    handleResize(); // Set initial style based on window size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
<motion.div  variants={textVariant()}
      className=" flex flex-col items-center shadow-xl rounded-lg z-10"
      style={{
        ...cardStyle,
        transform: isHovered ? "scale(1.05)" : cardStyle.transform,
        backgroundColor: isHovered ? "" : cardStyle.backgroundColor,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-row gap-6 w-full items-center ">
        <p className="font-semibold  sm:text-[15px] md:text-[18px] text-purple-500">Business:</p>{" "}
        <p className="font-semibold text-purple-800">{Business}</p>{" "}

      </div>
      <div className="flex flex-row gap-6 w-full items-center ">
        <p className="font-semibold  sm:text-[15px] md:text-[18px] text-purple-500">Location:</p>
        <p className="font-semibold text-purple-800">{Locations}</p>{" "}
      </div>
      <div className="flex flex-row gap-[60px] w-full items-center">
        <p className="font-semibold  sm:text-[15px] md:text-[18px] text-purple-500">Type:</p>
        <p className="font-semibold text-purple-800">{Type}</p>{" "}


      </div>
      <div className="flex flex-col justify-start  w-full items-start">
        <p className="font-semibold  sm:text-[15px] md:text-[18px] text-purple-500">Job Description:</p>
        <ReadMore text={JobDescription} maxLength={50} />

      </div>
     <Link 
     to="/Careers"
     className="p-2  hover:bg-purple-400/50 m-4 rounded-md font-semibold hover:shadow-md "
     >
      see more ...
     </Link>
    </motion.div>
  );
};

// Careers Component
const CareersComp = () => {
  return (
    <>
      <h1 className="flex font-bold text-tertiary  text-[40px] text-center mb-8">Careers</h1>
      {CareerPrev.map((career) => (
        <Cards
          key={career.id}
          Business={career.Business}
          Type={career.Type}
          Locations={career.Locations}
          JobDescription={career.JobDescription}
         
        />
      ))}
    </>
  );
};

export default SectionWrapper(CareersComp, "CareersComp");
