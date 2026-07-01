import { getLocale, getDictionary, type Locale } from "@/lib/i18n";

export default async function Footer() {
  const locale = await getLocale();
  return <CachedFooter locale={locale} />;
}

async function CachedFooter({ locale }: { locale: Locale }) {
  "use cache";
  const dict = getDictionary(locale);

  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: "1px solid rgba(123, 47, 255, 0.3)",
        background: "rgba(13, 13, 26, 0.85)",
        backdropFilter: "blur(8px)",
        padding: "1rem 2rem",
        color: "var(--text-muted)",
        fontSize: "0.75rem",
        letterSpacing: "0.05em",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        zIndex: 50,
      }}
    >
      <span>© {new Date().getFullYear()} PIXEL PALACE — Rétro Gaming</span>
      <span>{dict.footer.author}</span>
      <span>{dict.footer.project}</span>
    </footer>
  );
}
