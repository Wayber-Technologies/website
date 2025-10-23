"use client";

import {
  AiMagicIcon,
  BulbChargingIcon,
  ChartIcon,
  CodeIcon,
  MarketingIcon,
  MegaphoneIcon,
  PencilIcon,
  PieChartIcon,
  PresentationLineChart02Icon,
  SourceCodeCircleIcon,
  StrategyIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ServicesSection() {
  const services = [
    {
      title: (
        <>
          Custom Web <br /> Development
        </>
      ),
      icon: <HugeiconsIcon icon={SourceCodeCircleIcon} className="w-10 h-10 text-pink-500" />,
      bgColor: "bg-pink-50 dark:bg-gray-800",
      borderColor: "border-pink-200 dark:border-pink-900",
    },
    {
      title: (
        <>
          Digital Marketing <br /> Services
        </>
      ),
      icon: <HugeiconsIcon icon={MarketingIcon} className="w-10 h-10 text-blue-500" />,
      bgColor: "bg-blue-50 dark:bg-gray-800",
      borderColor: "border-blue-200 dark:border-blue-900",
    },
    {
      title: (
        <>
          UI/UX Design <br /> Services
        </>
      ),
      icon: <HugeiconsIcon icon={AiMagicIcon} className="w-10 h-10 text-orange-500" />,
      bgColor: "bg-orange-50 dark:bg-gray-800",
      borderColor: "border-orange-200 dark:border-orange-900",
    },
    {
      title: (
        <>
          Analytics & <br /> Reporting
        </>
      ),
      icon: <HugeiconsIcon icon={PresentationLineChart02Icon} className="w-10 h-10 text-green-500" />,
      bgColor: "bg-green-50 dark:bg-gray-800",
      borderColor: "border-green-200 dark:border-green-900",
    },
    {
      title: (
        <>
          Brand Strategy <br /> & Consulting
        </>
      ),
      icon: <HugeiconsIcon icon={StrategyIcon} className="w-10 h-10 text-purple-500" />,
      bgColor: "bg-purple-50 dark:bg-gray-800",
      borderColor: "border-purple-200 dark:border-purple-900",
    },
  ];

  return (
    <section id="services" className="py-20 bg-transparent dark:bg-gray-900">
      <div className="container">
        <motion.div
          className="flex flex-col gap-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex flex-col justify-center items-center gap-10 lg:gap-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="max-w-4xl text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100">
                Professional <strong>Web Development</strong> & <strong>Digital Marketing</strong> Services
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mt-6">
                Our comprehensive digital solutions include custom web development, mobile app development, UI/UX
                design, and strategic digital marketing to help your business grow online.
              </p>
            </div>
          </motion.div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`${service.bgColor} ${service.borderColor} border-0 rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 font-aloevera leading-tight">
                  {service.title}
                </h3>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="flex flex-col gap-6 xl:flex xl:flex-row bg-gray-900 dark:bg-gray-800 items-center justify-between py-8 px-7 sm:px-8 rounded-2xl w-full p-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white text-center xl:text-left text-2xl md:text-2xl  leading-relaxed">
              Ready to transform your business with <strong>professional work</strong>?<br />
              Let's build your digital success story together!
            </h4>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link
                href="/contact"
                className="group gap-2  font-medium bg-white text-gray-900 rounded-full flex items-center lg:gap-4 py-2 pl-5 pr-2 border border-white dark:border-opacity-50 hover:bg-transparent hover:text-white transition-all duration-200 ease-in-out"
              >
                <span className="group-hover:translate-x-9 transform  transition-transform duration-200 ease-in-out">
                  Let's Collaborate
                </span>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:-translate-x-36 transition-all duration-200 ease-in-out"
                >
                  <rect
                    width="32"
                    height="32"
                    rx="16"
                    fill="#1B1D1E"
                    className="transition-colors duration-200 ease-in-out group-hover:fill-white"
                  />
                  <path
                    d="M11.832 11.3335H20.1654M20.1654 11.3335V19.6668M20.1654 11.3335L11.832 19.6668"
                    stroke="white"
                    strokeWidth="1.42857"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-black"
                  />
                </svg>
              </Link>
              <Link
                href="#work"
                className="group border border-white dark:border-white/50 text-white font-medium bg-dark_black gap-2 rounded-full flex items-center justify-between lg:gap-4 py-2 pl-5 pr-2 hover:opacity-95 hover:bg-transparent hover:text-white transition-all duration-200 ease-in-out"
              >
                <span className="group-hover:translate-x-9 transform transition-transform duration-200 ease-in-out">
                  View Portfolio
                </span>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:-translate-x-[125px] transition-all duration-200 ease-in-out"
                >
                  <rect width="32" height="32" rx="16" fill="white" />
                  <path
                    d="M11.832 11.3334H20.1654M20.1654 11.3334V19.6668M20.1654 11.3334L11.832 19.6668"
                    stroke="#1B1D1E"
                    strokeWidth="1.42857"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
