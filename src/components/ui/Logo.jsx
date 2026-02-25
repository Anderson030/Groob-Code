import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ className }) => {
    return (
        <motion.div
            className={`relative flex items-center justify-center ${className || ''}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                {/* Brackets (Green) */}
                <path d="M28 35L15 50L28 65" stroke="#10B981" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M72 35L85 50L72 65" stroke="#10B981" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />

                {/* Main Blue Circle (G Body) */}
                <path d="M50 22C34.5 22 22 34.5 22 50C22 65.5 34.5 78 50 78C65.5 78 78 65.5 78 50" stroke="#0070F3" strokeWidth="9" strokeLinecap="round" />

                {/* G Crossbar (Blue) */}
                <path d="M52 50H78" stroke="#0070F3" strokeWidth="9" strokeLinecap="round" />

                {/* Power Indicator (Vertical Green Line) */}
                <path d="M50 8V28" stroke="#10B981" strokeWidth="8" strokeLinecap="round" />

                {/* Terminal Square (Green Cursor) */}
                <rect x="58" y="58" width="10" height="10" fill="#10B981" rx="2">
                    <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
                </rect>
            </svg>
        </motion.div>
    );
};

export default Logo;
