"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { BackgroundVideo } from "@/components";

export default function Hero() {
  return (
    <section
      className="w-full min-h-screen flex flex-col sm:mb-[-10px] xm:mb-[-10px]"
      data-scroll
      data-scroll-speed="-.3"
    >
      <div className="w-full flex-1 flex flex-col justify-between">
        {/* Spacer for top */}
        <div className="h-[20vh] lg:h-[18vh] md:h-[15vh] sm:h-[12vh] xm:h-[10vh]" />

        {/* Main content area */}
        <div className="w-full flex flex-col justify-between flex-1">
          {/* Header section with title and awards */}
          <div className="w-full flex justify-between gap-[20px] pl-[50px] md:pl-[30px] sm:pl-[20px] xm:pl-[20px] mb-8">
            <div className="flex-1">
              <div className="heading tracking-[-1.3px] text-black font-semibold font-FoundersGrotesk uppercase">
                think big, <br />
                <div className="flex items-center gap-[5px]">
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "auto" }}
                    transition={{
                      ease: [0.86, 0, 0.07, 0.995],
                      duration: 1,
                      delay: 1.5,
                    }}
                    className="leading-[130px]"
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
                        marginTop: "10px",
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
                  <h1 className="heading tracking-[-1.3px] text-black font-semibold font-FoundersGrotesk uppercase">
                    build broad
                  </h1>
                </div>
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                  className="heading tracking-[-1.3px] text-black font-semibold font-FoundersGrotesk uppercase relative"
                >
                  <span className="relative inline-block">
                    EXPERIENCE
                    <span className="absolute left-3/4 top-0 -translate-x-1/2 -translate-y-1/4 rotate-[13deg] bg-wayberLightBlue text-black text-xs sm:text-sm md:text-lg lg:text-xl px-2 py-1 sm:px-2 sm:py-1 md:px-2 md:py-1 rounded-md whitespace-nowrap font-bold tracking-normal font-aloevera">
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

          {/* Background media section */}
          <div className="padding-x mb-12 lg:mb-10 md:mb-8 sm:mb-4 xm:mb-4">
            <BackgroundVideo src="./homeVideo.mp4" />
          </div>

          {/* Footer section with info and CTA */}
          <div className="w-full border-t border-[#21212155] py-[20px] sm:mb-[80px] xm:mb-[80px]">
            <div className="flex justify-between items-center padding-x gap-[20px] sm:flex-col sm:items-start xm:flex-col xm:items-start mb-6">
              <div className="w-[50%] xm:w-full sm:w-full">
                <p className="paragraph font-Bricolage text-secondry">For public and private companies</p>
              </div>
              <div className="w-[50%] xm:w-full sm:w-full flex justify-between xm:flex-col xm:items-start sm:flex-col sm:items-start gap-[20px]">
                <div>
                  <p className="paragraph font-Bricolage text-secondry">From the first pitch to IPO</p>
                </div>
                <div className="flex items-center gap-[5px] group">
                  <div className="rounded-[50px] border border-[#21212199] group-hover:bg-secondry py-[3px] px-[12px] cursor-pointer">
                    <Link
                      className="paragraph font-Bricolage text-secondry uppercase group-hover:text-background transition-all transform duration-[0.3s] ease-[.215,.61,.355,1]"
                      href="/contact"
                    >
                      start the project
                    </Link>
                  </div>
                  <div className="w-[33px] flex items-center justify-center h-[33px] border border-[#21212199] rounded-full p-[1px] group-hover:bg-secondry transition-all transform duration-[0.3s] ease-[.215,.61,.355,1] cursor-pointer xm:hidden sm:hidden">
                    <p className="font-normal text-secondry group-hover:text-background">
                      <ArrowUpRight size={24} strokeWidth={1.25} />
                    </p>
                  </div>
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
                className="paragraph opacity-50 font-Bricolage text-secondry"
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
