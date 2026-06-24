export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(123, 47, 255, 0.3)",
        padding: "1.5rem 2rem",
        textAlign: "center",
        color: "var(--text-muted)",
        fontSize: "0.75rem",
        letterSpacing: "0.05em",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <span>© {new Date().getFullYear()} PIXEL PALACE — Rétro Gaming</span>
      <span>Créé par Hugo Dessauw</span>
      <span>Projet réalisé dans le cadre d&apos;un TP Next.js</span>
    </footer>
  );
}
