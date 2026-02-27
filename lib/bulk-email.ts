import sgMail from './sendgrid';
import db from './db';
import fs from 'fs';
import path from 'path';

interface BulkEmailParams {
    ids: number[];
    templateId: string;
}

const logFile = path.join(process.cwd(), 'logs', 'bulk-send.log');

function log(message: string) {
    const timestamp = new Date().toISOString();
    fs.appendFileSync(logFile, `[${timestamp}] ${message}\n`);
    console.log(message);
}

export async function sendBulkEmails({ ids, templateId }: BulkEmailParams) {
    log(`🚀 Starting bulk send for ${ids.length} recipients using template ${templateId}`);

    // Fetch the template
    const template = db.prepare('SELECT name, betreff as subject, inhalt as body FROM email_vorlagen WHERE id = ?').get(templateId) as { name: string; subject: string; body: string } | undefined;

    if (!template) {
        log(`❌ Error: Email template ${templateId} not found`);
        throw new Error('Email template not found');
    }

    const results = {
        total: ids.length,
        success: 0,
        failed: 0,
        errors: [] as string[]
    };

    const fromEmail = 'muhammadkabeerxhb@gmail.com'; // Verified Sender

    for (const id of ids) {
        try {
            const anfrage = db.prepare('SELECT * FROM anfragen WHERE id = ?').get(id) as any;
            if (!anfrage) {
                log(`⚠️ Warning: Inquiry ID ${id} not found in database`);
                continue;
            }

            const milestones = [
                { day: 3 },
                { day: 6 },
                { day: 8 },
                { day: 10 },
                { day: 13 },
                { day: 15 },
                { day: 17 },
                { day: 20 },
                { day: 22 },
                { day: 24 },
                { day: 27 },
            ];

            const createdAtMs = anfrage.erstellt_am ? new Date(anfrage.erstellt_am).getTime() : 0;
            const daysSinceCreation = createdAtMs ? Math.floor((Date.now() - createdAtMs) / (1000 * 60 * 60 * 24)) : 0;

            let baseStep = 0;
            if (daysSinceCreation < 3) baseStep = 0;
            else if (daysSinceCreation < 8) baseStep = 1;
            else if (daysSinceCreation < 15) baseStep = 3;
            else if (daysSinceCreation < 22) baseStep = 6;
            else baseStep = 9;

            const logCountRow = db.prepare('SELECT COUNT(*) as cnt FROM email_logs WHERE anfrage_id = ?').get(id) as { cnt: number };
            const effectiveStep = baseStep + (logCountRow?.cnt || 0);
            const milestoneForThisSend = milestones[effectiveStep];
            const milestoneStepToLog = milestoneForThisSend ? effectiveStep : null;
            const milestoneDayToLog = milestoneForThisSend ? milestoneForThisSend.day : null;

            // Helper: Format Date for FAELLIG_AM (e.g., 7 days after creation for reminder)
            const createdDate = new Date(anfrage.erstellt_am);
            const dueDate = new Date(createdDate.getTime() + 7 * 24 * 60 * 60 * 1000);
            const formattedDueDate = dueDate.toLocaleDateString('de-DE');

            // Replace placeholders (Supporting both {tag} and [TAG] styles)
            const placeholders: Record<string, string> = {
                '{vorname}': anfrage.vorname || '',
                '{familienname}': anfrage.familienname || '',
                '{invoice_number}': anfrage.invoice_number || '',
                '{totalAmount}': '29.90',
                '[VORNAME]': anfrage.vorname || '',
                '[NACHNAME]': anfrage.familienname || '',
                '[ANREDE]': anfrage.anrede || '',
                '[RECHNUNGSNR]': anfrage.invoice_number || '',
                '[FAELLIG_AM]': formattedDueDate,
                '[BETRAG]': '29,90 €'
            };

            let subject = template.subject;
            let body = template.body;

            Object.entries(placeholders).forEach(([tag, val]) => {
                const regex = new RegExp(tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                subject = subject.replace(regex, val);
                body = body.replace(regex, val);
            });

            const recipientEmail = anfrage.email || '';
            if (!recipientEmail) {
                log(`⚠️ Warning: No email address found for customer ${anfrage.vorname} ${anfrage.familienname}, ID: ${id}`);
                results.failed++;
                continue;
            }

            log(`📤 Sending email to ${recipientEmail} (Customer: ${anfrage.vorname} ${anfrage.familienname}, ID: ${id})...`);

            const msg = {
                // to: recipientEmail,
                to: 'saaimch204@gmail.com',
                from: fromEmail,
                subject: subject,
                html: body.replace(/\n/g, '<br>'),
            };

            const [response] = await sgMail.send(msg);
            log(`✅ SendGrid Success! ID ${id} Status: ${response.statusCode}`);

            // 1. Insert persistent log into DB
            db.prepare(`
                INSERT INTO email_logs (anfrage_id, template_id, subject, recipient, status, milestone_step, milestone_day)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `).run(id, templateId, subject, recipientEmail, 'sent', milestoneStepToLog, milestoneDayToLog);

            // 2. Update anfragen table with last reminder info
            db.prepare(`
                UPDATE anfragen 
                SET last_reminder_sent = ?, 
                    last_reminder_at = CURRENT_TIMESTAMP,
                    aktualisiert_am = CURRENT_TIMESTAMP
                WHERE id = ?
            `).run(template.name || 'Email sent', id);

            results.success++;
        } catch (error: any) {
            let errMsg = error instanceof Error ? error.message : 'Unknown error';

            // SendGrid specific error details extraction
            if (error?.response?.body) {
                const sgError = JSON.stringify(error.response.body);
                errMsg += ` | SendGrid Details: ${sgError}`;
            }

            log(`❌ Failed to send to ID ${id}: ${errMsg}`);
            console.error(`🚨 Full Debug Error for ID ${id}:`, error?.response?.body || error);

            results.failed++;
            results.errors.push(`ID ${id}: ${errMsg}`);
        }
    }

    log(`🏁 Finished bulk send. Results: ${results.success} success, ${results.failed} failed.`);
    return results;
}
