import { fadeIn, textVariant } from "../utils/motion";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { CareerInfo } from "../constants/index";
import Background from "../assets/bgpattern4.jpg";

export const Card = ({
  JobId,
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Trigger animation once when in view

  // Framer Motion variants for animations
  const textVariant = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const lottieVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.3 } },
  };

  const [cardStyle, setCardStyle] = useState({
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.5s ease-in-out",
    transform: "scale(1)",
    backgroundColor: "",
    width: "900px",
    height: "700px",
    marginBottom: "1.5rem",
    display: "flex",
    flexDirection: "column",
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
    <motion.div
      className=" flex flex-col items-center shadow-xl rounded-lg"
      style={{
        ...cardStyle,
        transform: isHovered ? "scale(1)" : cardStyle.transform,
        backgroundColor: isHovered ? "" : cardStyle.backgroundColor,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={ref}
      variants={textVariant}
      animate={isInView ? "visible" : "hidden"}
    >
      <div
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
        }}
        className="w-full p-4 rounded-lg"
      >
        <div className="flex flex-row justify-between gap-6 w-full items-center ">
          <div className="flex flex-row gap-6 items-center ">
            {" "}
            <p className="font-semibold  sm:text-[15px] md:text-[18px] text-purple-500">
              Business:
            </p>
            <p className="font-semibold text-purple-800">{Business}</p>
          </div>
        </div>
        <div className="flex flex-row gap-6 w-full items-center ">
          <p className="font-semibold  sm:text-[15px] md:text-[18px] text-purple-500">
            Location:
          </p>
          <p className="font-semibold text-purple-800">{Locations}</p>
        </div>
        <div className="flex flex-row gap-[60px] w-full items-center">
          <p className="font-semibold  sm:text-[15px] md:text-[18px] text-purple-500">
            Type:
          </p>
          <p className="font-semibold text-purple-800">{Type}</p>
        </div>
        <div className="flex flex-col justify-start  w-full items-start">
          <p className="font-semibold  sm:text-[15px] md:text-[18px] text-purple-500">
            Job Description:
          </p>
          <p className=" shadow-sm p-2 m-3  sm:text-[15px] md:text-[16px]  text-slate-700">
            {JobDescription}
          </p>
        </div>
        <div className="flex flex-col justify-start  w-full items-start">
          <p className="font-semibold  sm:text-[15px] md:text-[18px] text-purple-500">
            Summary:
          </p>
          <p className=" shadow-sm p-2 m-3  sm:text-[15px] md:text-[16px]  text-slate-700">
            {JobSummary}
          </p>
        </div>
        <div className="flex flex-col justify-start  w-full items-start">
          <p className="font-semibold  sm:text-[15px] md:text-[18px] text-purple-500">
            Responsibilities:
          </p>
          <p className=" shadow-sm p-2 m-3  sm:text-[15px] md:text-[16px]  text-slate-700">
            {Responsibilities}
          </p>
        </div>
        <div className="flex  flex-col justify-start  w-full items-start">
          <p className="font-semibold  sm:text-[15px] md:text-[18px]  text-purple-500">
            Qualifications:
          </p>
          <p className=" shadow-sm p-2 m-3  sm:text-[15px] md:text-[16px]  text-slate-700">
            {Qualifications}
          </p>
        </div>
        <div className="flex flex-col justify-start  w-full items-start">
          <p className="font-semibold  sm:text-[15px] md:text-[18px] text-purple-500">
            Compensation:{" "}
          </p>
          <p className=" shadow-sm p-2 m-3  sm:text-[15px] md:text-[16px]  text-slate-700">
            {Compensation}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
