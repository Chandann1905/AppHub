import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'AppHub Terms of Service - Terms and conditions for using our platform.',
};

export default function TermsPage() {
    return (
        <div className="container">
            <article className="legal-page">
                <h1>Terms of Service</h1>
                <p><em>Last updated: January 2026</em></p>

                <p>
                    Welcome to AppHub. By accessing or using our website, you agree to be bound by these
                    Terms of Service (&quot;Terms&quot;). Please read them carefully.
                </p>

                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing and using AppHub, you accept and agree to be bound by these Terms.
                    If you do not agree to these Terms, you should not use our services.
                </p>

                <h2>2. Use of Service</h2>
                <p>You agree to use AppHub only for lawful purposes and in accordance with these Terms:</p>
                <ul>
                    <li>You will not use our service for any illegal or unauthorized purpose</li>
                    <li>You will not attempt to interfere with the proper functioning of the service</li>
                    <li>You will not upload or distribute malicious software</li>
                    <li>You will not violate any applicable laws or regulations</li>
                </ul>

                <h2>3. Intellectual Property</h2>
                <p>
                    All content on AppHub, including text, graphics, logos, and software, is the property
                    of AppHub or its content suppliers and is protected by intellectual property laws.
                </p>

                <h2>4. Software Downloads</h2>
                <p>
                    Software available for download on AppHub is provided &quot;as is&quot; without warranty of any kind.
                    We recommend scanning all downloaded files with antivirus software before installation.
                </p>
                <ul>
                    <li>We do not guarantee that software is free from errors or viruses</li>
                    <li>You download and install software at your own risk</li>
                    <li>We are not responsible for any damage caused by downloaded software</li>
                </ul>

                <h2>5. User Content</h2>
                <p>
                    If you submit content to AppHub, you grant us a non-exclusive, worldwide, royalty-free
                    license to use, reproduce, and distribute that content.
                </p>

                <h2>6. Disclaimer of Warranties</h2>
                <p>
                    AppHub is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make no warranties,
                    expressed or implied, regarding the operation or availability of our service.
                </p>

                <h2>7. Limitation of Liability</h2>
                <p>
                    In no event shall AppHub be liable for any indirect, incidental, special, or consequential
                    damages arising out of or in connection with your use of the service.
                </p>

                <h2>8. Changes to Terms</h2>
                <p>
                    We reserve the right to modify these Terms at any time. We will notify users of any
                    material changes by posting the new Terms on this page.
                </p>

                <h2>9. Contact</h2>
                <p>
                    If you have questions about these Terms, please contact us through our
                    <a href="/contact"> Contact Page</a>.
                </p>
            </article>
        </div>
    );
}
