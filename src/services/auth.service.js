import { supabase } from './supabase';

export const authService = {
    async login(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    },

    async register(email, password, fullName) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });
        if (error) throw error;
        return data;
    },

    async logout() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    async resetPassword(email) {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        return data;
    },

    async getSession() {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        return session;
    },

    async getUser() {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        return user;
    },

    async updatePassword(newPassword) {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) throw error;
    },

    onAuthStateChange(callback) {
        return supabase.auth.onAuthStateChange(callback);
    }
};
