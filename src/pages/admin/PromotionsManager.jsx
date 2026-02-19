import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, X, Tag, Calendar, Gift, Zap, Rocket } from 'lucide-react';
import { contentService } from '../../services/content.service';
import { adminService } from '../../services/admin.service';
import NeonButton from '../../components/ui/NeonButton';

const iconMap = {
    Gift: <Gift />,
    Zap: <Zap />,
    Rocket: <Rocket />,
    Tag: <Tag />,
};

const PromotionsManager = () => {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPromo, setCurrentPromo] = useState({
        title: '',
        description: '',
        code: '',
        expiry_date: '',
        icon_name: 'Gift'
    });

    useEffect(() => {
        fetchPromotions();
    }, []);

    const fetchPromotions = async () => {
        setLoading(true);
        try {
            const data = await contentService.getPromotions();
            setPromotions(data);
        } catch (error) {
            console.error('Error fetching promotions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await adminService.savePromotion(currentPromo);
            await fetchPromotions();
            setIsEditing(false);
            setCurrentPromo({ title: '', description: '', code: '', expiry_date: '', icon_name: 'Gift' });
        } catch (error) {
            console.error('Error saving promotion:', error);
            alert(`Error al guardar: ${error.message || 'Error desconocido'}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Estás seguro de eliminar esta promoción?')) return;
        setLoading(true);
        try {
            await adminService.deletePromotion(id);
            await fetchPromotions();
        } catch (error) {
            console.error('Error deleting promotion:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Gestión de <span className="neon-text">Promociones</span></h1>
                    <p className="text-softWhite/40">Gestiona las ofertas y códigos de descuento exclusivos.</p>
                </div>
                <NeonButton onClick={() => setIsEditing(true)}>
                    <Plus className="w-4 h-4 mr-2" /> Nueva Promoción
                </NeonButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {promotions.map((promo) => (
                    <motion.div
                        key={promo.id}
                        layout
                        className="glass-card p-8 flex flex-col md:flex-row gap-6 relative"
                    >
                        <div className="p-4 bg-accent/10 rounded-2xl text-accent h-fit">
                            {React.cloneElement(iconMap[promo.icon_name] || <Gift />, { className: 'w-8 h-8' })}
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
                            <p className="text-softWhite/60 text-sm mb-4">{promo.description}</p>

                            <div className="flex flex-wrap gap-4 text-xs">
                                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 uppercase tracking-widest font-black text-highlight">
                                    <Tag className="w-3 h-3" /> {promo.code}
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-softWhite/40">
                                    <Calendar className="w-3 h-3" /> {promo.expiry_date}
                                </div>
                            </div>
                        </div>
                        <div className="flex md:flex-col gap-2">
                            <button
                                onClick={() => {
                                    setCurrentPromo(promo);
                                    setIsEditing(true);
                                }}
                                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <Save className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => handleDelete(promo.id)}
                                className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {isEditing && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="glass-card w-full max-w-lg p-8 relative"
                        >
                            <button
                                onClick={() => setIsEditing(false)}
                                className="absolute top-4 right-4 text-softWhite/40 hover:text-softWhite"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <h2 className="text-2xl font-bold mb-6">
                                {currentPromo.id ? 'Editar' : 'Nueva'} <span className="neon-text">Promoción</span>
                            </h2>

                            <form onSubmit={handleSave} className="space-y-4">
                                <div>
                                    <label className="text-xs text-softWhite/40 block mb-2 uppercase">Título</label>
                                    <input
                                        type="text"
                                        value={currentPromo.title}
                                        onChange={(e) => setCurrentPromo({ ...currentPromo, title: e.target.value })}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-accent"
                                        placeholder="Ej: Descuento Early Adopter"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-softWhite/40 block mb-2 uppercase">Descripción</label>
                                    <textarea
                                        value={currentPromo.description}
                                        onChange={(e) => setCurrentPromo({ ...currentPromo, description: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-accent min-h-[80px]"
                                        placeholder="Detalles de la oferta..."
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-softWhite/40 block mb-2 uppercase">Código</label>
                                        <input
                                            type="text"
                                            value={currentPromo.code}
                                            onChange={(e) => setCurrentPromo({ ...currentPromo, code: e.target.value.toUpperCase() })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-accent"
                                            placeholder="GROOB20"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-softWhite/40 block mb-2 uppercase">Vence en</label>
                                        <input
                                            type="date"
                                            value={currentPromo.expiry_date}
                                            onChange={(e) => setCurrentPromo({ ...currentPromo, expiry_date: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-accent"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-softWhite/40 block mb-2 uppercase">Icono</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {Object.keys(iconMap).map((iconName) => (
                                            <button
                                                key={iconName}
                                                type="button"
                                                onClick={() => setCurrentPromo({ ...currentPromo, icon_name: iconName })}
                                                className={`p-3 rounded-lg border flex items-center justify-center transition-all ${currentPromo.icon_name === iconName
                                                    ? 'bg-accent/20 border-accent text-accent'
                                                    : 'bg-white/5 border-white/10 text-softWhite/40 hover:bg-white/10'
                                                    }`}
                                            >
                                                {React.cloneElement(iconMap[iconName], { className: 'w-6 h-6' })}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <NeonButton type="submit" className="w-full" disabled={loading}>
                                    <Save className="w-4 h-4 mr-2" /> {loading ? 'Sincronizando...' : 'Guardar Promoción'}
                                </NeonButton>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PromotionsManager;
