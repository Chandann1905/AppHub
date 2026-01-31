import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { LogoutButton } from '@/components/admin/LogoutButton';
import Link from 'next/link';

// Helper to get user safely
async function getAdminUser() {
    const cookieStore = cookies();
    const token = cookieStore.get('sb-access-token')?.value;

    if (!token) return null;

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

export default async function AdminProfilePage() {
    const user = await getAdminUser();
    const email = user?.email || 'Unknown';
    const lastSignIn = user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A';

    return (
        <div className="ios-page">
            <div className="ios-navbar">
                <Link href="/admin/dashboard" className="text-[var(--ios-blue)] flex items-center gap-1 text-[17px]">
                    ‹ Back
                </Link>
                <div className="ios-navbar-title">Profile</div>
                <div className="w-[60px]"></div> {/* Spacer for center alignment */}
            </div>

            <main className="ios-container pt-4">
                <h1 className="text-[34px] font-bold mb-4 px-2">Account</h1>

                {/* Info Card */}
                <div className="ios-card">
                    <div className="ios-list-item">
                        <span className="flex-1 text-[17px]">Email</span>
                        <span className="text-[var(--label-secondary)] text-[17px]">{email}</span>
                    </div>
                    <div className="ios-list-item">
                        <span className="flex-1 text-[17px]">Role</span>
                        <span className="text-[var(--label-secondary)] text-[17px]">Administrator</span>
                    </div>
                    <div className="ios-list-item">
                        <span className="flex-1 text-[17px]">Session ID</span>
                        <span className="text-[var(--label-secondary)] text-[13px] font-mono">{user?.id?.slice(0, 8)}...</span>
                    </div>
                </div>

                <p className="px-4 text-[13px] text-[var(--label-secondary)] mb-6">
                    Last signed in: {lastSignIn}
                </p>

                {/* Actions */}
                <div className="ios-card">
                    <div className="p-1">
                        <LogoutButton customClass="w-full text-left px-4 py-3 text-[var(--ios-red)] text-[17px] font-medium bg-transparent active:bg-[var(--ios-gray6)] block text-center" />
                    </div>
                </div>

                <div className="mt-8 text-center text-[13px] text-[var(--label-tertiary)]">
                    AppHub Admin v1.0.1
                </div>
            </main>
        </div>
    );
}
