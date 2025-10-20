'use client';

import { motion } from 'framer-motion';
import Header from './components/Header';
import TrustedBySection from './components/TrustedBySection';
import MetricsSection from './components/MetricsSection';
import ServicesSection from './components/ServicesSection';
import WorkSection from './components/WorkSection';
import TeamSection from './components/TeamSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import TypewriterText from './components/TypewriterText';
import { HugeiconsIcon } from '@hugeicons/react';
import { StarIcon } from '@hugeicons/core-free-icons';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative w-full min-h-screen flex items-center justify-center">
          {/* Gradient Background - extends beyond section */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-50 via-purple-50 to-orange-50"></div>
          <div className="relative z-10 w-full px-8 lg:px-16 max-w-7xl mx-auto">
            <motion.div 
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div 
                className="flex flex-col items-center space-y-12"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="w-full text-5xl md:text-9xl lg:text-9xl xl:text-9xl text-gray-900">
                  <span className="font-medium tracking-[-6px]" style={{ lineHeight: "1.5rem" }}>Building bold brands <br /> with</span> <span className="italic font-normal text-gray-600 tracking-[-6px]">
                    <TypewriterText 
                      texts={[
                        "thoughtful design",
                        "creative strategy", 
                        "innovative solutions"
                      ]}
                      speed={150} 
                      deleteSpeed={75}
                      pauseTime={2500}
                      delay={2000}
                    />
                  </span>
                </h1>
                <p className="max-w-3xl text-gray-600 text-sm md:text-lg leading-relaxed font-light">
                  <strong>Wayber Technologies</strong> is a leading digital agency specializing in <strong>web development</strong>, <strong>mobile app development</strong>, <strong>UI/UX design</strong>, and <strong>digital marketing</strong>. We help businesses transform their digital presence with cutting-edge technology solutions and innovative strategies.
                </p>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center justify-center mt-16 space-y-16"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex flex-col items-center justify-center space-y-12 w-full lg:flex-row lg:items-center lg:justify-center lg:space-y-0 lg:space-x-16">
                  <motion.a
                    className="group gap-2 text-white font-medium bg-blue-600 rounded-xl flex items-center lg:gap-4 py-3 pl-6 pr-3 border border-blue-600 hover:bg-transparent hover:text-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    href="#contact"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <span>Get Started</span>
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </motion.a>
                  
                  {/* Social Proof */}
                  <div className="flex items-center gap-6">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-white shadow-md flex items-center justify-center">
                          <span className="text-white text-sm font-medium">{i}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-semibold text-gray-600">Trusted by numerous clients</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Trusted By Section */}
        <TrustedBySection />

        {/* Metrics Section */}
        <MetricsSection />

        {/* Services Section */}
        <ServicesSection />

        {/* Work Section */}
        <WorkSection />

        {/* Team Section */}
        <TeamSection />

        {/* Testimonials Section */}
        <TestimonialsSection />


        {/* FAQ Section */}
        <FAQSection />

        {/* Final CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}