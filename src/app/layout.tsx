import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import LiquidCursor from "@/components/LiquidCursor";
import ClientOnly from "@/components/ClientOnly";

export const metadata: Metadata = {
  title: "<Shiin/> Portfolio | Full-Stack Developer & Thesis Developer",
  description:
    "Shiin (Ken Narzabal) — Full-Stack Developer & Thesis Developer. React, PHP, MySQL, TypeScript and more.",
  keywords: [
    "Shiin",
    "Ken Narzabal",
    "Full-Stack Developer",
    "React",
    "Portfolio",
    "Thesis Developer",
  ],
  authors: [{ name: "Shiin (Ken Narzabal)" }],
  openGraph: {
    title: "<Shiin/> Portfolio | Full-Stack Developer & Thesis Developer",
    description:
      "Shiin (Ken Narzabal) — Full-Stack Developer, Designer & Thesis Developer based in Tayabas City, Quezon.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500;600;700&family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,400&family=Roboto+Mono:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <SmoothScrollProvider />
        <ClientOnly>
          <LiquidCursor />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
