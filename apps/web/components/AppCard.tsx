import Link from 'next/link';
import { AppCardData } from '@apphub/db';

interface AppCardProps {
    app: AppCardData;
    featured?: boolean;
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

export function AppCard({ app, featured = false }: AppCardProps) {
    if (featured) {
        // Featured / Today Card Style
        return (
            <Link href={`/apps/${app.slug}`} className="block mb-6 relative group">
                <div className="ios-card overflow-hidden shadow-md transform transition-transform duration-200 active:scale-95">
                    <div className="relative h-64 w-full bg-gradient-to-br from-gray-800 to-black">
                        {app.icon_url ? (
                            <img
                                src={app.icon_url}
                                alt={app.name}
                                className="w-full h-full object-cover opacity-80"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[var(--ios-blue)]">
                                <span className="text-6xl">📦</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-5">
                            <span className="text-[13px] font-bold text-white/70 uppercase tracking-wide mb-1">
                                {app.category?.name || 'App'}
                            </span>
                            <h3 className="text-white text-[28px] font-bold leading-tight mb-2">
                                {app.name}
                            </h3>
                            <p className="text-white/90 text-[15px] line-clamp-2">
                                {app.short_description}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    // Standard List Row Style
    return (
        <Link href={`/apps/${app.slug}`} className="ios-list-item group no-underline">
            {/* App Icon (Squircle) */}
            <div className="w-[60px] h-[60px] flex-shrink-0 mr-4 ios-app-icon bg-[var(--secondary-system-background)]">
                {app.icon_url ? (
                    <img
                        src={app.icon_url}
                        alt={app.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[var(--ios-gray5)] text-2xl">
                        📦
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-4">
                <h3 className="text-[17px] font-semibold text-[var(--label-primary)] mb-0.5 truncate">
                    {app.name}
                </h3>
                <p className="text-[13px] text-[var(--label-secondary)] line-clamp-1 mb-1">
                    {app.short_description || app.category?.name}
                </p>
                {/* Rating Placeholder (Visual Only) */}
                <div className="flex items-center gap-1">
                    <span className="text-[10px] text-[var(--ios-gray)]">★★★★☆</span>
                    <span className="text-[10px] text-[var(--label-tertiary)] ml-1">
                        {app.downloads_count > 0 ? `${formatDownloads(app.downloads_count)} get` : 'New'}
                    </span>
                </div>
            </div>

            {/* GET Button */}
            <div className="flex-shrink-0">
                <button className="ios-btn-get">
                    Get
                </button>
            </div>
        </Link>
    );
}
