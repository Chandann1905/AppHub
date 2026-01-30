import Link from 'next/link';

export function Header() {
    return (
        <header className="header">
            <div className="header-container">
                <Link href="/" className="logo">
                    <span className="logo-icon">📦</span>
                    <span className="logo-text">AppHub</span>
                </Link>

                <nav className="nav">
                    <Link href="/apps" className="nav-link">Apps</Link>
                    <Link href="/category/android" className="nav-link">Android</Link>
                    <Link href="/category/windows" className="nav-link">Windows</Link>
                    <Link href="/category/games" className="nav-link">Games</Link>
                </nav>

                <div className="header-actions">
                    <Link href="/search" className="search-btn" aria-label="Search">
                        🔍
                    </Link>
                </div>
            </div>
        </header>
    );
}
