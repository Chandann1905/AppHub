import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    footer?: string;
}

export function Card({ children, className = '', title, footer }: CardProps) {
    return (
        <div className={`mb-6 ${className}`}>
            {title && (
                <div className="px-4 pb-2 text-[13px] font-medium text-[var(--label-secondary)] uppercase tracking-wide">
                    {title}
                </div>
            )}

            <div className="ios-card">
                {children}
            </div>

            {footer && (
                <div className="px-4 pt-2 text-[13px] text-[var(--label-secondary)] leading-relaxed">
                    {footer}
                </div>
            )}
        </div>
    );
}
