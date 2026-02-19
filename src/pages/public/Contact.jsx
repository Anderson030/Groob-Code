import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Send, MapPin, Phone, Mail, Instagram, Linkedin, Twitter, CheckCircle2 } from 'lucide-react';
import NeonButton from '../../components/ui/NeonButton';
import { supabase } from '../../services/supabase';

const Contact = () => {
    const location = useLocation();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const selectedPlan = location.state?.plan;
        if (selectedPlan) {
            setFormData(prev => ({
                ...prev,
                message: `Hola, estoy interesado en el servicio de ${selectedPlan}. Me gustaría solicitar una consultoría para mi proyecto.`
            }));
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: dbError } = await supabase
                .from('contact_messages')
                .insert([
                    {
                        full_name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        message: formData.message,
                        created_at: new Date().toISOString()
                    }
                ]);

            if (dbError) throw dbError;

            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (err) {
            console.error('Error enviando mensaje:', err);
            setError('Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="container mx-auto px-6 py-24 flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-4 bg-green-500/10 rounded-full text-green-500 mb-6"
                >
                    <CheckCircle2 className="w-16 h-16" />
                </motion.div>
                <h2 className="text-4xl font-bold mb-4">¡Mensaje Recibido!</h2>
                <p className="text-softWhite/60 text-lg max-w-md mb-8">
                    Gracias por contactar con <span className="neon-text font-bold">Groob Code</span>. Nuestro equipo revisará tu solicitud y te contactará en menos de 24 horas.
                </p>
                <NeonButton onClick={() => setSubmitted(false)}>Enviar otro mensaje</NeonButton>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Info Side */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Impulsa tu <span className="neon-text">Visión</span></h2>
                        <p className="text-softWhite/60 text-lg">
                            En <span className="font-bold text-softWhite">Groob Code</span> estamos listos para transformar tu idea en una solución tecnológica de clase mundial.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-accent/10 rounded-lg text-accent">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-softWhite/40 font-medium">Ubicación</p>
                                <p className="font-bold">Remoto / Global</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-highlight/10 rounded-lg text-highlight">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-softWhite/40 font-medium">Email Directo</p>
                                <p className="font-bold">contact@groobcode.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-accent/10 rounded-lg text-accent">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-softWhite/40 font-medium">Línea de Atención</p>
                                <p className="font-bold">Gestión Digital 24/7</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                            <a key={i} href="#" className="p-3 rounded-full border border-white/10 hover:border-accent hover:text-accent transition-all">
                                <Icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* Form Side */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-softWhite/60">Nombre Completo</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-softWhite focus:border-accent outline-none transition-colors"
                                placeholder="Ej. Juan Pérez"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-softWhite/60">Email Corporativo</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-softWhite focus:border-accent outline-none transition-colors"
                                    placeholder="juan@empresa.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-softWhite/60">Número de Celular</label>
                                <input
                                    type="tel"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-softWhite focus:border-accent outline-none transition-colors"
                                    placeholder="+57 300 000 0000"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-softWhite/60">Tu Requerimiento</label>
                            <textarea
                                rows="4"
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-softWhite focus:border-accent outline-none transition-colors resize-none"
                                placeholder="Cuéntanos un poco sobre tu proyecto o necesidad..."
                            />
                        </div>
                        <NeonButton
                            className="w-full flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading ? 'Enviando...' : 'Enviar Mensaje'} <Send className="w-4 h-4" />
                        </NeonButton>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
