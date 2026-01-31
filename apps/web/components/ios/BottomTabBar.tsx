'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function BottomTabBar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname?.startsWith(path)) return true;
        return false;
    };

    return (
        <div className="ios-tabbar">
            <TabItem
                href="/"
                label="Today"
                icon={<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>}
                activeIcon={<path fill="currentColor" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>}
                active={isActive('/')}
            />
            <TabItem
                href="/category/games"
                label="Games"
                icon={<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>}
                activeIcon={<path fill="currentColor" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>}
                active={isActive('/category/games')}
            />
            <TabItem
                href="/apps"
                label="Apps"
                icon={
                    <>
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                    </>
                }
                activeIcon={
                    <>
                        <rect fill="currentColor" x="3" y="3" width="7" height="7"></rect>
                        <rect fill="currentColor" x="14" y="3" width="7" height="7"></rect>
                        <rect fill="currentColor" x="14" y="14" width="7" height="7"></rect>
                        <rect fill="currentColor" x="3" y="14" width="7" height="7"></rect>
                    </>
                }
                active={isActive('/apps')}
            />
            <TabItem
                href="/category/windows"
                label="Windows"
                icon={<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>}
                activeIcon={<path fill="currentColor" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>}
                active={isActive('/category/windows')}
            />
            <TabItem
                href="/search"
                label="Search"
                icon={
                    <>
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </>
                }
                activeIcon={
                    <>
                        <circle fill="currentColor" cx="11" cy="11" r="8"></circle>
                        <line stroke="currentColor" strokeWidth="4" x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </>
                }
                active={isActive('/search')}
            />
        </div>
    );
}

function TabItem({ href, label, icon, activeIcon, active }: { href: string, label: string, icon: React.ReactNode, activeIcon: React.ReactNode, active: boolean }) {
    return (
        <Link href={href} className={`ios-tab-item ${active ? 'active' : ''}`}>
            <svg
                className="ios-tab-icon"
                width="24" height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={active ? "0" : "2"}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {active ? activeIcon : icon}
            </svg>
            <span>{label}</span>
        </Link>
    );
}
