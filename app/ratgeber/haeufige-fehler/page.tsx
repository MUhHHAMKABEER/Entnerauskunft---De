import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Häufige Fehler bei Rentenunterlagen – Rentenauskunft & Versicherungsverlauf prüfen",
  description:
    "Die 10 häufigsten Fehler bei Rentenunterlagen: Fehlende Zeiten, falsche Angaben im Versicherungsverlauf und wie Sie Ihre Rentenauskunft richtig prüfen.",
  openGraph: {
    title: "Häufige Fehler bei Rentenunterlagen vermeiden",
    description:
      "Die 10 häufigsten Fehler bei Rentenunterlagen und wie Sie Ihre Rentenauskunft richtig prüfen.",
    url: "https://rentnerauskunft.de/ratgeber/haeufige-fehler",
    siteName: "Rentenauskunft Service",
    locale: "de_DE",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Häufige Fehler bei Rentenunterlagen – So vermeiden Sie Probleme",
  description:
    "Übersicht über die häufigsten Fehler bei Rentenunterlagen und wie Sie diese vermeiden können.",
  author: {
    "@type": "Organization",
    name: "Rentenauskunft Service",
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
      name: "Häufige Fehler bei Rentenunterlagen",
      item: "https://rentnerauskunft.de/ratgeber/haeufige-fehler",
    },
  ],
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
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
        <span className="text-slate-900 font-semibold">
          Häufige Fehler bei Rentenunterlagen
        </span>
      </nav>

      {/* Header */}
      <header className="mb-6">
        <h1 className="font-heading text-[36px] leading-tight font-semibold text-renten-blue mb-3">
          Die 10 häufigsten Fehler bei Rentenunterlagen – und wie Sie sie
          vermeiden
        </h1>
        <p className="text-sm text-slate-700 max-w-3xl">
          Fehler in der <strong>Rentenauskunft</strong>, im{" "}
          <strong>Versicherungsverlauf</strong> oder beim{" "}
          <strong>Rentenantrag</strong> können zu finanziellen Einbußen führen.
          Hier erfahren Sie, welche Fehler am häufigsten auftreten und wie Sie
          Ihre Unterlagen richtig prüfen.
        </p>
      </header>

      {/* Intro */}
      <section className="bg-white rounded-2xl shadow-soft border border-slate-100 px-6 py-8 md:px-10 md:py-10 space-y-4 text-sm text-slate-700">
        <h2 className="font-heading text-2xl font-semibold text-renten-blue">
          Warum Fehler in Rentenunterlagen so kritisch sind
        </h2>
        <p>
          Die <strong>Deutsche Rentenversicherung</strong> berechnet Ihre
          spätere Rente auf Basis der gespeicherten Daten in Ihrem
          Versicherungskonto. Fehlen Zeiten oder sind Angaben falsch, kann das
          zu einer deutlich niedrigeren <strong>Altersrente</strong> führen –
          oft um mehrere hundert Euro pro Monat.
        </p>
        <p>
          Viele Versicherte bemerken Fehler erst kurz vor dem Ruhestand, wenn
          eine Korrektur schwierig oder gar nicht mehr möglich ist. Deshalb ist
          es wichtig, Ihre <strong>Rentenauskunft</strong> und Ihren{" "}
          <strong>Versicherungsverlauf</strong> regelmäßig zu prüfen – am
          besten ab Mitte 40.
        </p>
      </section>

      {/* Die 10 Fehler */}
      <section className="bg-white rounded-2xl shadow-soft border border-slate-100 px-6 py-8 md:px-10 md:py-10 space-y-8 text-sm text-slate-700">
        <h2 className="font-heading text-2xl font-semibold text-renten-blue">
          Die 10 häufigsten Fehler bei Rentenunterlagen
        </h2>

        {/* Fehler 1 */}
        <div className="border-l-4 border-renten-accent pl-5">
          <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">
            1. Fehlende Ausbildungszeiten
          </h3>
          <p className="mb-2">
            <strong>Problem:</strong> Zeiten der Berufsausbildung, des Studiums
            oder der Schulausbildung ab dem 17. Lebensjahr werden häufig nicht
            automatisch erfasst.
          </p>
          <p className="mb-2">
            <strong>Lösung:</strong> Prüfen Sie Ihren{" "}
            <strong>Versicherungsverlauf</strong> und reichen Sie fehlende
            Nachweise (z. B. Ausbildungsverträge, Studienbescheinigungen) nach.
            Diese Zeiten können Ihre Rente erhöhen.
          </p>
          <p>
            <strong>Tipp:</strong> Auch Zeiten der Arbeitslosigkeit oder
            Krankheit können rentensteigernd wirken – sofern sie korrekt
            gemeldet wurden.
          </p>
        </div>

        {/* Fehler 2 */}
        <div className="border-l-4 border-renten-accent pl-5">
          <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">
            2. Kindererziehungszeiten nicht eingetragen
          </h3>
          <p className="mb-2">
            <strong>Problem:</strong> Kindererziehungszeiten werden nicht
            automatisch erfasst – Sie müssen aktiv beantragt werden.
          </p>
          <p className="mb-2">
            <strong>Lösung:</strong> Für Kinder, die ab 1992 geboren wurden,
            werden bis zu 3 Jahre angerechnet. Für Kinder vor 1992 sind es 2,5
            Jahre. Reichen Sie die Geburtsurkunde ein und beantragen Sie die
            Anerkennung.
          </p>
          <p>
            <strong>Wichtig:</strong> Auch Väter können Kindererziehungszeiten
            geltend machen, wenn sie die Erziehung überwiegend übernommen haben.
          </p>
        </div>

        {/* Fehler 3 */}
        <div className="border-l-4 border-renten-accent pl-5">
          <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">
            3. Falsche oder unvollständige Arbeitgebermeldungen
          </h3>
          <p className="mb-2">
            <strong>Problem:</strong> Arbeitgeber melden Beschäftigungszeiten
            manchmal fehlerhaft oder gar nicht an die Rentenversicherung.
          </p>
          <p className="mb-2">
            <strong>Lösung:</strong> Vergleichen Sie Ihren{" "}
            <strong>Versicherungsverlauf</strong> mit Ihren Arbeitsverträgen und
            Gehaltsabrechnungen. Fehlen Zeiten, fordern Sie beim Arbeitgeber
            eine Korrekturmeldung an.
          </p>
          <p>
            <strong>Hinweis:</strong> Besonders bei Minijobs oder kurzen
            Beschäftigungen kommt es häufig zu Lücken.
          </p>
        </div>

        {/* Fehler 4 */}
        <div className="border-l-4 border-renten-accent pl-5">
          <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">
            4. Zeiten im Ausland nicht berücksichtigt
          </h3>
          <p className="mb-2">
            <strong>Problem:</strong> Beschäftigungszeiten im EU-Ausland oder in
            Ländern mit Sozialversicherungsabkommen werden oft nicht
            automatisch übernommen.
          </p>
          <p className="mb-2">
            <strong>Lösung:</strong> Reichen Sie Nachweise über
            Auslandsbeschäftigungen ein. Die Deutsche Rentenversicherung prüft,
            ob diese Zeiten angerechnet werden können.
          </p>
          <p>
            <strong>Tipp:</strong> Auch Zeiten in der Schweiz, Österreich oder
            anderen EU-Ländern können Ihre deutsche Rente erhöhen.
          </p>
        </div>

        {/* Fehler 5 */}
        <div className="border-l-4 border-renten-accent pl-5">
          <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">
            5. Selbstständige Tätigkeiten ohne Beiträge
          </h3>
          <p className="mb-2">
            <strong>Problem:</strong> Selbstständige sind oft nicht
            pflichtversichert und zahlen keine Beiträge in die gesetzliche
            Rentenversicherung ein.
          </p>
          <p className="mb-2">
            <strong>Lösung:</strong> Prüfen Sie, ob Sie freiwillige Beiträge
            nachzahlen können, um Ihre Rentenansprüche zu erhöhen. Besonders bei
            kurzen Phasen der Selbstständigkeit kann sich das lohnen.
          </p>
          <p>
            <strong>Hinweis:</strong> Einige Selbstständige (z. B. Handwerker,
            Lehrer) sind pflichtversichert – prüfen Sie Ihren Status.
          </p>
        </div>

        {/* Fehler 6 */}
        <div className="border-l-4 border-renten-accent pl-5">
          <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">
            6. Fehlende Zeiten bei Krankheit oder Reha
          </h3>
          <p className="mb-2">
            <strong>Problem:</strong> Zeiten, in denen Sie Krankengeld oder
            Übergangsgeld bezogen haben, werden manchmal nicht korrekt erfasst.
          </p>
          <p className="mb-2">
            <strong>Lösung:</strong> Prüfen Sie, ob diese Zeiten in Ihrem{" "}
            <strong>Versicherungsverlauf</strong> auftauchen. Reichen Sie ggf.
            Bescheinigungen der Krankenkasse oder des Reha-Trägers nach.
          </p>
        </div>

        {/* Fehler 7 */}
        <div className="border-l-4 border-renten-accent pl-5">
          <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">
            7. Falsche Rentenversicherungsnummer verwendet
          </h3>
          <p className="mb-2">
            <strong>Problem:</strong> Manche Versicherte haben mehrere
            Versicherungsnummern, weil Arbeitgeber falsche Nummern verwendet
            haben.
          </p>
          <p className="mb-2">
            <strong>Lösung:</strong> Lassen Sie Ihre Konten bei der Deutschen
            Rentenversicherung zusammenführen. So gehen keine Zeiten verloren.
          </p>
        </div>

        {/* Fehler 8 */}
        <div className="border-l-4 border-renten-accent pl-5">
          <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">
            8. Zu späte Kontenklärung
          </h3>
          <p className="mb-2">
            <strong>Problem:</strong> Viele Versicherte kümmern sich erst kurz
            vor Rentenbeginn um die Klärung ihres Versicherungskontos – dann ist
            es oft zu spät, fehlende Nachweise zu beschaffen.
          </p>
          <p className="mb-2">
            <strong>Lösung:</strong> Fordern Sie spätestens ab Mitte 40
            regelmäßig eine <strong>Rentenauskunft</strong> an und prüfen Sie
            Ihren <strong>Versicherungsverlauf</strong>. So bleibt genug Zeit
            für Korrekturen.
          </p>
        </div>

        {/* Fehler 9 */}
        <div className="border-l-4 border-renten-accent pl-5">
          <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">
            9. Falsche Angaben beim Rentenantrag
          </h3>
          <p className="mb-2">
            <strong>Problem:</strong> Beim <strong>Rentenantrag</strong> werden
            falsche oder unvollständige Angaben gemacht, was zu Verzögerungen
            oder Ablehnungen führt.
          </p>
          <p className="mb-2">
            <strong>Lösung:</strong> Bereiten Sie den Antrag sorgfältig vor.
            Nutzen Sie eine aktuelle <strong>Rentenauskunft</strong> und einen
            geprüften <strong>Versicherungsverlauf</strong> als Grundlage.
          </p>
        </div>

        {/* Fehler 10 */}
        <div className="border-l-4 border-renten-accent pl-5">
          <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">
            10. Keine Prüfung der Rentenauskunft
          </h3>
          <p className="mb-2">
            <strong>Problem:</strong> Viele Versicherte nehmen die{" "}
            <strong>Rentenauskunft</strong> zur Kenntnis, prüfen sie aber nicht
            auf Fehler.
          </p>
          <p className="mb-2">
            <strong>Lösung:</strong> Vergleichen Sie die Angaben in der
            Rentenauskunft mit Ihrem Versicherungsverlauf und Ihren eigenen
            Unterlagen. Melden Sie Unstimmigkeiten sofort der Deutschen
            Rentenversicherung.
          </p>
        </div>
      </section>

      {/* Checkliste */}
      <section className="bg-renten-blue text-white rounded-2xl shadow-soft px-6 py-8 md:px-10 md:py-10 space-y-4">
        <h2 className="font-heading text-2xl font-semibold mb-4">
          Checkliste: So prüfen Sie Ihre Rentenunterlagen richtig
        </h2>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-renten-accent flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              <strong>Rentenauskunft anfordern:</strong> Spätestens ab Mitte 40
              regelmäßig eine Rentenauskunft beantragen
            </span>
          </li>
          <li className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-renten-accent flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              <strong>Versicherungsverlauf prüfen:</strong> Alle
              Beschäftigungszeiten, Ausbildungszeiten und Lücken kontrollieren
            </span>
          </li>
          <li className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-renten-accent flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              <strong>Unterlagen sammeln:</strong> Arbeitsverträge,
              Gehaltsabrechnungen, Ausbildungsnachweise, Geburtsurkunden der
              Kinder
            </span>
          </li>
          <li className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-renten-accent flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              <strong>Fehler melden:</strong> Unstimmigkeiten sofort der
              Deutschen Rentenversicherung melden
            </span>
          </li>
          <li className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-renten-accent flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              <strong>Kontenklärung durchführen:</strong> Spätestens 5 Jahre vor
              Rentenbeginn alle Zeiten klären lassen
            </span>
          </li>
        </ul>
      </section>

      {/* CTA */}
      <section className="bg-white rounded-2xl shadow-soft border border-slate-100 px-6 py-8 md:px-10 md:py-10 text-center space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-renten-blue">
          Jetzt Rentenauskunft beantragen und Fehler vermeiden
        </h2>
        <p className="text-sm text-slate-700 max-w-2xl mx-auto">
          Nutzen Sie unseren Service, um Ihre <strong>Rentenauskunft</strong>{" "}
          und Ihren <strong>Versicherungsverlauf</strong> zu beantragen. So
          haben Sie eine solide Grundlage, um Fehler frühzeitig zu erkennen.
        </p>
        <div className="flex flex-wrap gap-4 justify-center pt-2">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-renten-blue px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-renten-blue/90"
          >
            Rentenauskunft beantragen
          </a>
          <a
            href="/ratgeber"
            className="inline-flex items-center justify-center rounded-xl bg-white border-2 border-renten-blue px-8 py-3 text-sm font-semibold text-renten-blue hover:bg-renten-blue hover:text-white transition-colors"
          >
            Zurück zum Ratgeber
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
              Rente – von der Planung bis zur Beantragung.
            </p>
          </a>
          <a
            href="/rente-beantragen"
            className="block bg-white rounded-lg border border-slate-200 p-5 hover:border-renten-blue transition-colors"
          >
            <h3 className="font-heading text-base font-semibold text-renten-blue mb-2">
              Rente beantragen
            </h3>
            <p className="text-sm text-slate-700">
              Wann und wie Sie Ihren Rentenantrag stellen – mit allen wichtigen
              Unterlagen und Fristen.
            </p>
          </a>
        </div>
      </section>
    </main>
  );
}
