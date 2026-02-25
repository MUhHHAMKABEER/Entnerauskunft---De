"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import EmailBodyEditor from "@/components/EmailBodyEditor";

const TEMPLATE_TYPE_OPTIONS = [
  "Freundliche Erinnerung",
  "Zahlung überfällig (Mahnung)",
  "1. Mahnung",
  "Letzte Mahnung",
] as const;

const PLACEHOLDERS = [
  "Name, [XXX], DD.MM.YYYY",
  "DATUM, [Datum]",
  "[konkretes Datum - 7 Tage]",
];

export default function EditTemplatePage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"Draft" | "Active">("Draft");
  const [templateType, setTemplateType] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedSubject, setCopiedSubject] = useState(false);

  useEffect(() => {
    fetchTemplate();
  }, [id]);

  async function fetchTemplate() {
    try {
      const res = await fetch(`/api/admin/email-templates/${id}`);
      const data = await res.json();

      if (data.success) {
        setName(data.template.name);
        setSubject(data.template.subject);
        setBody(data.template.body);
        setStatus(data.template.status);
        setTemplateType(data.template.template_type || "");
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

  async function copySubject() {
    try {
      await navigator.clipboard.writeText(subject);
      setCopiedSubject(true);
      setTimeout(() => setCopiedSubject(false), 2000);
    } catch (err) {
      console.error("Copy failed");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !subject.trim() || !body.trim()) {
      setError("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`/api/admin/email-templates/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          subject,
          body,
          status,
          template_type: templateType || null,
        }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin/email-templates");
      } else {
        setError(data.error || "Fehler beim Speichern");
      }
    } catch (err) {
      setError("Verbindungsfehler");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">E-Mail-Vorlage bearbeiten</h1>
            <p className="text-sm text-slate-500">Bearbeiten Sie den Betreff und die Nachricht und speichern Sie dann Ihre Änderungen.</p>
          </div>
          <Link
            href="/admin/email-templates"
            className="text-slate-600 hover:text-slate-900 font-medium"
          >
            Zurück
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Left Sidebar */}
          <div className="space-y-6">
            {/* Placeholders Section */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="text-slate-600 text-sm mb-3">Platzhalter, die Sie verwenden können:</h3>
              <ul className="space-y-1.5 text-sm text-slate-700">
                {PLACEHOLDERS.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Current Subject Preview */}
            {subject && (
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-5">
                <h3 className="font-semibold text-blue-800 text-sm mb-2">Aktueller Betreff:</h3>
                <p className="text-blue-900 text-sm">{subject}</p>
              </div>
            )}
          </div>

          {/* Right - Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Template Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Vorlagen-Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="z.B. Zahlungserinnerung"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Status
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStatus("Draft")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${status === "Draft"
                    ? "bg-slate-100 border-slate-300 text-slate-900"
                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                    }`}
                >
                  Entwurf
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("Active")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${status === "Active"
                    ? "bg-blue-100 border-blue-300 text-blue-900"
                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                    }`}
                >
                  Aktiv
                </button>
              </div>
            </div>

            {/* Template Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Vorlagen-Typ
              </label>
              <select
                value={templateType}
                onChange={(e) => setTemplateType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="">-- Typ wählen --</option>
                {TEMPLATE_TYPE_OPTIONS.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700">
                  Betreff
                </label>
                <button
                  type="button"
                  onClick={copySubject}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  {copiedSubject ? "Kopiert!" : "Text kopieren"}
                </button>
              </div>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Betreffzeile der E-Mail"
                required
              />
            </div>

            {/* Email Text */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                E-Mail-Text
              </label>
              <EmailBodyEditor value={body} onChange={setBody} />
              <p className="text-xs text-slate-500 mt-2">
                Tipp: Behalten Sie die Platzhalter wie [VORNAME], [NACHNAME] etc. bei, damit diese beim Senden automatisch ersetzt werden.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <Link
                href="/admin/email-templates"
                className="px-5 py-2.5 text-slate-600 hover:text-slate-900 font-medium rounded-lg hover:bg-slate-100 transition-colors"
              >
                Abbrechen
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {saving ? "Wird gespeichert..." : "Änderungen speichern"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
