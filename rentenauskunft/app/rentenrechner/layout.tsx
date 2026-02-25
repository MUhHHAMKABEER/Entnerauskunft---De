import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rentenrechner – Wie viel Rente bekomme ich? | Rentenrechner",
  description: "Berechnen Sie Ihre voraussichtliche gesetzliche Rente mit unserem Rentenrechner. Wie viel Rente bekomme ich? Ermitteln Sie Ihre Altersrente basierend auf Entgeltpunkten.",
  keywords: "rentenrechner, rente berechnen, wie viel rente bekomme ich, rentenhöhe berechnen, gesetzliche rente berechnen, rentenberechnung",
  alternates: { canonical: "https://rentnerauskunft.de/rentenrechner" },
  openGraph: {
    title: "Rentenrechner – Wie viel Rente bekomme ich? | Rentenrechner",
    description: "Berechnen Sie Ihre voraussichtliche gesetzliche Rente mit unserem Rentenrechner. Wie viel Rente bekomme ich? Ermitteln Sie Ihre Altersrente basierend auf Entgeltpunkten.",
    type: "website",
    url: "https://rentnerauskunft.de/rentenrechner"
  }
};

export default function RentenrechnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
