"use client";

import { useState } from "react";

export default function Page() {
  const [entgeltpunkte, setEntgeltpunkte] = useState<string>("20");
  const [zugangsfaktor, setZugangsfaktor] = useState<string>("1.0");
  const [rentenwert, setRentenwert] = useState<string>("37.60");
  const [ergebnis, setErgebnis] = useState<string>("");

  function berechneRente() {
    const ep = parseFloat(entgeltpunkte) || 0;
    const zf = parseFloat(zugangsfaktor) || 0;
    const rw = parseFloat(rentenwert) || 0;

    const rente = ep * zf * rw;

    const formatter = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    });

    const ergebnisText =
      rente > 0
        ? `Ihre geschätzte monatliche Bruttorente beträgt: ${formatter.format(
            rente
          )}`
        : "Bitte geben Sie gültige Werte ein.";

    setErgebnis(ergebnisText);
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 space-y-10">
      {/* Breadcrumbs */}
      <nav
        aria-label="Brotkrumen"
        className="text-xs text-slate-800 mb-2 flex flex-wrap gap-1"
      >
        <a href="/" className="text-renten-blue hover:underline">
          Startseite
        </a>
        <span>/</span>
        <span className="text-slate-900 font-semibold">Rentenrechner</span>
      </nav>

      {/* Header */}
      <header className="mb-6">
        <h1 className="font-heading text-[36px] leading-tight font-semibold text-renten-blue mb-3">
          Rentenrechner – gesetzliche Rente grob schätzen
        </h1>
        <p className="text-sm text-slate-700 max-w-3xl">
          Mit diesem einfachen Rechner können Sie auf Basis Ihrer vorhandenen
          Entgeltpunkte eine grobe Einschätzung Ihrer späteren gesetzlichen
          Monatsrente vornehmen. Das Ergebnis ersetzt keine offizielle
          Rentenauskunft der Deutschen Rentenversicherung.
        </p>
      </header>

      {/* Rechner-Card */}
      <section className="bg-white rounded-2xl shadow-soft border border-slate-100 border-t-4 border-renten-accent px-6 py-8 md:px-10 md:py-10">
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <label
                htmlFor="entgeltpunkte"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Entgeltpunkte
              </label>
              <input
                id="entgeltpunkte"
                type="number"
                min="0"
                step="0.1"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-renten-blue focus:ring-1 focus:ring-renten-blue"
                value={entgeltpunkte}
                onChange={(e) => setEntgeltpunkte(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="zugangsfaktor"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Zugangsfaktor
              </label>
              <input
                id="zugangsfaktor"
                type="number"
                min="0"
                step="0.01"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-renten-blue focus:ring-1 focus:ring-renten-blue"
                value={zugangsfaktor}
                onChange={(e) => setZugangsfaktor(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="rentenwert"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Aktueller Rentenwert pro Entgeltpunkt (in €)
              </label>
              <input
                id="rentenwert"
                type="number"
                min="0"
                step="0.01"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-renten-blue focus:ring-1 focus:ring-renten-blue"
                value={rentenwert}
                onChange={(e) => setRentenwert(e.target.value)}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={berechneRente}
            className="inline-flex items-center justify-center rounded-xl bg-renten-blue px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-renten-blue/90 focus:outline-none focus:ring-2 focus:ring-renten-blue focus:ring-offset-2"
          >
            Rente berechnen
          </button>

          {ergebnis && (
            <div className="rounded-lg border border-renten-blue bg-renten-blue/5 px-4 py-3 text-sm font-semibold text-renten-blue">
              {ergebnis}
            </div>
          )}

          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <strong>Hinweis:</strong> Die Berechnung ist stark vereinfacht und
            basiert auf den von Ihnen eingegebenen Werten. Änderungen des
            Rentenrechts, zukünftige Beiträge oder individuelle Besonderheiten
            bleiben unberücksichtigt. Für eine verbindliche Auskunft empfehlen
            wir, eine offizielle Rentenauskunft über unseren Service zu
            beantragen.
          </div>

          <div className="pt-2">
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-renten-accent px-6 py-2.5 text-sm font-semibold text-renten-blue shadow-sm hover:bg-renten-accent/90 focus:outline-none focus:ring-2 focus:ring-renten-accent focus:ring-offset-2"
            >
              Offizielle Rentenauskunft beantragen
            </a>
          </div>
        </div>
      </section>

      {/* SEO-Content */}
      <section className="bg-white rounded-2xl shadow-soft border border-slate-100 px-6 py-8 md:px-10 md:py-10 space-y-8 text-sm text-slate-700">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-renten-blue mb-4">
            Wie funktioniert der Rentenrechner?
          </h2>
          <p className="mb-3">
            Die gesetzliche Rente in Deutschland basiert im Wesentlichen auf
            Ihren <strong>Entgeltpunkten</strong>, dem{" "}
            <strong>Zugangsfaktor</strong> und dem jeweils gültigen{" "}
            <strong>Rentenwert</strong>. Unser Rechner multipliziert diese Werte
            und gibt Ihnen eine grobe Schätzung Ihrer späteren monatlichen
            Bruttorente aus.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Entgeltpunkte</strong> spiegeln wider, wie viel Sie im
              Vergleich zum Durchschnittsverdienst in die Rentenversicherung
              eingezahlt haben.
            </li>
            <li>
              Der <strong>Zugangsfaktor</strong> berücksichtigt Zu- oder
              Abschläge, wenn Sie früher oder später als zur Regelaltersgrenze
              in Rente gehen.
            </li>
            <li>
              Der <strong>Rentenwert</strong> gibt an, wie viel ein Entgeltpunkt
              in Euro pro Monat wert ist.
            </li>
          </ul>
          <p className="mt-3">
            Bitte beachten Sie: Die tatsächliche Rentenhöhe kann von dieser
            Schätzung abweichen, da zukünftige Gesetzesänderungen, weitere
            Beitragsjahre und individuelle Besonderheiten nicht berücksichtigt
            werden. Wenn Sie eine verlässliche Grundlage für Ihre Planung
            wünschen, sollten Sie zusätzlich eine{" "}
            <strong>offizielle Rentenauskunft</strong> beantragen.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-2xl font-semibold text-renten-blue mb-4">
            Was sind Entgeltpunkte?
          </h2>
          <p className="mb-3">
            Entgeltpunkte sind das zentrale Element der Rentenberechnung in
            Deutschland. Sie werden jedes Jahr neu ermittelt, indem Ihr
            tatsächliches Bruttoeinkommen ins Verhältnis zum
            Durchschnittseinkommen aller Versicherten gesetzt wird.
          </p>
          <p className="mb-3">
            <strong>Beispiel:</strong> Verdienen Sie in einem Jahr genau so viel
            wie der Durchschnitt aller Versicherten, erhalten Sie für dieses
            Jahr genau 1,0 Entgeltpunkte. Verdienen Sie doppelt so viel,
            erhalten Sie 2,0 Entgeltpunkte. Verdienen Sie nur halb so viel,
            erhalten Sie 0,5 Entgeltpunkte.
          </p>
          <p>
            Über Ihr gesamtes Erwerbsleben sammeln sich diese Entgeltpunkte an.
            Die Summe aller Entgeltpunkte ist dann die Grundlage für die
            Berechnung Ihrer späteren Rente.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-2xl font-semibold text-renten-blue mb-4">
            Was ist der Zugangsfaktor?
          </h2>
          <p className="mb-3">
            Der Zugangsfaktor berücksichtigt, ob Sie früher oder später als zur
            Regelaltersgrenze in Rente gehen. Der Normalwert liegt bei{" "}
            <strong>1,0</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Vorzeitiger Rentenbeginn:</strong> Für jeden Monat, den
              Sie früher in Rente gehen, wird der Zugangsfaktor um 0,003
              reduziert (entspricht 0,3 % Abschlag pro Monat bzw. 3,6 % pro
              Jahr).
            </li>
            <li>
              <strong>Späterer Rentenbeginn:</strong> Für jeden Monat, den Sie
              über die Regelaltersgrenze hinaus arbeiten, erhöht sich der
              Zugangsfaktor um 0,005 (entspricht 0,5 % Zuschlag pro Monat bzw.
              6 % pro Jahr).
            </li>
          </ul>
          <p className="mt-3">
            Diese Zu- oder Abschläge gelten dauerhaft für die gesamte
            Rentenlaufzeit.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-2xl font-semibold text-renten-blue mb-4">
            Was ist der aktuelle Rentenwert?
          </h2>
          <p className="mb-3">
            Der aktuelle Rentenwert gibt an, wie viel ein Entgeltpunkt pro Monat
            in Euro wert ist. Dieser Wert wird jährlich von der Bundesregierung
            angepasst und orientiert sich an der Lohnentwicklung.
          </p>
          <p className="mb-3">
            <strong>Stand 2024:</strong> Der aktuelle Rentenwert liegt bei etwa
            37,60 € (West) bzw. 37,60 € (Ost – seit 2024 angeglichen).
          </p>
          <p>
            Für Ihre Berechnung sollten Sie den aktuell gültigen Rentenwert
            verwenden. Beachten Sie, dass dieser Wert in Zukunft steigen kann,
            was Ihre tatsächliche Rente erhöhen würde.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-2xl font-semibold text-renten-blue mb-4">
            Warum eine offizielle Rentenauskunft wichtig ist
          </h2>
          <p className="mb-3">
            Unser Rentenrechner gibt Ihnen eine schnelle Orientierung, ersetzt
            aber keine offizielle Rentenauskunft der Deutschen
            Rentenversicherung. Eine offizielle Rentenauskunft bietet Ihnen:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Exakte Berechnung</strong> auf Basis Ihres individuellen
              Versicherungsverlaufs
            </li>
            <li>
              <strong>Berücksichtigung aller Zeiten:</strong> Beschäftigung,
              Ausbildung, Kindererziehung, Arbeitslosigkeit etc.
            </li>
            <li>
              <strong>Verschiedene Szenarien:</strong> Rentenhöhe bei
              unterschiedlichen Rentenbeginndaten
            </li>
            <li>
              <strong>Prüfung auf Lücken:</strong> Erkennen Sie fehlende oder
              fehlerhafte Einträge frühzeitig
            </li>
            <li>
              <strong>Verbindliche Grundlage</strong> für Ihre
              Altersvorsorgeplanung, Immobilienfinanzierung oder
              familienrechtliche Verfahren
            </li>
          </ul>
          <p className="mt-3">
            Über unseren Service können Sie Ihre Rentenauskunft bequem online
            beantragen. Wir bereiten den Antrag vor und leiten ihn an die
            zuständige Rentenversicherung weiter.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-2xl font-semibold text-renten-blue mb-4">
            Häufige Fragen zum Rentenrechner
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-heading text-base font-semibold text-slate-900">
                Wo finde ich meine Entgeltpunkte?
              </h3>
              <p>
                Ihre bisher erworbenen Entgeltpunkte finden Sie in Ihrer{" "}
                <strong>Renteninformation</strong> oder{" "}
                <strong>Rentenauskunft</strong> der Deutschen
                Rentenversicherung. Dort ist die Summe aller bisher erworbenen
                Entgeltpunkte aufgeführt.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-base font-semibold text-slate-900">
                Ist die Berechnung verbindlich?
              </h3>
              <p>
                Nein, die Berechnung ist eine grobe Schätzung und nicht
                verbindlich. Für eine verbindliche Auskunft benötigen Sie eine
                offizielle Rentenauskunft der Deutschen Rentenversicherung.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-base font-semibold text-slate-900">
                Wird die Brutto- oder Nettorente berechnet?
              </h3>
              <p>
                Der Rechner berechnet die <strong>Bruttorente</strong>. Von
                dieser werden noch Beiträge zur Kranken- und Pflegeversicherung
                sowie ggf. Steuern abgezogen. Die tatsächliche Nettorente liegt
                daher niedriger.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-base font-semibold text-slate-900">
                Kann ich zukünftige Beitragsjahre berücksichtigen?
              </h3>
              <p>
                Dieser einfache Rechner berücksichtigt nur die aktuell
                eingegebenen Entgeltpunkte. Wenn Sie weitere Beitragsjahre
                einplanen möchten, können Sie die voraussichtlichen zusätzlichen
                Entgeltpunkte zur aktuellen Summe hinzurechnen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-renten-blue text-white rounded-2xl shadow-soft px-6 py-8 md:px-10 md:py-10 text-center">
        <h2 className="font-heading text-2xl font-semibold mb-3">
          Jetzt verbindliche Rentenauskunft beantragen
        </h2>
        <p className="text-sm text-slate-100 mb-6 max-w-2xl mx-auto">
          Nutzen Sie unseren Service, um eine offizielle Rentenauskunft der
          Deutschen Rentenversicherung zu beantragen. Vollständig online, ohne
          Papierkram.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-renten-accent px-8 py-3 text-base font-semibold text-renten-blue shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-renten-blue"
        >
          Zum Formular
        </a>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                name: "Rentenrechner",
                item: "https://rentnerauskunft.de/rentenrechner",
              },
            ],
          }),
        }}
      />
    </main>
  );
}
