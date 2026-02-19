import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, FileText, TrendingUp, Lock, Key } from 'lucide-react';
import { authService } from '../../services/auth.service';
import NeonButton from '../../components/ui/NeonButton';

const stats = [
    { label: 'Visitas Totales', value: '12,480', icon: <Users />, trend: '+15%' },
    { label: 'Proyectos Activos', value: '34', icon: <Activity />, trend: '+4%' },
    { label: 'Blog Posts', value: '128', icon: <FileText />, trend: '+12' },
    { label: 'Conversión', value: '3.2%', icon: <TrendingUp />, trend: '+0.5%' },
];

const Dashboard = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'Las nuevas contraseñas no coinciden.' });
            setLoading(false);
            return;
        }

        if (newPassword.length < 6) {
            setMessage({ type: 'error', text: 'La nueva contraseña debe tener al menos 6 caracteres.' });
            setLoading(false);
            return;
        }

        try {
            const user = await authService.getUser();

            // Verificamos contraseña actual re-autenticando
            try {
                await authService.login(user.email, currentPassword);
            } catch (err) {
                setMessage({ type: 'error', text: 'Contraseña actual incorrecta.' });
                setLoading(false);
                return;
            }

            await authService.updatePassword(newPassword);

            setMessage({ type: 'success', text: 'Contraseña cambiada exitosamente.' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setMessage({ type: 'error', text: err.message || 'Error inesperado. Inténtalo de nuevo.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold mb-2">Bienvenido a la <span className="neon-text">Terminal Real</span></h1>
                <p className="text-softWhite/40">Gestiona el contenido de Groob Code en tiempo real.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card">
                    <h3 className="text-xl font-bold mb-4">Estado del Sistema</h3>
                    <div className="flex items-center gap-4 p-4 bg-green-500/5 border border-green-500/20 rounded-xl">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-green-500 font-medium">Sincronizado con Supabase Cloud</span>
                    </div>
                </div>

                <div className="glass-card flex flex-col justify-center">
                    <p className="text-softWhite/40 text-sm italic">
                        "El futuro no se predice, se construye." - Gestiona tus servicios y precios desde los módulos laterales.
                    </p>
                </div>
            </div>

            <div className="glass-card">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Key className="w-5 h-5" /> Cambiar Contraseña
                </h3>
                {message && (
                    <div className={`p-3 mb-4 border rounded-lg text-sm ${message.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-green-500/10 border-green-500/20 text-green-500'}`}>
                        {message.text}
                    </div>
                )}
                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-softWhite/60 flex items-center gap-2">
                            <Lock className="w-4 h-4" /> Contraseña Actual
                        </label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-softWhite focus:border-accent outline-none transition-colors"
                            placeholder="••••••••"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-softWhite/60 flex items-center gap-2">
                            <Key className="w-4 h-4" /> Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
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
                        type="submit"
                        className="w-full flex items-center justify-center gap-2"
                        disabled={loading}
                    >
                        {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
                    </NeonButton>
                </form>
            </div>
        </div>
    );
};

export default Dashboard;
