# Rechnungs-Generator Setup

## Installation

Puppeteer für PDF-Generierung:

```bash
npm install puppeteer
```

Die Rechnung wird als **PDF-Datei** generiert:
- Professionell formatiert
- Direkt downloadbar
- Automatisch konvertiert von HTML zu PDF

## Funktionsweise

### Automatische Rechnungserstellung

Sobald ein Kunde das Formular absendet:

1. **Datenbank-Eintrag**: Anfrage wird in DB gespeichert
2. **Nummern-Generierung**: 
   - Rechnungsnummer (fortlaufend, Start: 20251180)
   - Kundennummer (fortlaufend, Start: 15230)
   - Auftragsnummer (eindeutig, Format: ORD-{timestamp}-{random}-{hash})
3. **PDF-Generierung**: Rechnung wird automatisch erstellt
4. **DB-Update**: PDF-Pfad wird in Datenbank gespeichert
5. **Weiterleitung**: Kunde wird zu `/bestaetigung` weitergeleitet

### Rechnung-Download im Admin

- **Admin-Dashboard**: `/admin/anfragen/[id]`
- **Download-Button**: Erscheint automatisch wenn Rechnung vorhanden
- **API-Route**: `/api/admin/invoice/[id]`
- **Sicherheit**: Nur für eingeloggte Admins zugänglich

## Dateien

### Neu erstellt:
- `lib/invoice-generator-html.ts` - HTML-Rechnung-Generator
- `app/api/admin/invoice/[id]/route.ts` - Download-API
- `app/bestaetigung/page.tsx` - Bestätigungsseite

### Geändert:
- `app/api/submit/route.ts` - Automatische Rechnungserstellung
- `lib/db.ts` - Neue Spalten: `invoice_path`, `invoice_filename`
- `app/admin/anfragen/[id]/page.tsx` - Download-Button

### Format:
- **HTML statt PDF**: Rechnungen werden als HTML generiert
- **Browser-kompatibel**: Kann direkt im Browser angezeigt werden
- **Druckbar**: Mit Strg+P / Cmd+P als PDF speichern

## Rechnungs-Details

- **Preis**: 29,90 € (inkl. 19% MwSt.)
- **Netto**: 25,13 €
- **MwSt**: 4,77 €
- **Zahlungsziel**: 7 Tage
- **Bankverbindung**: Revolut (IBAN: GB07REVO23012053002632)

## Logo

Das Logo wird automatisch von `https://i.ibb.co/6RVsw6pK/logo.png` geladen.

## Speicherort

PDF-Rechnungen werden gespeichert in: `data/invoices/Rechnung_{invoice_number}_{lastname}.pdf`

## Fehlerbehandlung

Falls die PDF-Generierung fehlschlägt:
- Anfrage wird trotzdem gespeichert
- Fehler wird geloggt
- Rechnung kann später manuell erstellt werden
