import type { Metadata, Viewport } from "next";
import { inter } from "@/components/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "AliMatrix - Formularz",
  description: "Formularz do analizy finansowania potrzeb dzieci",
  metadataBase: new URL("https://alimatrix.app"),
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${inter.variable} antialiased min-h-screen bg-neutral-50`}
      >
        <main className="flex min-h-screen flex-col">{children}</main>
      </body>
    </html>
  );
}
