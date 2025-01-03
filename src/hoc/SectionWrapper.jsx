import { motion } from "framer-motion";
import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";
import React from "react"; // Import React

const SectionWrapper = (WrappedComponent, idName) => {
  // Accept a component as an argument
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className="hash-open" id={idName}>
          &nbsp;
        </span>
        <WrappedComponent /> {/* Render the wrapped component */}
      </motion.section>
    );
  }

  return HOC; // Return the HOC component
};

export default SectionWrapper;
