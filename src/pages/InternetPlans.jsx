import React, { useState, useEffect } from "react";

import { SectionWrapper } from "../hoc";
import StarsCanvas from "../components/canvas/Stars";

const InternetPlans = () => {
  const internetPlanData = [
    { id: 1, title: "500MBS 1HR", description: "5/=" },
    { id: 2, title: "1HR UNLIMITED", description: "10/=" },
    { id: 3, title: "500MBS DAILY", description: "11/=" },
    { id: 4, title: "1GB DAILY", description: "15/=" },
    { id: 5, title: "2GB DAILY", description: "25/=" },
    { id: 6, title: "4HRS UNLIMITED", description: "30/=" },
    { id: 7, title: "2GB WEEKLY", description: "49/=" },
    { id: 8, title: "FAST 24HR UNLIMITED", description: "50/=" },
    { id: 9, title: "ULTRA FAST 24HR UNLIMITED", description: "80/=" },
    { id: 10, title: "5GB WEEKLY", description: "100/=" },
    { id: 11, title: "FAST WEEKLY UNLIMITED", description: "200/=" },
    { id: 12, title: "ULTRA FAST WEEKLY UNLIMITED", description: "300/=" },
    { id: 13, title: "FAST MONTHLY UNLIMITED", description: "800/=" },
    { id: 14, title: "ULTRA FAST MONTHLY UNLIMITED", description: "1000/=" },
  ];
  const Cards = ({ title, description }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const [cardStyle, setCardStyle] = useState({
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease",
      transform: isHovered ? "scale(1.1)" : "scale(1)",
      backgroundColor: isHovered ? "#451851" : "#1F1266",
      width: "170px",
      height: "100px",
      marginBottom: "1.5rem",
      display: "grid",
      padding: "1.5rem",
    });
    const handleResize = () => {
      if (window.innerWidth <= 720) {
        setCardStyle((prevStyle) => ({
          ...cardStyle,
          width: "100px",
          height: "130px",
          display: "flex",
          margin: "1rem",
          fontSize: "12px",
          marginBottom: "1rem",
        }));
      } else {
        setCardStyle((prevStyle) => ({
          ...cardStyle,
          width: "170px",
          height: "140px",
          display: "flex",
          padding: "1.5rem",
        }));
      }
    };

    useEffect(() => {
      handleResize(); // Initial call to set styles based on window width

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [setCardStyle]);
    return (
      <div
        className=" grid  justify-center items-center shadow-xl   flex-wrap  rounded-s-lg  "
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p>{title}</p>
        <p>{description}</p>
      </div>
    );
  };

  return (
    <>
      <StarsCanvas />
      <h1 className="flex justify-center font-semibold text-xl my-2 mt-2  ">
        Our Internet Plans
      </h1>
      <div className="flex flex-row mb-14 md:grid-cols-2 justify-center ">
        <ul className="grid grid-cols-3  gap-6  cursor-pointer justify-center mr-4 mb-8">
          {internetPlanData.map((plan) => (
            <li key={plan.id}>
              <Cards title={plan.title} description={plan.description} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SectionWrapper(InternetPlans, "internetPlans");
