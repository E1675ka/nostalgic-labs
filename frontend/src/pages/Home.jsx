import { EarthCanvas, Hero, StarsCanvas } from "../components";
import ContactInfo from "../components/contactInfo";
import Calendar from "react-calendar";
import CalendarComponent from "../components/calender";
import DateComponent from "../components/Date";
import About from "../components/about";
import { styles } from "../styles";
import React, { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import Works from "../components/Works";
import Feedback from "../components/Feedback";
import CareersComp from "../components/CareerComp";
export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll animation
    });
  };
  return (
    <div className="relative">
      <Hero />
      <About />
      <Works />
      <CareersComp />
      <Feedback />
      {/* <ContactInfo /> */}
      <div className="flex absolute right-0 left-0 bottom-6 items-center justify-center mx-auto my-5">
        <button
          onClick={scrollToTop}
          className="bg-purple-600 text-white px-4  py-2 rounded-md hover:bg-purple-700 transition"
        >
          Back to Top
        </button>
      </div>
    </div>
  );
}
