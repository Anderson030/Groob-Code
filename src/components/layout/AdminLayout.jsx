import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Newspaper, Users, Tag, DollarSign, LogOut, Cpu, MessageSquare } from 'lucide-react';
import { supabase } from '../../services/supabase';
import Logo from '../ui/Logo';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [unreadCount, setUnreadCount] = React.useState(0);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            navigate('/servicios', { replace: true });
        }
    };

    const fetchUnreadCount = React.useCallback(async () => {
        try {
            const { count, error } = await supabase
                .from('contact_messages')
                .select('*', { count: 'exact', head: true })
                .eq('is_read', false);
            if (error) throw error;
            setUnreadCount(count || 0);
        } catch (err) {
            console.error('Error fetching unread count:', err);
        }
    }, []);

    React.useEffect(() => {
        fetchUnreadCount();
    }, [location.pathname, fetchUnreadCount]);

    React.useEffect(() => {
        fetchUnreadCount();

        // Listen for manual updates from child components
        window.addEventListener('messagesUpdated', fetchUnreadCount);

        // Real-time subscription for new messages
        const subscription = supabase
            .channel('contact_messages_changes')
            .on('postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'contact_messages' },
                () => fetchUnreadCount()
            )
            .on('postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'contact_messages' },
                () => fetchUnreadCount()
            )
            .on('postgres_changes',
                { event: 'DELETE', schema: 'public', table: 'contact_messages' },
                () => fetchUnreadCount()
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [fetchUnreadCount]);

    const navItems = [
        { icon: <LayoutDashboard />, label: 'Dashboard', path: '/admin' },
        { icon: <Cpu />, label: 'Servicios', path: '/admin/services' },
        { icon: <Users />, label: 'Usuarios', path: '/admin/users' },
        {
            icon: <MessageSquare />,
            label: 'Mensajes',
            path: '/admin/messages',
            badge: unreadCount > 0 ? unreadCount : null
        },
        { icon: <Tag />, label: 'Promociones', path: '/admin/promotions' },
        { icon: <DollarSign />, label: 'Precios', path: '/admin/pricing' },
    ];

    return (
        <div className="min-h-screen bg-background text-softWhite flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-darkCharcoal/30 backdrop-blur-xl flex flex-col">
                <div className="p-6 border-b border-white/10 flex items-center gap-2">
                    <Logo className="w-8 h-8" />
                    <span className="font-bold tracking-tighter text-sm">GROOB CODE ADMIN</span>
                </div>

                <nav className="flex-grow p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/5 transition-colors text-softWhite/70 hover:text-highlight group"
                        >
                            <div className="flex items-center gap-3">
                                {React.cloneElement(item.icon, { className: 'w-5 h-5' })}
                                <span className="text-sm font-medium">{item.label}</span>
                            </div>
                            {item.badge && (
                                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)] group-hover:scale-110 transition-transform">
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-500/10 text-softWhite/40 hover:text-red-400 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-medium">Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
