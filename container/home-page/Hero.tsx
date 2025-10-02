"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { BackgroundVideo, Rounded } from "@/components";

export default function Hero() {
  return (
    <section
      className="w-full min-h-screen flex flex-col sm:mb-[-10px] xm:mb-[-10px]"
      data-scroll
      data-scroll-speed="-.3"
    >
      <div className="w-full flex-1 flex flex-col justify-between">
        {/* Spacer for top */}
        <div className="h-[15vh] lg:h-[15vh] md:h-[15vh] sm:h-[12vh] xm:h-[10vh]" />

        {/* Main content area */}
        <div className="w-full flex flex-col justify-between flex-1">
          {/* Header section */}
          <div className="w-full flex justify-between gap-[20px] pl-[50px] md:pl-[30px] sm:pl-[20px] xm:pl-[20px] sm:pr-[20px] xm:pr-[20px] mb-8">
            <div className="flex-1">
              <div className="heading tracking-[-1.3px] text-black font-semibold sm:font-extrabold xm:font-extrabold font-Aloevera uppercase text-5xl sm:text-[54px] xm:text-[54px]">
                build secure <br />
                <div className="flex items-center gap-[5px]">
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "auto" }}
                    transition={{
                      ease: [0.86, 0, 0.07, 0.995],
                      duration: 1,
                      delay: 1.5,
                    }}
                    className="leading-[130px] sm:leading-[80px] xm:leading-[60px]"
                  >
                    <video
                      src="/heroVideo4.mp4"
                      width={120}
                      height={50}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="hero-inline-video"
                      style={{
                        width: "auto",
                        height: "95px",
                        objectFit: "cover",
                        marginTop: "5px",
                        marginBottom: "5px",
                        borderRadius: "10px",
                      }}
                    />
                    <style jsx>{`
                      @media (min-width: 1491px) {
                        .hero-inline-video {
                          margin-top: 15px;
                        }
                      }
                      @media (min-width: 769px) and (max-width: 1024px) {
                        .hero-inline-video {
                          width: 100px;
                          height: 63px;
                        }
                      }
                      @media (min-width: 401px) and (max-width: 768px) {
                        .hero-inline-video {
                          width: 74px;
                          height: 45px;
                        }
                      }
                      @media (max-width: 400px) {
                        .hero-inline-video {
                          width: 64px;
                          height: 40px;
                        }
                      }
                    `}</style>
                  </motion.span>
                  <h1 className="heading tracking-[-1.3px] text-black font-semibold font-Aloevera uppercase text-5xl sm:text-[54px] xm:text-[54px]">
                    scalable tech,
                  </h1>
                </div>
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                  className="heading tracking-[-1.3px] text-black font-semibold font-Aloevera uppercase relative text-5xl sm:text-[54px] xm:text-[54px]"
                >
                  <span className="relative inline-block">
                    drive growth
                    <span className="absolute lg:left-[60%] left-[70%] -top-3 -translate-x-1/2 -translate-y-1/4 -rotate-[7deg] bg-wayberLightBlue text-black text-xs sm:text-xs md:text-sm lg:text-base px-2 py-1 sm:px-2 sm:py-1 md:px-2 md:py-1 rounded-md whitespace-nowrap font-bold tracking-normal font-aloevera">
                      CONCEPT
                      <span className="text-wayberBlue">.</span> SOLUTION
                      <span className="text-wayberBlue">.</span> EXECUTE
                      <span className="text-wayberBlue">.</span>
                    </span>
                  </span>
                </motion.h1>
              </div>
            </div>
            <div className="relative flex-shrink-0 xm:hidden sm:hidden" aria-label="WayberTech rotating circle">
              <div className="w-[120px] h-[120px] mr-[-30px] overflow-visible">
                <Image
                  src="/circle2.svg"
                  alt="decorative rotating circle"
                  width={120}
                  height={120}
                  className="rotate-slow"
                  priority
                />
              </div>
              <style jsx>{`
                @keyframes wayber-rotate-slow {
                  from {
                    transform: rotate(0deg);
                  }
                  to {
                    transform: rotate(360deg);
                  }
                }
                :global(.rotate-slow) {
                  animation: wayber-rotate-slow 10s linear infinite;
                }
              `}</style>
            </div>
          </div>

          {/* Footer section with info and CTA - Desktop version */}
          <div className="hidden lg:block padding-x mb-12">
            <div className="flex justify-between items-center gap-[20px] ">
              <div className="flex flex-col gap-4">
                <p className="paragraph font-Aloevera text-secondry text-base">
                  We help businesses design and implement innovative, future-ready solutions.
                </p>
                <p className="paragraph font-Aloevera text-secondry text-base">
                  From custom software to expert consultancy.
                </p>
              </div>
              <div className="flex items-center gap-[5px]">
                <Rounded backgroundColor="#212121" className="border border-[#21212199] py-[3px] px-[12px] group">
                  <Link
                    className="paragraph font-Aloevera text-secondry uppercase text-base relative z-10 group-hover:text-white transition-colors"
                    href="/contact"
                  >
                    build smarter solutions
                  </Link>
                </Rounded>
                <Rounded backgroundColor="#212121" className="w-[33px] h-[33px] border border-[#21212199] group">
                  <span className="relative z-10">
                    <ArrowUpRight
                      size={24}
                      strokeWidth={1.25}
                      className="text-secondry group-hover:text-white transition-colors"
                    />
                  </span>
                </Rounded>
              </div>
            </div>
          </div>

          {/* Background media section */}
          <div className="padding-x mb-36 xl:mb-36 lg:mb-36 md:mb-8 sm:mb-4 xm:mb-4">
            <BackgroundVideo src="/homevideo.mp4" fallbackImage="/wayberBg4.png" />
          </div>

          {/* Footer section with info and CTA - Mobile version */}
          <div className="w-full border-t border-[#21212155] py-[20px] sm:mb-[80px] xm:mb-[80px] lg:hidden">
            <div className="flex justify-between items-center padding-x gap-[20px] sm:flex-col sm:items-start xm:flex-col xm:items-start mb-6">
              <div className="w-[50%] xm:w-full sm:w-full">
                <p className="paragraph font-Aloevera text-secondry text-base sm:text-sm xm:text-xs">
                  We help businesses design and implement innovative, future-ready solutions.
                </p>
              </div>
              <div className="w-[50%] xm:w-full sm:w-full flex justify-between xm:flex-col xm:items-start sm:flex-col sm:items-start gap-[20px]">
                <div>
                  <p className="paragraph font-Aloevera text-secondry text-base sm:text-sm xm:text-xs">
                    From custom software to expert consultancy.
                  </p>
                </div>
                <div className="flex items-center gap-[5px]">
                  <Rounded backgroundColor="#212121" className="border border-[#21212199] py-[3px] px-[12px] group">
                    <Link
                      className="paragraph font-Aloevera text-secondry uppercase text-base sm:text-sm xm:text-xs relative z-10 group-hover:text-white transition-colors"
                      href="/contact"
                    >
                      build smarter solutions
                    </Link>
                  </Rounded>
                  <Rounded
                    backgroundColor="#212121"
                    className="w-[33px] h-[33px] border border-[#21212199] xm:hidden sm:hidden group"
                  >
                    <span className="relative z-10">
                      <ArrowUpRight
                        size={24}
                        strokeWidth={1.25}
                        className="text-secondry group-hover:text-white transition-colors"
                      />
                    </span>
                  </Rounded>
                </div>
              </div>
            </div>

            {/* Scroll down indicator */}
            <div className="w-full flex items-center overflow-hidden justify-center h-[40px] xm:hidden sm:hidden">
              <motion.p
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: "100%", opacity: 0.5 }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: [0.3, 0.86, 0.36, 0.95],
                }}
                className="paragraph opacity-50 font-Aloevera text-secondry"
              >
                scroll down
              </motion.p>
            </div>
          </div>
        </div>

        {/* Bottom padding to ensure proper spacing */}
        <div className="h-[10vh] lg:h-[8vh] md:h-[6vh] sm:h-0 xm:h-0" />
      </div>
    </section>
  );
}
