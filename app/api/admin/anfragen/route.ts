import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { getSession } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    // Session prüfen
    const session = await getSession();
    if (!session.isLoggedIn) {
      return NextResponse.json(
        { success: false, error: 'Nicht autorisiert' },
        { status: 401 }
      );
    }

    // Query-Parameter
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const paymentStatus = searchParams.get('paymentStatus');
    const reminderStatus = searchParams.get('reminderStatus');
    const reminderSubStatus = searchParams.get('reminderSubStatus');
    const due = searchParams.get('due');
    const customDate = searchParams.get('customDate');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;
    const idsOnly = searchParams.get('idsOnly') === 'true';

    // Tage seit Erstellung (nur für unbezahlte Anfragen relevant)
    const daysSinceExpr = "cast((strftime('%s','now') - strftime('%s', erstellt_am)) / 86400 as integer)";
    const daysSinceRealExpr = "((strftime('%s','now') - strftime('%s', erstellt_am)) / 86400.0)";

    // SQL-Query bauen (WHERE-Bedingungen für beide Abfragen)
    let whereClause = 'WHERE 1=1';
    const whereParams: any[] = [];

    if (status && status !== 'alle') {
      whereClause += ' AND status = ?';
      whereParams.push(status);
    }

    if (paymentStatus && paymentStatus !== 'alle') {
      if (paymentStatus === 'bezahlt') {
        whereClause += ' AND payment_date IS NOT NULL';
      } else if (paymentStatus === 'unbezahlt') {
        whereClause += ' AND payment_date IS NULL';
      }
    }

    const logCountExpr = "(SELECT COUNT(*) FROM email_logs WHERE anfrage_id = anfragen.id)";

    // EffectiveStep: Depends on age (BaseStep) + Emails Sent (LogCount)
    // 0-3d: Step 0 (New)
    // 3-8d: Step 1 (Friendly V1 Start)
    // 8-15d: Step 3 (Overdue V1 Start)
    // 15-22d: Step 6 (Mahnung V1 Start)
    // 22d+: Step 9 (Final V1 Start)
    const effectiveStepExpr = `(
      CASE 
        WHEN ${daysSinceExpr} < 3 THEN 0
        WHEN ${daysSinceExpr} < 8 THEN 1
        WHEN ${daysSinceExpr} < 15 THEN 3
        WHEN ${daysSinceExpr} < 22 THEN 6
        ELSE 9
      END + ${logCountExpr}
    )`;

    // Next milestone day for the *next* email step (mirrors milestones array in app/admin/anfragen/page.tsx)
    const nextMilestoneDayExpr = `(
      CASE 
        WHEN ${effectiveStepExpr} = 0 THEN 3
        WHEN ${effectiveStepExpr} = 1 THEN 6
        WHEN ${effectiveStepExpr} = 2 THEN 8
        WHEN ${effectiveStepExpr} = 3 THEN 10
        WHEN ${effectiveStepExpr} = 4 THEN 13
        WHEN ${effectiveStepExpr} = 5 THEN 15
        WHEN ${effectiveStepExpr} = 6 THEN 17
        WHEN ${effectiveStepExpr} = 7 THEN 20
        WHEN ${effectiveStepExpr} = 8 THEN 22
        WHEN ${effectiveStepExpr} = 9 THEN 24
        WHEN ${effectiveStepExpr} = 10 THEN 27
        ELSE NULL
      END
    )`;

    // Next milestone date (YYYY-MM-DD) derived from erstellt_am + nextMilestoneDay
    // Uses julianday arithmetic so fractional days (e.g. 4.5) land on the correct calendar date.
    const nextMilestoneDateExpr = `(date(julianday(erstellt_am) + ${nextMilestoneDayExpr}))`;

    if (customDate) {
      // Custom date filtering should show only unpaid inquiries whose next milestone falls on that date
      whereClause += ' AND payment_date IS NULL';
      whereClause += ` AND ${nextMilestoneDayExpr} IS NOT NULL AND ${nextMilestoneDateExpr} = date(?)`;
      whereParams.push(customDate);
    } else if (due && due !== 'alle') {
      // Due is only relevant for unpaid inquiries (otherwise there is no next email milestone)
      whereClause += ' AND payment_date IS NULL';

      // Difference between next milestone day and current age in days
      const dueDeltaExpr = `(${nextMilestoneDayExpr} - ${daysSinceRealExpr})`;

      if (due === 'today') {
        // Due within the next 24h window (including fractional milestones like 4.5 days)
        whereClause += ` AND ${nextMilestoneDayExpr} IS NOT NULL AND ${dueDeltaExpr} >= 0 AND ${dueDeltaExpr} < 1`;
      } else if (due === 'tomorrow') {
        whereClause += ` AND ${nextMilestoneDayExpr} IS NOT NULL AND ${dueDeltaExpr} >= 1 AND ${dueDeltaExpr} < 2`;
      }
    }

    if (reminderStatus && reminderStatus !== 'alle') {
      whereClause += ' AND payment_date IS NULL';

      if (reminderStatus === 'new_signup') {
        whereClause += ` AND ${effectiveStepExpr} = 0`;
      } else if (reminderStatus === 'friendly_reminder') {
        if (reminderSubStatus === 'versuch_1') whereClause += ` AND ${effectiveStepExpr} = 1`;
        else if (reminderSubStatus === 'versuch_2') whereClause += ` AND ${effectiveStepExpr} = 2`;
        else whereClause += ` AND ${effectiveStepExpr} IN (1, 2)`;
      } else if (reminderStatus === 'payment_overdue') {
        if (reminderSubStatus === 'versuch_1') whereClause += ` AND ${effectiveStepExpr} = 3`;
        else if (reminderSubStatus === 'versuch_2') whereClause += ` AND ${effectiveStepExpr} = 4`;
        else if (reminderSubStatus === 'versuch_3') whereClause += ` AND ${effectiveStepExpr} = 5`;
        else whereClause += ` AND ${effectiveStepExpr} IN (3, 4, 5)`;
      } else if (reminderStatus === '1st_reminder') {
        if (reminderSubStatus === 'versuch_1') whereClause += ` AND ${effectiveStepExpr} = 6`;
        else if (reminderSubStatus === 'versuch_2') whereClause += ` AND ${effectiveStepExpr} = 7`;
        else if (reminderSubStatus === 'versuch_3') whereClause += ` AND ${effectiveStepExpr} = 8`;
        else whereClause += ` AND ${effectiveStepExpr} IN (6, 7, 8)`;
      } else if (reminderStatus === 'final_reminder') {
        if (reminderSubStatus === 'versuch_1') whereClause += ` AND ${effectiveStepExpr} = 9`;
        else if (reminderSubStatus === 'versuch_2') whereClause += ` AND ${effectiveStepExpr} = 10`;
        else if (reminderSubStatus === 'versuch_3') whereClause += ` AND ${effectiveStepExpr} >= 11`;
        else whereClause += ` AND ${effectiveStepExpr} >= 9`;
      }
    }

    if (search) {
      whereClause += ' AND (email LIKE ? OR vorname LIKE ? OR familienname LIKE ? OR versicherungsnummer LIKE ? OR invoice_number LIKE ?)';
      const searchTerm = `%${search}%`;
      whereParams.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
    }

    if (idsOnly) {
      const idsQuery = `SELECT id FROM anfragen ${whereClause} ORDER BY erstellt_am DESC`;
      const rows = db.prepare(idsQuery).all(...whereParams) as { id: number }[];
      const countResult = db.prepare(`SELECT COUNT(*) as total FROM anfragen ${whereClause}`).get(...whereParams) as { total: number };
      return NextResponse.json({
        success: true,
        ids: rows.map((r) => r.id),
        total: countResult.total
      });
    }

    const lastEmailSubjectExpr = "(SELECT subject FROM email_logs WHERE anfrage_id = anfragen.id ORDER BY sent_at DESC LIMIT 1)";
    const lastEmailSentAtExpr = "(SELECT sent_at FROM email_logs WHERE anfrage_id = anfragen.id ORDER BY sent_at DESC LIMIT 1)";

    const query = `
      SELECT *,
        ${logCountExpr} as email_log_count,
        ${lastEmailSubjectExpr} as last_email_subject,
        ${lastEmailSentAtExpr} as last_email_sent_at
      FROM anfragen 
      ${whereClause} 
      ORDER BY erstellt_am DESC 
      LIMIT ? OFFSET ?
    `;
    const params = [...whereParams, limit, offset];

    // Anfragen abrufen
    const anfragen = db.prepare(query).all(...params);

    // Gesamtanzahl für Pagination
    const { total } = db.prepare(`SELECT COUNT(*) as total FROM anfragen ${whereClause}`).get(...whereParams) as { total: number };

    return NextResponse.json({
      success: true,
      data: anfragen,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('❌ Fehler beim Abrufen der Anfragen:', error);
    return NextResponse.json(
      { success: false, error: 'Serverfehler' },
      { status: 500 }
    );
  }
}
