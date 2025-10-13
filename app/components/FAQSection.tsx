'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What services does Wayber Agency offer?",
      answer: "We offer comprehensive design and development services including web design, mobile app development, UI/UX design, brand identity, and ongoing support for startups and established businesses."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity. Simple websites typically take 2-4 weeks, while complex web applications can take 8-12 weeks. We provide detailed timelines during our initial consultation."
    },
    {
      question: "How is pricing structured at Wayber Agency?",
      answer: "We offer flexible pricing models including fixed-price projects and monthly retainer plans. Our pricing is transparent and based on project scope, timeline, and specific requirements."
    },
    {
      question: "Do you offer ongoing support after project completion?",
      answer: "Yes, we provide comprehensive post-launch support including maintenance, updates, performance monitoring, and feature enhancements to ensure your project continues to perform optimally."
    },
    {
      question: "How often will I receive updates on my project?",
      answer: "We provide regular updates throughout the project lifecycle. For retainer clients, you'll receive daily updates, while project-based clients get weekly progress reports and milestone reviews."
    },
    {
      question: "What makes Wayber Agency different from other design agencies?",
      answer: "We combine cutting-edge design with strategic thinking, focusing on user experience and business outcomes. Our team brings together expertise in design, development, and business strategy to deliver results that drive growth."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-transparent">
      <div className="container">
        <motion.div 
          className="flex flex-col gap-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="max-w-2xl text-center mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-aloevera">
              Got questions? We've got <span className="italic">answers</span>
            </h2>
          </motion.div>

          <div className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                >
                  <span className="text-gray-800 font-medium pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
