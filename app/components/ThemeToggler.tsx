'use client'
import { useTheme } from "next-themes";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun02Icon } from "@hugeicons/core-free-icons";
import { motion } from "framer-motion";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <motion.button
      aria-label="theme toggler"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="group flex h-8 w-8 items-center justify-center duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <span className="group-hover:rotate-180 transition-transform duration-700 ease-in-out">
        <HugeiconsIcon icon={Sun02Icon} className="hidden dark:block" size={24} />
        <HugeiconsIcon icon={Moon02Icon} className="dark:hidden" size={24} />
      </span>
    </motion.button>
  );
};

export default ThemeToggler;