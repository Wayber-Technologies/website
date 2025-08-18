"use client";
import Link from "next/link";
import Navbar from "./navbar";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white text-black">
      <Navbar />
      {/* HERO MAIN ROWS - NO HORIZONTAL PADDING */}
      <div className="flex-grow flex flex-col justify-center gap-8 px-8">
        {/* Top Row: RE [video] THINK + STRATEGY tag */}
        <div className="flex items-end w-full">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="font-extrabold text-black font-aloevera tracking-tight text-[11vw] leading-[0.9] m-0"
          >
            THINK
          </motion.h1>
          <div className="flex-shrink-0 w-[30vw] h-[10vw] mx-[0.5vw] rounded-lg overflow-hidden bg-gray-200">
            <video src="./heroVideo2.mp4" autoPlay loop muted className="w-full h-full object-cover" />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="font-extrabold text-black font-aloevera tracking-tight text-[11vw] leading-[0.9] m-0 relative"
          >
            <span className="relative inline-block">
              BIG
              <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] bg-[#BFFDFF] text-black text-lg md:text-3xl px-4 py-2 rounded-md whitespace-nowrap font-bold tracking-normal font-aloevera">
                BUILDING TOMMOROW&apos;S..
              </span>
            </span>
          </motion.h1>
        </div>
        {/* Bottom Row: [video] EVERYTHING + TECHNOLOGY tag */}
        <div className="flex items-start w-full -mt-[1vw] ">
          <div className="flex-shrink-0 w-[25vw] h-[10vw] mx-[0.5vw] rounded-lg overflow-hidden bg-gray-200">
            <video src="./heroVideo4.mp4" autoPlay loop muted className="w-full h-full object-cover" />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="font-extrabold text-black font-aloevera tracking-tight text-[11vw] leading-[0.9] m-0 relative"
          >
            <span className="relative inline-block">
              BUILD&nbsp;BROAD
              <span className="absolute right-0 top-full -translate-y-[30%] rotate-[7deg] bg-[#EFD54D] text-black text-lg md:text-3xl px-4 py-2 rounded-md whitespace-nowrap font-bold tracking-normal font-aloevera">
                ..TECH, TODAY
              </span>
            </span>
          </motion.h1>
        </div>
        {/* Bottom Section - justified between, not too far at the bottom */}
        <div className="w-full flex items-center justify-between pt-14 pb-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            className="text-lg md:text-xl font-light max-w-md"
          >
            We build innovative software that helps businesses thrive in a fast-evolving world.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
            className="mt-4 md:mt-0"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-4 px-8 py-4 bg-[#1462FF] text-white font-semibold rounded-lg hover:bg-[#3f77e8] transition-colors duration-300"
            >
              LET&apos;S BUILD <ArrowRight />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
