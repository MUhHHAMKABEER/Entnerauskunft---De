import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ratgeber Rente – Altersrente, Rentenauskunft & Erwerbsminderungsrente",
  description:
    "Ratgeber zur gesetzlichen Rente: Altersrente beantragen, Rentenauskunft verstehen, Erwerbsminderungsrente, Reha-Antrag und weitere Themen rund um die Deutsche Rentenversicherung.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Ratgeber Rente",
  description:
    "Übersichtsseite mit Ratgeber-Artikeln zu Altersrente, Rentenauskunft und Erwerbsminderungsrente.",
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
      name: "Ratgeber Rente",
      item: "https://rentnerauskunft.de/ratgeber",
    },
  ],
};

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
        <span className="text-slate-900 font-semibold">Ratgeber Rente</span>
      </nav>

      <header className="mb-4">
        <h1 className="font-heading text-[36px] leading-tight font-semibold text-renten-blue mb-2">
          Ratgeber gesetzliche Rente
        </h1>
        <p className="text-sm text-slate-700 max-w-3xl">
          In unserem <strong>Ratgeber zur gesetzlichen Rente</strong> finden Sie
          kompakte Informationen zu Themen wie{" "}
          <strong>Altersrente beantragen</strong>,{" "}
          <strong>Rentenauskunft</strong>,{" "}
          <strong>Renteninformation</strong> und{" "}
          <strong>Erwerbsminderungsrente</strong>. Die Artikel greifen typische
          Suchanfragen auf und zeigen, wie Sie Ihren{" "}
          <strong>Rentenantrag</strong> optimal vorbereiten.
        </p>
      </header>

      {/* „Teaser“ der Unterseiten */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article className="bg-white rounded-2xl border border-slate-100 shadow-soft px-5 py-5 flex flex-col justify-between hover:border-renten-blue transition-colors">
          <div>
            <h2 className="font-heading text-lg font-semibold text-renten-blue mb-2">
              Rente beantragen
            </h2>
            <p className="text-sm text-slate-700 mb-3">
              Wann sollte der <strong>Rentenantrag</strong> gestellt werden?
              Welche Unterlagen sind wichtig und wo wird die{" "}
              <strong>Altersrente</strong> beantragt?
            </p>
          </div>
          <a
            href="/rente-beantragen"
            className="text-sm text-renten-blue underline font-semibold"
          >
            Zum Ratgeber →
          </a>
        </article>

        <article className="bg-white rounded-2xl border border-slate-100 shadow-soft px-5 py-5 flex flex-col justify-between hover:border-renten-blue transition-colors">
          <div>
            <h2 className="font-heading text-lg font-semibold text-renten-blue mb-2">
              Rentenauskunft &amp; Renteninformation
            </h2>
            <p className="text-sm text-slate-700 mb-3">
              Unterschied zwischen <strong>Rentenauskunft</strong>,{" "}
              <strong>Renteninformation</strong> und{" "}
              <strong>Versicherungsverlauf</strong> und warum diese Unterlagen
              so wichtig sind.
            </p>
          </div>
          <a
            href="/renteninformation"
            className="text-sm text-renten-blue underline font-semibold"
          >
            Zum Ratgeber →
          </a>
        </article>

        <article className="bg-white rounded-2xl border border-slate-100 shadow-soft px-5 py-5 flex flex-col justify-between hover:border-renten-blue transition-colors">
          <div>
            <h2 className="font-heading text-lg font-semibold text-renten-blue mb-2">
              Erwerbsminderungsrente
            </h2>
            <p className="text-sm text-slate-700 mb-3">
              Voraussetzungen, <strong>Antrag auf Erwerbsminderungsrente</strong>{" "}
              und die Rolle von <strong>Reha vor Rente</strong>.
            </p>
          </div>
          <a
            href="/erwerbsminderungsrente"
            className="text-sm text-renten-blue underline font-semibold"
          >
            Zum Ratgeber →
          </a>
        </article>

        <article className="bg-white rounded-2xl border border-slate-100 shadow-soft px-5 py-5 flex flex-col justify-between hover:border-renten-blue transition-colors">
          <div>
            <h2 className="font-heading text-lg font-semibold text-renten-blue mb-2">
              Häufige Fehler bei Rentenunterlagen
            </h2>
            <p className="text-sm text-slate-700 mb-3">
              Die 10 häufigsten Fehler bei <strong>Rentenauskunft</strong> und{" "}
              <strong>Versicherungsverlauf</strong> – und wie Sie sie vermeiden.
            </p>
          </div>
          <a
            href="/ratgeber/haeufige-fehler"
            className="text-sm text-renten-blue underline font-semibold"
          >
            Zum Ratgeber →
          </a>
        </article>

        <article className="bg-white rounded-2xl border border-slate-100 shadow-soft px-5 py-5 flex flex-col justify-between hover:border-renten-blue transition-colors">
          <div>
            <h2 className="font-heading text-lg font-semibold text-renten-blue mb-2">
              Checkliste für den Ruhestand
            </h2>
            <p className="text-sm text-slate-700 mb-3">
              Alle wichtigen Schritte für einen entspannten Übergang in die
              Rente – von der Planung bis zur Beantragung.
            </p>
          </div>
          <a
            href="/ratgeber/checkliste-ruhestand"
            className="text-sm text-renten-blue underline font-semibold"
          >
            Zum Ratgeber →
          </a>
        </article>

        <article className="bg-white rounded-2xl border border-slate-100 shadow-soft px-5 py-5 flex flex-col justify-between hover:border-renten-blue transition-colors">
          <div>
            <h2 className="font-heading text-lg font-semibold text-renten-blue mb-2">
              Rentenrechner
            </h2>
            <p className="text-sm text-slate-700 mb-3">
              Berechnen Sie Ihre voraussichtliche gesetzliche Rente auf Basis
              von Entgeltpunkten, Zugangsfaktor und Rentenwert.
            </p>
          </div>
          <a
            href="/rentenrechner"
            className="text-sm text-renten-blue underline font-semibold"
          >
            Zum Rechner →
          </a>
        </article>

        <article className="bg-white rounded-2xl border border-slate-100 shadow-soft px-5 py-5 flex flex-col justify-between hover:border-renten-blue transition-colors">
          <div>
            <h2 className="font-heading text-lg font-semibold text-renten-blue mb-2">
              Rentenlücke berechnen
            </h2>
            <p className="text-sm text-slate-700 mb-3">
              So ermitteln Sie Ihre Versorgungslücke und schließen sie mit
              privater Altersvorsorge.
            </p>
          </div>
          <a
            href="/ratgeber/rentenluecke-berechnen"
            className="text-sm text-renten-blue underline font-semibold"
          >
            Zum Ratgeber →
          </a>
        </article>
      </section>

      {/* Zusätzlicher SEO-Text */}
      <section className="bg-white rounded-2xl border border-slate-100 shadow-soft px-6 py-6 md:px-8 md:py-8 space-y-4 text-sm text-slate-700">
        <h2 className="font-heading text-xl font-semibold text-renten-blue">
          Warum ein Ratgeber zur gesetzlichen Rente sinnvoll ist
        </h2>
        <p>
          Begriffe wie <strong>„Rente beantragen“</strong>,{" "}
          <strong>„Rentenauskunft“</strong>,{" "}
          <strong>„Renteninformation“</strong> oder{" "}
          <strong>„Erwerbsminderungsrente beantragen“</strong> tauchen häufig
          auf, wenn sich Versicherte mit ihrer Altersvorsorge beschäftigen.
          Unser Ratgeber bündelt diese Themen und sorgt für Orientierung.
        </p>
        <p>
          Über die <strong>Startseite</strong> können Sie Ihre persönlichen
          Daten und Versicherungsnummer erfassen, während die Ratgeberseiten
          Hintergrundwissen liefern – von der{" "}
          <strong>Regelaltersrente</strong> über{" "}
          <strong>vorgezogene Altersrente</strong> bis hin zu{" "}
          <strong>Reha-Anträgen</strong> und{" "}
          <strong>Erwerbsminderungsrente</strong>.
        </p>
      </section>
    </main>
  );
}
