import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
    Cpu, Globe, Smartphone, BarChart, Shield, Cloud, Settings,
    Monitor, Database, Layers, Lock, MessageSquare, ShoppingBag, Zap, ChevronRight, Clock, Target, CheckCircle2, Image as ImageIcon
} from 'lucide-react';
import { useServices } from '../../hooks/useContent';
import servicesBg from '../../assets/services-bg.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
    'Landing Pages Profesionales': <Monitor />,
    'Desarrollo de Sitios Web Corporativos': <Globe />,
    'Sistemas Web a la Medida': <Database />,
    'Automatizaciones con IA (Agentes Inteligentes)': <Zap />,
    'Chatbots para WhatsApp, Web y Redes': <MessageSquare />,
    'E-commerce / Tiendas Online': <ShoppingBag />,
    'Integración de APIs y Automatización Empresarial': <Layers />,
};

const ServiceCard = ({ service, index }) => {
    const navigate = useNavigate();

    const handleInquiry = () => {
        navigate('/contacto', { state: { plan: service.name } });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.21, 1.11, 0.81, 0.99]
            }}
            className="group relative"
        >
            {/* Background Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-highlight rounded-2xl opacity-0 group-hover:opacity-20 transition duration-500 blur"></div>

            <div className="relative h-full bg-darkCharcoal/40 backdrop-blur-xl border border-white/5 p-8 rounded-2xl hover:border-white/20 transition-all duration-500 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                    <div className="p-4 bg-accent/10 rounded-xl text-accent group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-500 shadow-[0_0_20px_rgba(0,112,243,0.1)]">
                        {iconMap[service.name] || <Cpu className="w-8 h-8" />}
                    </div>
                    {service.estimated_time && (
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-softWhite/40 bg-white/5 px-3 py-1 rounded-full">
                            <Clock className="w-3 h-3" />
                            {service.estimated_time}
                        </div>
                    )}
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-highlight transition-colors tracking-tight">
                    {service.name}
                </h3>

                <p className="text-softWhite/60 text-sm leading-relaxed mb-6 flex-grow">
                    {service.description}
                </p>

                {service.detailed_includes && service.detailed_includes.length > 0 && (
                    <div className="space-y-3 mb-8">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent">¿Qué incluye?</p>
                        <div className="grid grid-cols-1 gap-2">
                            {service.detailed_includes.slice(0, 4).map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-xs text-softWhite/80">
                                    <CheckCircle2 className="w-3 h-3 text-accent shrink-0" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="pt-6 border-t border-white/5 mt-auto">
                    {service.main_benefit && (
                        <p className="text-sm font-semibold italic text-highlight mb-4">
                            "{service.main_benefit}"
                        </p>
                    )}

                    <button
                        onClick={handleInquiry}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold group-hover:bg-accent group-hover:text-white transition-all duration-300"
                    >
                        {service.cta_text || 'Solicitar Cotización'}
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const Services = () => {
    const { data: services, loading, error } = useServices();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Calibrate background opacity (Initial 100%, fades out halfway through section)
    const bgOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 1, 0]);

    useEffect(() => {
        // Background is now static for maximum stability
    }, [services]);

    return (
        <div ref={containerRef} className="relative py-24 overflow-hidden bg-background min-h-screen">
            {/* BACKGROUND LAYER - MOUNTED IMMEDIATELY */}
            <motion.div
                initial={false}
                style={{ opacity: bgOpacity }}
                className="absolute top-0 right-0 w-full lg:w-4/5 h-[100vh] pointer-events-none z-0 overflow-hidden"
            >
                <img
                    src={servicesBg}
                    alt="Background decoration"
                    className="w-full h-full object-cover object-right-top brightness-[1.5] saturate-[1.2] opacity-60"
                />
                <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-highlight/15 rounded-full blur-[200px] mix-blend-screen pointer-events-none"></div>
                <div className="absolute top-20 right-0 w-1/2 h-1/2 bg-accent/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
                <div className="absolute top-40 right-40 w-1/3 h-1/3 bg-white/5 rounded-full blur-[100px] mix-blend-overlay pointer-events-none"></div>

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/100"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/10 to-background"></div>
            </motion.div>

            {/* Ambient Background Elements - Static */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-highlight/5 rounded-full blur-[120px] -ml-64 -mb-64 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                {loading ? (
                    <div className="min-h-[60vh] flex flex-col items-center justify-center">
                        <Zap className="w-12 h-12 text-accent" />
                        <p className="text-softWhite/40 uppercase tracking-[0.3em] text-[10px] font-bold mt-4">Sincronizando Ecosistema...</p>
                    </div>
                ) : (
                    <>
                        <header className="max-w-3xl mb-24 relative">
                            <motion.div
                                initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-[0.85]">
                                    Nuestros <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-highlight to-accent bg-[length:200%_auto] animate-gradient">Servicios</span>
                                </h2>
                                <div className="h-1.5 w-32 bg-accent mb-10"></div>
                                <p className="text-xl md:text-2xl text-softWhite/60 leading-relaxed font-medium max-w-2xl">
                                    Ingeniería de software de alto nivel y agentes de IA diseñados para organizaciones
                                    que no solo buscan digitalizarse, sino liderar la próxima revolución tecnológica.
                                </p>
                            </motion.div>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((s, i) => (
                                <ServiceCard key={s.id || i} service={s} index={i} />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {services.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-32 border-2 border-dashed border-white/5 rounded-3xl"
                >
                    <Layers className="w-16 h-16 mx-auto mb-6 text-softWhite/10" />
                    <p className="text-softWhite/20 uppercase tracking-widest font-bold">Sin registros dinámicos encontrados</p>
                </motion.div>
            )}
        </div>
        </div >
    );
};

export default Services;
