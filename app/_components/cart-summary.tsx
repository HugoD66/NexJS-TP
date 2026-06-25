import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export default async function CartSummary() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  const totalItems = cartId
    ? await prisma.cartItem
        .aggregate({ where: { cartId }, _sum: { quantity: true } })
        .then(r => r._sum.quantity ?? 0)
    : 0;

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
