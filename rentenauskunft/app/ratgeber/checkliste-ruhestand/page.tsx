import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Checkliste Ruhestand – Rente beantragen & Altersrente optimal vorbereiten",
  description:
    "Checkliste für den Ruhestand: Alle wichtigen Schritte von der Rentenauskunft bis zum Rentenantrag. So bereiten Sie Ihre Altersrente optimal vor.",
  openGraph: {
    title: "Checkliste für den Ruhestand – Rente optimal vorbereiten",
    description:
      "Alle wichtigen Schritte für einen entspannten Übergang in die Rente – von der Planung bis zur Beantragung.",
    url: "https://rentnerauskunft.de/ratgeber/checkliste-ruhestand",
    siteName: "Rentenauskunft Service",
    locale: "de_DE",
    type: "article",
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Checkliste für den Ruhestand – So bereiten Sie Ihre Rente vor",
  description:
    "Schritt-für-Schritt-Anleitung zur Vorbereitung des Ruhestands und zur Beantragung der Altersrente.",
  step: [
    {
      "@type": "HowToStep",
      name: "Rentenauskunft anfordern (5 Jahre vorher)",
      text: "Fordern Sie spätestens 5 Jahre vor dem geplanten Rentenbeginn eine ausführliche Rentenauskunft an.",
    },
    {
      "@type": "HowToStep",
      name: "Versicherungsverlauf prüfen",
      text: "Prüfen Sie Ihren Versicherungsverlauf auf Lücken und fehlende Zeiten.",
    },
    {
      "@type": "HowToStep",
      name: "Kontenklärung durchführen",
      text: "Lassen Sie Ihr Rentenkonto klären und reichen Sie fehlende Nachweise nach.",
    },
    {
      "@type": "HowToStep",
      name: "Rentenantrag stellen (3 Monate vorher)",
      text: "Stellen Sie den Rentenantrag etwa 3 Monate vor dem gewünschten Rentenbeginn.",
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
      name: "Checkliste Ruhestand",
      item: "https://rentnerauskunft.de/ratgeber/checkliste-ruhestand",
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
        <span className="text-slate-900 font-semibold">
          Checkliste Ruhestand
        </span>
      </nav>

      {/* Header */}
      <header className="mb-6">
        <h1 className="font-heading text-[36px] leading-tight font-semibold text-renten-blue mb-3">
          Checkliste für den Ruhestand – So bereiten Sie Ihre Rente optimal vor
        </h1>
        <p className="text-sm text-slate-700 max-w-3xl">
          Der Übergang in den <strong>Ruhestand</strong> will gut vorbereitet
          sein. Mit dieser Checkliste behalten Sie den Überblick über alle
          wichtigen Schritte – von der <strong>Rentenauskunft</strong> bis zum{" "}
          <strong>Rentenantrag</strong>.
        </p>
      </header>

      {/* Intro */}
      <section className="bg-white rounded-2xl shadow-soft border border-slate-100 px-6 py-8 md:px-10 md:py-10 space-y-4 text-sm text-slate-700">
        <h2 className="font-heading text-2xl font-semibold text-renten-blue">
          Warum eine gute Vorbereitung so wichtig ist
        </h2>
        <p>
          Der <strong>Ruhestand</strong> ist ein einschneidender Lebensabschnitt
          – finanziell, organisatorisch und emotional. Wer sich frühzeitig
          kümmert, vermeidet böse Überraschungen und kann den Übergang
          entspannt gestalten.
        </p>
        <p>
          Viele Versicherte unterschätzen, wie viel Zeit die Vorbereitung in
          Anspruch nimmt. Fehlende Unterlagen, Lücken im{" "}
          <strong>Versicherungsverlauf</strong> oder unklare Rentenansprüche
          können zu Verzögerungen führen – im schlimmsten Fall sogar zu
          finanziellen Einbußen.
        </p>
        <p>
          Mit unserer Checkliste behalten Sie den Überblick und gehen Schritt
          für Schritt vor.
        </p>
      </section>

      {/* Timeline */}
      <section className="bg-white rounded-2xl shadow-soft border border-slate-100 px-6 py-8 md:px-10 md:py-10 space-y-10 text-sm text-slate-700">
        <h2 className="font-heading text-2xl font-semibold text-renten-blue">
          Zeitplan: Wann Sie was erledigen sollten
        </h2>

        {/* 5 Jahre vorher */}
        <div className="relative pl-8 border-l-4 border-renten-accent">
          <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-renten-accent flex items-center justify-center text-white text-xs font-bold">
            5
          </div>
          <h3 className="font-heading text-lg font-semibold text-slate-900 mb-3">
            5 Jahre vor Rentenbeginn
          </h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong>Rentenauskunft anfordern:</strong> Fordern Sie eine
              ausführliche <strong>Rentenauskunft</strong> an, um einen
              Überblick über Ihre bisherigen Rentenansprüche zu erhalten.
            </li>
            <li>
              <strong>Versicherungsverlauf prüfen:</strong> Kontrollieren Sie
              Ihren <strong>Versicherungsverlauf</strong> auf Lücken, fehlende
              Zeiten oder Fehler.
            </li>
            <li>
              <strong>Unterlagen sammeln:</strong> Sammeln Sie alle relevanten
              Unterlagen (Arbeitsverträge, Gehaltsabrechnungen,
              Ausbildungsnachweise, Geburtsurkunden der Kinder).
            </li>
            <li>
              <strong>Kontenklärung beantragen:</strong> Lassen Sie Ihr
              Rentenkonto bei der Deutschen Rentenversicherung klären. So werden
              alle Zeiten korrekt erfasst.
            </li>
            <li>
              <strong>Rentenlücke berechnen:</strong> Nutzen Sie einen{" "}
              <a href="/rentenrechner" className="text-renten-blue underline">
                Rentenrechner
              </a>
              , um Ihre voraussichtliche Rente zu berechnen und eine mögliche
              Rentenlücke zu identifizieren.
            </li>
          </ul>
        </div>

        {/* 3 Jahre vorher */}
        <div className="relative pl-8 border-l-4 border-renten-accent">
          <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-renten-accent flex items-center justify-center text-white text-xs font-bold">
            3
          </div>
          <h3 className="font-heading text-lg font-semibold text-slate-900 mb-3">
            3 Jahre vor Rentenbeginn
          </h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong>Beratungstermin vereinbaren:</strong> Vereinbaren Sie
              einen Termin bei einer Auskunfts- und Beratungsstelle der
              Deutschen Rentenversicherung.
            </li>
            <li>
              <strong>Rentenart klären:</strong> Klären Sie, welche Rentenart
              für Sie in Frage kommt (Regelaltersrente, vorgezogene Altersrente,
              Rente für besonders langjährig Versicherte).
            </li>
            <li>
              <strong>Abschläge berechnen:</strong> Wenn Sie früher in Rente
              gehen möchten, lassen Sie sich die Abschläge berechnen.
            </li>
            <li>
              <strong>Altersvorsorge prüfen:</strong> Prüfen Sie Ihre
              betriebliche und private Altersvorsorge. Wann können Sie darauf
              zugreifen?
            </li>
          </ul>
        </div>

        {/* 1 Jahr vorher */}
        <div className="relative pl-8 border-l-4 border-renten-accent">
          <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-renten-accent flex items-center justify-center text-white text-xs font-bold">
            1
          </div>
          <h3 className="font-heading text-lg font-semibold text-slate-900 mb-3">
            1 Jahr vor Rentenbeginn
          </h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong>Arbeitgeber informieren:</strong> Informieren Sie Ihren
              Arbeitgeber über Ihren geplanten Rentenbeginn und klären Sie
              Kündigungsfristen.
            </li>
            <li>
              <strong>Krankenversicherung klären:</strong> Klären Sie, wie Sie
              als Rentner krankenversichert sind (gesetzlich oder privat).
            </li>
            <li>
              <strong>Steuern prüfen:</strong> Lassen Sie sich beraten, ob Ihre
              Rente steuerpflichtig ist und wie hoch die Steuerlast ausfällt.
            </li>
            <li>
              <strong>Wohnsituation prüfen:</strong> Ist Ihre Wohnung oder Ihr
              Haus altersgerecht? Planen Sie ggf. einen Umzug oder Umbau.
            </li>
          </ul>
        </div>

        {/* 3 Monate vorher */}
        <div className="relative pl-8 border-l-4 border-renten-accent">
          <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-renten-blue flex items-center justify-center text-white text-xs font-bold">
            3M
          </div>
          <h3 className="font-heading text-lg font-semibold text-slate-900 mb-3">
            3 Monate vor Rentenbeginn
          </h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong>Rentenantrag stellen:</strong> Stellen Sie Ihren{" "}
              <strong>Rentenantrag</strong> bei der Deutschen
              Rentenversicherung. Das geht online, per Post oder vor Ort.
            </li>
            <li>
              <strong>Alle Unterlagen einreichen:</strong> Reichen Sie alle
              erforderlichen Unterlagen ein (Rentenauskunft,
              Versicherungsverlauf, Ausweisdokumente, Bankverbindung).
            </li>
            <li>
              <strong>Rentenbescheid prüfen:</strong> Prüfen Sie den
              Rentenbescheid sorgfältig. Stimmen alle Angaben?
            </li>
          </ul>
        </div>

        {/* Nach Rentenbeginn */}
        <div className="relative pl-8 border-l-4 border-renten-accent">
          <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-renten-blue flex items-center justify-center text-white text-xs font-bold">
            ✓
          </div>
          <h3 className="font-heading text-lg font-semibold text-slate-900 mb-3">
            Nach Rentenbeginn
          </h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong>Erste Rentenzahlung prüfen:</strong> Kontrollieren Sie,
              ob die erste Rentenzahlung korrekt auf Ihrem Konto eingegangen
              ist.
            </li>
            <li>
              <strong>Krankenversicherung bestätigen:</strong> Bestätigen Sie
              Ihrer Krankenkasse den Rentenbeginn.
            </li>
            <li>
              <strong>Steuererklärung:</strong> Prüfen Sie, ob Sie eine
              Steuererklärung abgeben müssen.
            </li>
            <li>
              <strong>Hinzuverdienst melden:</strong> Wenn Sie neben der Rente
              arbeiten möchten, informieren Sie die Rentenversicherung über
              Ihren Hinzuverdienst.
            </li>
          </ul>
        </div>
      </section>

      {/* Unterlagen-Checkliste */}
      <section className="bg-renten-blue text-white rounded-2xl shadow-soft px-6 py-8 md:px-10 md:py-10 space-y-4">
        <h2 className="font-heading text-2xl font-semibold mb-4">
          Checkliste: Diese Unterlagen brauchen Sie für den Rentenantrag
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-3">
            <h3 className="font-heading text-base font-semibold text-renten-accent">
              Pflichtunterlagen
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
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
                <span>Personalausweis oder Reisepass</span>
              </li>
              <li className="flex items-start gap-2">
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
                <span>Rentenversicherungsnummer</span>
              </li>
              <li className="flex items-start gap-2">
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
                <span>Rentenauskunft oder Renteninformation</span>
              </li>
              <li className="flex items-start gap-2">
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
                <span>Versicherungsverlauf</span>
              </li>
              <li className="flex items-start gap-2">
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
                <span>Bankverbindung (IBAN)</span>
              </li>
              <li className="flex items-start gap-2">
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
                <span>Steuer-Identifikationsnummer</span>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-heading text-base font-semibold text-renten-accent">
              Zusätzliche Unterlagen (falls zutreffend)
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
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
                <span>Geburtsurkunden der Kinder</span>
              </li>
              <li className="flex items-start gap-2">
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
                <span>Ausbildungsnachweise</span>
              </li>
              <li className="flex items-start gap-2">
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
                <span>Nachweise über Auslandszeiten</span>
              </li>
              <li className="flex items-start gap-2">
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
                <span>Schwerbehindertenausweis</span>
              </li>
              <li className="flex items-start gap-2">
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
                <span>Heiratsurkunde (bei Namensänderung)</span>
              </li>
              <li className="flex items-start gap-2">
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
                <span>Nachweise über Krankheits-/Reha-Zeiten</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tipps */}
      <section className="bg-white rounded-2xl shadow-soft border border-slate-100 px-6 py-8 md:px-10 md:py-10 space-y-6 text-sm text-slate-700">
        <h2 className="font-heading text-2xl font-semibold text-renten-blue">
          Wichtige Tipps für einen entspannten Ruhestand
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
            <h3 className="font-heading text-base font-semibold text-renten-blue mb-2">
              Finanzen im Blick behalten
            </h3>
            <p>
              Erstellen Sie eine Übersicht über alle Einnahmen (Rente,
              betriebliche Altersvorsorge, private Rente) und Ausgaben. So
              wissen Sie genau, wie viel Geld Ihnen monatlich zur Verfügung
              steht.
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
            <h3 className="font-heading text-base font-semibold text-renten-blue mb-2">
              Gesundheit vorsorgen
            </h3>
            <p>
              Nutzen Sie die Vorsorgeuntersuchungen Ihrer Krankenkasse. Wer
              gesund in den Ruhestand startet, kann ihn besser genießen.
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
            <h3 className="font-heading text-base font-semibold text-renten-blue mb-2">
              Vollmachten regeln
            </h3>
            <p>
              Erstellen Sie Vorsorgevollmachten und Patientenverfügungen. So
              sind Sie für den Ernstfall vorbereitet.
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
            <h3 className="font-heading text-base font-semibold text-renten-blue mb-2">
              Neue Ziele setzen
            </h3>
            <p>
              Der Ruhestand ist kein Endpunkt, sondern ein neuer Lebensabschnitt.
              Überlegen Sie sich, was Sie in dieser Zeit erleben und erreichen
              möchten.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white rounded-2xl shadow-soft border border-slate-100 px-6 py-8 md:px-10 md:py-10 text-center space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-renten-blue">
          Jetzt mit der Vorbereitung starten
        </h2>
        <p className="text-sm text-slate-700 max-w-2xl mx-auto">
          Nutzen Sie unseren Service, um Ihre <strong>Rentenauskunft</strong>{" "}
          und Ihren <strong>Versicherungsverlauf</strong> zu beantragen. So
          legen Sie den Grundstein für einen entspannten Ruhestand.
        </p>
        <div className="flex flex-wrap gap-4 justify-center pt-2">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-renten-blue px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-renten-blue/90"
          >
            Rentenauskunft beantragen
          </a>
          <a
            href="/rentenrechner"
            className="inline-flex items-center justify-center rounded-xl bg-white border-2 border-renten-blue px-8 py-3 text-sm font-semibold text-renten-blue hover:bg-renten-blue hover:text-white transition-colors"
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
            href="/ratgeber/haeufige-fehler"
            className="block bg-white rounded-lg border border-slate-200 p-5 hover:border-renten-blue transition-colors"
          >
            <h3 className="font-heading text-base font-semibold text-renten-blue mb-2">
              Häufige Fehler bei Rentenunterlagen
            </h3>
            <p className="text-sm text-slate-700">
              Die 10 häufigsten Fehler bei Rentenunterlagen und wie Sie diese
              vermeiden können.
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
