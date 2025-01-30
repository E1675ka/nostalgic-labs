import { motion, useInView } from "framer-motion";
import React, { useEffect, useState , useRef } from "react";
import { styles } from "../styles";
import AnimatedText from "./animated";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import lottie from "lottie-web";
import animationData from "../assets/techmation.json";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn ,slideIn} from "../utils/motion";

const Hero = () => {
  const [lineHeight, setLineHeight] = useState("h-0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    // Trigger line animation on component mount
    const timer = setTimeout(() => {
      setLineHeight("h-80");
    }, 500); // Delay animation by 500ms

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  // Modify Lottie color to white using Lottie-web
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: document.querySelector("#lottie-animation"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    // Dynamically change colors to white
    animation.addEventListener("DOMLoaded", () => {
      const elements = document.querySelectorAll("path, g, circle, rect");
      elements.forEach((el) => {
        el.setAttribute("fill", "#b588f7"); // Change fill color to white
        el.setAttribute("stroke", "#b588f7"); // Change stroke color to white
      });
    });

    return () => animation.destroy(); // Cleanup animation on unmount
  }, []);

  return (
    <motion.div
      className={`max-w-7xl mx-auto ${styles.paddingX} flex flex-col md:flex-row gap-5`}
      initial="hidden"
      animate="show"
      variants={fadeIn("up", "spring", 0.2, 1)}
      ref={ref}
    >
      {/* Lottie Animation */}
      <motion.div
        className="hidden sm:block"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        variants={slideIn("left", "spring", 0.5, 1.2)}
      >
        <div id="lottie-animation" style={{ width: 300, height: 300 }} />
      </motion.div>

      {/* Line Animation with Circle */}
      <motion.div
        className="hidden md:flex flex-col justify-center items-center"
        variants={fadeIn("left", "spring", 0.5, 1.2)}
      >
        <div className="w-5 h-5 rounded-full bg-[#b588f7] animate-ping" />
        <div
          className={`w-1 ${lineHeight} bg-gradient-to-t from-[#b588f7] to-gray-300 transition-all duration-1000 ease-in-out rounded-md`}
        />
      </motion.div>

      {/* Hero Text Section */}
      <motion.div
        className="flex flex-col items-center text-center md:items-start md:text-left px-5 py-5"
        variants={textVariant(1)}
      >
        <h1 className="font-bold text-purple-600 lg:text-[30px] md:text-[24px] sm:text-[18px] text-6xl">
          Where Nostalgia Meets Digital Innovation.
        </h1>
        <motion.p
          className="lg:text-[22px] md:text-[18px] sm:text-[16px] text-slate-700 py-3"
          variants={fadeIn("up", "spring", 0.5, 1)}
        >
          We blend <AnimatedText /> to build transformative digital solutions.
        </motion.p>
        <motion.div
          className="flex gap-3 mt-8"
          variants={fadeIn("up", "spring", 0.7, 1)}
        >
          <Link to="/About">
            <button className="text-purple-700 font-medium bg-purple-500/25 hover:shadow-md hover:scale-105 shadow-sm shadow-violet-800 px-6 py-4 rounded-md">
              Learn More About Us
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SectionWrapper(Hero, "Hero");
