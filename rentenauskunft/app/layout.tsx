import "./globals.css";
import type { Metadata } from "next";
import { Barlow, Noto_Sans } from "next/font/google";
import React from "react";
import Head from "next/head";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Rentenauskunft online beantragen | Rentnerauskunft Service",
  description:
    "Rentenauskunft, Renteninformation und Versicherungsverlauf online anfordern – sicher & schnell. Unabhängiger Service mit strukturierter Weiterleitung an die DRV.",
  keywords: [
    "Rentenauskunft",
    "Rentenauskunft online",
    "Rentenauskunft beantragen",
    "Renteninformation",
    "Versicherungsverlauf",
    "Deutsche Rentenversicherung",
    "Rentenkonto",
    "Rentenantrag",
    "Altersrente",
    "Rentenbezugsbescheinigung"
  ],
  authors: [{ name: "Rentenauskunft Service" }],
  publisher: "Rentenauskunft Service",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#083163' },
    ],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Rentenauskunft',
  },
  openGraph: {
    title: "Rentenauskunft online beantragen",
    description:
      "Rentenauskunft, Renteninformation und Versicherungsverlauf digital beantragen – ohne Papierkram, schnell und sicher.",
    url: "https://rentnerauskunft.de",
    siteName: "Rentenauskunft Service",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rentenauskunft Service',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rentenauskunft online beantragen",
    description:
      "Rentenauskunft, Renteninformation und Versicherungsverlauf digital beantragen – ohne Papierkram.",
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: "https://rentnerauskunft.de",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rentenauskunft Service",
  url: "https://rentnerauskunft.de/",
  address: {
    "@type": "PostalAddress",
    addressCountry: "DE",
  },
};

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Rentenauskunft" className="h-14 w-auto cursor-pointer hover:opacity-90 transition-opacity" />
        </a>
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm text-slate-900">
          <a href="/rente-beantragen" className="nav-link hover:text-renten-blue whitespace-nowrap">
            Rente beantragen
          </a>
          <a href="/rentenauskunft-online-beantragen" className="nav-link hover:text-renten-blue whitespace-nowrap">
            Rentenauskunft
          </a>
          <a
            href="/erwerbsminderungsrente"
            className="nav-link hover:text-renten-blue whitespace-nowrap"
          >
            Erwerbsminderungsrente
          </a>
          <a href="/rentenrechner" className="nav-link hover:text-renten-blue whitespace-nowrap">
            Rentenrechner
          </a>
          <a href="/ratgeber" className="nav-link hover:text-renten-blue whitespace-nowrap">
            Ratgeber
          </a>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-[#083163] text-white border-t border-[#0a4178]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Über uns */}
          <div>
            <h3 className="font-heading text-base font-semibold mb-4">
              Rentenauskunft Service
            </h3>
            <p className="text-sm text-slate-300">
              Ihr digitaler Service für die Beantragung von Rentenunterlagen
              bei der Deutschen Rentenversicherung.
            </p>
          </div>

          {/* Rentenunterlagen */}
          <div>
            <h3 className="font-heading text-base font-semibold mb-4">
              Rentenunterlagen
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="/rentenauskunft-online-beantragen" className="hover:text-renten-accent transition-colors">
                  Rentenauskunft beantragen
                </a>
              </li>
              <li>
                <a href="/renteninformation-beantragen" className="hover:text-renten-accent transition-colors">
                  Renteninformation
                </a>
              </li>
              <li>
                <a href="/versicherungsverlauf-anfordern" className="hover:text-renten-accent transition-colors">
                  Versicherungsverlauf
                </a>
              </li>
              <li>
                <a href="/kontenklarung-rentenversicherung" className="hover:text-renten-accent transition-colors">
                  Kontenklärung
                </a>
              </li>
              <li>
                <a href="/unterschied-rentenauskunft-renteninformation-versicherungsverlauf" className="hover:text-renten-accent transition-colors">
                  Unterschiede erklärt
                </a>
              </li>
              <li>
                <a href="/rentenbezugsbescheinigung-finanzamt" className="hover:text-renten-accent transition-colors">
                  Rentenbezugsbescheinigung (Finanzamt)
                </a>
              </li>
            </ul>
          </div>

          {/* Ratgeber */}
          <div>
            <h3 className="font-heading text-base font-semibold mb-4">
              Ratgeber
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="/rente-beantragen" className="hover:text-renten-accent transition-colors">
                  Rente beantragen
                </a>
              </li>
              <li>
                <a href="/erwerbsminderungsrente" className="hover:text-renten-accent transition-colors">
                  Erwerbsminderungsrente
                </a>
              </li>
              <li>
                <a href="/rentenrechner" className="hover:text-renten-accent transition-colors">
                  Rentenrechner
                </a>
              </li>
            </ul>
          </div>

          {/* Nützliche Links */}
          <div>
            <h3 className="font-heading text-base font-semibold mb-4">
              Nützliche Links
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a
                  href="https://www.deutsche-rentenversicherung.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-renten-accent transition-colors"
                >
                  Deutsche Rentenversicherung
                </a>
              </li>
              <li>
                <a
                  href="https://www.bundesregierung.de/breg-de/themen/rente"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-renten-accent transition-colors"
                >
                  Bundesregierung: Rente
                </a>
              </li>
              <li>
                <a
                  href="https://www.ihre-vorsorge.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-renten-accent transition-colors"
                >
                  Ihre Vorsorge
                </a>
              </li>
              <li>
                <a
                  href="https://www.verbraucherzentrale.de/wissen/geld-versicherungen/altersvorsorge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-renten-accent transition-colors"
                >
                  Verbraucherzentrale
                </a>
              </li>
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h3 className="font-heading text-base font-semibold mb-4">
              Rechtliches
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="/impressum" className="hover:text-renten-accent transition-colors">
                  Impressum
                </a>
              </li>
              <li>
                <a href="/datenschutz" className="hover:text-renten-accent transition-colors">
                  Datenschutz
                </a>
              </li>
              <li>
                <a href="/agb" className="hover:text-renten-accent transition-colors">
                  AGB
                </a>
              </li>
              <li>
                <a href="/widerruf" className="hover:text-renten-accent transition-colors">
                  Widerrufsrecht
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#0a4178] pt-6 text-center text-sm text-white/70">
          <p>© {new Date().getFullYear()} Rentenauskunft Service. Alle Rechte vorbehalten.</p>
          <p className="mt-2 text-xs">
            Unabhängiger Service – kein Vertragsverhältnis zur Deutschen Rentenversicherung.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${barlow.variable} ${notoSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#CBD939" />
      </head>
      <body className="min-h-screen bg-slate-100 text-slate-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <div className="min-h-screen flex flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
