import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";

import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { EarthCanvas, StarsCanvas } from ".";
import faqs from "./queries";
import QAndA from "./contactInfo";

// template_jicbddf
// service_asu9acr
const ContactInfo = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
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
        "service_asu9acr",
        "template_jicbddf",
        {
          from_name: form.name,
          to_name: {
            /*add your name*/
          },
          from_email: form.email,
          to_email: {
            /*add your email*/
          },
          message: form.message,
        },
        {
          /*add your API key from your emailjs or any mail communaction and dev tools */
        }
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
    <>
      <div
        className={` w-full h-full  my-[8rem] px-[4rem] rounded-md shadow-lg flex flex-col bg-purple-200 items-center justify-center`}
      >
        <div className="flex flex-row w-full gap-3 pt-6  items-center justify-center ">
          <p className={styles.sectionSubText}>Get in touch</p>
          <h6 className={styles.sectionSubText}>
            powered by 
          </h6>
          <a
              className={`flex items-center pr-4 underline hover:text-purple-900 ${styles.sectionSubText}`}
              href="#" type="mail"
            >
              nostalgic | Labs
            </a>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-5  flex flex-col mb-10 gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={3}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What you want to say?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </>
  );
};

export default SectionWrapper(ContactInfo, "ContactInfo");
