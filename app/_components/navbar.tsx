import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "./breadcrumb";
import CartSummary from "./cart-summary";
import LanguageSwitcher from "./language-switcher";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { signout } from "@/app/_actions/auth";
import { getLocale, getDictionary } from "@/lib/i18n";

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0].toUpperCase())
    .slice(0, 3)
    .join("");
}

async function NavAuth({ dict }: { dict: ReturnType<typeof getDictionary> }) {
  const session = await getSession();
  if (!session) {
    return (
      <>
        <li>
          <Link href="/login" style={navLinkStyle}>
            {dict.nav.login}
          </Link>
        </li>
        <li>
          <Link href="/register" style={{ ...navLinkStyle, color: "var(--neon-blue)" }}>
            {dict.nav.register}
          </Link>
        </li>
      </>
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { name: true, role: true },
  });

  if (!user) return null;

  const initials = getInitials(user.name);

  return (
    <>
      {user.role === "admin" && (
        <li>
          <Link href="/admin/products" style={{ ...navLinkStyle, color: "var(--neon-pink)" }}>
            {dict.nav.admin}
          </Link>
        </li>
      )}
      <li style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {/* Trigramme */}
        <span
          title={user.name}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "var(--arcade-purple)",
            color: "#fff",
            fontSize: "0.65rem",
            fontFamily: "var(--font-press-start), monospace",
            boxShadow: "var(--glow-purple)",
            flexShrink: 0,
          }}
        >
          {initials}
        </span>
        {/* Signout */}
        <form action={signout}>
          <button
            type="submit"
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              fontSize: "1rem",
              fontFamily: "var(--font-vt323), monospace",
              cursor: "pointer",
              padding: 0,
            }}
          >
            {dict.nav.logout}
          </button>
        </form>
      </li>
    </>
  );
}

export default async function Navbar() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

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

          <Suspense fallback={null}>
            <Breadcrumb homeLabel={dict.nav.home} />
          </Suspense>
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
            <LanguageSwitcher locale={locale} />
          </li>
          <li>
            <Suspense fallback={<span style={{ fontSize: "1.1rem" }}>🛒</span>}>
              <CartSummary />
            </Suspense>
          </li>
          <Suspense fallback={<li style={{ width: "80px" }} />}>
            <NavAuth dict={dict} />
          </Suspense>
        </ul>
      </nav>
    </header>
  );
}

const navLinkStyle: React.CSSProperties = {
  color: "var(--text-primary)",
  textDecoration: "none",
  fontSize: "1rem",
  fontFamily: "var(--font-vt323), monospace",
};
