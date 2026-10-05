import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frontier — Chapter Wars",
  description:
    "An on-chain observability and visual world built around the Frontier (FRNT) token. The world expands by Chapter.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className="min-h-screen bg-frontier-bg text-frontier-ink">
        {children}
      </body>
    </html>
  );
}
