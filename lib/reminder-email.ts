import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import db from './db';

const transporter = nodemailer.createTransport({
  host: 'server380.web-hosting.com',
  port: 465,
  secure: true,
  auth: {
    user: 'info@rentnerauskunft.de',
    pass: 'NaskoOx187!'
  }
});

interface ReminderEmailData {
  customerEmail: string;
  customerName: string;
  mahnungNumber: string;
  invoiceNumber: string;
  mahnungPath: string;
  stufe: number;
  totalAmount: number;
}

function getEmailTemplateFromDB(stufe: number): { subject: string; body: string } {
  const templateType = stufe === 1 ? 'Freundliche Erinnerung' : stufe === 2 ? '1. Mahnung' : 'Letzte Mahnung';

  const template = db.prepare("SELECT betreff as subject, inhalt as body FROM email_vorlagen WHERE vorlagen_typ = ? AND status = 'Aktiv' ORDER BY erstellt_am DESC LIMIT 1").get(templateType) as { subject: string; body: string } | undefined;

  if (!template) {
    // Fallback if no active template found
    const fallbackTemplate = db.prepare('SELECT betreff as subject, inhalt as body FROM email_vorlagen WHERE vorlagen_typ = ? ORDER BY erstellt_am DESC LIMIT 1').get(templateType) as { subject: string; body: string } | undefined;

    if (fallbackTemplate) return fallbackTemplate;

    throw new Error(`Email-Template für Stufe ${stufe} (${templateType}) nicht gefunden`);
  }

  return template;
}

export async function sendReminderEmail(data: ReminderEmailData): Promise<void> {
  try {
    const pdfBuffer = fs.readFileSync(data.mahnungPath);
    const logoPath = path.join(process.cwd(), 'public', 'logo.png');
    const config = getEmailTemplateFromDB(data.stufe);

    // Berechne Deadline (7 Tage ab heute)
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 7);
    const deadlineStr = deadline.toLocaleDateString('de-DE');

    // Verzugsdatum (7 Tage nach Rechnungsdatum)
    const verzugDate = new Date();
    verzugDate.setDate(verzugDate.getDate() - (data.stufe * 7));
    const verzugDateStr = verzugDate.toLocaleDateString('de-DE');

    // Platzhalter ersetzen
    const emailBody = config.body
      .replace(/{invoiceNumber}/g, data.invoiceNumber)
      .replace(/{invoiceDate}/g, verzugDateStr)
      .replace(/{verzugDate}/g, verzugDateStr)
      .replace(/{deadline}/g, deadlineStr)
      .replace(/{totalAmount}/g, data.totalAmount.toFixed(2));

    const emailSubject = config.subject
      .replace(/{invoiceNumber}/g, data.invoiceNumber)
      .replace(/{totalAmount}/g, data.totalAmount.toFixed(2));

    const htmlContent = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      color: #0F172A;
      margin: 0;
      padding: 0;
      background-color: #F8FAFC;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .logo {
      text-align: center;
      padding: 40px 20px 30px;
      background-color: #ffffff;
    }
    .logo img {
      max-width: 220px;
      height: auto;
    }
    .content {
      padding: 40px 30px;
      white-space: pre-line;
    }
    .content p {
      margin-bottom: 15px;
      color: #334155;
      font-size: 15px;
    }
    .payment-box {
      background-color: #F8FAFC;
      padding: 20px;
      margin: 25px 0;
      border-radius: 8px;
      border: 2px solid #003d7a;
    }
    .payment-box h2 {
      color: #003d7a;
      font-size: 18px;
      margin-top: 0;
      margin-bottom: 15px;
    }
    .payment-box .bank-details {
      background-color: white;
      padding: 15px;
      border-radius: 6px;
      margin-top: 15px;
    }
    .payment-box .bank-details p {
      margin: 5px 0;
      font-size: 14px;
    }
    .signature {
      margin-top: 40px;
      padding-top: 30px;
      border-top: 2px solid #E5E7EB;
    }
    .signature-info p {
      margin: 3px 0;
      font-size: 13px;
      color: #64748B;
    }
    .signature-info strong {
      color: #003d7a;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <img src="cid:company-logo@rentnerauskunft.de" alt="Rentnerauskunft.de Logo" width="220" height="auto">
    </div>
    
    <div class="content">
      <p>${emailBody}</p>
      
      <div class="payment-box">
        <h2>Zahlungsinformationen</h2>
        <p style="margin-bottom: 15px;">Bitte überweisen Sie den Gesamtbetrag von <strong style="color: #003d7a; font-size: 18px;">${data.totalAmount.toFixed(2)} €</strong> auf folgendes Konto:</p>
        <div class="bank-details">
          <p><strong>Kontoinhaber:</strong> REGIS DATASEC LTD</p>
          <p><strong>IBAN:</strong> GB63REVO23012067452781</p>
          <p><strong>BIC:</strong> REVOGB21</p>
          <p style="margin-top: 10px;"><strong>Verwendungszweck:</strong> ${data.mahnungNumber}</p>
        </div>
      </div>
      
      <p>Im Anhang finden Sie die detaillierte Mahnung als PDF-Dokument.</p>
      
      <p>Sollten Sie die Zahlung bereits veranlasst haben, betrachten Sie dieses Schreiben bitte als gegenstandslos.</p>
      
      <p style="margin-top: 30px;">Mit freundlichen Grüßen</p>
      
      <div class="signature">
        <div class="signature-info">
          <p><strong>REGIS DATASEC LTD</strong></p>
          <p>71-75 Shelton Street, Covent Garden</p>
          <p>WC2H 9JQ London, United Kingdom</p>
          <p style="margin-top: 8px;">E-Mail: info@rentnerauskunft.de</p>
          <p>Web: www.rentnerauskunft.de</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    const info = await transporter.sendMail({
      from: '"Rentnerauskunft.de" <info@rentnerauskunft.de>',
      to: data.customerEmail,
      subject: emailSubject,
      html: htmlContent,
      attachments: [
        {
          filename: `Mahnung-${data.mahnungNumber}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        },
        {
          filename: 'logo.png',
          path: logoPath,
          cid: 'company-logo@rentnerauskunft.de',
          contentDisposition: 'inline',
          encoding: 'base64'
        }
      ]
    });

    console.log('✅ Mahnungs-E-Mail gesendet:', info.messageId);

  } catch (error) {
    console.error('❌ Fehler beim Mahnungs-E-Mail-Versand:', error);
    throw error;
  }
}
