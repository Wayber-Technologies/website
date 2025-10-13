'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent border-t border-gray-100/50">
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
                <Logo size="md" showText={true} />
              </Link>
            </motion.div>
            
            <motion.p 
              className="text-gray-600 leading-relaxed"
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
                href="#" 
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Twitter/X Icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-600">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* LinkedIn Icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-600">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Pinterest Icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-600">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </motion.a>
            </motion.div>
          </div>

          {/* Sitemap */}
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-gray-800">Sitemap</h3>
            <div className="flex flex-col gap-2">
              <Link href="#contact" className="text-gray-600 hover:text-gray-800 transition-colors">Contact us</Link>
              <Link href="#about" className="text-gray-600 hover:text-gray-800 transition-colors">About us</Link>
              <Link href="#work" className="text-gray-600 hover:text-gray-800 transition-colors">Work</Link>
              <Link href="#services" className="text-gray-600 hover:text-gray-800 transition-colors">Services</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-800 transition-colors">Pricing</Link>
            </div>
          </motion.div>

          {/* Other Pages */}
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-gray-800">Other Pages</h3>
            <div className="flex flex-col gap-2">
              <Link href="/404" className="text-gray-600 hover:text-gray-800 transition-colors">Error 404</Link>
              <Link href="/terms" className="text-gray-600 hover:text-gray-800 transition-colors">Terms & Conditions</Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-800 transition-colors">Privacy Policy</Link>
              <Link href="/docs" className="text-gray-600 hover:text-gray-800 transition-colors">Documentation</Link>
            </div>
          </motion.div>

          {/* Contact Details */}
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-gray-800">Contact Details</h3>
            <div className="flex flex-col gap-2 text-gray-600">
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
          <p className="text-gray-500 text-sm">
            ©{currentYear} Wayber. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
