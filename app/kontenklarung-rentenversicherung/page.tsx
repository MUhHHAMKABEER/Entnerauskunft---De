import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kontenklärung Rentenversicherung | Rentenkonto klären',
  description: 'Kontenklärung bei der Deutschen Rentenversicherung. Lücken im Rentenkonto finden, fehlende Zeiten nachmelden und Rentenansprüche sichern.',
  keywords: 'kontenklärung rentenversicherung, rentenkonto klären, kontenklärung beantragen, lücken im versicherungsverlauf, fehlende zeiten nachmelden',
  alternates: { canonical: 'https://rentnerauskunft.de/kontenklarung-rentenversicherung' },
  openGraph: {
    title: 'Kontenklärung Rentenversicherung | Rentenkonto klären',
    description: 'Kontenklärung bei der Deutschen Rentenversicherung. Lücken im Rentenkonto finden, fehlende Zeiten nachmelden und Rentenansprüche sichern.',
    type: 'website',
    url: 'https://rentnerauskunft.de/kontenklarung-rentenversicherung'
  }
};

export default function KontenklarungRentenversicherung() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Was ist eine Kontenklärung?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Die Kontenklärung ist ein Verfahren der Deutschen Rentenversicherung, bei dem Ihr Rentenkonto auf Vollständigkeit und Richtigkeit geprüft wird. Fehlende oder falsche Zeiten werden korrigiert und nachgemeldet."
                }
              },
              {
                "@type": "Question",
                "name": "Wann sollte ich eine Kontenklärung durchführen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Idealerweise 3-5 Jahre vor dem geplanten Renteneintritt. So haben Sie genug Zeit, fehlende Unterlagen zu beschaffen und alle Zeiten korrekt erfassen zu lassen."
                }
              },
              {
                "@type": "Question",
                "name": "Wie lange dauert eine Kontenklärung?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Die Dauer hängt vom Umfang ab. Bei vollständigen Unterlagen dauert es 4-8 Wochen. Müssen noch Nachweise beschafft werden, kann es mehrere Monate dauern."
                }
              }
            ]
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
              { "@type": "ListItem", "position": 2, "name": "Kontenklärung Rentenversicherung", "item": "https://rentnerauskunft.de/kontenklarung-rentenversicherung" }
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
              <span>Kontenklärung Rentenversicherung</span>
            </nav>
            
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Kontenklärung Rentenversicherung
            </h1>
            
            <p className="text-xl text-slate-100 max-w-3xl mb-8">
              Klären Sie Ihr Rentenkonto, schließen Sie Lücken und sichern Sie sich alle Rentenansprüche. Professionelle Unterstützung bei der Kontenklärung.
            </p>
            
            <Link 
              href="/#formular"
              className="inline-flex items-center px-6 py-3 bg-renten-accent text-white font-semibold rounded-lg hover:bg-renten-accent/90 transition-colors"
            >
              Kontenklärung jetzt starten
            </Link>
          </div>
        </section>

        <article className="max-w-5xl mx-auto px-6 py-12">
          
          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-6">
              Was ist eine Kontenklärung?
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed mb-6">
                Die <strong>Kontenklärung</strong> ist ein wichtiges Verfahren der <strong>Deutschen Rentenversicherung</strong>, bei dem Ihr gesamtes Rentenkonto auf Vollständigkeit und Richtigkeit überprüft wird. Dabei werden:
              </p>
              
              <div className="bg-white rounded-xl border border-slate-200 p-8 mb-8">
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-renten-blue text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Lücken identifiziert</h3>
                      <p className="text-sm text-slate-700">Zeiträume ohne Versicherungsschutz werden aufgedeckt</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-renten-blue text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Fehler korrigiert</h3>
                      <p className="text-sm text-slate-700">Falsch erfasste Beiträge oder Zeiten werden berichtigt</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-renten-blue text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Fehlende Zeiten nachgemeldet</h3>
                      <p className="text-sm text-slate-700">Ausbildung, Kindererziehung, Wehrdienst etc. werden ergänzt</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-renten-accent text-renten-blue rounded-full flex items-center justify-center font-bold">✓</span>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Rentenkonto vollständig</h3>
                      <p className="text-sm text-slate-700">Ihr Rentenkonto ist bereit für den Rentenantrag</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-16 bg-red-50 border-l-4 border-red-500 p-8 rounded-r-lg">
            <h2 className="font-heading text-2xl font-bold text-red-900 mb-4">
              Warum ist die Kontenklärung so wichtig?
            </h2>
            
            <p className="text-slate-700 mb-4">
              <strong>Jede fehlende Zeit kostet Sie Geld!</strong> Studien zeigen, dass viele Rentner zu wenig Rente erhalten, weil Zeiten nicht erfasst wurden:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white rounded-lg p-6">
                <div className="text-3xl font-bold text-red-600 mb-2">30%</div>
                <p className="text-sm text-slate-700">der Rentenkonten haben Lücken oder Fehler</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <div className="text-3xl font-bold text-red-600 mb-2">50-200€</div>
                <p className="text-sm text-slate-700">weniger Rente pro Monat durch fehlende Zeiten</p>
              </div>
            </div>
            
            <p className="mt-6 text-slate-700">
              Eine rechtzeitige Kontenklärung kann Ihre monatliche Rente deutlich erhöhen - und das ein Leben lang!
            </p>
          </section>

          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-6">
              Wann sollten Sie eine Kontenklärung durchführen?
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg border-l-4 border-renten-accent p-6">
                <h3 className="font-semibold text-lg text-renten-blue mb-2">
                  Optimal: 3-5 Jahre vor Rentenbeginn
                </h3>
                <p className="text-slate-700">
                  So haben Sie genug Zeit, fehlende Unterlagen zu beschaffen (alte Arbeitgeberbescheinigungen, Ausbildungsnachweise etc.) und alle Zeiten korrekt erfassen zu lassen.
                </p>
              </div>
              
              <div className="bg-white rounded-lg border-l-4 border-slate-400 p-6">
                <h3 className="font-semibold text-lg text-renten-blue mb-2">
                  Spätestens: 1 Jahr vor Rentenantrag
                </h3>
                <p className="text-slate-700">
                  Die Kontenklärung sollte vor dem Rentenantrag abgeschlossen sein. Nachträgliche Korrekturen sind zwar möglich, aber aufwendiger.
                </p>
              </div>
              
              <div className="bg-white rounded-lg border-l-4 border-renten-blue p-6">
                <h3 className="font-semibold text-lg text-renten-blue mb-2">
                  Auch früher sinnvoll bei:
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-700 mt-2">
                  <li>Häufigen Jobwechseln oder Minijobs</li>
                  <li>Längeren Auslandsaufenthalten</li>
                  <li>Selbstständigkeit oder freiberuflicher Tätigkeit</li>
                  <li>Unstimmigkeiten in der Renteninformation</li>
                  <li>Scheidung (Versorgungsausgleich)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-6">
              Ablauf der Kontenklärung
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Versicherungsverlauf anfordern",
                  desc: "Fordern Sie Ihren aktuellen Versicherungsverlauf bei der Deutschen Rentenversicherung an."
                },
                {
                  step: "2",
                  title: "Versicherungsverlauf prüfen",
                  desc: "Prüfen Sie den Verlauf Zeile für Zeile auf Vollständigkeit. Achten Sie auf Lücken, fehlende Arbeitgeber und nicht erfasste Zeiten."
                },
                {
                  step: "3",
                  title: "Unterlagen zusammenstellen",
                  desc: "Sammeln Sie Nachweise für fehlende Zeiten: Arbeitsverträge, Ausbildungsnachweise, Geburtsurkunden der Kinder etc."
                },
                {
                  step: "4",
                  title: "Kontenklärung beantragen",
                  desc: "Stellen Sie den Antrag auf Kontenklärung bei der Deutschen Rentenversicherung und reichen Sie die Unterlagen ein."
                },
                {
                  step: "5",
                  title: "Prüfung durch die DRV",
                  desc: "Die Deutsche Rentenversicherung prüft Ihre Unterlagen und ergänzt fehlende Zeiten in Ihrem Rentenkonto."
                },
                {
                  step: "6",
                  title: "Bescheid erhalten",
                  desc: "Sie erhalten einen Bescheid über die Kontenklärung mit dem aktualisierten Versicherungsverlauf."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-renten-blue to-[#0a4178] text-white rounded-full flex items-center justify-center font-bold text-xl">
                    {item.step}
                  </div>
                  <div className="flex-1 bg-white rounded-lg border border-slate-200 p-6">
                    <h3 className="font-semibold text-lg text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-700">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-6">
              Welche Unterlagen brauchen Sie für die Kontenklärung?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-semibold text-lg text-renten-blue mb-4">Beschäftigungszeiten</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="text-renten-accent">✓</span>
                    <span>Arbeitsverträge</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-renten-accent">✓</span>
                    <span>Lohnabrechnungen</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-renten-accent">✓</span>
                    <span>Arbeitgeberbescheinigungen</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-renten-accent">✓</span>
                    <span>Sozialversicherungsausweise</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-semibold text-lg text-renten-blue mb-4">Ausbildungszeiten</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="text-renten-accent">✓</span>
                    <span>Schulzeugnisse (ab 17. Lebensjahr)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-renten-accent">✓</span>
                    <span>Ausbildungsnachweise</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-renten-accent">✓</span>
                    <span>Studiennachweise</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-renten-accent">✓</span>
                    <span>Immatrikulationsbescheinigungen</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-semibold text-lg text-renten-blue mb-4">Kindererziehung</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="text-renten-accent">✓</span>
                    <span>Geburtsurkunden der Kinder</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-renten-accent">✓</span>
                    <span>Meldebescheinigungen</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-renten-accent">✓</span>
                    <span>Nachweise über Erziehungszeiten</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-semibold text-lg text-renten-blue mb-4">Sonstige Zeiten</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="text-renten-accent">✓</span>
                    <span>Wehrdienst-/Zivildienstbescheinigung</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-renten-accent">✓</span>
                    <span>Bescheinigung über Pflegezeiten</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-renten-accent">✓</span>
                    <span>Arbeitslosengeld-Bescheide</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-renten-accent">✓</span>
                    <span>Krankengeld-Bescheinigungen</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-6 bg-renten-accent/10 rounded-lg">
              <p className="text-sm text-slate-700">
                <strong>Tipp:</strong> Kopien reichen meist aus. Bewahren Sie die Originale sicher auf. Die Deutsche Rentenversicherung kann bei Bedarf Originale nachfordern.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-8">
              Häufig gestellte Fragen zur Kontenklärung
            </h2>
            
            <div className="space-y-4">
              <details className="bg-white rounded-lg border border-slate-200 p-6 group">
                <summary className="font-semibold text-lg text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  Wie lange dauert eine Kontenklärung?
                  <span className="text-renten-blue group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  Die Dauer hängt vom Umfang ab. Bei vollständigen Unterlagen dauert es 4-8 Wochen. Müssen noch Nachweise von alten Arbeitgebern beschafft werden, kann es mehrere Monate dauern. Deshalb: Früh anfangen!
                </p>
              </details>
              
              <details className="bg-white rounded-lg border border-slate-200 p-6 group">
                <summary className="font-semibold text-lg text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  Kostet die Kontenklärung etwas?
                  <span className="text-renten-blue group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  Nein, die Kontenklärung durch die Deutsche Rentenversicherung ist kostenfrei. Unser Service unterstützt Sie bei der Vorbereitung und strukturierten Anforderung der notwendigen Unterlagen.
                </p>
              </details>
              
              <details className="bg-white rounded-lg border border-slate-200 p-6 group">
                <summary className="font-semibold text-lg text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  Was passiert, wenn ich Unterlagen nicht mehr habe?
                  <span className="text-renten-blue group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  Die Deutsche Rentenversicherung hilft bei der Beschaffung. Sie kontaktiert alte Arbeitgeber, Krankenkassen oder Behörden. In manchen Fällen reichen auch eidesstattliche Versicherungen oder Zeugenaussagen.
                </p>
              </details>
              
              <details className="bg-white rounded-lg border border-slate-200 p-6 group">
                <summary className="font-semibold text-lg text-slate-900 cursor-pointer list-none flex justify-between items-center">
                  Kann ich die Kontenklärung auch nach Rentenbeginn machen?
                  <span className="text-renten-blue group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-slate-700 leading-relaxed">
                  Ja, nachträgliche Korrekturen sind möglich. Die Rente wird dann rückwirkend angepasst. Allerdings ist es deutlich einfacher und schneller, die Kontenklärung vor dem Rentenantrag durchzuführen.
                </p>
              </details>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-renten-blue mb-6">
              Weitere wichtige Schritte zur Rentenplanung
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/versicherungsverlauf-anfordern" className="block bg-white rounded-lg border border-slate-200 p-6 hover:border-renten-blue hover:shadow-md transition-all">
                <h3 className="font-semibold text-lg text-renten-blue mb-2">
                  Versicherungsverlauf anfordern
                </h3>
                <p className="text-sm text-slate-700">
                  Erster Schritt: Holen Sie sich Ihren aktuellen Versicherungsverlauf.
                </p>
              </Link>
              
              <Link href="/rentenauskunft-online-beantragen" className="block bg-white rounded-lg border border-slate-200 p-6 hover:border-renten-blue hover:shadow-md transition-all">
                <h3 className="font-semibold text-lg text-renten-blue mb-2">
                  Rentenauskunft beantragen
                </h3>
                <p className="text-sm text-slate-700">
                  Nach der Kontenklärung: Aktuelle Rentenberechnung anfordern.
                </p>
              </Link>
            </div>
          </section>

          <section className="bg-gradient-to-br from-renten-blue to-[#0a4178] text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Starten Sie jetzt Ihre Kontenklärung
            </h2>
            <p className="text-xl text-slate-100 mb-8 max-w-2xl mx-auto">
              Sichern Sie sich alle Rentenansprüche. Wir unterstützen Sie bei der Anforderung der notwendigen Unterlagen.
            </p>
            <Link 
              href="/#formular"
              className="inline-flex items-center px-8 py-4 bg-renten-accent text-white font-semibold rounded-lg hover:bg-renten-accent/90 transition-colors shadow-lg"
            >
              Unterlagen jetzt anfordern
            </Link>
          </section>
        </article>
      </div>
    </>
  );
}
