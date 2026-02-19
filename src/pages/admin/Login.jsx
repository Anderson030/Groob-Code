import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ChevronRight } from 'lucide-react';
import { supabase } from '../../services/supabase';
import NeonButton from '../../components/ui/NeonButton';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/auth.service';
import Logo from '../../components/ui/Logo';

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [resetMessage, setResetMessage] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { user } = await login(email, password);

            // Buscamos el perfil del usuario (Lógica específica del usuario)
            console.log('Fetching profile for UID:', user.id);
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .maybeSingle();

            console.log('Profile fetch result:', { profile, profileError });

            if (profileError) {
                setError(`Error de base de datos: ${profileError.message}`);
                setLoading(false);
                return;
            }

            if (!profile) {
                await authService.logout();
                setError(`Tu cuenta (ID: ${user.id}) no tiene un perfil administrativo en la tabla 'profiles'.`);
                setLoading(false);
            } else {
                console.log('Profile found, role:', profile.role);
                window.location.href = '/admin';
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Credenciales inválidas o acceso denegado.');
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResetMessage(null);

        try {
            await authService.resetPassword(email);
            setResetMessage({ type: 'success', text: 'Email de restablecimiento enviado. Revisa tu bandeja de entrada.' });
        } catch (err) {
            setResetMessage({ type: 'error', text: 'Error al enviar el email de restablecimiento.' });
        } finally {
            setLoading(false);
        }
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
                        <Logo className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2 uppercase">
                        {isForgotPassword ? 'Restablecer' : 'Acceso'} <span className="neon-text">{isForgotPassword ? 'Contraseña' : 'Admin'}</span>
                    </h1>
                    <p className="text-softWhite/40">
                        {isForgotPassword ? 'Ingresa tu email para restablecer la contraseña.' : 'Ingresa a la terminal de control de Groob Code.'}
                    </p>
                </div>

                {isForgotPassword ? (
                    <form onSubmit={handleForgotPassword} className="glass-card space-y-6">
                        {resetMessage && (
                            <div className={`p-3 border rounded-lg text-sm ${resetMessage.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-green-500/10 border-green-500/20 text-green-500'}`}>
                                {resetMessage.text}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-softWhite/60 flex items-center gap-2">
                                <Mail className="w-4 h-4" /> Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-softWhite focus:border-accent outline-none transition-colors"
                                placeholder="admin@groobcode.com"
                            />
                        </div>

                        <NeonButton
                            className="w-full flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading ? 'Enviando...' : 'Enviar Email de Restablecimiento'}
                        </NeonButton>

                        <button
                            type="button"
                            onClick={() => setIsForgotPassword(false)}
                            className="w-full text-sm text-accent hover:underline"
                        >
                            Volver al inicio de sesión
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleLogin} className="glass-card space-y-6">
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-softWhite/60 flex items-center gap-2">
                                <Mail className="w-4 h-4" /> Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-softWhite focus:border-accent outline-none transition-colors"
                                placeholder="admin@groobcode.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-softWhite/60 flex items-center gap-2">
                                <Lock className="w-4 h-4" /> Contraseña
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

                        <NeonButton
                            className="w-full flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading ? 'Sincronizando...' : 'Iniciar Sesión'} <ChevronRight className="w-4 h-4" />
                        </NeonButton>

                        <button
                            type="button"
                            onClick={() => setIsForgotPassword(true)}
                            className="w-full text-sm text-accent hover:underline"
                        >
                            ¿Olvidaste tu contraseña?
                        </button>
                    </form>
                )}

                <div className="mt-8 text-center text-softWhite/30 text-sm">
                    <p>Solo personal autorizado tiene acceso a este sistema.</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
