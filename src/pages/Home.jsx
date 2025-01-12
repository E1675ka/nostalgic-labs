import { EarthCanvas, Hero, StarsCanvas } from "../components";
import Help from "./About";
import Calendar from "react-calendar";
import CalendarComponent from "../components/calender";
import DateComponent from "../components/Date";
import About from "../components/about";
import { styles } from "../styles";
import React, { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import Works from "../components/Works";
import Feedback from "../components/Feedback";
export default function Home() {
  return (
    <>
      <StarsCanvas />
      <Hero />
      <About />
      <Works />
      <Feedback />
      <Help />
    </>
  );
}
