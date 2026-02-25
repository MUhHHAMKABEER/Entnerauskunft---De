const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');

console.log('\n=== Email-Templates Tabelle erstellen ===\n');

db.exec(`
  CREATE TABLE IF NOT EXISTS email_templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    template_type TEXT NOT NULL UNIQUE,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log('Tabelle email_templates erstellt');

const defaultTemplates = [
  {
    type: 'zahlungserinnerung',
    subject: 'Zahlungserinnerung – Rechnung Nr. {invoiceNumber} | Offener Betrag 32,40 €',
    body: `Sehr geehrte Damen und Herren,

leider konnten wir bis heute keinen Zahlungseingang zu unserer Rechnung Nr. {invoiceNumber} vom {invoiceDate} feststellen.

Die Forderung befindet sich seit dem {verzugDate} im Zahlungsverzug.

Für den durch den Zahlungsverzug entstandenen Verwaltungsaufwand machen wir gemäß § 286 BGB pauschale Verzugskosten in Höhe von 2,50 € geltend.

Offener Gesamtbetrag:
• Rechnungsbetrag: 29,90 €
• Verzugskosten nach § 286 BGB: 2,50 €
Gesamtbetrag: 32,40 €

Wir bitten Sie, den Gesamtbetrag bis spätestens {deadline} zu begleichen.

Sollte bis zu diesem Zeitpunkt kein Zahlungseingang erfolgen, behalten wir uns die Geltendmachung weiterer Verzugskosten sowie die Übergabe des Vorgangs an einen externen Dienstleister vor.`
  },
  {
    type: 'mahnung_1',
    subject: '1. Mahnung – Rechnung Nr. {invoiceNumber} | Offener Betrag 34,90 €',
    body: `Sehr geehrte Damen und Herren,

leider konnten wir bis heute keinen Zahlungseingang zu unserer Rechnung Nr. {invoiceNumber} vom {invoiceDate} feststellen.

Die Forderung befindet sich seit dem {verzugDate} im Zahlungsverzug.

Aufgrund des bisherigen Zahlungsverzugs machen wir neben der Hauptforderung nunmehr zusätzliche Mahngebühren geltend.

Offener Gesamtbetrag:
• Rechnungsbetrag: 29,90 €
• Verzugskosten nach § 286 BGB: 2,50 €
• Mahngebühren: 2,50 €
Gesamtbetrag: 34,90 €

Wir bitten Sie, den offenen Gesamtbetrag bis spätestens {deadline} zu begleichen.

Sollte bis zu diesem Zeitpunkt kein Zahlungseingang erfolgen, behalten wir uns vor, weitere Maßnahmen zur Durchsetzung der Forderung einzuleiten.`
  },
  {
    type: 'mahnung_letzte',
    subject: 'Letzte Mahnung vor Inkasso und gerichtlichen Maßnahmen – Rechnung Nr. {invoiceNumber}',
    body: `Sehr geehrte Damen und Herren,

trotz unserer Zahlungserinnerung sowie unserer 1. Mahnung konnten wir bis heute keinen Zahlungseingang zu unserer Rechnung Nr. {invoiceNumber} vom {invoiceDate} feststellen.

Die Forderung befindet sich weiterhin im Zahlungsverzug.

Aufgrund des fortgesetzten Zahlungsverzugs machen wir erneut zusätzliche Mahngebühren geltend.

Aktuell offener Gesamtbetrag:
• Rechnungsbetrag: 29,90 €
• Verzugskosten nach § 286 BGB: 2,50 €
• Mahngebühren (1. Mahnung): 2,50 €
• Mahngebühren (2. Mahnung): 2,50 €
Gesamtbetrag: 37,40 €

Wir setzen Ihnen hiermit letztmalig eine Zahlungsfrist bis spätestens {deadline}.

Sollte bis zu diesem Zeitpunkt kein vollständiger Zahlungseingang erfolgen, wird der Vorgang ohne weitere Ankündigung an ein externes Inkassounternehmen übergeben. In diesem Fall ist mit zusätzlichen Inkasso-, Bearbeitungs- und Auslagenkosten zu rechnen.

Darüber hinaus behalten wir uns ausdrücklich vor, die Forderung gerichtlich geltend zu machen. Dies kann die gerichtliche Titulierung der Forderung, eine Zwangsvollstreckung (z. B. durch Gerichtsvollzieher) sowie weitere rechtliche Schritte nach sich ziehen. Ein tituliertes Forderungsverfahren kann sich zudem negativ auf Ihre Bonität auswirken.

Zur Vermeidung dieser Maßnahmen empfehlen wir dringend den fristgerechten Ausgleich des offenen Gesamtbetrags.`
  }
];

defaultTemplates.forEach(template => {
  const existing = db.prepare('SELECT id FROM email_templates WHERE template_type = ?').get(template.type);
  
  if (!existing) {
    db.prepare('INSERT INTO email_templates (template_type, subject, body) VALUES (?, ?, ?)').run(
      template.type,
      template.subject,
      template.body
    );
    console.log('Template erstellt: ' + template.type);
  } else {
    console.log('Template existiert bereits: ' + template.type);
  }
});

console.log('\nVerfügbare Platzhalter:');
console.log('  {invoiceNumber} - Rechnungsnummer');
console.log('  {invoiceDate} - Rechnungsdatum');
console.log('  {verzugDate} - Verzugsdatum');
console.log('  {deadline} - Zahlungsfrist');
console.log('  {totalAmount} - Gesamtbetrag');

console.log('\nTemplates können jetzt über die Admin-Oberfläche bearbeitet werden');
console.log('Änderungen werden sofort wirksam (kein npm build nötig)\n');

db.close();
