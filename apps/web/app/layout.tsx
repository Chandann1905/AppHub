import type { Metadata, Viewport } from 'next';
import { generateWebsiteSchema, generateOrganizationSchema } from '@/lib/structured-data';
import './globals.css';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false, // iOS native feel
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
        { media: '(prefers-color-scheme: dark)', color: '#000000' },
    ],
};

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
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'AppHub',
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
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
