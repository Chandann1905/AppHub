import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategories, getPublishedApps } from '@apphub/db';

export const metadata: Metadata = {
    title: 'Categories - AppHub Admin',
    description: 'Manage categories',
};

export default async function CategoriesPage() {
    const [categories, apps] = await Promise.all([
        getCategories(),
        getPublishedApps({ limit: 100 }),
    ]);

    // Count apps per category
    const appCountByCategory = apps.reduce((acc, app) => {
        const catId = app.category_id || 'uncategorized';
        acc[catId] = (acc[catId] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

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
                    <Link href="/admin/categories" className="admin-nav-link active">Categories</Link>
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
                            <h1>📂 Categories</h1>
                            <p>Manage app categories</p>
                        </div>
                        <button className="btn btn-primary">
                            ➕ Add Category
                        </button>
                    </div>

                    {/* Categories Table */}
                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Icon</th>
                                    <th>Name</th>
                                    <th>Slug</th>
                                    <th>Apps</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category.id}>
                                        <td style={{ fontSize: '1.5rem' }}>{category.icon}</td>
                                        <td>
                                            <strong>{category.name}</strong>
                                            {category.description && (
                                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                                                    {category.description}
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <code style={{ background: 'var(--color-bg-tertiary)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem' }}>
                                                /category/{category.slug}
                                            </code>
                                        </td>
                                        <td>{appCountByCategory[category.id] || 0} apps</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="action-btn">Edit</button>
                                                <Link
                                                    href={`/category/${category.slug}`}
                                                    target="_blank"
                                                    className="action-btn"
                                                >
                                                    View
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Add Category Form */}
                    <div className="admin-section" style={{ marginTop: 'var(--spacing-2xl)' }}>
                        <h2>Add New Category</h2>
                        <form className="admin-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Category Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-input"
                                        placeholder="e.g., Photography"
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
                                        placeholder="e.g., photography"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="icon">Icon (emoji)</label>
                                    <input
                                        type="text"
                                        id="icon"
                                        name="icon"
                                        className="form-input"
                                        placeholder="e.g., 📷"
                                        maxLength={4}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input
                                        type="text"
                                        id="description"
                                        name="description"
                                        className="form-input"
                                        placeholder="Brief description of the category"
                                    />
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary">
                                    Add Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
