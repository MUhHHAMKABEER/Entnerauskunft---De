import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seite nicht gefunden – 404 | Rentenauskunft Service",
  description: "Die angeforderte Seite wurde nicht gefunden.",
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-center space-y-6">
        {/* 404 Grafik */}
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-renten-blue/10 border-4 border-renten-blue/20">
          <span className="font-heading text-6xl font-bold text-renten-blue">
            404
          </span>
        </div>

        {/* Überschrift */}
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-slate-900">
          Seite nicht gefunden
        </h1>

        {/* Beschreibung */}
        <p className="text-slate-700 max-w-xl mx-auto">
          Die von Ihnen angeforderte Seite existiert leider nicht oder wurde
          verschoben. Bitte überprüfen Sie die URL oder kehren Sie zur
          Startseite zurück.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-renten-blue px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-renten-blue/90 transition-colors"
          >
            <span className="text-white">Zur Startseite</span>
          </a>
          <a
            href="/ratgeber"
            className="inline-flex items-center justify-center rounded-xl bg-white border-2 border-renten-blue px-8 py-3 text-sm font-semibold text-renten-blue hover:bg-renten-blue hover:text-white transition-colors"
          >
            Zum Ratgeber
          </a>
        </div>

        {/* Hilfreiche Links */}
        <div className="pt-12">
          <h2 className="font-heading text-lg font-semibold text-slate-900 mb-4">
            Vielleicht suchen Sie nach:
          </h2>
          <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <a
              href="/rente-beantragen"
              className="block bg-white rounded-lg border border-slate-200 p-4 hover:border-renten-blue transition-colors text-left"
            >
              <h3 className="font-heading text-sm font-semibold text-renten-blue mb-1">
                Rente beantragen
              </h3>
              <p className="text-xs text-slate-600">
                Rentenantrag stellen und Altersrente vorbereiten
              </p>
            </a>
            <a
              href="/renteninformation"
              className="block bg-white rounded-lg border border-slate-200 p-4 hover:border-renten-blue transition-colors text-left"
            >
              <h3 className="font-heading text-sm font-semibold text-renten-blue mb-1">
                Rentenauskunft
              </h3>
              <p className="text-xs text-slate-600">
                Rentenauskunft und Renteninformation anfordern
              </p>
            </a>
            <a
              href="/rentenrechner"
              className="block bg-white rounded-lg border border-slate-200 p-4 hover:border-renten-blue transition-colors text-left"
            >
              <h3 className="font-heading text-sm font-semibold text-renten-blue mb-1">
                Rentenrechner
              </h3>
              <p className="text-xs text-slate-600">
                Gesetzliche Rente berechnen
              </p>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
