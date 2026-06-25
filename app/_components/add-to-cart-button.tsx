"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddToCartButton({ productId }: { productId: number }) {
  const router = useRouter();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1500);
    return () => clearTimeout(timer);
  }, [added]);

  async function handleClick() {
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    setAdded(true);
    router.refresh();
  }

  return (
    <button
      onClick={handleClick}
      style={{
        background: added ? "var(--neon-pink)" : "var(--arcade-purple)",
        color: "white",
        border: "none",
        padding: "1rem 2rem",
        borderRadius: "4px",
        fontSize: "0.75rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        cursor: "pointer",
        width: "100%",
        transition: "background 200ms, box-shadow 200ms",
        boxShadow: added ? "var(--glow-pink)" : "none",
        fontFamily: "var(--font-press-start), monospace",
      }}
    >
      {added ? "✓ Ajouté !" : "Ajouter au panier"}
    </button>
  );
}
