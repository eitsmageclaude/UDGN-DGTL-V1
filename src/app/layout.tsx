import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Satu Cerita - Platform Undangan Digital & Wedding Planner Eksklusif",
  description:
    "Buat website undangan pernikahan digital elegan dalam hitungan menit. Dilengkapi fitur Wedding Planner, RSVP & Buku Tamu Online, Auto Blast WhatsApp, QR Scanner Tamu, dan 160+ tema eksklusif.",
  keywords: [
    "undangan digital",
    "undangan pernikahan online",
    "wedding website",
    "undangan web",
    "wedding planner indonesia",
    "wa blast undangan",
    "rsvp online",
    "guest on screen",
  ],
  authors: [{ name: "Satu Cerita" }],
  openGraph: {
    title: "Satu Cerita - Undangan Digital untuk Setiap Cerita",
    description:
      "Website undangan digital eksklusif dengan 160+ tema, musik, maps, RSVP & QR check-in tamu.",
    url: "https://satucerita.com",
    siteName: "Satu Cerita",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Satu Cerita Platform Undangan Digital",
              image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
              description:
                "SaaS platform undangan pernikahan digital elegan, wedding planner, auto blast WhatsApp, dan QR check-in tamu.",
              brand: {
                "@type": "Brand",
                name: "Satu Cerita",
              },
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "IDR",
                lowPrice: "49000",
                highPrice: "249000",
                offerCount: "6",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased text-gray-800 bg-[#faf8f8]">
        {children}
      </body>
    </html>
  );
}
