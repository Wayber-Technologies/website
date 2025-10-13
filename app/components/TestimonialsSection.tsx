'use client';

import { motion } from 'framer-motion';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Wayber's expertise transformed my vision into success!",
      author: "Shola Fayiga",
      role: "Founder of Techhaven",
      rating: 91
    },
    {
      quote: "Their creativity and attention to detail transformed our brand completely!",
      author: "Sarah Williams",
      role: "CEO of TechFlow",
      rating: 95
    },
    {
      quote: "Wayber Design Agency brought our ideas to life with exceptional creativity and precision, exceeding expectations.",
      author: "Michael Brown",
      role: "Marketing Director",
      rating: 88
    }
  ];

  return (
    <section className="py-20 bg-transparent">
      <div className="container">
        <motion.div 
          className="flex flex-col justify-center gap-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="mx-auto max-w-4xl text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 font-aloevera">
              What our satisfied customers are saying <span className="italic">about us</span>
            </h2>
          </motion.div>

          <div className="space-y-12">
            <div className="grid lg:grid-cols-3 gap-8 h-[480px]">
              {/* Main testimonial */}
              <motion.div 
                className="lg:col-span-2 flex flex-col bg-gray-900 rounded-3xl p-10 relative overflow-hidden"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                <span className="text-white/50 uppercase text-xs font-medium tracking-wider mb-8">Customer stories</span>
                <div className="flex flex-col justify-between h-full">
                  <h4 className="text-white text-2xl md:text-3xl font-medium leading-relaxed">
                    "{testimonials[0].quote}"
                  </h4>
                  <div className="mt-auto pt-8">
                    <p className="text-white font-semibold text-lg">{testimonials[0].author}</p>
                    <p className="text-white/60 text-sm">{testimonials[0].role}</p>
                  </div>
                </div>
              </motion.div>

              {/* Stats card */}
              <motion.div 
                className="flex flex-col justify-between bg-gradient-to-br from-amber-50 to-yellow-100 rounded-3xl p-10"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                <div>
                  <span className="uppercase text-xs font-medium text-gray-700 tracking-wider">Facts & numbers</span>
                </div>
                <div className="flex flex-col gap-4">
                  <motion.h2 
                    className="text-5xl md:text-6xl font-bold text-gray-900"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                  >
                    91%
                  </motion.h2>
                  <h4 className="text-gray-800 text-lg font-medium leading-relaxed">
                    Clients recommend our design services
                  </h4>
                </div>
              </motion.div>
            </div>

            {/* Additional testimonials */}
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.slice(1).map((testimonial, index) => (
                <motion.div
                  key={testimonial.author}
                  className="flex flex-col bg-white rounded-3xl border border-gray-100/50 shadow-sm p-10 h-[280px]"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fbbf24" className="w-4 h-4">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <div className="flex flex-col justify-between h-full">
                    <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                    <div className="mt-auto">
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-500 mt-1">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
