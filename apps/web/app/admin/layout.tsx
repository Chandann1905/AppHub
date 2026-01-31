import Link from 'next/link';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="ios-page bg-[var(--system-grouped-background)]">
            {/* Admin Navigation Bar */}
            <div className="ios-navbar">
                <div className="flex-1">
                    <Link href="/admin/dashboard" className="text-[var(--ios-blue)] font-semibold text-[17px]">
                        Admin
                    </Link>
                </div>
                <div className="ios-navbar-title font-semibold">Panel</div>
                <div className="flex-1 flex justify-end">
                    <Link href="/admin/profile" className="text-[var(--ios-blue)] text-[17px]">
                        Account
                    </Link>
                </div>
            </div>

            {/* Main Content (Scrollable) */}
            <main className="ios-container pt-4">
                {children}
            </main>
        </div>
    );
}
