import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Check, Cpu } from 'lucide-react';
import { usePlans } from '../../hooks/useContent';
import AnimatedCard from '../../components/ui/AnimatedCard';
import NeonButton from '../../components/ui/NeonButton';

const Pricing = () => {
    const navigate = useNavigate();
    const { data: plans, loading, error } = usePlans();

    const formatCOP = (val) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0
        }).format(val);
    };
    const handleSelectPlan = (planName) => {
        navigate('/contacto', { state: { selectedPlan: planName } });
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-accent">Sincronizando...</div>;

    if (error) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 p-4 bg-red-500/10 rounded-full text-red-500">
                <Zap className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Error de Sincronización</h2>
            <p className="text-softWhite/60 max-w-md mb-6">{error}</p>
            <button
                onClick={() => window.location.reload()}
                className="btn-primary px-6 py-2"
            >
                Reintentar Conexión
            </button>
        </div>
    );
    return (
        <div className="container mx-auto px-6 py-12 text-center">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Planes de <span className="neon-text">Inversión</span></h2>
                <p className="text-softWhite/60 max-w-2xl mx-auto">
                    Escoge el motor que impulsará tu próximo gran salto tecnológico.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {plans.map((plan, i) => (
                    <AnimatedCard
                        key={i}
                        className={`flex flex-col p-10 ${plan.is_popular ? 'border-accent/40 bg-accent/5 ring-1 ring-accent/20' : ''}`}
                    >
                        {plan.is_popular && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-[0_0_15px_rgba(0,112,243,0.5)]">
                                <Zap className="w-3 h-3" /> MÁS POPULAR
                            </div>
                        )}

                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                        <div className="mb-4">
                            <span className="text-4xl font-black">{formatCOP(plan.price)}</span>
                            <span className="text-softWhite/40 text-sm"> / proyecto</span>
                        </div>
                        <p className="text-softWhite/50 text-sm mb-8">{plan.description}</p>

                        <div className="flex-grow space-y-4 mb-8 text-left">
                            {plan.features.map((feat, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-softWhite/70">
                                    <Check className="w-4 h-4 text-highlight" /> {feat}
                                </div>
                            ))}
                        </div>

                        <NeonButton
                            variant={plan.is_popular ? "primary" : "secondary"}
                            className="w-full"
                            onClick={() => handleSelectPlan(plan.name)}
                        >
                            Seleccionar Plan
                        </NeonButton>
                    </AnimatedCard>
                ))}
            </div>
            {plans.length === 0 && (
                <div className="text-center py-32 border-2 border-white/5 rounded-3xl bg-white/[0.02]">
                    <div className="mb-4 inline-block p-4 bg-accent/10 rounded-full text-accent">
                        <Cpu className="w-8 h-8" />
                    </div>
                    <p className="text-xl font-bold text-softWhite/60 mb-2">Conexión Establecida</p>
                    <p className="text-softWhite/30 max-w-sm mx-auto">
                        El sistema está sincronizado, pero no se encontraron planes configurados en la base de datos de producción.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Pricing;
