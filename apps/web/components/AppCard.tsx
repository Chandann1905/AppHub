import Link from 'next/link';
import type { AppCardData, Platform } from '@apphub/db';

interface AppCardProps {
    app: AppCardData;
}

function formatDownloads(count: number): string {
    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
        return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
}

function getPlatformIcon(platform: Platform): string {
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

export function AppCard({ app }: AppCardProps) {
    return (
        <Link href={`/apps/${app.slug}`} className="app-card">
            <div className="app-card-icon">
                {app.icon_url ? (
                    <img src={app.icon_url} alt={app.name} />
                ) : (
                    <div className="app-card-icon-placeholder">
                        {app.name.charAt(0).toUpperCase()}
                    </div>
                )}
            </div>

            <div className="app-card-content">
                <h3 className="app-card-title">{app.name}</h3>

                {app.category && (
                    <span className="app-card-category">{app.category.name}</span>
                )}

                {app.short_description && (
                    <p className="app-card-description">{app.short_description}</p>
                )}

                <div className="app-card-meta">
                    <span className="app-card-downloads">
                        ⬇️ {formatDownloads(app.downloads_count)}
                    </span>

                    <div className="app-card-platforms">
                        {app.platforms.map((platform) => (
                            <span key={platform} className="platform-icon" title={platform}>
                                {getPlatformIcon(platform)}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
}
