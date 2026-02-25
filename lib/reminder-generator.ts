import fs from 'fs';
import path from 'path';
import { convertHtmlToPdf } from './html-to-pdf';
import { getLogoBase64 } from './logo-base64';

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

interface ReminderData {
  mahnungNumber: string;
  invoiceNumber: string;
  customerNumber: string;
  orderNumber: string;
  salutation: string;
  firstName: string;
  lastName: string;
  street: string;
  zipCode: string;
  city: string;
  country: string;
  stufe: number;
  originalAmount: number;
  fee: number;
  totalAmount: number;
  invoiceDate: string;
}

interface ReminderResult {
  success: boolean;
  filePath: string;
  fileName: string;
  mahnungNumber: string;
}

const REMINDER_CONFIG = {
  1: {
    title: 'ZAHLUNGSERINNERUNG',
    verzugskosten: 2.50,
    mahngebuehr: 0.00,
    daysOverdue: 7,
    emailSubject: 'Zahlungserinnerung – Rechnung Nr. {invoiceNumber} | Offener Betrag 32,40 €',
    text: 'Leider konnten wir bis heute keinen Zahlungseingang zu unserer Rechnung Nr. {invoiceNumber} vom {invoiceDate} feststellen.\n\nDie Forderung befindet sich seit dem {verzugDate} im Zahlungsverzug.\n\nFür den durch den Zahlungsverzug entstandenen Verwaltungsaufwand machen wir gemäß § 286 BGB pauschale Verzugskosten in Höhe von 2,50 € geltend.\n\nWir bitten Sie, den Gesamtbetrag bis spätestens {deadline} zu begleichen.\n\nSollte bis zu diesem Zeitpunkt kein Zahlungseingang erfolgen, behalten wir uns die Geltendmachung weiterer Verzugskosten sowie die Übergabe des Vorgangs an einen externen Dienstleister vor.'
  },
  2: {
    title: '1. MAHNUNG',
    verzugskosten: 2.50,
    mahngebuehr: 2.50,
    daysOverdue: 14,
    emailSubject: '1. Mahnung – Rechnung Nr. {invoiceNumber} | Offener Betrag 34,90 €',
    text: 'Leider konnten wir bis heute keinen Zahlungseingang zu unserer Rechnung Nr. {invoiceNumber} vom {invoiceDate} feststellen.\n\nDie Forderung befindet sich seit dem {verzugDate} im Zahlungsverzug.\n\nAufgrund des bisherigen Zahlungsverzugs machen wir neben der Hauptforderung nunmehr zusätzliche Mahngebühren geltend.\n\nWir bitten Sie, den offenen Gesamtbetrag bis spätestens {deadline} zu begleichen.\n\nSollte bis zu diesem Zeitpunkt kein Zahlungseingang erfolgen, behalten wir uns vor, weitere Maßnahmen zur Durchsetzung der Forderung einzuleiten.'
  },
  3: {
    title: 'LETZTE MAHNUNG',
    verzugskosten: 2.50,
    mahngebuehr: 5.00,
    daysOverdue: 21,
    emailSubject: 'Letzte Mahnung vor Inkasso und gerichtlichen Maßnahmen – Rechnung Nr. {invoiceNumber}',
    text: 'Trotz unserer Zahlungserinnerung sowie unserer 1. Mahnung konnten wir bis heute keinen Zahlungseingang zu unserer Rechnung Nr. {invoiceNumber} vom {invoiceDate} feststellen.\n\nDie Forderung befindet sich weiterhin im Zahlungsverzug.\n\nAufgrund des fortgesetzten Zahlungsverzugs machen wir erneut zusätzliche Mahngebühren geltend.\n\nWir setzen Ihnen hiermit letztmalig eine Zahlungsfrist bis spätestens {deadline}.\n\nSollte bis zu diesem Zeitpunkt kein vollständiger Zahlungseingang erfolgen, wird der Vorgang ohne weitere Ankündigung an ein externes Inkassounternehmen übergeben. In diesem Fall ist mit zusätzlichen Inkasso-, Bearbeitungs- und Auslagenkosten zu rechnen.\n\nDarüber hinaus behalten wir uns ausdrücklich vor, die Forderung gerichtlich geltend zu machen. Dies kann die gerichtliche Titulierung der Forderung, eine Zwangsvollstreckung (z. B. durch Gerichtsvollzieher) sowie weitere rechtliche Schritte nach sich ziehen. Ein tituliertes Forderungsverfahren kann sich zudem negativ auf Ihre Bonität auswirken.\n\nZur Vermeidung dieser Maßnahmen empfehlen wir dringend den fristgerechten Ausgleich des offenen Gesamtbetrags.'
  }
};

export async function generateReminderHTML(reminderData: ReminderData): Promise<ReminderResult> {
  try {
    const logoBase64 = getLogoBase64();
    const config = REMINDER_CONFIG[reminderData.stufe as keyof typeof REMINDER_CONFIG];

    const remindersDir = path.join(process.cwd(), 'data', 'mahnungen');
    if (!fs.existsSync(remindersDir)) {
      fs.mkdirSync(remindersDir, { recursive: true });
    }

    const fileName = `Mahnung_${reminderData.mahnungNumber.trim()}_${reminderData.lastName.trim()}`.replace(/[<>:"/\\|?*\x00-\x1F]/g, '_') + '.html';
    const filePath = path.join(remindersDir, fileName);

    const htmlContent = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.title} ${reminderData.mahnungNumber}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Arial, sans-serif; 
      font-size: 10pt; 
      line-height: 1.4;
      color: #0F172A;
      padding: 30px;
      max-width: 800px;
      margin: 0 auto;
    }
    .header { 
      display: flex; 
      justify-content: space-between; 
      align-items: flex-start;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 2px solid #E5E7EB;
    }
    .logo { 
      width: 120px; 
      height: auto;
    }
    .company-info { 
      font-size: 8pt; 
      line-height: 1.4;
    }
    .invoice-details { 
      text-align: right; 
      font-size: 8pt;
    }
    .invoice-details h1 { 
      font-size: 16pt; 
      margin-bottom: 10px;
      color: #DC2626;
      font-weight: bold;
    }
    .invoice-details .detail-row { 
      margin-bottom: 5px;
    }
    .invoice-details .label { 
      color: #64748B; 
      display: inline-block;
      width: 140px;
    }
    .invoice-details .value { 
      font-weight: bold;
      font-family: 'Courier New', monospace;
    }
    .customer-address { 
      margin: 15px 0;
      padding: 12px;
      background: #F8FAFC;
      border-left: 4px solid #cbd939;
    }
    .customer-address .label { 
      color: #64748B; 
      font-size: 7pt;
      margin-bottom: 3px;
    }
    .customer-address .name { 
      font-weight: bold; 
      font-size: 10pt;
      margin-bottom: 5px;
    }
    .warning-box {
      background-color: #FEF2F2;
      border: 2px solid #DC2626;
      padding: 20px;
      margin: 20px 0;
      border-radius: 8px;
    }
    .warning-box h2 {
      color: #DC2626;
      font-size: 12pt;
      margin-bottom: 10px;
    }
    .warning-box p {
      font-size: 9pt;
      line-height: 1.6;
      margin-bottom: 10px;
    }
    .table { 
      width: 100%; 
      margin: 15px 0;
      border-collapse: collapse;
    }
    .table thead { 
      background: #cbd939;
    }
    .table th { 
      padding: 10px; 
      text-align: left; 
      font-size: 8pt;
      font-weight: bold;
      border: 1px solid #cbd939;
    }
    .table td { 
      padding: 10px; 
      border: 1px solid #E5E7EB;
      font-size: 9pt;
    }
    .table .text-right { 
      text-align: right;
    }
    .table .text-center { 
      text-align: center;
    }
    .totals { 
      margin-top: 10px;
      float: right;
      width: 280px;
    }
    .totals .row { 
      display: flex; 
      justify-content: space-between;
      padding: 6px 0;
      border-bottom: 1px solid #E5E7EB;
      font-size: 9pt;
    }
    .totals .row.total { 
      background: #f0f7e6;
      border: 2px solid #cbd939;
      padding: 10px;
      margin-top: 8px;
      font-weight: bold;
      font-size: 11pt;
    }
    .payment-info { 
      clear: both;
      margin-top: 120px;
      padding: 12px;
      background: #F8FAFC;
      border-radius: 8px;
    }
    .payment-info h3 { 
      margin-bottom: 8px;
      color: #003d7a;
      font-size: 10pt;
    }
    .payment-info p {
      font-size: 9pt;
    }
    .payment-info .bank-details { 
      margin-top: 10px;
      padding: 10px;
      background: white;
      border-left: 4px solid #cbd939;
    }
    .payment-info .bank-details div { 
      margin-bottom: 3px;
      font-size: 7pt;
    }
    .footer { 
      position: absolute;
      bottom: 20px;
      left: 30px;
      right: 30px;
      padding-top: 12px;
      border-top: 1px solid #E5E7EB;
      text-align: center;
      font-size: 7pt;
      color: #94A3B8;
    }
    html, body {
      position: relative;
      min-height: 100vh;
    }
    body {
      padding-bottom: 80px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <img src="${logoBase64}" alt="Logo" class="logo">
      <div class="company-info" style="margin-top: 15px;">
        <strong>REGIS DATASEC LTD</strong><br>
        71-75 Shelton Street, Covent Garden<br>
        WC2H 9JQ London, United Kingdom<br>
        E-Mail: info@renterauskunft.de<br>
        Web: www.rentnerauskunft.de
      </div>
    </div>
    <div class="invoice-details">
      <h1>${config.title}</h1>
      <div class="detail-row">
        <span class="label">Mahnungsnummer:</span>
        <span class="value">${reminderData.mahnungNumber}</span>
      </div>
      <div class="detail-row">
        <span class="label">Mahnungsdatum:</span>
        <span class="value">${formatDate(new Date())}</span>
      </div>
      <div class="detail-row">
        <span class="label">Rechnungsnummer:</span>
        <span class="value">${reminderData.invoiceNumber}</span>
      </div>
      <div class="detail-row">
        <span class="label">Rechnungsdatum:</span>
        <span class="value">${reminderData.invoiceDate}</span>
      </div>
      <div class="detail-row">
        <span class="label">Kundennummer:</span>
        <span class="value">${reminderData.customerNumber}</span>
      </div>
      <div class="detail-row">
        <span class="label">Auftragsnummer:</span>
        <span class="value" style="font-size: 8pt;">${reminderData.orderNumber}</span>
      </div>
    </div>
  </div>

  <div class="customer-address">
    <div class="label">Rechnungsadresse:</div>
    <div class="name">${reminderData.salutation} ${reminderData.firstName} ${reminderData.lastName}</div>
    <div>${reminderData.street}</div>
    <div>${reminderData.zipCode} ${reminderData.city}</div>
    <div>${reminderData.country === 'DE' ? 'Deutschland' : reminderData.country}</div>
  </div>

  <table class="table">
    <thead>
      <tr>
        <th style="width: 50px;">Pos.</th>
        <th>Beschreibung</th>
        <th class="text-center" style="width: 80px;">Menge</th>
        <th class="text-right" style="width: 100px;">Einzelpreis</th>
        <th class="text-right" style="width: 100px;">Gesamt</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-center">1</td>
        <td>
          <strong>Dienstleistung zur Anforderung von Rentenunterlagen</strong><br>
          <span style="font-size: 9pt; color: #64748B;">Strukturierte Erfassung, Aufbereitung und formgerechte Weiterleitung Ihrer personenbezogenen Daten und Anforderungsinformationen an die zuständige Stelle der Deutschen Rentenversicherung gemäß den gesetzlichen Vorgaben zur Beantragung von Rentenunterlagen, Auskünften oder Bescheinigungen</span>
        </td>
        <td class="text-center">1</td>
        <td class="text-right">25,13 €</td>
        <td class="text-right"><strong>25,13 €</strong></td>
      </tr>
      <tr>
        <td class="text-center">2</td>
        <td>
          <strong>Verzugskosten nach § 286 BGB</strong><br>
          <span style="font-size: 9pt; color: #64748B;">Pauschale Verzugskosten für Verwaltungsaufwand</span>
        </td>
        <td class="text-center">1</td>
        <td class="text-right">${config.verzugskosten.toFixed(2)} €</td>
        <td class="text-right"><strong>${config.verzugskosten.toFixed(2)} €</strong></td>
      </tr>
      ${config.mahngebuehr > 0 ? `<tr>
        <td class="text-center">3</td>
        <td>
          <strong>Mahngebühren</strong><br>
          <span style="font-size: 9pt; color: #64748B;">${reminderData.stufe === 2 ? 'Mahngebühr (1. Mahnung)' : 'Mahngebühren (1. Mahnung: 2,50 € + 2. Mahnung: 2,50 €)'}</span>
        </td>
        <td class="text-center">1</td>
        <td class="text-right">${config.mahngebuehr.toFixed(2)} €</td>
        <td class="text-right"><strong>${config.mahngebuehr.toFixed(2)} €</strong></td>
      </tr>` : ''}
    </tbody>
  </table>

  <div class="totals">
    <div class="row">
      <span>Zwischensumme (Netto):</span>
      <span>25,13 €</span>
    </div>
    <div class="row">
      <span>zzgl. 19% MwSt.:</span>
      <span>4,77 €</span>
    </div>
    <div class="row">
      <span>Rechnungsbetrag:</span>
      <span>29,90 €</span>
    </div>
    <div class="row">
      <span>Verzugskosten nach § 286 BGB:</span>
      <span>${config.verzugskosten.toFixed(2)} €</span>
    </div>
    ${config.mahngebuehr > 0 ? `<div class="row">
      <span>Mahngebühren:</span>
      <span>${config.mahngebuehr.toFixed(2)} €</span>
    </div>` : ''}
    <div class="row total">
      <span>Gesamtbetrag:</span>
      <span>${reminderData.totalAmount.toFixed(2)} €</span>
    </div>
  </div>

  <div class="payment-info">
    <h3>Zahlungshinweis</h3>
    <p style="font-size: 9pt; margin-bottom: 15px;">
      ${config.text}<br><br>
      Bitte überweisen Sie den Gesamtbetrag von <strong>${reminderData.totalAmount.toFixed(2)} €</strong> <strong>umgehend</strong> auf folgendes Konto:
    </p>
    <div class="bank-details">
      <div><strong>Kontoinhaber:</strong> REGIS DATASEC LTD</div>
      <div><strong>IBAN:</strong> GB63REVO23012067452781</div>
      <div><strong>BIC:</strong> REVOGB21</div>
      <div style="margin-top: 10px;"><strong>Verwendungszweck:</strong> Mahnung ${reminderData.mahnungNumber}</div>
    </div>
    ${reminderData.stufe === 3 ? `
    <p style="margin-top: 15px; color: #DC2626; font-weight: bold; font-size: 9pt;">
      ⚠️ WICHTIG: Bei weiterem Zahlungsverzug werden wir rechtliche Schritte einleiten und ein gerichtliches Mahnverfahren beantragen. Dies führt zu zusätzlichen Kosten.
    </p>
    ` : ''}
  </div>

  <div class="footer">
    <div><strong>REGIS DATASEC LTD</strong></div>
    <div>71-75 Shelton Street, Covent Garden, WC2H 9JQ London, United Kingdom</div>
    <div>E-Mail: info@renterauskunft.de | Web: www.rentnerauskunft.de</div>
  </div>
</body>
</html>
    `;

    fs.writeFileSync(filePath, htmlContent, 'utf-8');
    console.log('✅ Mahnung (HTML) erstellt:', fileName);

    const pdfFileName = fileName.replace('.html', '.pdf');
    const pdfFilePath = path.join(remindersDir, pdfFileName);

    try {
      await convertHtmlToPdf(filePath, pdfFilePath);
      console.log('✅ Mahnung (PDF) erstellt:', pdfFileName);

      fs.unlinkSync(filePath);

      return {
        success: true,
        filePath: pdfFilePath,
        fileName: pdfFileName,
        mahnungNumber: reminderData.mahnungNumber
      };
    } catch (pdfError) {
      console.error('❌ PDF-Konvertierung fehlgeschlagen, behalte HTML:', pdfError);
      return {
        success: true,
        filePath,
        fileName,
        mahnungNumber: reminderData.mahnungNumber
      };
    }

  } catch (error) {
    console.error('❌ Fehler bei Mahnungserstellung:', error);
    throw error;
  }
}

export function getReminderFee(stufe: number): number {
  const config = REMINDER_CONFIG[stufe as keyof typeof REMINDER_CONFIG];
  if (!config) return 0;
  return config.verzugskosten + config.mahngebuehr;
}

export function getReminderDaysOverdue(stufe: number): number {
  return REMINDER_CONFIG[stufe as keyof typeof REMINDER_CONFIG]?.daysOverdue || 0;
}
