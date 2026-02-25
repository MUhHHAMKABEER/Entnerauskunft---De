# E-Mail System Setup

## Installation

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

## Konfiguration

**E-Mail Server:** server380.web-hosting.com  
**E-Mail:** info@rentnerauskunft.de  
**Passwort:** NaskoOx187!  
**Port:** 465 (SSL/TLS)

## Funktionsweise

### Automatischer E-Mail-Versand

Nach jeder erfolgreichen Bestellung:

1. **Rechnung wird erstellt** (PDF)
2. **E-Mail wird automatisch gesendet** mit:
   - Professionellem HTML-Design
   - Logo im Header
   - Bestelldetails
   - Nächste Schritte
   - Hochwertige Signatur mit Logo
   - Rechnung als PDF-Anhang

### E-Mail Inhalt

- **Betreff:** `Ihre Bestellung - Rechnung [Rechnungsnummer]`
- **Von:** `"Rentnerauskunft.de" <info@rentnerauskunft.de>`
- **An:** Kunden-E-Mail
- **Anhang:** Rechnung als PDF

### Design

- ✅ Kein Emoji
- ✅ Kein unnötiger Header
- ✅ Professionelles Logo (https://i.ibb.co/6RVsw6pK/logo.png)
- ✅ High-End Signatur mit Logo und Firmendaten
- ✅ Responsive Design
- ✅ Klare Struktur

## Testen

E-Mail-Verbindung testen:

```
GET /api/test-email
```

## Fehlerbehandlung

Falls E-Mail-Versand fehlschlägt:
- Bestellung wird trotzdem gespeichert
- Rechnung wird trotzdem erstellt
- Fehler wird geloggt
- Admin kann E-Mail später manuell versenden

## Sicherheit

- SSL/TLS verschlüsselte Verbindung
- Passwort nur in Server-Code (nicht im Frontend)
- Keine sensiblen Daten in E-Mail-Logs
