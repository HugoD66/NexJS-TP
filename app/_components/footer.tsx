export default function Footer() {
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
      <span>Créé par Hugo Dessauw</span>
      <span>Projet réalisé dans le cadre d&apos;un TP Next.js</span>
    </footer>
  );
}
