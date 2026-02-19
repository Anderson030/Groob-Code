import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Timer, Zap, Rocket, Tag } from 'lucide-react';
import AnimatedCard from '../../components/ui/AnimatedCard';
import { usePromotions } from '../../hooks/useContent';

const iconMap = {
    Gift: <Gift />,
    Zap: <Zap />,
    Rocket: <Rocket />,
    Tag: <Tag />,
};

const Promotions = () => {
    const { data: promotions, loading, error } = usePromotions();

    if (loading) return <div className="min-h-screen flex items-center justify-center text-accent">Sincronizando...</div>;

    if (error) {
        console.error('Error loading promotions:', error);
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16 text-center"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Ofertas <span className="neon-text">Exclusivas</span></h2>
                <p className="text-softWhite/60 max-w-2xl mx-auto">
                    Aprovecha nuestras promociones activas para acelerar tu transformación digital.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {promotions.map((promo, i) => (
                    <AnimatedCard key={i} className="relative overflow-hidden group">
                        <div className="flex items-start gap-4">
                            <div className="p-4 bg-highlight/10 rounded-2xl text-highlight">
                                {React.cloneElement(iconMap[promo.icon_name] || <Gift />, { className: 'w-8 h-8' })}
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold">{promo.title}</h3>
                                <p className="text-softWhite/50">{promo.description}</p>
                                <div className="pt-4 flex items-center gap-6">
                                    <div>
                                        <p className="text-xs text-softWhite/30 font-bold uppercase tracking-wider mb-1">Código</p>
                                        <span className="text-accent font-mono font-bold uppercase">{promo.code}</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-softWhite/30 font-bold uppercase tracking-wider mb-1">Expira</p>
                                        <span className="text-softWhite/60 text-sm flex items-center gap-1">
                                            <Timer className="w-3 h-3" /> {new Date(promo.expiry_date).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative background element */}
                        <Zap className="absolute -bottom-8 -right-8 w-32 h-32 text-accent/5 -rotate-12 group-hover:scale-110 transition-transform duration-700" />
                    </AnimatedCard>
                ))}
            </div>
            {promotions.length === 0 && (
                <div className="text-center py-20 text-softWhite/20">
                    No hay promociones activas en este momento.
                </div>
            )}
        </div>
    );
};

export default Promotions;
