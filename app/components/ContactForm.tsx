"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import { interests } from "../data/interests";
import { motion } from "framer-motion";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredInterests, setFilteredInterests] = useState<string[]>(interests);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      interest: value,
    }));
    setFilteredInterests(interests.filter((item) => item.toLowerCase().includes(value.toLowerCase())));
  };

  const handleInterestSelect = (item: string) => {
    setFormData((prevData) => ({
      ...prevData,
      interest: item,
    }));
    setShowSuggestions(false);
  };

  const reset = () => {
    setFormData({
      name: "",
      email: "",
      interest: "",
      budget: "",
      message: "",
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoader(true);

    fetch("https://formsubmit.co/ajax/office@waybertechnologies.com", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        interest: formData.interest,
        budget: formData.budget,
        message: formData.message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSubmitted(data.success);
        setLoader(false);
        reset();
      })
      .catch((error) => {
        console.log(error.message);
        setLoader(false);
      });
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-20 md:py-32 bg-gray-50 dark:bg-gray-900 before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue_gradient before:via-white before:to-yellow_gradient before:opacity-50 dark:before:from-dark_blue_gradient dark:before:via-black dark:before:to-dark_yellow_gradient dark:before:opacity-70"
    >
      <div className="container">
        <div className="flex flex-col gap-10 md:gap-20">
          <motion.div
            className="relative flex flex-col text-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-6 mt-12">
              Love to hear from you, <br /> Get in <span className="italic">touch</span>
            </h2>
          </motion.div>

          {submitted ? (
            <motion.div
              className="flex flex-col items-center gap-5 text-center max-w-xl mx-auto p-6 rounded-lg bg-green-50 dark:bg-green-50 border border-green-200"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h5 className="text-green-800 font-semibold">
                  Great! Email has been Successfully Sent. We will get in touch asap.
                </h5>
              </div>

              <Link
                href="/"
                className="group w-fit text-[#1f2937] font-medium bg-transparent dark:bg-white rounded-full flex items-center gap-4 py-2 pl-5 pr-2 transition-all duration-200 ease-in-out  hover:bg-transparent border hover:text-[#1f2937] border-[#1f2937]"
              >
                <span className="group-hover:translate-x-9 group-hover:dark:text-dark_black dark:text-black transform transition-transform duration-200 ease-in-out">
                  Back to home
                </span>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:-translate-x-[125px] transition-all duration-200 ease-in-out group-hover:rotate-45"
                >
                  <rect
                    width="32"
                    height="32"
                    rx="16"
                    fill="white"
                    className=" transition-colors duration-200 ease-in-out fill-black"
                  />
                  <path
                    d="M11.832 11.3334H20.1654M20.1654 11.3334V19.6668M20.1654 11.3334L11.832 19.6668"
                    stroke="#1B1D1E"
                    strokeWidth="1.42857"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className=" transition-colors duration-200 ease-in-out stroke-white"
                  />
                </svg>
              </Link>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-8 gap-8 shadow-lg border border-gray-100 dark:border-gray-700 relative z-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:flex md:flex-row gap-6">
                <div className="w-full">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    className="w-full rounded-full border border-gray-300 dark:border-gray-600 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors dark:bg-gray-700 dark:text-white"
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Email
                  </label>
                  <input
                    className="w-full rounded-full border border-gray-300 dark:border-gray-600 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors dark:bg-gray-700 dark:text-white"
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full relative">
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    What are you interested in?
                  </label>
                  <input
                    type="text"
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleInterestChange}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                    placeholder="Select your interest"
                    className="w-full rounded-full border border-gray-300 dark:border-gray-600 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors dark:bg-gray-700 dark:text-white"
                    required
                  />
                  {showSuggestions && filteredInterests.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
                      {filteredInterests.map((item) => (
                        <li
                          key={item}
                          onMouseDown={() => handleInterestSelect(item)}
                          className="px-5 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="w-full">
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project budget
                  </label>
                  <select
                    className="w-full rounded-full border border-gray-300 dark:border-gray-600 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors dark:bg-gray-700 dark:text-white"
                    name="budget"
                    id="budget"
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="" className="dark:bg-gray-700">
                      Select your budget
                    </option>
                    <option value="$10000" className="dark:bg-gray-700">
                      Small Scale
                    </option>
                    <option value="$50500" className="dark:bg-gray-700">
                      Large Scale
                    </option>
                  </select>
                </div>
              </div>
              <div className="w-full">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  className="w-full rounded-2xl border border-gray-300 dark:border-gray-600 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none dark:bg-gray-700 dark:text-white"
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project"
                  rows={4}
                  required
                />
              </div>
              <div>
                {!loader ? (
                  <button
                    type="submit"
                    className="group w-fit text-white font-medium bg-[#1462FF] dark:bg-[#1462FF] rounded-full flex items-center gap-4 py-2 pl-5 pr-2 transition-all duration-200 ease-in-out hover:bg-transparent border hover:text-[#1462FF] dark:hover:text-white border-[#1462FF] "
                  >
                    <span className="transform transition-transform duration-200 ease-in-out group-hover:translate-x-10">
                      Let’s Collaborate
                    </span>
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transform transition-transform duration-200 ease-in-out group-hover:-translate-x-36 group-hover:rotate-45"
                    >
                      <rect
                        width="32"
                        height="32"
                        rx="16"
                        fill="white"
                        className="fill-white  transition-colors duration-200 ease-in-out group-hover:fill-[#1462FF] "
                      />
                      <path
                        d="M11.832 11.3334H20.1654M20.1654 11.3334V19.6668M20.1654 11.3334L11.832 19.6668"
                        stroke="#1B1D1E"
                        strokeWidth="1.42857"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="stroke-[#1462FF]  transition-colors duration-200 ease-in-out group-hover:stroke-white"
                      />
                    </svg>
                  </button>
                ) : (
                  <button className="bg-gray-400 flex items-center gap-2 py-3 px-8 rounded-full text-white" disabled>
                    <div
                      className="animate-spin inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                    Submitting...
                  </button>
                )}
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
