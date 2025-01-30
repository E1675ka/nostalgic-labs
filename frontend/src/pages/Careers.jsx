import React, { useState, useEffect } from "react";
import { CareerInfo } from "../constants/index";
import { SectionWrapper } from "../hoc";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { Link } from "react-router-dom";
import { Card }from "../components/Card";
import Lottie from "lottie-react";

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
    <p className="text-[16px] flex-wrap text-purple-180 cursor-pointer w-full bg-purple-200/60 gap-4 shadow-md  m-2 p-3 flex items-start hover:shadow-sm hover:shadow-purple-200 rounded-md  ">
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




// Careers Component
const Careers = (JobId) => {
  return (
    <>
      <h1 className="flex font-bold text-[40px] text-purple-900 text-center mb-8">
        Careers
      </h1>
      {CareerInfo.map((career) => (
        <div className="relative items-center ">
          <Link
            key={career.JobId}
            to={`/Careers/${career.JobId}`}
            className="font-semibold w-50 z-30 ease-in-out transform  hover:scale-[1.09]  hover:bg-purple-100 hover:text-purple-800  absolute  sm:left-[28rem] md:left-[38rem] lg:left-[40rem] xl:left-[45rem] left-[20rem] top-[4rem] sm:text-[15px] md:text-[18px] bg-purple-500 p-3  rounded-lg text-white"
          >
            Apply
          </Link>
          <Card
            Business={career.Business}
            Type={career.Type}
            Locations={career.Locations}
            JobDescription={career.JobDescription}
            JobSummary={career.JobSummary}
            Responsibilities={career.Responsibilities}
            Qualifications={career.Qualifications}
            Compensation={career.Compensation}
          />
        </div>
      ))}
    </>
  );
};

export default SectionWrapper(Careers, "Careers");
