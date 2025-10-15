"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { usePathname } from "next/navigation";
import HeaderLink from "./Navigation/HeaderLink";
import { headerData } from "./Navigation/Menudata";
import Logo from "./Logo";
import MobileHeader from "./Navigation/MobileHeader";
import ThemeToggler from "./ThemeToggle";

const Header = () => {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ user: any } | null>(null);
  const [sticky, setSticky] = useState(false);
  const pathname = usePathname();

  const handleScroll = () => {
    setSticky(window.scrollY >= 80);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    signOut();
    setUser(null);
  };

  return (
    <>
      <header className={`fixed top-0 z-50 w-full bg-white dark:bg-dark_black`}>
        <div className="container p-3">
          <nav
            className={`flex items-center py-3 px-4 justify-between ${sticky && null}
              `}
          >
            <div className="flex items-center">
              <Logo />
            </div>
            <div className="hidden lg:flex bg-dark_black/5 dark:bg-white/5 rounded-3xl py-3 px-1">
              <ul className="flex gap-0 2xl:gap-1.5">
                {headerData.map((item, index) => (
                  <HeaderLink key={index} item={item} />
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-1 xl:gap-4">
              {/* ---------------------Light/Dark Mode button-------------------- */}
              <ThemeToggler />

              <div className="hidden max-lg:flex">
                <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeMiterlimit="10"
                      strokeWidth="1.5"
                      d="M4.5 12h15m-15 5.77h15M4.5 6.23h15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* ------------------------- Mobile sidebar starts ------------------------- */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-full h-full bg-black/50 z-40"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="lg:hidden fixed top-0 right-0 h-full w-full max-w-xs bg-white dark:bg-dark_black shadow-lg z-50"
            >
              <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-bold">Menu</h2>
                <button onClick={() => setSidebarOpen(false)} aria-label="Close mobile menu">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <ul className="flex flex-col">
                  {headerData.map((item, index) => (
                    <MobileHeader key={index} item={item} />
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
