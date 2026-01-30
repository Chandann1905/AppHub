import { NextRequest, NextResponse } from 'next/server';
import { trackDownload } from '@apphub/db';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { versionId, platform } = body;

        if (!versionId || !platform) {
            return NextResponse.json(
                { error: 'Missing versionId or platform' },
                { status: 400 }
            );
        }

        // Get client info
        const ip = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';
        const userAgent = request.headers.get('user-agent') || 'unknown';
        const referrer = request.headers.get('referer') || '';

        // Track the download
        await trackDownload(versionId, platform, {
            ip,
            userAgent,
            referrer,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Download tracking error:', error);
        return NextResponse.json(
            { error: 'Failed to track download' },
            { status: 500 }
        );
    }
}
