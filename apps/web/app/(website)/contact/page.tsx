import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Contact AppHub - Get in touch with our team.',
};

export default function ContactPage() {
    return (
        <div className="container">
            <article className="legal-page">
                <h1>Contact Us</h1>

                <p>
                    Have questions, feedback, or need support? We&apos;re here to help!
                    Please use the appropriate channel below to reach us.
                </p>

                <h2>General Inquiries</h2>
                <p>
                    For general questions about AppHub, our services, or partnership opportunities:
                </p>
                <p>
                    <strong>Email:</strong> contact@apphub.example.com
                </p>

                <h2>Technical Support</h2>
                <p>
                    Experiencing technical issues with downloads or the website? Let us know:
                </p>
                <p>
                    <strong>Email:</strong> support@apphub.example.com
                </p>

                <h2>DMCA / Copyright</h2>
                <p>
                    To report copyright infringement or intellectual property concerns:
                </p>
                <p>
                    <strong>Email:</strong> dmca@apphub.example.com
                </p>
                <p>
                    Please include all required information as outlined in our
                    <a href="/dmca"> DMCA Policy</a>.
                </p>

                <h2>App Submission</h2>
                <p>
                    Interested in having your app listed on AppHub? Contact us:
                </p>
                <p>
                    <strong>Email:</strong> submissions@apphub.example.com
                </p>

                <h2>Response Time</h2>
                <p>
                    We aim to respond to all inquiries within 24-48 business hours.
                    DMCA notices and urgent security concerns are prioritized.
                </p>
            </article>
        </div>
    );
}
