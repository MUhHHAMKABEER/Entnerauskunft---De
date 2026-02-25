import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anforderung erfasst | Rentenauskunft Service",
  description: "Ihre Anforderung wurde erfolgreich erfasst und wird bearbeitet.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-renten-blue text-white border-b-4 border-renten-accent">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <h1 className="font-heading text-2xl md:text-3xl font-semibold">
            Anforderung erfasst
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-6 py-10">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft px-6 py-8 md:px-10 md:py-10 space-y-8">
          
          {/* Status */}
          <div className="flex items-start gap-4 bg-emerald-50 border border-emerald-200 rounded-lg p-5">
            <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mt-0.5">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="font-heading text-lg font-semibold text-emerald-900 mb-2">
                Ihre Anforderung wurde erfolgreich erfasst
              </h2>
              <p className="text-sm text-emerald-800">
                Die von Ihnen übermittelten Daten werden nun verarbeitet und an die zuständige Stelle der Deutschen Rentenversicherung weitergeleitet.
              </p>
            </div>
          </div>

          {/* Nächste Schritte */}
          <div className="space-y-6">
            <h2 className="font-heading text-xl font-semibold text-slate-900">
              Wie geht es weiter?
            </h2>

            {/* Schritt 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-renten-blue text-white rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-heading text-base font-semibold text-slate-900 mb-2">
                  E-Mail-Bestätigung
                </h3>
                <p className="text-sm text-slate-700">
                  Sie erhalten <strong>innerhalb weniger Minuten</strong> eine E-Mail-Bestätigung an die von Ihnen angegebene E-Mail-Adresse. Diese Bestätigung enthält eine Übersicht Ihrer Anforderung sowie Ihre Auftragsnummer.
                </p>
                <p className="text-xs text-slate-600 mt-2 bg-slate-50 rounded p-3">
                  <strong>Hinweis:</strong> Bitte prüfen Sie auch Ihren Spam-Ordner, falls die E-Mail nicht im Posteingang erscheint.
                </p>
              </div>
            </div>

            {/* Schritt 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-renten-blue text-white rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-heading text-base font-semibold text-slate-900 mb-2">
                  Bearbeitung durch die Deutsche Rentenversicherung
                </h3>
                <p className="text-sm text-slate-700">
                  Ihre Anforderung wird an die zuständige Stelle der Deutschen Rentenversicherung weitergeleitet. Die Bearbeitung erfolgt gemäß den gesetzlichen Vorgaben und unter Berücksichtigung der bei der Rentenversicherung hinterlegten Daten.
                </p>
              </div>
            </div>

            {/* Schritt 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-renten-blue text-white rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-heading text-base font-semibold text-slate-900 mb-2">
                  Postalischer Versand der Unterlagen
                </h3>
                <p className="text-sm text-slate-700 mb-3">
                  Die angeforderten Unterlagen werden Ihnen von der Deutschen Rentenversicherung <strong>innerhalb von 5–7 Werktagen</strong> per Post zugesandt.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-blue-900 font-semibold">
                    Wichtiger Hinweis zur Zustellung:
                  </p>
                  <p className="text-sm text-blue-800">
                    Die Unterlagen werden an die <strong>bei der Deutschen Rentenversicherung hinterlegte Adresse</strong> zu Ihrer angegebenen Versicherungsnummer versendet. Dies dient Ihrer Sicherheit und entspricht den datenschutzrechtlichen Vorgaben der gesetzlichen Rentenversicherung.
                  </p>
                  <p className="text-sm text-blue-800">
                    Sollte Ihre aktuelle Wohnanschrift von der bei der Rentenversicherung hinterlegten Adresse abweichen, wenden Sie sich bitte direkt an die Deutsche Rentenversicherung, um Ihre Adressdaten zu aktualisieren.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Rechnung */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="font-heading text-base font-semibold text-slate-900 mb-3">
              Servicegebühr und Rechnung
            </h3>
            <p className="text-sm text-slate-700 mb-3">
              Für die Erfassung und Weiterleitung Ihrer Anforderung wird eine einmalige Servicegebühr von <strong>29,90 € inkl. MwSt.</strong> berechnet. Die Rechnung wird Ihnen separat per E-Mail zugestellt.
            </p>
            <p className="text-sm text-slate-700">
              Die Zahlung erfolgt bequem per Rechnung. Weitere Informationen zur Zahlungsabwicklung entnehmen Sie bitte der Rechnung.
            </p>
          </div>

          {/* Kontakt */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="font-heading text-base font-semibold text-slate-900 mb-3">
              Fragen oder Anliegen?
            </h3>
            <p className="text-sm text-slate-700 mb-3">
              Bei Fragen zu Ihrer Anforderung oder zum weiteren Ablauf können Sie sich jederzeit an uns wenden:
            </p>
            <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-700">
              <p>E-Mail: <a href="mailto:info@rentnerauskunft.de" className="text-renten-blue hover:underline font-semibold">info@rentnerauskunft.de</a></p>
            </div>
          </div>

          {/* Zurück Button */}
          <div className="border-t border-slate-200 pt-6">
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-renten-blue px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-renten-blue/90 focus:outline-none focus:ring-2 focus:ring-renten-blue focus:ring-offset-2"
            >
              <span className="text-white">Zurück zur Startseite</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
