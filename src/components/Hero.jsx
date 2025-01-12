import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { styles } from "../styles";
import AnimatedText from "./animated";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "./../assets/techmation.json";

const Hero = () => {
  const [lineHeight, setLineHeight] = useState("h-0"); // Initial height of the line
  const [dotRender, setDotRender] = useState("");

  const appear = () => {
    dotRender(setDotRender());
  };
  useEffect(() => {
    // Trigger line animation after component mounts
    setTimeout(() => {
      setLineHeight("h-80"); // Set the height to 80 (you can change this value)
    }, 500); // Delay the animation by 500ms
  }, []);
  return (
    <section
      className={` bg-purple-100 w-full md:h-full sm:h-full sm:my-8 sm:p-3  mx-auto flex flex-row  `}
    >
      <div
        className={`sm:flex-col items-center  md:flex-row lg:flex-row max-w-7xl mx-auto  ${styles.paddingX} flex flex-row gap-5`}
      >
        <div className="hidden sm:block">
          <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{ width: 300, height: 300 }}
          />
        </div>

        <div className=" hidden md:flex flex-col justify-center items-center">
          {/* Circle Animation (using Tailwind animate-ping for a pulsing effect) */}
          <div className="w-5 h-5 rounded-full bg-[#984cdffb]" />

          {/* Line Animation (animate growing height using Tailwind's transition utility) */}
          <div
            className={`w-1 ${lineHeight} bg-gradient-to-t from-purple-900 to-purple-500 transition-all duration-1000 ease-in-out`}
          />
        </div>
        <div className="flex flex-col sm:flex sm:flex-col mx-auto sm:items-center sm:justify-center px-5 py-5 ">
          <h1 className={` font-bold lg:text-[30px] text-black h-[auto] md:text-[20px] sm:text-[15px] text-6xl `}>
            Where Nostalgia Meets Digital Innovation.
          </h1>
          <p
            className={` lg:text-[22px] sm:text-[16px] flex md:flex-col gap-3 py-3 text-black-100 mx-auto  sm:items-start lg:items-center md:justify-center `}
          >
            We blend <AnimatedText /> to build transformative digital solutions.
          </p>
          <div className="flex gap-3 mt-8">
            <Link to="/About">
              <button
                className={`text-black font-medium bg-purple-500/25 hover:shadow-black-800 hover:shadow-md hover:scale-105 shadow-sm shadow-violet-800 px-6 py-4 rounded-md `}
              >
                Learn More About us
              </button>
            </Link>
          </div>
        </div>

        <div
          className={`sm:hidden inset-0 md:top-[100px] md:left-[600px] sm:top-[120px] z-[-10] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
        >
        </div>
      </div>
    </section>
  );
};

export default Hero;
