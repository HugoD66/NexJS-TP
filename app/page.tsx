import Link from "next/link";
import { getProducts } from "@/lib/products";
import ProductCard from "./_components/product-card";
import styles from "./styles/home.module.css";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const { category } = await searchParams;
  const allProducts = getProducts();

  const counts = {
    Console:    allProducts.filter(p => p.category === "Console").length,
    Jeu:        allProducts.filter(p => p.category === "Jeu").length,
    Accessoire: allProducts.filter(p => p.category === "Accessoire").length,
  };

  const filtered = category
    ? allProducts.filter(p => p.category === category)
    : allProducts;

  const isFiltered = Boolean(category);

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <span className={styles.glitch}>PIXEL PALACE</span>
        <p className={styles.tagline}>Votre destination rétro gaming depuis 1983</p>

        <div className={styles.stats}>
          <Link
            href="/"
            className={`${styles.stat} ${!isFiltered ? styles.statActive : ""}`}
          >
            <span className={styles.statValue}>{allProducts.length}</span>
            <span className={styles.statLabel}>Tout</span>
          </Link>
          <Link
            href="?category=Console"
            className={`${styles.stat} ${category === "Console" ? styles.statActive : ""}`}
          >
            <span className={styles.statValue}>{counts.Console}</span>
            <span className={styles.statLabel}>Consoles</span>
          </Link>
          <Link
            href="?category=Jeu"
            className={`${styles.stat} ${category === "Jeu" ? styles.statActive : ""}`}
          >
            <span className={styles.statValue}>{counts.Jeu}</span>
            <span className={styles.statLabel}>Jeux</span>
          </Link>
          <Link
            href="?category=Accessoire"
            className={`${styles.stat} ${category === "Accessoire" ? styles.statActive : ""}`}
          >
            <span className={styles.statValue}>{counts.Accessoire}</span>
            <span className={styles.statLabel}>Accessoires</span>
          </Link>
        </div>
      </section>

      {/* GRID */}
      <div className={styles.container}>
        <div className={styles.grid}>
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className={i === 0 && !isFiltered ? styles.featuredSlot : ""}
            >
              <ProductCard product={product} featured={i === 0 && !isFiltered} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
