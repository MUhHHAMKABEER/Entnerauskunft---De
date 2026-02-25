import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Widerrufsrecht | Rentenauskunft Service",
  description: "Widerrufsbelehrung und Muster-Widerrufsformular für Rentenauskunft Service.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-soft px-6 py-8 md:px-10 md:py-10 space-y-6">
        <h1 className="font-heading text-3xl font-semibold text-renten-blue mb-6">
          Widerrufsbelehrung
        </h1>

        <section className="space-y-4 text-sm text-slate-700">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            Widerrufsrecht
          </h2>
          <div className="bg-slate-50 border-l-4 border-slate-700 rounded-lg p-5 space-y-3">
            <p className="font-semibold text-slate-900 text-lg">
              Kein Widerrufsrecht bei sofortiger Leistungserbringung
            </p>
            <p>
              <strong>Bei unserem Service besteht KEIN Widerrufsrecht</strong>, da die Dienstleistung unmittelbar nach Vertragsschluss automatisch und vollständig erbracht wird.
            </p>
            <p>
              Ihre Anforderung wird sofort nach Absenden des Formulars verarbeitet und automatisch an die Deutsche Rentenversicherung weitergeleitet. Die Leistung ist damit vollständig erbracht.
            </p>
            <p className="text-sm">
              Rechtsgrundlage: <strong>§ 356 Abs. 5 BGB</strong> – Das Widerrufsrecht erlischt bei einem Vertrag zur Erbringung von Dienstleistungen, wenn der Unternehmer die Dienstleistung vollständig erbracht hat und mit der Ausführung der Dienstleistung erst begonnen hat, nachdem der Verbraucher dazu seine ausdrückliche Zustimmung gegeben hat und gleichzeitig seine Kenntnis davon bestätigt hat, dass er sein Widerrufsrecht bei vollständiger Vertragserfüllung durch den Unternehmer verliert.
            </p>
          </div>
          <p className="mt-4 font-semibold">
            Hinweis: Die nachfolgende Widerrufsbelehrung dient lediglich der Vollständigkeit und gilt nur, sofern die Dienstleistung noch nicht vollständig erbracht wurde (was bei unserem automatisierten Service nicht der Fall ist).
          </p>
          <p className="mt-2">
            Um Ihr Widerrufsrecht auszuüben, müssen Sie uns:
          </p>
          <div className="bg-slate-50 rounded-lg p-4 mt-2">
            <p className="font-semibold text-slate-900">REGIS DATASEC LTD</p>
            <p>71-75 Shelton Street, Covent Garden</p>
            <p>WC2H 9JQ London</p>
            <p>United Kingdom</p>
            <p className="mt-2">E-Mail: info@rentnerauskunft.de</p>
          </div>
          <p className="mt-2">
            mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
          </p>
          <p className="mt-2">
            Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
          </p>
        </section>

        <section className="space-y-4 text-sm text-slate-700 pt-6 border-t border-slate-200">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            Folgen des Widerrufs
          </h2>
          <p>
            Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
          </p>
          <p className="mt-2">
            Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
          </p>
          <p className="mt-2">
            Haben Sie verlangt, dass die Dienstleistungen während der Widerrufsfrist beginnen sollen, so haben Sie uns einen angemessenen Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem Sie uns von der Ausübung des Widerrufsrechts hinsichtlich dieses Vertrags unterrichten, bereits erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der im Vertrag vorgesehenen Dienstleistungen entspricht.
          </p>
        </section>

        <section className="space-y-4 text-sm text-slate-700 pt-6 border-t border-slate-200">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            Besonderheiten bei automatisierter und individualisierter Dienstleistung
          </h2>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 space-y-3">
            <p className="font-semibold text-amber-900">
              Wichtiger Hinweis zum Widerrufsrecht:
            </p>
            <p>
              Bei unserem Service handelt es sich um eine <strong>automatisierte und individuell auf Ihre persönlichen Daten zugeschnittene Dienstleistung</strong>. Nach Absenden Ihrer Anfrage werden Ihre Daten unmittelbar verarbeitet und strukturiert an die Deutsche Rentenversicherung weitergeleitet.
            </p>
            <p>
              Gemäß <strong>§ 312g Abs. 2 Nr. 9 BGB</strong> besteht bei Dienstleistungen kein Widerrufsrecht, wenn die Dienstleistung vollständig erbracht wurde und mit der Ausführung erst begonnen wurde, nachdem Sie ausdrücklich zugestimmt haben und gleichzeitig Ihre Kenntnis davon bestätigt haben, dass Sie Ihr Widerrufsrecht bei vollständiger Vertragserfüllung verlieren.
            </p>
            <p>
              <strong>Da die Verarbeitung und Weiterleitung Ihrer Daten automatisiert und unmittelbar nach Vertragsschluss erfolgt, erlischt Ihr Widerrufsrecht mit der vollständigen Erbringung unserer Dienstleistung.</strong>
            </p>
            <p className="text-xs text-amber-800 pt-2 border-t border-amber-300">
              Mit dem Absenden des Formulars und der Bestätigung der Checkbox erklären Sie sich ausdrücklich damit einverstanden, dass wir mit der Ausführung der Dienstleistung sofort beginnen, und bestätigen Ihre Kenntnis davon, dass Sie Ihr Widerrufsrecht bei vollständiger Vertragserfüllung verlieren.
            </p>
          </div>
        </section>
        
        <section className="space-y-4 text-sm text-slate-700 pt-6 border-t border-slate-200">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            Vorzeitiges Erlöschen des Widerrufsrechts
          </h2>
          <p>
            Das Widerrufsrecht erlischt bei einem Vertrag zur Erbringung von Dienstleistungen, wenn der Unternehmer die Dienstleistung vollständig erbracht hat und mit der Ausführung der Dienstleistung erst begonnen hat, nachdem der Verbraucher dazu seine ausdrückliche Zustimmung gegeben hat und gleichzeitig seine Kenntnis davon bestätigt hat, dass er sein Widerrufsrecht bei vollständiger Vertragserfüllung durch den Unternehmer verliert.
          </p>
        </section>

        <section className="space-y-4 text-sm text-slate-700 pt-6 border-t border-slate-200">
          <h2 className="font-heading text-xl font-semibold text-slate-900">
            Muster-Widerrufsformular
          </h2>
          <p>
            Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück:
          </p>
          <div className="bg-slate-50 rounded-lg p-6 mt-4 space-y-4">
            <p className="font-semibold text-slate-900">An:</p>
            <p>
              REGIS DATASEC LTD<br />
              71-75 Shelton Street, Covent Garden<br />
              WC2H 9JQ London<br />
              United Kingdom<br />
              E-Mail: info@rentnerauskunft.de
            </p>
            <div className="border-t border-slate-300 pt-4 mt-4">
              <p>Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über die Erbringung der folgenden Dienstleistung:</p>
              <div className="bg-white border border-slate-300 rounded p-3 mt-2 min-h-[60px]">
                <p className="text-slate-400 text-xs">[Dienstleistung eintragen]</p>
              </div>
            </div>
            <div className="border-t border-slate-300 pt-4">
              <p>Bestellt am (*) / erhalten am (*):</p>
              <div className="bg-white border border-slate-300 rounded p-3 mt-2">
                <p className="text-slate-400 text-xs">[Datum eintragen]</p>
              </div>
            </div>
            <div className="border-t border-slate-300 pt-4">
              <p>Name des/der Verbraucher(s):</p>
              <div className="bg-white border border-slate-300 rounded p-3 mt-2">
                <p className="text-slate-400 text-xs">[Name eintragen]</p>
              </div>
            </div>
            <div className="border-t border-slate-300 pt-4">
              <p>Anschrift des/der Verbraucher(s):</p>
              <div className="bg-white border border-slate-300 rounded p-3 mt-2 min-h-[80px]">
                <p className="text-slate-400 text-xs">[Anschrift eintragen]</p>
              </div>
            </div>
            <div className="border-t border-slate-300 pt-4">
              <p>Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):</p>
              <div className="bg-white border border-slate-300 rounded p-3 mt-2 min-h-[60px]"></div>
            </div>
            <div className="border-t border-slate-300 pt-4">
              <p>Datum:</p>
              <div className="bg-white border border-slate-300 rounded p-3 mt-2">
                <p className="text-slate-400 text-xs">[Datum eintragen]</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 pt-4 border-t border-slate-300">
              (*) Unzutreffendes streichen
            </p>
          </div>
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
