"use client";

import { motion } from "framer-motion";

export default function TrustedBySection() {
  const clientLogos = [
    { name: "Comercio Partners", url: "/images/clients/comercio-partner-logo.png" },
    { name: "City Distro", url: "/images/clients/citydistro-logo.svg" },
    { name: "Richardson Oil and Gas", url: "/images/clients/richardson-logo.png" },
    { name: "ARM", url: "/images/clients/arm-logo.webp" },
  ];

  // Duplicate logos for seamless scrolling
  const duplicatedLogos = [...clientLogos, ...clientLogos];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-transparent">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          className="flex flex-col items-center space-y-8 sm:space-y-12 md:space-y-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          {/* Loved by text - refined spacing */}
          <motion.div
            className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto w-full"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <div className="flex-1 h-[1px] sm:h-[2px] bg-gradient-to-r from-transparent to-gray-400"></div>
            <p className="text-gray-500 text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap px-2 sm:px-4 md:px-6 text-center">
              Loved by big and small brands around the worlds
            </p>
            <div className="flex-1 h-[1px] sm:h-[2px] bg-gradient-to-l from-transparent to-gray-400"></div>
          </motion.div>

          {/* Scrolling Logo section */}
          <motion.div
            className="relative w-full overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <div className="flex animate-scroll gap-8 sm:gap-12 md:gap-16 items-center">
              {duplicatedLogos.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex-shrink-0 h-8 sm:h-9 md:h-10 flex items-center hover:scale-110 transition-transform duration-300"
                >
                  <img src={logo.url} alt={logo.name} className="h-8 sm:h-9 md:h-10 w-auto object-contain" />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
