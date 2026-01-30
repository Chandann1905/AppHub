import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedApps, getCategories } from '@apphub/db';
import { AppGrid, AdSlot } from '../../components';

export const metadata: Metadata = {
    title: 'All Apps - Browse Software',
    description: 'Browse and download all available Android APK and Windows software from AppHub.',
};

export default async function AppsPage() {
    const [apps, categories] = await Promise.all([
        getPublishedApps({ limit: 20 }),
        getCategories(),
    ]);

    return (
        <div className="container">
            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title">📱 All Apps</h1>
                <p className="page-description">
                    Browse our collection of Android and Windows software
                </p>
            </div>

            {/* Top Ad */}
            <AdSlot size="leaderboard" />

            {/* Category Filter Links */}
            <div className="filters">
                <Link href="/apps" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    All
                </Link>
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/category/${category.slug}`}
                        className="btn btn-secondary"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                    >
                        {category.icon} {category.name}
                    </Link>
                ))}
            </div>

            {/* Apps Grid */}
            <AppGrid
                apps={apps}
                emptyMessage="No apps available yet. Check back soon!"
            />

            {/* Bottom Ad */}
            <AdSlot size="rectangle" />

            {/* Load More CTA */}
            <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-md)' }}>
                    Showing {apps.length} apps
                </p>
            </div>
        </div>
    );
}
