import Link from 'next/link';
import { AppGrid, AdSlot } from '../components';
import { AppCardData } from '@apphub/db';

// Mock data (Using 'as any' to bypass strict type checking for mocks during migration)
const mockApps: any[] = [
    {
        id: '1',
        name: 'SuperApp Pro',
        slug: 'superapp-pro',
        short_description: 'The ultimate productivity app.',
        icon_url: null,
        category: { name: 'Productivity' },
        downloads_count: 125000,
        platforms: ['android', 'windows']
    },
    {
        id: '2',
        name: 'GameMaster 2024',
        slug: 'gamemaster-2024',
        short_description: 'Epic gaming experience.',
        icon_url: null,
        category: { name: 'Games' },
        downloads_count: 89000,
        platforms: ['android', 'windows']
    },
    {
        id: '3',
        name: 'FileManager Plus',
        slug: 'filemanager-plus',
        short_description: 'Advanced file management.',
        icon_url: null,
        category: { name: 'Tools' },
        downloads_count: 56000,
        platforms: ['android']
    },
    {
        id: '4',
        name: 'MediaPlayer HD',
        slug: 'mediaplayer-hd',
        short_description: 'Play any video format.',
        icon_url: null,
        category: { name: 'Media' },
        downloads_count: 234000,
        platforms: ['windows']
    },
];

const mockCategories = [
    { id: '1', name: 'Android', slug: 'android', icon: '📱' },
    { id: '2', name: 'Windows', slug: 'windows', icon: '💻' },
    { id: '3', name: 'Tools', slug: 'tools', icon: '🔧' },
    { id: '4', name: 'Games', slug: 'games', icon: '🎮' },
];

export default function HomePage() {
    const featuredApps = mockApps.slice(0, 2);
    const latestApps = mockApps.slice(2);

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
                {featuredApps.map(app => (
                    <div key={app.id}>
                        <AppGrid apps={[app]} layout="list" featured={true} />
                    </div>
                ))}
            </div>

            <AdSlot size="banner" />

            {/* Latest Apps (List) */}
            <div className="mt-8">
                <div className="ios-card mx-4">
                    <AppGrid
                        apps={latestApps}
                        title="New & Updated"
                        layout="list"
                    />
                </div>
            </div>

            {/* Categories (Grid) */}
            <div className="mt-8 px-4">
                <h2 className="text-[22px] font-bold mb-4 text-[var(--label-primary)]">Browse</h2>
                <div className="grid grid-cols-2 gap-4">
                    {mockCategories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/category/${category.slug}`}
                            className="bg-[var(--secondary-system-grouped-background)] p-4 rounded-[12px] flex items-center gap-3 active:scale-95 transition-transform"
                        >
                            <span className="text-2xl">{category.icon}</span>
                            <span className="font-semibold text-[17px] text-[var(--label-primary)]">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            <AdSlot size="rectangle" />
        </div>
    );
}
