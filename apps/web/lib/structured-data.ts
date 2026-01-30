import type { AppWithDetails, AppCardData } from '@apphub/db';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://apphub.example.com';

/**
 * Generate WebSite structured data
 */
export function generateWebsiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'AppHub',
        url: BASE_URL,
        description: 'Your trusted source for Android APK and Windows software downloads',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };
}

/**
 * Generate Organization structured data
 */
export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'AppHub',
        url: BASE_URL,
        logo: `${BASE_URL}/logo.png`,
        sameAs: [],
    };
}

/**
 * Generate SoftwareApplication structured data for app pages
 */
export function generateAppSchema(app: AppWithDetails) {
    const androidVersion = app.versions?.find(v => v.platform === 'android' && v.is_active);
    const windowsVersion = app.versions?.find(v => v.platform === 'windows' && v.is_active);

    const offers = [];

    if (androidVersion) {
        offers.push({
            '@type': 'Offer',
            price: 0,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
        });
    }

    const applicationCategory = app.category?.name || 'Utilities';

    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: app.name,
        description: app.short_description || app.description?.slice(0, 160),
        url: `${BASE_URL}/apps/${app.slug}`,
        applicationCategory: applicationCategory,
        operatingSystem: app.versions?.map(v =>
            v.platform === 'android' ? 'Android' :
                v.platform === 'windows' ? 'Windows' :
                    v.platform
        ).join(', '),
        offers: offers.length > 0 ? offers : {
            '@type': 'Offer',
            price: 0,
            priceCurrency: 'USD',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.5',
            ratingCount: Math.max(10, Math.floor(app.downloads_count / 100)),
        },
        downloadUrl: androidVersion?.file_url || windowsVersion?.file_url,
        fileSize: androidVersion?.file_size || windowsVersion?.file_size,
        softwareVersion: androidVersion?.version || windowsVersion?.version,
        author: {
            '@type': 'Organization',
            name: app.developer || 'AppHub',
        },
        image: app.icon_url || `${BASE_URL}/placeholder-icon.png`,
    };
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
        })),
    };
}

/**
 * Generate ItemList structured data for app listings
 */
export function generateAppListSchema(apps: AppCardData[], listName: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: listName,
        numberOfItems: apps.length,
        itemListElement: apps.map((app, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${BASE_URL}/apps/${app.slug}`,
            name: app.name,
        })),
    };
}
