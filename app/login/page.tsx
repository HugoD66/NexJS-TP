"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/app/_actions/auth";
import type { AuthState } from "@/app/_actions/auth";

const initialState: AuthState = {};

export default function LoginPage() {
  const [state, action, isPending] = useActionState(login, initialState);

  return (
    <div
      style={{
        maxWidth: "440px",
        margin: "4rem auto",
        padding: "2rem",
        background: "var(--bg-surface)",
        border: "1px solid rgba(123, 47, 255, 0.3)",
        borderRadius: "8px",
      }}
    >
      <h1
        style={{
          fontSize: "0.85rem",
          color: "var(--arcade-purple)",
          textShadow: "var(--glow-purple)",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        CONNEXION
      </h1>

      <form action={action} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {/* Email */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <label htmlFor="email" style={{ fontSize: "1rem", color: "var(--text-muted)" }}>
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            style={inputStyle}
          />
          {state.errors?.email && (
            <span style={errorStyle}>{state.errors.email[0]}</span>
          )}
        </div>

        {/* Mot de passe */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <label htmlFor="password" style={{ fontSize: "1rem", color: "var(--text-muted)" }}>
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            style={inputStyle}
          />
          {state.errors?.password && (
            <span style={errorStyle}>{state.errors.password[0]}</span>
          )}
        </div>

        {/* Erreur globale (credentials incorrects) */}
        {state.errors?.global && (
          <p style={{ ...errorStyle, textAlign: "center" }}>{state.errors.global[0]}</p>
        )}

        <button type="submit" disabled={isPending} style={buttonStyle(isPending)}>
          {isPending ? "CONNEXION…" : "SE CONNECTER"}
        </button>
      </form>

      <p style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "1rem", color: "var(--text-muted)" }}>
        Pas encore de compte ?{" "}
        <Link href="/register" style={{ color: "var(--neon-blue)", textDecoration: "none" }}>
          S&apos;inscrire
        </Link>
      </p>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: "var(--bg-elevated)",
  border: "1px solid rgba(123, 47, 255, 0.3)",
  borderRadius: "4px",
  padding: "0.65rem 0.875rem",
  color: "var(--text-primary)",
  fontSize: "1rem",
  fontFamily: "var(--font-vt323), monospace",
  outline: "none",
};

const errorStyle: React.CSSProperties = {
  color: "var(--neon-pink)",
  fontSize: "0.9rem",
};

const buttonStyle = (isPending: boolean): React.CSSProperties => ({
  marginTop: "0.5rem",
  padding: "0.75rem",
  background: isPending ? "rgba(123, 47, 255, 0.4)" : "var(--arcade-purple)",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  fontSize: "0.8rem",
  fontFamily: "var(--font-press-start), monospace",
  cursor: isPending ? "not-allowed" : "pointer",
  boxShadow: isPending ? "none" : "var(--glow-purple)",
  transition: "all 0.2s",
});
