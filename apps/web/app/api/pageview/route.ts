import { NextRequest, NextResponse } from 'next/server';
import { trackPageView } from '@apphub/db';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { path, appId } = body;

        if (!path) {
            return NextResponse.json(
                { error: 'Missing path' },
                { status: 400 }
            );
        }

        // Get client info
        const ip = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';
        const userAgent = request.headers.get('user-agent') || 'unknown';
        const referrer = request.headers.get('referer') || '';

        // Track the page view
        await trackPageView(path, appId, {
            ip,
            userAgent,
            referrer,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Page view tracking error:', error);
        return NextResponse.json(
            { error: 'Failed to track page view' },
            { status: 500 }
        );
    }
}
