import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

const ServiceCard = ({ index, title, icon,animationData }) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
  
      <div className=" bg-tertiary rounded-[20px] py-5  min-h-[280px] flex justify-evenly items-center flex-col">
      
          <Lottie style={{ width: 300, height: 300 }}  animationData={animationData} loop={true} />
        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

export default ServiceCard;
