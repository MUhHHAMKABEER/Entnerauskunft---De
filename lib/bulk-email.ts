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
                to: recipientEmail,
                from: fromEmail,
                subject: subject,
                html: body.replace(/\n/g, '<br>'),
            };

            const [response] = await sgMail.send(msg);
            log(`✅ SendGrid Success! ID ${id} Status: ${response.statusCode}`);

            // 1. Insert persistent log into DB
            db.prepare(`
                INSERT INTO email_logs (anfrage_id, template_id, subject, recipient, status)
                VALUES (?, ?, ?, ?, ?)
            `).run(id, templateId, subject, recipientEmail, 'sent');

            // 2. Update anfragen table with last reminder info
            db.prepare(`
                UPDATE anfragen 
                SET last_reminder_sent = ?, 
                    last_reminder_at = CURRENT_TIMESTAMP,
                    aktualisiert_am = CURRENT_TIMESTAMP
                WHERE id = ?
            `).run(template.name || 'Email sent', id);

            results.success++;
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : 'Unknown error';
            log(`❌ Failed to send to ID ${id}: ${errMsg}`);
            results.failed++;
            results.errors.push(`ID ${id}: ${errMsg}`);
        }
    }

    log(`🏁 Finished bulk send. Results: ${results.success} success, ${results.failed} failed.`);
    return results;
}
