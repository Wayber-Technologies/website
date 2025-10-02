"use client";
import Link from "next/link";
import Image from "next/image";
import { logoBlackfull, lineWhite, logoWhiteFull } from "@/public";
import { useState } from "react";
import { navVariants } from "@/motion";
import { TextHover } from "@/animation";
import { navbarItems } from "@/constants";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [toggle, setToggle] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.nav
        variants={navVariants}
        className="w-full h-[8vh] padding-x fixed top-0 left-0 z-50 backdrop-blur-[7px] flex items-center justify-between"
        animate={hidden ? "hidden" : "vissible"}
      >
        <div className="w-[50%]">
          <Link href={"/"}>
            <Image src={logoBlackfull} alt="wayber logo" width={200} height={200} />
          </Link>
        </div>
        <div className="flex gap-x-[20px] w-[50%] justify-end items-center">
          {/* Contact Us link - always visible on desktop */}
          <Link
            href="/contact"
            className="w-fit paragraph font-medium font-Aloevera text-secondry capitalize flex flex-col hover sm:hidden xm:hidden md:hidden"
          >
            <TextHover titile1="Contact us" titile2="Contact us" />
          </Link>

          {/* Hamburger menu - visible on all screen sizes */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            <HiOutlineMenuAlt4 onClick={() => setToggle(true)} className="text-3xl cursor-pointer text-black" />
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile/Desktop Navigation Menu */}
      <AnimatePresence mode="wait">
        {toggle && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              opacity: { duration: 0.4 },
            }}
            className="fixed top-0 bottom-0 right-0 z-50 w-full min-h-screen flex justify-end items-end flex-col bg-black"
          >
            {/* Header */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-full flex justify-between items-center h-[8vh] border-b border-[#f1f1f155] padding-x"
            >
              <Link href={"/"}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <Image src={logoWhiteFull} alt="ochi logo" width={200} height={200} />
                </motion.div>
              </Link>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <IoMdClose onClick={() => setToggle(false)} className="text-3xl cursor-pointer text-background" />
              </motion.div>
            </motion.div>

            {/* Navigation Items */}
            <ul className="h-full w-full flex justify-center text-left flex-col gap-[15px] padding-x">
              {navbarItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ x: -100, opacity: 0, rotateY: -15 }}
                  animate={{ x: 0, opacity: 1, rotateY: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.5 + index * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative overflow-hidden"
                >
                  <Link
                    href={item.href}
                    onClick={() => setToggle(false)}
                    className="text-[80px] leading-[67px] font-FoundersGrotesk uppercase font-bold tracking-[-.9] text-background block relative group-hover:text-blue-400 transition-colors duration-300 ease-out"
                  >
                    <motion.span
                      className="block"
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {item.title}
                    </motion.span>

                    {/* Line White Image Effect */}
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-4 overflow-hidden"
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileHover={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformOrigin: "left center" }}
                    >
                      <Image
                        src={lineWhite}
                        alt="line decoration"
                        className="w-full h-full object-cover"
                        width={400}
                        height={16}
                      />
                    </motion.div>

                    {/* Subtle glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-blue-400/10 to-blue-500/5 rounded-lg -z-10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Animated background overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-purple-900/5 -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
