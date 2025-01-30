import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import AboutDetails from "../components/AboutDetails";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { AboutInfo } from "../constants";
import Background4 from "../assets/bgpattern4.jpg";
import ResponsiveCanvas from "../components/canvas/rotatingCube";

const About = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_asu9acr", // Replace with your EmailJS service ID
        "template_jicbddf", // Replace with your EmailJS template ID
        {
          from_name: form.name,
          to_name: "Your Name", // Replace with your name
          from_email: form.email,
          to_email: "your.email@example.com", // Replace with your email
          message: form.message,
        },
        "your-public-api-key" // Replace with your EmailJS public API key
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <div
      className="flex flex-col items-center w-full h-full gap-8 pt-[10rem]"
    >
      <h1 className="text-[32px] font-bold text-purple-900 mb-[4rem]">
        About Us
      </h1>
      {AboutInfo.map((info, index) => (
        <AboutDetails
          key={index}
          animationData={info.animationData}
          Title={info.Title}
          TitleDescription={info.TitleDescription}
        />
      ))}
      <div className="flex flex-col sm:flex-col md:flex-col lg:flex-col xl:flex xl:flex-row items-center gap-4">
        <div className="mx-3 my-5 flex flex-col">
          <div className="flex flex-col items-center justify-center pt-4">
            <p className="text-[26px] text-slate-400 drop-shadow-lg font-bold">
              Get in touch
            </p>
            <h6 className="text-[14px] text-slate-400 drop-shadow-lg font-medium">
              Powered by
              <a className="flex items-center pr-4 pb-4" href="#" type="mail">
                Nostalgic | Labs
              </a>
            </h6>
          </div>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col mb-10 gap-8 items-center"
          >
            <label className="flex flex-col">
              <span className="text-gray-700 font-medium mb-4">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className="bg-white py-4 px-6 placeholder-gray-400 shadow-lg shadow-slate-400/70 text-gray-700 rounded-lg outline-none border border-gray-300 font-medium"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-700 font-medium mb-4">Your Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email address?"
                className="bg-white py-4 px-6 placeholder-gray-400 shadow-lg shadow-slate-400/70 text-gray-700 rounded-lg outline-none border border-gray-300 font-medium"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-700 font-medium mb-4">
                Your Message
              </span>
              <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What would you like to say?"
                className="bg-white py-4 px-6 placeholder-gray-400 shadow-lg shadow-slate-400/70 text-gray-700 rounded-lg outline-none border border-gray-300 font-medium"
              />
            </label>
            <button
              type="submit"
              className="bg-purple-500 py-3 px-8 rounded-xl text-white font-bold shadow-md hover:bg-purple-600 transition"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
        <ResponsiveCanvas />
      </div>
    </div>
  );
};

export default About;
