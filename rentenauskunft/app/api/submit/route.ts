import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { generateInvoiceHTML, getNextInvoiceNumber, getNextCustomerNumber, generateOrderNumber } from '@/lib/invoice-generator-html';
import { sendConfirmationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validierung
    if (!data.email || !data.vorname || !data.familienname || !data.versicherungsnummer) {
      return NextResponse.json(
        { success: false, error: 'Pflichtfelder fehlen' },
        { status: 400 }
      );
    }

    // Generiere Nummern
    const invoiceNumber = getNextInvoiceNumber(db);
    const customerNumber = getNextCustomerNumber(db);
    const orderNumber = generateOrderNumber();

    // IP-Adresse erfassen
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Geräte-Info parsen
    const isMobile = /Mobile|Android|iPhone/i.test(userAgent);
    const geraet = isMobile ? 'Mobile' : 'Desktop';
    
    let browser = 'Unknown';
    if (userAgent.includes('Edg/')) browser = 'Edge';
    else if (userAgent.includes('Chrome/')) browser = 'Chrome';
    else if (userAgent.includes('Firefox/')) browser = 'Firefox';
    else if (userAgent.includes('Safari/') && !userAgent.includes('Chrome')) browser = 'Safari';
    
    let os = 'Unknown';
    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac OS')) os = 'macOS';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iOS') || userAgent.includes('iPhone')) os = 'iOS';

    // Speichere in Datenbank
    const stmt = db.prepare(`
      INSERT INTO anfragen (
        invoice_number, customer_number, order_number,
        email, anrede, vorname, familienname, geburtsname, geburtsdatum, geburtsort,
        strasse, hausnummer, plz, ort, land,
        versicherungsnummer, rentenversicherungstraeger,
        staatsangehoerigkeit, familienstand, kinder_anzahl, telefon,
        antragstyp, antragstyp_label, gewuenschter_rentenbeginn,
        zeitraum_von, zeitraum_bis, jahr_von, jahr_bis,
        panr, verstorbener_vorname, verstorbener_familienname, verstorbener_geburtsname,
        status, ip_adresse, user_agent, geraet, browser, betriebssystem
      ) VALUES (
        ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?,
        ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?,
        ?, ?, ?, ?,
        ?, ?, ?, ?,
        'neu', ?, ?, ?, ?, ?
      )
    `);

    const result = stmt.run(
      invoiceNumber, customerNumber, orderNumber,
      data.email, data.anrede, data.vorname, data.familienname, 
      data.geburtsname || null, data.geburtsdatum || null, data.geburtsort || null,
      data.strasse || null, data.hausnummer || null, data.plz || null, 
      data.ort || null, data.land || 'Deutschland',
      data.versicherungsnummer || null, data.rentenversicherungstraeger || null,
      data.staatsangehoerigkeit || null, data.familienstand || null, 
      data.kinder_anzahl || null, data.telefon || null,
      data.antragstyp || null, data.antragstyp_label || null, data.gewuenschter_rentenbeginn || null,
      data.zeitraum_von || null, data.zeitraum_bis || null, data.jahr_von || null, data.jahr_bis || null,
      data.panr || null, data.verstorbener_vorname || null, data.verstorbener_familienname || null, data.verstorbener_geburtsname || null,
      ip, userAgent, geraet, browser, os
    );

    // Generiere Rechnung automatisch (HTML)
    let invoicePath = null;
    let invoiceFileName = null;
    
    try {
      const invoiceResult = await generateInvoiceHTML({
        invoiceNumber,
        customerNumber,
        orderNumber,
        salutation: data.anrede || 'Herr/Frau',
        firstName: data.vorname,
        lastName: data.familienname,
        street: `${data.strasse || ''} ${data.hausnummer || ''}`.trim(),
        zipCode: data.plz || '',
        city: data.ort || '',
        country: data.land || 'DE'
      });
      
      if (invoiceResult.success) {
        invoicePath = invoiceResult.filePath;
        invoiceFileName = invoiceResult.fileName;
        
        // Update DB mit Rechnungs-Pfad
        db.prepare(`
          UPDATE anfragen 
          SET invoice_path = ?, invoice_filename = ?
          WHERE id = ?
        `).run(invoicePath, invoiceFileName, result.lastInsertRowid);
        
        console.log('✅ Rechnung erstellt:', invoiceFileName);
      }
    } catch (pdfError) {
      console.error('❌ Fehler bei Rechnungserstellung:', pdfError);
      // Weiter ohne Rechnung - kann später manuell erstellt werden
    }

    // E-Mail an Kunden senden
    if (invoicePath && invoiceFileName) {
      try {
        await sendConfirmationEmail({
          customerEmail: data.email,
          customerName: `${data.anrede || ''} ${data.vorname} ${data.familienname}`.trim(),
          invoiceNumber,
          invoicePath,
          orderDetails: data.antragstyp_label || 'Rentenunterlagen'
        });
        console.log('✅ Bestätigungs-E-Mail gesendet an:', data.email);
      } catch (emailError) {
        console.error('❌ Fehler beim E-Mail-Versand:', emailError);
        // Weiter ohne E-Mail - Rechnung ist trotzdem erstellt
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Anfrage erfolgreich übermittelt',
      data: {
        invoiceNumber,
        customerNumber,
        orderNumber,
        id: result.lastInsertRowid,
        invoiceGenerated: !!invoicePath
      }
    });

  } catch (error) {
    console.error('❌ Fehler beim Speichern:', error);
    return NextResponse.json(
      { success: false, error: 'Serverfehler beim Speichern der Anfrage' },
      { status: 500 }
    );
  }
}
