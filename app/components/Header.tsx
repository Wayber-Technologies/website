'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Logo from './Logo';

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    // Store preference in localStorage
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'services', 'work', 'team', 'pricing', 'awards', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100/50 dark:bg-gray-900/80 dark:border-gray-800/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container p-3">
        <nav className="flex items-center py-3 px-4 justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="flex items-center">
              <Logo size="md" showText={true} />
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 font-sans">
            <Link 
              href="#about" 
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeSection === 'about' 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200' 
                  : 'text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400'
              }`}
            >
              About us
            </Link>
            <Link 
              href="#services" 
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeSection === 'services' 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200' 
                  : 'text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400'
              }`}
            >
              Services
            </Link>
            <Link 
              href="#work" 
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeSection === 'work' 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200' 
                  : 'text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400'
              }`}
            >
              Work
            </Link>
            <Link 
              href="#team" 
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeSection === 'team' 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200' 
                  : 'text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400'
              }`}
            >
              Team
            </Link>
            <Link 
              href="#pricing" 
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeSection === 'pricing' 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200' 
                  : 'text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400'
              }`}
            >
              Pricing
            </Link>
            <Link 
              href="#awards" 
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeSection === 'awards' 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200' 
                  : 'text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400'
              }`}
            >
              Awards
            </Link>
            <Link 
              href="#contact" 
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeSection === 'contact' 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200' 
                  : 'text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center gap-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 dark:text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 dark:text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              )}
            </motion.button>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
