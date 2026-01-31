import { AppCard } from './AppCard';
import { AppCardData } from '@apphub/db';

interface AppGridProps {
    apps: AppCardData[];
    title?: string;
    emptyMessage?: string;
    layout?: 'list' | 'grid';
    featured?: boolean;
}

export function AppGrid({
    apps,
    title,
    emptyMessage = 'No apps found',
    layout = 'list',
    featured = false
}: AppGridProps) {
    return (
        <section className="mb-8">
            {title && (
                <h2 className="px-4 mb-2 text-[22px] font-bold tracking-tight text-[var(--label-primary)]">
                    {title}
                </h2>
            )}

            {apps.length === 0 ? (
                <div className="text-center py-12 text-[var(--label-secondary)]">
                    <p>{emptyMessage}</p>
                </div>
            ) : (
                <div className={layout === 'grid' ? 'ios-grid' : 'flex flex-col'}>
                    {apps.map((app) => (
                        <div key={app.id} className={layout === 'list' ? 'px-0' : ''}>
                            <AppCard app={app} featured={featured} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
