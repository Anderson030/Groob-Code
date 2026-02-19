import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Save, Cpu, Globe, Smartphone, BarChart, Shield, Cloud, Settings, X } from 'lucide-react';
import { contentService } from '../../services/content.service';
import { adminService } from '../../services/admin.service';
import NeonButton from '../../components/ui/NeonButton';

const iconMap = {
    Cpu: <Cpu />,
    Globe: <Globe />,
    Smartphone: <Smartphone />,
    BarChart: <BarChart />,
    Shield: <Shield />,
    Cloud: <Cloud />,
    Settings: <Settings />,
};

const ServicesManager = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentService, setCurrentService] = useState({ name: '', description: '', icon_name: 'Cpu' });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const data = await contentService.getServices();
            setServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await adminService.saveService(currentService);
            await fetchServices();
            setIsEditing(false);
            setCurrentService({ name: '', description: '', icon_name: 'Cpu' });
        } catch (error) {
            console.error('Error saving service:', error);
            alert(`Error al guardar: ${error.message || 'Error desconocido'}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Estás seguro de eliminar este servicio?')) return;
        setLoading(true);
        try {
            await adminService.deleteService(id);
            await fetchServices();
        } catch (error) {
            console.error('Error deleting service:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Gestión de <span className="neon-text">Servicios</span></h1>
                    <p className="text-softWhite/40">Configura los servicios que ofreces al mundo.</p>
                </div>
                <NeonButton onClick={() => setIsEditing(true)}>
                    <Plus className="w-4 h-4 mr-2" /> Nuevo Servicio
                </NeonButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <motion.div
                        key={service.id}
                        layout
                        className="glass-card p-6 flex flex-col justify-between"
                    >
                        <div>
                            <div className="p-3 bg-accent/10 rounded-xl text-accent w-fit mb-4">
                                {React.cloneElement(iconMap[service.icon_name] || <Cpu />, { className: 'w-6 h-6' })}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                            <p className="text-sm text-softWhite/60 mb-6">{service.description}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setCurrentService(service);
                                    setIsEditing(true);
                                }}
                                className="flex-grow py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(service.id)}
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
                                {currentService.id ? 'Editar' : 'Nuevo'} <span className="neon-text">Servicio</span>
                            </h2>

                            <form onSubmit={handleSave} className="space-y-4">
                                <div>
                                    <label className="text-xs text-softWhite/40 block mb-2 uppercase">Nombre del Servicio</label>
                                    <input
                                        type="text"
                                        value={currentService.name}
                                        onChange={(e) => setCurrentService({ ...currentService, name: e.target.value })}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-accent"
                                        placeholder="Ej: Sistemas Web"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-softWhite/40 block mb-2 uppercase">Descripción</label>
                                    <textarea
                                        value={currentService.description}
                                        onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-accent min-h-[100px]"
                                        placeholder="Describe brevemente el servicio..."
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-softWhite/40 block mb-2 uppercase">Icono</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {Object.keys(iconMap).map((iconName) => (
                                            <button
                                                key={iconName}
                                                type="button"
                                                onClick={() => setCurrentService({ ...currentService, icon_name: iconName })}
                                                className={`p-3 rounded-lg border flex items-center justify-center transition-all ${currentService.icon_name === iconName
                                                    ? 'bg-accent/20 border-accent text-accent'
                                                    : 'bg-white/5 border-white/10 text-softWhite/40 hover:bg-white/10'
                                                    }`}
                                            >
                                                {React.cloneElement(iconMap[iconName], { className: 'w-6 h-6' })}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <NeonButton type="submit" className="w-full mt-4" disabled={loading}>
                                    <Save className="w-4 h-4 mr-2" /> {loading ? 'Sincronizando...' : 'Guardar Cambios'}
                                </NeonButton>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ServicesManager;
