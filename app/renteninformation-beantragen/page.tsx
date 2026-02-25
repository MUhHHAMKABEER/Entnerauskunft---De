import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Renteninformation beantragen | Jährliche DRV Renteninfo',
  description: 'Renteninformation der Deutschen Rentenversicherung anfordern. Jährliche Renteninfo mit aktuellen Rentenansprüchen und Hochrechnung – schnell online beantragen.',
  keywords: 'renteninformation, renteninformation beantragen, renteninformation anfordern, renteninformation verstehen, renteninformation deutsche rentenversicherung',
  alternates: { canonical: 'https://rentnerauskunft.de/renteninformation-beantragen' },
  openGraph: {
    title: 'Renteninformation beantragen | Jährliche DRV Renteninfo',
    description: 'Renteninformation der Deutschen Rentenversicherung anfordern. Jährliche Renteninfo mit aktuellen Rentenansprüchen und Hochrechnung – schnell online beantragen.',
    type: 'website',
    url: 'https://rentnerauskunft.de/renteninformation-beantragen'
  }
};

export default function RenteninformationBeantragen() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Renteninformation beantragen",
            "description": "Service zur Beantragung Ihrer Renteninformation bei der Deutschen Rentenversicherung",
            "provider": {
              "@type": "Organization",
              "name": "REGIS DATASEC LTD"
            },
            "areaServed": "DE"
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://rentnerauskunft.de" },
              { "@type": "ListItem", "position": 2, "name": "Renteninformation beantragen", "item": "https://rentnerauskunft.de/renteninformation-beantragen" }
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
                "name": "Was ist die Renteninformation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Die Renteninformation ist ein jährliches Schreiben der Deutschen Rentenversicherung, das Sie ab 27 Jahren automatisch erhalten. Sie informiert über Ihre aktuellen Rentenansprüche und gibt eine Hochrechnung bis zum Renteneintritt."
                }
              },
              {
                "@type": "Question",
                "name": "Ab wann bekomme ich die Renteninformation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Die Renteninformation wird automatisch ab dem 27. Lebensjahr verschickt, wenn Sie mindestens 5 Jahre Beiträge in die gesetzliche Rentenversicherung eingezahlt haben."
                }
              }
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
              <span>Renteninformation beantragen</span>
            </nav>
            
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Renteninformation beantragen
            </h1>
            
            <p className="text-xl text-slate-100 max-w-3xl mb-8">
              Fordern Sie Ihre aktuelle Renteninformation der Deutschen Rentenversicherung an. Erhalten Sie einen kompakten Überblick über Ihre Rentenansprüche.
            </p>
            
            <Link 
              href="/#formular"
              className="inline-flex items-center px-6 py-3 bg-renten-blue text-white font-semibold rounded-lg hover:bg-renten-blue/90 transition-colors"
            >
              Renteninformation jetzt beantragen
            </Link>
          </div>
        </section>

        <article className="max-w-5xl mx-auto px-6 py-12">
          
          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-6">
              Was ist die Renteninformation?
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-6">
                Die <strong>Renteninformation</strong> ist ein kompaktes, jährliches Schreiben der <strong>Deutschen Rentenversicherung</strong>, das Sie ab dem 27. Lebensjahr automatisch erhalten. Sie gibt Ihnen einen schnellen Überblick über:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="bg-white rounded-lg border-l-4 border-renten-blue p-6">
                  <div className="text-3xl font-bold text-renten-blue mb-2">1</div>
                  <h3 className="font-semibold text-slate-900 mb-2">Aktuelle Anwartschaft</h3>
                  <p className="text-sm text-slate-700">
                    Wie hoch wäre Ihre Rente bei voller Erwerbsminderung heute
                  </p>
                </div>
                
                <div className="bg-white rounded-lg border-l-4 border-renten-accent p-6">
                  <div className="text-3xl font-bold text-renten-blue mb-2">2</div>
                  <h3 className="font-semibold text-slate-900 mb-2">Hochrechnung</h3>
                  <p className="text-sm text-slate-700">
                    Voraussichtliche Rente bei Renteneintritt (bei gleichbleibenden Beiträgen)
                  </p>
                </div>
                
                <div className="bg-white rounded-lg border-l-4 border-slate-400 p-6">
                  <div className="text-3xl font-bold text-renten-blue mb-2">3</div>
                  <h3 className="font-semibold text-slate-900 mb-2">Rentenanpassung</h3>
                  <p className="text-sm text-slate-700">
                    Beispielrechnungen mit 1% und 2% jährlicher Steigerung
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16 bg-renten-accent/10 border-l-4 border-renten-accent p-8 rounded-r-lg">
            <h2 className="font-heading text-2xl font-bold text-renten-blue mb-4">
              Ab wann bekomme ich die Renteninformation?
            </h2>
            
            <div className="space-y-4 text-slate-700">
              <p>
                Die Renteninformation wird automatisch verschickt, wenn Sie:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Mindestens 27 Jahre alt</strong> sind</li>
                <li><strong>Mindestens 5 Jahre</strong> Beiträge in die gesetzliche Rentenversicherung eingezahlt haben</li>
              </ul>
              <p className="mt-4">
                Sie erhalten die Renteninformation dann <strong>jährlich automatisch</strong> per Post. Ab dem 55. Lebensjahr wird sie durch die ausführlichere <Link href="/rentenauskunft-online-beantragen" className="text-renten-blue hover:underline font-semibold">Rentenauskunft</Link> ersetzt (alle 3 Jahre).
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-6">
              Renteninformation verstehen: Was steht drin?
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-semibold text-lg text-renten-blue mb-3">
                  1. Ihre bisherigen Beitragsjahre
                </h3>
                <p className="text-slate-700 mb-2">
                  Anzahl der Jahre, in denen Sie Beiträge zur Rentenversicherung gezahlt haben. Wichtig für die Wartezeit (Mindestversicherungszeit für Rentenanspruch).
                </p>
                <div className="mt-3 p-3 bg-slate-50 rounded text-sm text-slate-600">
                  <strong>Beispiel:</strong> "Sie haben bisher 15 Jahre und 7 Monate Beiträge gezahlt"
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-semibold text-lg text-renten-blue mb-3">
                  2. Rente bei voller Erwerbsminderung
                </h3>
                <p className="text-slate-700 mb-2">
                  Wie hoch wäre Ihre monatliche Rente, wenn Sie heute aus gesundheitlichen Gründen nicht mehr arbeiten könnten. Dies ist Ihre <strong>aktuelle Rentenanwartschaft</strong>.
                </p>
                <div className="mt-3 p-3 bg-slate-50 rounded text-sm text-slate-600">
                  <strong>Beispiel:</strong> "Bei voller Erwerbsminderung heute: 850 € brutto/Monat"
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-semibold text-lg text-renten-blue mb-3">
                  3. Hochrechnung bis Renteneintritt
                </h3>
                <p className="text-slate-700 mb-2">
                  Voraussichtliche Rentenhöhe bei Renteneintritt mit 67 Jahren - unter der Annahme, dass Sie bis dahin weiter Beiträge in gleicher Höhe zahlen.
                </p>
                <div className="mt-3 p-3 bg-slate-50 rounded text-sm text-slate-600">
                  <strong>Beispiel:</strong> "Regelaltersrente ab 67: 1.450 € brutto/Monat"
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-semibold text-lg text-renten-blue mb-3">
                  4. Rentenanpassung (Kaufkraftverlust)
                </h3>
                <p className="text-slate-700 mb-2">
                  Beispielrechnungen, wie sich Ihre Rente bei jährlicher Steigerung von 1% bzw. 2% entwickeln würde. Wichtig: Dies zeigt den Kaufkraftverlust durch Inflation!
                </p>
                <div className="mt-3 p-3 bg-red-50 rounded text-sm text-red-900">
                  <strong>Achtung:</strong> Bei 2% Inflation verliert Ihre Rente real an Wert. Zusätzliche Altersvorsorge ist wichtig!
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-6">
              Renteninformation zu niedrig? Das können Sie tun
            </h2>
            
            <div className="bg-white rounded-xl border border-slate-200 p-8">
              <p className="text-slate-700 mb-6">
                Wenn Ihre Renteninformation niedriger ausfällt als erwartet, können folgende Gründe vorliegen:
              </p>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg border-l-4 border-renten-blue p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">Fehlende Zeiten im Rentenkonto</h3>
                  <p className="text-sm text-slate-700">
                    Fordern Sie Ihren <Link href="/versicherungsverlauf-anfordern" className="text-renten-blue hover:underline">Versicherungsverlauf</Link> an und prüfen Sie, ob alle Beschäftigungszeiten, Ausbildungszeiten und Kindererziehungszeiten erfasst sind.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg border-l-4 border-renten-accent p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">Kontenklärung durchführen</h3>
                  <p className="text-sm text-slate-700">
                    Starten Sie eine <Link href="/kontenklarung-rentenversicherung" className="text-renten-blue hover:underline">Kontenklärung</Link>, um Lücken zu schließen und fehlende Zeiten nachzumelden.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg border-l-4 border-slate-400 p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">Zusätzliche Altersvorsorge aufbauen</h3>
                  <p className="text-sm text-slate-700">
                    Die gesetzliche Rente allein reicht oft nicht. Prüfen Sie Möglichkeiten wie Riester-Rente, Rürup-Rente oder private Rentenversicherung.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg border-l-4 border-red-500 p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">Ausführliche Rentenauskunft anfordern</h3>
                  <p className="text-sm text-slate-700">
                    Ab 55 Jahren oder bei konkreter Rentenplanung: <Link href="/rentenauskunft-online-beantragen" className="text-renten-blue hover:underline">Rentenauskunft</Link> mit detaillierten Berechnungen anfordern.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-6">
              Unterschied: Renteninformation vs. Rentenauskunft
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-sm border border-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-slate-900">Merkmal</th>
                    <th className="px-6 py-4 text-left font-semibold text-renten-blue">Renteninformation</th>
                    <th className="px-6 py-4 text-left font-semibold text-renten-blue">Rentenauskunft</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-900">Ab wann?</td>
                    <td className="px-6 py-4 text-slate-700">Ab 27 Jahren</td>
                    <td className="px-6 py-4 text-slate-700">Ab 55 Jahren</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-900">Wie oft?</td>
                    <td className="px-6 py-4 text-slate-700">Jährlich</td>
                    <td className="px-6 py-4 text-slate-700">Alle 3 Jahre</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-900">Umfang</td>
                    <td className="px-6 py-4 text-slate-700">Kompakt (1-2 Seiten)</td>
                    <td className="px-6 py-4 text-slate-700">Ausführlich (mehrere Seiten)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-slate-900">Zweck</td>
                    <td className="px-6 py-4 text-slate-700">Jährlicher Überblick</td>
                    <td className="px-6 py-4 text-slate-700">Konkrete Rentenplanung</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 text-center">
              <Link 
                href="/unterschied-rentenauskunft-renteninformation-versicherungsverlauf"
                className="inline-flex items-center text-renten-blue font-semibold hover:underline"
              >
                Ausführlicher Vergleich aller Rentenunterlagen →
              </Link>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-8">
              Häufig gestellte Fragen zur Renteninformation
            </h2>
            
            <div className="space-y-4">
              <details className="bg-white rounded-lg border border-slate-200 p-6 group">
                <summary className="font-semibold text-lg text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  Ich habe meine Renteninformation nicht erhalten - was tun?
                  <span className="text-renten-blue group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  Wenn Sie über 27 Jahre alt sind und mindestens 5 Jahre Beiträge gezahlt haben, sollten Sie die Renteninformation jährlich erhalten. Prüfen Sie zunächst, ob Ihre Adresse bei der Rentenversicherung aktuell ist. Sie können die Renteninformation jederzeit neu anfordern.
                </p>
              </details>
              
              <details className="bg-white rounded-lg border border-slate-200 p-6 group">
                <summary className="font-semibold text-lg text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  Ist die Renteninformation verbindlich?
                  <span className="text-renten-blue group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  Nein, die Renteninformation ist eine unverbindliche Hochrechnung. Die tatsächliche Rentenhöhe hängt von Ihrer weiteren Erwerbsbiografie, Rentenanpassungen und dem tatsächlichen Renteneintrittsalter ab.
                </p>
              </details>
              
              <details className="bg-white rounded-lg border border-slate-200 p-6 group">
                <summary className="font-semibold text-lg text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  Brutto oder Netto - welche Rente steht in der Renteninformation?
                  <span className="text-renten-blue group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  Die Renteninformation zeigt immer die <strong>Bruttorente</strong>. Von dieser werden noch Kranken- und Pflegeversicherung sowie ggf. Steuern abgezogen. Die Nettorente liegt meist 10-15% niedriger.
                </p>
              </details>
              
              <details className="bg-white rounded-lg border border-slate-200 p-6 group">
                <summary className="font-semibold text-lg text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  Kann ich die Renteninformation auch früher bekommen?
                  <span className="text-renten-blue group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  Ja, Sie können die Renteninformation jederzeit bei der Deutschen Rentenversicherung anfordern - auch wenn Sie noch keine 27 Jahre alt sind oder noch keine 5 Jahre Beiträge gezahlt haben.
                </p>
              </details>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-6">
              Weitere wichtige Rentenunterlagen
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/rentenauskunft-online-beantragen" className="block bg-white rounded-lg border border-slate-200 p-6 hover:border-renten-blue hover:shadow-md transition-all">
                <h3 className="font-semibold text-lg text-renten-blue mb-2">
                  Rentenauskunft beantragen
                </h3>
                <p className="text-sm text-slate-700">
                  Ausführliche Rentenberechnung ab 55 Jahren oder auf Antrag.
                </p>
              </Link>
              
              <Link href="/versicherungsverlauf-anfordern" className="block bg-white rounded-lg border border-slate-200 p-6 hover:border-renten-blue hover:shadow-md transition-all">
                <h3 className="font-semibold text-lg text-renten-blue mb-2">
                  Versicherungsverlauf anfordern
                </h3>
                <p className="text-sm text-slate-700">
                  Alle Versicherungszeiten und Beiträge im Detail prüfen.
                </p>
              </Link>
            </div>
          </section>

          <section className="bg-gradient-to-br from-renten-blue to-[#0a4178] text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Jetzt Renteninformation anfordern
            </h2>
            <p className="text-xl text-slate-100 mb-8 max-w-2xl mx-auto">
              Erhalten Sie einen aktuellen Überblick über Ihre Rentenansprüche.
            </p>
            <Link 
              href="/#formular"
              className="inline-flex items-center px-8 py-4 bg-renten-accent text-white font-semibold rounded-lg hover:bg-renten-accent/90 transition-colors shadow-lg"
            >
              Renteninformation jetzt beantragen
            </Link>
          </section>
        </article>
      </div>
    </>
  );
}
