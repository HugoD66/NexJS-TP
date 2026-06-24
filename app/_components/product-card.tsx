import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { BLUR_PLACEHOLDER } from "@/lib/blur-placeholder";
import styles from "@/app/styles/product-card.module.css";

type Props = {
  product: Product;
  featured?: boolean;
};

export default function ProductCard({ product, featured = false }: Props) {
  return (
    <Link
      href={`/products/${product.slug}`}
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
