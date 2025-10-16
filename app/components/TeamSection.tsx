'use client';

import { motion } from 'framer-motion';

export default function TeamSection() {

  return (
    <section id="team" className="py-20 bg-transparent hidden">
      <div className="container">
        <motion.div 
          className="flex flex-col justify-center items-center gap-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="max-w-4xl text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              Figma, Laravel, PHP, Python, Vue.js, Objective-C, Webflow, Flutter, Dart, Swift, Kotlin, and Java.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              If you've never heard any of these, don't worry. We love building stuff. Let's talk about your project, even if it's just an idea.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
