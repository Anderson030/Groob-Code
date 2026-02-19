/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#050505",
                accent: "#0070f3",
                highlight: "#00dfd8",
                softWhite: "#f0f0f0",
                darkCharcoal: "#121212",
            },
            animation: {
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(0, 112, 243, 0.2)' },
                    '100%': { boxShadow: '0 0 20px rgba(0, 223, 216, 0.6)' },
                }
            }
        },
    },
    plugins: [],
}
