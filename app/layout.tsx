import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

export const metadata: Metadata = {
  title: "Pixel Palace",
  description: "Boutique en ligne spécialisée dans le rétro gaming",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
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
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
