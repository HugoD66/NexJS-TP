import EnvDemoClient from "@/app/_components/env-demo-client";

const rowStyle = {
  background: "var(--bg-surface)",
  border: "1px solid rgba(0,212,255,0.3)",
  borderRadius: "4px",
  padding: "1.5rem",
  fontFamily: "var(--font-vt323)",
  fontSize: "1.1rem",
};

export default function EnvDemoPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "4rem auto", padding: "0 2rem" }}>
      <h1
        style={{
          fontFamily: "var(--font-press-start)",
          color: "var(--arcade-purple)",
          fontSize: "0.9rem",
          marginBottom: "2rem",
        }}
      >
        Variables d&apos;environnement
      </h1>

      <h2
        style={{
          fontFamily: "var(--font-press-start)",
          color: "var(--neon-blue)",
          fontSize: "0.75rem",
          marginBottom: "1rem",
        }}
      >
        Côté serveur
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={rowStyle}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
            Variable publique <code>NEXT_PUBLIC_SITE_NAME</code>
          </p>
          <p>
            Valeur :{" "}
            <span style={{ color: "var(--neon-blue)", fontWeight: "bold" }}>
              {process.env.NEXT_PUBLIC_SITE_NAME}
            </span>
          </p>
        </div>

        <div style={rowStyle}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
            Variable privée <code>DATABASE_URL</code> (sans préfixe <code>NEXT_PUBLIC_</code>) —
            lisible car ce composant s&apos;exécute uniquement côté serveur
          </p>
          <p>
            Valeur :{" "}
            <span style={{ color: "var(--neon-pink)", fontWeight: "bold" }}>
              {process.env.DATABASE_URL}
            </span>
          </p>
        </div>
      </div>

      <EnvDemoClient />
    </div>
  );
}
