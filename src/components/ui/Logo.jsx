import React from 'react';

const Logo = ({ className = "w-10 h-10" }) => {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Brackets (Green) */}
            <path
                d="M25 35L15 50L25 65"
                stroke="#22C55E"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M75 35L85 50L75 65"
                stroke="#22C55E"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Blue G / Power Symbol */}
            {/* Outer Circle (mostly) */}
            <path
                d="M50 35C41.7 35 35 41.7 35 50C35 58.3 41.7 65 50 65C58.3 65 65 58.3 65 50V48"
                stroke="#0070F3"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* Power line */}
            <path
                d="M50 20V35"
                stroke="#22C55E"
                strokeWidth="7"
                strokeLinecap="round"
            />
            {/* G Horizontal Bar */}
            <path
                d="M55 50H65"
                stroke="#0070F3"
                strokeWidth="7"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default Logo;
