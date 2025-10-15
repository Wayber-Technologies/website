"use client";

import { motion, Variants } from "framer-motion";
import "./preloader.css";
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
          <div className="relative z-10 flex h-full w-full items-center justify-center">
            <div className="loader-new"></div>
          </div>


        </>
      )}
    </motion.div>
  );
}
