import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import ProductDetail from "./_components/product-detail";
import ProductDetailSkeleton from "./_components/product-detail-skeleton";

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map(({ slug }) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetail slug={slug} />
    </Suspense>
  );
}
