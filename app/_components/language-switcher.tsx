"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";

const buttonStyle = (active: boolean): React.CSSProperties => ({
  background: "none",
  border: "none",
  color: active ? "var(--neon-blue)" : "var(--text-muted)",
  fontWeight: active ? "bold" : "normal",
  fontSize: "0.85rem",
  fontFamily: "var(--font-vt323), monospace",
  cursor: active ? "default" : "pointer",
  padding: 0,
});

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();

  function switchTo(next: Locale) {
    if (next === locale) return;
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
      <button type="button" onClick={() => switchTo("fr")} aria-pressed={locale === "fr"} style={buttonStyle(locale === "fr")}>
        FR
      </button>
      <span style={{ color: "var(--text-muted)" }}>/</span>
      <button type="button" onClick={() => switchTo("en")} aria-pressed={locale === "en"} style={buttonStyle(locale === "en")}>
        EN
      </button>
    </div>
  );
}
