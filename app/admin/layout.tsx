import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, background: "#0a0a0a", color: "#e0e0e0", fontFamily: "monospace", minHeight: "100vh" }}>
        <header
          style={{
            background: "#111",
            borderBottom: "1px solid rgba(255,60,60,0.4)",
            padding: "0.75rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span
              style={{
                color: "#ff3c3c",
                fontSize: "0.7rem",
                fontWeight: "bold",
                letterSpacing: "0.15em",
                textShadow: "0 0 8px #ff3c3c",
              }}
            >
              ⬡ ADMIN
            </span>
            <span style={{ color: "#333", fontSize: "0.7rem" }}>|</span>
            <Link
              href="/admin/products"
              style={{ color: "#888", fontSize: "0.65rem", letterSpacing: "0.1em", textDecoration: "none" }}
            >
              PRODUITS
            </Link>
          </div>
          <Link
            href="/"
            style={{ color: "#555", fontSize: "0.6rem", letterSpacing: "0.1em", textDecoration: "none" }}
          >
            ← Retour au site
          </Link>
        </header>

        <main style={{ padding: "2rem" }}>{children}</main>
      </body>
    </html>
  );
}
