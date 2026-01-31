import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'About AppHub',
    description: 'Learn about AppHub - Your trusted source for Android and Windows software.',
};

export default function AboutPage() {
    return (
        <div className="container">
            <article className="legal-page">
                <h1>About AppHub</h1>

                <p>
                    AppHub is your trusted destination for discovering and downloading high-quality
                    Android APK and Windows software. We curate a vast collection of applications
                    across various categories to meet all your software needs.
                </p>

                <h2>Our Mission</h2>
                <p>
                    We believe that everyone deserves access to safe, reliable software. Our mission
                    is to provide a premium platform where users can find verified applications
                    without the hassle of navigating through suspicious download sites.
                </p>

                <h2>What We Offer</h2>
                <ul>
                    <li><strong>Curated Selection:</strong> Hand-picked apps across productivity, games, tools, and more</li>
                    <li><strong>Safe Downloads:</strong> All files are scanned and verified for safety</li>
                    <li><strong>Multi-Platform:</strong> Software for Android and Windows in one place</li>
                    <li><strong>Detailed Information:</strong> Comprehensive app details, screenshots, and system requirements</li>
                    <li><strong>Fast Downloads:</strong> High-speed servers for quick, reliable downloads</li>
                </ul>

                <h2>Our Commitment</h2>
                <p>
                    We are committed to:
                </p>
                <ul>
                    <li>Maintaining a safe and malware-free platform</li>
                    <li>Respecting intellectual property rights</li>
                    <li>Providing accurate app information</li>
                    <li>Continuously improving user experience</li>
                    <li>Supporting developers in reaching their audience</li>
                </ul>

                <h2>Get in Touch</h2>
                <p>
                    Have questions or suggestions? We&apos;d love to hear from you!
                    Visit our <Link href="/contact">Contact Page</Link> to get in touch with our team.
                </p>
            </article>
        </div>
    );
}
