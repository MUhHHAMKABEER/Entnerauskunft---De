import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// E-Mail Transporter konfigurieren
const transporter = nodemailer.createTransport({
  host: 'server380.web-hosting.com',
  port: 465,
  secure: true, // SSL/TLS
  auth: {
    user: 'info@rentnerauskunft.de',
    pass: 'NaskoOx187!'
  }
});

interface EmailData {
  customerEmail: string;
  customerName: string;
  invoiceNumber: string;
  invoicePath: string;
  orderDetails: string;
}

/**
 * Sendet Bestätigungs-E-Mail mit Rechnung an Kunden
 */
export async function sendConfirmationEmail(data: EmailData): Promise<void> {
  try {
    // Lese PDF-Datei und Logo
    const pdfBuffer = fs.readFileSync(data.invoicePath);
    const logoPath = path.join(process.cwd(), 'public', 'logo.png');

    // HTML E-Mail Template
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
    }
    .content h1 {
      color: #003d7a;
      font-size: 24px;
      margin-bottom: 20px;
      margin-top: 0;
    }
    .content p {
      margin-bottom: 15px;
      color: #334155;
      font-size: 15px;
    }
    .info-box {
      background-color: #F0F7E6;
      border-left: 4px solid #cbd939;
      padding: 20px;
      margin: 25px 0;
    }
    .info-box p {
      margin: 8px 0;
      font-size: 14px;
    }
    .info-box strong {
      color: #003d7a;
    }
    .next-steps {
      background-color: #F8FAFC;
      padding: 20px;
      margin: 25px 0;
      border-radius: 8px;
    }
    .next-steps h2 {
      color: #003d7a;
      font-size: 18px;
      margin-top: 0;
      margin-bottom: 15px;
    }
    .next-steps ol {
      margin: 0;
      padding-left: 20px;
    }
    .next-steps li {
      margin-bottom: 10px;
      color: #334155;
    }
    .signature {
      margin-top: 40px;
      padding-top: 30px;
      border-top: 2px solid #E5E7EB;
    }
    .signature-content {
      display: table;
      width: 100%;
    }
    .signature-logo {
      display: table-cell;
      vertical-align: middle;
      width: 120px;
      padding-right: 20px;
    }
    .signature-logo img {
      max-width: 100px;
      height: auto;
    }
    .signature-info {
      display: table-cell;
      vertical-align: middle;
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
    <!-- Logo Header -->
    <div class="logo">
      <img src="cid:company-logo@rentnerauskunft.de" alt="Rentnerauskunft.de Logo" width="220" height="auto" style="display: block; max-width: 220px; height: auto; border: 0;">
    </div>
    
    <!-- Content -->
    <div class="content">
      <h1>Vielen Dank für Ihre Bestellung</h1>
      
      <p>Sehr geehrte/r ${data.customerName},</p>
      
      <p>wir haben Ihre Anforderung erfolgreich erhalten und werden diese umgehend bearbeiten.</p>
      
      <!-- Order Info -->
      <div class="info-box">
        <p><strong>Ihre Bestelldetails:</strong></p>
        <p><strong>Rechnungsnummer:</strong> ${data.invoiceNumber}</p>
        <p><strong>Leistung:</strong> ${data.orderDetails}</p>
        <p><strong>Betrag:</strong> 29,90 € (inkl. MwSt.)</p>
      </div>
      
      <p>Im Anhang finden Sie Ihre Rechnung als PDF-Dokument.</p>
      
      <div style="background-color: #f0f7e6; border-left: 4px solid #cbd939; padding: 20px; margin: 25px 0; border-radius: 8px;">
        <h2 style="color: #003d7a; font-size: 18px; margin-top: 0; margin-bottom: 15px;">💳 Bequem online bezahlen</h2>
        <p style="margin-bottom: 15px;">Bezahlen Sie schnell und sicher mit Kreditkarte, Apple Pay oder Google Pay:</p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="https://buy.stripe.com/8wW28sfxUeMz8y4257" style="display: inline-block; background-color: #003d7a; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Jetzt online bezahlen</a>
        </div>
        <p style="font-size: 13px; color: #64748B; margin-top: 15px; text-align: center;">Oder überweisen Sie den Betrag auf folgendes Konto:</p>
        <div style="background-color: white; padding: 15px; margin-top: 10px; border-radius: 6px;">
          <p style="margin: 5px 0; font-size: 14px;"><strong>IBAN:</strong> GB63REVO23012067452781</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>BIC:</strong> REVOGB21</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Verwendungszweck:</strong> ${data.invoiceNumber}</p>
        </div>
      </div>
      
      <p style="font-size: 13px; color: #64748B;">Bitte begleichen Sie die Rechnung innerhalb von 7 Tagen.</p>
      
      <!-- Next Steps -->
      <div class="next-steps">
        <h2>Wie geht es weiter?</h2>
        <ol>
          <li><strong>Sofortige Weiterleitung:</strong> Ihre Anforderung wurde bereits automatisch an die zuständige Stelle der Deutschen Rentenversicherung weitergeleitet.</li>
          <li><strong>Bearbeitung durch die DRV:</strong> Die Deutsche Rentenversicherung bearbeitet Ihre Anfrage und erstellt die gewünschten Unterlagen.</li>
          <li><strong>Postalischer Versand:</strong> Die Unterlagen werden Ihnen von der Deutschen Rentenversicherung direkt per Post zugesandt.</li>
        </ol>
      </div>
      
      <p><strong>Wichtiger Hinweis:</strong> Die Deutsche Rentenversicherung verwendet für den Versand ausschließlich die bei ihr hinterlegte Adresse. Sollten Sie umgezogen sein, empfehlen wir Ihnen, Ihre Adresse vorab bei der Rentenversicherung zu aktualisieren.</p>
      
      <p>Bei Fragen stehen wir Ihnen jederzeit gerne zur Verfügung.</p>
      
      <!-- Signature -->
      <div class="signature">
        <div class="signature-content">
          <div class="signature-logo">
            <img src="cid:company-logo@rentnerauskunft.de" alt="Logo" width="100" height="auto" style="display: block; max-width: 100px; height: auto; border: 0;">
          </div>
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
  </div>
</body>
</html>
    `;

    // E-Mail senden
    const info = await transporter.sendMail({
      from: '"Rentnerauskunft.de" <info@rentnerauskunft.de>',
      to: data.customerEmail,
      subject: `Ihre Bestellung - Rechnung ${data.invoiceNumber}`,
      html: htmlContent,
      attachments: [
        {
          filename: `Rechnung-Nr-${data.invoiceNumber}.pdf`,
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

    console.log('✅ E-Mail gesendet:', info.messageId);

  } catch (error) {
    console.error('❌ Fehler beim E-Mail-Versand:', error);
    throw error;
  }
}

/**
 * Verifiziert E-Mail-Konfiguration
 */
export async function verifyEmailConfig(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log('✅ E-Mail-Server verbunden');
    return true;
  } catch (error) {
    console.error('❌ E-Mail-Server Verbindungsfehler:', error);
    return false;
  }
}
