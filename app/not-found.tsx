import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "6rem auto",
        padding: "0 2rem",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
      }}
    >
      <p
        style={{
          fontSize: "5rem",
          fontWeight: "bold",
          color: "var(--arcade-purple)",
          textShadow: "var(--glow-purple)",
          lineHeight: 1,
          margin: 0,
          fontFamily: "var(--font-press-start), monospace",
        }}
      >
        404
      </p>

      <h1
        style={{
          color: "var(--text-primary)",
          fontSize: "0.8rem",
          letterSpacing: "0.1em",
          margin: 0,
        }}
      >
        PAGE INTROUVABLE
      </h1>

      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "0.85rem",
          lineHeight: "1.7",
          margin: 0,
        }}
      >
        Cette cartouche n&apos;existe pas dans notre catalogue.
      </p>

      <Link
        href="/"
        style={{
          color: "var(--neon-blue)",
          border: "1px solid var(--neon-blue)",
          padding: "0.75rem 2rem",
          borderRadius: "4px",
          fontSize: "0.65rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          textDecoration: "none",
          fontFamily: "var(--font-press-start), monospace",
          transition: "background 200ms, box-shadow 200ms",
        }}
      >
        ← Retour à l&apos;accueil
      </Link>
    </div>
  );
}
