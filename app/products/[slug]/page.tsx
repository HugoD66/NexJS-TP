import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) notFound();

  return {
    title: product.name,
    description: product.description,
    keywords: [product.category, product.name],
    robots: { index: true, follow: true },
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  return (
    <>
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail slug={slug} />
      </Suspense>
      <Suspense fallback={<SimilarSkeleton />}>
        <SimilarProducts slug={slug} />
      </Suspense>
      <Suspense fallback={null}>
        <SponsoredProducts />
      </Suspense>
    </>
  );
}
