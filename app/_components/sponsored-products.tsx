import Image from "next/image";
import Link from "next/link";

const GQL_ENDPOINT = "https://graphqlstore.julienfroidefond.com/api/2024-01/graphql.json";

const QUERY = `{
  products(first: 4) {
    nodes {
      id
      title
      handle
      description
      featuredImage { url }
      priceRange {
        minVariantPrice { amount currencyCode }
      }
    }
  }
}`;

type SponsoredProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage: { url: string } | null;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
};

async function fetchSponsoredProducts(): Promise<SponsoredProduct[]> {
  const res = await fetch(GQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: QUERY }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  const { data } = await res.json();
  return data?.products?.nodes ?? [];
}

export default async function SponsoredProducts() {
  const products = await fetchSponsoredProducts();

  if (products.length === 0) return null;

  return (
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
            color: "var(--neon-pink)",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          ★ Produits sponsorisés
        </span>
        <span
          style={{
            flex: 1,
            height: "1px",
            background: "linear-gradient(to right, rgba(255,20,147,0.4), transparent)",
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
        {products.map(p => {
          const price = parseFloat(p.priceRange.minVariantPrice.amount);
          const currency = p.priceRange.minVariantPrice.currencyCode;

          return (
            <Link
              key={p.id}
              href={`/sponsored/${p.handle}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  border: "1px solid rgba(255,20,147,0.2)",
                  borderRadius: "4px",
                  overflow: "hidden",
                  background: "var(--bg-surface)",
                  transition: "border-color 150ms",
                }}
              >
                {p.featuredImage && (
                  <div style={{ position: "relative", aspectRatio: "3/2" }}>
                    <Image
                      src={p.featuredImage.url}
                      alt={p.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                )}
                <div style={{ padding: "0.75rem" }}>
                  <p
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.05em",
                      marginBottom: "0.4rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {p.title}
                  </p>
                  <p style={{ color: "var(--neon-pink)", fontSize: "0.75rem", fontWeight: "bold" }}>
                    {price.toFixed(2)} {currency}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
