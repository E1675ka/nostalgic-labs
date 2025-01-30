import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

import spaceBackground from "../assets/space-animation.mp4";
import animationData from "../assets/pat.json";
import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, animationData, description }) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
        <Lottie
          animationData={animationData}
          loop={true}
          className="w-40 h-40"
        />
        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
        <p className="text-slate-300 text-[14px] text-center p-3">
          {description}
        </p>
      </div>
    </motion.div>
  </Tilt>
);

const SpaceBackground = () => (
  <div className="relative w-full z-10 h-[500px] overflow-hidden bg-purple-700/80 shadow-slate-700 shadow-2xl">
    <motion.div
      variants={textVariant()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative z-10 flex flex-col items-center justify-center h-full text-white"
    >
      <p className="text-white text-[18px]">Let's Build Together</p>
      <Lottie
        animationData={animationData}
        loop={true}
        className="absolute right-0 w-[600px] h-[800px] -z-20 opacity-40"
      />

      <h2 className={styles.sectionHeadText}>Who we are.</h2>
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-white text-[17px] max-w-3xl leading-[30px] text-center shadow-sm shadow-slate-700 p-2"
      >
        At Nostalgic Labs, we specialize in creating tailored digital solutions
        that drive success. Our mission is to transform ideas into impactful
        digital experiences by combining cutting-edge technology with
        unparalleled creativity.
      </motion.p>
    </motion.div>
  </div>
);

const About = () => (
  <>
    <SpaceBackground />
    <motion.div className="mt-20 flex flex-wrap justify-center gap-10">
      {services.map((service, index) => (
        <ServiceCard key={service.title} index={index} {...service} />
      ))}
    </motion.div>
  </>
);

export default About;
