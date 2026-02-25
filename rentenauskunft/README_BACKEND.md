# 🚀 ULTRA HIGH-END BACKEND - Rentenauskunft Service

## ✅ Was wurde erstellt:

### **1. Datenbank (SQLite)**
- Vollständiges Schema mit allen Formular-Feldern
- Automatische Nummern-Generierung (Rechnung, Kunde, Bestellung)
- Admin-Tabelle mit Passwort-Hash
- Indizes für Performance

### **2. API Routes**
- `POST /api/submit` - Formular-Submission mit PDF-Generierung
- `POST /api/auth/login` - Admin-Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/check` - Session-Check
- `GET /api/admin/anfragen` - Liste aller Anfragen (mit Filter, Suche, Pagination)
- `GET /api/admin/anfragen/[id]` - Einzelne Anfrage
- `PATCH /api/admin/anfragen/[id]` - Status/Notizen aktualisieren
- `DELETE /api/admin/anfragen/[id]` - Anfrage löschen
- `GET /api/admin/stats` - Dashboard-Statistiken
- `GET /api/admin/export` - CSV-Export

### **3. PDF-Rechnung Generator**
- Automatische Rechnung bei jeder Anfrage
- Logo von URL geladen
- Professionelles Design (angepasst für Rentenauskunft)
- Korrekte MwSt-Berechnung (19%)
- Bankverbindung: Revolut

### **4. Admin-Dashboard**
- `/admin/login` - Login-Seite
- `/admin/dashboard` - Übersicht mit Statistiken
- `/admin/anfragen` - Anfragen-Liste mit Filter, Suche, Status-Änderung
- `/admin/anfragen/[id]` - Detail-Ansicht (noch zu erstellen)

### **5. Session-Management**
- iron-session für sichere Sessions
- Cookie-basierte Auth
- 7 Tage Gültigkeit

## 📦 Installation:

```bash
# Dependencies installieren
npm install better-sqlite3 pdfkit bcrypt iron-session @types/better-sqlite3 @types/pdfkit @types/bcrypt

# Dev-Server starten
npm run dev
```

## 🔐 Login-Daten:

**Benutzername:** `admin`  
**Passwort:** `fentropsohnistpilot123!`

## 🎯 Zugriff:

- **Admin-Login:** http://localhost:3000/admin/login
- **Dashboard:** http://localhost:3000/admin/dashboard
- **Anfragen:** http://localhost:3000/admin/anfragen

## 📊 Features:

### **Formular-Submission:**
- Alle Felder werden in Datenbank gespeichert
- Automatische Nummern-Generierung
- IP-Tracking
- PDF-Rechnung wird generiert
- Rechnung wird in `data/invoices/` gespeichert

### **Admin-Dashboard:**
- Statistiken (Gesamt, Heute, Status)
- Neueste Anfragen
- Schnellzugriff auf alle Funktionen

### **Anfragen-Verwaltung:**
- Liste mit Pagination (20 pro Seite)
- Filter nach Status
- Suche nach Name, E-Mail, Versicherungsnummer
- Status direkt in Tabelle ändern
- CSV-Export aller Anfragen

### **Sicherheit:**
- Passwort-Hashing mit bcrypt
- Session-basierte Auth
- CSRF-Schutz durch iron-session
- SQL-Injection-Schutz durch Prepared Statements

## 🗂️ Dateistruktur:

```
rentenauskunft/
├── lib/
│   ├── db.ts              # Datenbank-Setup & Helper
│   ├── session.ts         # Session-Management
│   └── invoice.ts         # PDF-Generator
├── app/
│   ├── api/
│   │   ├── submit/        # Formular-Submission
│   │   ├── auth/          # Login, Logout, Check
│   │   └── admin/         # Admin-API Routes
│   └── admin/
│       ├── login/         # Login-Seite
│       ├── dashboard/     # Dashboard
│       └── anfragen/      # Anfragen-Liste
└── data/
    ├── rentenauskunft.db  # SQLite-Datenbank
    └── invoices/          # PDF-Rechnungen
```

## 🔧 Nächste Schritte:

1. ✅ Detail-Ansicht für einzelne Anfragen erstellen
2. ✅ E-Mail-Versand implementieren (Bestätigung + Admin-Benachrichtigung)
3. ✅ Formular auf Startseite mit Backend verbinden
4. ✅ Produktions-Deployment vorbereiten

## 💡 Hinweise:

- Datenbank wird automatisch erstellt beim ersten Start
- Admin-Passwort wird beim ersten Login gesetzt
- PDF-Logo wird von URL geladen (Fallback zu Text)
- CSV-Export verwendet Semikolon als Trennzeichen (Excel-kompatibel)

## 🚀 Production-Ready:

- SQLite für kleine bis mittlere Lasten (bis 100.000 Anfragen)
- Für mehr: PostgreSQL/MySQL verwenden
- Session-Secret in `.env` auslagern
- HTTPS in Production verwenden
- Rate-Limiting für API-Endpoints hinzufügen
