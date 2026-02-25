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
}

export default function AnfrageDetailPage() {
  const [anfrage, setAnfrage] = useState<Anfrage | null>(null);
  const [loading, setLoading] = useState(true);
  const [notizen, setNotizen] = useState('');
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    checkAuth();
    loadAnfrage();
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
                  <div className="pt-3 border-t border-slate-200">
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
                    {new Date(anfrage.erstellt_am).toLocaleString('de-DE')}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Aktualisiert am</p>
                  <p className="font-semibold text-slate-900">
                    {new Date(anfrage.aktualisiert_am).toLocaleString('de-DE')}
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
    </div>
  );
}
