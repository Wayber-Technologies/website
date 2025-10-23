'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Logo from './Logo';
import { Github01Icon, MediumIcon, MediumSquareFreeIcons, NewTwitterRectangleIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent dark:bg-gray-900 border-t border-gray-100/50 dark:border-gray-800/50">
      <div className="container">
        <motion.div 
          className="flex flex-col lg:flex-row py-16 gap-10 justify-between"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Logo and Description */}
          <div className="flex flex-col gap-6 max-w-md">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="flex items-center mb-4">
                <Logo size="md" showText={true} variant={"default"} className="dark:hidden" />
                <Logo size="md" showText={true} variant={"white"} className="hidden dark:block" />
              </Link>
            </motion.div>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-400 leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Empowering businesses with innovative solutions. Let's create something amazing together.
            </motion.p>
            
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.a 
                href="https://github.com/wayber-technologies" 
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Github Icon */}
                <HugeiconsIcon icon={Github01Icon} className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </motion.a>
              <motion.a 
                href="#" 
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* X Icon */}
                <HugeiconsIcon icon={NewTwitterRectangleIcon} className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </motion.a>
              <motion.a 
                href="https://medium.com/@waybertechnologies" 
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Medium Icon */}
                <HugeiconsIcon icon={MediumSquareFreeIcons} className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </motion.a>
            </motion.div>
          </div>


          {/* Contact Details */}
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-gray-800 dark:text-gray-200">Contact Details</h3>
            <div className="flex flex-col gap-2 text-gray-600 dark:text-gray-400">
              <p>39b Ondo street<br />Lagos NG.</p>
              <p className='underline underline-offset-8'>office@waybertechnologies.com</p>
              <p><strong>+234 806 111 2232</strong></p>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="flex justify-center mt-8 pb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            ©{currentYear} Wayber. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
