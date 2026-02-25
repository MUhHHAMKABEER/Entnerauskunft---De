"use client";

import { useState } from "react";

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Rentenauskunft" className="h-14 w-auto cursor-pointer hover:opacity-90 transition-opacity" />
        </a>
        
        {/* Desktop Navigation */}
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-renten-blue transition-colors"
          aria-label="Menü"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <nav className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-3">
            <a
              href="/rente-beantragen"
              className="py-2 text-sm text-slate-900 hover:text-renten-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Rente beantragen
            </a>
            <a
              href="/rentenauskunft-online-beantragen"
              className="py-2 text-sm text-slate-900 hover:text-renten-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Rentenauskunft
            </a>
            <a
              href="/erwerbsminderungsrente"
              className="py-2 text-sm text-slate-900 hover:text-renten-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Erwerbsminderungsrente
            </a>
            <a
              href="/rentenrechner"
              className="py-2 text-sm text-slate-900 hover:text-renten-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Rentenrechner
            </a>
            <a
              href="/ratgeber"
              className="py-2 text-sm text-slate-900 hover:text-renten-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ratgeber
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
