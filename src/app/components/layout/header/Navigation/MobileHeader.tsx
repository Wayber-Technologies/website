

import Link from 'next/link';
import { HeaderItem } from '../../../../types/menu';
import { motion } from "framer-motion";

const MobileHeader: React.FC<{ item: HeaderItem }> = ({ item }) => {

    return (
        <motion.li
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full"
        >
            <Link
                href={item.href}
                className="relative flex items-center justify-between p-4 text-black hover:text-opacity-50 dark:text-white dark:hover:text-opacity-50 rounded-lg text-base font-medium overflow-hidden"
            >
                <span className="relative z-10">{item.label}</span>
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-blue-400/20 to-blue-500/20 rounded-lg -z-0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
                <svg
                    className="absolute right-4 w-6 h-6 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </Link>
        </motion.li>
    );
};

export default MobileHeader;
