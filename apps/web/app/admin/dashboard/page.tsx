import Link from 'next/link';
import { getPublishedApps } from '@apphub/db';

export default async function AdminDashboardPage() {
    const apps = await getPublishedApps({ limit: 5 });

    return (
        <div>
            <div className="px-4 mb-6">
                <h1 className="text-[34px] font-bold text-[var(--label-primary)]">Dashboard</h1>
            </div>

            <div className="ios-card">
                <Link href="/admin/apps" className="ios-list-item justify-between active:bg-[var(--ios-gray6)]">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">📦</span>
                        <span className="text-[17px] font-medium">Manage Apps</span>
                    </div>
                    <span className="text-[var(--label-tertiary)] text-[17px]">›</span>
                </Link>
                <Link href="/admin/categories" className="ios-list-item justify-between active:bg-[var(--ios-gray6)]">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🏷️</span>
                        <span className="text-[17px] font-medium">Categories</span>
                    </div>
                    <span className="text-[var(--label-tertiary)] text-[17px]">›</span>
                </Link>
            </div>

            <h2 className="text-[13px] uppercase font-semibold text-[var(--label-secondary)] px-4 mb-2 mt-6">
                System
            </h2>
            <div className="ios-card">
                <Link href="/admin/analytics" className="ios-list-item justify-between active:bg-[var(--ios-gray6)]">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">📊</span>
                        <span className="text-[17px] font-medium">Analytics</span>
                    </div>
                    <span className="text-[var(--label-tertiary)] text-[17px]">›</span>
                </Link>
                <Link href="/admin/profile" className="ios-list-item justify-between active:bg-[var(--ios-gray6)]">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">👤</span>
                        <span className="text-[17px] font-medium">Account & Profile</span>
                    </div>
                    <span className="text-[var(--label-tertiary)] text-[17px]">›</span>
                </Link>
            </div>

            <h2 className="text-[13px] uppercase font-semibold text-[var(--label-secondary)] px-4 mb-2 mt-6">
                Quick Stats
            </h2>
            <div className="ios-card p-4 flex justify-between items-center">
                <div>
                    <div className="text-[13px] text-[var(--label-secondary)] uppercase">Total Apps</div>
                    <div className="text-[28px] font-bold">{apps.length}</div>
                </div>
                <div>
                    <div className="text-[13px] text-[var(--label-secondary)] uppercase">Downloads</div>
                    <div className="text-[28px] font-bold">12.5k</div>
                </div>
                <div className="w-10"></div>
            </div>
        </div>
    );
}
