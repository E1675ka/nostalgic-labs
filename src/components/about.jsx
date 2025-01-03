import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { StarsCanvas } from "./canvas";
import Lottie from "lottie-react";
const ServiceCard = ({ index, title, animationData,description }) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <Lottie animationData={animationData} loop={true} />
        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
        <p className={`text-slate-400 md:text-[12px] flex text-center p-3 ${styles.sectionSubText}`}>{description}</p>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Let's Build Together</p>
        <h2 className={styles.sectionHeadText}>Who we are.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        At Nostalgic Labs, we specialise in creating tailored digital solutions
        that drive success. Our mission is to transform ideas into impactful
        digital experiences by combining cutting-edge technology with
        unparalleled creativity
      </motion.p>
      <StarsCanvas />
      <motion.p className={`${styles.sectionHeadText} mt-6`} >Our Expertise</motion.p>
      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "About");
