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

export default function DarkModePreLoader() {
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
              className="w-[250px] h-[180px] xm:w-20 sm:w-20 xm:h-16 sm:h-16"
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
                  d="M898.717 173.928L674.263 300.432V112.251L629.192 87.0405L404.738 213.545V25.3641L359.667 0.15332L0 203.19V494.015L45.5218 519.676L269.525 393.172V580.902L315.047 606.563L539.05 480.059V667.789L584.572 693L943.337 490.863V199.139L898.717 173.928Z"
                  fill="#1462FF"
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
                  d="M898.717 173.928L674.263 300.432V112.251L629.192 87.0405L404.738 213.545V25.3641L359.667 0.15332L0 203.19V494.015L45.5218 519.676L269.525 393.172V580.902L315.047 606.563L539.05 480.059V667.789L584.572 693L943.337 490.863V199.139L898.717 173.928Z"
                  stroke="#BFFDFF"
                  strokeWidth="3"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: [0, 1, 0],
                    opacity: [0, 1, 0.8],
                  }}
                  transition={{
                    duration: 3,
                    times: [0, 0.5, 1],
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                  style={{
                    strokeDasharray: "5 5",
                  }}
                />

                {/* Subtle breathing animation after initial load */}
                <motion.g
                  animate={{
                    scale: [1, 1.015, 1],
                    opacity: [1, 0.95, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3,
                  }}
                >
                  <motion.circle
                    cx="472"
                    cy="346"
                    r="8"
                    fill="rgba(255,255,255,0.3)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 4,
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
