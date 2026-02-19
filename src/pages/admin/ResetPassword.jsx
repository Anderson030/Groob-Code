import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Key, Cpu } from 'lucide-react';
import { supabase } from '../../services/supabase';
import NeonButton from '../../components/ui/NeonButton';
import { useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        // Check if we have the access_token and type=recovery in URL
        const accessToken = searchParams.get('access_token');
        const type = searchParams.get('type');

        if (type === 'recovery' && accessToken) {
            // Set the session
            supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: searchParams.get('refresh_token') || '',
            });
        }
    }, [searchParams]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if (password !== confirmPassword) {
            setMessage({ type: 'error', text: 'Las contraseñas no coinciden.' });
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setMessage({ type: 'error', text: 'La contraseña debe tener al menos 6 caracteres.' });
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            setMessage({ type: 'error', text: 'Error al restablecer la contraseña.' });
        } else {
            setMessage({ type: 'success', text: 'Contraseña restablecida exitosamente. Redirigiendo...' });
            setTimeout(() => {
                window.location.href = '/admin';
            }, 2000);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <div className="inline-block p-4 bg-accent/10 rounded-2xl mb-4 border border-accent/20">
                        <Cpu className="w-10 h-10 text-accent" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Restablecer <span className="neon-text">Contraseña</span></h1>
                    <p className="text-softWhite/40">Ingresa tu nueva contraseña.</p>
                </div>

                <form onSubmit={handleResetPassword} className="glass-card space-y-6">
                    {message && (
                        <div className={`p-3 border rounded-lg text-sm ${message.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-green-500/10 border-green-500/20 text-green-500'}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-softWhite/60 flex items-center gap-2">
                            <Key className="w-4 h-4" /> Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-softWhite focus:border-accent outline-none transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-softWhite/60 flex items-center gap-2">
                            <Key className="w-4 h-4" /> Confirmar Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-softWhite focus:border-accent outline-none transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <NeonButton
                        className="w-full flex items-center justify-center gap-2"
                        disabled={loading}
                    >
                        {loading ? 'Restableciendo...' : 'Restablecer Contraseña'}
                    </NeonButton>
                </form>
            </motion.div>
        </div>
    );
};

export default ResetPassword;