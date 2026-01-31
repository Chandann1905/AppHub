'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ios/Button';

export default function AdminLoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Success
            router.push('/admin/dashboard');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--system-grouped-background)] p-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-[var(--ios-blue)] rounded-[22%] mx-auto flex items-center justify-center text-4xl shadow-lg mb-4">
                        🔐
                    </div>
                    <h1 className="text-2xl font-bold text-[var(--label-primary)]">Admin Login</h1>
                    <p className="text-[var(--label-secondary)] text-sm mt-2">
                        Secure access for AppHub administrators
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="ios-card overflow-hidden">
                        <div className="ios-list-item p-0">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full h-12 px-4 bg-transparent outline-none text-[var(--label-primary)] placeholder-[var(--label-secondary)]"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="ios-list-item p-0 border-t border-[var(--separator)]">
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full h-12 px-4 bg-transparent outline-none text-[var(--label-primary)] placeholder-[var(--label-secondary)]"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        isLoading={loading}
                    >
                        Sign In
                    </Button>
                </form>

                <div className="mt-8 text-center">
                    <a href="#" className="text-[var(--ios-blue)] text-sm">
                        Forgot Password?
                    </a>
                </div>
            </div>
        </div>
    );
}
