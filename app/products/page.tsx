import { prisma } from "@/lib/prisma";
import { getLocale, getDictionary } from "@/lib/i18n";
import ProductCard from "@/app/_components/product-card";

export default async function ProductsPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const products = await prisma.product.findMany({ orderBy: { id: "asc" } });

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>
      <h1
        style={{
          color: "var(--arcade-purple)",
          fontSize: "1.5rem",
          letterSpacing: "0.05em",
          marginBottom: "0.5rem",
          textShadow: "0 0 8px var(--arcade-purple)",
        }}
      >
        {dict.products.title}
      </h1>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "3rem" }}>
        {dict.products.count.replace("{count}", String(products.length))}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
