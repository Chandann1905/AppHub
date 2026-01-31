import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabaseAccessToken = req.cookies.get('sb-access-token');

    // Protect /admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
        // Exclude /admin/login
        if (req.nextUrl.pathname === '/admin/login') {
            // If already logged in, redirect to dashboard
            if (supabaseAccessToken) {
                return NextResponse.redirect(new URL('/admin/dashboard', req.url));
            }
            return res;
        }

        // Check authentication
        if (!supabaseAccessToken) {
            // Redirect to login, optionally saving the return URL
            const loginUrl = new URL('/admin/login', req.url);
            // loginUrl.searchParams.set('from', req.nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return res;
}

export const config = {
    matcher: ['/admin/:path*'],
};
