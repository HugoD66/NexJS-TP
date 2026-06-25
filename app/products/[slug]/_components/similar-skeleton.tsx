import styles from "@/app/styles/product-loading.module.css";

export default function SimilarSkeleton() {
  return (
    <section style={{ marginTop: "4rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div
          className={styles.skeleton}
          style={{ height: "0.6rem", width: "12rem", borderRadius: "4px" }}
        />
        <span
          style={{
            flex: 1,
            height: "1px",
            background: "linear-gradient(to right, rgba(123,47,255,0.4), transparent)",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <div
              className={styles.skeleton}
              style={{ aspectRatio: "3/2", borderRadius: "4px", marginBottom: "0.75rem" }}
            />
            <div
              className={styles.skeleton}
              style={{ height: "0.8rem", width: "80%", marginBottom: "0.4rem" }}
            />
            <div
              className={styles.skeleton}
              style={{ height: "0.8rem", width: "40%" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
