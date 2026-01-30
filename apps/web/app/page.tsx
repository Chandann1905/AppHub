import Link from 'next/link';
import { AppGrid, AdSlot } from '../components';

// Mock data for development
const mockApps = [
    {
        id: '1',
        name: 'SuperApp Pro',
        slug: 'superapp-pro',
        short_description: 'The ultimate productivity app for Android and Windows',
        icon_url: null,
        category: { name: 'Productivity', slug: 'productivity' },
        downloads_count: 125000,
        platforms: ['android' as const, 'windows' as const]
    },
    {
        id: '2',
        name: 'GameMaster 2024',
        slug: 'gamemaster-2024',
        short_description: 'Epic gaming experience with stunning graphics',
        icon_url: null,
        category: { name: 'Games', slug: 'games' },
        downloads_count: 89000,
        platforms: ['android' as const, 'windows' as const]
    },
    {
        id: '3',
        name: 'FileManager Plus',
        slug: 'filemanager-plus',
        short_description: 'Advanced file management for all your needs',
        icon_url: null,
        category: { name: 'Tools', slug: 'tools' },
        downloads_count: 56000,
        platforms: ['android' as const]
    },
    {
        id: '4',
        name: 'MediaPlayer HD',
        slug: 'mediaplayer-hd',
        short_description: 'Play any video format in stunning HD quality',
        icon_url: null,
        category: { name: 'Media', slug: 'media' },
        downloads_count: 234000,
        platforms: ['windows' as const]
    },
    {
        id: '5',
        name: 'SecureVault',
        slug: 'securevault',
        short_description: 'Keep your files safe with military-grade encryption',
        icon_url: null,
        category: { name: 'Tools', slug: 'tools' },
        downloads_count: 45000,
        platforms: ['android' as const, 'windows' as const]
    },
    {
        id: '6',
        name: 'PhotoEdit Pro',
        slug: 'photoedit-pro',
        short_description: 'Professional photo editing made easy',
        icon_url: null,
        category: { name: 'Media', slug: 'media' },
        downloads_count: 178000,
        platforms: ['android' as const, 'windows' as const]
    },
];

const mockCategories = [
    { id: '1', name: 'Android Apps', slug: 'android', description: 'Android APK applications', icon: '📱', created_at: new Date().toISOString() },
    { id: '2', name: 'Windows Software', slug: 'windows', description: 'Windows EXE applications', icon: '💻', created_at: new Date().toISOString() },
    { id: '3', name: 'Tools', slug: 'tools', description: 'Utility tools and software', icon: '🔧', created_at: new Date().toISOString() },
    { id: '4', name: 'Games', slug: 'games', description: 'Games for all platforms', icon: '🎮', created_at: new Date().toISOString() },
];

export default function HomePage() {
    const featuredApps = mockApps.slice(0, 3);
    const latestApps = mockApps;
    const categories = mockCategories;

    return (
        <>
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <h1 className="hero-title">AppHub</h1>
                    <p className="hero-subtitle">
                        Your trusted source for Android and Windows software.
                        Download safe, verified applications.
                    </p>

                    <div className="hero-stats">
                        <div className="hero-stat">
                            <div className="hero-stat-value">100K+</div>
                            <div className="hero-stat-label">Downloads</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-value">{latestApps.length}+</div>
                            <div className="hero-stat-label">Apps</div>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-value">100%</div>
                            <div className="hero-stat-label">Safe & Verified</div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container">
                {/* Top Ad Banner */}
                <AdSlot size="leaderboard" />

                {/* Featured Apps */}
                {featuredApps.length > 0 && (
                    <AppGrid
                        apps={featuredApps}
                        title="🔥 Featured Apps"
                    />
                )}

                {/* Mid-page Ad */}
                <AdSlot size="banner" />

                {/* Latest Apps */}
                <AppGrid
                    apps={latestApps}
                    title="📱 Latest Apps"
                    emptyMessage="No apps available yet. Check back soon!"
                />

                {/* Categories Section */}
                <section className="app-grid-section">
                    <h2 className="section-title">📂 Browse Categories</h2>
                    <div className="app-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/category/${category.slug}`}
                                className="app-card"
                                style={{ justifyContent: 'center', textAlign: 'center' }}
                            >
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                                    {category.icon || '📁'}
                                </div>
                                <div className="app-card-title">{category.name}</div>
                                <div className="app-card-description">{category.description}</div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Bottom Ad */}
                <AdSlot size="rectangle" />

                {/* CTA Section */}
                <section style={{ textAlign: 'center', padding: '3rem 0' }}>
                    <h2 className="section-title">Explore All Apps</h2>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                        Discover more apps for Android and Windows
                    </p>
                    <Link href="/apps" className="btn btn-primary">
                        View All Apps →
                    </Link>
                </section>
            </div>
        </>
    );
}
