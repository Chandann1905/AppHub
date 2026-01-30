import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategories } from '@apphub/db';

export const metadata: Metadata = {
    title: 'Add New App - AppHub Admin',
    description: 'Add a new app to AppHub',
};

export default async function NewAppPage() {
    const categories = await getCategories();

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
                <div className="admin-container" style={{ maxWidth: '800px' }}>
                    {/* Breadcrumb */}
                    <nav className="breadcrumb">
                        <Link href="/admin/dashboard">Dashboard</Link>
                        <span>/</span>
                        <Link href="/admin/apps">Apps</Link>
                        <span>/</span>
                        <span>New App</span>
                    </nav>

                    {/* Page Header */}
                    <div className="admin-page-header">
                        <h1>➕ Add New App</h1>
                        <p>Fill in the details below to create a new app listing</p>
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
                                    placeholder="e.g., SuperApp Pro"
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
                                    placeholder="e.g., superapp-pro"
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
                                placeholder="Brief description for app cards (max 150 chars)"
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
                                placeholder="Detailed description of the app, features, and benefits..."
                                rows={8}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="category_id">Category *</label>
                                <select id="category_id" name="category_id" className="form-input" required>
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
                                    placeholder="e.g., AppHub Studios"
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
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="tags">Tags (comma-separated)</label>
                                <input
                                    type="text"
                                    id="tags"
                                    name="tags"
                                    className="form-input"
                                    placeholder="e.g., productivity, tools, office"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="icon">App Icon</label>
                            <input
                                type="file"
                                id="icon"
                                name="icon"
                                className="form-input"
                                accept="image/png,image/jpeg,image/webp"
                            />
                            <small style={{ color: 'var(--color-text-muted)', display: 'block', marginTop: '0.5rem' }}>
                                Recommended: 512x512 PNG or JPEG
                            </small>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>
                                    <input type="checkbox" name="featured" style={{ marginRight: '0.5rem' }} />
                                    Featured App
                                </label>
                                <small style={{ color: 'var(--color-text-muted)', display: 'block' }}>
                                    Show on homepage featured section
                                </small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <select id="status" name="status" className="form-input">
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">
                                Create App
                            </button>
                            <Link href="/admin/apps" className="btn btn-secondary">
                                Cancel
                            </Link>
                        </div>

                        <div style={{ marginTop: 'var(--spacing-lg)', padding: 'var(--spacing-md)', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                                <strong>Note:</strong> This form requires Supabase to be configured for data persistence.
                                Currently running in demo mode - submissions will not be saved.
                            </p>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
