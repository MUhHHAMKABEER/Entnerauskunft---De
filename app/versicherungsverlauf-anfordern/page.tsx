import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Versicherungsverlauf anfordern | DRV Versicherungsverlauf',
  description: 'Versicherungsverlauf der Deutschen Rentenversicherung anfordern. Alle Zeiten, Beiträge und Lücken im Rentenkonto prüfen – Basis für Kontenklärung und Rentenantrag.',
  keywords: 'versicherungsverlauf, versicherungsverlauf anfordern, versicherungsverlauf deutsche rentenversicherung, versicherungsverlauf online, versicherungsverlauf prüfen',
  alternates: { canonical: 'https://rentnerauskunft.de/versicherungsverlauf-anfordern' },
  openGraph: {
    title: 'Versicherungsverlauf anfordern | DRV Versicherungsverlauf',
    description: 'Versicherungsverlauf der Deutschen Rentenversicherung anfordern. Alle Zeiten, Beiträge und Lücken im Rentenkonto prüfen – Basis für Kontenklärung und Rentenantrag.',
    type: 'website',
    url: 'https://rentnerauskunft.de/versicherungsverlauf-anfordern'
  }
};

export default function VersicherungsverlaufAnfordern() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Versicherungsverlauf anfordern",
            "description": "Service zur Anforderung Ihres Versicherungsverlaufs bei der Deutschen Rentenversicherung",
            "provider": {
              "@type": "Organization",
              "name": "REGIS DATASEC LTD"
            },
            "areaServed": "DE",
            "serviceType": "Versicherungsverlauf anfordern"
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
              { "@type": "ListItem", "position": 2, "name": "Versicherungsverlauf anfordern", "item": "https://rentnerauskunft.de/versicherungsverlauf-anfordern" }
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
                "name": "Was ist der Versicherungsverlauf?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Der Versicherungsverlauf ist eine chronologische Auflistung aller in Ihrem Rentenkonto gespeicherten Zeiten - inklusive Beschäftigungszeiten, Beiträge, Kindererziehungszeiten, Ausbildungszeiten und mögliche Lücken."
                }
              },
              {
                "@type": "Question",
                "name": "Wie kann ich meinen Versicherungsverlauf anfordern?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sie können Ihren Versicherungsverlauf jederzeit bei der Deutschen Rentenversicherung anfordern - online über deren eService, telefonisch, schriftlich oder über unseren Service."
                }
              },
              {
                "@type": "Question",
                "name": "Warum sollte ich meinen Versicherungsverlauf prüfen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Der Versicherungsverlauf hilft Ihnen, Lücken und Fehler in Ihrem Rentenkonto zu finden. Fehlende Zeiten (z.B. Ausbildung, Kindererziehung) können nachgemeldet werden und erhöhen Ihre spätere Rente."
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
              <span>Versicherungsverlauf anfordern</span>
            </nav>
            
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Versicherungsverlauf anfordern
            </h1>
            
            <p className="text-xl text-slate-100 max-w-3xl mb-8">
              Fordern Sie Ihren Versicherungsverlauf der Deutschen Rentenversicherung an und prüfen Sie alle gespeicherten Zeiten in Ihrem Rentenkonto auf Vollständigkeit.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/#formular"
                className="inline-flex items-center px-6 py-3 bg-renten-accent text-white font-semibold rounded-lg hover:bg-renten-accent/90 transition-colors"
              >
                Versicherungsverlauf jetzt anfordern
              </Link>
            </div>
          </div>
        </section>

        <article className="max-w-5xl mx-auto px-6 py-12">
          
          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-6">
              Was ist der Versicherungsverlauf?
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-4">
                Der <strong>Versicherungsverlauf</strong> ist ein offizielles Dokument der <strong>Deutschen Rentenversicherung</strong>, das alle in Ihrem Rentenkonto gespeicherten Zeiten chronologisch auflistet. Er zeigt Ihnen detailliert:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-white rounded-lg border-l-4 border-renten-blue p-6">
                  <h3 className="font-semibold text-lg text-renten-blue mb-3">Beschäftigungszeiten</h3>
                  <p className="text-sm text-slate-700">
                    Alle Arbeitsverhältnisse mit Arbeitgeber, Zeitraum und gezahlten Beiträgen
                  </p>
                </div>
                
                <div className="bg-white rounded-lg border-l-4 border-renten-accent p-6">
                  <h3 className="font-semibold text-lg text-renten-blue mb-3">Kindererziehungszeiten</h3>
                  <p className="text-sm text-slate-700">
                    Angerechnete Zeiten für die Erziehung von Kindern (bis zu 3 Jahre pro Kind)
                  </p>
                </div>
                
                <div className="bg-white rounded-lg border-l-4 border-slate-400 p-6">
                  <h3 className="font-semibold text-lg text-renten-blue mb-3">Ausbildungszeiten</h3>
                  <p className="text-sm text-slate-700">
                    Schul- und Berufsausbildung, Studium (teilweise anrechenbar)
                  </p>
                </div>
                
                <div className="bg-white rounded-lg border-l-4 border-red-500 p-6">
                  <h3 className="font-semibold text-lg text-renten-blue mb-3">Lücken im Rentenkonto</h3>
                  <p className="text-sm text-slate-700">
                    Zeiträume ohne Versicherungsschutz, die möglicherweise nachgemeldet werden können
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16 bg-renten-accent/10 border-l-4 border-renten-accent p-8 rounded-r-lg">
            <h2 className="font-heading text-2xl font-bold text-renten-blue mb-4">
              Warum ist der Versicherungsverlauf so wichtig?
            </h2>
            
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3">
                <span className="text-renten-accent font-bold text-xl">✓</span>
                <span><strong>Lücken finden:</strong> Fehlende Zeiten können Ihre Rente mindern - der Versicherungsverlauf zeigt alle Lücken auf</span>
              </li>
              <li className="flex gap-3">
                <span className="text-renten-accent font-bold text-xl">✓</span>
                <span><strong>Fehler korrigieren:</strong> Falsch erfasste Beiträge oder fehlende Arbeitgeber können nachgemeldet werden</span>
              </li>
              <li className="flex gap-3">
                <span className="text-renten-accent font-bold text-xl">✓</span>
                <span><strong>Kontenklärung vorbereiten:</strong> Basis für die Klärung Ihres Rentenkontos vor dem Rentenantrag</span>
              </li>
              <li className="flex gap-3">
                <span className="text-renten-accent font-bold text-xl">✓</span>
                <span><strong>Rente erhöhen:</strong> Nachgemeldete Zeiten (Ausbildung, Kindererziehung) erhöhen Ihre Rentenansprüche</span>
              </li>
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-6">
              Versicherungsverlauf prüfen: Darauf sollten Sie achten
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-semibold text-lg text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-renten-blue text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Vollständigkeit der Beschäftigungszeiten
                </h3>
                <p className="text-slate-700 ml-10">
                  Prüfen Sie, ob alle Arbeitsverhältnisse erfasst sind. Fehlen Arbeitgeber oder Zeiträume? Besonders bei häufigen Jobwechseln oder Minijobs können Zeiten fehlen.
                </p>
              </div>
              
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-semibold text-lg text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-renten-blue text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Kindererziehungszeiten
                </h3>
                <p className="text-slate-700 ml-10">
                  Für jedes Kind werden bis zu 3 Jahre angerechnet. Sind diese Zeiten vollständig erfasst? Bei vor 1992 geborenen Kindern nur 1 Jahr - hier kann Nachbesserung möglich sein.
                </p>
              </div>
              
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-semibold text-lg text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-renten-blue text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Ausbildungszeiten
                </h3>
                <p className="text-slate-700 ml-10">
                  Schul- und Berufsausbildung nach dem 17. Lebensjahr können teilweise angerechnet werden. Studium zählt als Anrechnungszeit. Sind diese Zeiten erfasst?
                </p>
              </div>
              
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-semibold text-lg text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-renten-blue text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  Arbeitslosigkeit und Krankheit
                </h3>
                <p className="text-slate-700 ml-10">
                  Zeiten des Arbeitslosengeldbezugs und längere Krankheitszeiten werden angerechnet. Prüfen Sie, ob diese Zeiten vollständig dokumentiert sind.
                </p>
              </div>
              
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-semibold text-lg text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-renten-blue text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                  Lücken zwischen Beschäftigungen
                </h3>
                <p className="text-slate-700 ml-10">
                  Gibt es unerklärte Lücken? Manche Zeiten (z.B. Pflege von Angehörigen, Wehrdienst, Zivildienst) können nachgemeldet werden.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-6">
              Fehlende Zeiten im Versicherungsverlauf nachmelden
            </h2>
            
            <div className="bg-white rounded-xl border border-slate-200 p-8">
              <p className="text-slate-700 mb-6">
                Wenn Sie Lücken oder Fehler in Ihrem Versicherungsverlauf finden, können Sie diese bei der Deutschen Rentenversicherung nachmelden. Dafür benötigen Sie in der Regel:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-renten-blue mb-3">Für Beschäftigungszeiten:</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                    <li>Arbeitsverträge</li>
                    <li>Lohnabrechnungen</li>
                    <li>Arbeitgeberbescheinigungen</li>
                    <li>Sozialversicherungsausweise</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-renten-blue mb-3">Für Ausbildungszeiten:</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                    <li>Schulzeugnisse</li>
                    <li>Ausbildungsnachweise</li>
                    <li>Studiennachweise</li>
                    <li>Immatrikulationsbescheinigungen</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-renten-blue mb-3">Für Kindererziehung:</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                    <li>Geburtsurkunden der Kinder</li>
                    <li>Meldebescheinigungen</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-renten-blue mb-3">Für sonstige Zeiten:</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                    <li>Wehrdienst-/Zivildienstbescheinigung</li>
                    <li>Bescheinigung über Pflegezeiten</li>
                    <li>Arbeitslosengeld-Bescheide</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-renten-accent/10 rounded-lg">
                <p className="text-sm text-slate-700">
                  <strong>Tipp:</strong> Starten Sie die Kontenklärung am besten 3-5 Jahre vor dem geplanten Renteneintritt. So haben Sie genug Zeit, fehlende Unterlagen zu beschaffen.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-8">
              Häufig gestellte Fragen zum Versicherungsverlauf
            </h2>
            
            <div className="space-y-4">
              <details className="bg-white rounded-lg border border-slate-200 p-6 group">
                <summary className="font-semibold text-lg text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  Wie oft sollte ich meinen Versicherungsverlauf prüfen?
                  <span className="text-renten-blue group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  Empfohlen wird eine Prüfung alle 5-10 Jahre und spätestens 3-5 Jahre vor dem geplanten Renteneintritt. So haben Sie genug Zeit, fehlende Unterlagen zu beschaffen und Fehler zu korrigieren.
                </p>
              </details>
              
              <details className="bg-white rounded-lg border border-slate-200 p-6 group">
                <summary className="font-semibold text-lg text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  Ist der Versicherungsverlauf kostenlos?
                  <span className="text-renten-blue group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  Ja, der Versicherungsverlauf der Deutschen Rentenversicherung ist kostenfrei. Unser Service erhebt eine Servicegebühr von 29,90 € für die strukturierte Erfassung und Weiterleitung Ihrer Anforderung.
                </p>
              </details>
              
              <details className="bg-white rounded-lg border border-slate-200 p-6 group">
                <summary className="font-semibold text-lg text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  Was ist der Unterschied zwischen Versicherungsverlauf und Rentenauskunft?
                  <span className="text-renten-blue group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  Der Versicherungsverlauf listet alle gespeicherten Zeiten chronologisch auf. Die Rentenauskunft berechnet daraus Ihre voraussichtliche Rentenhöhe. Beide Dokumente ergänzen sich ideal zur Rentenplanung.
                </p>
                <Link href="/unterschied-rentenauskunft-renteninformation-versicherungsverlauf" className="inline-block mt-2 text-renten-blue hover:underline text-sm">
                  Ausführlicher Vergleich →
                </Link>
              </details>
              
              <details className="bg-white rounded-lg border border-slate-200 p-6 group">
                <summary className="font-semibold text-lg text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  Wie lange dauert es, bis ich meinen Versicherungsverlauf erhalte?
                  <span className="text-renten-blue group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  Nach Eingang Ihrer Anforderung bei der Deutschen Rentenversicherung dauert die Bearbeitung in der Regel 2-4 Wochen. Der Versicherungsverlauf wird Ihnen per Post zugeschickt.
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
                  Detaillierte Berechnung Ihrer voraussichtlichen Altersrente.
                </p>
              </Link>
              
              <Link href="/kontenklarung-rentenversicherung" className="block bg-white rounded-lg border border-slate-200 p-6 hover:border-renten-blue hover:shadow-md transition-all">
                <h3 className="font-semibold text-lg text-renten-blue mb-2">
                  Kontenklärung beantragen
                </h3>
                <p className="text-sm text-slate-700">
                  Lücken und Fehler im Rentenkonto offiziell klären lassen.
                </p>
              </Link>
            </div>
          </section>

          <section className="bg-gradient-to-br from-renten-blue to-[#0a4178] text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Jetzt Versicherungsverlauf anfordern
            </h2>
            <p className="text-xl text-slate-100 mb-8 max-w-2xl mx-auto">
              Prüfen Sie Ihr Rentenkonto auf Vollständigkeit und sichern Sie sich alle Rentenansprüche.
            </p>
            <Link 
              href="/#formular"
              className="inline-flex items-center px-8 py-4 bg-renten-accent text-white font-semibold rounded-lg hover:bg-renten-accent/90 transition-colors shadow-lg"
            >
              Versicherungsverlauf jetzt anfordern
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
