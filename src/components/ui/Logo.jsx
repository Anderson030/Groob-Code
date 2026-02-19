import React from 'react';

const Logo = ({ className = "w-10 h-10" }) => {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Green Brackets */}
            <path
                d="M28 35L18 50L28 65"
                stroke="#22C55E"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M72 35L82 50L72 65"
                stroke="#22C55E"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Blue G / Power Symbol Circle */}
            <path
                d="M50 32C40.0589 32 32 40.0589 32 50C32 59.9411 40.0589 68 50 68C59.9411 68 68 59.9411 68 50V48"
                stroke="#0070F3"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Green Power Line */}
            <path
                d="M50 22V36"
                stroke="#22C55E"
                strokeWidth="7"
                strokeLinecap="round"
            />

            {/* Blue G Horizontal Bar */}
            <path
                d="M56 50H66"
                stroke="#0070F3"
                strokeWidth="8"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default Logo;
