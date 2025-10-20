'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Logo from './Logo';
import { BloggerIcon, LinkCircleIcon, LinkSquare02Icon, Moon02Icon, Sun02Icon } from '@hugeicons/core-free-icons';
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
      const sections = ['about', 'services', 'work', 'team'];
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
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="#about" 
              className={`px-3 py-2 relative transition-colors ${
                activeSection === 'about' 
                  ? 'text-gray-800 dark:text-gray-200' 
                  : 'text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400'
              }`}
            >
              About us
              {activeSection === 'about' && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='4' viewBox='0 0 100 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,2 Q25,0 50,2 T100,2' stroke='%236366f1' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: '100px 4px',
                    height: '4px'
                  }}
                />
              )}
            </Link>
            <Link 
              href="#services" 
              className={`px-3 py-2 relative transition-colors ${
                activeSection === 'services' 
                  ? 'text-gray-800 dark:text-gray-200' 
                  : 'text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400'
              }`}
            >
              Services
              {activeSection === 'services' && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='4' viewBox='0 0 100 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,2 Q25,0 50,2 T100,2' stroke='%236366f1' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: '100px 4px',
                    height: '4px'
                  }}
                />
              )}
            </Link>
            <Link 
              href="#work" 
              className={`px-3 py-2 relative transition-colors ${
                activeSection === 'work' 
                  ? 'text-gray-800 dark:text-gray-200' 
                  : 'text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400'
              }`}
            >
              Work
              {activeSection === 'work' && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='4' viewBox='0 0 100 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,2 Q25,0 50,2 T100,2' stroke='%236366f1' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: '100px 4px',
                    height: '4px'
                  }}
                />
              )}
            </Link>
            <Link 
              href="#team" 
              className={`px-3 py-2 relative transition-colors ${
                activeSection === 'team' 
                  ? 'text-gray-800 dark:text-gray-200' 
                  : 'text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400'
              }`}
            >
              Team
              {activeSection === 'team' && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='4' viewBox='0 0 100 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,2 Q25,0 50,2 T100,2' stroke='%236366f1' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: '100px 4px',
                    height: '4px'
                  }}
                />
              )}
            </Link>
            <Link 
              href="/contact" 
              className="px-3 py-2 relative transition-colors text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400"
            >
              Contact
            </Link>
            <a 
              href="https://medium.com/@waybertechnologies" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg transition-colors text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 flex items-center gap-2"
            >
              Blogs
              <HugeiconsIcon icon={LinkSquare02Icon} className="w-5 h-5" />
            </a>
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
