import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductEditForm from "./_components/product-edit-form";

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id: Number(id) } });

  if (!product) notFound();

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        <Link
          href="/admin/products"
          style={{ color: "#555", fontSize: "0.6rem", letterSpacing: "0.1em", textDecoration: "none" }}
        >
          ← PRODUITS
        </Link>
        <span style={{ color: "#333", fontSize: "0.6rem" }}>/</span>
        <h1 style={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: "#e0e0e0", margin: 0 }}>
          MODIFIER #{product.id}
        </h1>
      </div>

      <ProductEditForm product={product} />
    </div>
  );
}
