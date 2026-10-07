import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.playfrontier.xyz";

export const viewport: Viewport = {
  themeColor: "#070a12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Frontier (FRNT) — Chapter Wars",
    template: "%s | Frontier Chapter Wars",
  },
  description:
    "An on-chain observability and low-poly 3D visual world built around the Solana Token-2022 token Frontier ($FRNT). The world expands by Chapter as on-chain volume unlocks fresh territory.",
  applicationName: "Frontier Chapter Wars",
  keywords: [
    "Frontier",
    "FRNT",
    "Chapter Wars",
    "Solana",
    "Token-2022",
    "Transfer Hook",
    "On-chain Observability",
    "Meteora",
    "DeFi",
    "3D World",
    "Low-Poly",
    "Web3",
  ],
  authors: [{ name: "Frontier Protocol", url: siteUrl }],
  creator: "Frontier Protocol",
  publisher: "Frontier Protocol",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Frontier (FRNT) — Chapter Wars",
    description:
      "On-chain observability and 3D visual world for Token-2022 token Frontier ($FRNT). The world expands by Chapter.",
    url: siteUrl,
    siteName: "Frontier Chapter Wars",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 675,
        alt: "Frontier ($FRNT) Chapter Wars",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frontier (FRNT) — Chapter Wars",
    description:
      "On-chain observability and 3D visual world for Token-2022 token Frontier ($FRNT). The world expands by Chapter.",
    creator: "@PlayFRNTonSol",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/logo.png",
    shortcut: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-frontier-bg text-frontier-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
