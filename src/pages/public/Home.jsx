import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Rocket, Shield, Cpu, Globe, Smartphone, BarChart, Cloud, Settings, Monitor, Database, Layers, Lock } from 'lucide-react';
import AnimatedCard from '../../components/ui/AnimatedCard';
import NeonButton from '../../components/ui/NeonButton';
import { supabase } from '../../services/supabase';
import { Link } from 'react-router-dom';

const iconMap = {
    Cpu: <Cpu />, Globe: <Globe />, Smartphone: <Smartphone />, BarChart: <BarChart />,
    Shield: <Shield />, Cloud: <Cloud />, Settings: <Settings />, Monitor: <Monitor />,
    Database: <Database />, Layers: <Layers />, Lock: <Lock />, Code: <Code />, Rocket: <Rocket />
};

const Home = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            const { data } = await supabase
                .from('services')
                .select('*')
                .limit(3)
                .order('created_at', { ascending: true });
            if (data) setServices(data);
        };
        fetchServices();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="container mx-auto px-6 py-24 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6 inline-block px-4 py-1 rounded-full border border-accent/20 bg-accent/5 text-highlight text-xs font-bold tracking-widest uppercase"
                >
                    El futuro del desarrollo de software
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    Creamos <span className="neon-text">Vanguardia</span> <br /> Digital
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-softWhite/60 mb-12 max-w-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    <span className="font-bold text-softWhite">Groob Code</span> es una agencia boutique de software especializada en experiencias inmersivas,
                    IA y arquitectura de alto rendimiento.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <Link to="/contacto">
                        <NeonButton className="flex items-center gap-2">
                            Iniciar Proyecto <ArrowRight className="w-4 h-4" />
                        </NeonButton>
                    </Link>
                    <Link to="/servicios">
                        <NeonButton variant="secondary">
                            Ver Servicios
                        </NeonButton>
                    </Link>
                </motion.div>
            </section>

            {/* Services Snapshot (Small Grid) */}
            <section className="container mx-auto px-6 py-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {services.length > 0 ? (
                        services.map((service, i) => (
                            <AnimatedCard key={i}>
                                <div className="mb-4 p-3 bg-accent/10 rounded-xl text-accent w-fit">
                                    {React.cloneElement(iconMap[service.icon_name] || <Code />, { className: 'w-8 h-8' })}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                                <p className="text-softWhite/40">{service.description}</p>
                            </AnimatedCard>
                        ))
                    ) : (
                        // Fallback if no services are defined yet
                        [
                            { icon: 'Code', title: 'Desarrollo Web Next-Gen', desc: 'Interfaces reactivas con Framer Motion y Three.js' },
                            { icon: 'Rocket', title: 'Cloud & Escalabilidad', desc: 'Infraestructura serverless diseñada para crecer infinitamente' },
                            { icon: 'Shield', title: 'Seguridad Empresa', desc: 'Implementación de estándares militares en cada bit' }
                        ].map((service, i) => (
                            <AnimatedCard key={i}>
                                <div className="mb-4 p-3 bg-accent/10 rounded-xl text-accent w-fit">
                                    {React.cloneElement(iconMap[service.icon] || <Code />, { className: 'w-8 h-8' })}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                                <p className="text-softWhite/40">{service.desc}</p>
                            </AnimatedCard>
                        ))
                    )}
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
