import type { Metadata } from 'next';
import { Header, Footer } from '../components';
import './globals.css';

export const metadata: Metadata = {
    title: {
        default: 'AppHub - Download Android & Windows Apps',
        template: '%s | AppHub',
    },
    description: 'Your trusted source for Android APK and Windows software. Download safe, verified applications from AppHub.',
    keywords: ['apps', 'download', 'android', 'windows', 'apk', 'exe', 'software', 'free'],
    authors: [{ name: 'AppHub' }],
    openGraph: {
        type: 'website',
        locale: 'en_US',
        siteName: 'AppHub',
    },
    twitter: {
        card: 'summary_large_image',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <div className="page-wrapper">
                    <Header />
                    <main className="main-content">
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
