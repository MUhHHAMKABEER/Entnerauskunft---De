'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Stats {
  total: number;
  heute: number;
  statusStats: Array<{ status: string; count: number }>;
  letzteWoche: Array<{ datum: string; count: number }>;
  neueste: Array<any>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    loadStats();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/check');
      const data = await res.json();
      
      if (!data.isLoggedIn) {
        router.push('/admin/login');
      } else {
        setUser(data.user);
      }
    } catch (err) {
      router.push('/admin/login');
    }
  };

  const loadStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      
      if (data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error('Fehler beim Laden der Statistiken:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#083163] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-600">Lade Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl font-bold text-[#083163]">
              Admin-Dashboard
            </h1>
            <p className="text-sm text-slate-600">
              Rentenauskunft Service Backend
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">
              Angemeldet als: <strong>{user?.username}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors"
            >
              Abmelden
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Statistik-Karten */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-[#083163]/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#083163]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Gesamt Anfragen</p>
            <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Heute</p>
            <p className="text-3xl font-bold text-slate-900">{stats.heute}</p>
          </div>

          {stats.statusStats.map((stat) => (
            <div key={stat.status} className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  stat.status === 'neu' ? 'bg-blue-100' :
                  stat.status === 'in_bearbeitung' ? 'bg-yellow-100' :
                  'bg-green-100'
                }`}>
                  <svg className={`w-6 h-6 ${
                    stat.status === 'neu' ? 'text-blue-600' :
                    stat.status === 'in_bearbeitung' ? 'text-yellow-600' :
                    'text-green-600'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-1 capitalize">{stat.status.replace('_', ' ')}</p>
              <p className="text-3xl font-bold text-slate-900">{stat.count}</p>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="grid md:grid-cols-3 gap-6">
          <button
            onClick={() => router.push('/admin/anfragen')}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:border-[#083163] hover:shadow-lg transition-all text-left group"
          >
            <div className="w-12 h-12 rounded-full bg-[#083163]/10 flex items-center justify-center mb-4 group-hover:bg-[#083163] transition-colors">
              <svg className="w-6 h-6 text-[#083163] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">
              Anfragen verwalten
            </h3>
            <p className="text-sm text-slate-600">
              Alle Kundenanfragen ansehen, bearbeiten und exportieren
            </p>
          </button>

          <button
            onClick={() => window.location.href = '/api/admin/export'}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:border-[#083163] hover:shadow-lg transition-all text-left group"
          >
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
              <svg className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">
              CSV Export
            </h3>
            <p className="text-sm text-slate-600">
              Alle Anfragen als CSV-Datei herunterladen
            </p>
          </button>

          <button
            onClick={() => router.push('/admin/analytics')}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:border-[#083163] hover:shadow-lg transition-all text-left group"
          >
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
              <svg className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">
              Live Analytics
            </h3>
            <p className="text-sm text-slate-600">
              Echtzeit-Tracking mit Geo-IP und Besucheranalyse
            </p>
          </button>
        </div>

        {/* Neueste Anfragen */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-heading text-xl font-semibold text-slate-900 mb-6">
            Neueste Anfragen
          </h2>
          <div className="space-y-4">
            {stats.neueste.map((anfrage: any) => (
              <div
                key={anfrage.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                onClick={() => router.push(`/admin/anfragen/${anfrage.id}`)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#083163] flex items-center justify-center text-white font-semibold">
                    {anfrage.vorname[0]}{anfrage.familienname[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {anfrage.vorname} {anfrage.familienname}
                    </p>
                    <p className="text-sm text-slate-600">{anfrage.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    anfrage.status === 'neu' ? 'bg-blue-100 text-blue-700' :
                    anfrage.status === 'in_bearbeitung' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {anfrage.status}
                  </span>
                  <span className="text-sm text-slate-500">
                    {new Date(anfrage.erstellt_am).toLocaleDateString('de-DE')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
