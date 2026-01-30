import type { Metadata } from 'next';
import { Header, Footer } from '../components';
import { generateWebsiteSchema, generateOrganizationSchema } from '../lib/structured-data';
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
    verification: {
        google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const websiteSchema = generateWebsiteSchema();
    const organizationSchema = generateOrganizationSchema();

    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(websiteSchema),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(organizationSchema),
                    }}
                />
            </head>
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
