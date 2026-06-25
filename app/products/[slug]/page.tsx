import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import ProductDetail from "./_components/product-detail";
import ProductDetailSkeleton from "./_components/product-detail-skeleton";
import SimilarProducts from "./_components/similar-products";
import SimilarSkeleton from "./_components/similar-skeleton";
import SponsoredProducts from "@/app/_components/sponsored-products";

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
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail slug={slug} />
        <Suspense fallback={<SimilarSkeleton />}>
          <SimilarProducts slug={slug} />
        </Suspense>
        <Suspense fallback={null}>
          <SponsoredProducts />
        </Suspense>
      </Suspense>
    </div>
  );
}
