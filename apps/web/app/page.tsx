import Link from 'next/link';
import { AppGrid, AdSlot } from '../components';
import { getPublishedApps, getCategories } from '@apphub/db';

const CATEGORY_ICONS: Record<string, string> = {
    'android': '📱',
    'windows': '💻',
    'tools': '🔧',
    'games': '🎮',
    'media': '🎬',
    'productivity': '📊',
    'security': '🛡️',
    'social': '💬'
};

export default async function HomePage() {
    const apps = await getPublishedApps({ limit: 12 });
    const categories = await getCategories();

    // Naive selection for featured (first 2)
    const featuredApps = apps.slice(0, 2);
    const latestApps = apps.slice(2);

    return (
        <div className="pb-20">
            {/* Large Title for 'Today' feel */}
            <div className="px-4 mb-4">
                <span className="block text-[13px] font-semibold text-[var(--label-secondary)] uppercase mb-1">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </span>
                <h1 className="text-[34px] font-bold text-[var(--label-primary)]">
                    Today
                </h1>
            </div>

            {/* Featured Section (Large Cards) */}
            <div className="px-4 mb-8">
                {featuredApps.length > 0 ? (
                    featuredApps.map(app => (
                        <div key={app.id}>
                            <AppGrid apps={[app]} layout="list" featured={true} />
                        </div>
                    ))
                ) : (
                    <div className="ios-card p-8 text-center text-[var(--label-secondary)]">
                        <p>No featured apps today.</p>
                    </div>
                )}
            </div>

            <AdSlot size="banner" />

            {/* Latest Apps (List) */}
            <div className="mt-8">
                <div className="ios-card mx-4">
                    <AppGrid
                        apps={latestApps}
                        title="New & Updated"
                        layout="list"
                        emptyMessage="No new apps available."
                    />
                </div>
            </div>

            {/* Categories (Grid) */}
            <div className="mt-8 px-4">
                <h2 className="text-[22px] font-bold mb-4 text-[var(--label-primary)]">Browse</h2>
                {categories.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/category/${category.slug}`}
                                className="bg-[var(--secondary-system-grouped-background)] p-4 rounded-[12px] flex items-center gap-3 active:scale-95 transition-transform shadow-sm"
                            >
                                <span className="text-2xl">
                                    {CATEGORY_ICONS[category.slug] || '📁'}
                                </span>
                                <span className="font-semibold text-[17px] text-[var(--label-primary)]">
                                    {category.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-4 text-[var(--label-secondary)]">
                        No categories found.
                    </div>
                )}
            </div>

            <AdSlot size="rectangle" />
        </div>
    );
}
