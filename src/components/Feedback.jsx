import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { StarsCanvas } from "./canvas";
const Feedbacks = () => {
  return (
    <div className={`relative mt-12 bg-black-100/70 flex flex-col items-center justify-center  rounded-[20px] hover:border-x-indigo-500`}>
      <div
        className={`bg-tertiary-800/30 flex text-center justify-center  rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <div>
        <h2 className={styles.sectionHeadText}>Have a Vision ? Let's make it happen</h2>
        </div>
      </div>
     
      <button className="absolute  mx-auto  bg-violet-900/80 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-700">
      CTA button
      </button>
     <p className=" text-[30px] mt-[120px] font-bold mx-auto absolute" > Start Your Journey today</p>
      <StarsCanvas/>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");