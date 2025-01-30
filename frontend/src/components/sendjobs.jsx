import React, { useState, useEffect } from "react";
import { CareerInfo } from "../constants/index";
import { SectionWrapper } from "../hoc";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { Link } from "react-router-dom";

const Cards = ({ jobTitle, Locations, JobId }) => {
  const [isHovered, setIsHovered] = useState(false);

  const [cardStyle, setCardStyle] = useState({
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 1s ease-in-out",
    transform: "scale(1)",
    backgroundColor: "",
    width: "900px",
    height: "700px",
    marginBottom: "1.5rem",
    display: "flex",
    flexDirection: "row",
    padding: "1.5rem",
    margin: "20rem",
  });

  const handleResize = () => {
    setCardStyle((prevStyle) => ({
      ...prevStyle,
      width: window.innerWidth <= 720 ? "100%" : "full",
      height: window.innerWidth <= 720 ? "auto" : "100px",
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
    <motion.div
      variants={textVariant()}
      className="flex flex-col items-center shadow-xl rounded-lg"
      style={{
        ...cardStyle,
        transform: isHovered ? "scale(1.05)" : cardStyle.transform,
        backgroundColor: isHovered ? "" : cardStyle.backgroundColor,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-row gap-2 w-full items-start justify-between">
        <div>
          <p className="font-semibold text-purple-800 sm:text-[15px] md:text-[25px]">
            {jobTitle}
          </p>
          <p className="font-semibold text-purple-800 sm:text-[12px] md:text-[15px]">
            {Locations}
          </p>
        </div>
        <div>
          <Link
            to={`/Careers/${encodeURIComponent(JobId)}`} // Use the jobId for unique URLs
            className="font-semibold sm:text-[15px] md:text-[18px] text-purple-500"
          >
            Apply
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Jobs = ({JobId}) => {
    console.log( JobId)

  return (
    <>
      <h1 className="font-bold text-tertiary text-[40px] text-center mb-8">
        Jobs
      </h1>
      {/* Render cards for CareerInfo */}
      {CareerInfo.map((job) => (
        <Cards
          key={job.id}
          jobTitle={job.jobTitle} // Use jobTitle as the job title
          Locations={job.Locations}
        />
      ))}
      <Link
        to="/Careers"
        className="p-2 hover:bg-purple-400/50 m-4 rounded-md font-semibold hover:shadow-md"
      >
        see more ...
      </Link>
    </>
  );
};

export default SectionWrapper(Jobs, "Jobs");
