import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Lottie from "lottie-react";
import Background from "../assets/bgpattern2.jpg";

const AboutDetails = ({ Title, TitleDescription, animationData }) => {
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

  return (
    <>
      <motion.div
        style={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
        }}
        className="w-full h-[600px] shadow-lg shadow-slate-300/10 items-center justify-between flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row px-2 py-6 gap-4"
        ref={ref}
      >
        {/* Lottie Animation */}
        <motion.div
          style={{ width: "50%", height: "50vh" }}
          variants={lottieVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Lottie
            animationData={animationData}
            loop={true}
            style={{ width: "100%", height: "100%" }}
            className="w-[500px] rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          variants={textVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h1 className="text-[48px] text-purple-900 flex flex-col items-start font-extrabold font-Arial">
            {Title}
          </h1>
          <p className="text-white font-bold text-sm sm:text-sm md:text-md lg:text-lg rounded-lg shadow-lg max-w-[800px] h-[200px] bg-purple-600/40 p-7">
            {TitleDescription}
          </p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default AboutDetails;
