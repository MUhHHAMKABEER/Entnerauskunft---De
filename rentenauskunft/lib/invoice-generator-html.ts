import fs from 'fs';
import path from 'path';
import { convertHtmlToPdf } from './html-to-pdf';

// Helper: Formatiere Datum für Rechnung
function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

interface CustomerData {
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
}

interface InvoiceResult {
  success: boolean;
  filePath: string;
  fileName: string;
  invoiceNumber: string;
}

/**
 * Generiere HTML-Rechnung für Rentenauskunft Service
 * Diese kann später mit Puppeteer oder einem anderen Tool zu PDF konvertiert werden
 */
export async function generateInvoiceHTML(customerData: CustomerData): Promise<InvoiceResult> {
  try {
    // Erstelle invoices Verzeichnis falls nicht vorhanden
    const invoicesDir = path.join(process.cwd(), 'data', 'invoices');
    if (!fs.existsSync(invoicesDir)) {
      fs.mkdirSync(invoicesDir, { recursive: true });
    }

    const fileName = `Rechnung_${customerData.invoiceNumber}_${customerData.lastName}.html`;
    const filePath = path.join(invoicesDir, fileName);

    // HTML-Template für Rechnung
    const htmlContent = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rechnung ${customerData.invoiceNumber}</title>
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
      <img src="https://i.postimg.cc/6RVsw6pK/logo.png" alt="Logo" class="logo" onerror="this.style.display='none'">
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
        <span class="value">${customerData.invoiceNumber}</span>
      </div>
      <div class="detail-row">
        <span class="label">Rechnungsdatum:</span>
        <span class="value">${formatDate(new Date())}</span>
      </div>
      <div class="detail-row">
        <span class="label">Kundennummer:</span>
        <span class="value">${customerData.customerNumber}</span>
      </div>
      <div class="detail-row">
        <span class="label">Auftragsnummer:</span>
        <span class="value" style="font-size: 8pt;">${customerData.orderNumber}</span>
      </div>
    </div>
  </div>

  <div class="customer-address">
    <div class="label">Rechnungsadresse:</div>
    <div class="name">${customerData.salutation} ${customerData.firstName} ${customerData.lastName}</div>
    <div>${customerData.street}</div>
    <div>${customerData.zipCode} ${customerData.city}</div>
    <div>${customerData.country === 'DE' ? 'Deutschland' : customerData.country}</div>
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
      <div><strong>IBAN:</strong> GB07REVO23012053002632</div>
      <div><strong>BIC:</strong> REVOGB21</div>
      <div style="margin-top: 10px;"><strong>Verwendungszweck:</strong> Rechnung ${customerData.invoiceNumber}</div>
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

    // Speichere HTML
    fs.writeFileSync(filePath, htmlContent, 'utf-8');
    console.log('✅ Rechnung (HTML) erstellt:', fileName);

    // Konvertiere zu PDF
    const pdfFileName = fileName.replace('.html', '.pdf');
    const pdfFilePath = path.join(invoicesDir, pdfFileName);
    
    try {
      await convertHtmlToPdf(filePath, pdfFilePath);
      console.log('✅ Rechnung (PDF) erstellt:', pdfFileName);
      
      // Lösche HTML-Datei (nur PDF behalten)
      fs.unlinkSync(filePath);
      
      return {
        success: true,
        filePath: pdfFilePath,
        fileName: pdfFileName,
        invoiceNumber: customerData.invoiceNumber
      };
    } catch (pdfError) {
      console.error('❌ PDF-Konvertierung fehlgeschlagen, behalte HTML:', pdfError);
      // Falls PDF fehlschlägt, behalte HTML
      return {
        success: true,
        filePath,
        fileName,
        invoiceNumber: customerData.invoiceNumber
      };
    }

  } catch (error) {
    console.error('❌ Fehler bei HTML-Rechnungserstellung:', error);
    throw error;
  }
}

// Helper-Funktion: Nächste Nummer generieren
export function getNextInvoiceNumber(db: any): string {
  const result = db.prepare(`
    SELECT invoice_number FROM anfragen 
    WHERE invoice_number IS NOT NULL 
    ORDER BY CAST(invoice_number AS INTEGER) DESC 
    LIMIT 1
  `).get();
  
  if (!result) {
    return '20251180'; // Startwert
  }
  
  const currentNumber = parseInt(result.invoice_number);
  return (currentNumber + 1).toString();
}

export function getNextCustomerNumber(db: any): string {
  const result = db.prepare(`
    SELECT customer_number FROM anfragen 
    WHERE customer_number IS NOT NULL 
    ORDER BY CAST(customer_number AS INTEGER) DESC 
    LIMIT 1
  `).get();
  
  if (!result) {
    return '15230'; // Startwert
  }
  
  const currentNumber = parseInt(result.customer_number);
  return (currentNumber + 1).toString();
}

// Generiere Bestellnummer
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
  const hash = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${timestamp}-${random}-${hash}`;
}
