'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Logo from './Logo';
import { Moon02Icon, Sun02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

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
      const sections = ['about', 'services', 'work', 'team', 'contact'];
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
                <HugeiconsIcon icon={Sun02Icon} />
              ) : (
                <HugeiconsIcon icon={Moon02Icon} />
              )}
            </motion.button>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
