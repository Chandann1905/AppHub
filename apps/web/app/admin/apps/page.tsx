import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedApps } from '@apphub/db';

export const metadata: Metadata = {
    title: 'Manage Apps - AppHub Admin',
    description: 'Manage apps on AppHub',
};

export default async function AdminAppsPage() {
    const apps = await getPublishedApps({ limit: 100 });

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
                    <Link href="/admin/apps" className="admin-nav-link active">Apps</Link>
                    <Link href="/admin/categories" className="admin-nav-link">Categories</Link>
                    <Link href="/admin/analytics" className="admin-nav-link">Analytics</Link>
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
                    <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1>Manage Apps</h1>
                            <p>Add, edit, and manage your applications</p>
                        </div>
                        <Link href="/admin/apps/new" className="btn btn-primary">
                            ➕ Add New App
                        </Link>
                    </div>

                    {/* Apps Table */}
                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>App</th>
                                    <th>Category</th>
                                    <th>Platforms</th>
                                    <th>Downloads</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {apps.map((app) => (
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
                                                <div>
                                                    <div style={{ fontWeight: 500 }}>{app.name}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                                        /apps/{app.slug}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{app.category?.name || '-'}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.25rem' }}>
                                                {app.platforms?.map((p) => (
                                                    <span key={p} title={p}>
                                                        {p === 'android' ? '📱' : p === 'windows' ? '💻' : '📦'}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td>{app.downloads_count.toLocaleString()}</td>
                                        <td>
                                            <span className="status-badge status-published">Published</span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <Link href={`/admin/apps/${app.slug}`} className="action-btn">
                                                    Edit
                                                </Link>
                                                <Link href={`/admin/apps/${app.slug}/versions`} className="action-btn">
                                                    Versions
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

                    {apps.length === 0 && (
                        <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl)', color: 'var(--color-text-muted)' }}>
                            <p>No apps yet. Click &quot;Add New App&quot; to create your first app.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
