import { NavigationBar, Footer, BottomTabBar } from '@/components';

export default function WebsiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="ios-page">
            <NavigationBar />

            {/* Scrollable Content Area */}
            <main className="ios-container pt-4 md:pt-8">
                {children}
                <Footer />
            </main>

            <BottomTabBar />
        </div>
    );
}
