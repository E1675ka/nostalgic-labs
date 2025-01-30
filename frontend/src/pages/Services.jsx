import React, { useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { servicesPage } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import Lottie from "lottie-react";

const ServiceCard = ({ index, title, animationData, description }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
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
          <p className="text-slate-300 md:text-[12px] flex text-center p-3">
            {description}
          </p>
        </div>
        <motion.div className="mt-3">
          <select
            value={selectedValue}
            onChange={handleChange}
            className="bg-gray-800 text-white p-2 rounded"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </motion.div>
      </motion.div>
    </Tilt>
  );
};

const Services = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Let's Build Together</p>
        <h2 className={styles.sectionHeadText}>Who we are.</h2>
      </motion.div>
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-slate-800 text-[17px] max-w-3xl leading-[30px]"
      >
        At Nostalgic Labs, we specialize in creating tailored digital solutions
        that drive success. Our mission is to transform ideas into impactful
        digital experiences by combining cutting-edge technology with
        unparalleled creativity.
      </motion.p>

      <motion.p className={`${styles.sectionHeadText} mt-6`}>
        Our Expertise
      </motion.p>
      <div className="mt-20 flex flex-wrap justify-center gap-10">
        {servicesPage.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Services, "services");
