import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe, Smartphone, BarChart, Shield, Cloud, Settings, Monitor, Database, Layers, Lock } from 'lucide-react';
import AnimatedCard from '../../components/ui/AnimatedCard';
import { useServices } from '../../hooks/useContent';

const iconMap = {
    Cpu: <Cpu />,
    Globe: <Globe />,
    Smartphone: <Smartphone />,
    BarChart: <BarChart />,
    Shield: <Shield />,
    Cloud: <Cloud />,
    Settings: <Settings />,
    Monitor: <Monitor />,
    Database: <Database />,
    Layers: <Layers />,
    Lock: <Lock />,
};

const Services = () => {
    const { data: services, loading, error } = useServices();

    if (loading) return <div className="min-h-screen flex items-center justify-center text-accent">Sincronizando...</div>;

    if (error) {
        console.error('Error loading services:', error);
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Nuestros <span className="neon-text">Servicios</span></h2>
                <p className="text-softWhite/60 max-w-xl">
                    Soluciones tecnológicas diseñadas para las empresas que liderarán la próxima década.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((s, i) => (
                    <AnimatedCard key={i} className="flex flex-col items-start gap-4 p-8">
                        <div className="p-3 bg-accent/10 rounded-lg text-accent">
                            {React.cloneElement(iconMap[s.icon_name] || <Cpu />, { className: 'w-6 h-6' })}
                        </div>
                        <h3 className="text-xl font-bold">{s.name}</h3>
                        <p className="text-softWhite/40 text-sm leading-relaxed">{s.description}</p>
                    </AnimatedCard>
                ))}
            </div>
            {services.length === 0 && (
                <div className="text-center py-20 text-softWhite/20">
                    No hay servicios configurados actualmente.
                </div>
            )}
        </div>
    );
};

export default Services;
