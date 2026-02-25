import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Rentenauskunft online beantragen | Persönliche DRV Rentenauskunft',
  description: 'Rentenauskunft der Deutschen Rentenversicherung online beantragen. Persönliche Auskunft sicher & schnell – strukturierte Weiterleitung an die DRV.',
  keywords: 'rentenauskunft, rentenauskunft online beantragen, rentenauskunft beantragen, persönliche rentenauskunft, rentenauskunft deutsche rentenversicherung, rentenauskunft anfordern, kostenlose rentenauskunft',
  alternates: { canonical: 'https://rentnerauskunft.de/rentenauskunft-online-beantragen' },
  openGraph: {
    title: 'Rentenauskunft online beantragen | Persönliche DRV Rentenauskunft',
    description: 'Rentenauskunft der Deutschen Rentenversicherung online beantragen. Persönliche Auskunft sicher & schnell – strukturierte Weiterleitung an die DRV.',
    type: 'website',
    url: 'https://rentnerauskunft.de/rentenauskunft-online-beantragen'
  }
};

export default function RentenauskunftOnlineBeantragen() {
  return (
    <>
      {/* Schema.org Markup für Service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Rentenauskunft online beantragen",
            "description": "Professioneller Service zur Beantragung Ihrer Rentenauskunft bei der Deutschen Rentenversicherung",
            "provider": {
              "@type": "Organization",
              "name": "REGIS DATASEC LTD",
              "url": "https://rentnerauskunft.de"
            },
            "areaServed": "DE",
            "serviceType": "Rentenauskunft beantragen",
            "offers": {
              "@type": "Offer",
              "price": "29.90",
              "priceCurrency": "EUR"
            }
          })
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Startseite",
                "item": "https://rentnerauskunft.de"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Rentenauskunft online beantragen",
                "item": "https://rentnerauskunft.de/rentenauskunft-online-beantragen"
              }
            ]
          })
        }}
      />

      <div className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-renten-blue to-[#0a4178] text-white py-16">
          <div className="max-w-5xl mx-auto px-6">
            <nav className="text-sm mb-6 opacity-90">
              <Link href="/" className="hover:underline">Startseite</Link>
              <span className="mx-2">/</span>
              <span>Rentenauskunft online beantragen</span>
            </nav>
            
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Rentenauskunft online beantragen
            </h1>
            
            <p className="text-xl text-slate-100 max-w-3xl mb-8">
              Fordern Sie Ihre persönliche Rentenauskunft der Deutschen Rentenversicherung schnell und unkompliziert an. Wir unterstützen Sie bei der strukturierten Erfassung und Weiterleitung Ihrer Anforderung.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/#formular"
                className="inline-flex items-center px-6 py-3 bg-renten-accent font-semibold rounded-lg hover:bg-renten-accent/90 transition-colors"
                style={{ color: '#ffffff' }}
              >
                Rentenauskunft jetzt beantragen
              </Link>
              <Link 
                href="#was-ist-rentenauskunft"
                className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
              >
                Mehr erfahren
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="max-w-5xl mx-auto px-6 py-12">
          
          {/* Was ist eine Rentenauskunft */}
          <section id="was-ist-rentenauskunft" className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-6">
              Was ist eine Rentenauskunft?
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-4">
                Die <strong>Rentenauskunft</strong> ist ein offizielles Dokument der <strong>Deutschen Rentenversicherung</strong>, das Ihnen eine detaillierte Übersicht über Ihre voraussichtliche Rentenhöhe gibt. Im Gegensatz zur jährlichen Renteninformation ist die Rentenauskunft ausführlicher und wird in der Regel ab dem 55. Lebensjahr automatisch verschickt.
              </p>
              
              <p className="text-slate-700 leading-relaxed mb-4">
                Sie können eine <strong>persönliche Rentenauskunft</strong> aber auch früher beantragen – zum Beispiel wenn Sie:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
                <li>Ihre Altersvorsorge konkret planen möchten</li>
                <li>Eine Immobilienfinanzierung beantragen (Bank benötigt Rentennachweis)</li>
                <li>Sich scheiden lassen (Versorgungsausgleich)</li>
                <li>Fehler in Ihrem Rentenkonto vermuten</li>
                <li>Vorzeitig in Rente gehen möchten</li>
              </ul>

              <div className="bg-renten-accent/10 border-l-4 border-renten-accent p-6 rounded-r-lg mb-6">
                <h3 className="font-semibold text-renten-blue mb-2">Wichtig zu wissen:</h3>
                <p className="text-slate-700 mb-0">
                  Die Rentenauskunft ist <strong>kostenfrei</strong> und kann bei der Deutschen Rentenversicherung angefordert werden. Unser Service unterstützt Sie bei der strukturierten Erfassung und formgerechten Weiterleitung Ihrer Anforderung.
                </p>
              </div>
            </div>
          </section>

          {/* Unterschied Rentenauskunft vs Renteninformation */}
          <section className="mb-16 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-6">
              Unterschied: Rentenauskunft vs. Renteninformation vs. Versicherungsverlauf
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border-l-4 border-renten-blue pl-4">
                <h3 className="font-semibold text-lg text-renten-blue mb-2">Rentenauskunft</h3>
                <p className="text-sm text-slate-600 mb-2"><strong>Ab:</strong> 55 Jahre (oder auf Antrag)</p>
                <p className="text-sm text-slate-700">
                  Ausführliche Berechnung Ihrer voraussichtlichen Altersrente mit verschiedenen Szenarien (Regelaltersrente, vorzeitige Rente, Erwerbsminderung).
                </p>
              </div>
              
              <div className="border-l-4 border-renten-accent pl-4">
                <h3 className="font-semibold text-lg text-renten-blue mb-2">Renteninformation</h3>
                <p className="text-sm text-slate-600 mb-2"><strong>Ab:</strong> 27 Jahre (jährlich)</p>
                <p className="text-sm text-slate-700">
                  Kompakte jährliche Information über Ihren aktuellen Rentenanspruch mit Hochrechnung bis zum Renteneintritt.
                </p>
              </div>
              
              <div className="border-l-4 border-slate-400 pl-4">
                <h3 className="font-semibold text-lg text-renten-blue mb-2">Versicherungsverlauf</h3>
                <p className="text-sm text-slate-600 mb-2"><strong>Jederzeit</strong> anfordern</p>
                <p className="text-sm text-slate-700">
                  Vollständige Übersicht aller gespeicherten Versicherungszeiten, Beiträge und Lücken in Ihrem Rentenkonto.
                </p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Link 
                href="/unterschied-rentenauskunft-renteninformation-versicherungsverlauf"
                className="inline-flex items-center text-renten-blue font-semibold hover:underline"
              >
                Ausführlicher Vergleich →
              </Link>
            </div>
          </section>

          {/* Rentenauskunft online beantragen - Anleitung */}
          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-6">
              Wie kann ich eine Rentenauskunft online beantragen?
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-renten-blue text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2">
                    Formular ausfüllen
                  </h3>
                  <p className="text-slate-700">
                    Geben Sie Ihre persönlichen Daten und Ihre Versicherungsnummer ein. Wählen Sie "Rentenauskunft" als gewünschtes Dokument aus.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-renten-blue text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2">
                    Daten werden strukturiert
                  </h3>
                  <p className="text-slate-700">
                    Wir bereiten Ihre Angaben formgerecht auf und leiten diese an die zuständige Stelle der Deutschen Rentenversicherung weiter.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-renten-blue text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2">
                    Bearbeitung durch die DRV
                  </h3>
                  <p className="text-slate-700">
                    Die Deutsche Rentenversicherung bearbeitet Ihre Anfrage und erstellt Ihre persönliche Rentenauskunft.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-renten-accent text-renten-blue rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2">
                    Postalischer Versand
                  </h3>
                  <p className="text-slate-700">
                    Sie erhalten Ihre Rentenauskunft per Post von der Deutschen Rentenversicherung an Ihre hinterlegte Adresse.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link 
                href="/#formular"
                className="inline-flex items-center px-8 py-4 bg-renten-blue font-semibold rounded-lg hover:bg-renten-blue/90 transition-colors shadow-lg"
                style={{ color: '#ffffff' }}
              >
                Rentenauskunft jetzt beantragen
              </Link>
            </div>
          </section>

          {/* FAQ Section mit Schema Markup */}
          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-8">
              Häufig gestellte Fragen zur Rentenauskunft
            </h2>
            
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "Wie bekomme ich eine Rentenauskunft?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sie können eine Rentenauskunft direkt bei der Deutschen Rentenversicherung anfordern - entweder online über deren eService, telefonisch, schriftlich oder über unseren Service. Ab dem 55. Lebensjahr erhalten Sie die Rentenauskunft automatisch alle drei Jahre zugeschickt."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Wie oft kann man eine Rentenauskunft anfordern?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sie können eine Rentenauskunft jederzeit anfordern - es gibt keine Begrenzung. Die Deutsche Rentenversicherung versendet die Rentenauskunft ab 55 Jahren automatisch alle drei Jahre, Sie können aber auch zwischendurch eine aktuelle Auskunft beantragen."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Ab wann ist eine Rentenauskunft sinnvoll?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Eine Rentenauskunft ist besonders sinnvoll ab Mitte 50, wenn Sie konkret Ihre Altersvorsorge planen möchten. Auch früher kann sie wichtig sein - etwa bei Immobilienfinanzierung, Scheidung (Versorgungsausgleich) oder wenn Sie vorzeitig in Rente gehen möchten."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Wie lange dauert es, bis ich meine Rentenauskunft erhalte?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Nach Eingang Ihrer Anforderung bei der Deutschen Rentenversicherung dauert die Bearbeitung in der Regel 2-4 Wochen. Die Rentenauskunft wird Ihnen dann per Post zugeschickt."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Ist die Rentenauskunft kostenlos?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Ja, die Rentenauskunft der Deutschen Rentenversicherung ist kostenfrei. Unser Service erhebt eine Servicegebühr von 29,90 € für die strukturierte Erfassung und formgerechte Weiterleitung Ihrer Anforderung."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Was steht in der Rentenauskunft?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Die Rentenauskunft enthält eine detaillierte Berechnung Ihrer voraussichtlichen Altersrente, verschiedene Rentenszenarien (Regelaltersrente, vorzeitige Rente), Informationen zur Erwerbsminderungsrente und eine Übersicht Ihrer bisherigen Versicherungszeiten."
                      }
                    }
                  ]
                })
              }}
            />
            
            <div className="space-y-4">
              {[
                {
                  q: "Wie bekomme ich eine Rentenauskunft?",
                  a: "Sie können eine Rentenauskunft direkt bei der Deutschen Rentenversicherung anfordern - entweder online über deren eService, telefonisch, schriftlich oder über unseren Service. Ab dem 55. Lebensjahr erhalten Sie die Rentenauskunft automatisch alle drei Jahre zugeschickt."
                },
                {
                  q: "Wie oft kann man eine Rentenauskunft anfordern?",
                  a: "Sie können eine Rentenauskunft jederzeit anfordern - es gibt keine Begrenzung. Die Deutsche Rentenversicherung versendet die Rentenauskunft ab 55 Jahren automatisch alle drei Jahre, Sie können aber auch zwischendurch eine aktuelle Auskunft beantragen."
                },
                {
                  q: "Ab wann ist eine Rentenauskunft sinnvoll?",
                  a: "Eine Rentenauskunft ist besonders sinnvoll ab Mitte 50, wenn Sie konkret Ihre Altersvorsorge planen möchten. Auch früher kann sie wichtig sein - etwa bei Immobilienfinanzierung, Scheidung (Versorgungsausgleich) oder wenn Sie vorzeitig in Rente gehen möchten."
                },
                {
                  q: "Wie lange dauert es, bis ich meine Rentenauskunft erhalte?",
                  a: "Nach Eingang Ihrer Anforderung bei der Deutschen Rentenversicherung dauert die Bearbeitung in der Regel 2-4 Wochen. Die Rentenauskunft wird Ihnen dann per Post zugeschickt."
                },
                {
                  q: "Ist die Rentenauskunft kostenlos?",
                  a: "Ja, die Rentenauskunft der Deutschen Rentenversicherung ist kostenfrei. Unser Service erhebt eine Servicegebühr von 29,90 € für die strukturierte Erfassung und formgerechte Weiterleitung Ihrer Anforderung."
                },
                {
                  q: "Was steht in der Rentenauskunft?",
                  a: "Die Rentenauskunft enthält eine detaillierte Berechnung Ihrer voraussichtlichen Altersrente, verschiedene Rentenszenarien (Regelaltersrente, vorzeitige Rente), Informationen zur Erwerbsminderungsrente und eine Übersicht Ihrer bisherigen Versicherungszeiten."
                }
              ].map((faq, idx) => (
                <details key={idx} className="bg-white rounded-lg border border-slate-200 p-6 group">
                  <summary className="font-semibold text-lg text-slate-900 cursor-pointer list-none flex justify-between items-center">
                    {faq.q}
                    <span className="text-renten-blue group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-slate-700 leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Weitere Themen */}
          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-6">
              Weitere wichtige Rentenunterlagen
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/versicherungsverlauf-anfordern" className="block bg-white rounded-lg border border-slate-200 p-6 hover:border-renten-blue hover:shadow-md transition-all">
                <h3 className="font-semibold text-lg text-renten-blue mb-2">
                  Versicherungsverlauf anfordern
                </h3>
                <p className="text-sm text-slate-700">
                  Vollständige Übersicht aller Versicherungszeiten und Beiträge im Rentenkonto.
                </p>
              </Link>
              
              <Link href="/renteninformation-beantragen" className="block bg-white rounded-lg border border-slate-200 p-6 hover:border-renten-blue hover:shadow-md transition-all">
                <h3 className="font-semibold text-lg text-renten-blue mb-2">
                  Renteninformation beantragen
                </h3>
                <p className="text-sm text-slate-700">
                  Jährliche Kurzinformation über Ihren aktuellen Rentenanspruch.
                </p>
              </Link>
              
              <Link href="/kontenklarung-rentenversicherung" className="block bg-white rounded-lg border border-slate-200 p-6 hover:border-renten-blue hover:shadow-md transition-all">
                <h3 className="font-semibold text-lg text-renten-blue mb-2">
                  Kontenklärung Rentenversicherung
                </h3>
                <p className="text-sm text-slate-700">
                  Lücken und Fehler im Rentenkonto prüfen und klären lassen.
                </p>
              </Link>
              
              <Link href="/rentenbezugsbescheinigung-finanzamt" className="block bg-white rounded-lg border border-slate-200 p-6 hover:border-renten-blue hover:shadow-md transition-all">
                <h3 className="font-semibold text-lg text-renten-blue mb-2">
                  Rentenbezugsbescheinigung Finanzamt
                </h3>
                <p className="text-sm text-slate-700">
                  Steuerbescheinigung für Rentner - wichtig für die Steuererklärung.
                </p>
              </Link>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-br from-renten-blue to-[#0a4178] text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Jetzt Rentenauskunft online beantragen
            </h2>
            <p className="text-xl text-slate-100 mb-8 max-w-2xl mx-auto">
              Starten Sie in wenigen Minuten Ihre Anforderung. Wir kümmern uns um die strukturierte Weiterleitung an die Deutsche Rentenversicherung.
            </p>
            <Link 
              href="/#formular"
              className="inline-flex items-center px-8 py-4 bg-renten-accent font-semibold rounded-lg hover:bg-renten-accent/90 transition-colors shadow-lg"
              style={{ color: '#ffffff' }}
            >
              Rentenauskunft jetzt beantragen
            </Link>
            <p className="mt-6 text-sm text-slate-200">
              Einmalige Servicegebühr: 29,90 € inkl. MwSt.
            </p>
          </section>

          {/* Disclaimer */}
          <div className="mt-12 p-6 bg-slate-100 rounded-lg text-sm text-slate-600">
            <p className="mb-2">
              <strong>Wichtiger Hinweis:</strong> Rentnerauskunft.de ist ein unabhängiger Service und kein offizieller Service der Deutschen Rentenversicherung. Wir unterstützen Sie bei der strukturierten Erfassung und formgerechten Weiterleitung Ihrer Anforderung an die zuständige Stelle der Deutschen Rentenversicherung.
            </p>
            <p>
              Die Rentenauskunft selbst ist kostenfrei und wird von der Deutschen Rentenversicherung erstellt und versendet. Unsere Servicegebühr von 29,90 € deckt die professionelle Aufbereitung und Weiterleitung Ihrer Daten.
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
