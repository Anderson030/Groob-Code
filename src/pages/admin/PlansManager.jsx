import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, X, DollarSign, CheckCircle, Star } from 'lucide-react';
import { contentService } from '../../services/content.service';
import { adminService } from '../../services/admin.service';
import NeonButton from '../../components/ui/NeonButton';

const PlansManager = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPlan, setCurrentPlan] = useState({
        name: '',
        price: '',
        description: '',
        features: [],
        is_popular: false
    });
    const [featureInput, setFeatureInput] = useState('');

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        setLoading(true);
        try {
            const data = await contentService.getPlans();
            setPlans(data);
        } catch (error) {
            console.error('Error fetching plans:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await adminService.savePlan(currentPlan);
            await fetchPlans();
            setIsEditing(false);
            setCurrentPlan({ name: '', price: '', description: '', features: [], is_popular: false });
        } catch (error) {
            console.error('Error saving plan:', error);
            alert(`Error al guardar: ${error.message || 'Error desconocido'}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Estás seguro de eliminar este plan?')) return;
        setLoading(true);
        try {
            await adminService.deletePlan(id);
            await fetchPlans();
        } catch (error) {
            console.error('Error deleting plan:', error);
        } finally {
            setLoading(false);
        }
    };

    const addFeature = () => {
        if (!featureInput.trim()) return;
        setCurrentPlan({
            ...currentPlan,
            features: [...currentPlan.features, featureInput.trim()]
        });
        setFeatureInput('');
    };

    const removeFeature = (index) => {
        setCurrentPlan({
            ...currentPlan,
            features: currentPlan.features.filter((_, i) => i !== index)
        });
    };

    const formatCOP = (val) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Gestión de <span className="neon-text">Precios</span></h1>
                    <p className="text-softWhite/40">Configura tus planes de inversión en Pesos Colombianos (COP).</p>
                </div>
                <NeonButton onClick={() => setIsEditing(true)}>
                    <Plus className="w-4 h-4 mr-2" /> Nuevo Plan
                </NeonButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <motion.div
                        key={plan.id}
                        layout
                        className={`glass-card p-8 flex flex-col justify-between relative ${plan.is_popular ? 'border-accent shadow-[0_0_30px_rgba(0,255,255,0.1)]' : ''}`}
                    >
                        {plan.is_popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-darkCharcoal text-[10px] font-black px-3 py-1 rounded-full flex items-center gap-1">
                                <Star className="w-3 h-3 fill-darkCharcoal" /> MÁS POPULAR
                            </div>
                        )}
                        <div>
                            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                            <div className="text-4xl font-black mb-4 flex items-baseline gap-1">
                                {formatCOP(plan.price)}
                                <span className="text-sm text-softWhite/40 font-normal">/proyecto</span>
                            </div>
                            <p className="text-sm text-softWhite/60 mb-6">{plan.description}</p>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs text-softWhite/80">
                                        <CheckCircle className="w-4 h-4 text-highlight" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setCurrentPlan(plan);
                                    setIsEditing(true);
                                }}
                                className="flex-grow py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(plan.id)}
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
                            className="glass-card w-full max-w-lg p-8 relative overflow-y-auto max-h-[90vh]"
                        >
                            <button
                                onClick={() => setIsEditing(false)}
                                className="absolute top-4 right-4 text-softWhite/40 hover:text-softWhite"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <h2 className="text-2xl font-bold mb-6">
                                {currentPlan.id ? 'Editar' : 'Nuevo'} <span className="neon-text">Plan</span>
                            </h2>

                            <form onSubmit={handleSave} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-softWhite/40 block mb-2 uppercase">Nombre del Plan</label>
                                        <input
                                            type="text"
                                            value={currentPlan.name}
                                            onChange={(e) => setCurrentPlan({ ...currentPlan, name: e.target.value })}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-accent"
                                            placeholder="Ej: Starter"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-softWhite/40 block mb-2 uppercase">Precio (COP)</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-softWhite/20">$</span>
                                            <input
                                                type="number"
                                                value={currentPlan.price}
                                                onChange={(e) => setCurrentPlan({ ...currentPlan, price: e.target.value })}
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 pl-8 outline-none focus:border-accent"
                                                placeholder="999000"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs text-softWhite/40 block mb-2 uppercase">Descripción Corta</label>
                                    <input
                                        type="text"
                                        value={currentPlan.description}
                                        onChange={(e) => setCurrentPlan({ ...currentPlan, description: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-accent"
                                        placeholder="Ideal para startups..."
                                    />
                                </div>

                                <div>
                                    <label className="text-xs text-softWhite/40 block mb-2 uppercase">Características</label>
                                    <div className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={featureInput}
                                            onChange={(e) => setFeatureInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                                            className="flex-grow bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-accent"
                                            placeholder="Ej: Soporte 24/7"
                                        />
                                        <button
                                            type="button"
                                            onClick={addFeature}
                                            className="p-3 bg-accent/20 text-accent rounded-lg border border-accent/20 hover:bg-accent/30"
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {currentPlan.features.map((feature, i) => (
                                            <span key={i} className="flex items-center gap-1 bg-white/5 border border-white/10 text-xs px-3 py-1 rounded-full">
                                                {feature}
                                                <button type="button" onClick={() => removeFeature(i)} className="hover:text-red-500">
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 py-4">
                                    <input
                                        type="checkbox"
                                        id="is_popular"
                                        checked={currentPlan.is_popular}
                                        onChange={(e) => setCurrentPlan({ ...currentPlan, is_popular: e.target.checked })}
                                        className="w-4 h-4 rounded border-white/10 accent-accent"
                                    />
                                    <label htmlFor="is_popular" className="text-sm text-softWhite/60">Marcar como "MÁS POPULAR"</label>
                                </div>

                                <NeonButton type="submit" className="w-full" disabled={loading}>
                                    <Save className="w-4 h-4 mr-2" /> {loading ? 'Sincronizando...' : 'Guardar Plan'}
                                </NeonButton>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PlansManager;
