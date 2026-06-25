import Image from "next/image";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BLUR_PLACEHOLDER } from "@/lib/blur-placeholder";
import AddToCartButton from "@/app/_components/add-to-cart-button";
import ProductTabs from "./product-tabs";

export default async function ProductDetail({ slug }: { slug: string }) {
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) notFound();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "3rem",
        alignItems: "start",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "3/2",
          borderRadius: "4px",
          overflow: "hidden",
          border: "1px solid var(--bg-elevated)",
        }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
          priority
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <span
            style={{
              color: "var(--text-muted)",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {product.category}
          </span>
          <h1
            style={{
              color: "var(--text-primary)",
              fontSize: "1.2rem",
              letterSpacing: "0.03em",
              marginTop: "0.5rem",
            }}
          >
            {product.name}
          </h1>
        </div>

        <p style={{ color: "var(--neon-pink)", fontSize: "2rem", fontWeight: "bold" }}>
          {product.price.toFixed(2)} €
        </p>

        <Suspense fallback={<div style={{ height: "7rem" }} />}>
          <ProductTabs slug={slug} description={product.description} specs={product.specs} />
        </Suspense>

        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
}
