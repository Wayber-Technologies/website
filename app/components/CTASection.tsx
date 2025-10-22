"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-transparent">
      <div className="container px-4 sm:px-6">
        <motion.div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
          style={{
            backgroundColor: "#DFDBE5",
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50"></div>

          <div className="relative z-10 py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-12">
            <motion.div
              className="flex flex-col gap-4 sm:gap-6 items-center max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <span className="block">Innovative Solutions for</span> <span className="italic">Bold Brands</span>
              </motion.h2>

              <motion.p
                className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed px-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Looking to elevate your brand? We craft immersive experiences that captivate, engage, and make your
                business unforgettable in every interaction.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-2 sm:mt-4"
              >
                <Link
                  href="/contact"
                  className="group relative bg-[#1462FF] text-white font-medium flex flex-row justify-between items-center py-3 sm:py-3.5 px-5 sm:px-6 rounded-full w-[200px] sm:w-[260px] border border-[#1462FF] transition-all duration-200 ease-in-out hover:bg-transparent hover:text-[#1462FF] overflow-hidden"
                >
                  <span className="relative z-10 flex text-start text-sm sm:text-lg transform transition-transform duration-200 ease-in-out group-hover:translate-x-16">
                    Let's Collaborate
                  </span>
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-4 sm:right-6 transform transition-transform duration-200 ease-in-out group-hover:-translate-x-44 group-hover:rotate-45"
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
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
