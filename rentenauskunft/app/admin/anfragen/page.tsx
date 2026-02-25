'use client';

import { useEffect, useState } from 'react';
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
}

export default function AnfragenPage() {
  const [anfragen, setAnfragen] = useState<Anfrage[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('alle');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    loadAnfragen();
  }, [status, search, page]);

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

  const loadAnfragen = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        status,
        search,
        page: page.toString(),
        limit: '20'
      });

      const res = await fetch(`/api/admin/anfragen?${params}`);
      const data = await res.json();
      
      if (data.success) {
        setAnfragen(data.data);
        setTotalPages(data.pagination.totalPages);
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
            {/* Tabelle */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
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
