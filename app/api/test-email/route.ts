import { NextResponse } from 'next/server';
import { sendConfirmationEmail } from '@/lib/email';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    // Finde eine existierende PDF-Rechnung für den Test
    const invoicesDir = path.join(process.cwd(), 'data', 'invoices');
    const pdfFiles = fs.readdirSync(invoicesDir).filter(f => f.endsWith('.pdf'));
    
    if (pdfFiles.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Keine PDF-Rechnung für Test gefunden'
      }, { status: 404 });
    }
    
    const testPdf = pdfFiles[0];
    const testPdfPath = path.join(invoicesDir, testPdf);
    
    // Sende Test-E-Mail
    await sendConfirmationEmail({
      customerEmail: 'svenja.koch877@gmail.com', // Test-E-Mail
      customerName: 'Test Kunde',
      invoiceNumber: '20251999',
      invoicePath: testPdfPath,
      orderDetails: 'Test-Bestellung - Logo-Anzeige Prüfung'
    });
    
    return NextResponse.json({
      success: true,
      message: 'Test-E-Mail mit Logo erfolgreich gesendet an svenja.koch877@gmail.com',
      pdfUsed: testPdf
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Fehler beim E-Mail-Versand',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
