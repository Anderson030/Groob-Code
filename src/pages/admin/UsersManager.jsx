import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Shield, Mail, Trash2, ShieldCheck, Loader2, X } from 'lucide-react';
import { adminService } from '../../services/admin.service';

const UsersManager = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({ email: '', fullName: '', role: 'admin' });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await adminService.getProfiles();
            setUsers(data);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Error al cargar la lista de usuarios.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // Nota Técnica: El registro de usuarios en Supabase Auth desde el cliente 
            // requiere privilegios de servicio o una Edge Function. 
            // Para esta implementación, simulamos el flujo de alta de perfil.
            alert('Lógica de registro iniciada. En un entorno de producción, esto invoca una función de servidor para crear el usuario en Supabase Auth.');

            setIsAdding(false);
            fetchUsers();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Gestión de <span className="neon-text">Usuarios</span></h2>
                    <p className="text-softWhite/40 text-sm mt-1">Administración interna de accesos y perfiles.</p>
                </div>
                <button
                    onClick={() => setIsAdding(true)}
                    className="btn-primary flex items-center gap-2 py-2"
                >
                    <UserPlus className="w-4 h-4" /> Crear Nuevo Usuario
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 border-accent/20">
                    <Shield className="text-accent mb-2" />
                    <div className="text-2xl font-bold">{users.length}</div>
                    <div className="text-xs text-softWhite/40 uppercase tracking-widest">Usuarios Activos</div>
                </div>
            </div>

            {/* Users List */}
            <div className="glass-card overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 text-xs uppercase tracking-wider text-softWhite/40">
                        <tr>
                            <th className="px-6 py-4 font-medium">Usuario / Email</th>
                            <th className="px-6 py-4 font-medium">Rol</th>
                            <th className="px-6 py-4 font-medium">Registro</th>
                            <th className="px-6 py-4 font-medium text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center">
                                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-accent mb-2" />
                                    <span className="text-softWhite/30">Accediendo a la base de datos...</span>
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-softWhite/20">
                                    No hay otros administradores registrados.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium">{user.full_name || 'Sin nombre'}</span>
                                            <span className="text-xs text-softWhite/40">{user.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                                            <ShieldCheck className="w-3 h-3" /> {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-softWhite/40">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-red-500/10 rounded-lg text-softWhite/30 hover:text-red-400 transition-all">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for adding user */}
            {isAdding && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsAdding(false)} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-darkCharcoal border border-white/10 rounded-2xl p-8 w-full max-w-md relative z-10 shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <UserPlus className="text-accent" /> Registrar Nuevo Usuario
                            </h3>
                            <button onClick={() => setIsAdding(false)} className="text-softWhite/30 hover:text-softWhite"><X /></button>
                        </div>

                        <form className="space-y-4" onSubmit={handleAddUser}>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-softWhite/40 uppercase">Nombre Completo</label>
                                <input
                                    type="text"
                                    placeholder="Ej. John Doe"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-accent appearance-none text-white"
                                    required
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-softWhite/40 uppercase">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-softWhite/20" />
                                    <input
                                        type="email"
                                        placeholder="usuario@groobcodey.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 outline-none focus:border-accent text-white"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-softWhite/40 uppercase">Nivel de Acceso</label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-accent appearance-none text-white"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                >
                                    <option value="admin" className="bg-darkCharcoal text-white">Administrador</option>
                                    <option value="superadmin" className="bg-darkCharcoal text-white">Superadministrador</option>
                                </select>
                            </div>

                            <div className="pt-6 border-t border-white/5">
                                <p className="text-[10px] text-softWhite/30 mb-4 italic">
                                    * Esta acción creará un perfil autorizado. El usuario recibirá un correo para establecer su contraseña.
                                </p>
                                <button type="submit" className="btn-primary w-full py-3 flex items-center justify-center gap-2">
                                    Crear Acceso
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default UsersManager;
