const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const kundeId = 23;

console.log('\n=== Generiere echte Rechnung für Kunde #' + kundeId + ' ===\n');

const kunde = db.prepare('SELECT * FROM anfragen WHERE id = ?').get(kundeId);
if (!kunde) {
  console.log('❌ Kunde nicht gefunden!');
  process.exit(1);
}

console.log(`Kunde: ${kunde.vorname} ${kunde.familienname}`);
console.log(`Rechnungsnummer: ${kunde.invoice_number}\n`);

// Logo Base64
function getLogoBase64() {
  const logoPath = path.join(process.cwd(), 'public', 'logo.png');
  if (fs.existsSync(logoPath)) {
    const logoBuffer = fs.readFileSync(logoPath);
    return `data:image/png;base64,${logoBuffer.toString('base64')}`;
  }
  return '';
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

async function generateInvoicePDF() {
  const logoBase64 = getLogoBase64();
  
  const htmlContent = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rechnung ${kunde.invoice_number}</title>
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
      color: #003d7a;
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
      font-size: 8pt;
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
      ${logoBase64 ? `<img src="${logoBase64}" alt="Logo" class="logo">` : ''}
      <div class="company-info" style="margin-top: 15px;">
        <strong>REGIS DATASEC LTD</strong><br>
        71-75 Shelton Street, Covent Garden<br>
        WC2H 9JQ London, United Kingdom<br>
        E-Mail: info@renterauskunft.de<br>
        Web: www.rentnerauskunft.de
      </div>
    </div>
    <div class="invoice-details">
      <h1>RECHNUNG</h1>
      <div class="detail-row">
        <span class="label">Rechnungsnummer:</span>
        <span class="value">${kunde.invoice_number}</span>
      </div>
      <div class="detail-row">
        <span class="label">Rechnungsdatum:</span>
        <span class="value">${formatDate(new Date(kunde.erstellt_am))}</span>
      </div>
      <div class="detail-row">
        <span class="label">Kundennummer:</span>
        <span class="value">${kunde.customer_number}</span>
      </div>
      <div class="detail-row">
        <span class="label">Auftragsnummer:</span>
        <span class="value" style="font-size: 8pt;">${kunde.order_number}</span>
      </div>
    </div>
  </div>

  <div class="customer-address">
    <div class="label">Rechnungsadresse:</div>
    <div class="name">${kunde.anrede} ${kunde.vorname} ${kunde.familienname}</div>
    <div>${kunde.strasse} ${kunde.hausnummer}</div>
    <div>${kunde.plz} ${kunde.ort}</div>
    <div>Deutschland</div>
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
    <div class="row total">
      <span>Gesamtbetrag (Brutto):</span>
      <span>29,90 €</span>
    </div>
  </div>

  <div class="payment-info">
    <h3>Zahlungshinweis</h3>
    <p style="font-size: 9pt; margin-bottom: 15px;">
      Bitte überweisen Sie den Rechnungsbetrag von <strong>29,90 €</strong> innerhalb von <strong>7 Tagen</strong> auf folgendes Konto:
    </p>
    <div class="bank-details">
      <div><strong>Kontoinhaber:</strong> REGIS DATASEC LTD</div>
      <div><strong>IBAN:</strong> GB63REVO23012067452781</div>
      <div><strong>BIC:</strong> REVOGB21</div>
      <div style="margin-top: 10px;"><strong>Verwendungszweck:</strong> Rechnung ${kunde.invoice_number}</div>
    </div>
  </div>

  <div class="footer">
    <div><strong>REGIS DATASEC LTD</strong></div>
    <div>71-75 Shelton Street, Covent Garden, WC2H 9JQ London, United Kingdom</div>
    <div>E-Mail: info@renterauskunft.de | Web: www.rentnerauskunft.de</div>
  </div>
</body>
</html>
  `;

  const invoicesDir = path.join(process.cwd(), 'data', 'invoices');
  if (!fs.existsSync(invoicesDir)) {
    fs.mkdirSync(invoicesDir, { recursive: true });
  }

  const pdfFileName = `Rechnung_${kunde.invoice_number}.pdf`;
  const pdfFilePath = path.join(invoicesDir, pdfFileName);

  console.log('📄 Generiere PDF mit Puppeteer...');
  
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: pdfFilePath,
    format: 'A4',
    printBackground: true,
    margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
  });
  await browser.close();

  console.log('✅ Rechnung (PDF) erstellt:', pdfFileName);
  console.log('   Pfad:', pdfFilePath);

  db.prepare('UPDATE anfragen SET invoice_path = ?, invoice_filename = ? WHERE id = ?').run(
    pdfFilePath,
    pdfFileName,
    kundeId
  );

  console.log('✅ Datenbank aktualisiert\n');
  console.log('🔗 Teste jetzt: http://localhost:3000/admin/anfragen/' + kundeId);
  console.log('   Klicke auf "Rechnung herunterladen"\n');
}

generateInvoicePDF().then(() => db.close()).catch(err => {
  console.error('❌ Fehler:', err);
  db.close();
  process.exit(1);
});
