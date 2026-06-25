"use client";

import { useTransition } from "react";
import { revalidateSponsoredProducts } from "@/app/_actions/sponsored";

export default function RefreshSponsoredButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => revalidateSponsoredProducts())}
      disabled={isPending}
      style={{
        background: "transparent",
        border: "1px solid rgba(255,20,147,0.4)",
        color: isPending ? "var(--text-muted)" : "var(--neon-pink)",
        fontSize: "0.5rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "0.3rem 0.6rem",
        borderRadius: "4px",
        cursor: isPending ? "wait" : "pointer",
        transition: "opacity 150ms",
        opacity: isPending ? 0.5 : 1,
        fontFamily: "var(--font-press-start), monospace",
        flexShrink: 0,
      }}
    >
      {isPending ? "…" : "↺ Actualiser"}
    </button>
  );
}
