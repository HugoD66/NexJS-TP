import styles from "./styles/loading.module.css";

export default function Loading() {
  return (
    <div className={styles.wrapper}>
      {/* Hero skeleton */}
      <div className={styles.heroSkeleton}>
        <div className={styles.titleBar} />
        <div className={styles.subtitleBar} />
        <div className={styles.statsRow}>
          <div className={styles.statBox} />
          <div className={styles.statBox} />
          <div className={styles.statBox} />
          <div className={styles.statBox} />
        </div>
      </div>

      {/* Grid skeleton — 6 cards */}
      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.cardImage} />
            <div className={styles.cardContent}>
              <div className={styles.cardTitle} />
              <div className={styles.cardPrice} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
