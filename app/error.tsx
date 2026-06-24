"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
      <span style={{ fontSize: "3rem" }}>⚠</span>

      <h1
        style={{
          color: "var(--neon-pink)",
          fontSize: "0.9rem",
          letterSpacing: "0.1em",
          textShadow: "var(--glow-pink)",
          margin: 0,
        }}
      >
        ERREUR SYSTÈME
      </h1>

      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: "1.7", margin: 0 }}>
        {error.message || "Une erreur inattendue s'est produite."}
      </p>

      {error.digest && (
        <p style={{ color: "var(--bg-elevated)", fontSize: "0.6rem", fontFamily: "monospace", margin: 0 }}>
          {error.digest}
        </p>
      )}

      <button
        onClick={reset}
        style={{
          background: "transparent",
          color: "var(--neon-pink)",
          border: "1px solid var(--neon-pink)",
          padding: "0.75rem 2rem",
          borderRadius: "4px",
          fontSize: "0.65rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          cursor: "pointer",
          fontFamily: "var(--font-press-start), monospace",
          transition: "background 200ms, box-shadow 200ms",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,45,120,0.15)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "var(--glow-pink)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
        }}
      >
        ↺ Réessayer
      </button>
    </div>
  );
}
