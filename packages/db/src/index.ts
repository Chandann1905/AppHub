// Export types
export * from './types';

// Export queries
export * from './queries';

// Supabase client - export only when needed
export {
    supabase,
    getSupabaseClient,
    getServerSupabaseClient,
    isSupabaseConfigured
} from './client';
