"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

// Animation variants
const opacity = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: { duration: 0.5, delay: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, delay: 0.2 },
  },
};

const slideUp = {
  initial: {
    y: 0,
  },
  exit: {
    y: "-100vh",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};

export default function PreLoader() {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${
    dimension.height + 300
  } 0 ${dimension.height}  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${
    dimension.height
  } 0 ${dimension.height}  L0 0`;

  const curve: Variants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: "easeInOut", delay: 0.3 },
    },
  };

  return (
    <motion.div
      variants={{
        initial: {
          y: 0,
        },
        exit: {
          y: "-100vh",
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
        },
      }}
      initial="initial"
      exit="exit"
      className="h-screen w-screen flex items-center justify-center fixed z-[100] bg-[#1462FF]"
    >
      {dimension.width > 0 && (
        <>
          <motion.div
            className="flex gap-10 items-center absolute z-10 overflow-hidden sm:gap-3 xm:gap-3"
            variants={opacity}
            initial="initial"
            animate="enter"
          >
            {/* Animated Logo SVG with Stroke Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="w-[350px] h-[250px] xm:w-32 sm:w-32 xm:h-24 sm:h-24"
            >
              <motion.svg
                width="100%"
                height="100%"
                viewBox="0 0 944 693"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 1.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.6,
                }}
              >
                {/* Logo path with fill */}
                <motion.path
                  d="M898.796 173.928L674.342 300.432V112.251L629.271 87.0405L404.817 213.545V25.3641L359.746 0.15332L0.0791016 203.19V494.015L45.6009 519.676L269.604 393.172V580.902L315.126 606.563L539.129 480.059V667.789L584.651 693L943.417 490.863V199.139L898.796 173.928Z"
                  fill="white"
                  initial={{
                    scale: 0.95,
                    opacity: 0,
                    filter: "blur(2px)",
                  }}
                  animate={{
                    scale: [0.95, 1.02, 1],
                    opacity: [0, 0.7, 1],
                    filter: ["blur(2px)", "blur(0px)", "blur(0px)"],
                  }}
                  transition={{
                    duration: 2.5,
                    times: [0, 0.6, 1],
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 0.8,
                  }}
                />

                {/* Stroke animation around the logo */}
                <motion.path
                  d="M898.796 173.928L674.342 300.432V112.251L629.271 87.0405L404.817 213.545V25.3641L359.746 0.15332L0.0791016 203.19V494.015L45.6009 519.676L269.604 393.172V580.902L315.126 606.563L539.129 480.059V667.789L584.651 693L943.417 490.863V199.139L898.796 173.928Z"
                  stroke="#BFFDFF"
                  strokeWidth="6"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: [0, 1],
                    opacity: [0.4, 1],
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                  style={{
                    strokeDasharray: "10 10",
                  }}
                />
                
                {/* Moving indicator on the stroke - implemented as a separate circle with motion */}
                <motion.circle 
                  cx="898.796"
                  cy="173.928"
                  r="12"
                  fill="#00FFFF"
                  filter="drop-shadow(0 0 8px rgba(0, 255, 255, 0.8))"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    cx: [
                      898.796, 674.342, 629.271, 404.817, 359.746, 0.0791, 45.6009, 
                      269.604, 315.126, 539.129, 584.651, 943.417, 898.796
                    ],
                    cy: [
                      173.928, 300.432, 87.0405, 213.545, 0.15332, 203.19, 519.676,
                      393.172, 606.563, 480.059, 693, 490.863, 173.928
                    ]
                  }}
                  transition={{ 
                    delay: 0.5, 
                    duration: 4,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />

                {/* Subtle breathing animation after initial load */}
                <motion.g
                  animate={{
                    scale: [1, 1.03, 1],
                    opacity: [1, 0.95, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <motion.circle
                    cx="472"
                    cy="346"
                    r="15"
                    fill="rgba(255,255,255,0.4)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.2, 0],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2,
                    }}
                  />
                </motion.g>
              </motion.svg>
            </motion.div>
          </motion.div>
          <svg className="absolute top-0 w-full h-full">
            <motion.path className="fill-[#1462FF]" variants={curve} initial="initial" exit="exit" />
          </svg>
        </>
      )}
    </motion.div>
  );
}
