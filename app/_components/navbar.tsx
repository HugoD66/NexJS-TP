import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "./breadcrumb";

export default function Navbar() {
  return (
    <header
      style={{
        background: "rgba(13, 13, 26, 0.85)",
        borderBottom: "1px solid rgba(123, 47, 255, 0.3)",
        backdropFilter: "blur(8px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <nav
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0.75rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem",
        }}
      >
        {/* Gauche : logo + fil d'ariane */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", minWidth: 0 }}>
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <Image
              src="/pixel-palace-icon.png"
              alt="Pixel Palace"
              width={32}
              height={32}
            />
            <span
              style={{
                color: "var(--arcade-purple)",
                fontSize: "0.85rem",
                fontWeight: "bold",
                letterSpacing: "0.05em",
                textShadow: "0 0 8px var(--arcade-purple)",
                whiteSpace: "nowrap",
              }}
            >
              PIXEL PALACE
            </span>
          </Link>

          {/* séparateur vertical */}
          <span
            aria-hidden
            style={{
              width: "1px",
              height: "20px",
              background: "rgba(123, 47, 255, 0.4)",
              flexShrink: 0,
            }}
          />

          <Breadcrumb />
        </div>

        {/* Droite : liens + panier */}
        <ul
          style={{
            display: "flex",
            gap: "2rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <li>
            <Link
              href="/cart"
              aria-label="Panier"
              style={{
                color: "var(--text-muted)",
                textDecoration: "none",
                fontSize: "1.1rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              🛒
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
