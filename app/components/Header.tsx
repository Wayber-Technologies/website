"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import { LinkSquare02Icon, CancelIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import ThemeToggler from "./ThemeToggler";

export default function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPathname, setCurrentPathname] = useState("");

  // Set current pathname on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPathname(window.location.pathname);
    }
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "services", "work", "faq"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { href: "#about", title: "About Us", section: "about" },
    { href: "#services", title: "Services", section: "services" },
    { href: "#work", title: "Our Work", section: "work" },
    { href: "#faq", title: "Faq", section: "faq" },
    { href: "/contact", title: "Contact", section: "contact" },
  ];

  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100/50 dark:bg-gray-900/80 dark:border-gray-800/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container p-3">
          <nav className="flex items-center py-3 px-4 justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/" className="flex items-center">
                <Logo size="md" showText={true} variant={"default"} className="dark:hidden" />
                <Logo size="md" showText={true} variant={"white"} className="hidden dark:block" />
              </Link>
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href={currentPathname === "/contact" ? "/#about" : "#about"}
                className={`px-3 py-2 relative transition-colors ${
                  activeSection === "about"
                    ? "text-gray-800 dark:text-gray-200"
                    : "text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
                }`}
              >
                About us
                {activeSection === "about" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='4' viewBox='0 0 100 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,2 Q25,0 50,2 T100,2' stroke='%236366f1' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "repeat-x",
                      backgroundSize: "100px 4px",
                      height: "4px",
                    }}
                  />
                )}
              </Link>
              <Link
                href={currentPathname === "/contact" ? "/#services" : "#services"}
                className={`px-3 py-2 relative transition-colors ${
                  activeSection === "services"
                    ? "text-gray-800 dark:text-gray-200"
                    : "text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
                }`}
              >
                Services
                {activeSection === "services" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='4' viewBox='0 0 100 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,2 Q25,0 50,2 T100,2' stroke='%236366f1' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "repeat-x",
                      backgroundSize: "100px 4px",
                      height: "4px",
                    }}
                  />
                )}
              </Link>
              <Link
                href={currentPathname === "/contact" ? "/#work" : "#work"}
                className={`px-3 py-2 relative transition-colors ${
                  activeSection === "work"
                    ? "text-gray-800 dark:text-gray-200"
                    : "text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
                }`}
              >
                Work
                {activeSection === "work" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='4' viewBox='0 0 100 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,2 Q25,0 50,2 T100,2' stroke='%236366f1' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "repeat-x",
                      backgroundSize: "100px 4px",
                      height: "4px",
                    }}
                  />
                )}
              </Link>
              <Link
                href={currentPathname === "/contact" ? "/#faq" : "#faq"}
                className={`px-3 py-2 relative transition-colors ${
                  activeSection === "faq"
                    ? "text-gray-800 dark:text-gray-200"
                    : "text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
                }`}
              >
                Faq
                {activeSection === "faq" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='4' viewBox='0 0 100 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,2 Q25,0 50,2 T100,2' stroke='%236366f1' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "repeat-x",
                      backgroundSize: "100px 4px",
                      height: "4px",
                    }}
                  />
                )}
              </Link>
              <Link
                href="/contact"
                className="px-3 py-2 relative transition-colors text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
              >
                Contact
              </Link>
              <a
                href="https://medium.com/@waybertechnologies"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-lg transition-colors text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 flex items-center gap-2"
              >
                Blogs
                <HugeiconsIcon icon={LinkSquare02Icon} className="w-5 h-5" />
              </a>
            </div>

            {/* Mobile: Theme Toggle + Hamburger */}
            <div className="flex md:hidden items-center gap-4">
              <ThemeToggler />
              {/* Hamburger Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex flex-col gap-1.5 p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.span
                  className="w-7 h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full"
                  animate={isMobileMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-7 h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full"
                  animate={isMobileMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>

            {/* Desktop Theme Toggle */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggler />
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed top-0 right-0 bottom-0 z-40 w-full min-h-screen flex flex-col bg-white dark:bg-gray-900 md:hidden"
          >
            {/* Header */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="w-full flex justify-between items-center h-[8vh] border-b border-gray-800 px-6"
            >
              <Link href="/" onClick={handleMenuItemClick}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <Logo size="md" showText={true} />
                </motion.div>
              </Link>
              <motion.button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-800 dark:text-gray-200 text-3xl"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <HugeiconsIcon icon={CancelIcon} className="w-8 h-8" />
              </motion.button>
            </motion.div>

            {/* Navigation Items */}
            <ul className="flex-1 flex flex-col justify-center px-6 gap-2">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative overflow-hidden"
                >
                  <Link
                    href={item.href.startsWith("#") ? 
                      (currentPathname === "/contact" ? `/${item.href}` : item.href) : 
                      item.href}
                    onClick={handleMenuItemClick}
                    className="text-5xl sm:text-6xl md:text-7xl leading-tight font-bold tracking-tight text-gray-800 dark:text-gray-200 block relative group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors duration-300 ease-out uppercase"
                  >
                    <motion.span
                      className="block"
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {item.title}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Blog Link */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="px-6 pb-8"
            >
              <a
                href="https://medium.com/@waybertechnologies"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-800 dark:text-gray-200 text-lg"
              >
                Blogs
                <HugeiconsIcon icon={LinkSquare02Icon} className="w-6 h-6" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
