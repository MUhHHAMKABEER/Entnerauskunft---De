import { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    "Erwerbsminderungsrente beantragen | Antrag & Voraussetzungen",
  description:
    "Erwerbsminderungsrente beantragen: Voraussetzungen prüfen, Antrag stellen und Reha vor Rente. Volle & teilweise EM-Rente verständlich erklärt.",
  keywords: 'erwerbsminderungsrente, erwerbsminderungsrente beantragen, antrag erwerbsminderungsrente, em-rente, volle erwerbsminderungsrente, teilweise erwerbsminderungsrente, reha vor rente',
  alternates: { canonical: 'https://rentnerauskunft.de/erwerbsminderungsrente' },
  openGraph: {
    title: "Erwerbsminderungsrente beantragen | Antrag & Voraussetzungen",
    description:
      "Erwerbsminderungsrente beantragen: Voraussetzungen prüfen, Antrag stellen und Reha vor Rente. Volle & teilweise EM-Rente verständlich erklärt.",
    type: 'website',
    url: 'https://rentnerauskunft.de/erwerbsminderungsrente'
  }
};

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Wann habe ich Anspruch auf Erwerbsminderungsrente?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein Anspruch besteht, wenn aus gesundheitlichen Gründen die Erwerbsfähigkeit dauerhaft oder längerfristig erheblich eingeschränkt ist und die versicherungsrechtlichen Voraussetzungen erfüllt sind.",
      },
    },
    {
      "@type": "Question",
      name: "Wie beantrage ich die Erwerbsminderungsrente?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Die Erwerbsminderungsrente wird bei der Deutschen Rentenversicherung beantragt. Häufig ist vorher ein Reha-Antrag zu stellen, da das Prinzip 'Reha vor Rente' gilt.",
      },
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
      name: "Erwerbsminderungsrente beantragen",
      item: "https://rentnerauskunft.de/erwerbsminderungsrente",
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
        <a href="/ratgeber" className="text-renten-blue hover:underline">
          Ratgeber
        </a>
        <span>/</span>
        <span className="text-slate-900 font-semibold">
          Erwerbsminderungsrente beantragen
        </span>
      </nav>

      <header className="mb-4">
        <h1 className="font-heading text-[36px] leading-tight font-semibold text-renten-blue mb-2">
          Erwerbsminderungsrente beantragen – Voraussetzungen &amp; Antrag
        </h1>
        <p className="text-sm text-slate-700 max-w-3xl">
          Wenn die Gesundheit nicht mehr mitspielt, stellt sich die Frage nach
          der <strong>Erwerbsminderungsrente</strong>. Hier erfahren Sie, wann
          ein Anspruch bestehen kann, wie Sie den{" "}
          <strong>Antrag auf Erwerbsminderungsrente</strong> stellen und welche
          Rolle der <strong>Reha-Antrag</strong> spielt.
        </p>
      </header>

      {/* Abschnitt 1 */}
      <section className="bg-white rounded-2xl border border-slate-100 shadow-soft px-6 py-6 md:px-8 md:py-8 space-y-4">
        <h2 className="font-heading text-xl font-semibold text-renten-blue">
          Voraussetzungen für die Erwerbsminderungsrente
        </h2>
        <p className="text-sm text-slate-700">
          Ein Anspruch auf <strong>Erwerbsminderungsrente</strong> besteht
          grundsätzlich dann, wenn:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>
            die Erwerbsfähigkeit aus gesundheitlichen Gründen dauerhaft oder
            längerfristig deutlich eingeschränkt ist,
          </li>
          <li>
            bestimmte <strong>versicherungsrechtliche Voraussetzungen</strong>{" "}
            erfüllt sind (z. B. Mindestversicherungszeiten),
          </li>
          <li>
            und die Einschränkung durch <strong>Ärzte und Gutachten</strong>{" "}
            bestätigt wurde.
          </li>
        </ul>
      </section>

      {/* Abschnitt 2: Reha vor Rente */}
      <section className="bg-white rounded-2xl border border-slate-100 shadow-soft px-6 py-6 md:px-8 md:py-8 space-y-4">
        <h2 className="font-heading text-xl font-semibold text-renten-blue">
          Reha vor Rente – warum der Reha-Antrag so wichtig ist
        </h2>
        <p className="text-sm text-slate-700">
          Häufig gilt das Prinzip <strong>„Reha vor Rente“</strong>. Das heißt:
          Bevor die Deutsche Rentenversicherung eine{" "}
          <strong>Erwerbsminderungsrente</strong> bewilligt, wird geprüft, ob
          durch eine <strong>medizinische oder berufliche Reha</strong> eine
          Rückkehr ins Arbeitsleben möglich ist.
        </p>
        <p className="text-sm text-slate-700">
          Viele Versicherte suchen nach{" "}
          <strong>„Reha Antrag Rentenversicherung“</strong> oder{" "}
          <strong>„Antrag Reha Deutsche Rentenversicherung“</strong>, weil dieser
          Schritt häufig vorgeschaltet ist, bevor ein{" "}
          <strong>Antrag auf Erwerbsminderungsrente</strong> bewilligt wird.
        </p>
      </section>

      {/* Abschnitt 3: Antrag stellen */}
      <section className="bg-white rounded-2xl border border-slate-100 shadow-soft px-6 py-6 md:px-8 md:py-8 space-y-4">
        <h2 className="font-heading text-xl font-semibold text-renten-blue">
          Wie beantrage ich die Erwerbsminderungsrente?
        </h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700">
          <li>
            <strong>Ärztliche Unterlagen sammeln:</strong> Befunde, Berichte und
            Gutachten, die die Einschränkung der Erwerbsfähigkeit belegen.
          </li>
          <li>
            <strong>Versicherungsverlauf prüfen:</strong> Sind alle relevanten
            Zeiten im Rentenkonto erfasst?
          </li>
          <li>
            <strong>Formulare ausfüllen:</strong> Den{" "}
            <strong>Antrag auf Erwerbsminderungsrente</strong> bei der
            Deutschen Rentenversicherung ausfüllen – online, in Papierform oder
            mit Unterstützung einer Beratungsstelle.
          </li>
          <li>
            <strong>Antrag einreichen:</strong> Zusammen mit allen Nachweisen
            bei der Deutschen Rentenversicherung einreichen.
          </li>
          <li>
            <strong>Rückfragen beantworten:</strong> Auf Nachfrage der
            Rentenversicherung reagieren und ggf. weitere Unterlagen nachreichen.
          </li>
        </ol>
        <p className="text-sm text-slate-700">
          Über die{" "}
          <a href="/" className="text-renten-blue underline">
            Startseite
          </a>{" "}
          können Sie Ihre persönlichen Daten und Versicherungsnummer erfassen,
          um später sowohl <strong>Erwerbsminderungsrente</strong> als auch{" "}
          <strong>Altersrente</strong> sauber vorbereiten zu können.
        </p>
      </section>

      {/* Weitere Themen */}
      <section className="bg-white rounded-2xl border border-slate-100 shadow-soft px-6 py-6 md:px-8 md:py-8">
        <h2 className="font-heading text-xl font-semibold text-renten-blue mb-6">
          Weitere wichtige Themen
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/rente-beantragen" className="block p-4 border border-slate-200 rounded-lg hover:border-renten-blue hover:shadow-md transition-all">
            <h3 className="font-semibold text-renten-blue mb-2">Altersrente beantragen</h3>
            <p className="text-sm text-slate-700">Rentenantrag für Altersrente stellen - Anleitung und Unterlagen.</p>
          </Link>
          
          <Link href="/rentenauskunft-online-beantragen" className="block p-4 border border-slate-200 rounded-lg hover:border-renten-blue hover:shadow-md transition-all">
            <h3 className="font-semibold text-renten-blue mb-2">Rentenauskunft anfordern</h3>
            <p className="text-sm text-slate-700">Detaillierte Rentenberechnung bei der DRV anfordern.</p>
          </Link>
          
          <Link href="/versicherungsverlauf-anfordern" className="block p-4 border border-slate-200 rounded-lg hover:border-renten-blue hover:shadow-md transition-all">
            <h3 className="font-semibold text-renten-blue mb-2">Versicherungsverlauf prüfen</h3>
            <p className="text-sm text-slate-700">Alle Versicherungszeiten kontrollieren.</p>
          </Link>
          
          <Link href="/kontenklarung-rentenversicherung" className="block p-4 border border-slate-200 rounded-lg hover:border-renten-blue hover:shadow-md transition-all">
            <h3 className="font-semibold text-renten-blue mb-2">Kontenklärung</h3>
            <p className="text-sm text-slate-700">Rentenkonto klären und Lücken schließen.</p>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-renten-blue to-[#0a4178] text-white rounded-2xl p-8 md:p-12 text-center">
        <h2 className="font-heading text-3xl font-bold mb-4">
          Bereiten Sie Ihren Rentenantrag vor
        </h2>
        <p className="text-xl text-slate-100 mb-8 max-w-2xl mx-auto">
          Fordern Sie jetzt Ihre Rentenunterlagen an - für Erwerbsminderungsrente oder Altersrente.
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
