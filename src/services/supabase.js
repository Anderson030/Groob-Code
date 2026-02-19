import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : { auth: { signInWithPassword: () => ({ error: new Error('Supabase no configurado') }), signOut: () => { } } };

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing.');
} else {
    console.log('Supabase URL:', supabaseUrl);
    console.log('Supabase Key prefix:', supabaseAnonKey.substring(0, 15) + '...');
}
