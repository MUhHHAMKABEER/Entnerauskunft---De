"use client";

import { FormEvent, useEffect, useState } from "react";

// Tracking-Funktion
async function trackPageView() {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        seite: window.location.pathname,
        referrer: document.referrer
      })
    });
  } catch (err) {
    console.error('Tracking-Fehler:', err);
  }
}

type ArtCode =
  | "180220"
  | "082028"
  | "082029"
  | "082030"
  | "180217"
  | "020011"
  | "0200112"
  | "020013"
  | "0200132"
  | "SVA";

type ArtConfig = {
  code: ArtCode;
  label: string;
  description: string;
  requiresPeriod?: boolean;
  requiresYear?: boolean;
  isHinterbliebenen?: boolean;
  isSva?: boolean;
};

const ARTEN: ArtConfig[] = [
  {
    code: "180220",
    label: "Versicherungsverlauf",
    description:
      "Überblick über alle gespeicherten Versicherungszeiten im Rentenkonto.",
  },
  {
    code: "082028",
    label: "Rentenauskunft",
    description:
      "Detaillierte Rentenauskunft zur voraussichtlichen Höhe der Altersrente.",
  },
  {
    code: "082029",
    label: "Renteninformation",
    description:
      "Renteninformation zum aktuellen Stand Ihrer Rentenansprüche mit Hochrechnung.",
  },
  {
    code: "082030",
    label: "Beitragsrechnung",
    description:
      "Übersicht über Monatsbeiträge und ggf. offene Beiträge (z. B. Handwerker).",
  },
  {
    code: "180217",
    label: "Lückenauskunft",
    description:
      "Lückenauskunft zu klärungsbedürftigen Zeiträumen im Versicherungskonto.",
  },
  {
    code: "020011",
    label: "Rentenbezugsbescheinigung (Versichertenrente)",
    description:
      "Bescheinigung über ausgezahlte Rentenbeträge für einen gewünschten Zeitraum.",
    requiresPeriod: true,
  },
  {
    code: "0200112",
    label: "Rentenbezugsbescheinigung (Hinterbliebenenrente)",
    description:
      "Bescheinigung über ausgezahlte Hinterbliebenenrente im gewählten Zeitraum.",
    requiresPeriod: true,
    isHinterbliebenen: true,
  },
  {
    code: "020013",
    label:
      "Information über Meldung an die Finanzverwaltung (Versichertenrente)",
    description:
      "Steuerrechtlich maßgebliche Rentenbeträge für ein Kalenderjahr.",
    requiresYear: true,
  },
  {
    code: "0200132",
    label:
      "Information über Meldung an die Finanzverwaltung (Hinterbliebenenrente)",
    description:
      "Steuerrechtlich maßgebliche Rentenbeträge zur Hinterbliebenenrente.",
    requiresYear: true,
    isHinterbliebenen: true,
  },
  {
    code: "SVA",
    label:
      "Neuausstellung Versicherungsnummernachweis (bei Verlust/Zerstörung)",
    description:
      "Neuer Versicherungsnummernachweis, wenn der bisherige verloren oder unbrauchbar ist.",
    isSva: true,
  },
];

type FormState = {
  art: ArtCode | "";
  vsnr: string;
  panr: string;
  periodFrom: string;
  periodTo: string;
  yearFrom: string;
  yearTo: string;
  firstName: string;
  lastName: string;
  birthName: string;
  deceasedFirstName: string;
  deceasedLastName: string;
  deceasedBirthName: string;
  email: string;
  salutation: string;
  birthDate: string;
  birthPlace: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  city: string;
  country: string;
  carrier: string;
  nationality: string;
  maritalStatus: string;
  children: string;
  phone: string;
  desiredRetirementDate: string;
};

const initialForm: FormState = {
  art: "",
  vsnr: "",
  panr: "",
  periodFrom: "",
  periodTo: "",
  yearFrom: "",
  yearTo: "",
  firstName: "",
  lastName: "",
  birthName: "",
  deceasedFirstName: "",
  deceasedLastName: "",
  deceasedBirthName: "",
  email: "",
  salutation: "",
  birthDate: "",
  birthPlace: "",
  street: "",
  houseNumber: "",
  zipCode: "",
  city: "",
  country: "Deutschland",
  carrier: "",
  nationality: "",
  maritalStatus: "",
  children: "",
  phone: "",
  desiredRetirementDate: "",
};

export default function Page() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [agbAccepted, setAgbAccepted] = useState(false);
  const [widerrufsAccepted, setWiderrufsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  const selectedArt = ARTEN.find((a) => a.code === form.art);

  const processingSteps = [
    "Analysiere Ihre Daten",
    "Strukturiere Anforderungsinformationen",
    "Bereite Weiterleitung vor",
    "Schließe Vorgang ab"
  ];

  // Tracking beim Laden der Seite
  useEffect(() => {
    trackPageView();
  }, []);

  // Processing Steps Animation
  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProcessingStep((prev) => {
          if (prev < processingSteps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 2000); // Wechsel alle 2 Sekunden

      return () => clearInterval(interval);
    }
  }, [isProcessing, processingSteps.length]);

  // FAQ-Schema JSON-LD für Index
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Wann sollte ich meine Altersrente beantragen?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In der Regel etwa drei Monate vor dem gewünschten Rentenbeginn, damit die Deutsche Rentenversicherung genug Zeit zur Bearbeitung des Rentenantrags hat.",
          },
        },
        {
          "@type": "Question",
          name: "Was ist der Unterschied zwischen Rentenauskunft und Renteninformation?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Die Rentenauskunft ist eine detaillierte Berechnung der künftigen Rente, die Renteninformation ist eine jährliche Kurz-Information mit Hochrechnung und grober Orientierung.",
          },
        },
        {
          "@type": "Question",
          name: "Welche Unterlagen brauche ich für den Rentenantrag?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sie benötigen insbesondere Ihre Rentenversicherungsnummer, einen vollständigen Versicherungsverlauf, idealerweise eine aktuelle Rentenauskunft oder Renteninformation sowie Ausweisdokumente und Bankverbindung.",
          },
        },
        {
          "@type": "Question",
          name: "Fallen neben der Servicegebühr weitere Kosten an?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Für unseren Service fällt lediglich die einmalige Servicegebühr von 29,90 € inklusive Mehrwertsteuer an. Die Erstellung der Rentenauskunft durch die gesetzliche Rentenversicherung ist für Versicherte in der Regel kostenfrei. Es entstehen keine Abonnements oder wiederkehrenden Gebühren.",
          },
        },
        {
          "@type": "Question",
          name: "Gibt es eine Altersgrenze für die Rentenauskunft?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Eine Rentenauskunft ist besonders aussagekräftig, wenn bereits einige Versicherungsjahre vorliegen. Viele Versicherte fordern ab etwa 40 Jahren regelmäßig Unterlagen an. Grundsätzlich können Sie aber auch früher eine Übersicht beantragen, wenn Sie Ihre Datensituation prüfen möchten.",
          },
        },
        {
          "@type": "Question",
          name: "Wer darf die Rentenauskunft beantragen?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Grundsätzlich können Sie als Versicherter die Auskunft über Ihre eigenen Rentendaten beantragen. In bestimmten Fällen können auch Bevollmächtigte handeln, etwa Angehörige mit schriftlicher Vollmacht. Unser Online-Formular ist auf den Regelfall ausgerichtet – also den Antrag im eigenen Namen.",
          },
        },
        {
          "@type": "Question",
          name: "Was kann ich tun, wenn Daten in der Rentenauskunft falsch sind?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Stellen Sie bei Durchsicht der Rentenauskunft Unstimmigkeiten fest (z. B. fehlende Beschäftigungszeiten oder falsche Zeiträume), sollten Sie sich direkt an die Deutsche Rentenversicherung wenden und die Unterlagen zur Korrektur einreichen. Die Rentenauskunft ist eine wichtige Grundlage, um solche Fehler frühzeitig zu erkennen.",
          },
        },
        {
          "@type": "Question",
          name: "Wie bekomme ich eine aktuelle Rentenauskunft?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sie können eine aktuelle Rentenauskunft direkt bei der Deutschen Rentenversicherung beantragen – entweder schriftlich, telefonisch unter 0800 1000 4800 oder über unser Online-Formular. Unser Service bereitet den Antrag formgerecht vor und leitet ihn an die zuständige Stelle weiter. Die Rentenauskunft wird Ihnen dann von der Rentenversicherung zugesandt.",
          },
        },
        {
          "@type": "Question",
          name: "Kann ich mein Rentenkonto online einsehen?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ja, über das Online-Portal der Deutschen Rentenversicherung können Sie nach Registrierung Ihr Rentenkonto einsehen. Alternativ können Sie einen Versicherungsverlauf oder eine Rentenauskunft anfordern, die Ihnen alle gespeicherten Zeiten und Ihre bisherigen Rentenansprüche detailliert aufzeigt.",
          },
        },
        {
          "@type": "Question",
          name: "Wie kann ich eine Besondere Rentenauskunft beantragen?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Eine Besondere Rentenauskunft (auch Rentenauskunft genannt) können Sie ab dem 43. Lebensjahr alle drei Jahre kostenfrei bei der Deutschen Rentenversicherung anfordern. Sie enthält detaillierte Informationen zu Ihren erworbenen Rentenansprüchen und verschiedenen Rentenszenarien. Der Antrag erfolgt schriftlich oder über unser Formular.",
          },
        },
        {
          "@type": "Question",
          name: "Wie kann ich eine Rentenbezugsmitteilung online anfordern?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Eine Rentenbezugsmitteilung (auch Rentenbezugsbescheinigung genannt) können Sie über unser Online-Formular anfordern. Wählen Sie die entsprechende Option aus und geben Sie den gewünschten Zeitraum an. Die Bescheinigung wird Ihnen von der Deutschen Rentenversicherung zugesandt und zeigt die ausgezahlten Rentenbeträge für steuerliche oder andere Zwecke.",
          },
        },
        {
          "@type": "Question",
          name: "Warum sind die letzten 5 Jahre vor der Rente so wichtig?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Die letzten fünf Jahre vor Rentenbeginn sind besonders wichtig, weil in dieser Zeit oft noch Lücken im Versicherungsverlauf geschlossen werden können. Zudem wirken sich die Beiträge dieser Jahre direkt auf die Rentenhöhe aus. Es empfiehlt sich daher, rechtzeitig eine Rentenauskunft anzufordern und den Versicherungsverlauf zu prüfen, um mögliche Fehler oder fehlende Zeiten zu korrigieren.",
          },
        },
        {
          "@type": "Question",
          name: "Wann bekommt man eine Renteninformation?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Die Deutsche Rentenversicherung versendet die Renteninformation automatisch einmal jährlich an alle Versicherten ab dem 27. Lebensjahr, die mindestens fünf Jahre Beitragszeiten nachweisen können. Sie erhalten diese Information unaufgefordert per Post. Zusätzlich können Sie jederzeit eine detailliertere Rentenauskunft oder einen Versicherungsverlauf anfordern.",
          },
        },
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
    setSubmitted(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.art) {
      setError("Bitte wählen Sie, welche Unterlagen Sie anfordern möchten.");
      return;
    }

    // Pflichtfelder je nach Anforderung
    const required: (keyof FormState)[] = ["salutation", "firstName", "lastName", "email", "street", "houseNumber", "zipCode", "city", "country"];

    // Hinterbliebenenrente: PANR + Verstorbene Person
    if (selectedArt?.isHinterbliebenen) {
      required.push("panr", "deceasedFirstName", "deceasedLastName");
    } 
    // SVA (Versicherungsnummernachweis): KEINE Versicherungsnummer nötig
    else if (selectedArt?.isSva) {
      // Nur Name reicht
    } 
    // Alle anderen: Versicherungsnummer nötig
    else {
      required.push("vsnr");
    }

    // Zeitraum-Felder (z.B. Rentenbezugsbescheinigung)
    if (selectedArt?.requiresPeriod) {
      required.push("periodFrom");
    }
    
    // Jahr-Felder (z.B. Finanzverwaltung-Meldung)
    if (selectedArt?.requiresYear) {
      required.push("yearFrom");
    }

    const missing = required.filter((field) => !form[field]);

    if (missing.length > 0) {
      const missingLabels = missing.map(field => {
        switch(field) {
          case 'salutation': return 'Anrede';
          case 'firstName': return 'Vorname';
          case 'lastName': return 'Familienname';
          case 'email': return 'E-Mail';
          case 'street': return 'Straße';
          case 'houseNumber': return 'Hausnummer';
          case 'zipCode': return 'PLZ';
          case 'city': return 'Ort';
          case 'country': return 'Land';
          case 'vsnr': return 'Versicherungsnummer';
          case 'panr': return 'Postabrechungsnummer';
          case 'deceasedFirstName': return 'Vorname des Verstorbenen';
          case 'deceasedLastName': return 'Familienname des Verstorbenen';
          case 'periodFrom': return 'Zeitraum von';
          case 'yearFrom': return 'Jahr von';
          default: return field;
        }
      });
      setError(`Bitte füllen Sie folgende Pflichtfelder aus: ${missingLabels.join(', ')}`);
      return;
    }

    // Checkbox-Validierung
    if (!agbAccepted) {
      setError('Bitte akzeptieren Sie die AGB und Datenschutzerklärung.');
      return;
    }

    if (!widerrufsAccepted) {
      setError('Bitte bestätigen Sie, dass Sie über Ihr Widerrufsrecht informiert wurden.');
      return;
    }

    // Backend-Submission
    setIsProcessing(true);
    setProcessingStep(0);
    
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          anrede: form.salutation,
          vorname: form.firstName,
          familienname: form.lastName,
          geburtsname: form.birthName,
          geburtsdatum: form.birthDate,
          geburtsort: form.birthPlace,
          strasse: form.street,
          hausnummer: form.houseNumber,
          plz: form.zipCode,
          ort: form.city,
          land: form.country,
          versicherungsnummer: form.vsnr,
          rentenversicherungstraeger: form.carrier,
          staatsangehoerigkeit: form.nationality,
          familienstand: form.maritalStatus,
          kinder_anzahl: form.children ? parseInt(form.children) : null,
          telefon: form.phone,
          antragstyp: form.art,
          antragstyp_label: selectedArt?.label || null,
          gewuenschter_rentenbeginn: form.desiredRetirementDate,
          zeitraum_von: form.periodFrom || null,
          zeitraum_bis: form.periodTo || null,
          jahr_von: form.yearFrom || null,
          jahr_bis: form.yearTo || null,
          panr: form.panr || null,
          verstorbener_vorname: form.deceasedFirstName || null,
          verstorbener_familienname: form.deceasedLastName || null,
          verstorbener_geburtsname: form.deceasedBirthName || null
        })
      });

      const data = await res.json();

      if (data.success) {
        console.log('✅ Erfolgreich gespeichert:', data.data);
        // Weiterleitung zur Bestätigungsseite
        window.location.href = '/bestaetigung';
      } else {
        setError(data.error || 'Fehler beim Speichern');
      }
    } catch (err) {
      console.error('❌ Submit-Fehler:', err);
      setError('Verbindungsfehler. Bitte versuchen Sie es erneut.');
      setIsProcessing(false);
    }
  }

  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="relative bg-renten-blue text-white border-b-4 border-renten-accent overflow-visible">
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-12 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-renten-accent px-4 py-1 text-xs font-semibold text-renten-blue mb-4">
            Druckprodukte &amp; Auskünfte zur Rente
          </div>
          <h1 className="font-heading text-[36px] leading-tight font-semibold mb-3">
            Rentenauskunft online beantragen
          </h1>
          <p className="max-w-3xl text-sm md:text-base text-slate-100">
            Rentenauskunft, Renteninformation, Versicherungsverlauf oder
            Bescheinigungen – erfassen Sie Ihre Daten zentral an einem Ort. Wir
            strukturieren die Angaben, damit Sie Ihre Rente bei der Deutschen
            Rentenversicherung einfacher beantragen können.
          </p>
        </div>
        
        {/* Hero-Bilder rechts - Treppe, section-übergreifend */}
        <div className="hidden lg:block absolute right-0 top-0 w-[600px] pointer-events-none z-20">
          {/* Bild 1 - oben (hero2) */}
          <div className="absolute top-8 right-40 w-[340px] h-[220px] rounded-xl overflow-hidden border-4 border-renten-accent shadow-2xl">
            <img 
              src="/hero2.jpg" 
              alt="Deutsche Rentenversicherung" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Bild 2 - darunter versetzt nach rechts (hero1) */}
          <div className="absolute top-[200px] right-12 w-[340px] h-[220px] rounded-xl overflow-hidden border-4 border-renten-accent shadow-2xl">
            <img 
              src="/hero1.jpg" 
              alt="Rentenauskunft Dokument" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Formular + Content */}
      <section className="mx-auto max-w-6xl px-6 mt-8 pb-16 space-y-12">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Formular-Card */}
          <div className="bg-white rounded-2xl shadow-soft border border-slate-100 border-t-4 border-renten-accent px-6 py-8 md:px-8 md:py-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Angaben zur Versicherung */}
            <div>
              <h2 className="font-heading text-lg font-semibold text-renten-blue mb-1">
                1. Angaben zur Versicherung
              </h2>
              <p className="text-xs text-slate-700 mb-3">
                <span className="underline cursor-default">
                  Hilfe zu diesem Abschnitt
                </span>
              </p>

              {!selectedArt?.isHinterbliebenen && (
                <div className="max-w-md">
                  <label
                    htmlFor="vsnr"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Versicherungsnummer*
                  </label>
                  <input
                    id="vsnr"
                    type="text"
                    placeholder="z.B. 12140441E119"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-renten-blue focus:ring-1 focus:ring-renten-blue"
                    value={form.vsnr}
                    onChange={(e) =>
                      update("vsnr", e.target.value.toUpperCase())
                    }
                  />
                </div>
              )}

              {selectedArt?.isHinterbliebenen && (
                <div className="space-y-4">
                  <div className="max-w-md">
                    <label
                      htmlFor="panr"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Postabrechnungsnummer (PANR) / Postrentennummer (PRNR)*
                    </label>
                    <input
                      id="panr"
                      type="text"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-renten-blue focus:ring-1 focus:ring-renten-blue"
                      value={form.panr}
                      onChange={(e) =>
                        update("panr", e.target.value.toUpperCase())
                      }
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label
                        htmlFor="deceasedFirstName"
                        className="block text-sm font-medium text-slate-700 mb-1"
                      >
                        Vorname(n) des Verstorbenen*
                      </label>
                      <input
                        id="deceasedFirstName"
                        type="text"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-renten-blue focus:ring-1 focus:ring-renten-blue"
                        value={form.deceasedFirstName}
                        onChange={(e) =>
                          update("deceasedFirstName", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="deceasedLastName"
                        className="block text-sm font-medium text-slate-700 mb-1"
                      >
                        Familienname des Verstorbenen*
                      </label>
                      <input
                        id="deceasedLastName"
                        type="text"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-renten-blue focus:ring-1 focus:ring-renten-blue"
                        value={form.deceasedLastName}
                        onChange={(e) =>
                          update("deceasedLastName", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="deceasedBirthName"
                        className="block text-sm font-medium text-slate-700 mb-1"
                      >
                        Geburtsname des Verstorbenen
                      </label>
                      <input
                        id="deceasedBirthName"
                        type="text"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-renten-blue focus:ring-1 focus:ring-renten-blue"
                        value={form.deceasedBirthName}
                        onChange={(e) =>
                          update("deceasedBirthName", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Angaben zur Person */}
            <div>
              <h2 className="font-heading text-lg font-semibold text-renten-blue mb-1">
                2. Angaben zur Person
              </h2>
              <p className="text-xs text-slate-700 mb-3">
                <span className="underline cursor-default">
                  Hilfe zu diesem Abschnitt
                </span>
              </p>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label
                    htmlFor="salutation"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Anrede*
                  </label>
                  <select
                    id="salutation"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-renten-blue focus:ring-1 focus:ring-renten-blue"
                    value={form.salutation}
                    onChange={(e) => update("salutation", e.target.value)}
                  >
                    <option value="">Bitte wählen</option>
                    <option value="Herr">Herr</option>
                    <option value="Frau">Frau</option>
                    <option value="Divers">Divers</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Vorname(n)*
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-renten-blue focus:ring-1 focus:ring-renten-blue"
                    value={form.firstName}
                    onChange={(e) =>
                      update("firstName", e.target.value.trimStart())
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Familienname*
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-renten-blue focus:ring-1 focus:ring-renten-blue"
                    value={form.lastName}
                    onChange={(e) =>
                      update("lastName", e.target.value.trimStart())
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="birthName"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Geburtsname
                  </label>
                  <input
                    id="birthName"
                    type="text"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-renten-blue focus:ring-1 focus:ring-renten-blue"
                    value={form.birthName}
                    onChange={(e) =>
                      update("birthName", e.target.value.trimStart())
                    }
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  E-Mail-Adresse*
                </label>
                <p className="text-xs text-slate-600 mb-2">
                  Wichtig: Hier erhalten Sie alle Benachrichtigungen von der Rentenversicherung
                </p>
                <input
                  id="email"
                  type="email"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-renten-blue focus:ring-1 focus:ring-renten-blue"
                  placeholder="max.mustermann@beispiel.de"
                  value={form.email}
                  onChange={(e) =>
                    update("email", e.target.value.trim())
                  }
                />
              </div>

              {/* Adressangaben */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <h3 className="font-semibold text-sm text-slate-900 mb-3">Adressangaben*</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Straße*
                    </label>
                    <input
                      id="street"
                      type="text"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-renten-blue focus:ring-1 focus:ring-renten-blue"
                      value={form.street}
                      onChange={(e) =>
                        update("street", e.target.value.trimStart())
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="houseNumber"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Hausnummer*
                    </label>
                    <input
                      id="houseNumber"
                      type="text"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-renten-blue focus:ring-1 focus:ring-renten-blue"
                      value={form.houseNumber}
                      onChange={(e) =>
                        update("houseNumber", e.target.value.trimStart())
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3 mt-4">
                  <div>
                    <label
                      htmlFor="zipCode"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      PLZ*
                    </label>
                    <input
                      id="zipCode"
                      type="text"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-renten-blue focus:ring-1 focus:ring-renten-blue"
                      value={form.zipCode}
                      onChange={(e) =>
                        update("zipCode", e.target.value.trim())
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Ort*
                    </label>
                    <input
                      id="city"
                      type="text"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-renten-blue focus:ring-1 focus:ring-renten-blue"
                      value={form.city}
                      onChange={(e) =>
                        update("city", e.target.value.trimStart())
                      }
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Land*
                  </label>
                  <input
                    id="country"
                    type="text"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-renten-blue focus:ring-1 focus:ring-renten-blue"
                    value={form.country}
                    onChange={(e) =>
                      update("country", e.target.value.trimStart())
                    }
                  />
                </div>
              </div>
            </div>

            {/* 3. Anforderung von … */}
            <div>
              <h2 className="font-heading text-lg md:text-xl font-semibold text-renten-blue mb-2">
                3. Anforderung von …
              </h2>
              <p className="text-sm text-slate-700 mb-4">
                Wählen Sie die Unterlage, die Sie bei der Deutschen
                Rentenversicherung anfordern möchten – zum Beispiel{" "}
                <strong>Rentenauskunft</strong>,{" "}
                <strong>Renteninformation</strong> oder{" "}
                <strong>Versicherungsverlauf</strong>.
              </p>

              <div className="grid gap-3 md:grid-cols-2">
                {ARTEN.map((art) => (
                  <label
                    key={art.code}
                    className={`cursor-pointer rounded-xl border bg-slate-50 px-4 py-3 text-sm transition hover:bg-white ${
                      form.art === art.code
                        ? "border-renten-blue ring-2 ring-renten-blue/25"
                        : "border-slate-200 hover:border-renten-blue/60"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="art"
                        value={art.code}
                        checked={form.art === art.code}
                        onChange={() =>
                          update("art", art.code as FormState["art"])
                        }
                        className="mt-1 h-4 w-4 border-slate-400 text-renten-blue focus:ring-renten-blue"
                      />
                      <div>
                        <div className="font-heading text-sm font-semibold text-renten-blue mb-0.5">
                          {art.label}
                        </div>
                        <div className="text-xs text-slate-600">
                          {art.description}
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Zeitraum / Jahr (nur bei speziellen Anträgen) */}
            {(selectedArt?.requiresPeriod || selectedArt?.requiresYear) && (
              <div className="grid gap-6 md:grid-cols-2">
                {selectedArt?.requiresPeriod && (
                  <div>
                    <h2 className="font-heading text-lg font-semibold text-renten-blue mb-2">
                      4. Zeitraum
                    </h2>
                    <p className="text-sm text-slate-700 mb-3">
                      Für welchen Zeitraum sollen die Rentenbeträge bescheinigt
                      werden?
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="periodFrom"
                          className="block text-sm font-medium text-slate-700 mb-1"
                        >
                          Von (tt.mm.jjjj)*
                        </label>
                        <input
                          id="periodFrom"
                          type="date"
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-renten-blue focus:ring-1 focus:ring-renten-blue"
                          value={form.periodFrom}
                          onChange={(e) =>
                            update("periodFrom", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="periodTo"
                          className="block text-sm font-medium text-slate-700 mb-1"
                        >
                          Bis (tt.mm.jjjj)
                        </label>
                        <input
                          id="periodTo"
                          type="date"
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-renten-blue focus:ring-1 focus:ring-renten-blue"
                          value={form.periodTo}
                          onChange={(e) =>
                            update("periodTo", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedArt?.requiresYear && (
                  <div>
                    <h2 className="font-heading text-lg font-semibold text-renten-blue mb-2">
                      4. Kalenderjahr
                    </h2>
                    <p className="text-sm text-slate-700 mb-3">
                      Für welches Kalenderjahr sollen die Daten bescheinigt
                      werden?
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label
                          htmlFor="yearFrom"
                          className="block text-sm font-medium text-slate-700 mb-1"
                        >
                          Von Kalenderjahr (jjjj)*
                        </label>
                        <input
                          id="yearFrom"
                          type="number"
                          min={1980}
                          max={2100}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-renten-blue focus:ring-1 focus:ring-renten-blue"
                          value={form.yearFrom}
                          onChange={(e) =>
                            update("yearFrom", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="yearTo"
                          className="block text-sm font-medium text-slate-700 mb-1"
                        >
                          Bis Kalenderjahr (jjjj)
                        </label>
                        <input
                          id="yearTo"
                          type="number"
                          min={1980}
                          max={2100}
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-renten-blue focus:ring-1 focus:ring-renten-blue"
                          value={form.yearTo}
                          onChange={(e) =>
                            update("yearTo", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SVA Hinweis */}
            {selectedArt?.isSva && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                Nach dem Absenden der Anforderung wird ein neuer
                Versicherungsnummernachweis an die bei der Deutschen
                Rentenversicherung hinterlegte Adresse versendet.
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-800">
                {error}
              </div>
            )}

            {/* Checkboxen */}
            <div className="space-y-3 border-t border-slate-200 pt-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agb"
                  checked={agbAccepted}
                  onChange={(e) => setAgbAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-renten-blue focus:ring-renten-blue cursor-pointer"
                />
                <label htmlFor="agb" className="text-sm text-slate-700 cursor-pointer">
                  Ich habe die{' '}
                  <a href="/agb" target="_blank" className="text-renten-blue hover:underline font-semibold">
                    AGB
                  </a>
                  {' '}und{' '}
                  <a href="/datenschutz" target="_blank" className="text-renten-blue hover:underline font-semibold">
                    Datenschutzerklärung
                  </a>
                  {' '}gelesen und akzeptiere diese.*
                </label>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="widerruf"
                  checked={widerrufsAccepted}
                  onChange={(e) => setWiderrufsAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-slate-300 text-renten-blue focus:ring-renten-blue cursor-pointer"
                />
                <label htmlFor="widerruf" className="text-sm text-slate-700 cursor-pointer">
                  Ich wurde über mein{' '}
                  <a href="/widerruf" target="_blank" className="text-renten-blue hover:underline font-semibold">
                    Widerrufsrecht
                  </a>
                  {' '}informiert und habe die Widerrufsbelehrung zur Kenntnis genommen.*
                </label>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-xs text-slate-700">
                Mit * gekennzeichnete Felder sind Pflichtfelder.
              </p>
              <button
                type="submit"
                disabled={isProcessing}
                className="inline-flex items-center justify-center rounded-xl bg-renten-blue px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-renten-blue/90 focus:outline-none focus:ring-2 focus:ring-renten-blue focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anfordern
              </button>
              
              {/* Loader direkt unter Button */}
              {isProcessing && (
                <div className="mt-4 flex flex-col items-center gap-3">
                  <svg 
                    className="w-12 h-12 text-slate-200 animate-spin fill-renten-blue" 
                    viewBox="0 0 100 101" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <p className="text-renten-blue font-medium text-sm">
                    {processingSteps[processingStep]}
                    <span className="animate-pulse">...</span>
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>

          {/* Text-Spalte rechts vom Formular - unten bündig */}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl shadow-soft border border-slate-100 px-5 py-6 text-sm text-slate-700 space-y-4">
              <h2 className="font-heading text-lg font-semibold text-renten-blue">
                Wir beantragen Ihre Rentenauskunft für Sie
              </h2>
              <p>
                Als Versicherter der Deutschen Rentenversicherung haben Sie das
                Recht, jederzeit eine Übersicht über Ihre gespeicherten Daten und
                Ihre bisher erworbenen Rentenansprüche zu erhalten. In der Praxis
                ist der Antrag jedoch oft umständlich, papierlastig und mit
                Rückfragen verbunden.
              </p>
              <p>
                Mit <strong>Rentenauskunft Service</strong> wird dieser Prozess
                deutlich einfacher: Sie geben Ihre Daten bequem online ein, wir
                bereiten den Antrag korrekt vor und leiten ihn an die zuständige
                Rentenversicherung weiter. So sparen Sie Zeit, vermeiden Formfehler
                und erhalten Ihre Rentenauskunft in der Regel schneller.
              </p>

              <h3 className="font-heading text-base font-semibold text-renten-blue pt-2">
                Warum eine Rentenauskunft wichtig ist
              </h3>
              <p>Eine aktuelle Rentenauskunft hilft Ihnen dabei,</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Ihre bisher erworbenen Rentenansprüche zu prüfen,</li>
                <li>
                  mögliche Lücken in Ihrem Versicherungsverlauf zu erkennen,
                </li>
                <li>
                  frühzeitig eine mögliche <strong>Rentenlücke</strong> zu
                  identifizieren,
                </li>
                <li>
                  Entscheidungen zu Immobilie, Vermögensaufbau und Altersvorsorge
                  besser zu planen.
                </li>
              </ul>
              <p>
                Gerade in Phasen mit Jobwechsel, Selbstständigkeit, Elternzeit oder
                längeren Krankheitszeiten lohnt sich ein genauer Blick auf die
                Rentendaten.
              </p>

              <h3 className="font-heading text-base font-semibold text-renten-blue pt-2">
                Unabhängiger Service – klare Transparenz
              </h3>
              <p>
                Rentenauskunft Service steht in <strong>keinem Vertragsverhältnis</strong> zur
                Deutschen Rentenversicherung oder anderen öffentlichen Trägern. Wir
                sind ein eigenständiger, digitaler Dienstleister und unterstützen
                Sie bei der formgerechten Beantragung Ihrer Rentenauskunft.
              </p>
              <p>
                Für diese Dienstleistung berechnen wir eine{" "}
                <strong>einmalige Servicegebühr von 29,90 € inkl. MwSt.</strong>,
                zahlbar bequem per Rechnung. Die eigentliche Rentenauskunft wird wie
                gewohnt von der zuständigen Rentenversicherung erstellt und Ihnen
                zugesandt.
              </p>
              <p>
                Nutzen Sie unseren Service, wenn Sie den Papierkram minimieren
                möchten und Wert auf einen klar strukturierten, verständlichen
                Prozess legen.
              </p>
            </div>
          </aside>
        </div>

        {/* SEO-Blöcke – massiv erweitert */}
        <section className="space-y-8 text-sm text-slate-700">
          {/* Intro-Block */}
          <div>
            <h2 className="font-heading text-2xl font-semibold text-renten-blue mb-4">
              Rentenauskunft online beantragen – schnell, bequem und verständlich
            </h2>
            <p className="mb-3">
              Die gesetzliche Rente ist für die meisten Menschen der wichtigste
              Baustein der Altersvorsorge. Umso wichtiger ist es, regelmäßig zu
              prüfen, ob alle relevanten Zeiten korrekt erfasst sind und mit
              welcher ungefähren Rentenhöhe Sie später rechnen können. Genau hier
              setzt die Rentenauskunft an: Sie zeigt Ihnen übersichtlich, welche
              Ansprüche Sie bislang erworben haben und wie sich diese bei
              unveränderten Bedingungen entwickeln könnten.
            </p>
            <p>
              Über <strong>Rentenauskunft Service</strong> beantragen Sie Ihre
              Rentenauskunft vollständig online – ohne komplizierte Formularsuche,
              ohne lange Wege und ohne Fax oder Briefpost. Sie füllen einfach
              unser sicheres Online-Formular aus, wir bereiten den Antrag auf und
              leiten ihn an die zuständige Deutsche Rentenversicherung weiter.
            </p>
          </div>

          {/* So funktioniert es */}
          <div>
            <h2 className="font-heading text-2xl font-semibold text-renten-blue mb-4">
              So funktioniert unser Rentenauskunft-Service in drei Schritten
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-heading text-base font-semibold text-slate-900 mb-1">
                  1. Online-Formular ausfüllen
                </h3>
                <p>
                  Sie tragen Ihre persönlichen Daten in unser Formular ein. Alle
                  Pflichtfelder sind klar gekennzeichnet, typische Fehlerquellen
                  (z. B. unvollständige Adressangaben) werden direkt abgefangen.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold text-slate-900 mb-1">
                  2. Prüfung & Weiterleitung an die Rentenversicherung
                </h3>
                <p>
                  Wir prüfen Ihren Auftrag auf Vollständigkeit und leiten den
                  Antrag dann an die zuständige Rentenversicherung weiter. Dadurch
                  erhöhen sich die Chancen, dass Ihre Anfrage ohne Rückfragen
                  bearbeitet werden kann.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-base font-semibold text-slate-900 mb-1">
                  3. Rentenauskunft erhalten
                </h3>
                <p>
                  Die eigentliche Rentenauskunft wird von der Deutschen
                  Rentenversicherung erstellt. Sie erhalten das Dokument in der
                  Regel per Post zugesandt. Bei Rückfragen stehen wir Ihnen
                  unterstützend zur Seite.
                </p>
              </div>
            </div>
          </div>

{/* Blog-Teaser */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="font-heading text-3xl font-semibold text-renten-blue mb-3">
                Aktuelle Ratgeber zur Altersvorsorge
              </h2>
              <p className="text-slate-700 max-w-2xl mx-auto">
                Informieren Sie sich über wichtige Themen rund um Rente, Altersvorsorge und Rentenantrag
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Blog 1 */}
              <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop"
                    alt="Rentenunterlagen prüfen"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">
                    Häufige Fehler bei Rentenunterlagen
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Die 10 häufigsten Fehler bei Rentenauskunft und Versicherungsverlauf – und wie Sie sie vermeiden.
                  </p>
                  <a
                    href="/ratgeber/haeufige-fehler"
                    className="inline-flex items-center text-sm font-semibold text-renten-blue hover:text-renten-blue/80"
                  >
                    Artikel lesen
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </article>

              {/* Blog 2 */}
              <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop"
                    alt="Ruhestand planen"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">
                    Checkliste für den Ruhestand
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Alle wichtigen Schritte für einen entspannten Übergang in die Rente – von der Planung bis zur Beantragung.
                  </p>
                  <a
                    href="/ratgeber/checkliste-ruhestand"
                    className="inline-flex items-center text-sm font-semibold text-renten-blue hover:text-renten-blue/80"
                  >
                    Artikel lesen
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </article>

              {/* Blog 3 */}
              <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop"
                    alt="Altersvorsorge berechnen"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">
                    Rentenlücke berechnen
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    So ermitteln Sie Ihre Versorgungslücke und schließen sie mit privater Altersvorsorge.
                  </p>
                  <a
                    href="/ratgeber/rentenluecke-berechnen"
                    className="inline-flex items-center text-sm font-semibold text-renten-blue hover:text-renten-blue/80"
                  >
                    Artikel lesen
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </article>
            </div>
          </div>
          {/* Wann sinnvoll */}
          <div>
            <h2 className="font-heading text-2xl font-semibold text-renten-blue mb-4">
              Wann sollten Sie eine Rentenauskunft anfordern?
            </h2>
            <p className="mb-3">
              Es gibt viele Situationen, in denen eine aktuelle Rentenauskunft
              besonders hilfreich ist, zum Beispiel:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Planung des Ruhestands: Sie möchten wissen, ob
                Ihre gesetzliche Rente für Ihren gewünschten Lebensstandard
                ausreichen wird.
              </li>
              <li>
                Immobilienfinanzierung: Banken verlangen häufig
                eine Einschätzung Ihrer späteren Rentenhöhe, um Ihre langfristige
                Zahlungsfähigkeit besser beurteilen zu können.
              </li>
              <li>
                Scheidung oder Versorgungsausgleich: In
                familienrechtlichen Verfahren spielt der Wert der
                Rentenanwartschaften eine große Rolle.
              </li>
              <li>
                <strong>Längere Auslandsaufenthalte oder Phasen ohne Beiträge:</strong>{" "}
                Sie wollen prüfen, ob alle Zeiten korrekt erfasst wurden.
              </li>
              <li>
                <strong>Selbstständigkeit oder Jobwechsel:</strong> Sie möchten
                sehen, wie sich Veränderungen im Erwerbsleben auf Ihre spätere
                Rente auswirken.
              </li>
            </ul>
            <p className="mt-3">
              Grundsätzlich ist es sinnvoll, <strong>spätestens ab Mitte 40</strong>{" "}
              regelmäßig einen Blick auf die Rentendaten zu werfen. So bleibt genug
              Zeit, eine mögliche Rentenlücke zum Beispiel mit betrieblicher oder
              privater Vorsorge auszugleichen.
            </p>
          </div>

          {/* Unterschied Renteninformation / Rentenauskunft / Versicherungsverlauf */}
          <div>
            <h2 className="font-heading text-2xl font-semibold text-renten-blue mb-4">
              Renteninformation, Rentenauskunft und Versicherungsverlauf – der
              Unterschied
            </h2>
            <p className="mb-3">
              Viele Versicherte sind unsicher, welche Unterlagen es überhaupt gibt.
              Grob lässt sich zwischen drei Dokumenttypen unterscheiden:
            </p>
            <div className="space-y-3">
              <div>
                <p>
                  <strong>Renteninformation:</strong> Diese wird in der Regel automatisch ab einem bestimmten Alter
                  regelmäßig versandt und enthält eine grobe Prognose Ihrer
                  zukünftigen Rentenhöhe.
                </p>
              </div>
              <div>
                <p>
                  <strong>Rentenauskunft:</strong> Die Rentenauskunft ist deutlich ausführlicher und wird auf
                  ausdrücklichen Antrag erstellt. Sie zeigt detailliert, wie sich
                  Ihre bisher erworbenen Rentenansprüche zusammensetzen, und enthält
                  häufig Szenarien für verschiedene Rentenbeginndaten.
                </p>
              </div>
              <div>
                <p>
                  <strong>Versicherungsverlauf:</strong> Im Versicherungsverlauf werden sämtliche gemeldeten Zeiten (z. B.
                  Ausbildung, Beschäftigung, Kindererziehungszeiten,
                  Arbeitslosigkeit) aufgeführt. Er dient dazu, die Datengrundlage
                  der Rente zu überprüfen und ggf. fehlende Zeiten zu ergänzen.
                </p>
              </div>
            </div>
            <p className="mt-3">
              Über unseren Service beantragen Sie in der Regel eine{" "}
              <strong>ausführliche Rentenauskunft</strong>, bei der auf Basis Ihres
              individuellen Versicherungsverlaufs gerechnet wird.
            </p>
          </div>

          {/* Vorteile */}
          <div>
            <h2 className="font-heading text-2xl font-semibold text-renten-blue mb-4">
              Ihre Vorteile mit Rentenauskunft Service auf einen Blick
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Kein Papierkram: Keine Suche nach Formularen, keine
                unleserlichen Faxe oder Rückläufer wegen Formfehlern.
              </li>
              <li>
                Digital & transparent: Antragstellung komplett
                online, klare Bestätigung per E-Mail.
              </li>
              <li>
                Fokus auf Verständlichkeit: Wir bereiten den
                Prozess so auf, dass auch Nicht-Juristen und Nicht-Beamte alles
                nachvollziehen können.
              </li>
              <li>
                Schneller Start: Sie müssen nicht erst
                herausfinden, welche Stelle genau zuständig ist – wir übernehmen die
                korrekte Zuordnung.
              </li>
              <li>
                Faire Kosten: Einmalige Servicegebühr von 29,90 €
                inkl. MwSt. – keine Abos, keine versteckten Folgekosten.
              </li>
            </ul>
            <p className="mt-3">
              So behalten Sie Ihre gesetzliche Rente im Blick und schaffen eine
              solide Basis für Ihre weitere Altersvorsorgeplanung.
            </p>
          </div>
        </section>

        {/* Bestehende SEO-Blöcke */}
        <section className="space-y-8 text-sm text-slate-700">
          {/* Block 1: Rente beantragen */}
          <div>
            <h2 className="font-heading text-2xl font-semibold text-renten-blue mb-3">
              Rente beantragen: Altersrente, Regelaltersrente &amp;
              Rentenantrag
            </h2>
            <p className="mb-3">
              Viele Versicherte suchen nach Begriffen wie
              „Rente beantragen“,
              „Rentenantrag stellen“,
              „Rentenantrag wann stellen“ oder
              „Rente wo beantragen“. Grundsätzlich gilt: Die
              <strong>Altersrente</strong> bzw.
              Regelaltersrente sollte etwa drei Monate vor dem
              geplanten Rentenbeginn beantragt werden. Zuständig ist die
              Deutsche Rentenversicherung, entweder über die
              Auskunfts- und Beratungsstellen, per Post oder
              über den Rentenantrag online.
            </p>
            <p>
              Eine vollständige <strong>Rentenauskunft</strong>, eine aktuelle
              Renteninformation sowie ein geprüfter
              Versicherungsverlauf sorgen dafür, dass die
              Beantragung der Rente schneller und mit weniger
              Rückfragen abläuft. Über unsere Startseite erfassen Sie diese
              Angaben strukturiert.
            </p>
          </div>

          {/* Block 2: Welche Unterlagen... */}
          <div>
            <h2 className="font-heading text-2xl font-semibold text-renten-blue mb-3">
              Welche Rentenunterlagen können Sie hier vorbereiten?
            </h2>
            <p className="mb-3">
              Auf dieser Seite erfassen Sie zentral Ihre Daten für verschiedene
              Unterlagen der Deutschen Rentenversicherung. Dazu gehören:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Versicherungsverlauf – vollständige Übersicht
                aller gemeldeten Zeiten im Rentenkonto.
              </li>
              <li>
                Rentenauskunft – detaillierte Berechnung Ihrer
                späteren Altersrente.
              </li>
              <li>
                Renteninformation – jährliche Kurz-Info mit
                Hochrechnung.
              </li>
              <li>
                Rentenbezugsbescheinigung – Nachweis über
                gezahlte Rentenbeträge (Versichertenrente oder
                Hinterbliebenenrente).
              </li>
              <li>
                Information über die Meldung an die Finanzverwaltung{" "}
                – steuerrelevante Rentenbeträge pro Kalenderjahr.
              </li>
              <li>
                Neuausstellung Versicherungsnummernachweis – bei
                Verlust oder Zerstörung.
              </li>
            </ul>
            <p className="mt-3">
              Mehr zu einzelnen Themen finden Sie in unseren Unterseiten, zum
              Beispiel{" "}
              <a
                href="/rente-beantragen"
                className="text-renten-blue underline"
              >
                „Rente beantragen“
              </a>{" "}
              oder{" "}
              <a
                href="/renteninformation"
                className="text-renten-blue underline"
              >
                „Rentenauskunft &amp; Renteninformation“.
              </a>
            </p>
          </div>

          {/* Block 3: Erwerbsminderungsrente */}
          <div>
            <h2 className="font-heading text-2xl font-semibold text-renten-blue mb-3">
              Erwerbsminderungsrente beantragen &amp; Reha-Antrag
            </h2>
            <p className="mb-3">
              Begriffe wie „Erwerbsminderungsrente beantragen“,
              „Antrag auf Erwerbsminderungsrente“,
              „Erwerbsminderungsrente Antrag“ oder
              „Antrag Reha Deutsche Rentenversicherung“
              tauchen auf, wenn gesundheitliche Einschränkungen vorliegen.
              Häufig gilt das Prinzip „Reha vor Rente“: Erst
              wird geprüft, ob eine Reha-Maßnahme die Erwerbsfähigkeit
              wiederherstellen kann, bevor die Rente gewährt wird.
            </p>
            <p>
              Eine klare Dokumentation Ihrer Versicherungszeiten, ärztlichen
              Gutachten und Reha-Berichte ist entscheidend, damit der
              <strong>Antrag auf Erwerbsminderungsrente</strong> erfolgreich
              geprüft werden kann. Ausführliche Informationen finden Sie in
              unserer Unterseite{" "}
              <a
                href="/erwerbsminderungsrente"
                className="text-renten-blue underline"
              >
                Erwerbsminderungsrente beantragen.
              </a>
            </p>
          </div>

          {/* Block 4: Witwenrente, Mütterrente, Schwerbehinderung */}
          <div>
            <h2 className="font-heading text-2xl font-semibold text-renten-blue mb-3">
              Witwenrente, Mütterrente und Rente bei Schwerbehinderung
            </h2>
            <p className="mb-3">
              Auch Anträge auf <strong>Witwenrente</strong>,
              Mütterrente oder
              Rente bei Schwerbehinderung bauen auf einem
              vollständigen Datensatz auf. Viele Nutzer suchen nach
              „Witwenrente beantragen“,
              „Beantragung Witwenrente“,
              „Mütterrente beantragen“ oder
              „Rente Schwerbehinderung“.
            </p>
            <p>
              Auch hier sind Versicherungsverlauf,
              Rentenauskunft und korrekte Angaben zu
              Kindern/Kindererziehungszeiten wichtig, damit die
              Rentenversicherung die Ansprüche korrekt berechnen kann.
            </p>
          </div>

          {/* Block 5: Beratungsstellen & Online-Antrag */}
          <div>
            <h2 className="font-heading text-2xl font-semibold text-renten-blue mb-3">
              Auskunfts- und Beratungsstellen &amp; Rentenantrag online
            </h2>
            <p className="mb-3">
              Unter dem Suchbegriff
              „Auskunfts- und Beratungsstellen der Deutschen
              Rentenversicherung“
              finden viele Versicherte den Weg zur persönlichen Beratung. Wer
              den <strong>Rentenantrag online</strong> stellt, spart sich Wege,
              braucht aber saubere und vollständige Angaben.
            </p>
            <p>
              Unsere Erfassungsseite ersetzt keine Rechtsberatung, sorgt aber
              für eine strukturierte Datengrundlage, mit der Sie in
              Beratungsstellen oder beim
              Rentenantrag online weniger nachliefern müssen.
            </p>
          </div>



          {/* Block 6: FAQ-Akkordeon */}
          <div>
            <h2 className="font-heading text-2xl font-semibold text-renten-blue mb-6">
              Häufige Fragen zur Rentenauskunft und zum Rentenantrag
            </h2>
            <div className="space-y-3">
              {[
                {
                  q: "Wie bekomme ich eine aktuelle Rentenauskunft?",
                  a: "Sie können eine Rentenauskunft direkt bei der Deutschen Rentenversicherung beantragen – entweder schriftlich, telefonisch oder online. Mit unserem Service übernehmen wir die korrekte Erfassung und Weiterleitung Ihrer Daten, sodass Sie Zeit sparen und Formfehler vermeiden. Nach Eingang Ihrer Anfrage wird die Rentenauskunft von der zuständigen Rentenversicherung erstellt und Ihnen zugesandt.",
                },
                {
                  q: "Kann ich mein Rentenkonto online einsehen?",
                  a: "Ja, die Deutsche Rentenversicherung bietet verschiedene Online-Services an, mit denen Sie Ihr Rentenkonto einsehen können. Allerdings erfordert dies oft eine Registrierung und Authentifizierung. Unser Service vereinfacht diesen Prozess: Sie geben Ihre Daten einmal ein, wir kümmern uns um die formgerechte Anforderung der Unterlagen.",
                },
                {
                  q: "Wie kann ich eine Besondere Rentenauskunft beantragen?",
                  a: "Eine Besondere Rentenauskunft wird in der Regel bei komplexeren Sachverhalten benötigt, etwa bei Auslandszeiten oder besonderen Versicherungsverläufen. Sie können diese über unser Formular anfordern, indem Sie die entsprechenden Angaben machen. Wir leiten Ihre Anfrage strukturiert an die Deutsche Rentenversicherung weiter, die dann die detaillierte Prüfung vornimmt.",
                },
                {
                  q: "Ist Rentenauskunft das Gleiche wie Renteninformation?",
                  a: "Nein, es gibt wichtige Unterschiede: Die Renteninformation erhalten Sie automatisch einmal jährlich ab dem 27. Lebensjahr und enthält eine Hochrechnung Ihrer voraussichtlichen Rente. Die Rentenauskunft hingegen ist deutlich detaillierter, wird auf Antrag erstellt und eignet sich besonders, wenn Sie konkret Ihre Rente planen oder beantragen möchten. Sie enthält eine genauere Berechnung und berücksichtigt auch komplexere Sachverhalte.",
                },
                {
                  q: "Wann sollte ich die Rente beantragen?",
                  a: "In der Praxis hat sich ein Zeitraum von etwa drei Monaten vor dem geplanten Rentenbeginn bewährt. So hat die Deutsche Rentenversicherung genug Zeit, Unterlagen zu prüfen und Rückfragen zu stellen.",
                },
                {
                  q: "Welche Unterlagen brauche ich für den Rentenantrag?",
                  a: "Unverzichtbar sind in der Regel Ihre Rentenversicherungsnummer, ein vollständiger Versicherungsverlauf, eine aktuelle Renteninformation oder Rentenauskunft, Ausweisdokumente und Ihre Bankverbindung.",
                },
                {
                  q: "Fallen neben der Servicegebühr weitere Kosten an?",
                  a: "Für unseren Service fällt lediglich die einmalige Servicegebühr von 29,90 € inklusive Mehrwertsteuer an. Die Erstellung der Rentenauskunft durch die gesetzliche Rentenversicherung ist für Versicherte in der Regel kostenfrei. Es entstehen keine Abonnements oder wiederkehrenden Gebühren.",
                },
                {
                  q: "Gibt es eine Altersgrenze für die Rentenauskunft?",
                  a: "Eine Rentenauskunft ist besonders aussagekräftig, wenn bereits einige Versicherungsjahre vorliegen. Viele Versicherte fordern ab etwa 40 Jahren regelmäßig Unterlagen an. Grundsätzlich können Sie aber auch früher eine Übersicht beantragen, wenn Sie Ihre Datensituation prüfen möchten.",
                },
                {
                  q: "Wer darf die Rentenauskunft beantragen?",
                  a: "Grundsätzlich können Sie als Versicherter die Auskunft über Ihre eigenen Rentendaten beantragen. In bestimmten Fällen können auch Bevollmächtigte handeln, etwa Angehörige mit schriftlicher Vollmacht. Unser Online-Formular ist auf den Regelfall ausgerichtet – also den Antrag im eigenen Namen.",
                },
                {
                  q: "Was kann ich tun, wenn Daten in der Rentenauskunft falsch sind?",
                  a: "Stellen Sie bei Durchsicht der Rentenauskunft Unstimmigkeiten fest (z. B. fehlende Beschäftigungszeiten oder falsche Zeiträume), sollten Sie sich direkt an die Deutsche Rentenversicherung wenden und die Unterlagen zur Korrektur einreichen. Die Rentenauskunft ist eine wichtige Grundlage, um solche Fehler frühzeitig zu erkennen.",
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-lg overflow-hidden bg-white"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-heading text-base font-semibold text-slate-900 pr-4">
                      {faq.q}
                    </span>
                    <svg
                      className={`w-5 h-5 text-renten-blue transition-transform flex-shrink-0 ${
                        openFaq === idx ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-4 text-sm text-slate-700">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
