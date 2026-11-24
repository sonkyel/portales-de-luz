import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const descripcion =
  "Departamentos de 75, 97 y 101 m² y dúplex en Yanahuara, Arequipa. A 1 minuto de la Av. Ejército. Arquitectura de arcos en sillar, seguridad 24/7 y acabados de alta calidad.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} | Departamentos en Yanahuara, Arequipa`,
    template: `%s · ${site.name}`,
  },
  description: descripcion,
  keywords: [
    "Portales de Luz",
    "departamentos en Yanahuara",
    "departamentos en Arequipa",
    "dúplex Yanahuara",
    "condominio Yanahuara",
  ],
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: site.url,
    siteName: site.fullName,
    title: `${site.fullName} · Yanahuara`,
    description: descripcion,
    images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: site.fullName }],
  },
  alternates: { canonical: site.url },
};

export const viewport: Viewport = {
  themeColor: "#8b1a20",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: site.fullName,
    url: site.url,
    image: `${site.url}/img/og.jpg`,
    telephone: `+${site.contact.whatsapp}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle Quesada con Calle Arica",
      addressLocality: "Yanahuara",
      addressRegion: "Arequipa",
      addressCountry: "PE",
    },
  };

  return (
    <html lang="es" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
