import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";
import { StarsCanvas } from "./canvas";

const FeedbackCard = ({
  index,
  testimonial,
 
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className="bg-black-200/50 p-10 rounded-3xl xs:w-[320px] w-full"
  >
    <p className="text-white font-black text-[48px]">"</p>

    <div className="mt-1">
      <p className="text-white tracking-wider  text-[18px]">{testimonial}</p>

      {/* <div className="mt-7 flex justify-between items-center gap-1">
        <div className="flex-1 flex flex-col">
          <p className="text-white font-medium text-[16px]">
            <span className="blue-text-gradient">@</span> {name}
          </p>
          <p className="mt-1 text-secondary text-[12px]">
            {designation} of {company}
          </p>
      </div> */}
    </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
    <div className={`mt-12 bg-black-100/70 rounded-[20px] hover:border-x-indigo-500`}>
      <div
        className={`bg-tertiary-800/30  rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
        <h2 className={styles.sectionHeadText}>Why choose us ?</h2>
          <p className={styles.sectionSubText}>Why Nostalgic Labs &#63; </p>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 w-[500px] ${styles.paddingX}`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
      <StarsCanvas/>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");