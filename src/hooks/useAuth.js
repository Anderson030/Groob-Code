import { useState, useEffect } from 'react';
import { authService } from '../services/auth.service';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Get initial session
        const initAuth = async () => {
            try {
                const session = await authService.getSession();
                setUser(session?.user ?? null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const { data: { subscription } } = authService.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        initAuth();

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            setError(null);
            return await authService.login(email, password);
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const register = async (email, password, fullName) => {
        try {
            setError(null);
            return await authService.register(email, password, fullName);
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const logout = async () => {
        try {
            setError(null);
            await authService.logout();
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    return { user, loading, error, login, register, logout };
};
