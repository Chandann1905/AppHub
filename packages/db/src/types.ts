/**
 * AppHub Database Types
 * Generated from Supabase schema
 */

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export type AppStatus = 'draft' | 'published' | 'hidden';
export type Platform = 'android' | 'windows' | 'zip';

export interface Database {
    public: {
        Tables: {
            categories: {
                Row: {
                    id: string;
                    name: string;
                    slug: string;
                    description: string | null;
                    icon: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    slug: string;
                    description?: string | null;
                    icon?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    slug?: string;
                    description?: string | null;
                    icon?: string | null;
                    created_at?: string;
                };
            };
            apps: {
                Row: {
                    id: string;
                    name: string;
                    slug: string;
                    description: string;
                    short_description: string | null;
                    category_id: string | null;
                    tags: string[];
                    icon_url: string | null;
                    developer: string | null;
                    website: string | null;
                    status: AppStatus;
                    featured: boolean;
                    downloads_count: number;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    name: string;
                    slug: string;
                    description: string;
                    short_description?: string | null;
                    category_id?: string | null;
                    tags?: string[];
                    icon_url?: string | null;
                    developer?: string | null;
                    website?: string | null;
                    status?: AppStatus;
                    featured?: boolean;
                    downloads_count?: number;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    name?: string;
                    slug?: string;
                    description?: string;
                    short_description?: string | null;
                    category_id?: string | null;
                    tags?: string[];
                    icon_url?: string | null;
                    developer?: string | null;
                    website?: string | null;
                    status?: AppStatus;
                    featured?: boolean;
                    downloads_count?: number;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            app_versions: {
                Row: {
                    id: string;
                    app_id: string;
                    version: string;
                    platform: Platform;
                    file_url: string;
                    file_size: number | null;
                    file_hash: string | null;
                    changelog: string | null;
                    system_requirements: string | null;
                    is_active: boolean;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    app_id: string;
                    version: string;
                    platform: Platform;
                    file_url: string;
                    file_size?: number | null;
                    file_hash?: string | null;
                    changelog?: string | null;
                    system_requirements?: string | null;
                    is_active?: boolean;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    app_id?: string;
                    version?: string;
                    platform?: Platform;
                    file_url?: string;
                    file_size?: number | null;
                    file_hash?: string | null;
                    changelog?: string | null;
                    system_requirements?: string | null;
                    is_active?: boolean;
                    created_at?: string;
                };
            };
            app_screenshots: {
                Row: {
                    id: string;
                    app_id: string;
                    url: string;
                    alt: string | null;
                    sort_order: number;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    app_id: string;
                    url: string;
                    alt?: string | null;
                    sort_order?: number;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    app_id?: string;
                    url?: string;
                    alt?: string | null;
                    sort_order?: number;
                    created_at?: string;
                };
            };
            downloads: {
                Row: {
                    id: string;
                    version_id: string;
                    platform: string;
                    ip_address: string | null;
                    user_agent: string | null;
                    referrer: string | null;
                    country: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    version_id: string;
                    platform: string;
                    ip_address?: string | null;
                    user_agent?: string | null;
                    referrer?: string | null;
                    country?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    version_id?: string;
                    platform?: string;
                    ip_address?: string | null;
                    user_agent?: string | null;
                    referrer?: string | null;
                    country?: string | null;
                    created_at?: string;
                };
            };
            page_views: {
                Row: {
                    id: string;
                    app_id: string | null;
                    path: string;
                    referrer: string | null;
                    user_agent: string | null;
                    ip_address: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    app_id?: string | null;
                    path: string;
                    referrer?: string | null;
                    user_agent?: string | null;
                    ip_address?: string | null;
                    created_at?: string;
                };
                Update: {
                    id?: string;
                    app_id?: string | null;
                    path?: string;
                    referrer?: string | null;
                    user_agent?: string | null;
                    ip_address?: string | null;
                    created_at?: string;
                };
            };
        };
        Views: {};
        Functions: {};
        Enums: {};
    };
}

// Convenience types
export type Category = Database['public']['Tables']['categories']['Row'];
export type App = Database['public']['Tables']['apps']['Row'];
export type AppVersion = Database['public']['Tables']['app_versions']['Row'];
export type AppScreenshot = Database['public']['Tables']['app_screenshots']['Row'];
export type Download = Database['public']['Tables']['downloads']['Row'];
export type PageView = Database['public']['Tables']['page_views']['Row'];

// Extended types with relations
export interface AppWithCategory extends App {
    category: Category | null;
}

export interface AppWithDetails extends App {
    category: Category | null;
    versions: AppVersion[];
    screenshots: AppScreenshot[];
}

export interface AppCardData {
    id: string;
    name: string;
    slug: string;
    short_description: string | null;
    icon_url: string | null;
    category: { name: string; slug: string } | null;
    downloads_count: number;
    platforms: Platform[];
}
