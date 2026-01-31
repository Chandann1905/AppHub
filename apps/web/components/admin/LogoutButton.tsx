'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface LogoutButtonProps {
    customClass?: string;
}

export const LogoutButton = ({ customClass }: LogoutButtonProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await fetch('/api/admin/logout', { method: 'POST' });
            router.push('/admin/login');
            router.refresh();
        } catch (error) {
            console.error('Logout failed', error);
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className={customClass || "btn btn-secondary"}
            disabled={isLoading}
            style={!customClass ? { fontSize: '0.875rem', padding: '0.5rem 1rem' } : undefined}
        >
            {isLoading ? 'Logging out...' : 'Logout'}
        </button>
    );
};
