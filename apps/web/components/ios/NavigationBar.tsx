'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationBarProps {
    title?: string;
    largeTitle?: boolean;
    backUrl?: string;
    rightAction?: React.ReactNode;
}

export function NavigationBar({ title = 'AppHub', largeTitle = false, backUrl, rightAction }: NavigationBarProps) {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Don't show nav bar on admin routes as they have their own layout (usually) -> Actually let's keep it consistent
    // But maybe we want a different style for admin. For now, we use standard style.

    return (
        <nav className={`ios-navbar ${largeTitle && !scrolled ? 'large' : ''} ${scrolled ? 'scrolled' : ''}`}>
            {/* Left: Back Button or Logo */}
            <div className="flex-1 min-w-[60px]">
                {backUrl ? (
                    <Link href={backUrl} className="flex items-center text-[var(--ios-blue)] text-[17px]">
                        <svg width="12" height="20" viewBox="0 0 12 20" fill="none" className="mr-1">
                            <path d="M10 2L2 10L10 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back
                    </Link>
                ) : (
                    pathname === '/' ? null : (
                        <Link href="/" className="text-[var(--ios-blue)] text-[17px] font-medium">
                            Home
                        </Link>
                    )
                )}
            </div>

            {/* Center: Title (Opacity handled by CSS for large title) */}
            <div className="ios-navbar-title absolute left-0 right-0 text-center pointer-events-none">
                {title}
            </div>

            {/* Right: Actions */}
            <div className="flex-1 flex justify-end min-w-[60px]">
                {rightAction || (
                    <Link href="/search" className="text-[var(--ios-blue)]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </Link>
                )}
            </div>

            {/* Large Title Placeholder in Flow (Only visible when largeTitle is prop and at top) */}
            {largeTitle && (
                <div className={`absolute bottom-2 left-4 transition-opacity duration-200 ${scrolled ? 'opacity-0' : 'opacity-100'}`}>
                    <h1 className="text-[34px] font-bold leading-tight tracking-tight text-[var(--label-primary)]">
                        {title}
                    </h1>
                </div>
            )}
        </nav>
    );
}
