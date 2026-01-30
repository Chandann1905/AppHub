import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Check if Supabase is configured
 */
export const isSupabaseConfigured = (): boolean => {
    return Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http'));
};

// Only create the client if credentials are available
let _supabaseClient: SupabaseClient<Database> | null = null;

/**
 * Get Supabase client for browser-side operations
 * Returns null if Supabase is not configured
 */
export const getSupabaseClient = (): SupabaseClient<Database> | null => {
    if (!isSupabaseConfigured()) {
        return null;
    }

    if (!_supabaseClient) {
        _supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
            },
        });
    }

    return _supabaseClient;
};

/**
 * Supabase client singleton - use getSupabaseClient() for null-safe access
 * This export maintains backwards compatibility but may be null
 */
export const supabase = getSupabaseClient() as SupabaseClient<Database>;

/**
 * Server-side Supabase client
 * Returns null if Supabase is not configured
 */
export const getServerSupabaseClient = (): SupabaseClient<Database> | null => {
    if (!isSupabaseConfigured()) {
        return null;
    }

    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (serviceRoleKey) {
        return createClient<Database>(supabaseUrl, serviceRoleKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
            },
        });
    }

    return getSupabaseClient();
};
