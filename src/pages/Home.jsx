import { EarthCanvas, Hero, StarsCanvas } from "../components";
import Help from "./Help";
import Calendar from "react-calendar";
import CalendarComponent from "../components/calender";
import DateComponent from "../components/Date";
import About from "../components/about";
import CardAnimation from "../components/card";
import { styles } from "../styles";
import React, { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import Tech from "../components/Tech";
import Works from "../components/Works";
import Feedback from "../components/Feedback";
export default function Home() {

  return (
    <> 
      <div className="pb-14 align-items">
      <StarsCanvas />
        <div className="flex flex-col items-center justify-center md:flex-row bg-hero-pattern bg-cover bg-no-repeat bg-center mb-12 ">
          <Hero />
        </div>
        <About />
  {/* <Tech/>
  <Works/> */}
  <Feedback/>
<Help/>
      </div>
      
    </>
  );
}
