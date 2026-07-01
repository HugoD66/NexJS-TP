"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/styles/breadcrumb.module.css";

function buildCrumbs(pathname: string, homeLabel: string) {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = [{ label: homeLabel, href: "/" }];

  let path = "";
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    path += `/${segment}`;
    // saute "products" si ce n'est pas le dernier segment
    if (segment === "products" && i < segments.length - 1) continue;
    crumbs.push({
      label: segment.toUpperCase().replace(/-/g, " "),
      href: path,
    });
  }
  return crumbs;
}

export default function Breadcrumb({ homeLabel = "HOME" }: { homeLabel?: string }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const crumbs = buildCrumbs(pathname, homeLabel);

  return (
    <nav className={styles.wrapper}>
      {!isHome && (
        <Link href="/" className={styles.returnBtn}>
          ← RETOUR
        </Link>
      )}

      <ol className={styles.crumbs}>
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb.href} className={styles.item}>
              {i > 0 && (
                <span className={styles.saber} aria-hidden>
                  <span className={styles.saberHilt} />
                  <span className={styles.saberBlade} />
                </span>
              )}
              {isLast ? (
                <span className={styles.active}>{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className={styles.link}>
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
