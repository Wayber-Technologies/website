'use client';

import { BrainIcon, BulbChargingIcon, CellsIcon, Idea01Icon, PisaTowerIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
}

function Counter({ end, duration = 2, prefix = "+" }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{prefix}{count}</span>;
}

export default function MetricsSection() {
  const metrics = [
    {
      number: 40,
      label: "Total Projects Completed",
      prefix: "+"
    },
    {
      number: 15,
      label: "Years of Experience",
      prefix: "+"
    },
    {
      number: 12,
      label: "Design Awards",
      prefix: "+"
    }
  ];

  const tags = [
    {
      label: "Creativity",
      icon: <HugeiconsIcon icon={BulbChargingIcon} className="w-7 h-7" />,
      bgColor: "bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100",
      textColor: "text-purple-700"
    },
    {
      label: "Innovation",
      icon: <HugeiconsIcon icon={PisaTowerIcon} className="w-7 h-7" />,
      bgColor: "bg-gradient-to-r from-blue-100 via-green-100 to-cyan-100",
      textColor: "text-blue-700"
    },
    {
      label: "Strategy",
      icon: <HugeiconsIcon icon={CellsIcon} className="w-7 h-7" />,
      bgColor: "bg-gradient-to-r from-orange-100 via-red-100 to-yellow-100",
      textColor: "text-orange-700"
    }
  ];

  return (
    <section id="about" className="py-20 bg-transparent dark:bg-gray-900">
      <div className="container">
        <motion.div 
          className="flex flex-col lg:gap-16 gap-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="flex flex-col items-center justify-center text-center gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="max-w-6xl text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100">
              Crafting exceptional, well experienced & technology driven strategies to drive impactful results with
            </h2>
            
            {/* Tags/Pills */}
            <div className="flex flex-wrap justify-center gap-4">
              {tags.map((tag, index) => (
                <motion.div
                  key={tag.label}
                  className={`${tag.bgColor} ${tag.textColor} px-6 py-3 rounded-lg flex items-center gap-3 font-medium dark:bg-gray-800 dark:text-gray-200`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {tag.icon}
                  <span className="italic text-3xl tracking-wide">{tag.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col md:flex md:flex-row justify-center items-center text-center">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="relative px-16 md:py-8 py-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.h2 
                  className="text-5xl md:text-7xl lg:text-9xl font-bold text-gray-800 dark:text-gray-100"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <Counter end={metric.number} prefix={metric.prefix} />
                </motion.h2>
                <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">{metric.label}</p>
                {index < metrics.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 h-28 w-px bg-gray-200 dark:bg-gray-700" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
