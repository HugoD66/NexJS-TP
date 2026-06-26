import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import type { Product } from "@/lib/generated/prisma/client";
import { BLUR_PLACEHOLDER } from "@/lib/blur-placeholder";
import styles from "@/app/styles/product-card.module.css";

type Props = {
  product: Product;
  featured?: boolean;
};

export default async function ProductCard({ product, featured = false }: Props) {
  const cookieStore = await cookies();
  const shouldPrefetch = cookieStore.get("ab_prefetch")?.value !== "B";

  return (
    <Link
      href={`/products/${product.slug}`}
      prefetch={shouldPrefetch}
      className={`${styles.card} ${featured ? styles.cardFeatured : ""}`}
    >
      <div className={`${styles.imageWrapper} ${featured ? styles.imageWrapperFeatured : ""}`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
          sizes={
            featured
              ? "(max-width: 640px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
        <span className={styles.badge}>{product.category}</span>
        {featured && <span className={styles.featuredBadge}>★ SÉLECTION</span>}
      </div>

      <div className={`${styles.content} ${featured ? styles.contentFeatured : ""}`}>
        <h2 className={`${styles.name} ${featured ? styles.nameFeatured : ""}`}>
          {product.name}
        </h2>
        {featured && (
          <p className={styles.featuredDesc}>
            {product.description.length > 130
              ? product.description.slice(0, 130) + "…"
              : product.description}
          </p>
        )}
        <p className={`${styles.price} ${featured ? styles.priceFeatured : ""}`}>
          {product.price.toFixed(2)} €
        </p>
      </div>
    </Link>
  );
}
