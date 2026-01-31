import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'plain' | 'get';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    children: React.ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    className = '',
    children,
    ...props
}: ButtonProps) {
    const baseClasses = 'ios-btn';
    const variantClasses = {
        primary: 'ios-btn-primary',
        secondary: 'ios-btn-secondary',
        plain: 'ios-btn-plain',
        get: 'ios-btn-get'
    };

    // Size adjustments if needed (mostly handled by base class, but 'get' is special)
    const sizeStyle = variant === 'get' ? {} : (size === 'lg' ? { padding: '14px 28px', fontSize: '19px' } : {});

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${className} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading || props.disabled}
            style={sizeStyle}
            {...props}
        >
            {isLoading ? (
                <span className="animate-spin mr-2">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </span>
            ) : null}
            {children}
        </button>
    );
}
