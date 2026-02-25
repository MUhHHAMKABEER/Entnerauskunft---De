const Database = require('better-sqlite3');
const db = new Database('data/rentenauskunft.db');

const kundeId = 23;

console.log('\n=== Setze Kunde #' + kundeId + ' auf 16 Tage überfällig ===\n');

// Berechne Datum vor 16 Tagen
const date16DaysAgo = new Date();
date16DaysAgo.setDate(date16DaysAgo.getDate() - 16);
date16DaysAgo.setHours(14, 19, 0, 0); // 14:19 Uhr
const dateString = date16DaysAgo.toISOString();

console.log('Neues Datum: ' + date16DaysAgo.toLocaleString('de-DE'));
console.log('ISO: ' + dateString);

db.prepare('UPDATE anfragen SET erstellt_am = ?, aktualisiert_am = ? WHERE id = ?').run(
  dateString,
  dateString,
  kundeId
);

// Lösche alte Mahnungen
db.prepare('DELETE FROM mahnungen WHERE anfrage_id = ?').run(kundeId);

console.log('\n✅ Kunde aktualisiert!');
console.log('   Erstellt am: ' + date16DaysAgo.toLocaleString('de-DE'));
console.log('   Tage überfällig: 16');
console.log('\n📅 Erwartete Mahnungen:');
console.log('   ✅ Tag 7: 1. Mahnung fällig');
console.log('   ✅ Tag 14: 2. Mahnung fällig');
console.log('   ❌ Tag 21: Letzte Mahnung noch nicht fällig');

const nextReminderDate = new Date(date16DaysAgo);
nextReminderDate.setDate(nextReminderDate.getDate() + 21);

console.log('\n📆 Nächste Mahnung:');
console.log('   Letzte Mahnung am ' + nextReminderDate.toLocaleString('de-DE'));

console.log('\n🔗 Öffne jetzt: http://localhost:3000/admin/anfragen/' + kundeId);
console.log('   Die Seite erstellt automatisch 1. + 2. Mahnung!');
console.log('\n⏱️  Warte 1 Minute und lade die Seite neu (F5)');
console.log('   Die 2. Mahnung sollte dann erscheinen!\n');

db.close();
