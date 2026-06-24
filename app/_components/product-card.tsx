import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { BLUR_PLACEHOLDER } from "@/lib/blur-placeholder";
import styles from "@/app/styles/product-card.module.css";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={BLUR_PLACEHOLDER}
        />
        <span className={styles.badge}>{product.category}</span>
      </div>

      <div className={styles.content}>
        <h2 className={styles.name}>{product.name}</h2>
        <p className={styles.price}>{product.price.toFixed(2)} €</p>
      </div>
    </Link>
  );
}
