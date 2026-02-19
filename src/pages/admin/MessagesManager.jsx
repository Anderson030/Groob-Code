import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Calendar, User, MessageSquare, Loader2, RefreshCw, Trash2 } from 'lucide-react';
import { adminService } from '../../services/admin.service';

const MessagesManager = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMessages = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await adminService.getMessages();
            setMessages(data);

            // Mark unread messages as read automatically
            const unreadIds = data.filter(m => !m.is_read).map(m => m.id);
            if (unreadIds.length > 0) {
                await Promise.all(unreadIds.map(id => adminService.markMessageAsRead(id)));
                // Update local state and signal layout refresh
                setMessages(prev => prev.map(m => ({ ...m, is_read: true })));
                window.dispatchEvent(new Event('messagesUpdated'));
            }
        } catch (err) {
            console.error('Error al cargar mensajes:', err);
            setError('Error al conectar con la base de datos de mensajes.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const formatDateTime = (isoString) => {
        return new Date(isoString).toLocaleString('es-CO', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Bandeja de <span className="neon-text">Mensajes</span></h2>
                    <p className="text-softWhite/40 text-sm mt-1">Gestión de consultas recibidas desde la plataforma.</p>
                </div>
                <button
                    onClick={fetchMessages}
                    className="p-2 hover:bg-white/5 rounded-full text-softWhite/40 hover:text-accent transition-all"
                    title="Actualizar"
                >
                    <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-softWhite/20">
                    <Loader2 className="w-8 h-8 animate-spin mb-4" />
                    <span>Sincronizando con el servidor...</span>
                </div>
            ) : messages.length === 0 ? (
                <div className="glass-card p-12 text-center text-softWhite/20 flex flex-col items-center">
                    <Mail className="w-12 h-12 mb-4 opacity-10" />
                    <p className="text-lg">No hay mensajes entrantes en este momento.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {messages.map((msg, index) => (
                        <motion.div
                            key={msg.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="glass-card p-6 border-white/5 hover:border-accent/20 transition-all group"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                                <div className="space-y-4 flex-grow">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <div className="flex items-center gap-2 text-softWhite font-bold">
                                            <div className="p-2 bg-accent/10 rounded-lg text-accent">
                                                <User className="w-4 h-4" />
                                            </div>
                                            {msg.full_name}
                                        </div>
                                        <div className="flex items-center gap-2 text-softWhite/40 text-sm">
                                            <Mail className="w-4 h-4" /> {msg.email}
                                        </div>
                                        {msg.phone && (
                                            <div className="flex items-center gap-2 text-softWhite/40 text-sm">
                                                <Phone className="w-4 h-4" /> {msg.phone}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2 text-softWhite/40 text-sm ml-auto">
                                            <Calendar className="w-4 h-4" /> {formatDateTime(msg.created_at)}
                                        </div>
                                    </div>

                                    <div className="bg-white/5 p-5 rounded-xl border border-white/5">
                                        <div className="flex gap-3">
                                            <MessageSquare className="w-5 h-5 text-accent shrink-0" />
                                            <p className="text-softWhite/80 leading-relaxed italic whitespace-pre-wrap">
                                                "{msg.message}"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex lg:flex-col items-end justify-between gap-4">
                                    <div className="flex flex-col items-end gap-2">
                                        {!msg.is_read && (
                                            <div className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded flex items-center gap-1 shadow-[0_0_10px_rgba(239,68,68,0.3)] animate-pulse">
                                                NUEVO
                                            </div>
                                        )}
                                        <div className="px-3 py-1 bg-accent/5 border border-accent/20 rounded-full text-[10px] uppercase tracking-widest text-accent font-bold">
                                            #{messages.length - index} Recibido
                                        </div>
                                    </div>
                                    <button
                                        onClick={async () => {
                                            if (confirm('¿Estás seguro de eliminar este mensaje?')) {
                                                await adminService.deleteMessage(msg.id);
                                                window.dispatchEvent(new Event('messagesUpdated'));
                                                fetchMessages();
                                            }
                                        }}
                                        className="p-2 hover:bg-red-500/10 rounded-lg text-softWhite/20 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MessagesManager;
