import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'DMCA / Copyright Policy',
    description: 'AppHub DMCA and Copyright Policy - How to report copyright infringement.',
};

export default function DMCAPage() {
    return (
        <div className="container">
            <article className="legal-page">
                <h1>DMCA / Copyright Policy</h1>
                <p><em>Last updated: January 2026</em></p>

                <p>
                    AppHub respects the intellectual property rights of others and expects users of our
                    services to do the same. We will respond to notices of alleged copyright infringement
                    that comply with the Digital Millennium Copyright Act (DMCA).
                </p>

                <h2>Reporting Copyright Infringement</h2>
                <p>
                    If you believe that your copyrighted work has been copied in a way that constitutes
                    copyright infringement, please provide our DMCA Agent with the following information:
                </p>
                <ol>
                    <li>A physical or electronic signature of the copyright owner or authorized representative</li>
                    <li>Identification of the copyrighted work claimed to have been infringed</li>
                    <li>Identification of the material that is claimed to be infringing, with enough detail
                        for us to locate it on our service</li>
                    <li>Your contact information (address, telephone number, and email address)</li>
                    <li>A statement that you have a good faith belief that the use is not authorized by
                        the copyright owner, its agent, or the law</li>
                    <li>A statement, under penalty of perjury, that the information in the notification
                        is accurate and that you are authorized to act on behalf of the copyright owner</li>
                </ol>

                <h2>Counter-Notification</h2>
                <p>
                    If you believe that your content was wrongly removed due to a mistake or misidentification,
                    you may submit a counter-notification with the following information:
                </p>
                <ol>
                    <li>Your physical or electronic signature</li>
                    <li>Identification of the material that was removed and its previous location</li>
                    <li>A statement under penalty of perjury that you have a good faith belief that the
                        material was removed by mistake or misidentification</li>
                    <li>Your name, address, and telephone number</li>
                    <li>A statement consenting to jurisdiction of federal court in your district</li>
                </ol>

                <h2>Repeat Infringers</h2>
                <p>
                    AppHub will terminate the accounts of repeat infringers in accordance with our policies
                    and applicable law.
                </p>

                <h2>Contact</h2>
                <p>
                    To report copyright infringement, please contact us through our
                    <a href="/contact"> Contact Page</a> with the subject line &quot;DMCA Notice&quot;.
                </p>
            </article>
        </div>
    );
}
