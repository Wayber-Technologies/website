"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { logoBlackfull, logoWhiteFull } from "@/public";
import { footernavbarItems } from "@/constants";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { navVariants } from "@/motion";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const [toggle, setToggle] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    // Always show navbar when at the top of the page (scrollY <= 50 for some tolerance)
    if (latest <= 50) {
      setHidden(false);
    } else if (previous && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.div
        variants={navVariants}
        className="w-full justify-between items-center h-[8vh] padding-x sm:flex xm:flex md:flex"
        animate={hidden ? "hidden" : "vissible"}
      >
        <Link href={"/"}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
            <Image
              src={pathname === "/presentation" ? logoWhiteFull : logoBlackfull}
              alt="wayber logo"
              width={100}
              height={100}
            />
          </motion.div>
        </Link>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }}>
          <HiOutlineMenuAlt4 onClick={() => setToggle(true)} className="text-3xl cursor-pointer text-black" />
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        {toggle && (
          <motion.div
            initial={{ y: "-100%", opacity: 0, scale: 1.05 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "-100%", opacity: 0, scale: 1.05 }}
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
                  <Image src={logoWhiteFull} alt="wayber logo" width={100} height={100} />
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
              {footernavbarItems.map((item, index) => (
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

                    {/* Torn Paper Effect SVG */}
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-4 overflow-hidden"
                      initial={{ scaleX: 0, opacity: 0 }}
                      whileHover={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformOrigin: "left center" }}
                    >
                      <svg
                        width="100%"
                        height="16"
                        viewBox="0 0 400 16"
                        className="w-full h-full"
                        preserveAspectRatio="none"
                      >
                        <defs>
                          <linearGradient id={`mobile-gradient-${item.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="30%" stopColor="#1d4ed8" />
                            <stop offset="70%" stopColor="#2563eb" />
                            <stop offset="100%" stopColor="#1e40af" />
                          </linearGradient>
                          <filter id={`glow-${item.id}`}>
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                              <feMergeNode in="coloredBlur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>

                        {/* Main torn paper shape */}
                        <motion.path
                          d="M0,8 Q30,3 60,8 Q90,12 120,8 Q150,4 180,8 Q210,11 240,8 Q270,5 300,8 Q330,12 360,8 Q380,10 400,8 L400,16 Q370,14 340,16 Q310,13 280,16 Q250,15 220,16 Q190,13 160,16 Q130,14 100,16 Q70,13 40,16 Q20,14 0,16 Z"
                          fill={`url(#mobile-gradient-${item.id})`}
                          filter={`url(#glow-${item.id})`}
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />

                        {/* Additional texture lines */}
                        <motion.path
                          d="M0,10 Q20,9 40,10 Q60,11 80,10 Q100,9 120,10 Q140,11 160,10 Q180,9 200,10 Q220,11 240,10 Q260,9 280,10 Q300,11 320,10 Q340,9 360,10 Q380,11 400,10"
                          stroke="#1e40af"
                          strokeWidth="0.8"
                          fill="none"
                          opacity="0.7"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 0.4 }}
                        />

                        <motion.path
                          d="M0,12 Q15,11 30,12 Q45,13 60,12 Q75,11 90,12 Q105,13 120,12 Q135,11 150,12 Q165,13 180,12 Q195,11 210,12 Q225,13 240,12 Q255,11 270,12 Q285,13 300,12 Q315,11 330,12 Q345,13 360,12 Q375,11 390,12 L400,12"
                          stroke="#3b82f6"
                          strokeWidth="0.5"
                          fill="none"
                          opacity="0.5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.2, delay: 0.6 }}
                        />
                      </svg>
                    </motion.div>

                    {/* Subtle shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent rounded-lg -z-10"
                      initial={{ x: "-100%", opacity: 0 }}
                      whileHover={{ x: "100%", opacity: 1 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Floating particles background effect */}
            <div className="absolute inset-0 overflow-hidden -z-10">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
