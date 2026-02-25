import db from '../lib/db';
import { processOverdueInvoices } from '../lib/reminder-system';

async function testReminderSystem() {
  console.log('🧪 Test: Mahnsystem');
  console.log('='.repeat(50));

  console.log('\n📊 Aktuelle Statistiken:');
  
  const totalInvoices = db.prepare('SELECT COUNT(*) as count FROM anfragen').get() as { count: number };
  console.log(`   Gesamt Anfragen: ${totalInvoices.count}`);

  const unpaidInvoices = db.prepare('SELECT COUNT(*) as count FROM anfragen WHERE payment_status = "unbezahlt"').get() as { count: number };
  console.log(`   Unbezahlte Rechnungen: ${unpaidInvoices.count}`);

  const paidInvoices = db.prepare('SELECT COUNT(*) as count FROM anfragen WHERE payment_status = "bezahlt"').get() as { count: number };
  console.log(`   Bezahlte Rechnungen: ${paidInvoices.count}`);

  const totalReminders = db.prepare('SELECT COUNT(*) as count FROM mahnungen').get() as { count: number };
  console.log(`   Gesamt Mahnungen: ${totalReminders.count}`);

  const sentReminders = db.prepare('SELECT COUNT(*) as count FROM mahnungen WHERE versendet = 1').get() as { count: number };
  console.log(`   Versendete Mahnungen: ${sentReminders.count}`);

  console.log('\n🔍 Unbezahlte Rechnungen (Details):');
  const unpaid = db.prepare(`
    SELECT 
      id, 
      invoice_number, 
      vorname, 
      familienname, 
      email,
      erstellt_am,
      CAST((julianday('now') - julianday(erstellt_am)) AS INTEGER) as tage_seit_rechnung
    FROM anfragen 
    WHERE payment_status = 'unbezahlt'
    ORDER BY erstellt_am ASC
    LIMIT 10
  `).all() as any[];

  if (unpaid.length === 0) {
    console.log('   ✅ Keine unbezahlten Rechnungen gefunden');
  } else {
    unpaid.forEach((invoice: any) => {
      console.log(`   - ${invoice.invoice_number} | ${invoice.vorname} ${invoice.familienname}`);
      console.log(`     E-Mail: ${invoice.email}`);
      console.log(`     Erstellt: ${new Date(invoice.erstellt_am).toLocaleDateString('de-DE')}`);
      console.log(`     Tage überfällig: ${invoice.tage_seit_rechnung}`);
      
      const reminders = db.prepare('SELECT * FROM mahnungen WHERE anfrage_id = ?').all(invoice.id) as any[];
      if (reminders.length > 0) {
        console.log(`     Mahnungen: ${reminders.length}`);
        reminders.forEach((r: any) => {
          console.log(`       • Stufe ${r.mahnung_stufe} - ${r.mahnung_number} - ${r.versendet ? '✓ Versendet' : '○ Nicht versendet'}`);
        });
      } else {
        console.log(`     Mahnungen: Keine`);
      }
      console.log('');
    });
  }

  console.log('\n🚀 Starte Mahnsystem-Verarbeitung...\n');
  
  try {
    const results = await processOverdueInvoices();
    
    console.log('\n✅ Mahnsystem-Verarbeitung abgeschlossen!');
    console.log('='.repeat(50));
    console.log(`📈 Ergebnisse:`);
    console.log(`   Verarbeitete Rechnungen: ${results.processed}`);
    console.log(`   Erstellte Mahnungen: ${results.reminders.length}`);
    console.log(`   Fehler: ${results.errors.length}`);

    if (results.reminders.length > 0) {
      console.log('\n📧 Erstellte Mahnungen:');
      results.reminders.forEach(r => {
        console.log(`   - ${r.mahnungNumber} (Stufe ${r.stufe}) für Rechnung ${r.invoiceNumber}`);
      });
    }

    if (results.errors.length > 0) {
      console.log('\n❌ Fehler:');
      results.errors.forEach(e => {
        console.log(`   - Rechnung ${e.invoiceNumber}: ${e.error}`);
      });
    }

  } catch (error) {
    console.error('\n❌ Fehler beim Ausführen des Mahnsystems:', error);
  }

  console.log('\n' + '='.repeat(50));
  console.log('🏁 Test abgeschlossen\n');
}

testReminderSystem().catch(console.error);
