import React from 'react';
import { motion } from 'framer-motion';

const NeonButton = ({ children, onClick, className = "", variant = "primary", ...props }) => {
    const variants = {
        primary: "bg-accent text-white border-accent",
        secondary: "bg-transparent text-highlight border-highlight/30 hover:border-highlight",
    };

    return (
        <motion.button
            whileHover={!props.disabled ? { scale: 1.05 } : {}}
            whileTap={!props.disabled ? { scale: 0.95 } : {}}
            onClick={onClick}
            className={`px-8 py-3 rounded-lg font-bold border transition-all duration-300 relative group overflow-hidden ${variants[variant]} ${className} ${props.disabled ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
            {...props}
        >
            <span className="relative z-10">{children}</span>
            {!props.disabled && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            )}
            {variant === "primary" && !props.disabled && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl bg-accent/50 -z-10" />
            )}
        </motion.button>
    );
};

export default NeonButton;
