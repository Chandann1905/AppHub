import { AppCard } from './AppCard';
import type { AppCardData } from '@apphub/db';

interface AppGridProps {
    apps: AppCardData[];
    title?: string;
    emptyMessage?: string;
}

export function AppGrid({ apps, title, emptyMessage = 'No apps found' }: AppGridProps) {
    return (
        <section className="app-grid-section">
            {title && <h2 className="section-title">{title}</h2>}

            {apps.length === 0 ? (
                <div className="empty-state">
                    <p>{emptyMessage}</p>
                </div>
            ) : (
                <div className="app-grid">
                    {apps.map((app) => (
                        <AppCard key={app.id} app={app} />
                    ))}
                </div>
            )}
        </section>
    );
}
