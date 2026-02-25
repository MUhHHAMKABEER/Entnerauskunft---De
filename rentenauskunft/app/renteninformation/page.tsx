import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Rentenauskunft & Renteninformation – Versicherungsverlauf prüfen & Rente planen",
  description:
    "Rentenauskunft, Renteninformation und Versicherungsverlauf verstehen: So prüfen Sie Ihr Rentenkonto und bereiten die Beantragung der Rente optimal vor.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Rentenauskunft & Renteninformation – Versicherungsverlauf prüfen & Rente planen",
  description:
    "Erläuterung der Unterschiede zwischen Rentenauskunft, Renteninformation und Versicherungsverlauf und deren Bedeutung für die Rentenplanung.",
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
      name: "Rentenauskunft & Renteninformation",
      item: "https://rentnerauskunft.de/renteninformation",
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
        <span className="text-slate-900 font-semibold">
          Rentenauskunft &amp; Renteninformation
        </span>
      </nav>

      <header className="mb-4">
        <h1 className="font-heading text-[36px] leading-tight font-semibold text-renten-blue mb-2">
          Rentenauskunft, Renteninformation &amp; Versicherungsverlauf
        </h1>
        <p className="text-sm text-slate-700 max-w-3xl">
          Wer seine <strong>Altersrente</strong> planen oder{" "}
          <strong>Rente beantragen</strong> möchte, kommt an Begriffen wie{" "}
          <strong>Rentenauskunft</strong>,{" "}
          <strong>Renteninformation</strong> und{" "}
          <strong>Versicherungsverlauf</strong> nicht vorbei. Hier erfahren Sie,
          wofür diese Unterlagen wichtig sind und wie sie zusammenhängen.
        </p>
      </header>

      {/* Abschnitt 1 */}
      <section className="bg-white rounded-2xl border border-slate-100 shadow-soft px-6 py-6 md:px-8 md:py-8 space-y-4">
        <h2 className="font-heading text-xl font-semibold text-renten-blue">
          Was ist eine Rentenauskunft?
        </h2>
        <p className="text-sm text-slate-700">
          Die <strong>Rentenauskunft</strong> ist eine detaillierte Berechnung
          Ihrer späteren Rente. Sie zeigt, wie hoch Ihre{" "}
          <strong>Altersrente</strong> nach derzeitigem Stand voraussichtlich
          ausfallen wird, wenn keine weiteren Versicherungszeiten hinzukommen.
          Sie ist besonders hilfreich, wenn Sie konkret{" "}
          <strong>Rente beantragen</strong> möchten oder die
          Ruhestandsplanung beginnen.
        </p>
        <p className="text-sm text-slate-700">
          Viele Versicherte suchen gezielt nach{" "}
          <strong>„Rentenauskunft beantragen“</strong> oder{" "}
          <strong>„Rentenauskunft anfordern“</strong>, um vorab Klarheit über
          ihre Rentenhöhe zu erhalten.
        </p>
      </section>

      {/* Abschnitt 2 */}
      <section className="bg-white rounded-2xl border border-slate-100 shadow-soft px-6 py-6 md:px-8 md:py-8 space-y-4">
        <h2 className="font-heading text-xl font-semibold text-renten-blue">
          Was ist eine Renteninformation?
        </h2>
        <p className="text-sm text-slate-700">
          Die <strong>Renteninformation</strong> wird in der Regel einmal pro
          Jahr automatisch verschickt. Sie stellt eine Kurzversion dar und
          enthält:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>eine Hochrechnung auf die voraussichtliche Regelaltersrente,</li>
          <li>Angaben zu bisher erworbenen Entgeltpunkten,</li>
          <li>Hinweise zu möglichen Versorgungslücken.</li>
        </ul>
        <p className="text-sm text-slate-700">
          Während die <strong>Renteninformation</strong> einen ersten Überblick
          gibt, geht die <strong>Rentenauskunft</strong> deutlich ins Detail und
          ist für die konkrete <strong>Rentenbeantragung</strong> besser
          geeignet.
        </p>
      </section>

      {/* Abschnitt 3 */}
      <section className="bg-white rounded-2xl border border-slate-100 shadow-soft px-6 py-6 md:px-8 md:py-8 space-y-4">
        <h2 className="font-heading text-xl font-semibold text-renten-blue">
          Versicherungsverlauf &amp; Lückenauskunft
        </h2>
        <p className="text-sm text-slate-700">
          Der <strong>Versicherungsverlauf</strong> enthält alle bisher
          gemeldeten Zeiten – Beschäftigungen, Ausbildungszeiten,
          Kindererziehung, Arbeitslosigkeit und mehr. Er bildet die Grundlage
          für jede <strong>Rentenberechnung</strong>.
        </p>
        <p className="text-sm text-slate-700">
          Mit einer <strong>Lückenauskunft</strong> können Sie prüfen, ob
          bestimmte Zeiträume noch ungeklärt sind. Diese Lücken sollten
          geschlossen werden, bevor Sie <strong>Rente beantragen</strong>, damit
          keine Ansprüche verloren gehen.
        </p>
        <p className="text-sm text-slate-700">
          Über die{" "}
          <a href="/" className="text-renten-blue underline">
            Startseite
          </a>{" "}
          wählen Sie, ob Sie <strong>Versicherungsverlauf</strong>,{" "}
          <strong>Rentenauskunft</strong>,{" "}
          <strong>Renteninformation</strong> oder andere Unterlagen vorbereiten
          möchten.
        </p>
      </section>

      {/* Abschnitt 4: Warum das wichtig ist */}
      <section className="bg-white rounded-2xl border border-slate-100 shadow-soft px-6 py-6 md:px-8 md:py-8 space-y-4">
        <h2 className="font-heading text-xl font-semibold text-renten-blue">
          Warum Rentenauskunft und Renteninformation so wichtig sind
        </h2>
        <p className="text-sm text-slate-700">
          Wer seine <strong>Altersvorsorge</strong> realistisch planen möchte,
          kommt um die <strong>Rentenauskunft</strong> und die jährlich
          verschickte <strong>Renteninformation</strong> nicht herum. Nur mit
          diesen Zahlen lässt sich zuverlässig entscheiden, ob eine zusätzliche
          private oder betriebliche Altersvorsorge nötig ist.
        </p>
        <p className="text-sm text-slate-700">
          Gleichzeitig helfen diese Unterlagen, den richtigen Zeitpunkt zu
          finden, um die <strong>Rente zu beantragen</strong>, etwa im Rahmen
          der <strong>Regelaltersrente</strong> oder einer{" "}
          <strong>vorgezogenen Altersrente</strong>.
        </p>
      </section>
    </main>
  );
}
