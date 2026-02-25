import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Unterschied Rentenauskunft & Renteninformation | Überblick',
  description: 'Unterschied zwischen Rentenauskunft, Renteninformation und Versicherungsverlauf erklärt. Vergleich der wichtigsten Rentenunterlagen der DRV.',
  keywords: 'unterschied rentenauskunft renteninformation, rentenauskunft vs renteninformation, versicherungsverlauf unterschied, rentenunterlagen vergleich',
  alternates: {
    canonical: 'https://rentnerauskunft.de/unterschied-rentenauskunft-renteninformation-versicherungsverlauf'
  },
  openGraph: {
    title: 'Unterschied Rentenauskunft & Renteninformation | Überblick',
    description: 'Unterschied zwischen Rentenauskunft, Renteninformation und Versicherungsverlauf erklärt. Vergleich der wichtigsten Rentenunterlagen der DRV.',
    type: 'website',
    url: 'https://rentnerauskunft.de/unterschied-rentenauskunft-renteninformation-versicherungsverlauf'
  }
};

export default function UnterschiedRentenunterlagen() {
  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://rentnerauskunft.de" },
              { "@type": "ListItem", "position": 2, "name": "Unterschied Rentenauskunft, Renteninformation & Versicherungsverlauf", "item": "https://rentnerauskunft.de/unterschied-rentenauskunft-renteninformation-versicherungsverlauf" }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Was ist der Unterschied zwischen Rentenauskunft und Renteninformation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Die Renteninformation erhalten Sie jährlich ab 27 Jahren und gibt eine kompakte Übersicht über Ihren aktuellen Rentenanspruch. Die Rentenauskunft ist ausführlicher, wird ab 55 Jahren alle 3 Jahre verschickt und enthält detaillierte Berechnungen verschiedener Rentenszenarien."
                }
              },
              {
                "@type": "Question",
                "name": "Was zeigt der Versicherungsverlauf?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Der Versicherungsverlauf ist eine chronologische Auflistung aller gespeicherten Zeiten in Ihrem Rentenkonto - inklusive Beschäftigungszeiten, Beiträge, Kindererziehungszeiten und mögliche Lücken."
                }
              }
            ]
          })
        }}
      />

      <div className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-renten-blue to-[#0a4178] text-white py-16">
          <div className="max-w-5xl mx-auto px-6">
            <nav className="text-sm mb-6 opacity-90">
              <Link href="/" className="hover:underline">Startseite</Link>
              <span className="mx-2">/</span>
              <span>Unterschied Rentenauskunft, Renteninformation & Versicherungsverlauf</span>
            </nav>
            
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Unterschied: Rentenauskunft, Renteninformation & Versicherungsverlauf
            </h1>
            
            <p className="text-xl text-slate-100 max-w-3xl">
              Welches Dokument brauchen Sie wirklich? Ein detaillierter Vergleich der drei wichtigsten Rentenunterlagen der Deutschen Rentenversicherung.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <article className="max-w-5xl mx-auto px-6 py-12">
          
          {/* Vergleichstabelle */}
          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-8">
              Schnellvergleich: Die drei Dokumente im Überblick
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-sm border border-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-slate-900">Kriterium</th>
                    <th className="px-6 py-4 text-left font-semibold text-renten-blue">Rentenauskunft</th>
                    <th className="px-6 py-4 text-left font-semibold text-renten-blue">Renteninformation</th>
                    <th className="px-6 py-4 text-left font-semibold text-renten-blue">Versicherungsverlauf</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-900">Ab wann?</td>
                    <td className="px-6 py-4 text-slate-700">Ab 55 Jahren (oder auf Antrag)</td>
                    <td className="px-6 py-4 text-slate-700">Ab 27 Jahren</td>
                    <td className="px-6 py-4 text-slate-700">Jederzeit</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-900">Wie oft?</td>
                    <td className="px-6 py-4 text-slate-700">Alle 3 Jahre automatisch</td>
                    <td className="px-6 py-4 text-slate-700">Jährlich automatisch</td>
                    <td className="px-6 py-4 text-slate-700">Auf Anforderung</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-900">Umfang</td>
                    <td className="px-6 py-4 text-slate-700">Ausführlich (mehrere Seiten)</td>
                    <td className="px-6 py-4 text-slate-700">Kompakt (1-2 Seiten)</td>
                    <td className="px-6 py-4 text-slate-700">Detailliert (chronologisch)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-900">Inhalt</td>
                    <td className="px-6 py-4 text-slate-700">Detaillierte Rentenberechnung mit Szenarien</td>
                    <td className="px-6 py-4 text-slate-700">Aktuelle Rentenansprüche + Hochrechnung</td>
                    <td className="px-6 py-4 text-slate-700">Alle Versicherungszeiten & Beiträge</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-900">Zweck</td>
                    <td className="px-6 py-4 text-slate-700">Konkrete Rentenplanung</td>
                    <td className="px-6 py-4 text-slate-700">Jährlicher Überblick</td>
                    <td className="px-6 py-4 text-slate-700">Lücken prüfen, Kontenklärung</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Detaillierte Erklärungen */}
          <section className="mb-16 space-y-12">
            
            {/* Rentenauskunft */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-renten-blue text-white rounded-lg flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-renten-blue mb-2">
                    Die Rentenauskunft
                  </h2>
                  <p className="text-slate-600">Ausführliche Rentenberechnung ab 55 Jahren</p>
                </div>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Was steht drin?</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
                  <li><strong>Regelaltersrente:</strong> Voraussichtliche Rentenhöhe bei Renteneintritt mit 67 Jahren</li>
                  <li><strong>Vorzeitige Altersrente:</strong> Berechnung bei früherem Rentenbeginn (z.B. mit 63)</li>
                  <li><strong>Erwerbsminderungsrente:</strong> Anspruch bei voller/teilweiser Erwerbsminderung</li>
                  <li><strong>Rentenanpassungen:</strong> Hochrechnungen mit verschiedenen Anpassungssätzen</li>
                  <li><strong>Versicherungszeiten:</strong> Übersicht der bisher erreichten Rentenanwartschaften</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Wann brauche ich sie?</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Konkrete Planung des Ruhestands</li>
                  <li>Immobilienfinanzierung (Bank benötigt Rentennachweis)</li>
                  <li>Scheidung (Versorgungsausgleich)</li>
                  <li>Prüfung auf Fehler im Rentenkonto</li>
                  <li>Vorbereitung vorzeitiger Renteneintritt</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <Link 
                  href="/rentenauskunft-online-beantragen"
                  className="inline-flex items-center px-6 py-3 bg-renten-blue font-semibold rounded-lg hover:bg-renten-blue/90 transition-colors"
                  style={{ color: '#ffffff' }}
                >
                  Rentenauskunft jetzt beantragen →
                </Link>
              </div>
            </div>

            {/* Renteninformation */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-renten-accent text-renten-blue rounded-lg flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-renten-blue mb-2">
                    Die Renteninformation
                  </h2>
                  <p className="text-slate-600">Jährliche Kurzinfo ab 27 Jahren</p>
                </div>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Was steht drin?</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
                  <li><strong>Aktuelle Rentenanwartschaft:</strong> Wie hoch wäre Ihre Rente, wenn Sie heute erwerbsgemindert würden</li>
                  <li><strong>Hochrechnung:</strong> Voraussichtliche Rente bei Renteneintritt (unter Annahme gleichbleibender Beiträge)</li>
                  <li><strong>Beitragsjahre:</strong> Anzahl der bisher erreichten Versicherungsjahre</li>
                  <li><strong>Rentenanpassung:</strong> Beispielrechnung mit 1% und 2% jährlicher Steigerung</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Wann brauche ich sie?</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Jährlicher Check des Rentenstands</li>
                  <li>Grobe Einschätzung der Rentenlücke</li>
                  <li>Planung zusätzlicher Altersvorsorge</li>
                  <li>Kontrolle, ob Beiträge korrekt erfasst wurden</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <Link 
                  href="/renteninformation-beantragen"
                  className="inline-flex items-center px-6 py-3 bg-renten-accent font-semibold rounded-lg hover:bg-renten-accent/90 transition-colors"
                  style={{ color: '#ffffff' }}
                >
                  Renteninformation anfordern →
                </Link>
              </div>
            </div>

            {/* Versicherungsverlauf */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-slate-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-bold text-renten-blue mb-2">
                    Der Versicherungsverlauf
                  </h2>
                  <p className="text-slate-600">Chronologische Auflistung aller Zeiten</p>
                </div>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Was steht drin?</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
                  <li><strong>Beschäftigungszeiten:</strong> Alle Arbeitsverhältnisse mit Arbeitgeber und Zeitraum</li>
                  <li><strong>Beitragshöhe:</strong> Gezahlte Rentenbeiträge pro Zeitraum</li>
                  <li><strong>Kindererziehungszeiten:</strong> Angerechnete Zeiten für Kindererziehung</li>
                  <li><strong>Ausbildungszeiten:</strong> Schul- und Berufsausbildung</li>
                  <li><strong>Lücken:</strong> Zeiträume ohne Versicherungsschutz</li>
                  <li><strong>Sonstige Zeiten:</strong> Arbeitslosigkeit, Krankheit, Wehrdienst etc.</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Wann brauche ich ihn?</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li><strong>Kontenklärung:</strong> Lücken und Fehler im Rentenkonto finden</li>
                  <li><strong>Fehlende Zeiten nachmelden:</strong> Ausbildung, Kindererziehung etc.</li>
                  <li><strong>Vor Rentenantrag:</strong> Vollständigkeit prüfen</li>
                  <li><strong>Bei Unstimmigkeiten:</strong> Wenn Renteninformation zu niedrig erscheint</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <Link 
                  href="/versicherungsverlauf-anfordern"
                  className="inline-flex items-center px-6 py-3 bg-slate-600 font-semibold rounded-lg hover:bg-slate-700 transition-colors"
                  style={{ color: '#ffffff' }}
                >
                  Versicherungsverlauf anfordern →
                </Link>
              </div>
            </div>
          </section>

          {/* Empfehlung */}
          <section className="mb-16 bg-gradient-to-br from-renten-blue/5 to-renten-accent/5 rounded-2xl p-8 border-2 border-renten-accent">
            <h2 className="font-heading text-2xl font-bold text-renten-blue mb-6">
              Unsere Empfehlung: Welches Dokument sollten Sie anfordern?
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg border-l-4 border-renten-blue p-6">
                <h3 className="font-semibold text-lg text-slate-900 mb-2">
                  Unter 50 Jahren
                </h3>
                <p className="text-slate-700">
                  <strong>Renteninformation</strong> (kommt automatisch jährlich) + <strong>Versicherungsverlauf</strong> alle 5-10 Jahre zur Kontrolle auf Lücken.
                </p>
              </div>
              
              <div className="bg-white rounded-lg border-l-4 border-renten-accent p-6">
                <h3 className="font-semibold text-lg text-slate-900 mb-2">
                  Ab 50 Jahren
                </h3>
                <p className="text-slate-700">
                  <strong>Rentenauskunft</strong> anfordern für konkrete Planung + <strong>Versicherungsverlauf</strong> prüfen und Kontenklärung durchführen.
                </p>
              </div>
              
              <div className="bg-white rounded-lg border-l-4 border-red-500 p-6">
                <h3 className="font-semibold text-lg text-slate-900 mb-2">
                  Bei Unstimmigkeiten
                </h3>
                <p className="text-slate-700">
                  Sofort <strong>Versicherungsverlauf</strong> anfordern und Zeile für Zeile prüfen. Fehlende Zeiten nachmelden, dann neue <strong>Rentenauskunft</strong> beantragen.
                </p>
              </div>
              
              <div className="bg-white rounded-lg border-l-4 border-slate-400 p-6">
                <h3 className="font-semibold text-lg text-slate-900 mb-2">
                  Für Immobilienfinanzierung
                </h3>
                <p className="text-slate-700">
                  <strong>Rentenauskunft</strong> – Banken akzeptieren meist nur die ausführliche Rentenauskunft als Nachweis.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-renten-blue to-[#0a4178] text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Alle Rentenunterlagen einfach online anfordern
            </h2>
            <p className="text-xl text-slate-100 mb-8 max-w-2xl mx-auto">
              Egal ob Rentenauskunft, Renteninformation oder Versicherungsverlauf – wir unterstützen Sie bei der Anforderung aller wichtigen Dokumente.
            </p>
            <Link 
              href="/#formular"
              className="inline-flex items-center px-8 py-4 bg-renten-accent font-semibold rounded-lg hover:bg-renten-accent/90 transition-colors shadow-lg"
              style={{ color: '#ffffff' }}
            >
              Rentenunterlagen jetzt anfordern
            </Link>
          </section>
        </article>
      </div>
    </>
  );
}
