import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rentenlücke berechnen – So schließen Sie Ihre Versorgungslücke",
  description:
    "Rentenlücke berechnen und schließen: Wie groß ist Ihre Versorgungslücke? Tipps zur privaten und betrieblichen Altersvorsorge.",
  openGraph: {
    title: "Rentenlücke berechnen und schließen",
    description:
      "Berechnen Sie Ihre Rentenlücke und erfahren Sie, wie Sie Ihre Versorgungslücke mit privater Altersvorsorge schließen können.",
    url: "https://rentnerauskunft.de/ratgeber/rentenluecke-berechnen",
    siteName: "Rentenauskunft Service",
    locale: "de_DE",
    type: "article",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Startseite",
      item: "https://rentnerauskunft.de/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Ratgeber",
      item: "https://rentnerauskunft.de/ratgeber",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Rentenlücke berechnen",
      item: "https://rentnerauskunft.de/ratgeber/rentenluecke-berechnen",
    },
  ],
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs */}
      <nav
        aria-label="Brotkrumen"
        className="text-xs text-slate-800 mb-2 flex flex-wrap gap-1"
      >
        <a href="/" className="text-renten-blue hover:underline">
          Startseite
        </a>
        <span>/</span>
        <a href="/ratgeber" className="text-renten-blue hover:underline">
          Ratgeber
        </a>
        <span>/</span>
        <span className="text-slate-900 font-semibold">
          Rentenlücke berechnen
        </span>
      </nav>

      {/* Hero */}
      <div className="relative h-80 rounded-2xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=600&fit=crop"
          alt="Altersvorsorge und Rentenplanung"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40 flex items-center">
          <div className="mx-auto max-w-4xl px-6">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Rentenlücke berechnen und schließen
            </h1>
            <p className="text-lg md:text-xl text-slate-100 max-w-2xl">
              So ermitteln Sie Ihre Versorgungslücke und sorgen rechtzeitig vor
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="bg-white rounded-2xl shadow-soft border border-slate-100 px-6 py-8 md:px-10 md:py-10 space-y-6 text-sm text-slate-700">
        <h2 className="font-heading text-2xl font-semibold text-renten-blue">
          Was ist die Rentenlücke?
        </h2>
        <p>
          Die <strong>Rentenlücke</strong> (auch Versorgungslücke genannt) ist
          die Differenz zwischen Ihrem letzten Nettoeinkommen vor dem Ruhestand
          und Ihrer späteren gesetzlichen Nettorente. In den meisten Fällen
          reicht die gesetzliche Rente nicht aus, um den gewohnten
          Lebensstandard zu halten.
        </p>
        <p>
          Experten empfehlen, etwa 80% des letzten Nettoeinkommens als Ziel für
          die Altersversorgung anzustreben. Die Differenz zwischen diesem Ziel
          und Ihrer tatsächlichen Rente ist Ihre Rentenlücke.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-renten-blue mt-8">
          So berechnen Sie Ihre Rentenlücke
        </h2>
        
        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
          <h3 className="font-heading text-lg font-semibold text-slate-900 mb-4">
            Schritt-für-Schritt-Berechnung
          </h3>
          <ol className="space-y-4 list-decimal pl-5">
            <li>
              <strong>Aktuelles Nettoeinkommen ermitteln:</strong> Nehmen Sie
              Ihr aktuelles monatliches Nettoeinkommen als Ausgangspunkt.
            </li>
            <li>
              <strong>Zieleinkommen im Ruhestand festlegen:</strong>{" "}
              Multiplizieren Sie Ihr Nettoeinkommen mit 0,8 (80%). Das ist Ihr
              Zieleinkommen.
            </li>
            <li>
              <strong>Gesetzliche Nettorente berechnen:</strong> Fordern Sie
              eine <a href="/" className="text-renten-blue underline">Rentenauskunft</a> an
              und ziehen Sie von der Bruttorente Kranken- und
              Pflegeversicherung sowie Steuern ab.
            </li>
            <li>
              <strong>Rentenlücke ermitteln:</strong> Zieleinkommen minus
              gesetzliche Nettorente = Ihre Rentenlücke.
            </li>
          </ol>
        </div>

        <div className="bg-renten-blue/5 rounded-lg p-6 border border-renten-blue/20">
          <h3 className="font-heading text-lg font-semibold text-renten-blue mb-3">
            Beispielrechnung
          </h3>
          <ul className="space-y-2">
            <li>Aktuelles Nettoeinkommen: 3.000 €</li>
            <li>Zieleinkommen (80%): 2.400 €</li>
            <li>Gesetzliche Nettorente: 1.500 €</li>
            <li className="font-semibold text-renten-blue">
              Rentenlücke: 900 € pro Monat
            </li>
          </ul>
          <p className="mt-4 text-sm">
            In diesem Beispiel müssten Sie zusätzlich 900 € pro Monat aus
            privater oder betrieblicher Altersvorsorge aufbringen, um Ihren
            Lebensstandard zu halten.
          </p>
        </div>

        <h2 className="font-heading text-2xl font-semibold text-renten-blue mt-8">
          So schließen Sie Ihre Rentenlücke
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-5 border border-slate-200">
            <h3 className="font-heading text-base font-semibold text-renten-blue mb-2">
              Betriebliche Altersvorsorge
            </h3>
            <p>
              Viele Arbeitgeber bieten eine betriebliche Altersvorsorge an.
              Durch Entgeltumwandlung sparen Sie Steuern und
              Sozialversicherungsbeiträge. Oft zahlt der Arbeitgeber zusätzlich
              einen Zuschuss.
            </p>
          </div>

          <div className="bg-white rounded-lg p-5 border border-slate-200">
            <h3 className="font-heading text-base font-semibold text-renten-blue mb-2">
              Private Altersvorsorge
            </h3>
            <p>
              Riester-Rente, Rürup-Rente oder private Rentenversicherungen
              können die Rentenlücke schließen. Auch ETF-Sparpläne oder
              Immobilien sind beliebte Optionen.
            </p>
          </div>

          <div className="bg-white rounded-lg p-5 border border-slate-200">
            <h3 className="font-heading text-base font-semibold text-renten-blue mb-2">
              Freiwillige Rentenbeiträge
            </h3>
            <p>
              Sie können freiwillige Beiträge in die gesetzliche
              Rentenversicherung einzahlen, um Ihre spätere Rente zu erhöhen.
              Besonders sinnvoll bei Lücken im Versicherungsverlauf.
            </p>
          </div>

          <div className="bg-white rounded-lg p-5 border border-slate-200">
            <h3 className="font-heading text-base font-semibold text-renten-blue mb-2">
              Länger arbeiten
            </h3>
            <p>
              Jeder Monat, den Sie über die Regelaltersgrenze hinaus arbeiten,
              erhöht Ihre Rente um 0,5%. Gleichzeitig sammeln Sie weitere
              Entgeltpunkte.
            </p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mt-6">
          <h3 className="font-heading text-base font-semibold text-amber-900 mb-2">
            Wichtig: Je früher, desto besser
          </h3>
          <p className="text-amber-900">
            Je früher Sie mit der privaten Altersvorsorge beginnen, desto
            geringer ist die monatliche Belastung. Wer mit 30 Jahren anfängt,
            muss deutlich weniger zurücklegen als jemand, der erst mit 50
            startet.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-renten-blue text-white rounded-2xl shadow-soft px-6 py-8 md:px-10 md:py-10 text-center space-y-4">
        <h2 className="font-heading text-2xl font-semibold">
          Jetzt Rentenauskunft anfordern und Rentenlücke ermitteln
        </h2>
        <p className="text-sm text-slate-100 max-w-2xl mx-auto">
          Fordern Sie eine aktuelle Rentenauskunft an, um Ihre voraussichtliche
          Rentenhöhe zu erfahren und Ihre Rentenlücke zu berechnen.
        </p>
        <div className="flex flex-wrap gap-4 justify-center pt-2">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-renten-accent px-8 py-3 text-sm font-semibold text-renten-blue shadow-sm hover:bg-white transition-colors"
          >
            Rentenauskunft beantragen
          </a>
          <a
            href="/rentenrechner"
            className="inline-flex items-center justify-center rounded-xl bg-white border-2 border-white px-8 py-3 text-sm font-semibold text-renten-blue hover:bg-transparent hover:text-white transition-colors"
          >
            Rente berechnen
          </a>
        </div>
      </section>

      {/* Weitere Artikel */}
      <section className="bg-slate-50 rounded-2xl border border-slate-200 px-6 py-8 md:px-10 md:py-10">
        <h2 className="font-heading text-xl font-semibold text-renten-blue mb-6">
          Weitere hilfreiche Artikel
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <a
            href="/ratgeber/checkliste-ruhestand"
            className="block bg-white rounded-lg border border-slate-200 p-5 hover:border-renten-blue transition-colors"
          >
            <h3 className="font-heading text-base font-semibold text-renten-blue mb-2">
              Checkliste für den Ruhestand
            </h3>
            <p className="text-sm text-slate-700">
              Alle wichtigen Schritte für einen entspannten Übergang in die
              Rente.
            </p>
          </a>
          <a
            href="/ratgeber/haeufige-fehler"
            className="block bg-white rounded-lg border border-slate-200 p-5 hover:border-renten-blue transition-colors"
          >
            <h3 className="font-heading text-base font-semibold text-renten-blue mb-2">
              Häufige Fehler bei Rentenunterlagen
            </h3>
            <p className="text-sm text-slate-700">
              Die 10 häufigsten Fehler vermeiden und Rentenauskunft richtig
              prüfen.
            </p>
          </a>
        </div>
      </section>
    </main>
  );
}
