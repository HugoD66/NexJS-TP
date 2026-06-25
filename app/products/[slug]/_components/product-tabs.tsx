"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Props = {
  slug: string;
  description: string;
  specs: string;
};

export default function ProductTabs({ slug, description, specs }: Props) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") === "specs" ? "specs" : "description";

  const tabStyle = (value: string): React.CSSProperties => ({
    padding: "0.5rem 1.25rem",
    fontSize: "0.6rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    textDecoration: "none",
    borderBottom: activeTab === value ? "2px solid var(--arcade-purple)" : "2px solid transparent",
    color: activeTab === value ? "var(--arcade-purple)" : "var(--text-muted)",
    transition: "color 150ms, border-color 150ms",
  });

  return (
    <div>
      <div style={{ display: "flex", borderBottom: "1px solid var(--bg-elevated)", marginBottom: "1rem" }}>
        <Link href={`/products/${slug}?tab=description`} style={tabStyle("description")}>
          Description
        </Link>
        <Link href={`/products/${slug}?tab=specs`} style={tabStyle("specs")}>
          Spécifications
        </Link>
      </div>

      {activeTab === "description" ? (
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.7", margin: 0 }}>
          {description}
        </p>
      ) : (
        <p style={{ color: "var(--text-primary)", fontSize: "0.85rem", lineHeight: "1.8", margin: 0 }}>
          {specs}
        </p>
      )}
    </div>
  );
}
