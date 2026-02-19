import { supabase } from './supabase';

export const adminService = {
    // Services CRUD
    async saveService(service) {
        const { data, error } = await supabase
            .from('services')
            .upsert(service)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async deleteService(id) {
        const { error } = await supabase
            .from('services')
            .delete()
            .eq('id', id);
        if (error) throw error;
    },

    // Plans CRUD
    async savePlan(plan) {
        const { data, error } = await supabase
            .from('plans')
            .upsert(plan)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async deletePlan(id) {
        const { error } = await supabase
            .from('plans')
            .delete()
            .eq('id', id);
        if (error) throw error;
    },

    // Promotions CRUD
    async savePromotion(promotion) {
        const { data, error } = await supabase
            .from('promotions')
            .upsert(promotion)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    async deletePromotion(id) {
        const { error } = await supabase
            .from('promotions')
            .delete()
            .eq('id', id);
        if (error) throw error;
    },


    // Users Management
    async getProfiles() {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { descending: true });
        if (error) throw error;
        return data || [];
    },

    // Contact Messages
    async getMessages() {
        const { data, error } = await supabase
            .from('contact_messages')
            .select('*')
            .order('created_at', { descending: true });
        if (error) throw error;
        return data || [];
    },

    async getUnreadMessagesCount() {
        const { count, error } = await supabase
            .from('contact_messages')
            .select('*', { count: 'exact', head: true })
            .eq('is_read', false);
        if (error) throw error;
        return count || 0;
    },

    async markMessageAsRead(id) {
        const { error } = await supabase
            .from('contact_messages')
            .update({ is_read: true })
            .eq('id', id);
        if (error) throw error;
    },

    async deleteMessage(id) {
        const { error } = await supabase
            .from('contact_messages')
            .delete()
            .eq('id', id);
        if (error) throw error;
    }
};
