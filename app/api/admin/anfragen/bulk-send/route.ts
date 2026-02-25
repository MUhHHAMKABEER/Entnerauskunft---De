import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { sendBulkEmails } from '@/lib/bulk-email';

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session.isLoggedIn) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { ids, templateId } = await request.json();

        if (!ids || !Array.isArray(ids) || !templateId) {
            return NextResponse.json({ success: false, error: 'Invalid parameters' }, { status: 400 });
        }

        const results = await sendBulkEmails({ ids, templateId });

        return NextResponse.json({
            success: true,
            results
        });

    } catch (error) {
        console.error('❌ Bulk send API error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Internal server error'
        }, { status: 500 });
    }
}
