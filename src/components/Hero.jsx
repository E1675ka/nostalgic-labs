import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { styles } from "../styles";
import AnimatedText from "./animated";
import Dot from "./Dotie";

const Hero = () => {
  const [lineHeight, setLineHeight] = useState("h-0"); // Initial height of the line
  const [dotRender, setDotRender] = useState("");
  const appear = () => {
    dotRender(setDotRender());
  }
  useEffect(() => {
    // Trigger line animation after component mounts
    setTimeout(() => {
      setLineHeight("h-80"); // Set the height to 80 (you can change this value)
    }, 500); // Delay the animation by 500ms
  }, []);
  return (
    <section className={`sm:my-8  w-full h-[500px] sm:h-[700px]  mx-auto flex flex-row  `}>
      <div
        className={`sm:flex-col items-center  md:flex-row lg:flex-row max-w-7xl mx-auto  ${styles.paddingX} flex flex-row gap-5`}
      >
         <Dot/>
        <div className="flex flex-col justify-center items-center ">
          {/* Circle Animation (using Tailwind animate-ping for a pulsing effect) */}
          <div className="w-5 h-5 rounded-full bg-[#984cdffb]" />

          {/* Line Animation (animate growing height using Tailwind's transition utility) */}
          <div
            className={`w-1 ${lineHeight} bg-gradient-to-t from-purple-900 to-purple-500 transition-all duration-1000 ease-in-out`}
          />
        </div>
        <div className="flex flex-col  sm:flex-col  ">
          <h1 className={` font-bold text-[50px] text-white h-[auto]`}>
          Where Nostalgia Meets Digital Innovation. <span className="text-[#61a3fa]"></span>
          </h1>
          <p className={` text-[22px] flex md:flex-col gap-3 py-3 text-white-100 w-[400]`}>
          We blend  <AnimatedText /> &nbsp;<br /> to build transformative  digital solutions.
          </p>
          <div className="flex gap-3 mt-8">
            <button className={`${styles.heroSubText} bg-violet-500/25 hover:border-solid hover:border border-violet-700 hover:shadow-md hover:scale-105 shadow-sm shadow-violet-200 px-6 py-4 rounded-md `}>Learn More About us</button>
          </div>
        </div>

        <div
          className={`sm:hidden inset-0 md:top-[100px] md:left-[600px] sm:top-[120px] z-[-10] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
        >
          <Dot/>
        </div>
      </div>
    </section>
  );
};

export default Hero;
