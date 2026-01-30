import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedApps, getCategories } from '@apphub/db';
import { AppGrid, AdSlot } from '../../../components';

interface PageProps {
    params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const categories = await getCategories();
    const category = categories.find(c => c.slug === params.slug);

    if (!category) {
        return { title: 'Category Not Found' };
    }

    return {
        title: `${category.name} - Download Apps`,
        description: category.description || `Download ${category.name} apps and software from AppHub.`,
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const [allApps, categories] = await Promise.all([
        getPublishedApps({ limit: 20 }),
        getCategories(),
    ]);

    const category = categories.find(c => c.slug === params.slug);

    // Filter apps by category (mock filtering since real filtering happens in DB)
    const apps = allApps.filter(app =>
        app.category?.slug === params.slug || !category
    );

    if (!category) {
        return (
            <div className="container">
                <div className="page-header">
                    <h1 className="page-title">Category Not Found</h1>
                    <p className="page-description">
                        The category you&apos;re looking for doesn&apos;t exist.
                    </p>
                </div>
                <Link href="/apps" className="btn btn-primary">
                    Browse All Apps
                </Link>
            </div>
        );
    }

    return (
        <div className="container">
            {/* Breadcrumb */}
            <nav className="breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/apps">Apps</Link>
                <span>/</span>
                <span>{category.name}</span>
            </nav>

            {/* Page Header */}
            <div className="page-header">
                <h1 className="page-title">{category.icon} {category.name}</h1>
                <p className="page-description">
                    {category.description || `Browse ${category.name} apps and software`}
                </p>
            </div>

            {/* Top Ad */}
            <AdSlot size="leaderboard" />

            {/* Category Links */}
            <div className="filters">
                <Link
                    href="/apps"
                    className="btn btn-secondary"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                >
                    All Apps
                </Link>
                {categories.map((cat) => (
                    <Link
                        key={cat.id}
                        href={`/category/${cat.slug}`}
                        className={`btn ${cat.slug === params.slug ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                    >
                        {cat.icon} {cat.name}
                    </Link>
                ))}
            </div>

            {/* Apps Grid */}
            <AppGrid
                apps={apps}
                emptyMessage={`No ${category.name} apps available yet.`}
            />

            {/* Bottom Ad */}
            <AdSlot size="rectangle" />
        </div>
    );
}
