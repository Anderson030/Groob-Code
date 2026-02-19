import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from '../ui/Logo';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-3 group">
                    <Logo className="w-12 h-12 group-hover:scale-110 transition-transform" />
                    <div className="flex flex-col">
                        <span className="text-xl font-bold tracking-tighter text-white uppercase leading-none">Groob Code</span>
                        <span className="text-[10px] tracking-[0.2em] font-medium text-[#8F9BFF] uppercase leading-none mt-1 opacity-90">Technology</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 items-center">
                    {['Nosotros', 'Servicios', 'Precios', 'Promociones', 'Contacto'].map((item) => (
                        <Link
                            key={item}
                            to={`/${item.toLowerCase()}`}
                            className="text-sm font-medium text-softWhite/70 hover:text-highlight transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                    <Link to="/login" className="btn-primary py-2 px-4 text-sm">Portal Admin</Link>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-softWhite">
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-background/95 backdrop-blur-xl absolute top-full left-0 w-full border-b border-white/10 py-6 px-6 flex flex-col space-y-4"
                >
                    {['Nosotros', 'Servicios', 'Precios', 'Promociones', 'Contacto'].map((item) => (
                        <Link
                            key={item}
                            to={`/${item.toLowerCase()}`}
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-medium text-softWhite/70 hover:text-highlight"
                        >
                            {item}
                        </Link>
                    ))}
                    <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="btn-primary text-center"
                    >
                        Portal Admin
                    </Link>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
