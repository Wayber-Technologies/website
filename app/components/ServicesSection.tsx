'use client';

import { AiMagicIcon, BulbChargingIcon, ChartIcon, CodeIcon, MarketingIcon, MegaphoneIcon, PencilIcon, PieChartIcon, PresentationLineChart02Icon, SourceCodeCircleIcon, StrategyIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ServicesSection() {
  const services = [
    {
      title: <>Custom Web <br /> Development</>,
      icon: <HugeiconsIcon icon={SourceCodeCircleIcon} className="w-10 h-10 text-pink-500" />,
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200"
    },
    {
      title: <>Digital Marketing <br /> Services</>,
      icon: <HugeiconsIcon icon={MarketingIcon} className="w-10 h-10 text-blue-500" />,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: <>UI/UX Design <br /> Services</>,
      icon: <HugeiconsIcon icon={AiMagicIcon} className="w-10 h-10 text-orange-500" />,
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      title: <>Analytics & <br /> Reporting</>,
      icon: <HugeiconsIcon icon={PresentationLineChart02Icon} className="w-10 h-10 text-green-500" />,
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: <>Brand Strategy <br /> & Consulting</>,
      icon: <HugeiconsIcon icon={StrategyIcon} className="w-10 h-10 text-purple-500" />,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <section id="services" className="py-20 bg-transparent">
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
                Professional <strong>Web Development</strong> & <strong>Digital Marketing</strong> Services
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-6">
                Our comprehensive digital solutions include custom web development, mobile app development, UI/UX design, and strategic digital marketing to help your business grow online.
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
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                 <h3 className="text-lg font-bold text-gray-800 font-aloevera leading-tight">{service.title}</h3>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="flex flex-col gap-6 xl:flex xl:flex-row bg-gray-900 items-center justify-between py-8 px-7 sm:px-8 rounded-2xl w-full p-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-white text-center xl:text-left text-2xl md:text-2xl  leading-relaxed">
              Ready to transform your business with <strong>professional web development</strong>?<br />
              Let's build your digital success story together!
            </h4>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  className="group gap-2 text-gray-800 font-medium bg-white rounded-full flex items-center lg:gap-4 py-3 pl-6 pr-3 border border-white hover:bg-transparent hover:text-white transition-all duration-200"
                  href="#contact"
                >
                  <span>Let's Collaborate</span>
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  className="text-white font-medium border border-white rounded-full px-6 py-3 hover:bg-white hover:text-gray-800 transition-all duration-200"
                  href="#work"
                >
                  View Portfolio
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
