import Link from 'next/link';

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    <div className="footer-section">
                        <h3 className="footer-title">AppHub</h3>
                        <p className="footer-text">
                            Your trusted source for Android and Windows software.
                            Download safe, verified applications.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-subtitle">Categories</h4>
                        <ul className="footer-links">
                            <li><Link href="/category/android">Android Apps</Link></li>
                            <li><Link href="/category/windows">Windows Software</Link></li>
                            <li><Link href="/category/games">Games</Link></li>
                            <li><Link href="/category/tools">Tools</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-subtitle">Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link href="/apps">All Apps</Link></li>
                            <li><Link href="/search">Search</Link></li>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-subtitle">Legal</h4>
                        <ul className="footer-links">
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                            <li><Link href="/terms">Terms of Service</Link></li>
                            <li><Link href="/dmca">DMCA / Copyright</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} AppHub. All rights reserved.</p>
                    <p className="footer-disclaimer">
                        All software distributed here is owned and published by AppHub.
                    </p>
                </div>
            </div>
        </footer>
    );
}
