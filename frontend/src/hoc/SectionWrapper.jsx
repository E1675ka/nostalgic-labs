import { motion } from "framer-motion";
import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";
import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
const SectionWrapper = (WrappedComponent, idName) => {
  function HOC() {
   
    return (
      <motion.section
        variants={staggerContainer()}
       
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className=" bg-transparent  flex h-100% flex-col justify-center py-[80px]  items-center  "
      >
        <span className="hash-open" id={idName}>
          &nbsp;
        </span>


        {/* Render the wrapped component */}
        <WrappedComponent />

        {/* Back to Top Navigation */}
      
      </motion.section>
    );
  }

  return HOC;
};

export default SectionWrapper;
