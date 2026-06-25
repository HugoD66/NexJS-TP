import { prisma } from "@/lib/prisma";
import ProductCard from "@/app/_components/product-card";

type Props = {
  slug: string;
};

export default async function SimilarProducts({ slug }: Props) {
  await new Promise(r => setTimeout(r, 2000));

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      similarTo: {
        include: { to: true },
      },
    },
  });

  const similar = product?.similarTo.map(r => r.to) ?? [];

  if (similar.length === 0) return null;

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
        {similar.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
