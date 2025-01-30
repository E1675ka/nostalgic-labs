import React, { useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { dropdownDataArray } from "../constants/index";

const DropDown = ({ index, title, animationData, description, dropdownData }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) =>{
    const value = event.target.value
    setSelectedValue(value);
  }
  return (
    <Tilt className="xs:w-[300px] sm:w-[350px] w-full">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { delay: index * 0.3 } },
        }}
        initial="hidden"
        animate="visible"
        className="w-full  p-[1px] rounded-[20px] shadow-lg"
      >
          <select
            value={selectedValue}
            onChange={handleChange}
            className="w-full bg-purple-400 text-white p-3 rounded-[20px] text-center focus:ring-2 focus:ring-purple-500 outline-none"
          >
           {dropdownData.map((option) => (
                <option  key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
    
      </motion.div>
    </Tilt>
  );
};

const DropDownPage = () => {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-10 px-5">
      {dropdownDataArray.map((dropdownData, index) => (
        <DropDown
          key={index}
          index={index}
          title={`Service ${index + 1}`}
          description={`Description for service ${index + 1}`}
          dropdownData={dropdownData}
          className="mt-2 rounded-lg"
        />
      ))}
    </div>
  );
};

export default DropDownPage;
