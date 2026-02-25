'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AnalyticsData {
  total: number;
  topSeiten: Array<{ seite: string; count: number }>;
  topLaender: Array<{ land: string; count: number }>;
  geraete: Array<{ geraet: string; count: number }>;
  liveSessions: Array<any>;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'heute' | '7tage' | '30tage' | 'alle'>('heute');
  const [limit, setLimit] = useState(25);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [timeframe, limit]);

  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      loadAnalytics();
    }, 5000); // Alle 5 Sekunden aktualisieren

    return () => clearInterval(interval);
  }, [autoRefresh, timeframe, limit]);

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

  const loadAnalytics = async () => {
    try {
      const res = await fetch(`/api/admin/analytics?timeframe=${timeframe}&limit=${limit}`);
      const result = await res.json();
      
      if (result.success) {
        setData(result.data);
      }
    } catch (err) {
      console.error('Fehler beim Laden:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStats = () => {
    if (!data) return { heute: 0, woche: 0, monat: 0, gesamt: 0 };
    
    return {
      heute: timeframe === 'heute' ? data.total : 0,
      woche: timeframe === '7tage' ? data.total : 0,
      monat: timeframe === '30tage' ? data.total : 0,
      gesamt: timeframe === 'alle' ? data.total : 0
    };
  };

  const stats = getStats();

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#083163] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-600">Lade Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-heading text-2xl font-bold text-[#083163]">
                Analytics Dashboard
              </h1>
              <p className="text-sm text-slate-600">
                Echtzeit-Tracking & Besucheranalyse
              </p>
            </div>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors"
            >
              ← Zurück
            </button>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-slate-700">Zeitraum:</label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value as any)}
                className="px-4 py-2 rounded-lg border border-slate-300 focus:border-[#083163] focus:ring-2 focus:ring-[#083163]/20 outline-none text-sm"
              >
                <option value="heute">Heute</option>
                <option value="7tage">7 Tage</option>
                <option value="30tage">30 Tage</option>
                <option value="alle">Alle</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  autoRefresh 
                    ? 'bg-green-100 text-green-700 border border-green-300' 
                    : 'bg-slate-100 text-slate-700 border border-slate-300'
                }`}
              >
                {autoRefresh ? '● Live-Tracking aktiv' : 'Live-Tracking pausiert'}
              </button>
              <button
                onClick={() => loadAnalytics()}
                className="px-4 py-2 bg-[#083163] hover:bg-[#0a4178] text-white rounded-lg text-sm font-semibold transition-colors"
              >
                Jetzt aktualisieren
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Statistik-Karten */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-2">Heute</p>
            <p className="text-4xl font-bold text-[#083163]">{stats.heute}</p>
            <p className="text-xs text-slate-500 mt-1">Besucher heute</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-2">7 Tage</p>
            <p className="text-4xl font-bold text-[#083163]">{stats.woche || data.total}</p>
            <p className="text-xs text-slate-500 mt-1">Letzte 7 Tage</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-2">30 Tage</p>
            <p className="text-4xl font-bold text-[#083163]">{stats.monat || data.total}</p>
            <p className="text-xs text-slate-500 mt-1">Letzter Monat</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-2">Gesamt</p>
            <p className="text-4xl font-bold text-[#083163]">{stats.gesamt || data.total}</p>
            <p className="text-xs text-slate-500 mt-1">Alle Besucher jemals</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Top Seiten */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">
              Top Seiten
            </h2>
            <div className="space-y-3">
              {data.topSeiten.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-slate-700 truncate">{item.seite}</span>
                  <span className="text-sm font-bold text-[#083163]">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Länder */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">
              Top Länder
            </h2>
            <div className="space-y-3">
              {data.topLaender.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-slate-700">{item.land}</span>
                  <span className="text-sm font-bold text-[#083163]">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Geräte */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">
              Geräte
            </h2>
            <div className="space-y-3">
              {data.geraete.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-slate-700 capitalize">{item.geraet}</span>
                  <span className="text-sm font-bold text-[#083163]">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Sessions */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-lg font-semibold text-slate-900">
              Live Sessions ({data.liveSessions.length})
            </h2>
            <select
              value={limit}
              onChange={(e) => setLimit(parseInt(e.target.value))}
              className="px-3 py-1 rounded-lg border border-slate-300 text-sm"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">IP-Adresse</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Land / Stadt</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Gerät</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Browser</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Aktuelle Seite</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">Zeitpunkt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.liveSessions.map((session: any, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-slate-900">{session.ip_adresse}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm">
                        <p className="font-semibold text-slate-900">{session.land}</p>
                        <p className="text-xs text-slate-600">{session.stadt}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-slate-700 capitalize">{session.geraet}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-slate-700">{session.browser}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-slate-700">{session.seite}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-slate-600">
                        {new Date(session.zeitpunkt).toLocaleString('de-DE')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
