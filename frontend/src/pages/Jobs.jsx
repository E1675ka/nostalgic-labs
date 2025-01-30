import React, { useState } from "react";
import { SectionWrapper } from "../hoc";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { Link } from "react-router-dom";
import { CareerInfo } from "../constants";
import DropDownPage from "../components/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// Card Component
const Card = ({ JobId, jobTitle, Area, index }) => {
  return (
    <motion.div
      animate="visible"
      className="w-full  p-5 m-4 mt-3 flex flex-col items-center shadow-xl rounded-lg transition-transform duration-500 hover:scale-105 "
    >
      <div className="flex flex-row gap-4 w-full items-center justify-between ">
        <div>
          <p className="font-semibold text-purple-800 sm:text-[15px] md:text-[20px]">
            {jobTitle}
          </p>
          <p className="font-semibold text-purple-600 sm:text-[12px] md:text-[15px]">
            {Area}
          </p>
        </div>
        <div className="flex items-center">
          <Link
            to={`/Careers/${JobId}`}
            className="font-semibold sm:text-[15px] md:text-[18px] text-purple-100"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Jobs Component
const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter CareerInfo based on search query
  const filteredCareers = CareerInfo.filter((career) =>
    career.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Search Bar */}
      <div className="relative w-full max-w-md mx-auto mt-5">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-900"
        />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-purple-700/60 text-white p-3 pl-10 rounded-md outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Dropdown Section */}
      <div className="mt-10">
        <DropDownPage />
      </div>

      <Link to="/Jobs">
      <h1 className="font-bold text-tertiary text-[40px] text-center my-8">
        Jobs
      </h1>
      </Link>
      

      <div className="sm:grid gap-6 sm:grid-cols-1 md:flex-col lg:flex">
        {filteredCareers.map((career, index) => (
          <Card
            key={career.JobId}
            JobId={career.JobId}
            jobTitle={career.jobTitle}
            Area={career.Area}
            index={index}
          />
        ))}
      </div>

      {/* See More Link */}
      <div className="flex justify-center mt-5">
        <Link
          to="/Careers"
          className="p-2 hover:bg-purple-400/50 m-4 rounded-md font-semibold hover:shadow-md text-purple-700"
        >
          See more ...
        </Link>
      </div>
    </>
  );
};

export default SectionWrapper(Jobs, "Jobs");
