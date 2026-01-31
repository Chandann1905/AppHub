import type { Metadata } from 'next';
import { getPublishedApps } from '@apphub/db';
import { AppGrid, AdSlot } from '@/components';

export const metadata: Metadata = {
    title: 'Search Apps',
    description: 'Search for Android and Windows apps on AppHub.',
};

interface PageProps {
    searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: PageProps) {
    const query = searchParams.q || '';

    // Get all apps and filter by search query (mock search)
    const allApps = await getPublishedApps({ limit: 50 });

    const searchResults = query
        ? allApps.filter(app =>
            app.name.toLowerCase().includes(query.toLowerCase()) ||
            (app.short_description?.toLowerCase().includes(query.toLowerCase()))
        )
        : [];

    return (
        <div className="container">
            {/* Search Header */}
            <section className="search-hero">
                <h1 className="hero-title" style={{ fontSize: '2rem' }}>🔍 Search Apps</h1>

                <form action="/search" method="GET" className="search-form">
                    <input
                        type="text"
                        name="q"
                        defaultValue={query}
                        placeholder="Search for apps..."
                        className="search-input"
                        autoFocus
                    />
                    <button type="submit" className="btn btn-primary">
                        Search
                    </button>
                </form>
            </section>

            {/* Ad Slot */}
            <AdSlot size="leaderboard" />

            {/* Search Results */}
            {query ? (
                <>
                    <div className="page-header">
                        <h2 className="page-title">
                            Results for &quot;{query}&quot;
                        </h2>
                        <p className="page-description">
                            Found {searchResults.length} app{searchResults.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    <AppGrid
                        apps={searchResults}
                        emptyMessage={`No apps found matching "${query}". Try different keywords.`}
                    />
                </>
            ) : (
                <div className="page-header" style={{ textAlign: 'center', padding: 'var(--spacing-3xl) 0' }}>
                    <p className="page-description">
                        Enter a search term to find apps
                    </p>
                </div>
            )}

            {/* Bottom Ad */}
            <AdSlot size="rectangle" />
        </div>
    );
}
