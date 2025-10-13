'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white';
  showText?: boolean;
}

export default function Logo({ className = '', size = 'md', variant = 'default', showText = false }: LogoProps) {
  const sizeClasses = {
    sm: showText ? 'h-6' : 'w-6 h-6',
    md: showText ? 'h-8' : 'w-8 h-8',
    lg: showText ? 'h-12' : 'w-12 h-12'
  };

  const logoSrc = variant === 'white' ? '/images/Wayber Logo White.svg' : '/images/Wayber Logo.svg';
  const iconSrc = variant === 'white' ? '/images/Wayber Icon White.svg' : '/images/Wayber Icon.svg';

  if (showText) {
    return (
      <motion.div 
        className={`${sizeClasses[size]} ${className}`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Image
          src={logoSrc}
          alt="Wayber Logo"
          width={size === 'sm' ? 120 : size === 'md' ? 160 : 200}
          height={size === 'sm' ? 24 : size === 'md' ? 32 : 48}
          className="h-full w-auto object-contain"
        />
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.05, rotate: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Image
        src={iconSrc}
        alt="Wayber Logo"
        width={size === 'sm' ? 24 : size === 'md' ? 32 : 48}
        height={size === 'sm' ? 24 : size === 'md' ? 32 : 48}
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
}
