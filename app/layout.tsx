import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Image from "next/image";
import "./styles/globals.css";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import WebVitals from "./_components/web-vitals";
import SwRegister from "./_components/sw-register";

const pressStart2P = localFont({
  src: "./fonts/PressStart2P.woff2",
  variable: "--font-press-start",
  display: "swap",
});

const vt323 = localFont({
  src: "./fonts/VT323.woff2",
  variable: "--font-vt323",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: { default: "Pixel Palace", template: "%s | Pixel Palace" },
  description: "Boutique en ligne spécialisée dans le rétro gaming",
};

export const viewport: Viewport = {
  themeColor: "#7B2FFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className={`min-h-full flex flex-col antialiased ${pressStart2P.variable} ${vt323.variable}`}>
        <WebVitals />
        <SwRegister />
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "55vw",
          height: "55vw",
          opacity: 0.15,
          pointerEvents: "none",
          zIndex: 0,
        }}>
          <Image
            src="/pixel-palace-icon-work.png"
            alt=""
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Suspense fallback={<div style={{ height: "65px", background: "rgba(13, 13, 26, 0.85)" }} />}>
            <Navbar />
          </Suspense>
          <main className="flex-1" style={{ paddingBottom: "4rem" }}>{children}</main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </div>
      </body>
    </html>
  );
}
