import { getPublishedApps, getCategories } from '@apphub/db';
import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://apphub.example.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [apps, categories] = await Promise.all([
        getPublishedApps({ limit: 1000 }),
        getCategories(),
    ]);

    const now = new Date().toISOString();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: now,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/apps`,
            lastModified: now,
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/search`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/privacy`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/terms`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/dmca`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.3,
        },
    ];

    // Category pages
    const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
        url: `${BASE_URL}/category/${category.slug}`,
        lastModified: now,
        changeFrequency: 'daily' as const,
        priority: 0.8,
    }));

    // App pages - highest priority for SEO
    const appPages: MetadataRoute.Sitemap = apps.map((app) => ({
        url: `${BASE_URL}/apps/${app.slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    return [...staticPages, ...categoryPages, ...appPages];
}
