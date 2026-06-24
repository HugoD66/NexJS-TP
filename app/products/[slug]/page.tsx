import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BLUR_PLACEHOLDER } from "@/lib/blur-placeholder";
import ProductCard from "@/app/_components/product-card";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: { category: product.category, slug: { not: slug } },
    take: 4,
    orderBy: { id: "asc" },
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>
      {/* Fiche produit */}
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

          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.7" }}>
            {product.description}
          </p>

          <div
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--bg-elevated)",
              borderRadius: "4px",
              padding: "1rem",
            }}
          >
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              Spécifications
            </p>
            <p style={{ color: "var(--text-primary)", fontSize: "0.85rem", lineHeight: "1.8" }}>
              {product.specs}
            </p>
          </div>

          <button
            style={{
              background: "var(--arcade-purple)",
              color: "white",
              border: "none",
              padding: "1rem 2rem",
              borderRadius: "4px",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Ajouter au panier
          </button>
        </div>
      </div>

      {/* Nos clients aiment aussi */}
      {related.length > 0 && (
        <section style={{ marginTop: "4rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                color: "var(--text-muted)",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Nos clients aiment aussi
            </span>
            <span
              style={{
                flex: 1,
                height: "1px",
                background: "linear-gradient(to right, rgba(123,47,255,0.4), transparent)",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
            }}
          >
            {related.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
