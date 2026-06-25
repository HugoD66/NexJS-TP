import { connection } from "next/server";
import { computePrimes, getCachedPrimes } from "@/lib/primes";

const LIMIT = 10_000_000;

export default async function PrimesPage() {
  await connection();

  const t1 = performance.now();
  const primes = computePrimes(LIMIT);
  const durationRaw = (performance.now() - t1).toFixed(1);

  const t2 = performance.now();
  const primesCached = await getCachedPrimes(LIMIT);
  const durationCached = (performance.now() - t2).toFixed(1);

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
        Crible d&apos;Ératosthène
      </h1>

      <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginBottom: "2rem" }}>
        Limite : {LIMIT.toLocaleString("fr-FR")} — {primes.length.toLocaleString("fr-FR")} nombres premiers
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid rgba(123,47,255,0.3)",
            borderRadius: "4px",
            padding: "1.5rem",
            fontFamily: "var(--font-vt323)",
            fontSize: "1.1rem",
            lineHeight: 2,
          }}
        >
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
            Sans cache
          </p>
          <p>
            Temps :{" "}
            <span style={{ color: "var(--neon-pink)", fontWeight: "bold" }}>
              {durationRaw} ms
            </span>
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
            Recalcul complet à chaque requête
          </p>
        </div>

        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid rgba(0,212,255,0.3)",
            borderRadius: "4px",
            padding: "1.5rem",
            fontFamily: "var(--font-vt323)",
            fontSize: "1.1rem",
            lineHeight: 2,
          }}
        >
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
            Avec <code>unstable_cache</code>
          </p>
          <p>
            Temps :{" "}
            <span style={{ color: "var(--neon-blue)", fontWeight: "bold" }}>
              {durationCached} ms
            </span>
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
            {primesCached.length.toLocaleString("fr-FR")} nombres — revalidate: 3600s
          </p>
        </div>
      </div>
    </div>
  );
}
