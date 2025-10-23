"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface RaindropProps {
  id: number;
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
}

const Raindrop: React.FC<RaindropProps> = ({ id, x, y, speed, length, opacity }) => (
  <motion.div
    key={id}
    className="absolute bg-gradient-to-b from-transparent to-white/30 dark:to-white/50"
    style={{
      left: `${x}px`,
      top: `${y}px`,
      width: "1px",
      height: `${length}px`,
      opacity,
    }}
    animate={{
      y: y + 200, // Fall distance
    }}
    transition={{
      duration: speed,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

interface RainProps {
  numberOfDrops?: number;
}

interface Drop {
    id: number;
    x: number;
    y: number;
    speed: number;
    length: number;
    opacity: number;
}

const Rain: React.FC<RainProps> = ({ numberOfDrops = 100 }) => {
  const [drops, setDrops] = useState<Drop[]>([]);

  useEffect(() => {
    const createDrop = (): Drop => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: -Math.random() * window.innerHeight, // Start above the screen
      speed: 2 + Math.random() * 2, // Random speed
      length: 10 + Math.random() * 10, // Random length
      opacity: 0.2 + Math.random() * 0.3, // Random opacity
    });

    setDrops(Array.from({ length: numberOfDrops }, createDrop));
  }, [numberOfDrops]);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {drops.map((drop) => (
        <Raindrop {...drop} />
      ))}
    </div>
  );
};

export default Rain;