import Image from "next/image";
import { notFound } from "next/navigation";
import { getSponsoredProductByHandle, getAllSponsoredHandles } from "@/lib/sponsored";

export async function generateStaticParams() {
  const handles = await getAllSponsoredHandles();
  return handles.map(handle => ({ handle }));
}

type Props = {
  params: Promise<{ handle: string }>;
};

export default async function SponsoredProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getSponsoredProductByHandle(handle);

  if (!product) notFound();

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currency = product.priceRange.minVariantPrice.currencyCode;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          background: "rgba(255,20,147,0.1)",
          border: "1px solid rgba(255,20,147,0.3)",
          borderRadius: "4px",
          padding: "0.3rem 0.75rem",
          marginBottom: "2rem",
        }}
      >
        <span style={{ color: "var(--neon-pink)", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          ★ Produit sponsorisé
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "start",
        }}
      >
        {product.featuredImage && (
          <div
            style={{
              position: "relative",
              aspectRatio: "3/2",
              borderRadius: "4px",
              overflow: "hidden",
              border: "1px solid rgba(255,20,147,0.2)",
            }}
          >
            <Image
              src={product.featuredImage.url}
              alt={product.title}
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="50vw"
            />
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <h1
            style={{
              color: "var(--text-primary)",
              fontSize: "1.2rem",
              letterSpacing: "0.03em",
            }}
          >
            {product.title}
          </h1>

          <p style={{ color: "var(--neon-pink)", fontSize: "2rem", fontWeight: "bold" }}>
            {price.toFixed(2)} {currency}
          </p>

          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.85rem",
              lineHeight: 1.7,
            }}
          >
            {product.description}
          </p>

          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.6rem",
              letterSpacing: "0.1em",
              fontStyle: "italic",
            }}
          >
            Ce produit est sponsorisé — disponible chez nos partenaires.
          </p>
        </div>
      </div>
    </div>
  );
}
