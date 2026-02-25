import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | Rentenauskunft Service",
  description: "Impressum und Anbieterkennzeichnung gemäß § 5 TMG für Rentenauskunft Service.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft px-6 py-8 md:px-10 md:py-10 space-y-6">
        <h1 className="font-heading text-3xl font-semibold text-renten-blue mb-6">
          Impressum
        </h1>

        <section className="space-y-4 text-sm text-slate-700">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            Angaben gemäß § 5 TMG
          </h2>
          
          <div>
            <p className="font-semibold text-slate-900">Betreiber:</p>
            <p>REGIS DATASEC LTD</p>
            <p>71-75 Shelton Street, Covent Garden</p>
            <p>WC2H 9JQ London</p>
            <p>United Kingdom</p>
          </div>

          <div>
            <p className="font-semibold text-slate-900">Kontakt:</p>
            <p>E-Mail: info@rentnerauskunft.de</p>
          </div>

          <div>
            <p className="font-semibold text-slate-900">Registereintrag:</p>
            <p>Eingetragen im Handelsregister</p>
            <p>Registergericht: Companies House, London</p>
          </div>
        </section>

        <section className="space-y-4 text-sm text-slate-700 pt-6 border-t border-slate-200">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            Haftungsausschluss
          </h2>

          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Haftung für Inhalte</h3>
            <p>
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p className="mt-2">
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Haftung für Links</h3>
            <p>
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
            </p>
            <p className="mt-2">
              Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Urheberrecht</h3>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem britischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
            </p>
            <p className="mt-2">
              Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </p>
          </div>
        </section>

        <section className="space-y-4 text-sm text-slate-700 pt-6 border-t border-slate-200">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            Hinweis zur Deutschen Rentenversicherung
          </h2>
          <p>
            Dieser Service wird von REGIS DATASEC LTD betrieben und steht in keinem Vertragsverhältnis zur Deutschen Rentenversicherung. Wir sind ein unabhängiger Dienstleister, der Versicherte bei der Vorbereitung und Erfassung von Unterlagen für Rentenanträge unterstützt. Die finale Bearbeitung und Entscheidung über Rentenanträge erfolgt ausschließlich durch die Deutsche Rentenversicherung.
          </p>
        </section>

        <section className="space-y-4 text-sm text-slate-700 pt-6 border-t border-slate-200">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            Online-Streitbeilegung
          </h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
          </p>
          <p>
            <a 
              href="https://ec.europa.eu/consumers/odr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-renten-blue underline hover:text-renten-blue/80"
            >
              https://ec.europa.eu/consumers/odr
            </a>
          </p>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <div className="pt-6 border-t border-slate-200">
          <a
            href="/"
            className="inline-flex items-center text-sm font-semibold text-renten-blue hover:text-renten-blue/80"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Zurück zur Startseite
          </a>
        </div>
      </div>
    </main>
  );
}
