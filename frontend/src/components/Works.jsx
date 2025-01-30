import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import animationData from "../assets/pat.json";
import Lottie from "react-lottie";
import {
  mainScene,
  clienttrust,
  clientSupport,
  transparency,
  innovation,
  cta,
} from "../assets/index";


const keyHighlights = [
  "Innovation",
  "Transparency",
  "Client-Centric Approach",
  "End-to-End Support",
  "Call-to-Action Section",
];
console.log(animationData);
const imgi = [innovation, transparency, mainScene, clienttrust, cta];

const ProjectCard = ({
  index,
  highlightText,
  animationData, // Fix: Pass img prop for each card
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="  bg-tertiary border-purple-600 relative rounded-[20px] shadow-slate-500/60 shadow-lg flex items-center flex-col p-5  sm:w-[360px] w-full"
      >
        <div>
          <Lottie options={defaultOptions} height={100} width={100} />
        </div>
        <motion.p
          className={`z-10 sm:text-[17px] text-[10px]  font-bold  text-slate-200  flex justify-center `}
        >
          {highlightText}
        </motion.p>
      </Tilt>
    </div>
  );
};

const Works = () => {
  return (
    <div className=" w-full bg-purple-700/80 shadow-slate-700 py-5">
      <div className=" max-w-screen-xl mx-auto rounded-md flex flex-col text-center p-4">
        <motion.div className="" variants={textVariant()}>
          <p className={`text-white text-[18px]`}>Why Nostalgic Labs?</p>
          <h2 className={`${styles.sectionHeadText}`}>Why choose Us?</h2>
        </motion.div>
        <div className="w-full flex justify-center items-center mx-auto">
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            className="mt-3 text-white text-[17px] max-w-3xl leading-[30px] text-center px-4 sm:px-6 md:px-8 lg:px-10"
          >
            Partner with us for tailored digital solutions that reflect your
            brand's uniqueness and deliver measurable results.
          </motion.p>
        </div>
      </div>
      <motion.div
        initial={{ x: "100%" }} // Start the animation from the left (off-screen)
        animate={{
          x: ["100%", "-100%"], // Animate from left (-100%) to right (400%)
        }}
        transition={{
          repeat: Infinity, // Infinite loop
          duration: 40, // Duration for one cycle
          ease: "linear", // Smooth, constant speed
        }}
        className="mt-20 flex w-full z-10 gap-7 "
      >
        {keyHighlights.map((highlight, index) => (
          <ProjectCard
            key={highlight}
            index={index}
            highlightText={highlight}
            animationData={imgi[index]} // Fix: Pass the corresponding image from the imgi array
          />
        ))}
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Works, "works");
