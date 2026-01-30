import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedApps, getCategories } from '@apphub/db';

export const metadata: Metadata = {
    title: 'Analytics - AppHub Admin',
    description: 'Platform analytics and statistics',
};

export default async function AnalyticsPage() {
    const [apps, categories] = await Promise.all([
        getPublishedApps({ limit: 100 }),
        getCategories(),
    ]);

    // Calculate stats
    const totalDownloads = apps.reduce((sum, app) => sum + app.downloads_count, 0);
    const avgDownloads = apps.length > 0 ? Math.round(totalDownloads / apps.length) : 0;

    // Top apps by downloads
    const topApps = [...apps].sort((a, b) => b.downloads_count - a.downloads_count).slice(0, 10);

    // Downloads by category
    const downloadsByCategory = apps.reduce((acc, app) => {
        const catName = app.category?.name || 'Uncategorized';
        acc[catName] = (acc[catName] || 0) + app.downloads_count;
        return acc;
    }, {} as Record<string, number>);

    const sortedCategories = Object.entries(downloadsByCategory)
        .sort((a, b) => b[1] - a[1]);

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <div className="admin-header-left">
                    <Link href="/admin/dashboard" className="admin-logo">
                        <span className="logo-icon">📦</span>
                        <span className="logo-text">AppHub Admin</span>
                    </Link>
                </div>
                <nav className="admin-nav">
                    <Link href="/admin/dashboard" className="admin-nav-link">Dashboard</Link>
                    <Link href="/admin/apps" className="admin-nav-link">Apps</Link>
                    <Link href="/admin/categories" className="admin-nav-link">Categories</Link>
                    <Link href="/admin/analytics" className="admin-nav-link active">Analytics</Link>
                </nav>
                <div className="admin-header-right">
                    <Link href="/" className="btn btn-secondary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
                        View Site
                    </Link>
                </div>
            </header>

            <main className="admin-main">
                <div className="admin-container">
                    {/* Page Header */}
                    <div className="admin-page-header">
                        <h1>📊 Analytics</h1>
                        <p>Platform performance and statistics</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="admin-stats-grid">
                        <div className="admin-stat-card">
                            <div className="stat-icon">📱</div>
                            <div className="stat-info">
                                <span className="stat-value">{apps.length}</span>
                                <span className="stat-label">Total Apps</span>
                            </div>
                        </div>

                        <div className="admin-stat-card">
                            <div className="stat-icon">📂</div>
                            <div className="stat-info">
                                <span className="stat-value">{categories.length}</span>
                                <span className="stat-label">Categories</span>
                            </div>
                        </div>

                        <div className="admin-stat-card">
                            <div className="stat-icon">⬇️</div>
                            <div className="stat-info">
                                <span className="stat-value">{(totalDownloads / 1000).toFixed(0)}K</span>
                                <span className="stat-label">Total Downloads</span>
                            </div>
                        </div>

                        <div className="admin-stat-card">
                            <div className="stat-icon">📈</div>
                            <div className="stat-info">
                                <span className="stat-value">{(avgDownloads / 1000).toFixed(1)}K</span>
                                <span className="stat-label">Avg Downloads/App</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--spacing-xl)' }}>
                        {/* Top Apps */}
                        <div className="admin-section">
                            <h2>🔥 Top Apps by Downloads</h2>
                            <div className="admin-table-container">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>App</th>
                                            <th>Downloads</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topApps.map((app, index) => (
                                            <tr key={app.id}>
                                                <td>
                                                    <span style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        width: 24,
                                                        height: 24,
                                                        borderRadius: '50%',
                                                        background: index < 3 ? 'var(--gradient-accent)' : 'var(--color-bg-tertiary)',
                                                        fontSize: '0.75rem',
                                                        fontWeight: 700
                                                    }}>
                                                        {index + 1}
                                                    </span>
                                                </td>
                                                <td>
                                                    <Link href={`/admin/apps/${app.slug}`} style={{ color: 'var(--color-accent-light)' }}>
                                                        {app.name}
                                                    </Link>
                                                </td>
                                                <td>{app.downloads_count.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Downloads by Category */}
                        <div className="admin-section">
                            <h2>📂 Downloads by Category</h2>
                            <div className="admin-table-container">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Category</th>
                                            <th>Downloads</th>
                                            <th>Share</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedCategories.map(([category, downloads]) => {
                                            const share = totalDownloads > 0 ? (downloads / totalDownloads * 100).toFixed(1) : 0;
                                            return (
                                                <tr key={category}>
                                                    <td>{category}</td>
                                                    <td>{downloads.toLocaleString()}</td>
                                                    <td>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                            <div style={{
                                                                width: 60,
                                                                height: 8,
                                                                background: 'var(--color-bg-tertiary)',
                                                                borderRadius: 'var(--radius-full)',
                                                                overflow: 'hidden'
                                                            }}>
                                                                <div style={{
                                                                    width: `${share}%`,
                                                                    height: '100%',
                                                                    background: 'var(--gradient-accent)'
                                                                }} />
                                                            </div>
                                                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                                                {share}%
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Revenue Section (Placeholder) */}
                    <div className="admin-section" style={{ marginTop: 'var(--spacing-xl)' }}>
                        <h2>💰 Revenue Tracking</h2>
                        <div style={{
                            padding: 'var(--spacing-2xl)',
                            background: 'var(--color-card)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-lg)',
                            textAlign: 'center'
                        }}>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-md)' }}>
                                Connect your AdSense account to view revenue data
                            </p>
                            <button className="btn btn-primary">
                                🔗 Connect AdSense
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
