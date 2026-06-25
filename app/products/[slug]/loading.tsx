import styles from "@/app/styles/product-loading.module.css";

export default function ProductLoading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <div className={styles.image} />
        <div className={styles.infoBlock}>
          <div>
            <div className={styles.badge} />
            <div className={styles.title} />
          </div>
          <div className={styles.price} />
          <div className={styles.tabs} />
          <div className={styles.button} />
        </div>
      </div>
    </div>
  );
}
