import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Admin Login - AppHub',
    description: 'AppHub Admin Dashboard Login',
};

export default function AdminLoginPage() {
    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <div className="admin-login-logo">
                    <span className="logo-icon">📦</span>
                    <span className="logo-text">AppHub Admin</span>
                </div>

                <h1>Admin Login</h1>
                <p className="login-subtitle">Sign in to manage your apps</p>

                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="admin@example.com"
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            className="form-input"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-full">
                        Sign In
                    </button>
                </form>

                <div className="login-note">
                    <p>
                        <strong>Note:</strong> Admin authentication is integrated with Supabase Auth.
                        Configure your Supabase credentials in <code>.env.local</code> to enable login.
                    </p>
                </div>

                <Link href="/" className="back-link">
                    ← Back to AppHub
                </Link>
            </div>
        </div>
    );
}
