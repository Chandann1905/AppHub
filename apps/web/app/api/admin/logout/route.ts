import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Sign out from Supabase (invalidate session if possible)
        const cookieStore = cookies();
        // const accessToken = cookieStore.get('sb-access-token')?.value;

        // if (accessToken) {
        //     await supabase.auth.signOut(accessToken);
        // }

        // Clear cookies
        cookieStore.delete('sb-access-token');
        cookieStore.delete('sb-refresh-token');

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
    }
}
