/**
 * Environment variable validation and type-safe access
 */

interface EnvironmentVariables {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NEXT_PUBLIC_APP_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
    SUPABASE_SERVICE_ROLE_KEY?: string;
}

/**
 * Validates that required environment variables are present
 * Throws an error if any required variables are missing
 */
export function validateEnv(): EnvironmentVariables {
    const requiredVars = [
        'NEXT_PUBLIC_SUPABASE_URL',
        'NEXT_PUBLIC_SUPABASE_ANON_KEY',
        'NEXT_PUBLIC_APP_URL',
    ];

    const missing = requiredVars.filter((key) => !process.env[key]);

    if (missing.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missing.join(', ')}\n` +
            'Please check your .env file and ensure all required variables are set.'
        );
    }

    return {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL!,
        NODE_ENV: (process.env.NODE_ENV as EnvironmentVariables['NODE_ENV']) || 'development',
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    };
}

/**
 * Type-safe environment variable access
 * Use this instead of directly accessing process.env
 */
export const env = {
    get supabaseUrl() {
        return process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    },
    get supabaseAnonKey() {
        return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    },
    get appUrl() {
        return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    },
    get nodeEnv() {
        return process.env.NODE_ENV || 'development';
    },
    get isProduction() {
        return this.nodeEnv === 'production';
    },
    get isDevelopment() {
        return this.nodeEnv === 'development';
    },
};
