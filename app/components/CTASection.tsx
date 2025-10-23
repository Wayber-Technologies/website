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
                  className="group  font-medium bg-[#1462FF] text-white rounded-full flex items-center 
    text-sm sm:text-base md:text-lg 
    py-2.5 pl-5 pr-2 sm:py-3 sm:pl-6 sm:pr-2.5 md:py-3.5 md:pl-7 md:pr-3 
    gap-2 sm:gap-3 lg:gap-4 
    border border-[#1462FF] hover:bg-transparent hover:text-[#1462FF] 
    transition-all duration-200 ease-in-out 
    w-fit"
                >
                  <span className="group-hover:translate-x-9 sm:group-hover:translate-x-10 md:group-hover:translate-x-11 transform transition-transform duration-200 ease-in-out whitespace-nowrap">
                    Let's Collaborate
                  </span>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:-translate-x-36 sm:group-hover:-translate-x-40 md:group-hover:-translate-x-44 transition-all duration-200 ease-in-out flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
                  >
                    <rect
                      width="32"
                      height="32"
                      rx="16"
                      fill="#1B1D1E"
                      className="fill-white transition-colors duration-200 ease-in-out group-hover:fill-[#1462FF]"
                    />
                    <path
                      d="M11.832 11.3335H20.1654M20.1654 11.3335V19.6668M20.1654 11.3335L11.832 19.6668"
                      stroke="white"
                      strokeWidth="1.42857"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:stroke-white stroke-black"
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
