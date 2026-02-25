import db, { getNextMahnungNumber } from './db';
import { generateReminderHTML, getReminderFee } from './reminder-generator';
import { sendReminderEmail } from './reminder-email';

interface UnpaidInvoice {
  id: number;
  invoice_number: string;
  customer_number: string;
  order_number: string;
  email: string;
  anrede: string;
  vorname: string;
  familienname: string;
  strasse: string;
  hausnummer: string;
  plz: string;
  ort: string;
  land: string;
  erstellt_am: string;
  payment_status: string;
}

interface ExistingReminder {
  mahnung_stufe: number;
}

export async function processOverdueInvoices(): Promise<{
  processed: number;
  reminders: Array<{ invoiceNumber: string; stufe: number; mahnungNumber: string }>;
  errors: Array<{ invoiceNumber: string; error: string }>;
}> {
  const results = {
    processed: 0,
    reminders: [] as Array<{ invoiceNumber: string; stufe: number; mahnungNumber: string }>,
    errors: [] as Array<{ invoiceNumber: string; error: string }>
  };

  try {
    const unpaidInvoices = db.prepare(`
      SELECT * FROM anfragen 
      WHERE payment_status = 'unbezahlt' 
      AND invoice_number IS NOT NULL
      ORDER BY erstellt_am ASC
    `).all() as UnpaidInvoice[];

    console.log(`📋 Gefunden: ${unpaidInvoices.length} unbezahlte Rechnungen`);

    for (const invoice of unpaidInvoices) {
      try {
        const invoiceDate = new Date(invoice.erstellt_am);
        const now = new Date();
        const daysSinceInvoice = Math.floor((now.getTime() - invoiceDate.getTime()) / (1000 * 60 * 60 * 24));

        const existingReminders = db.prepare(`
          SELECT mahnung_stufe FROM mahnungen 
          WHERE anfrage_id = ? 
          ORDER BY mahnung_stufe ASC
        `).all(invoice.id) as ExistingReminder[];

        const existingLevels = new Set(existingReminders.map(r => r.mahnung_stufe));
        const levelsToCreate: number[] = [];

        if (daysSinceInvoice >= 7 && !existingLevels.has(1)) {
          levelsToCreate.push(1);
        }
        if (daysSinceInvoice >= 14 && !existingLevels.has(2)) {
          levelsToCreate.push(2);
        }
        if (daysSinceInvoice >= 21 && !existingLevels.has(3)) {
          levelsToCreate.push(3);
        }

        for (const level of levelsToCreate) {
          await createAndSendReminder(invoice, level);
          results.processed++;
          results.reminders.push({
            invoiceNumber: invoice.invoice_number,
            stufe: level,
            mahnungNumber: `M-${invoice.invoice_number}-${level}`
          });
          console.log(`✅ Mahnung Stufe ${level} erstellt für Rechnung ${invoice.invoice_number}`);
        }

      } catch (error) {
        console.error(`❌ Fehler bei Rechnung ${invoice.invoice_number}:`, error);
        results.errors.push({
          invoiceNumber: invoice.invoice_number,
          error: error instanceof Error ? error.message : 'Unbekannter Fehler'
        });
      }
    }

    console.log(`✅ Mahnsystem abgeschlossen: ${results.processed} Mahnungen erstellt`);
    return results;

  } catch (error) {
    console.error('❌ Fehler im Mahnsystem:', error);
    throw error;
  }
}

async function createAndSendReminder(invoice: UnpaidInvoice, stufe: number): Promise<void> {
  const mahnungNumber = getNextMahnungNumber();
  const originalAmount = 29.90;
  const verzugskosten = 2.50;
  const mahngebuehr = stufe === 1 ? 0.00 : (stufe === 2 ? 2.50 : 5.00);
  const totalFee = verzugskosten + mahngebuehr;
  const totalAmount = originalAmount + totalFee;

  const reminderResult = await generateReminderHTML({
    mahnungNumber,
    invoiceNumber: invoice.invoice_number,
    customerNumber: invoice.customer_number,
    orderNumber: invoice.order_number,
    salutation: invoice.anrede || 'Herr/Frau',
    firstName: invoice.vorname?.trim() || '',
    lastName: invoice.familienname?.trim() || '',
    street: `${invoice.strasse?.trim() || ''} ${invoice.hausnummer?.trim() || ''}`.trim(),
    zipCode: invoice.plz?.trim() || '',
    city: invoice.ort?.trim() || '',
    country: invoice.land?.trim() || 'DE',
    stufe,
    originalAmount,
    fee: totalFee,
    totalAmount,
    invoiceDate: new Date(invoice.erstellt_am).toLocaleDateString('de-DE')
  });

  db.prepare(`
    INSERT INTO mahnungen (
      anfrage_id, mahnung_number, mahnung_stufe, 
      betrag, mahngebuehr, gesamtbetrag,
      mahnung_path, mahnung_filename
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    invoice.id,
    mahnungNumber,
    stufe,
    originalAmount,
    totalFee,
    totalAmount,
    reminderResult.filePath,
    reminderResult.fileName
  );

  // WICHTIG: KEINE AUTOMATISCHE VERSENDUNG!
  // Mahnungen werden NUR manuell über Admin-Buttons versendet
  console.log(`✓ Mahnung ${mahnungNumber} erstellt (NICHT automatisch versendet - nur manuell über Admin-Button)`);
}

export async function manualSendReminder(mahnungId: number): Promise<void> {
  const mahnung = db.prepare(`
    SELECT m.*, a.email, a.anrede, a.vorname, a.familienname, a.invoice_number
    FROM mahnungen m
    JOIN anfragen a ON m.anfrage_id = a.id
    WHERE m.id = ?
  `).get(mahnungId) as any;

  if (!mahnung) {
    throw new Error('Mahnung nicht gefunden');
  }

  await sendReminderEmail({
    customerEmail: mahnung.email,
    customerName: `${mahnung.anrede || ''} ${mahnung.vorname} ${mahnung.familienname}`.trim(),
    mahnungNumber: mahnung.mahnung_number,
    invoiceNumber: mahnung.invoice_number,
    mahnungPath: mahnung.mahnung_path,
    stufe: mahnung.mahnung_stufe,
    totalAmount: mahnung.gesamtbetrag
  });

  db.prepare(`
    UPDATE mahnungen 
    SET versendet = 1, versendet_am = CURRENT_TIMESTAMP 
    WHERE id = ?
  `).run(mahnungId);

  console.log(`✅ Mahnung ${mahnung.mahnung_number} manuell versendet`);
}
