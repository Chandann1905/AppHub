import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'AppHub Privacy Policy - Learn how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
    return (
        <div className="container">
            <article className="legal-page">
                <h1>Privacy Policy</h1>
                <p><em>Last updated: January 2026</em></p>

                <p>
                    AppHub (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                    when you visit our website.
                </p>

                <h2>Information We Collect</h2>
                <p>We may collect information about you in a variety of ways:</p>
                <ul>
                    <li><strong>Personal Data:</strong> Email address and other contact information you voluntarily provide.</li>
                    <li><strong>Usage Data:</strong> Information about how you use our website, including pages visited and download activity.</li>
                    <li><strong>Device Data:</strong> Information about your device, browser type, IP address, and operating system.</li>
                </ul>

                <h2>How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process and track downloads</li>
                    <li>Analyze usage patterns to enhance user experience</li>
                    <li>Display relevant advertisements</li>
                    <li>Respond to inquiries and support requests</li>
                </ul>

                <h2>Cookies and Tracking Technologies</h2>
                <p>
                    We use cookies and similar tracking technologies to track activity on our website and
                    store certain information. These are used for analytics and advertising purposes.
                </p>

                <h2>Third-Party Services</h2>
                <p>
                    We may use third-party services that collect, monitor, and analyze data, including:
                </p>
                <ul>
                    <li>Google Analytics for website analytics</li>
                    <li>Google AdSense for displaying advertisements</li>
                    <li>Cloud storage providers for file hosting</li>
                </ul>

                <h2>Data Security</h2>
                <p>
                    We implement appropriate security measures to protect your personal information.
                    However, no method of transmission over the internet is 100% secure.
                </p>

                <h2>Your Rights</h2>
                <p>
                    Depending on your location, you may have rights regarding your personal data, including:
                </p>
                <ul>
                    <li>The right to access your data</li>
                    <li>The right to request deletion of your data</li>
                    <li>The right to opt-out of certain data processing</li>
                </ul>

                <h2>Contact Us</h2>
                <p>
                    If you have questions about this Privacy Policy, please contact us through our
                    <a href="/contact"> Contact Page</a>.
                </p>
            </article>
        </div>
    );
}
