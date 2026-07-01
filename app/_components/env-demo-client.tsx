"use client";

import { useEffect, useState } from "react";

const rowStyle = {
  background: "var(--bg-surface)",
  border: "1px solid rgba(123,47,255,0.3)",
  borderRadius: "4px",
  padding: "1.5rem",
  fontFamily: "var(--font-vt323)",
  fontSize: "1.1rem",
};

export default function EnvDemoClient() {
  const [apiResult, setApiResult] = useState<{
    publicSiteName?: string;
    privateDemoSecret?: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/env-demo")
      .then((res) => res.json())
      .then(setApiResult);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2
        style={{
          fontFamily: "var(--font-press-start)",
          color: "var(--neon-blue)",
          fontSize: "0.75rem",
          marginTop: "1rem",
        }}
      >
        Côté client
      </h2>

      <div style={rowStyle}>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
          Lecture directe de <code>NEXT_PUBLIC_SITE_NAME</code> dans le bundle client
        </p>
        <p>
          Valeur :{" "}
          <span style={{ color: "var(--neon-blue)", fontWeight: "bold" }}>
            {String(process.env.NEXT_PUBLIC_SITE_NAME)}
          </span>
        </p>
      </div>

      <div style={rowStyle}>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
          Lecture directe de <code>PRIVATE_DEMO_SECRET</code> dans le bundle client (pas de préfixe
          <code> NEXT_PUBLIC_</code>)
        </p>
        <p>
          Valeur :{" "}
          <span style={{ color: "var(--neon-pink)", fontWeight: "bold" }}>
            {String(process.env.PRIVATE_DEMO_SECRET)}
          </span>
        </p>
      </div>

      <div style={rowStyle}>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
          Même variable privée, récupérée via <code>fetch(&quot;/api/env-demo&quot;)</code> (route
          server-side qui l&apos;expose explicitement)
        </p>
        <p>
          Valeur :{" "}
          <span style={{ color: "var(--neon-pink)", fontWeight: "bold" }}>
            {apiResult ? String(apiResult.privateDemoSecret) : "chargement..."}
          </span>
        </p>
      </div>
    </div>
  );
}
