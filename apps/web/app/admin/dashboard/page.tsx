import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedApps, getCategories } from '@apphub/db';

export const metadata: Metadata = {
    title: 'Dashboard - AppHub Admin',
    description: 'AppHub Admin Dashboard',
};

export default async function AdminDashboardPage() {
    const [apps, categories] = await Promise.all([
        getPublishedApps({ limit: 100 }),
        getCategories(),
    ]);

    // Calculate mock stats
    const totalDownloads = apps.reduce((sum, app) => sum + app.downloads_count, 0);

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
                    <Link href="/admin/dashboard" className="admin-nav-link active">Dashboard</Link>
                    <Link href="/admin/apps" className="admin-nav-link">Apps</Link>
                    <Link href="/admin/categories" className="admin-nav-link">Categories</Link>
                    <Link href="/admin/analytics" className="admin-nav-link">Analytics</Link>
                </nav>
                <div className="admin-header-right">
                    <Link href="/" className="btn btn-secondary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
                        View Site
                    </Link>
                    <button className="btn btn-secondary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
                        Logout
                    </button>
                </div>
            </header>

            <main className="admin-main">
                <div className="admin-container">
                    {/* Page Header */}
                    <div className="admin-page-header">
                        <h1>Dashboard</h1>
                        <p>Welcome back! Here&apos;s an overview of your platform.</p>
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
                                <span className="stat-label">Downloads</span>
                            </div>
                        </div>

                        <div className="admin-stat-card">
                            <div className="stat-icon">👁️</div>
                            <div className="stat-info">
                                <span className="stat-value">0</span>
                                <span className="stat-label">Page Views Today</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="admin-section">
                        <h2>Quick Actions</h2>
                        <div className="admin-action-grid">
                            <Link href="/admin/apps/new" className="admin-action-card">
                                <span className="action-icon">➕</span>
                                <span className="action-label">Add New App</span>
                            </Link>
                            <Link href="/admin/apps" className="admin-action-card">
                                <span className="action-icon">📋</span>
                                <span className="action-label">Manage Apps</span>
                            </Link>
                            <Link href="/admin/categories" className="admin-action-card">
                                <span className="action-icon">🏷️</span>
                                <span className="action-label">Manage Categories</span>
                            </Link>
                            <Link href="/admin/analytics" className="admin-action-card">
                                <span className="action-icon">📊</span>
                                <span className="action-label">View Analytics</span>
                            </Link>
                        </div>
                    </div>

                    {/* Recent Apps */}
                    <div className="admin-section">
                        <div className="section-header">
                            <h2>Recent Apps</h2>
                            <Link href="/admin/apps" className="section-link">View All →</Link>
                        </div>
                        <div className="admin-table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>App Name</th>
                                        <th>Category</th>
                                        <th>Downloads</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {apps.slice(0, 5).map((app) => (
                                        <tr key={app.id}>
                                            <td>
                                                <div className="app-name-cell">
                                                    <div className="app-icon-small">
                                                        {app.icon_url ? (
                                                            <img src={app.icon_url} alt={app.name} />
                                                        ) : (
                                                            <span>{app.name.charAt(0)}</span>
                                                        )}
                                                    </div>
                                                    <span>{app.name}</span>
                                                </div>
                                            </td>
                                            <td>{app.category?.name || '-'}</td>
                                            <td>{app.downloads_count.toLocaleString()}</td>
                                            <td>
                                                <span className="status-badge status-published">Published</span>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <Link href={`/admin/apps/${app.slug}`} className="action-btn">
                                                        Edit
                                                    </Link>
                                                    <Link href={`/apps/${app.slug}`} target="_blank" className="action-btn">
                                                        View
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
