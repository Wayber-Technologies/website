"use client";

import { motion } from "framer-motion";
import Header from "./components/Header";
import TrustedBySection from "./components/TrustedBySection";
import MetricsSection from "./components/MetricsSection";
import ServicesSection from "./components/ServicesSection";
import WorkSection from "./components/WorkSection";
import TeamSection from "./components/TeamSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FAQSection from "./components/FAQSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import TypewriterText from "./components/TypewriterText";
import { HugeiconsIcon } from "@hugeicons/react";
import { StarIcon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import StarRating from "./components/StarRating";
import AnimatedSection from "./components/animation/AnimatedSection";
import Rain from "./components/animation/Rain";

export default function Home() {
  const [avatarList, setAvatarList] = useState<Array<{ image: string; title: string }>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/page-data");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAvatarList(data.avatarList);
      } catch (error) {
        console.error("Error fetching avatars:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative w-full min-h-screen flex items-center justify-center py-20 lg:py-0">
          <Rain />
          {/* Gradient Background - extends beyond section */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-50 via-purple-50 to-orange-50 dark:from-dark_blue_gradient dark:via-black dark:to-dark_yellow_gradient dark:rounded-full dark:blur-3xl dark:before:-z-10"></div>
          <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl mx-auto">
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="flex flex-col items-center space-y-6 sm:space-y-8 md:space-y-12"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Mobile Layout - Different structure */}
                <h1 className="w-full text-5xl sm:text-5xl md:hidden text-gray-900 dark:text-white space-y-3 leading-[1.1] font-[550]">
                  <span className="block">Building bold</span>
                  <span className="block">brands with</span>
                  <span className="italic font-normal text-gray-600 dark:text-white/70 relative inline-block min-w-[280px] h-[1.2em] overflow-hidden align-middle">
                    <TypewriterText
                      texts={["thoughtful design", "creative strategy", "innovative solutions"]}
                      speed={150}
                      deleteSpeed={75}
                      pauseTime={2500}
                      delay={2000}
                    />
                  </span>
                </h1>

                {/* Desktop Layout - Original structure */}
                <h1 className="hidden md:block w-full text-5xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-gray-900 dark:text-white">
                  <span
                    className="font-medium tracking-tight sm:tracking-[-2px] md:tracking-[-4px] lg:tracking-[-6px]"
                    style={{ lineHeight: "1.2" }}
                  >
                    Building bold brands <br /> with
                  </span>{" "}
                  <span className="italic font-normal text-gray-600 dark:text-white/70 tracking-tight sm:tracking-[-2px] md:tracking-[-4px] lg:tracking-[-6px]">
                    <TypewriterText
                      texts={["thoughtful design", "creative strategy", "innovative solutions"]}
                      speed={150}
                      deleteSpeed={75}
                      pauseTime={2500}
                      delay={2000}
                    />
                  </span>
                </h1>
                <p className="max-w-3xl text-gray-600 dark:text-white/60 text-sm sm:text-base md:text-lg leading-relaxed font-light px-4 sm:px-0">
                  <strong>Wayber Technologies</strong> is a leading digital agency specializing in{" "}
                  <strong>web development</strong>, <strong>mobile app development</strong>,{" "}
                  <strong>UI/UX design</strong>, and <strong>digital marketing</strong>. We help businesses transform
                  their digital presence with cutting-edge technology solutions and innovative strategies.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col items-center justify-center mt-8 sm:mt-12 md:mt-16 space-y-8 sm:space-y-12 md:space-y-16"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-col items-center justify-center space-y-6 w-full lg:flex-row lg:items-center lg:justify-center lg:space-y-0 lg:gap-8">
                  <Link
                    href="/contact"
                    className="group relative bg-[#1462FF] text-white font-medium flex flex-row justify-between items-center py-5 px-5 rounded-full w-52 border border-[#1462FF] transition-all duration-200 ease-in-out hover:bg-transparent hover:text-[#1462FF] overflow-hidden"
                  >
                    <span className="relative z-10 flex text-start text-base transform transition-transform duration-200 ease-in-out group-hover:translate-x-16">
                      Get Started
                    </span>
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute right-5 transform transition-transform duration-200 ease-in-out group-hover:-translate-x-32 group-hover:rotate-45"
                    >
                      <rect
                        width="40"
                        height="40"
                        rx="20"
                        className="fill-white transition-colors duration-200 ease-in-out group-hover:fill-[#1462FF]"
                      />
                      <path
                        d="M15.832 15.3334H24.1654V23.6667"
                        className="stroke-[#1B1D1E] transition-colors duration-200 ease-in-out group-hover:stroke-white"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.832 23.6667L24.1654 15.3334"
                        className="stroke-[#1B1D1E] transition-colors duration-500 ease-in-out group-hover:stroke-white"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>

                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center px-4 sm:px-0">
                    <div className="flex -space-x-2 overflow-hidden">
                      {avatarList.map((avatar, index) => (
                        <Image
                          key={index}
                          src={avatar.image}
                          alt={avatar.title}
                          width={40}
                          height={40}
                          className="inline-block h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border-2 border-white dark:border-gray-800"
                        />
                      ))}
                    </div>

                    <div className="flex flex-col gap-1">
                      <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-white/60 text-center sm:text-left">
                        Trusted by numerous clients
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Trusted By Section */}
        <AnimatedSection>
          <TrustedBySection />
        </AnimatedSection>

        {/* Metrics Section */}
        <AnimatedSection>
          <MetricsSection />
        </AnimatedSection>

        {/* Services Section */}
        <AnimatedSection>
          <ServicesSection />
        </AnimatedSection>

        {/* Work Section */}
        <AnimatedSection>
          <WorkSection />
        </AnimatedSection>

        {/* Team Section */}
        <AnimatedSection>
          <TeamSection />
        </AnimatedSection>

        {/* Testimonials Section */}
        <AnimatedSection>
          <TestimonialsSection />
        </AnimatedSection>

        {/* FAQ Section */}
        <AnimatedSection>
          <FAQSection />
        </AnimatedSection>

        {/* Final CTA Section */}
        <AnimatedSection>
          <CTASection />
        </AnimatedSection>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
