'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Application error:', error);
    }, [error]);

    return (
        <main className="container">
            <div className="content">
                <h1>500</h1>
                <h2>Something went wrong</h2>
                <p>An unexpected error occurred. Please try again.</p>
                <button onClick={reset} className="button">
                    Try Again
                </button>
            </div>
        </main>
    );
}
