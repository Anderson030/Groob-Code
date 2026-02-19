import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const PublicLayout = () => {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-highlight/10 blur-[120px] rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />
            </div>

            <Navbar />

            <main className="relative z-10 pt-20">
                <Outlet />
            </main>

            <footer className="relative z-10 py-12 border-t border-white/5 bg-black/20 backdrop-blur-sm">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-softWhite/40 text-sm">
                        © {new Date().getFullYear()} Groob Code. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
