import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SectionWrapper } from "../hoc";
import { fadeIn } from "../utils/motion";
import { Nlogo } from "../assets";
import Lottie from "lottie-react";
import animationData from "../assets/pat2.json";

const Feedbacks = (index) => {
  const textMotion = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "tween", duration: 5 } },
  };

  const buttonMotion = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "tween", duration: 5 } },
  };

  return (
    <div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeIn("right", "tween", index * 0.5, 0.75)}
      className="bg-purple-700/80 shadow-purple-300/40 flex flex-col mb-6 md:flex-row items-center justify-between h-full min-h-[500px] w-full shadow-lg p-4 gap-4"
    >
      {/* Lottie Animation */}
      <div className="flex justify-center">
        <Lottie
          animationData={animationData}
          loop={true}
          className="w-64 h-64 md:w-[500px] md:h-[500px] opacity-40 scale-x-[-1] "
        />
      </div>

      {/* Text and Button Section */}
      <motion.div
        variants={buttonMotion}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center"
      >
        <Link
          to="./Careers"
          className="flex flex-col items-center justify-evenly"
        >
          <motion.h2
            className="text-xl md:text-3xl lg:text-6xl font-extrabold bg-clip-text lg:text-transparent bg-text-image bg-center bg-cover"
            variants={textMotion}
          >
            Have a Vision?
          </motion.h2>
          <button className="text-white bottom-0 px-4 py-7 mt-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-700">
            <img src={Nlogo} alt="logo" className="w-20 md:w-40 h-auto" />
          </button>
          <motion.h2
            className="text-xl md:text-3xl lg:text-6xl font-extrabold bg-clip-text  lg:text-transparent bg-text-image bg-center bg-cover mt-4"
            variants={textMotion}
          >
            Let's Make It Happen
          </motion.h2>
        </Link>
      </motion.div>

      {/* Secondary Lottie Animation */}
      <div className="hidden md:flex">
        <Lottie
          animationData={animationData}
          loop={true}
          className="w-24 h-24 opacity-40"
        />
      </div>
    </div>
  );
};

export default Feedbacks;
