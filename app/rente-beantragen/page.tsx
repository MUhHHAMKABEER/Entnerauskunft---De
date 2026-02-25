import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Rente beantragen online | Rentenantrag – Anleitung & Fristen",
  description:
    "Rente beantragen leicht gemacht: Wann und wo Rentenantrag stellen, welche Unterlagen nötig sind und welche Fristen gelten. Altersrente & vorzeitige Rente im Überblick.",
  keywords: 'rente beantragen, rentenantrag stellen, rentenantrag online, altersrente beantragen, regelaltersrente beantragen, rente beantragen wann, rentenantrag unterlagen, rentenantrag formular',
  alternates: { canonical: 'https://rentnerauskunft.de/rente-beantragen' },
  openGraph: {
    title: "Rente beantragen online | Rentenantrag – Anleitung & Fristen",
    description:
      "Rente beantragen leicht gemacht: Wann und wo Rentenantrag stellen, welche Unterlagen nötig sind und welche Fristen gelten. Altersrente & vorzeitige Rente im Überblick.",
    type: 'website',
    url: 'https://rentnerauskunft.de/rente-beantragen'
  }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Rente beantragen – Schritt für Schritt",
  description:
    "Anleitung, wie Sie Ihre Altersrente beantragen: Zeitpunkt wählen, Unterlagen vorbereiten und Rentenantrag stellen.",
  step: [
    {
      "@type": "HowToStep",
      name: "Unterlagen prüfen",
      text: "Versicherungsverlauf, Rentenauskunft oder Renteninformation sowie Ihre persönlichen Daten prüfen.",
    },
    {
      "@type": "HowToStep",
      name: "Rentenantrag ausfüllen",
      text: "Die Formulare der Deutschen Rentenversicherung vollständig und wahrheitsgemäß ausfüllen.",
    },
    {
      "@type": "HowToStep",
      name: "Rentenantrag einreichen",
      text: "Den Rentenantrag online, per Post oder über eine Auskunfts- und Beratungsstelle der Deutschen Rentenversicherung einreichen.",
    },
  ],
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
      name: "Rente beantragen",
      item: "https://rentnerauskunft.de/rente-beantragen",
    },
  ],
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
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
        <span className="text-slate-900 font-semibold">Rente beantragen</span>
      </nav>

      <header className="mb-4">
        <h1 className="font-heading text-[36px] leading-tight font-semibold text-renten-blue mb-2">
          Rente beantragen – so stellen Sie Ihren Rentenantrag richtig
        </h1>
        <p className="text-sm text-slate-700 max-w-3xl">
          Sie möchten Ihre <strong>Altersrente</strong> oder{" "}
          <strong>Regelaltersrente</strong> beantragen und fragen sich,{" "}
          <strong>wann</strong> und <strong>wo</strong> der{" "}
          <strong>Rentenantrag</strong> gestellt werden sollte? Hier finden Sie
          eine praxisnahe Anleitung mit allen wichtigen Schritten und
          Unterlagen.
        </p>
      </header>

      {/* Einstiegsblock */}
      <section className="bg-white rounded-2xl border border-slate-100 shadow-soft px-6 py-6 md:px-8 md:py-8 space-y-4">
        <h2 className="font-heading text-xl font-semibold text-renten-blue">
          Wann sollte der Rentenantrag gestellt werden?
        </h2>
        <p className="text-sm text-slate-700">
          In der Regel empfiehlt die Deutsche Rentenversicherung, den{" "}
          <strong>Rentenantrag</strong> etwa drei Monate vor dem gewünschten
          Rentenbeginn zu stellen. So bleibt genügend Zeit, um offene Fragen zu
          klären, fehlende Unterlagen nachzureichen und zu vermeiden, dass der
          Übergang von Erwerbsleben zur <strong>Altersrente</strong> durch
          Zahlpausen unterbrochen wird.
        </p>
        <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
          <li>
            <strong>Rentenantrag wann stellen?</strong> – im Regelfall ca. 3
            Monate vor Rentenbeginn.
          </li>
          <li>
            <strong>Rente wo beantragen?</strong> – bei der Deutschen
            Rentenversicherung (online, per Post oder vor Ort).
          </li>
          <li>
            <strong>Rentenantrag online</strong> – über die offiziellen
            Online-Dienste der Deutschen Rentenversicherung.
          </li>
        </ul>
      </section>

      {/* Zwei-Spalten: Unterlagen + Kurzübersicht */}
      <section className="grid gap-6 md:grid-cols-[1.8fr,1.2fr]">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft px-6 py-6 md:px-8 md:py-8 space-y-4">
          <h2 className="font-heading text-xl font-semibold text-renten-blue">
            Welche Unterlagen brauchen Sie zum Rente beantragen?
          </h2>
          <p className="text-sm text-slate-700">
            Für die <strong>Beantragung der Rente</strong> sollten Sie einige
            zentrale Unterlagen bereithalten. Dazu gehören insbesondere:
          </p>
          <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
            <li>Ihre Rentenversicherungsnummer</li>
            <li>ein aktueller <strong>Versicherungsverlauf</strong></li>
            <li>
              eine <strong>Rentenauskunft</strong> oder{" "}
              <strong>Renteninformation</strong>
            </li>
            <li>Personalausweis oder Reisepass</li>
            <li>Bankverbindung für die Rentenzahlung</li>
          </ul>
          <p className="text-sm text-slate-700">
            Über die{" "}
            <a href="/" className="text-renten-blue underline">
              Startseite
            </a>{" "}
            können Sie diese Angaben strukturiert erfassen und so Ihren{" "}
            <strong>Rentenantrag</strong> vorbereiten.
          </p>
        </div>

        <aside className="bg-white rounded-2xl border border-renten-accent/70 shadow-soft px-6 py-6 space-y-3">
          <h3 className="font-heading text-sm font-semibold text-renten-blue">
            Kurzüberblick: Schritte zur Beantragung der Rente
          </h3>
          <ol className="text-xs md:text-sm text-slate-700 list-decimal pl-5 space-y-1">
            <li>
              Versicherungsverlauf und Renteninformationen prüfen und ggf.
              aktualisieren.
            </li>
            <li>
              Persönliche Daten wie Name, Adresse, Familienstand und
              Bankverbindung bereithalten.
            </li>
            <li>
              Rentenantrag ausfüllen – online, in Papierform oder mit
              Unterstützung einer Beratungsstelle.
            </li>
            <li>
              Antrag rechtzeitig abgeben, damit die{" "}
              <strong>Altersrente</strong> pünktlich beginnt.
            </li>
          </ol>
        </aside>
      </section>

      {/* Schritt-für-Schritt-Prozess */}
      <section className="bg-white rounded-2xl border border-slate-100 shadow-soft px-6 py-6 md:px-8 md:py-8 space-y-5">
        <h2 className="font-heading text-xl font-semibold text-renten-blue">
          Rentenantrag stellen – Schritt für Schritt
        </h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700">
          <li>
            <strong>Versicherungsverlauf prüfen:</strong> Sind alle Zeiten
            (Ausbildung, Beschäftigung, Kindererziehung, Arbeitslosigkeit)
            vollständig gemeldet?
          </li>
          <li>
            <strong>Rentenauskunft und Renteninformation nutzen:</strong> Nutzen
            Sie eine aktuelle <strong>Rentenauskunft</strong>, um zu sehen, wie
            hoch Ihre <strong>Altersrente</strong> voraussichtlich ausfällt.
          </li>
          <li>
            <strong>Daten erfassen:</strong> Personendaten und
            Versicherungsnummer zentral erfassen – zum Beispiel über unsere{" "}
            <a href="/" className="text-renten-blue underline">
              Online-Erfassungsseite
            </a>
            .
          </li>
          <li>
            <strong>Rentenantrag ausfüllen:</strong> Die Formulare der
            Deutschen Rentenversicherung vollständig ausfüllen, entweder online
            oder in Papierform.
          </li>
          <li>
            <strong>Antrag einreichen:</strong> Per Post, über eine Auskunfts-
            und Beratungsstelle oder als <strong>Rentenantrag online</strong>.
          </li>
          <li>
            <strong>Rückfragen beantworten:</strong> Bei Nachfragen der
            Rentenversicherung zeitnah reagieren, um Bearbeitungszeiten zu
            verkürzen.
          </li>
        </ol>
      </section>

      {/* Unterformen der Rente – kein Card-Layout mehr, alles Text */}
      <section className="bg-white rounded-2xl border border-slate-100 shadow-soft px-6 py-6 md:px-8 md:py-8 space-y-5">
        <h2 className="font-heading text-xl font-semibold text-renten-blue">
          Regelaltersrente, vorgezogene Rente und Teilrente im Überblick
        </h2>

        <div className="space-y-4 text-sm text-slate-700">
          <div>
            <h3 className="font-heading text-base font-semibold text-slate-900 mb-1">
              Regelaltersrente
            </h3>
            <p>
              Die <strong>Regelaltersrente</strong> beginnt mit der regulären
              Altersgrenze. Für die <strong>Beantragung der Rente</strong> ist
              entscheidend, den <strong>Rentenantrag rechtzeitig</strong> zu
              stellen, damit keine Lücke zwischen letztem Gehalt und erster
              Rentenzahlung entsteht.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-base font-semibold text-slate-900 mb-1">
              Vorgezogene Altersrente
            </h3>
            <p>
              Wer früher in Rente gehen möchte, muss häufig Abschläge in Kauf
              nehmen. Eine genaue <strong>Rentenauskunft</strong> zeigt, wie
              sich ein vorgezogener Rentenbeginn auf die Rentenhöhe auswirkt.
              Bevor Sie die <strong>Rente beantragen</strong>, sollten Sie diese
              Szenarien durchrechnen.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-base font-semibold text-slate-900 mb-1">
              Teilrente &amp; Hinzuverdienst
            </h3>
            <p>
              Bei einer <strong>Teilrente</strong> wird nur ein Teil der
              vollen Rente ausgezahlt, sodass weiterhin ein Hinzuverdienst
              möglich ist. Beim <strong>Rentenantrag</strong> müssen Angaben zum
              geplanten Hinzuverdienst gemacht werden, damit die Rentenform
              korrekt berechnet wird.
            </p>
          </div>
        </div>
      </section>

      {/* SEO-Block „Beantragung der Rente“ */}
      <section className="bg-white rounded-2xl border border-slate-100 shadow-soft px-6 py-6 md:px-8 md:py-8 space-y-4">
        <h2 className="font-heading text-xl font-semibold text-renten-blue">
          Beantragung der Rente optimal vorbereiten
        </h2>
        <p className="text-sm text-slate-700">
          Unter Formulierungen wie <strong>„Beantragung der Rente“</strong>,{" "}
          <strong>„Beantragung von Rente“</strong> oder{" "}
          <strong>„Rentenbeantragung“</strong> versteht man den gesamten Prozess
          von der Zusammenstellung der Unterlagen bis zur Entscheidung der
          Deutschen Rentenversicherung. Je strukturierter Sie vorgehen, desto
          schneller und reibungsloser verläuft das Verfahren.
        </p>
        <p className="text-sm text-slate-700">
          Unsere Startseite zur{" "}
          <a href="/" className="text-renten-blue underline">
            Erfassung von Rentenunterlagen
          </a>{" "}
          hilft Ihnen, wichtige Daten wie{" "}
          <strong>Versicherungsnummer</strong>,{" "}
          <strong>Versicherungsverlauf</strong>,{" "}
          <strong>Rentenauskunft</strong> und{" "}
          <strong>Renteninformation</strong> geordnet zu erfassen – als
          Grundlage für den späteren Rentenantrag bei der Deutschen
          Rentenversicherung.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="bg-white rounded-2xl border border-slate-100 shadow-soft px-6 py-6 md:px-8 md:py-8 space-y-6">
        <h2 className="font-heading text-xl font-semibold text-renten-blue">
          Häufig gestellte Fragen zum Rentenantrag
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
                  "name": "Wie lange vorher muss ich die Rente beantragen?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Die Deutsche Rentenversicherung empfiehlt, den Rentenantrag etwa 3 Monate vor dem gewünschten Rentenbeginn zu stellen. So bleibt genug Zeit für die Bearbeitung und eventuelle Rückfragen."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Kann ich den Rentenantrag online stellen?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ja, die Deutsche Rentenversicherung bietet einen Online-Rentenantrag an. Sie benötigen dafür einen Zugang zu den Online-Diensten der DRV."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Welche Unterlagen brauche ich für den Rentenantrag?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Wichtige Unterlagen sind: Versicherungsnummer, Personalausweis, Rentenauskunft oder Versicherungsverlauf, Geburtsurkunde, ggf. Heiratsurkunde, Nachweise über Kinder, Kontoverbindung und je nach Rentenart weitere spezifische Unterlagen."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Was passiert nach dem Rentenantrag?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Die Deutsche Rentenversicherung prüft Ihren Antrag, fordert ggf. fehlende Unterlagen nach und erlässt dann einen Rentenbescheid. Die Bearbeitung dauert in der Regel 4-8 Wochen."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Kann ich den Rentenantrag zurückziehen?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ja, Sie können Ihren Rentenantrag jederzeit zurückziehen, solange noch kein Rentenbescheid erlassen wurde. Nach Rentenbeginn ist ein Rückzug nur unter bestimmten Bedingungen möglich."
                  }
                }
              ]
            })
          }}
        />
        
        <div className="space-y-4">
          <details className="bg-slate-50 rounded-lg p-4 group">
            <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center">
              Wie lange vorher muss ich die Rente beantragen?
              <span className="text-renten-blue group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-sm text-slate-700">
              Die Deutsche Rentenversicherung empfiehlt, den Rentenantrag etwa 3 Monate vor dem gewünschten Rentenbeginn zu stellen. So bleibt genug Zeit für die Bearbeitung und eventuelle Rückfragen.
            </p>
          </details>
          
          <details className="bg-slate-50 rounded-lg p-4 group">
            <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center">
              Kann ich den Rentenantrag online stellen?
              <span className="text-renten-blue group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-sm text-slate-700">
              Ja, die Deutsche Rentenversicherung bietet einen Online-Rentenantrag an. Sie benötigen dafür einen Zugang zu den Online-Diensten der DRV.
            </p>
          </details>
          
          <details className="bg-slate-50 rounded-lg p-4 group">
            <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center">
              Welche Unterlagen brauche ich für den Rentenantrag?
              <span className="text-renten-blue group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-sm text-slate-700">
              Wichtige Unterlagen sind: Versicherungsnummer, Personalausweis, Rentenauskunft oder Versicherungsverlauf, Geburtsurkunde, ggf. Heiratsurkunde, Nachweise über Kinder, Kontoverbindung und je nach Rentenart weitere spezifische Unterlagen.
            </p>
          </details>
          
          <details className="bg-slate-50 rounded-lg p-4 group">
            <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center">
              Was passiert nach dem Rentenantrag?
              <span className="text-renten-blue group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-sm text-slate-700">
              Die Deutsche Rentenversicherung prüft Ihren Antrag, fordert ggf. fehlende Unterlagen nach und erlässt dann einen Rentenbescheid. Die Bearbeitung dauert in der Regel 4-8 Wochen.
            </p>
          </details>
          
          <details className="bg-slate-50 rounded-lg p-4 group">
            <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center">
              Kann ich den Rentenantrag zurückziehen?
              <span className="text-renten-blue group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-sm text-slate-700">
              Ja, Sie können Ihren Rentenantrag jederzeit zurückziehen, solange noch kein Rentenbescheid erlassen wurde. Nach Rentenbeginn ist ein Rückzug nur unter bestimmten Bedingungen möglich.
            </p>
          </details>
        </div>
      </section>

      {/* Weitere Themen */}
      <section className="bg-white rounded-2xl border border-slate-100 shadow-soft px-6 py-6 md:px-8 md:py-8">
        <h2 className="font-heading text-xl font-semibold text-renten-blue mb-6">
          Weitere wichtige Themen zur Rentenplanung
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/rentenauskunft-online-beantragen" className="block p-4 border border-slate-200 rounded-lg hover:border-renten-blue hover:shadow-md transition-all">
            <h3 className="font-semibold text-renten-blue mb-2">Rentenauskunft beantragen</h3>
            <p className="text-sm text-slate-700">Detaillierte Berechnung Ihrer voraussichtlichen Altersrente anfordern.</p>
          </Link>
          
          <Link href="/versicherungsverlauf-anfordern" className="block p-4 border border-slate-200 rounded-lg hover:border-renten-blue hover:shadow-md transition-all">
            <h3 className="font-semibold text-renten-blue mb-2">Versicherungsverlauf prüfen</h3>
            <p className="text-sm text-slate-700">Alle Versicherungszeiten kontrollieren und Lücken schließen.</p>
          </Link>
          
          <Link href="/kontenklarung-rentenversicherung" className="block p-4 border border-slate-200 rounded-lg hover:border-renten-blue hover:shadow-md transition-all">
            <h3 className="font-semibold text-renten-blue mb-2">Kontenklärung durchführen</h3>
            <p className="text-sm text-slate-700">Rentenkonto klären und fehlende Zeiten nachmelden.</p>
          </Link>
          
          <Link href="/erwerbsminderungsrente" className="block p-4 border border-slate-200 rounded-lg hover:border-renten-blue hover:shadow-md transition-all">
            <h3 className="font-semibold text-renten-blue mb-2">Erwerbsminderungsrente</h3>
            <p className="text-sm text-slate-700">Rente bei Erwerbsminderung beantragen.</p>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-renten-blue to-[#0a4178] text-white rounded-2xl p-8 md:p-12 text-center">
        <h2 className="font-heading text-3xl font-bold mb-4">
          Bereiten Sie Ihren Rentenantrag optimal vor
        </h2>
        <p className="text-xl text-slate-100 mb-8 max-w-2xl mx-auto">
          Fordern Sie jetzt Ihre Rentenunterlagen an und starten Sie gut vorbereitet in den Ruhestand.
        </p>
        <Link 
          href="/#formular"
          className="inline-flex items-center px-8 py-4 bg-renten-accent text-renten-blue font-semibold rounded-lg hover:bg-renten-accent/90 transition-colors shadow-lg"
        >
          Rentenunterlagen anfordern
        </Link>
      </section>
    </main>
  );
}
