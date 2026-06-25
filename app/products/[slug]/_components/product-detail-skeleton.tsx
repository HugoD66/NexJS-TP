import styles from "@/app/styles/product-loading.module.css";

export default function ProductDetailSkeleton() {
  return (
    <div className={styles.grid}>
      <div className={`${styles.image} ${styles.skeleton}`} />
      <div className={styles.infoBlock}>
        <div>
          <div className={`${styles.badge} ${styles.skeleton}`} />
          <div className={`${styles.title} ${styles.skeleton}`} />
        </div>
        <div className={`${styles.price} ${styles.skeleton}`} />
        <div className={`${styles.tabs} ${styles.skeleton}`} />
        <div className={`${styles.button} ${styles.skeleton}`} />
      </div>
    </div>
  );
}
