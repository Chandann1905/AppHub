import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAppBySlug, getRelatedApps } from '@apphub/db';
import { AdSlot, AppGrid } from '../../../components';

interface PageProps {
    params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const app = await getAppBySlug(params.slug);

    if (!app) {
        return {
            title: 'App Not Found',
        };
    }

    return {
        title: `${app.name} - Free Download`,
        description: app.short_description || app.description.slice(0, 160),
        keywords: app.tags?.join(', ') || '',
        openGraph: {
            title: app.name,
            description: app.short_description || app.description.slice(0, 160),
            type: 'website',
            images: app.icon_url ? [{ url: app.icon_url }] : [],
        },
    };
}

function formatFileSize(bytes: number): string {
    if (bytes >= 1000000000) {
        return `${(bytes / 1000000000).toFixed(2)} GB`;
    }
    if (bytes >= 1000000) {
        return `${(bytes / 1000000).toFixed(1)} MB`;
    }
    if (bytes >= 1000) {
        return `${(bytes / 1000).toFixed(0)} KB`;
    }
    return `${bytes} bytes`;
}

function formatDownloads(count: number): string {
    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
        return `${Math.floor(count / 1000)}K`;
    }
    return count.toString();
}

function getPlatformName(platform: string): string {
    switch (platform) {
        case 'android':
            return 'Android APK';
        case 'windows':
            return 'Windows EXE';
        case 'zip':
            return 'ZIP Archive';
        default:
            return platform;
    }
}

function getPlatformIcon(platform: string): string {
    switch (platform) {
        case 'android':
            return '📱';
        case 'windows':
            return '💻';
        case 'zip':
            return '📦';
        default:
            return '📄';
    }
}

export default async function AppDetailPage({ params }: PageProps) {
    const app = await getAppBySlug(params.slug);

    if (!app) {
        notFound();
    }

    const relatedApps = await getRelatedApps(app.id, app.category_id, 4);
    const activeVersions = app.versions?.filter(v => v.is_active) || [];

    return (
        <div className="container">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/apps">Apps</Link>
                {app.category && (
                    <>
                        <span>/</span>
                        <Link href={`/category/${app.category.slug}`}>{app.category.name}</Link>
                    </>
                )}
                <span>/</span>
                <span>{app.name}</span>
            </nav>

            {/* Top Ad */}
            <AdSlot size="leaderboard" />

            {/* App Header */}
            <div className="app-detail-header">
                <div className="app-detail-icon">
                    {app.icon_url ? (
                        <img src={app.icon_url} alt={app.name} />
                    ) : (
                        <div className="app-icon-placeholder">
                            {app.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                <div className="app-detail-info">
                    <h1 className="app-detail-title">{app.name}</h1>

                    {app.category && (
                        <Link href={`/category/${app.category.slug}`} className="app-detail-category">
                            {app.category.icon} {app.category.name}
                        </Link>
                    )}

                    <p className="app-detail-short-desc">{app.short_description}</p>

                    <div className="app-detail-stats">
                        <div className="stat">
                            <span className="stat-value">{formatDownloads(app.downloads_count)}</span>
                            <span className="stat-label">Downloads</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">{activeVersions[0]?.version || 'N/A'}</span>
                            <span className="stat-label">Version</span>
                        </div>
                        <div className="stat">
                            <span className="stat-value">{activeVersions.length}</span>
                            <span className="stat-label">Platforms</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Download Section */}
            <section className="download-section">
                <h2 className="section-title">⬇️ Download</h2>
                <div className="download-buttons">
                    {activeVersions.map((version) => (
                        <a
                            key={version.id}
                            href={version.file_url}
                            className="btn btn-download"
                            download
                        >
                            <span className="download-icon">{getPlatformIcon(version.platform)}</span>
                            <span className="download-info">
                                <span className="download-platform">{getPlatformName(version.platform)}</span>
                                <span className="download-meta">
                                    v{version.version} • {version.file_size ? formatFileSize(version.file_size) : 'Unknown size'}
                                </span>
                            </span>
                        </a>
                    ))}

                    {activeVersions.length === 0 && (
                        <p style={{ color: 'var(--color-text-muted)' }}>
                            No downloads available at this time.
                        </p>
                    )}
                </div>
            </section>

            {/* Mid-page Ad */}
            <AdSlot size="rectangle" />

            {/* Screenshots */}
            {app.screenshots && app.screenshots.length > 0 && (
                <section className="screenshots-section">
                    <h2 className="section-title">📸 Screenshots</h2>
                    <div className="screenshots-carousel">
                        {app.screenshots.map((screenshot, index) => (
                            <div key={screenshot.id} className="screenshot-item">
                                <img
                                    src={screenshot.url}
                                    alt={screenshot.alt || `${app.name} screenshot ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Description */}
            <section className="description-section">
                <h2 className="section-title">📝 Description</h2>
                <div className="app-description">
                    {app.description.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            </section>

            {/* Ad Slot */}
            <AdSlot size="banner" />

            {/* System Requirements */}
            {activeVersions.some(v => v.system_requirements) && (
                <section className="requirements-section">
                    <h2 className="section-title">⚙️ System Requirements</h2>
                    <div className="requirements-grid">
                        {activeVersions.filter(v => v.system_requirements).map((version) => (
                            <div key={version.id} className="requirement-card">
                                <h3>{getPlatformIcon(version.platform)} {getPlatformName(version.platform)}</h3>
                                <p>{version.system_requirements}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* App Info */}
            <section className="app-info-section">
                <h2 className="section-title">ℹ️ App Info</h2>
                <dl className="app-info-list">
                    {app.developer && (
                        <>
                            <dt>Developer</dt>
                            <dd>{app.developer}</dd>
                        </>
                    )}
                    {app.website && (
                        <>
                            <dt>Website</dt>
                            <dd>
                                <a href={app.website} target="_blank" rel="noopener noreferrer">
                                    {app.website}
                                </a>
                            </dd>
                        </>
                    )}
                    {app.tags && app.tags.length > 0 && (
                        <>
                            <dt>Tags</dt>
                            <dd className="tags">
                                {app.tags.map((tag) => (
                                    <span key={tag} className="tag">{tag}</span>
                                ))}
                            </dd>
                        </>
                    )}
                    <dt>Last Updated</dt>
                    <dd>{new Date(app.updated_at).toLocaleDateString()}</dd>
                </dl>
            </section>

            {/* Bottom Ad */}
            <AdSlot size="leaderboard" />

            {/* Related Apps */}
            {relatedApps.length > 0 && (
                <AppGrid
                    apps={relatedApps}
                    title="🔗 Related Apps"
                />
            )}
        </div>
    );
}
