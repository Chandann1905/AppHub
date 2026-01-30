import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAppBySlug } from '@apphub/db';

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const app = await getAppBySlug(params.slug);
    return {
        title: app ? `Versions - ${app.name} - AppHub Admin` : 'App Not Found',
    };
}

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export default async function VersionsPage({
    params,
}: {
    params: { slug: string };
}) {
    const app = await getAppBySlug(params.slug);

    if (!app) {
        notFound();
    }

    const versions = app.versions || [];

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
                    {/* Breadcrumb */}
                    <nav className="breadcrumb">
                        <Link href="/admin/dashboard">Dashboard</Link>
                        <span>/</span>
                        <Link href="/admin/apps">Apps</Link>
                        <span>/</span>
                        <Link href={`/admin/apps/${app.slug}`}>{app.name}</Link>
                        <span>/</span>
                        <span>Versions</span>
                    </nav>

                    {/* Page Header */}
                    <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1>📦 Versions</h1>
                            <p>Manage versions for {app.name}</p>
                        </div>
                        <button className="btn btn-primary">
                            ⬆️ Upload New Version
                        </button>
                    </div>

                    {/* Versions Table */}
                    {versions.length > 0 ? (
                        <div className="admin-table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Version</th>
                                        <th>Platform</th>
                                        <th>File Size</th>
                                        <th>Min Requirements</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {versions.map((version) => (
                                        <tr key={version.id}>
                                            <td>
                                                <strong>{version.version}</strong>
                                                {version.changelog && (
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                                                        {version.changelog.slice(0, 50)}...
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    {version.platform === 'android' ? '📱' : '💻'}
                                                    {version.platform === 'android' ? 'Android APK' : 'Windows EXE'}
                                                </span>
                                            </td>
                                            <td>{formatFileSize(version.file_size)}</td>
                                            <td>{version.min_requirements || '-'}</td>
                                            <td>
                                                <span className={`status-badge ${version.is_active ? 'status-published' : 'status-draft'}`}>
                                                    {version.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button className="action-btn">Edit</button>
                                                    {version.file_url && (
                                                        <a
                                                            href={version.file_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="action-btn"
                                                        >
                                                            Download
                                                        </a>
                                                    )}
                                                    <button
                                                        className="action-btn"
                                                        style={{ color: version.is_active ? 'var(--color-warning)' : 'var(--color-success)' }}
                                                    >
                                                        {version.is_active ? 'Deactivate' : 'Activate'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl)', background: 'var(--color-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-lg)' }}>
                                No versions uploaded yet.
                            </p>
                            <button className="btn btn-primary">
                                ⬆️ Upload First Version
                            </button>
                        </div>
                    )}

                    {/* Upload Form */}
                    <div className="admin-section" style={{ marginTop: 'var(--spacing-2xl)' }}>
                        <h2>Upload New Version</h2>
                        <form className="admin-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="version">Version Number *</label>
                                    <input
                                        type="text"
                                        id="version"
                                        name="version"
                                        className="form-input"
                                        placeholder="e.g., 1.0.0"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="platform">Platform *</label>
                                    <select id="platform" name="platform" className="form-input" required>
                                        <option value="">Select platform</option>
                                        <option value="android">📱 Android APK</option>
                                        <option value="windows">💻 Windows EXE</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="file">File *</label>
                                <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    className="form-input"
                                    accept=".apk,.exe,.zip,.msi"
                                    required
                                />
                                <small style={{ color: 'var(--color-text-muted)', display: 'block', marginTop: '0.5rem' }}>
                                    Allowed: APK, EXE, ZIP, MSI (max 2GB)
                                </small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="min_requirements">Minimum Requirements</label>
                                <input
                                    type="text"
                                    id="min_requirements"
                                    name="min_requirements"
                                    className="form-input"
                                    placeholder="e.g., Android 8.0+ or Windows 10+"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="changelog">Changelog</label>
                                <textarea
                                    id="changelog"
                                    name="changelog"
                                    className="form-input"
                                    placeholder="What's new in this version..."
                                    rows={4}
                                />
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary">
                                    Upload Version
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
