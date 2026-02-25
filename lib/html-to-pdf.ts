import puppeteer from 'puppeteer';
import fs from 'fs';

/**
 * Konvertiert HTML zu PDF mit Puppeteer
 */
export async function convertHtmlToPdf(htmlPath: string, pdfPath: string): Promise<void> {
  let browser;
  
  try {
    // Starte Browser
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Lade HTML-Datei
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // Generiere PDF
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm'
      }
    });
    
    console.log('✅ PDF erstellt:', pdfPath);
    
  } catch (error) {
    console.error('❌ Fehler bei PDF-Konvertierung:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
