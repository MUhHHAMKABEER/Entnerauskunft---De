'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Anfrage {
  id: number;
  invoice_number: string;
  customer_number: string;
  email: string;
  vorname: string;
  familienname: string;
  versicherungsnummer: string;
  status: string;
  erstellt_am: string;
  payment_date: string | null;
  payment_status: string;
  last_reminder_sent?: string;
  last_reminder_at?: string;
  email_log_count?: number;
}

export default function AnfragenPage() {
  const [anfragen, setAnfragen] = useState<Anfrage[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('alle');
  const [paymentStatus, setPaymentStatus] = useState('alle');
  const [reminderStatus, setReminderStatus] = useState('alle');
  const [reminderSubStatus, setReminderSubStatus] = useState('alle');
  const [selectedTemplateId, setSelectedTemplateId] = useState('alle');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sending, setSending] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [selectingAll, setSelectingAll] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const toggleSelectAll = async () => {
    if (totalCount > 0 && selectedIds.size === totalCount) {
      setSelectedIds(new Set());
      return;
    }
    setSelectingAll(true);
    try {
      const params = new URLSearchParams({
        status,
        paymentStatus,
        reminderStatus,
        reminderSubStatus,
        search,
        idsOnly: 'true'
      });
      const res = await fetch(`/api/admin/anfragen?${params}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.ids)) {
        setSelectedIds(new Set(data.ids));
      }
    } catch (err) {
      console.error('Fehler beim Laden aller IDs:', err);
    } finally {
      setSelectingAll(false);
    }
  };

  const toggleSelectOne = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allSelected = totalCount > 0 && selectedIds.size === totalCount;
  const someSelected = selectedIds.size > 0;
  const selectAllRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someSelected && !allSelected;
    }
  }, [someSelected, allSelected]);

  useEffect(() => {
    setMounted(true);
    checkAuth();
    loadTemplates();
  }, []);

  useEffect(() => {
    loadAnfragen();
  }, [status, paymentStatus, reminderStatus, reminderSubStatus, search, page]);

  useEffect(() => {
    setSelectedIds(new Set());
  }, [status, paymentStatus, reminderStatus, reminderSubStatus, search]);

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

  const loadTemplates = async () => {
    try {
      const res = await fetch('/api/admin/email-templates');
      const data = await res.json();
      if (data.success) {
        setTemplates(data.data.filter((t: any) => t.status === 'Active'));
      }
    } catch (err) {
      console.error('Fehler beim Laden der Vorlagen:', err);
    }
  };

  const handleBulkSend = async () => {
    if (selectedTemplateId === 'alle') {
      alert('Bitte wählen Sie zuerst eine E-Mail Vorlage aus.');
      return;
    }

    if (selectedIds.size === 0) {
      alert('Bitte wählen Sie zuerst mindestens eine Anfrage aus.');
      return;
    }

    if (!confirm(`Möchten Sie wirklich E-Mails an die ${selectedIds.size} ausgewählten Anfragen senden?`)) {
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/admin/anfragen/bulk-send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ids: Array.from(selectedIds),
          templateId: selectedTemplateId
        })
      });

      const data = await res.json();
      if (data.success) {
        alert(`Erfolgreich! ${data.results.success} E-Mails wurden versendet.`);
        setSelectedIds(new Set());
      } else {
        alert(`Fehler: ${data.error}`);
      }
    } catch (err) {
      console.error('Bulk send error:', err);
      alert('Ein Fehler ist beim Massenversand aufgetreten.');
    } finally {
      setSending(false);
    }
  };

  const loadAnfragen = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        status,
        paymentStatus,
        reminderStatus,
        reminderSubStatus,
        search,
        page: page.toString(),
        limit: '20'
      });

      const res = await fetch(`/api/admin/anfragen?${params}`);
      const data = await res.json();

      if (data.success) {
        setAnfragen(data.data);
        setTotalPages(data.pagination.totalPages);
        setTotalCount(data.pagination.total ?? 0);
      }
    } catch (err) {
      console.error('Fehler beim Laden:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/anfragen/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        loadAnfragen();
      }
    } catch (err) {
      console.error('Fehler beim Aktualisieren:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'neu': return 'bg-blue-100 text-blue-700';
      case 'in_bearbeitung': return 'bg-yellow-100 text-yellow-700';
      case 'abgeschlossen': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getPaymentStatusInfo = (anfrage: Anfrage): { nextLabel: string; nextInDays: number; lastSent: string | null } | null => {
    if (anfrage.payment_date) return null;

    // 1. Determine Last Sent from DB or fallback to time-based (legacy/initial)
    const lastSentFromDb = anfrage.last_reminder_sent;

    const erstellt = anfrage.erstellt_am ? new Date(anfrage.erstellt_am).getTime() : 0;
    if (!erstellt || isNaN(erstellt)) return null;
    const daysSinceCreation = Math.floor((Date.now() - erstellt) / (1000 * 60 * 60 * 24));

    const milestones = [
      { id: 'f1', day: 3, label: '1. Freundliche Erinnerung' },
      { id: 'f2', day: 4.5, label: '2. Freundliche Erinnerung' },
      { id: 'o1', day: 6, label: 'Zahlung überfällig 1.' },
      { id: 'o2', day: 8, label: 'Zahlung überfällig 2.' },
      { id: 'o3', day: 10, label: 'Zahlung überfällig 3.' },
      { id: 'm1', day: 12, label: '1. Mahnung 1.' },
      { id: 'm2', day: 14, label: '1. Mahnung 2.' },
      { id: 'm3', day: 16, label: '1. Mahnung 3.' },
      { id: 'fm1', day: 18, label: 'Letzte Mahnung 1.' },
      { id: 'fm2', day: 20, label: 'Letzte Mahnung 2.' },
      { id: 'fm3', day: 22, label: 'Letzte Mahnung 3.' }
    ];

    // Current Step: Starts at age-based floor and advances with each sent email
    let baseStep = 0;
    if (daysSinceCreation < 3) baseStep = 0;
    else if (daysSinceCreation < 6) baseStep = 1;
    else if (daysSinceCreation < 12) baseStep = 3;
    else if (daysSinceCreation < 18) baseStep = 6;
    else baseStep = 9;

    const currentStep = baseStep + (anfrage.email_log_count || 0);
    const lastMilestoneIndex = currentStep - 1;

    const nextMilestone = milestones[lastMilestoneIndex + 1];

    let nextLabel = '';
    let nextInDays = 0;

    if (nextMilestone) {
      nextLabel = nextMilestone.label;
      nextInDays = Math.max(0, nextMilestone.day - daysSinceCreation);
    } else {
      nextLabel = 'Alle Mahnungen versendet';
      nextInDays = 0;
    }

    return {
      nextLabel,
      nextInDays,
      lastSent: lastSentFromDb ? `${lastSentFromDb} – versendet` : (lastMilestoneIndex >= 0 ? `${milestones[lastMilestoneIndex].label} – versendet` : null)
    };
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-heading text-2xl font-bold text-[#083163]">
                Anfragen verwalten
              </h1>
              <p className="text-sm text-slate-600">
                Alle Kundenanfragen im Überblick
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors"
              >
                Zurück
              </button>
              <button
                onClick={() => window.location.href = '/api/admin/export'}
                className="px-4 py-2 bg-[#083163] hover:bg-[#0a4178] text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                CSV Export
              </button>
            </div>
          </div>

          {/* Filter */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Suche nach Name, E-Mail, Versicherungsnummer..."
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-[#083163] focus:ring-2 focus:ring-[#083163]/20 outline-none"
                />
              </div>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-4 py-2 rounded-lg border border-slate-300 focus:border-[#083163] focus:ring-2 focus:ring-[#083163]/20 outline-none"
              >
                <option value="alle">Alle Status</option>
                <option value="neu">Neu</option>
                <option value="in_bearbeitung">In Bearbeitung</option>
                <option value="abgeschlossen">Abgeschlossen</option>
              </select>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="px-4 py-2 rounded-lg border border-slate-300 focus:border-[#083163] focus:ring-2 focus:ring-[#083163]/20 outline-none"
              >
                <option value="alle">Alle Zahlungen</option>
                <option value="bezahlt">Bezahlt</option>
                <option value="unbezahlt">Unbezahlt</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700">Filter nach Zahlungsstatus:</span>
              <select
                value={reminderStatus}
                onChange={(e) => {
                  setReminderStatus(e.target.value);
                  setReminderSubStatus('alle');
                }}
                className="px-4 py-2 rounded-lg border border-slate-300 focus:border-[#083163] focus:ring-2 focus:ring-[#083163]/20 outline-none"
              >
                <option value="alle">Alle Erinnerungen</option>
                <option value="new_signup">Neu angemeldet</option>
                <option value="friendly_reminder">Freundliche Erinnerung</option>
                <option value="payment_overdue">Zahlung überfällig (Mahnung)</option>
                <option value="1st_reminder">1. Mahnung</option>
                <option value="final_reminder">Letzte Mahnung</option>
              </select>

              {reminderStatus !== 'alle' && reminderStatus !== 'new_signup' && (
                <select
                  value={reminderSubStatus}
                  onChange={(e) => setReminderSubStatus(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-slate-300 focus:border-[#083163] focus:ring-2 focus:ring-[#083163]/20 outline-none animate-in fade-in slide-in-from-left-2 duration-200"
                >
                  <option value="alle">Alle Versuche</option>
                  {reminderStatus === 'friendly_reminder' && (
                    <>
                      <option value="versuch_1">1. Versuch (Tag 3)</option>
                      <option value="versuch_2">2. Versuch (Tag 6)</option>
                    </>
                  )}
                  {reminderStatus === 'payment_overdue' && (
                    <>
                      <option value="versuch_1">1. Versuch (Tag 9)</option>
                      <option value="versuch_2">2. Versuch (Tag 12)</option>
                      <option value="versuch_3">3. Versuch (Tag 15)</option>
                    </>
                  )}
                  {reminderStatus === '1st_reminder' && (
                    <>
                      <option value="versuch_1">1. Versuch (Tag 18)</option>
                      <option value="versuch_2">2. Versuch (Tag 21)</option>
                      <option value="versuch_3">3. Versuch (Tag 24)</option>
                    </>
                  )}
                  {reminderStatus === 'final_reminder' && (
                    <>
                      <option value="versuch_1">1. Versuch (Tag 27)</option>
                      <option value="versuch_2">2. Versuch (Tag 30)</option>
                      <option value="versuch_3">3. Versuch (Tag 33)</option>
                    </>
                  )}
                </select>
              )}

              <span className="text-sm font-medium text-slate-700">Email Vorlage:</span>
              <select
                value={selectedTemplateId}
                onChange={(e) => setSelectedTemplateId(e.target.value)}
                className="px-4 py-2 rounded-lg border border-slate-300 focus:border-[#083163] focus:ring-2 focus:ring-[#083163]/20 outline-none max-w-[200px]"
              >
                <option value="alle">Alle Vorlagen</option>
                {templates.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>

              <button
                onClick={handleBulkSend}
                disabled={sending || selectedIds.size === 0}
                className="ml-auto flex items-center gap-2 px-6 py-2 bg-[#083163] text-white rounded-lg font-semibold hover:bg-[#0a3d7a] transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px] justify-center"
              >
                {mounted && (
                  <>
                    {sending ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                    <span>{sending ? 'Wird gesendet...' : 'E-Mail senden'}</span>
                  </>
                )}
                {!mounted && <span>E-Mail senden</span>}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-[#083163] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-600">Lade Anfragen...</p>
          </div>
        ) : anfragen.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">
              Keine Anfragen gefunden
            </h3>
            <p className="text-sm text-slate-600">
              Es gibt noch keine Anfragen oder Ihre Suche ergab keine Treffer.
            </p>
          </div>
        ) : (
          <>
            {someSelected && (
              <div className="mb-4 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-2">
                <span className="text-sm font-medium text-slate-700">
                  <strong>{selectedIds.size}</strong> {selectedIds.size === 1 ? 'Eintrag' : 'Einträge'} ausgewählt
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedIds(new Set())}
                  className="text-sm font-medium text-[#083163] hover:underline"
                >
                  Auswahl aufheben
                </button>
              </div>
            )}
            {/* Tabelle */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-3 py-3 w-10">
                        <input
                          ref={selectAllRef}
                          type="checkbox"
                          checked={allSelected}
                          onChange={toggleSelectAll}
                          disabled={selectingAll}
                          className="w-4 h-4 rounded border-slate-300 text-[#083163] focus:ring-[#083163] cursor-pointer disabled:opacity-50"
                          title={allSelected ? 'Alle abwählen' : 'Alle auswählen (alle Seiten)'}
                        />
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                        Rech.-Nr.
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                        Kunde
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                        Antragstyp
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                        Status
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                        Zahlung
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                        Payment Status
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                        Datum
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                        Aktionen
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {anfragen.map((anfrage) => (
                      <tr key={anfrage.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-3 py-3 w-10">
                          <input
                            type="checkbox"
                            checked={selectedIds.has(anfrage.id)}
                            onChange={() => toggleSelectOne(anfrage.id)}
                            className="w-4 h-4 rounded border-slate-300 text-[#083163] focus:ring-[#083163] cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </td>
                        <td className="px-3 py-3">
                          <span className="font-mono text-xs font-semibold text-slate-900">
                            {anfrage.invoice_number}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {anfrage.vorname} {anfrage.familienname}
                            </p>
                            <p className="text-xs text-slate-500">
                              {anfrage.email}
                            </p>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span className="text-xs text-slate-700">{(anfrage as any).antragstyp_label || (anfrage as any).antragstyp || '-'}</span>
                        </td>
                        <td className="px-3 py-3">
                          <select
                            value={anfrage.status}
                            onChange={(e) => handleStatusChange(anfrage.id, e.target.value)}
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(anfrage.status)} border-0 cursor-pointer`}
                          >
                            <option value="neu">Neu</option>
                            <option value="in_bearbeitung">In Bearbeitung</option>
                            <option value="abgeschlossen">Abgeschlossen</option>
                          </select>
                        </td>
                        <td className="px-3 py-3">
                          {anfrage.payment_date ? (
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                              Bezahlt
                            </span>
                          ) : (() => {
                            const info = getPaymentStatusInfo(anfrage);
                            if (!info) return (
                              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                                Unbezahlt
                              </span>
                            );

                            return (
                              <div>
                                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 block mb-1 w-fit">
                                  Unbezahlt
                                </span>
                                <p className="text-[10px] text-slate-500 leading-tight">
                                  {info.lastSent ? (
                                    <>
                                      <span className="font-medium text-slate-700">Zuletzt:</span> {info.lastSent}
                                    </>
                                  ) : (
                                    'Noch keine Erinnerung'
                                  )}
                                </p>
                              </div>
                            );
                          })()}
                        </td>
                        <td className="px-3 py-3">
                          {anfrage.payment_date ? (
                            <span className="text-xs text-slate-500">—</span>
                          ) : (() => {
                            const info = getPaymentStatusInfo(anfrage);
                            if (!info) return <span className="text-xs text-slate-500">—</span>;
                            const daysText = info.nextInDays === 0 ? 'heute fällig' : info.nextInDays === 1 ? 'in 1 Tag' : `in ${info.nextInDays} Tagen`;
                            return (
                              <div className="text-xs text-slate-700 space-y-1">
                                <div>
                                  <span className="font-medium">Nächste: </span>
                                  <span>{info.nextLabel}</span>
                                  <br />
                                  <span className="text-slate-500">{daysText}</span>
                                </div>
                                {info.lastSent && (
                                  <div className="pt-1 border-t border-slate-100 text-slate-500">
                                    {info.lastSent}
                                  </div>
                                )}
                              </div>
                            );
                          })()}
                        </td>
                        <td className="px-3 py-3">
                          <span className="text-xs text-slate-700">
                            {new Date(anfrage.erstellt_am).toLocaleDateString('de-DE')}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <button
                            onClick={() => router.push(`/admin/anfragen/${anfrage.id}`)}
                            className="px-3 py-1.5 bg-[#083163] hover:bg-[#0a4178] text-white rounded-lg text-xs font-semibold transition-colors"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Zurück
                </button>
                <span className="px-4 py-2 text-sm text-slate-600">
                  Seite {page} von {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Weiter
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
