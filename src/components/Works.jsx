import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const keyHighlights = [
  "Innovation", 
  "Transparency", 
  "Client-Centric Approach", 
  "End-to-End Support", 
  "Call-to-Action Section"
];

const ProjectCard = ({
  index,
  highlightText,
}) => {
  return (
    <div
     
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-violet-900 p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <motion.p className="text-white text-lg font-semibold">
          {highlightText}
        </motion.p>
      </Tilt>
    </div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>Why Nostalgic Labs?</p>
        <h2 className={`${styles.sectionHeadText}`}>Why choose Us?</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Partner with us for tailored digital solutions that reflect your brand's uniqueness and deliver measurable results.
        </motion.p>
      </div>

      <motion.div 
       initial={{ x: "0%" }}
      animate={{
        x:["0%","-10%","-20%", "-40%", "-60%", "-80%", "-100%", "-120%", "-140%"], // Define the horizontal movement
      }}
      transition={{
        repeat: Infinity, // Infinite loop
        repeatType: "loop", // Loop the animation
        duration: 10, // Complete one cycle in 4 seconds
        ease: "easeInOut", // Smooth transition
      }} className="mt-20 flex  w-full gap-7">
        {keyHighlights.map((highlight, index) => (
          <ProjectCard 
            key={highlight} 
            index={index} 
            highlightText={highlight} 
          />
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(Works, "works");
