/**
 * AppHub Database Queries
 * 
 * Currently returns mock data. 
 * Will integrate with Supabase when configured.
 */

import type {
    AppWithDetails,
    AppCardData,
    Category,
    Platform
} from './types';

/**
 * Get all published apps for listing
 */
export async function getPublishedApps(options?: {
    limit?: number;
    offset?: number;
    category?: string;
    search?: string;
    featured?: boolean;
}): Promise<AppCardData[]> {
    // Use mock data for development
    return getMockApps(options);
}

/**
 * Get single app by slug with full details
 */
export async function getAppBySlug(slug: string): Promise<AppWithDetails | null> {
    return getMockAppDetails(slug);
}

/**
 * Get all categories
 */
export async function getCategories(): Promise<Category[]> {
    return getMockCategories();
}

/**
 * Get featured apps
 */
export async function getFeaturedApps(limit = 6): Promise<AppCardData[]> {
    return getPublishedApps({ featured: true, limit });
}

/**
 * Get related apps
 */
export async function getRelatedApps(
    appId: string,
    _categoryId: string | null,
    limit = 4
): Promise<AppCardData[]> {
    return getMockApps({ limit }).filter(app => app.id !== appId);
}

/**
 * Track a download (no-op in mock mode)
 */
export async function trackDownload(
    _versionId: string,
    _platform: string,
    _metadata?: {
        ip?: string;
        userAgent?: string;
        referrer?: string;
    }
): Promise<void> {
    // No-op in mock mode
    console.log('Download tracked (mock)');
}

/**
 * Track a page view (no-op in mock mode)
 */
export async function trackPageView(
    _path: string,
    _appId?: string,
    _metadata?: {
        ip?: string;
        userAgent?: string;
        referrer?: string;
    }
): Promise<void> {
    // No-op in mock mode
}

// ============ MOCK DATA ============

function getMockCategories(): Category[] {
    return [
        { id: '1', name: 'Android Apps', slug: 'android', description: 'Android APK applications', icon: '📱', created_at: new Date().toISOString() },
        { id: '2', name: 'Windows Software', slug: 'windows', description: 'Windows EXE applications', icon: '💻', created_at: new Date().toISOString() },
        { id: '3', name: 'Tools', slug: 'tools', description: 'Utility tools and software', icon: '🔧', created_at: new Date().toISOString() },
        { id: '4', name: 'Games', slug: 'games', description: 'Games for all platforms', icon: '🎮', created_at: new Date().toISOString() },
        { id: '5', name: 'Media', slug: 'media', description: 'Media and entertainment', icon: '🎬', created_at: new Date().toISOString() },
        { id: '6', name: 'Productivity', slug: 'productivity', description: 'Productivity apps', icon: '📊', created_at: new Date().toISOString() },
    ];
}

function getMockApps(options?: { featured?: boolean; limit?: number }): AppCardData[] {
    const allApps: AppCardData[] = [
        {
            id: '1',
            name: 'SuperApp Pro',
            slug: 'superapp-pro',
            short_description: 'The ultimate productivity app for Android and Windows',
            icon_url: null,
            category_id: '6',
            category: { name: 'Productivity', slug: 'productivity' },
            downloads_count: 125000,
            platforms: ['android', 'windows'] as Platform[]
        },
        {
            id: '2',
            name: 'GameMaster 2024',
            slug: 'gamemaster-2024',
            short_description: 'Epic gaming experience with stunning graphics',
            icon_url: null,
            category_id: '4',
            category: { name: 'Games', slug: 'games' },
            downloads_count: 89000,
            platforms: ['android', 'windows'] as Platform[]
        },
        {
            id: '3',
            name: 'FileManager Plus',
            slug: 'filemanager-plus',
            short_description: 'Advanced file management for all your needs',
            icon_url: null,
            category_id: '3',
            category: { name: 'Tools', slug: 'tools' },
            downloads_count: 56000,
            platforms: ['android'] as Platform[]
        },
        {
            id: '4',
            name: 'MediaPlayer HD',
            slug: 'mediaplayer-hd',
            short_description: 'Play any video format in stunning HD quality',
            icon_url: null,
            category_id: '5',
            category: { name: 'Media', slug: 'media' },
            downloads_count: 234000,
            platforms: ['windows'] as Platform[]
        },
        {
            id: '5',
            name: 'SecureVault',
            slug: 'securevault',
            short_description: 'Keep your files safe with military-grade encryption',
            icon_url: null,
            category_id: '3',
            category: { name: 'Tools', slug: 'tools' },
            downloads_count: 45000,
            platforms: ['android', 'windows'] as Platform[]
        },
        {
            id: '6',
            name: 'PhotoEdit Pro',
            slug: 'photoedit-pro',
            short_description: 'Professional photo editing made easy',
            icon_url: null,
            category_id: '5',
            category: { name: 'Media', slug: 'media' },
            downloads_count: 178000,
            platforms: ['android', 'windows'] as Platform[]
        },
    ];

    const limit = options?.limit || allApps.length;
    return allApps.slice(0, limit);
}

function getMockAppDetails(slug: string): AppWithDetails | null {
    const mockApp: AppWithDetails = {
        id: '1',
        name: 'SuperApp Pro',
        slug: 'superapp-pro',
        description: `SuperApp Pro is the ultimate productivity application designed for modern professionals who demand the best. With its intuitive interface and powerful features, SuperApp Pro transforms the way you work, helping you accomplish more in less time.

Key Features:
• Smart Task Management: Organize your tasks with intelligent categorization and priority sorting
• Cloud Sync: Access your data from any device, anywhere in the world
• Collaboration Tools: Share projects and collaborate with team members in real-time
• Custom Workflows: Create automated workflows to streamline repetitive tasks
• Advanced Analytics: Track your productivity with detailed insights and reports

Whether you're a student, professional, or entrepreneur, SuperApp Pro adapts to your unique workflow. The app includes powerful scheduling tools, note-taking capabilities, and seamless integration with popular services.

SuperApp Pro is regularly updated with new features and improvements based on user feedback. Our dedicated support team is always available to help you get the most out of the application.

Download SuperApp Pro today and experience the future of productivity!`,
        short_description: 'The ultimate productivity app for Android and Windows',
        category_id: '1',
        tags: ['productivity', 'tools', 'office', 'work'],
        icon_url: null,
        developer: 'AppHub Studios',
        website: 'https://apphub.example.com',
        status: 'published',
        featured: true,
        downloads_count: 125000,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        category: {
            id: '1',
            name: 'Productivity',
            slug: 'productivity',
            description: 'Productivity apps',
            icon: '📊',
            created_at: new Date().toISOString()
        },
        versions: [
            {
                id: 'v1',
                app_id: '1',
                version: '2.5.1',
                platform: 'android',
                file_url: '/demo/superapp-pro.apk',
                file_size: 45000000,
                file_hash: 'abc123',
                changelog: 'Bug fixes and performance improvements',
                system_requirements: 'Android 8.0 or higher',
                is_active: true,
                created_at: new Date().toISOString()
            },
            {
                id: 'v2',
                app_id: '1',
                version: '2.5.1',
                platform: 'windows',
                file_url: '/demo/superapp-pro.exe',
                file_size: 85000000,
                file_hash: 'def456',
                changelog: 'Bug fixes and performance improvements',
                system_requirements: 'Windows 10 or higher',
                is_active: true,
                created_at: new Date().toISOString()
            }
        ],
        screenshots: []
    };

    if (slug === 'superapp-pro' || slug === 'demo') {
        return mockApp;
    }

    // Return same mock data for any slug (for demo purposes)
    return {
        ...mockApp,
        slug,
        name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    };
}
