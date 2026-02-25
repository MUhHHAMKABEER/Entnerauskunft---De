"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
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

export default function ViewTemplatePage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    fetchTemplate();
  }, [id]);

  async function fetchTemplate() {
    try {
      const res = await fetch(`/api/admin/email-templates/${id}`);
      const data = await res.json();

      if (data.success) {
        setTemplate(data.template);
      } else {
        if (res.status === 401) {
          router.push("/admin/login");
        } else if (res.status === 404) {
          setError("Vorlage nicht gefunden");
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

  async function copyToClipboard(text: string, type: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      alert("Fehler beim Kopieren");
    }
  }

  function stripHtml(html: string) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#083163]"></div>
      </div>
    );
  }

  if (error || !template) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-[#083163] text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
            <Link href="/admin/email-templates" className="text-white/80 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold">Vorlage ansehen</h1>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-700">{error || "Vorlage nicht gefunden"}</p>
            <Link href="/admin/email-templates" className="inline-block mt-4 text-[#083163] hover:underline">
              Zurück zur Übersicht
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-[#083163] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/email-templates" className="text-white/80 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold">Vorlage ansehen</h1>
          </div>
          <Link
            href={`/admin/email-templates/edit-templates/${id}`}
            className="bg-white px-4 py-2 rounded-lg font-semibold hover:bg-slate-100 transition-colors flex items-center gap-2"
            style={{ color: "#083163" }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Bearbeiten
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Vorlagen-Name</p>
              <p className="font-semibold text-slate-900">{template.name}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Status</p>
              <span
                className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                  template.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {template.status === "Active" ? "Aktiv" : "Entwurf"}
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Vorlagen-Typ</p>
              <p className="text-slate-900">{template.template_type || "-"}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Erstellt am</p>
              <p className="text-slate-900">
                {new Date(template.created_at).toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Subject */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-slate-500 uppercase tracking-wide">Betreff</p>
            <button
              onClick={() => copyToClipboard(template.subject, "subject")}
              className="text-slate-500 hover:text-[#083163] p-1 rounded transition-colors"
              title="Betreff kopieren"
            >
              {copied === "subject" ? (
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-slate-900 font-medium">{template.subject}</p>
        </div>

        {/* Body - HTML Preview */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-slate-500 uppercase tracking-wide">E-Mail-Text (HTML)</p>
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(template.body, "html")}
                className="text-slate-500 hover:text-[#083163] p-1 rounded transition-colors flex items-center gap-1 text-sm"
                title="HTML kopieren"
              >
                {copied === "html" ? (
                  <>
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-green-600">Kopiert!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>HTML</span>
                  </>
                )}
              </button>
              <button
                onClick={() => copyToClipboard(stripHtml(template.body), "text")}
                className="text-slate-500 hover:text-[#083163] p-1 rounded transition-colors flex items-center gap-1 text-sm"
                title="Text kopieren"
              >
                {copied === "text" ? (
                  <>
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-green-600">Kopiert!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Text</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <div
            className="prose prose-sm max-w-none p-4 bg-slate-50 rounded-xl border border-slate-200"
            dangerouslySetInnerHTML={{ __html: template.body }}
          />
        </div>

      </main>
    </div>
  );
}
