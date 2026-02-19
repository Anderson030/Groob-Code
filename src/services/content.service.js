import { supabase } from './supabase';

export const contentService = {
    async getServices() {
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('created_at', { ascending: true });
        if (error) throw error;
        return data || [];
    },

    async getPlans() {
        const { data, error } = await supabase
            .from('plans')
            .select('*')
            .order('price', { ascending: true });
        if (error) throw error;
        return data || [];
    },

    async getPromotions() {
        const { data, error } = await supabase
            .from('promotions')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { descending: true });
        if (error) throw error;
        return data || [];
    },

};
