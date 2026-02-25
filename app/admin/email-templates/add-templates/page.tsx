"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

const PRESETS = [
  {
    id: "falsche-vsnr",
    name: "Falsche Rentenversicherungsnummer",
    subject: "Ihre Rentenversicherungsnummer",
    template_type: "Freundliche Erinnerung",
    body: `<p>Sehr geehrte/r Frau/Herr [NAME],</p>
<p>Im Rahmen der Beantragung Ihrer Auskunft der Deutschen Rentenversicherung ist in Ihrem Fall eine zusätzliche Prüfung Ihrer Angaben erforderlich, da die von Ihnen angegebene Rentenversicherungsnummer (RVNR) in der aktuellen Form nicht korrekt bzw. nicht eindeutig zuordenbar ist.</p>
<p>Dies ist ein standardmäßiger Prüfschritt, der gelegentlich ausgelöst wird, um eine eindeutige Zuordnung sicherzustellen und Verzögerungen bei der Bearbeitung zu vermeiden.</p>
<p><strong>Was wir nun von Ihnen benötigen:</strong><br>Bitte senden Sie uns Ihre korrekte Rentenversicherungsnummer in gut lesbarer Form (einfach als Text in der Antwortmail genügt).</p>
<p><strong>Wichtig:</strong> Die RVNR hat ein festes Format. Beispiel (so sieht eine RVNR typischerweise aus):<br>12 345678 A 123<br>(2 Ziffern - 6 Ziffern - 1 Buchstabe - 3 Ziffern)</p>
<p>Bitte prüfen Sie insbesondere:<br>• Zahlendreher / fehlende Ziffern<br>• falscher Buchstabe<br>• zusätzliche Zeichen oder Leerzeichen an falscher Stelle</p>
<p>Sobald uns die korrekte RVNR vorliegt, führen wir die Beantragung unverzüglich fort.</p>
<p>Vielen Dank für Ihre Mitwirkung.</p>`,
  },
  {
    id: "zahlungserinnerung",
    name: "Zahlungserinnerung ohne Gebühr",
    subject: "Freundliche Erinnerung – Zahlung ausstehend (Rechnungsnr. [RECHNUNGSNR])",
    template_type: "Freundliche Erinnerung",
    body: `<p>Sehr geehrte/r [ANREDE] [NACHNAME],</p>
<p>wir möchten Sie freundlich daran erinnern, dass die Zahlung für Ihre Anfrage noch aussteht.</p>
<p><strong>Rechnungsdetails:</strong></p>
<ul>
<li>Rechnungsnummer: [RECHNUNGSNR]</li>
<li>Betrag: 29,90 €</li>
<li>Fällig am: [FAELLIG_AM]</li>
</ul>
<p>Bitte überweisen Sie den offenen Betrag auf folgendes Konto:</p>
<p><strong>IBAN:</strong> DE89 3704 0044 0532 0130 00<br>
<strong>BIC:</strong> COBADEFFXXX<br>
<strong>Verwendungszweck:</strong> [RECHNUNGSNR]</p>
<p>Falls Sie bereits bezahlt haben, ignorieren Sie bitte diese Nachricht.</p>
<p>Mit freundlichen Grüßen,<br>Ihr Rentenauskunft Service Team</p>`,
  },
  {
    id: "zahlungserinnerung-gebuehr",
    name: "Zahlungserinnerung mit Gebühr",
    subject: "Zahlungserinnerung – Mahngebühr fällig (Rechnungsnr. [RECHNUNGSNR])",
    template_type: "Zahlung überfällig (Mahnung)",
    body: `<p>Sehr geehrte/r [ANREDE] [NACHNAME],</p>
<p>trotz unserer vorherigen Erinnerung konnten wir leider keinen Zahlungseingang für Ihre Rechnung feststellen.</p>
<p><strong>Offener Betrag:</strong></p>
<ul>
<li>Ursprungsbetrag: 29,90 €</li>
<li>Mahngebühr: 5,00 €</li>
<li><strong>Gesamtbetrag: 34,90 €</strong></li>
</ul>
<p>Bitte begleichen Sie den Betrag innerhalb der nächsten <strong>7 Tage</strong>, um weitere Mahngebühren zu vermeiden.</p>
<p><strong>Bankverbindung:</strong><br>
IBAN: DE89 3704 0044 0532 0130 00<br>
BIC: COBADEFFXXX<br>
Verwendungszweck: [RECHNUNGSNR]</p>
<p>Bei Fragen stehen wir Ihnen gerne zur Verfügung.</p>
<p>Mit freundlichen Grüßen,<br>Ihr Rentenauskunft Service Team</p>`,
  },
  {
    id: "erste-mahnung",
    name: "1. Mahnung",
    subject: "1. Mahnung – Zahlungsaufforderung (Rechnungsnr. [RECHNUNGSNR])",
    template_type: "1. Mahnung",
    body: `<p>Sehr geehrte/r [ANREDE] [NACHNAME],</p>
<p>leider mussten wir feststellen, dass trotz unserer Zahlungserinnerungen der offene Betrag noch nicht bei uns eingegangen ist.</p>
<p><strong>Dies ist die 1. Mahnung.</strong></p>
<p><strong>Offener Gesamtbetrag: [BETRAG] €</strong><br>
(inkl. Mahngebühren)</p>
<p>Wir fordern Sie hiermit auf, den Betrag innerhalb von <strong>10 Tagen</strong> zu überweisen.</p>
<p><strong>Bankverbindung:</strong><br>
IBAN: DE89 3704 0044 0532 0130 00<br>
BIC: COBADEFFXXX<br>
Verwendungszweck: [RECHNUNGSNR]</p>
<p>Sollte der Betrag nicht fristgerecht eingehen, behalten wir uns weitere rechtliche Schritte vor.</p>
<p>Mit freundlichen Grüßen,<br>Ihr Rentenauskunft Service Team</p>`,
  },
  {
    id: "letzte-mahnung",
    name: "Letzte Mahnung",
    subject: "Letzte Mahnung vor Inkasso – Dringend! (Rechnungsnr. [RECHNUNGSNR])",
    template_type: "Letzte Mahnung",
    body: `<p>Sehr geehrte/r [ANREDE] [NACHNAME],</p>
<p><strong>Dies ist unsere letzte Mahnung vor Übergabe an ein Inkassounternehmen.</strong></p>
<p>Trotz mehrfacher Aufforderungen ist der offene Betrag nicht bei uns eingegangen.</p>
<p><strong>Offener Gesamtbetrag: [BETRAG] €</strong></p>
<p>Wir geben Ihnen eine <strong>letzte Frist von 5 Tagen</strong>, um die Zahlung zu leisten.</p>
<p><strong>Bankverbindung:</strong><br>
IBAN: DE89 3704 0044 0532 0130 00<br>
BIC: COBADEFFXXX<br>
Verwendungszweck: [RECHNUNGSNR]</p>
<p>Nach Ablauf dieser Frist werden wir die Forderung ohne weitere Ankündigung an ein Inkassounternehmen übergeben. Dies wird zusätzliche Kosten für Sie verursachen.</p>
<p>Bitte nehmen Sie diese Mahnung ernst und handeln Sie umgehend.</p>
<p>Mit freundlichen Grüßen,<br>Ihr Rentenauskunft Service Team</p>`,
  },
];

export default function AddTemplatePage() {
  const [selectedPreset, setSelectedPreset] = useState<string>("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"Draft" | "Active">("Draft");
  const [templateType, setTemplateType] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedSubject, setCopiedSubject] = useState(false);
  const router = useRouter();

  function loadPreset(presetId: string) {
    const preset = PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setSelectedPreset(presetId);
      setName(preset.name);
      setSubject(preset.subject);
      setBody(preset.body);
      setTemplateType(preset.template_type);
    }
  }

  function handleClear() {
    setSelectedPreset("");
    setName("");
    setSubject("");
    setBody("");
    setStatus("Draft");
    setTemplateType("");
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
      const res = await fetch("/api/admin/email-templates", {
        method: "POST",
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

  const currentPreset = PRESETS.find((p) => p.id === selectedPreset);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">E-Mail-Vorlage hinzufügen</h1>
            <p className="text-sm text-slate-500">Wählen Sie eine Vorlage aus und bearbeiten Sie dann den Betreff und die Nachricht, bevor Sie sie speichern.</p>
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
          {/* Left Sidebar - Presets */}
          <div className="space-y-6">
            {/* Presets Section */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-4">Vorlagen</h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-slate-600 mb-1.5">Vorlage wählen</label>
                  <select
                    value={selectedPreset}
                    onChange={(e) => loadPreset(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  >
                    <option value="">-- Wählen --</option>
                    {PRESETS.map((preset) => (
                      <option key={preset.id} value={preset.id}>
                        {preset.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

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

            {/* Preset Subject Preview */}
            {currentPreset && (
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-5">
                <h3 className="font-semibold text-blue-800 text-sm mb-2">Betreff-Vorschau:</h3>
                <p className="text-blue-900 text-sm">{currentPreset.subject}</p>
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
              <button
                type="button"
                onClick={handleClear}
                className="px-5 py-2.5 text-slate-600 hover:text-slate-900 font-medium rounded-lg hover:bg-slate-100 transition-colors"
              >
                Leeren
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {saving ? "Wird gespeichert..." : "Vorlage speichern"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
