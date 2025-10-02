"use client";
import { motion } from "framer-motion";
import { opacity, slideUp } from "@/motion";
import { useEffect, useState } from "react";

export default function PreLoad() {
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

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  return (
    <motion.div
      variants={slideUp}
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
            <motion.p
              initial={{ y: -200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.5,
                delay: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-white text-[40px] xm:text-[20px] sm:text-[20px] leading-tight tracking-tighter font-medium"
            >
              Building Tomorrow&apos;s
            </motion.p>

            {/* Animated Logo SVG - Subtle Animation */}
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

            <motion.p
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.5,
                delay: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-white text-[40px] xm:text-[20px] sm:text-[20px] leading-tight tracking-tighter font-medium"
            >
              Tech, Today.
            </motion.p>
          </motion.div>
          <svg className="absolute top-0 w-full h-calc-100">
            <motion.path className="fill-[#1462FF]" variants={curve} initial="initial" exit="exit" />
          </svg>
        </>
      )}
    </motion.div>
  );
}
