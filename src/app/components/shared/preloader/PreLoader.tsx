"use client";

// import { useTheme } from 'next-themes';
import { useEffect, useState } from "react";
import LightModePreLoader from "./index";
import DarkModePreLoader from "./DarkModePreLoader";
import { AnimatePresence } from "framer-motion";

export default function PreLoader() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Handle mounting state
    setMounted(true);

    // Simulate loading time - increased to 6 seconds for better observation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000); // 6 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  // Don't render anything during SSR
  if (!mounted) return null;

  return <AnimatePresence mode="wait">{loading && <LightModePreLoader key="light-loader" />}</AnimatePresence>;
}
