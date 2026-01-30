import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAppBySlug, getCategories } from '@apphub/db';

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const app = await getAppBySlug(params.slug);
    return {
        title: app ? `Edit ${app.name} - AppHub Admin` : 'App Not Found',
    };
}

export default async function EditAppPage({
    params,
}: {
    params: { slug: string };
}) {
    const [app, categories] = await Promise.all([
        getAppBySlug(params.slug),
        getCategories(),
    ]);

    if (!app) {
        notFound();
    }

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
                    <Link href={`/apps/${app.slug}`} target="_blank" className="btn btn-secondary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
                        View Live
                    </Link>
                </div>
            </header>

            <main className="admin-main">
                <div className="admin-container" style={{ maxWidth: '800px' }}>
                    {/* Breadcrumb */}
                    <nav className="breadcrumb">
                        <Link href="/admin/dashboard">Dashboard</Link>
                        <span>/</span>
                        <Link href="/admin/apps">Apps</Link>
                        <span>/</span>
                        <span>{app.name}</span>
                    </nav>

                    {/* Page Header */}
                    <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1>✏️ Edit App</h1>
                            <p>Update details for {app.name}</p>
                        </div>
                        <Link href={`/admin/apps/${app.slug}/versions`} className="btn btn-secondary">
                            📦 Manage Versions
                        </Link>
                    </div>

                    {/* App Form */}
                    <form className="admin-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">App Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-input"
                                    defaultValue={app.name}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="slug">URL Slug *</label>
                                <input
                                    type="text"
                                    id="slug"
                                    name="slug"
                                    className="form-input"
                                    defaultValue={app.slug}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="short_description">Short Description *</label>
                            <input
                                type="text"
                                id="short_description"
                                name="short_description"
                                className="form-input"
                                defaultValue={app.short_description || ''}
                                maxLength={150}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Full Description *</label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-input"
                                defaultValue={app.description || ''}
                                rows={8}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="category_id">Category *</label>
                                <select
                                    id="category_id"
                                    name="category_id"
                                    className="form-input"
                                    defaultValue={app.category_id || ''}
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.icon} {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="developer">Developer Name</label>
                                <input
                                    type="text"
                                    id="developer"
                                    name="developer"
                                    className="form-input"
                                    defaultValue={app.developer || ''}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="website">Developer Website</label>
                                <input
                                    type="url"
                                    id="website"
                                    name="website"
                                    className="form-input"
                                    defaultValue={app.website || ''}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="tags">Tags (comma-separated)</label>
                                <input
                                    type="text"
                                    id="tags"
                                    name="tags"
                                    className="form-input"
                                    defaultValue={app.tags?.join(', ') || ''}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>App Icon</label>
                            {app.icon_url && (
                                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                    <img
                                        src={app.icon_url}
                                        alt={app.name}
                                        style={{ width: 64, height: 64, borderRadius: 'var(--radius-md)', background: 'var(--color-bg-tertiary)' }}
                                    />
                                </div>
                            )}
                            <input
                                type="file"
                                id="icon"
                                name="icon"
                                className="form-input"
                                accept="image/png,image/jpeg,image/webp"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        defaultChecked={app.featured}
                                        style={{ marginRight: '0.5rem' }}
                                    />
                                    Featured App
                                </label>
                            </div>

                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    className="form-input"
                                    defaultValue={app.status}
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">
                                Save Changes
                            </button>
                            <Link href="/admin/apps" className="btn btn-secondary">
                                Cancel
                            </Link>
                            <button type="button" className="btn" style={{ marginLeft: 'auto', color: 'var(--color-error)', background: 'rgba(239, 68, 68, 0.1)' }}>
                                🗑️ Delete App
                            </button>
                        </div>

                        <div style={{ marginTop: 'var(--spacing-lg)', padding: 'var(--spacing-md)', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                                <strong>Stats:</strong> {app.downloads_count.toLocaleString()} downloads
                            </p>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
