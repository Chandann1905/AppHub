/**
 * Database type definitions
 * 
 * This file will be auto-generated from your Supabase schema.
 * For now, it contains placeholder types.
 * 
 * To generate types from your Supabase project:
 * 1. Install Supabase CLI: npm install -g supabase
 * 2. Run: supabase gen types typescript --project-id YOUR_PROJECT_ID > packages/db/src/types.ts
 */

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            // Your database tables will appear here after schema creation
            // Example:
            // users: {
            //   Row: { id: string; email: string; created_at: string };
            //   Insert: { id?: string; email: string; created_at?: string };
            //   Update: { id?: string; email?: string; created_at?: string };
            // };
        };
        Views: {
            // Database views will appear here
        };
        Functions: {
            // Database functions will appear here
        };
        Enums: {
            // Database enums will appear here
        };
    };
}
