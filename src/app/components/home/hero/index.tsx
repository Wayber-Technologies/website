"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StarRating from "../../shared/star-rating";

function HeroSection() {
  const ref = useRef(null);
  const [avatarList, setAvatarList] = useState<{ avatarList: Array<{ image: string }> } | null>(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Creative agency phrases that fit the sentence structure
  const animatedTexts = ["bold creativity", "fresh concepts", "unique vision", "smart strategy", "inspiring work"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/page-data");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAvatarList(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  // Animate text change every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % animatedTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [animatedTexts.length]);

  const bottomAnimation = {
    initial: { y: "20%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 1, delay: 0.8 },
  };

  return (
    <section>
      <div className="relative w-full pt-44 sm:pt-32 md:pt-44 2xl:pb-20 pb-10 before:absolute before:w-full before:h-full before:bg-linear-to-r before:from-blue_gradient before:via-white before:to-yellow_gradient before:rounded-full before:top-24 before:blur-3xl before:-z-10 dark:before:from-dark_blue_gradient dark:before:via-black dark:before:to-dark_yellow_gradient dark:before:rounded-full dark:before:blur-3xl dark:before:-z-10">
        <div className="container relative z-10">
          <div ref={ref} className="flex flex-col gap-6 md:gap-8">
            {/* ---------------- heading text --------------- */}
            <motion.div {...bottomAnimation} className="relative flex flex-col text-center items-center gap-4">
              {/* Mobile Layout - Different structure */}
              <h1 className="w-full text-[3rem] leading-[1.1] font-[550] md:hidden">
                <span className="block">Building bold</span>
                <span className="block">brands with</span>
                <span className="instrument-font italic font-normal text-gray-600 dark:text-white/70 relative inline-block min-w-[280px] h-[1.2em] overflow-hidden align-middle">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentTextIndex}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {animatedTexts[currentTextIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>

              {/* Desktop Layout - Original structure */}
              <h1 className="hidden md:block w-full text-6xl lg:text-8xl xl:text-9xl 2xl:text-9xl leading-tight lg:leading-tight">
                <span className="font-[550] tracking-[-4px] lg:tracking-[-4px] block">Building bold brands</span>
                <span className="font-[550] tracking-[-4px] lg:tracking-[-4px] flex flex-wrap items-center justify-center gap-3 lg:gap-4">
                  <span>with</span>
                  <span className="instrument-font italic font-normal text-gray-600 dark:text-white/70 relative inline-block min-w-[300px] lg:min-w-[400px] xl:min-w-[650px] h-[1.2em] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentTextIndex}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{
                          duration: 0.6,
                          ease: "easeInOut",
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        {animatedTexts[currentTextIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </span>
              </h1>

              <p className="max-w-2xl text-sm md:text-lg lg:text-xl xl:text-2xl text-dark_black/60 dark:text-white/60 leading-relaxed px-1 md:px-0">
                At Wayber, we help small startups tackle the world&apos;s biggest challenges with tailored solutions,
                guiding you from strategy to success in a competitive market.
              </p>
            </motion.div>

            <motion.div {...bottomAnimation} className="flex flex-col items-center justify-center gap-4 px-4 md:px-0">
              <div className="flex flex-col items-center justify-center gap-6 md:gap-8 w-full sm:flex-row">
                {/* ----------- Get started Link -------------- */}
                <Link
                  href="/contact"
                  className="group bg-purple_blue text-white font-medium flex flex-row justify-between items-center py-3 px-6 md:py-3 md:px-5 rounded-full max-w-64 w-full border border-purple_blue transition-all duration-200 ease-in-out hover:bg-transparent hover:text-purple_blue"
                >
                  <span className="flex text-start transform transition-transform duration-200 ease-in-out group-hover:translate-x-28">
                    Get Started
                  </span>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transform transition-transform duration-200 ease-in-out group-hover:-translate-x-44 group-hover:rotate-45"
                  >
                    <rect
                      width="40"
                      height="40"
                      rx="20"
                      className="fill-white transition-colors duration-200 ease-in-out group-hover:fill-purple_blue"
                    />
                    <path
                      d="M15.832 15.3334H24.1654V23.6667"
                      className="stroke-[#1B1D1E] transition-colors duration-200 ease-in-out group-hover:stroke-white"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.832 23.6667L24.1654 15.3334"
                      className="stroke-[#1B1D1E] transition-colors duration-500 ease-in-out group-hover:stroke-white"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>

                {/* --------------- avatar division -------------- */}
                <div className="flex items-center gap-4 md:gap-7">
                  <ul className="avatar flex flex-row items-center">
                    {avatarList?.avatarList?.map((items: { image: string }, index: number) => (
                      <li key={index} className="-mr-2 z-1 avatar-hover:ml-2">
                        <Image
                          src={items.image}
                          alt="Image"
                          width={44}
                          height={44}
                          quality={100}
                          className="rounded-full border-2 border-white w-12 h-12 md:w-11 md:h-11"
                          unoptimized={true}
                        />
                      </li>
                    ))}
                  </ul>
                  {/* -------------- Star rating division --------------- */}
                  <div className="gap-1 flex flex-col">
                    <div>
                      <StarRating count={4} color="#F59E0B" />
                    </div>
                    <p className="text-xs md:text-sm font-normal text-dark_black/60 dark:text-white/60 whitespace-nowrap">
                      Trusted by 1000+ clients
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
