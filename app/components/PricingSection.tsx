'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PricingSection() {
  const pricingPlans = [
    {
      name: "Starter",
      description: "For companies who need design support. One request at a time",
      price: "$2500/month",
      features: [
        "Design Updates Every 2 Days",
        "Mid-level Designer",
        "SEO optimization",
        "Monthly analytics",
        "2x Calls Per Month",
        "License free assets"
      ],
      bgColor: "bg-yellow-100",
      textColor: "text-gray-800",
      buttonColor: "bg-gray-800 hover:bg-gray-700",
      badgeColor: "bg-gray-800 text-white"
    },
    {
      name: "Pro",
      description: "2x the speed. Great for an MVP, Web App or complex problem",
      price: "$3800/month",
      features: [
        "Design Updates Daily",
        "Senior-level Designer",
        "AI Advisory Framework",
        "Full-service Creative Team",
        "4x Calls Per Month",
        "License free assets"
      ],
      bgColor: "bg-blue-500",
      textColor: "text-white",
      buttonColor: "bg-gray-800 hover:bg-gray-700",
      badgeColor: "bg-white text-blue-500"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-transparent">
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Pick the plan that fits your <span className="italic">start-up</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`${plan.bgColor} rounded-3xl p-8 relative overflow-hidden`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Badge */}
                <div className={`${plan.badgeColor} px-4 py-2 rounded-full text-sm font-medium w-fit mb-6`}>
                  {plan.name}
                </div>

                {/* Description */}
                <p className={`${plan.textColor} text-sm mb-6`}>
                  {plan.description}
                </p>

                {/* Price */}
                <h3 className={`${plan.textColor} text-4xl font-bold mb-8`}>
                  {plan.price}
                </h3>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div 
                      key={feature}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: (index * 0.2) + (featureIndex * 0.1) }}
                      viewport={{ once: true }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      <span className={`${plan.textColor} text-sm`}>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="#contact"
                    className={`${plan.buttonColor} ${plan.textColor === 'text-white' ? 'text-white' : 'text-white'} rounded-full px-6 py-3 flex items-center justify-between w-full transition-all duration-200`}
                  >
                    <span className="font-medium">Let's Collaborate</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
