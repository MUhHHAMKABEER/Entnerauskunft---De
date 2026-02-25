import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Rentenbezugsbescheinigung Finanzamt | Steuerbescheinigung Rente',
  description: 'Rentenbezugsbescheinigung für das Finanzamt anfordern. Steuerbescheinigung für Rentner – Information über Meldung an die Finanzverwaltung schnell online beantragen.',
  keywords: 'rentenbezugsbescheinigung, rentenbezugsbescheinigung finanzamt, steuerbescheinigung rente, information über meldung an die finanzverwaltung',
  alternates: { canonical: 'https://rentnerauskunft.de/rentenbezugsbescheinigung-finanzamt' },
  openGraph: {
    title: 'Rentenbezugsbescheinigung Finanzamt | Steuerbescheinigung Rente',
    description: 'Rentenbezugsbescheinigung für das Finanzamt anfordern. Steuerbescheinigung für Rentner – Information über Meldung an die Finanzverwaltung schnell online beantragen.',
    type: 'website',
    url: 'https://rentnerauskunft.de/rentenbezugsbescheinigung-finanzamt'
  }
};

export default function RentenbezugsbescheinigungFinanzamt() {
  return (
    <>
      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Rentenbezugsbescheinigung (Finanzamt) anfordern',
            description: 'Service zur Beantragung der Rentenbezugsbescheinigung und Information über Meldung an die Finanzverwaltung',
            provider: { '@type': 'Organization', name: 'REGIS DATASEC LTD' },
            areaServed: 'DE',
            serviceType: 'Rentenbezugsbescheinigung Finanzamt'
          })
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://rentnerauskunft.de' },
              { '@type': 'ListItem', position: 2, name: 'Rentenbezugsbescheinigung Finanzamt', item: 'https://rentnerauskunft.de/rentenbezugsbescheinigung-finanzamt' }
            ]
          })
        }}
      />

      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-br from-renten-blue to-[#0a4178] text-white py-16">
          <div className="max-w-5xl mx-auto px-6">
            <nav className="text-sm mb-6 opacity-90">
              <Link href="/" className="hover:underline">Startseite</Link>
              <span className="mx-2">/</span>
              <span>Rentenbezugsbescheinigung Finanzamt</span>
            </nav>

            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Rentenbezugsbescheinigung (Finanzamt) anfordern
            </h1>

            <p className="text-xl text-slate-100 max-w-3xl mb-8">
              Fordern Sie Ihre Rentenbezugsbescheinigung für die Steuererklärung sowie die Information über Meldung an die Finanzverwaltung schnell und unkompliziert an.
            </p>

            <Link 
              href="/#formular"
              className="inline-flex items-center px-6 py-3 bg-renten-accent font-semibold rounded-lg hover:bg-renten-accent/90 transition-colors"
              style={{ color: '#ffffff' }}
            >
              Jetzt Bescheinigung anfordern
            </Link>
          </div>
        </section>

        <article className="max-w-5xl mx-auto px-6 py-12">
          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-6">
              Was ist die Rentenbezugsbescheinigung?
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-4">
                Die <strong>Rentenbezugsbescheinigung</strong> weist die im Kalenderjahr ausgezahlten Rentenbeträge aus und wird für die <strong>Steuererklärung</strong> benötigt. Zusätzlich kann die <strong>Information über Meldung an die Finanzverwaltung</strong> für ein bestimmtes Jahr angefordert werden.
              </p>
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-white rounded-lg border-l-4 border-renten-blue p-6">
                  <h3 className="font-semibold text-lg text-renten-blue mb-3">Versichertenrente</h3>
                  <p className="text-sm text-slate-700">Bescheinigung der ausgezahlten Rentenbeträge für eigene Rentenbezüge.</p>
                </div>
                <div className="bg-white rounded-lg border-l-4 border-renten-accent p-6">
                  <h3 className="font-semibold text-lg text-renten-blue mb-3">Hinterbliebenenrente</h3>
                  <p className="text-sm text-slate-700">Bescheinigung für Hinterbliebenenleistungen (z. B. Witwen-/Witwerrente).</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-6">
              Benötigte Angaben
            </h2>
            <div className="bg-white rounded-xl border border-slate-200 p-8">
              <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                <li>Rentenversicherungsnummer</li>
                <li>Zeitraum/Jahr der Bescheinigung</li>
                <li>Art der Rente (Versicherten- oder Hinterbliebenenrente)</li>
                <li>Aktuelle Kontaktdaten</li>
              </ul>
              <div className="mt-6 p-4 bg-slate-50 rounded">
                <p className="text-sm text-slate-700">
                  Tipp: Wählen Sie im Formular die passende Unterlage „Rentenbezugsbescheinigung“ bzw. „Information über Meldung an die Finanzverwaltung“.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-renten-blue to-[#0a4178] text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Jetzt Rentenbezugsbescheinigung anfordern
            </h2>
            <p className="text-xl text-slate-100 mb-8 max-w-2xl mx-auto">
              Beantragen Sie Ihre Steuerbescheinigung für die nächste Steuererklärung – schnell und unkompliziert.
            </p>
            <Link 
              href="/#formular"
              className="inline-flex items-center px-8 py-4 bg-renten-accent font-semibold rounded-lg hover:bg-renten-accent/90 transition-colors shadow-lg"
              style={{ color: '#ffffff' }}
            >
              Bescheinigung jetzt anfordern
            </Link>
          </section>

          <div className="mt-12 p-6 bg-slate-100 rounded-lg text-sm text-slate-600">
            <p>
              <strong>Hinweis:</strong> Rentnerauskunft.de ist ein unabhängiger Service. Wir unterstützen Sie bei der strukturierten Erfassung und Weiterleitung Ihrer Anforderung an die Deutsche Rentenversicherung.
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
