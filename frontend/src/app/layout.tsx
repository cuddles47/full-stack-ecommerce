import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from './providers';

const outfitFont = localFont({
  src: "../assets/fonts/Outfit-VariableFont.ttf",
  fallback: ["sans-serif", "system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "BITEX",
  description: "Electronic Shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfitFont.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
