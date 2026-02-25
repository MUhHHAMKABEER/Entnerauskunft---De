import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen (AGB) | Rentenauskunft Service",
  description: "Allgemeine Geschäftsbedingungen für die Nutzung von Rentenauskunft Service.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft px-6 py-8 md:px-10 md:py-10 space-y-6">
        <h1 className="font-heading text-3xl font-semibold text-renten-blue mb-6">
          Allgemeine Geschäftsbedingungen
        </h1>

        <section className="space-y-4 text-sm text-slate-700">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            1. Geltungsbereich
          </h2>
          <p>
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen REGIS DATASEC LTD (nachfolgend "Anbieter") und den Nutzern (nachfolgend "Kunde") über die Nutzung der Website rentnerauskunft.de und die damit verbundenen Dienstleistungen.
          </p>
          <p className="mt-2">
            Der Anbieter erbringt Dienstleistungen zur Unterstützung bei der Vorbereitung und Erfassung von Unterlagen für Rentenanträge bei der Deutschen Rentenversicherung. Der Anbieter steht in keinem Vertragsverhältnis zur Deutschen Rentenversicherung und ist ein unabhängiger Dienstleister.
          </p>
        </section>

        <section className="space-y-4 text-sm text-slate-700 pt-6 border-t border-slate-200">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            2. Vertragsgegenstand
          </h2>
          <p>
            Der Anbieter stellt eine Online-Plattform zur Verfügung, über die Kunden ihre persönlichen Daten und Renteninformationen strukturiert erfassen können. Der Service umfasst:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Digitale Erfassung von Versicherungsdaten</li>
            <li>Strukturierte Aufbereitung von Rentenunterlagen</li>
            <li>Informationen zum Rentenantragsprozess</li>
            <li>Ratgeber und Hilfestellungen rund um das Thema Rente</li>
          </ul>
          <p className="mt-2">
            Der Anbieter übernimmt keine Rechtsberatung und stellt keine Rentenanträge bei der Deutschen Rentenversicherung. Die finale Bearbeitung und Entscheidung über Rentenanträge erfolgt ausschließlich durch die Deutsche Rentenversicherung.
          </p>
        </section>

        <section className="space-y-4 text-sm text-slate-700 pt-6 border-t border-slate-200">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            3. Vertragsschluss
          </h2>
          <p>
            Der Vertrag kommt durch die Nutzung der kostenpflichtigen Dienste auf der Website zustande. Mit der Bestellung gibt der Kunde ein verbindliches Angebot zum Abschluss eines Vertrages ab. Der Anbieter nimmt das Angebot durch Zusendung einer Auftragsbestätigung per E-Mail oder durch Erbringung der Dienstleistung an.
          </p>
        </section>

        <section className="space-y-4 text-sm text-slate-700 pt-6 border-t border-slate-200">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            4. Preise und Zahlungsbedingungen
          </h2>
          <p>
            Die auf der Website angegebenen Preise verstehen sich als Endpreise inklusive der gesetzlichen Mehrwertsteuer. Die Zahlung erfolgt über die auf der Website angebotenen Zahlungsmethoden.
          </p>
          <p className="mt-2">
            Die Servicegebühr wird einmalig bei Auftragserteilung fällig. Es entstehen keine Abonnements oder wiederkehrenden Gebühren, sofern nicht ausdrücklich anders vereinbart.
          </p>
        </section>

        <section className="space-y-4 text-sm text-slate-700 pt-6 border-t border-slate-200">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            5. Leistungserbringung
          </h2>
          <p>
            Der Anbieter wird die bestellten Dienstleistungen mit der gebotenen Sorgfalt erbringen. Die Bearbeitungszeit beträgt in der Regel 1-3 Werktage nach Eingang aller erforderlichen Informationen.
          </p>
          <p className="mt-2">
            Der Anbieter ist berechtigt, zur Erfüllung seiner Leistungspflichten Dritte (Subunternehmer) einzusetzen.
          </p>
        </section>

        <section className="space-y-4 text-sm text-slate-700 pt-6 border-t border-slate-200">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            6. Pflichten des Kunden
          </h2>
          <p>
            Der Kunde verpflichtet sich:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Wahrheitsgemäße und vollständige Angaben zu machen</li>
            <li>Alle erforderlichen Unterlagen bereitzustellen</li>
            <li>Den Anbieter unverzüglich über Änderungen zu informieren</li>
            <li>Die Website nicht missbräuchlich zu nutzen</li>
            <li>Keine rechtswidrigen Inhalte zu übermitteln</li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-slate-700 pt-6 border-t border-slate-200">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            7. Widerrufsrecht
          </h2>
          <p>
            Verbrauchern steht ein gesetzliches Widerrufsrecht zu. Die Einzelheiten ergeben sich aus der Widerrufsbelehrung, die auf der Website unter dem Menüpunkt "Widerrufsrecht" abrufbar ist.
          </p>
        </section>

        <section className="space-y-4 text-sm text-slate-700 pt-6 border-t border-slate-200">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            8. Haftung
          </h2>
          <p>
            Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie nach Maßgabe des Produkthaftungsgesetzes. Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung einer wesentlichen Vertragspflicht (Kardinalpflicht), deren Erfüllung die ordnungsgemäße Durchführung des Vertrages überhaupt erst ermöglicht und auf deren Einhaltung der Kunde regelmäßig vertrauen darf.
          </p>
          <p className="mt-2">
            Die Haftung für leichte Fahrlässigkeit ist der Höhe nach begrenzt auf die bei Vertragsschluss vorhersehbaren Schäden, mit deren Entstehung typischerweise gerechnet werden muss.
          </p>
          <p className="mt-2">
            Der Anbieter übernimmt keine Haftung für die Richtigkeit, Vollständigkeit oder Aktualität der vom Kunden bereitgestellten Informationen. Der Anbieter haftet nicht für Entscheidungen der Deutschen Rentenversicherung.
          </p>
        </section>

        <section className="space-y-4 text-sm text-slate-700 pt-6 border-t border-slate-200">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            9. Datenschutz
          </h2>
          <p>
            Der Anbieter behandelt alle personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie der Datenschutzerklärung, die auf der Website abrufbar ist.
          </p>
        </section>

        <section className="space-y-4 text-sm text-slate-700 pt-6 border-t border-slate-200">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            10. Urheberrecht
          </h2>
          <p>
            Alle Inhalte der Website (Texte, Bilder, Grafiken, Design, etc.) sind urheberrechtlich geschützt. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des Anbieters.
          </p>
        </section>

        <section className="space-y-4 text-sm text-slate-700 pt-6 border-t border-slate-200">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            11. Änderung der AGB
          </h2>
          <p>
            Der Anbieter behält sich das Recht vor, diese AGB jederzeit zu ändern. Die Änderungen werden dem Kunden per E-Mail mitgeteilt. Widerspricht der Kunde der Geltung der neuen AGB nicht innerhalb von zwei Wochen nach der Mitteilung, gelten die geänderten AGB als angenommen. Der Anbieter wird den Kunden in der Mitteilung auf sein Widerspruchsrecht und die Bedeutung der Widerspruchsfrist hinweisen.
          </p>
        </section>

        <section className="space-y-4 text-sm text-slate-700 pt-6 border-t border-slate-200">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            12. Schlussbestimmungen
          </h2>
          <p>
            Es gilt das Recht des Vereinigten Königreichs unter Ausschluss des UN-Kaufrechts. Bei Verbrauchern gilt diese Rechtswahl nur insoweit, als nicht der gewährte Schutz durch zwingende Bestimmungen des Rechts des Staates, in dem der Verbraucher seinen gewöhnlichen Aufenthalt hat, entzogen wird.
          </p>
          <p className="mt-2">
            Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen hiervon unberührt.
          </p>
        </section>

        <section className="space-y-4 text-sm text-slate-700 pt-6 border-t border-slate-200">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            13. Kontakt
          </h2>
          <p>
            REGIS DATASEC LTD<br />
            71-75 Shelton Street, Covent Garden<br />
            WC2H 9JQ London<br />
            United Kingdom
          </p>
          <p className="mt-2">
            E-Mail: info@rentnerauskunft.de
          </p>
        </section>

        <div className="pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-600">
            Stand: Januar 2024
          </p>
          <a
            href="/"
            className="inline-flex items-center text-sm font-semibold text-renten-blue hover:text-renten-blue/80 mt-4"
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
