"use client";

import Link from "next/link";
import { useCart } from "@/app/_context/cart-context";

export default function CartSummary() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      aria-label="Panier"
      style={{
        position: "relative",
        color: "var(--text-muted)",
        textDecoration: "none",
        fontSize: "1.1rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      🛒
      {totalItems > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-6px",
            right: "-8px",
            background: "var(--neon-pink)",
            color: "#fff",
            fontSize: "0.5rem",
            fontWeight: "bold",
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "var(--glow-pink)",
          }}
        >
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </Link>
  );
}
