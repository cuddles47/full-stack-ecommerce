import type { Metadata } from "next";
import { Providers } from './providers';
import "./globals.css";

export const metadata: Metadata = {
  title: "KIWEY",
  description: "KIWEY Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-timesnewroman">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
