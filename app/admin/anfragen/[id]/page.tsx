'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Anfrage {
  id: number;
  invoice_number: string;
  customer_number: string;
  order_number: string;
  invoice_path: string;
  invoice_filename: string;
  email: string;
  anrede: string;
  vorname: string;
  familienname: string;
  geburtsname: string;
  geburtsdatum: string;
  geburtsort: string;
  strasse: string;
  hausnummer: string;
  plz: string;
  ort: string;
  land: string;
  versicherungsnummer: string;
  rentenversicherungstraeger: string;
  staatsangehoerigkeit: string;
  familienstand: string;
  kinder_anzahl: number;
  telefon: string;
  antragstyp: string;
  antragstyp_label: string;
  gewuenschter_rentenbeginn: string;
  zeitraum_von: string;
  zeitraum_bis: string;
  jahr_von: string;
  jahr_bis: string;
  panr: string;
  verstorbener_vorname: string;
  verstorbener_familienname: string;
  verstorbener_geburtsname: string;
  status: string;
  notizen: string;
  ip_adresse: string;
  user_agent: string;
  geraet: string;
  browser: string;
  betriebssystem: string;
  erstellt_am: string;
  aktualisiert_am: string;
  payment_status: string;
  payment_date: string;
  payment_method: string;
  last_reminder_sent: string;
  last_reminder_at: string;
  email_logs?: EmailLog[];
}

interface EmailLog {
  id: number;
  template_id: number;
  subject: string;
  sent_at: string;
  recipient: string;
  status: string;
}

interface Mahnung {
  id: number;
  mahnung_number: string;
  mahnung_stufe: number;
  betrag: number;
  mahngebuehr: number;
  gesamtbetrag: number;
  mahnung_path: string;
  mahnung_filename: string;
  versendet: boolean;
  versendet_am: string;
  erstellt_am: string;
}

export default function AnfrageDetailPage() {
  const [anfrage, setAnfrage] = useState<Anfrage | null>(null);
  const [mahnungen, setMahnungen] = useState<Mahnung[]>([]);
  const [loading, setLoading] = useState(true);
  const [notizen, setNotizen] = useState('');
  const [saving, setSaving] = useState(false);
  const [sendingReminder, setSendingReminder] = useState(false);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<{ type: string, subject: string, body: string } | null>(null);
  const [activeLogTab, setActiveLogTab] = useState('all');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (!params.id) return;
    checkAuth();
    loadAnfrage();
    loadMahnungen();
    autoCreateReminders();
  }, [params.id]);

  const autoCreateReminders = async () => {
    try {
      await fetch('/api/admin/reminders/process', {
        method: 'POST'
      });
      setTimeout(() => loadMahnungen(), 1000);
    } catch (err) {
      console.error('Fehler bei automatischer Mahnungserstellung:', err);
    }
  };

  const getEmailLog = (anfrage: Anfrage) => {
    if (!anfrage.email_logs) return [];

    return anfrage.email_logs.map(log => {
      const date = new Date(log.sent_at);
      return {
        title: log.subject,
        date: date.toLocaleDateString('de-DE'),
        time: date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
        category: 'sent'
      };
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/check');
      const data = await res.json();

      if (!data.isLoggedIn) {
        router.push('/admin/login');
      }
    } catch (err) {
      router.push('/admin/login');
    }
  };

  const loadAnfrage = async () => {
    try {
      const res = await fetch(`/api/admin/anfragen/${params.id}`);
      const data = await res.json();

      if (data.success) {
        setAnfrage(data.data);
        setNotizen(data.data.notizen || '');
      }
    } catch (err) {
      console.error('Fehler beim Laden:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMahnungen = async () => {
    try {
      const res = await fetch(`/api/admin/mahnungen/${params.id}`);
      const data = await res.json();

      if (data.success) {
        setMahnungen(data.mahnungen || []);
      }
    } catch (err) {
      console.error('Fehler beim Laden der Mahnungen:', err);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/anfragen/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        loadAnfrage();
      }
    } catch (err) {
      console.error('Fehler beim Aktualisieren:', err);
    }
  };

  const handleSaveNotizen = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/anfragen/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notizen })
      });

      if (res.ok) {
        alert('Notizen gespeichert!');
        loadAnfrage();
      }
    } catch (err) {
      console.error('Fehler beim Speichern:', err);
      alert('Fehler beim Speichern der Notizen');
    } finally {
      setSaving(false);
    }
  };

  const handlePaymentStatusChange = async (newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/anfragen/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_status: newStatus,
          payment_date: newStatus === 'bezahlt' ? new Date().toISOString() : null
        })
      });

      if (res.ok) {
        alert('Zahlungsstatus aktualisiert!');
        loadAnfrage();
      }
    } catch (err) {
      console.error('Fehler beim Aktualisieren:', err);
      alert('Fehler beim Aktualisieren des Zahlungsstatus');
    }
  };

  const handleSendReminder = async (mahnungId: number) => {
    if (!confirm('Möchten Sie diese Mahnung wirklich per E-Mail versenden?')) {
      return;
    }

    setSendingReminder(true);
    try {
      const res = await fetch(`/api/admin/mahnungen/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mahnungId })
      });

      const data = await res.json();

      if (data.success) {
        alert('Mahnung erfolgreich versendet!');
        loadMahnungen();
      } else {
        alert('Fehler beim Versenden: ' + (data.error || 'Unbekannter Fehler'));
      }
    } catch (err) {
      console.error('Fehler beim Versenden:', err);
      alert('Fehler beim Versenden der Mahnung');
    } finally {
      setSendingReminder(false);
    }
  };

  const handleEditTemplate = async (stufe: number) => {
    try {
      const res = await fetch('/api/admin/email-templates');
      const data = await res.json();

      if (data.success) {
        const templateType = stufe === 1 ? 'zahlungserinnerung' : stufe === 2 ? 'mahnung_1' : 'mahnung_letzte';
        const template = data.data.find((t: any) => t.template_type === templateType);

        if (template) {
          setEditingTemplate({
            type: template.template_type,
            subject: template.subject,
            body: template.body
          });
          setShowTemplateEditor(true);
        }
      }
    } catch (err) {
      console.error('Fehler beim Laden des Templates:', err);
      alert('Fehler beim Laden des Templates');
    }
  };

  const handleSaveTemplate = async () => {
    if (!editingTemplate) return;

    try {
      const res = await fetch('/api/admin/email-templates', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTemplate)
      });

      const data = await res.json();

      if (data.success) {
        alert('Template erfolgreich gespeichert!');
        setShowTemplateEditor(false);
        setEditingTemplate(null);
      } else {
        alert('Fehler beim Speichern: ' + (data.error || 'Unbekannter Fehler'));
      }
    } catch (err) {
      console.error('Fehler beim Speichern:', err);
      alert('Fehler beim Speichern des Templates');
    }
  };

  const handleCreateReminders = async () => {
    if (!confirm('Möchten Sie jetzt Mahnungen für diesen Kunden erstellen? Das System prüft automatisch, welche Mahnungen fällig sind.')) {
      return;
    }

    setSendingReminder(true);
    try {
      const res = await fetch('/api/admin/reminders/process', {
        method: 'POST'
      });

      const data = await res.json();

      if (data.success) {
        const created = data.results.reminders.filter((r: any) => r.invoiceNumber === anfrage?.invoice_number);
        if (created.length > 0) {
          alert(`Erfolgreich ${created.length} Mahnung(en) erstellt!`);
          loadMahnungen();
        } else {
          alert('Keine neuen Mahnungen erstellt. Möglicherweise existieren bereits alle fälligen Mahnungen.');
        }
      } else {
        alert('Fehler: ' + (data.error || 'Unbekannter Fehler'));
      }
    } catch (error) {
      console.error('Fehler:', error);
      alert('Fehler beim Erstellen der Mahnungen');
    } finally {
      setSendingReminder(false);
    }
  };

  if (loading || !anfrage) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#083163] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-600">Lade Details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-2xl font-bold text-[#083163]">
                Anfrage #{anfrage.invoice_number}
              </h1>
              <p className="text-sm text-slate-600">
                {anfrage.vorname} {anfrage.familienname}
              </p>
            </div>
            <button
              onClick={() => router.push('/admin/anfragen')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors"
            >
              ← Zurück zur Liste
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Hauptinformationen */}
          <div className="lg:col-span-2 space-y-6">
            {/* Persönliche Daten */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">
                Persönliche Daten
              </h2>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-600 mb-1">Anrede</p>
                  <p className="font-semibold text-slate-900">{anfrage.anrede || '-'}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Vorname</p>
                  <p className="font-semibold text-slate-900">{anfrage.vorname}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Familienname</p>
                  <p className="font-semibold text-slate-900">{anfrage.familienname}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Geburtsname</p>
                  <p className="font-semibold text-slate-900">{anfrage.geburtsname || '-'}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Geburtsdatum</p>
                  <p className="font-semibold text-slate-900">{anfrage.geburtsdatum || '-'}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Geburtsort</p>
                  <p className="font-semibold text-slate-900">{anfrage.geburtsort || '-'}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Staatsangehörigkeit</p>
                  <p className="font-semibold text-slate-900">{anfrage.staatsangehoerigkeit || '-'}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Familienstand</p>
                  <p className="font-semibold text-slate-900">{anfrage.familienstand || '-'}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Anzahl Kinder</p>
                  <p className="font-semibold text-slate-900">{anfrage.kinder_anzahl || '-'}</p>
                </div>
              </div>
            </div>

            {/* Kontaktdaten */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">
                Kontaktdaten
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-600 mb-1">E-Mail</p>
                  <p className="font-semibold text-slate-900">{anfrage.email}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Telefon</p>
                  <p className="font-semibold text-slate-900">{anfrage.telefon || '-'}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-slate-600 mb-1">Adresse</p>
                  <p className="font-semibold text-slate-900">
                    {anfrage.strasse} {anfrage.hausnummer}<br />
                    {anfrage.plz} {anfrage.ort}<br />
                    {anfrage.land}
                  </p>
                </div>
              </div>
            </div>

            {/* Versicherungsdaten */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">
                Versicherungsdaten & Antragsdetails
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="md:col-span-2">
                  <p className="text-slate-600 mb-1">Antragstyp</p>
                  <p className="font-semibold text-slate-900 text-base">{anfrage.antragstyp_label || anfrage.antragstyp || '-'}</p>
                  <p className="text-xs text-slate-500 mt-1">Code: {anfrage.antragstyp || '-'}</p>
                </div>

                {anfrage.versicherungsnummer && (
                  <div>
                    <p className="text-slate-600 mb-1">Versicherungsnummer</p>
                    <p className="font-mono font-semibold text-slate-900">{anfrage.versicherungsnummer}</p>
                  </div>
                )}

                {anfrage.panr && (
                  <div>
                    <p className="text-slate-600 mb-1">PANR / PRNR</p>
                    <p className="font-mono font-semibold text-slate-900">{anfrage.panr}</p>
                  </div>
                )}

                {anfrage.rentenversicherungstraeger && (
                  <div>
                    <p className="text-slate-600 mb-1">Rentenversicherungsträger</p>
                    <p className="font-semibold text-slate-900">{anfrage.rentenversicherungstraeger}</p>
                  </div>
                )}

                {anfrage.gewuenschter_rentenbeginn && (
                  <div>
                    <p className="text-slate-600 mb-1">Gewünschter Rentenbeginn</p>
                    <p className="font-semibold text-slate-900">{anfrage.gewuenschter_rentenbeginn}</p>
                  </div>
                )}

                {(anfrage.zeitraum_von || anfrage.zeitraum_bis) && (
                  <div className="md:col-span-2">
                    <p className="text-slate-600 mb-1">Zeitraum</p>
                    <p className="font-semibold text-slate-900">
                      {anfrage.zeitraum_von || '?'} bis {anfrage.zeitraum_bis || 'heute'}
                    </p>
                  </div>
                )}

                {(anfrage.jahr_von || anfrage.jahr_bis) && (
                  <div className="md:col-span-2">
                    <p className="text-slate-600 mb-1">Jahr(e)</p>
                    <p className="font-semibold text-slate-900">
                      {anfrage.jahr_von}{anfrage.jahr_bis && anfrage.jahr_bis !== anfrage.jahr_von ? ` bis ${anfrage.jahr_bis}` : ''}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Verstorbene Person (falls Hinterbliebenenrente) */}
            {(anfrage.verstorbener_vorname || anfrage.verstorbener_familienname) && (
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">
                  Verstorbene Person
                </h2>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-600 mb-1">Vorname</p>
                    <p className="font-semibold text-slate-900">{anfrage.verstorbener_vorname || '-'}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 mb-1">Familienname</p>
                    <p className="font-semibold text-slate-900">{anfrage.verstorbener_familienname || '-'}</p>
                  </div>
                  {anfrage.verstorbener_geburtsname && (
                    <div>
                      <p className="text-slate-600 mb-1">Geburtsname</p>
                      <p className="font-semibold text-slate-900">{anfrage.verstorbener_geburtsname}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Notizen */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">
                Interne Notizen
              </h2>
              <textarea
                value={notizen}
                onChange={(e) => setNotizen(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#083163] focus:ring-2 focus:ring-[#083163]/20 outline-none text-sm"
                placeholder="Interne Notizen zur Anfrage..."
              />
              <button
                onClick={handleSaveNotizen}
                disabled={saving}
                className="mt-3 px-6 py-2 bg-[#083163] hover:bg-[#0a4178] text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {saving ? 'Speichern...' : 'Notizen speichern'}
              </button>
            </div>

            {/* Email Log */}
            {!mounted ? (
              <div className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
                <div className="h-6 w-32 bg-slate-200 rounded mb-4"></div>
                <div className="space-y-4">
                  <div className="h-20 bg-slate-100 rounded-lg"></div>
                  <div className="h-20 bg-slate-100 rounded-lg"></div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">
                    Email Protokoll
                  </h2>

                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'all', label: 'Alle' },
                      { id: 'friendly', label: 'Freundliche Erinnerung' },
                      { id: 'overdue', label: 'Zahlung überfällig (Mahnung)' },
                      { id: '1st_mahnung', label: '1. Mahnung' },
                      { id: 'final_mahnung', label: 'Letzte Mahnung' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveLogTab(tab.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeLogTab === tab.id
                          ? 'bg-[#083163] text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {getEmailLog(anfrage)
                    .filter(log => activeLogTab === 'all' || log.category === activeLogTab)
                    .map((log, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="mt-1 w-2 h-2 rounded-full bg-green-500"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate">
                            {log.title}
                          </p>
                          <p className="text-xs text-slate-600 mt-0.5">
                            Empfänger: {anfrage.email}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">
                            {log.date} • {log.time}
                          </p>
                        </div>
                      </div>
                    ))}

                  {getEmailLog(anfrage).filter(log => activeLogTab === 'all' || log.category === activeLogTab).length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-sm text-slate-500">
                        In dieser Kategorie wurden bisher keine E-Mails versendet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">
                Status
              </h2>
              <select
                value={anfrage.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#083163] focus:ring-2 focus:ring-[#083163]/20 outline-none text-sm font-semibold"
              >
                <option value="neu">Neu</option>
                <option value="in_bearbeitung">In Bearbeitung</option>
                <option value="abgeschlossen">Abgeschlossen</option>
              </select>
            </div>

            {/* Zahlungsstatus */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">
                Zahlungsstatus
              </h2>
              <select
                value={anfrage.payment_status || 'unbezahlt'}
                onChange={(e) => handlePaymentStatusChange(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 outline-none text-sm font-semibold ${anfrage.payment_status === 'bezahlt'
                  ? 'border-green-300 bg-green-50 text-green-700 focus:border-green-500 focus:ring-green-500/20'
                  : 'border-red-300 bg-red-50 text-red-700 focus:border-red-500 focus:ring-red-500/20'
                  }`}
              >
                <option value="unbezahlt">Unbezahlt</option>
                <option value="bezahlt">Bezahlt</option>
              </select>
              {anfrage.payment_status === 'unbezahlt' && mounted && (() => {
                const tageUeberfaellig = Math.floor((Date.now() - new Date(anfrage.erstellt_am).getTime()) / (1000 * 60 * 60 * 24));
                const mahnung1 = mahnungen.find(m => m.mahnung_stufe === 1);
                const mahnung2 = mahnungen.find(m => m.mahnung_stufe === 2);
                const mahnung3 = mahnungen.find(m => m.mahnung_stufe === 3);

                const erstelltAm = new Date(anfrage.erstellt_am);
                let naechsteMahnungDatum = null;
                let naechsteMahnungText = '';

                if (!mahnung3 && tageUeberfaellig < 21) {
                  const naechsteDatum = new Date(erstelltAm);
                  if (!mahnung2 && tageUeberfaellig < 14) {
                    naechsteDatum.setDate(naechsteDatum.getDate() + 14);
                    naechsteMahnungText = '2. Mahnung';
                  } else if (!mahnung3) {
                    naechsteDatum.setDate(naechsteDatum.getDate() + 21);
                    naechsteMahnungText = 'Letzte Mahnung';
                  }
                  naechsteMahnungDatum = naechsteDatum;
                }

                return (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm font-semibold text-red-700">Rechnung überfällig seit {tageUeberfaellig} Tagen</p>
                    <p className="text-xs text-red-600 mt-1">Erstellt am: {new Date(anfrage.erstellt_am).toLocaleDateString('de-DE')}</p>
                    {naechsteMahnungDatum && (
                      <p className="text-xs text-orange-600 mt-2 font-semibold">
                        Nächste Mahnung am {naechsteMahnungDatum.toLocaleString('de-DE', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit'
                        })} ({naechsteMahnungText})
                      </p>
                    )}
                    <div className="mt-3 space-y-2">
                      {mahnung1 && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSendReminder(mahnung1.id)}
                            disabled={sendingReminder}
                            className={`flex-1 px-3 py-2 rounded text-xs font-semibold transition-colors relative group ${mahnung1.versendet
                              ? 'bg-gray-400 hover:bg-gray-500 text-white'
                              : 'bg-red-600 hover:bg-red-700 text-white'
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                            title={mahnung1.versendet && mahnung1.versendet_am ? `Versendet am ${new Date(mahnung1.versendet_am).toLocaleString('de-DE')}` : ''}
                          >
                            {mahnung1.versendet ? 'Zahlungserinnerung versendet' : 'Zahlungserinnerung per Email'}
                            {mahnung1.versendet && mahnung1.versendet_am && (
                              <span className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-10">
                                Versendet am {new Date(mahnung1.versendet_am).toLocaleString('de-DE')}
                              </span>
                            )}
                          </button>
                          <button
                            onClick={() => handleEditTemplate(1)}
                            className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-semibold transition-colors"
                            title="Email-Vorlage bearbeiten"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                        </div>
                      )}
                      {mahnung2 && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSendReminder(mahnung2.id)}
                            disabled={sendingReminder}
                            className={`flex-1 px-3 py-2 rounded text-xs font-semibold transition-colors relative group ${mahnung2.versendet
                              ? 'bg-gray-400 hover:bg-gray-500 text-white'
                              : 'bg-red-600 hover:bg-red-700 text-white'
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                            title={mahnung2.versendet && mahnung2.versendet_am ? `Versendet am ${new Date(mahnung2.versendet_am).toLocaleString('de-DE')}` : ''}
                          >
                            {mahnung2.versendet ? '1. Mahnung versendet' : '1. Mahnung per Email'}
                            {mahnung2.versendet && mahnung2.versendet_am && (
                              <span className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-10">
                                Versendet am {new Date(mahnung2.versendet_am).toLocaleString('de-DE')}
                              </span>
                            )}
                          </button>
                          <button
                            onClick={() => handleEditTemplate(2)}
                            className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-semibold transition-colors"
                            title="Email-Vorlage bearbeiten"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                        </div>
                      )}
                      {mahnung3 && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSendReminder(mahnung3.id)}
                            disabled={sendingReminder}
                            className={`flex-1 px-3 py-2 rounded text-xs font-semibold transition-colors relative group ${mahnung3.versendet
                              ? 'bg-gray-400 hover:bg-gray-500 text-white'
                              : 'bg-red-600 hover:bg-red-700 text-white'
                              } disabled:opacity-50 disabled:cursor-not-allowed`}
                            title={mahnung3.versendet && mahnung3.versendet_am ? `Versendet am ${new Date(mahnung3.versendet_am).toLocaleString('de-DE')}` : ''}
                          >
                            {mahnung3.versendet ? 'Letzte Mahnung versendet' : 'Letzte Mahnung per Email'}
                            {mahnung3.versendet && mahnung3.versendet_am && (
                              <span className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-10">
                                Versendet am {new Date(mahnung3.versendet_am).toLocaleString('de-DE')}
                              </span>
                            )}
                          </button>
                          <button
                            onClick={() => handleEditTemplate(3)}
                            className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-semibold transition-colors"
                            title="Email-Vorlage bearbeiten"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
              {anfrage.payment_date && (
                <div className="mt-3 text-xs text-slate-600">
                  <p>Bezahlt am: {new Date(anfrage.payment_date).toLocaleString('de-DE')}</p>
                  {anfrage.payment_method && <p>Methode: {anfrage.payment_method}</p>}
                </div>
              )}
            </div>

            {/* Rechnungsinformationen */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">
                Rechnungsinformationen
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-600 mb-1">Rechnungsnummer</p>
                  <p className="font-mono font-semibold text-slate-900">{anfrage.invoice_number}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Kundennummer</p>
                  <p className="font-mono font-semibold text-slate-900">{anfrage.customer_number}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Auftragsnummer</p>
                  <p className="font-mono font-semibold text-slate-900 text-xs">{anfrage.order_number}</p>
                </div>
                {anfrage.invoice_filename && (
                  <div className="pt-3 border-t border-slate-200 space-y-2">
                    <a
                      href={`/api/admin/invoice/${anfrage.id}`}
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#cbd939] hover:bg-[#b8c632] text-[#083163] rounded-lg text-sm font-semibold transition-colors w-full justify-center"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Rechnung herunterladen
                    </a>
                    {[...mahnungen].sort((a, b) => a.mahnung_stufe - b.mahnung_stufe).map((mahnung) => (
                      <a
                        key={mahnung.id}
                        href={`/api/admin/mahnung/${mahnung.id}`}
                        download
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-semibold transition-colors w-full justify-center"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {mahnung.mahnung_stufe === 1 && 'Zahlungserinnerung herunterladen'}
                        {mahnung.mahnung_stufe === 2 && '1. Mahnung herunterladen'}
                        {mahnung.mahnung_stufe === 3 && 'Letzte Mahnung herunterladen'}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Metadaten */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">
                Metadaten
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-600 mb-1">Erstellt am</p>
                  <p className="font-semibold text-slate-900">
                    {mounted ? new Date(anfrage.erstellt_am).toLocaleString('de-DE') : '...'}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Aktualisiert am</p>
                  <p className="font-semibold text-slate-900">
                    {mounted ? new Date(anfrage.aktualisiert_am).toLocaleString('de-DE') : '...'}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">IP-Adresse</p>
                  <p className="font-mono text-xs text-slate-900">{anfrage.ip_adresse}</p>
                </div>
              </div>
            </div>

            {/* Geräte-Info */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">
                Geräte-Information
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-600 mb-1">Gerät</p>
                  <p className="font-semibold text-slate-900">{anfrage.geraet || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Browser</p>
                  <p className="font-semibold text-slate-900">{anfrage.browser || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Betriebssystem</p>
                  <p className="font-semibold text-slate-900">{anfrage.betriebssystem || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">User-Agent</p>
                  <p className="font-mono text-xs text-slate-700 break-all">{anfrage.user_agent || 'Unknown'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showTemplateEditor && editingTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Email-Vorlage bearbeiten</h2>
              <button
                onClick={() => {
                  setShowTemplateEditor(false);
                  setEditingTemplate(null);
                }}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Betreff
                </label>
                <input
                  type="text"
                  value={editingTemplate.subject}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email-Text
                </label>
                <textarea
                  value={editingTemplate.body}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, body: e.target.value })}
                  rows={20}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none font-mono text-sm"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">Verfügbare Platzhalter:</h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-blue-700">
                  <div><code className="bg-blue-100 px-2 py-1 rounded">{'{invoiceNumber}'}</code> - Rechnungsnummer</div>
                  <div><code className="bg-blue-100 px-2 py-1 rounded">{'{invoiceDate}'}</code> - Rechnungsdatum</div>
                  <div><code className="bg-blue-100 px-2 py-1 rounded">{'{verzugDate}'}</code> - Verzugsdatum</div>
                  <div><code className="bg-blue-100 px-2 py-1 rounded">{'{deadline}'}</code> - Zahlungsfrist</div>
                  <div><code className="bg-blue-100 px-2 py-1 rounded">{'{totalAmount}'}</code> - Gesamtbetrag</div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-200 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowTemplateEditor(false);
                  setEditingTemplate(null);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={handleSaveTemplate}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}
