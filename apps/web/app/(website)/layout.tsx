import { NavigationBar, Footer, BottomTabBar } from '@/components';

export default function WebsiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="ios-page">
            <NavigationBar />
            <main className="ios-container pt-4 md:pt-8 min-h-[80vh]">
                {children}
            </main>
            <Footer />
            <BottomTabBar />
        </div>
    );
}
