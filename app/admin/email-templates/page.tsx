"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Template = {
  id: number;
  name: string;
  subject: string;
  body: string;
  status: "Active" | "Draft";
  template_type: string | null;
  created_at: string;
};

export default function EmailTemplatesListPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchTemplates();
  }, []);

  async function fetchTemplates() {
    try {
      const res = await fetch("/api/admin/email-templates");
      const data = await res.json();

      if (data.success) {
        setTemplates(data.data);
      } else {
        if (res.status === 401) {
          router.push("/admin/login");
        } else {
          setError(data.error || "Fehler beim Laden");
        }
      }
    } catch (err) {
      setError("Verbindungsfehler");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      const res = await fetch(`/api/admin/email-templates/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setTemplates(templates.filter((t) => t.id !== id));
        setDeleteId(null);
      } else {
        alert(data.error || "Fehler beim Löschen");
      }
    } catch (err) {
      alert("Verbindungsfehler");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#083163]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-[#083163] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/admin/dashboard" className="text-white/80 hover:text-white">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-lg sm:text-xl font-bold">E-Mail-Vorlagen</h1>
          </div>
          <Link
            href="/admin/email-templates/add-templates"
            className="bg-white px-3 sm:px-4 py-2 rounded-lg font-semibold hover:bg-slate-100 transition-colors flex items-center gap-2 text-sm sm:text-base"
            style={{ color: "#083163" }}
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Neue Vorlage</span>
            <span className="sm:hidden">Neu</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-700 text-sm sm:text-base">{error}</p>
          </div>
        )}

        {templates.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12 text-center">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">Keine Vorlagen vorhanden</h3>
            <p className="text-slate-600 mb-6 text-sm sm:text-base">Erstellen Sie Ihre erste E-Mail-Vorlage, um zu beginnen.</p>
            <Link
              href="/admin/email-templates/add-templates"
              className="inline-flex items-center gap-2 bg-[#083163] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-[#0a4178] transition-colors text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Erste Vorlage erstellen
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Name</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Betreff</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Typ</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Erstellt</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-slate-700">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {templates.map((template) => (
                    <tr key={template.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">{template.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-slate-700 truncate max-w-xs">{template.subject}</p>
                      </td>
                      <td className="px-6 py-4">
                        {template.template_type ? (
                          <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {template.template_type}
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                            template.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {template.status === "Active" ? "Aktiv" : "Entwurf"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(template.created_at).toLocaleDateString("de-DE")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/email-templates/view-templates/${template.id}`}
                            className="p-2 text-slate-600 hover:text-[#083163] hover:bg-slate-100 rounded-lg transition-colors"
                            title="Ansehen"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Link>
                          <Link
                            href={`/admin/email-templates/edit-templates/${template.id}`}
                            className="p-2 text-slate-600 hover:text-[#083163] hover:bg-slate-100 rounded-lg transition-colors"
                            title="Bearbeiten"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => setDeleteId(template.id)}
                            className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Löschen"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden space-y-4">
              {templates.map((template) => (
                <div key={template.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 truncate">{template.name}</h3>
                      <p className="text-sm text-slate-600 truncate mt-1">{template.subject}</p>
                    </div>
                    <span
                      className={`ml-3 flex-shrink-0 inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${
                        template.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {template.status === "Active" ? "Aktiv" : "Entwurf"}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
                    {template.template_type && (
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {template.template_type}
                      </span>
                    )}
                    <span className="text-slate-500">
                      {new Date(template.created_at).toLocaleDateString("de-DE")}
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-1 pt-3 border-t border-slate-100">
                    <Link
                      href={`/admin/email-templates/view-templates/${template.id}`}
                      className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 hover:text-[#083163] hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="hidden sm:inline">Ansehen</span>
                    </Link>
                    <Link
                      href={`/admin/email-templates/edit-templates/${template.id}`}
                      className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 hover:text-[#083163] hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span className="hidden sm:inline">Bearbeiten</span>
                    </Link>
                    <button
                      onClick={() => setDeleteId(template.id)}
                      className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span className="hidden sm:inline">Löschen</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Delete Confirmation Modal */}
        {deleteId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full shadow-xl">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Vorlage löschen?</h3>
              <p className="text-slate-600 mb-6 text-sm sm:text-base">
                Möchten Sie diese E-Mail-Vorlage wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  Abbrechen
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm sm:text-base"
                >
                  Löschen
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
