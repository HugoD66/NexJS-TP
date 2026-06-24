import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
];

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
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            textDecoration: "none",
          }}
        >
          <Image
            src="/pixel-palace-icon.png"
            alt="Pixel Palace"
            width={36}
            height={36}
          />
          <span
            style={{
              color: "var(--arcade-purple)",
              fontSize: "1rem",
              fontWeight: "bold",
              letterSpacing: "0.05em",
              textShadow: "0 0 8px var(--arcade-purple)",
            }}
          >
            PIXEL PALACE
          </span>
        </Link>

        <ul
          style={{
            display: "flex",
            gap: "2rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
            alignItems: "center",
          }}
        >
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                style={{
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  fontSize: "0.75rem",
                  letterSpacing: "0.05em",
                  transition: "color 200ms",
                }}
              >
                {label}
              </Link>
            </li>
          ))}

          <li>
            <Link
              href="/cart"
              aria-label="Panier"
              style={{
                color: "var(--text-muted)",
                textDecoration: "none",
                fontSize: "1.2rem",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
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
