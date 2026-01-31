import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // Initialize Supabase Client
        // Note: In a real app, use @supabase/ssr for cleaner cookie handling
        // Here we manually handle it for simplicity without adding deps
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
        const supabase = createClient(supabaseUrl, supabaseKey);

        // 1. Sign In
        const { data: { session }, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (signInError) {
            return NextResponse.json({ error: signInError.message }, { status: 401 });
        }

        if (!session) {
            return NextResponse.json({ error: 'No session created' }, { status: 500 });
        }

        // 2. Check Admin Status
        // We need to query the admin_users table. 
        // Since we are on the server but using anon key, we should ideally use service role...
        // BUT we can use the user's JWT to query if RLS is set up correctly.
        // Let's use service key for this check to be absolutely sure and safe (privileged check).

        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!serviceRoleKey) {
            console.error('Missing SUPABASE_SERVICE_ROLE_KEY');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const adminClient = createClient(supabaseUrl, serviceRoleKey);

        const { data: adminUser, error: adminError } = await adminClient
            .from('admin_users')
            .select('id, role, is_active')
            .eq('user_id', session.user.id)
            .single();

        if (adminError || !adminUser) {
            // Not an admin
            await supabase.auth.signOut(); // Kill the session
            return NextResponse.json({ error: 'Unauthorized: Admin access only' }, { status: 403 });
        }

        if (!adminUser.is_active) {
            await supabase.auth.signOut();
            return NextResponse.json({ error: 'Account disabled' }, { status: 403 });
        }

        // 3. Set Cookies
        const cookieStore = cookies();

        // Expiry calculation (default 1 week or use session.expires_at)
        const maxAge = 60 * 60 * 24 * 7;

        cookieStore.set('sb-access-token', session.access_token, {
            path: '/',
            maxAge,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });

        cookieStore.set('sb-refresh-token', session.refresh_token, {
            path: '/',
            maxAge,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });

        // 4. Log the Login (Async, don't await)
        adminClient.from('admin_login_logs').insert({
            admin_id: adminUser.id,
            email: email,
            success: true,
            ip_address: '0.0.0.0', // Would need headers to get real IP
            user_agent: request.headers.get('user-agent')
        }).then();

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
