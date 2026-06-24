import { prisma } from "@/lib/prisma";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { id: "asc" } });

  const th: React.CSSProperties = {
    textAlign: "left",
    padding: "0.6rem 1rem",
    fontSize: "0.6rem",
    letterSpacing: "0.12em",
    color: "#666",
    borderBottom: "1px solid #222",
    whiteSpace: "nowrap",
  };

  const td: React.CSSProperties = {
    padding: "0.75rem 1rem",
    fontSize: "0.75rem",
    borderBottom: "1px solid #1a1a1a",
    color: "#ccc",
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1rem", letterSpacing: "0.08em", color: "#e0e0e0", margin: 0 }}>
          PRODUITS
        </h1>
        <span style={{ fontSize: "0.65rem", color: "#555" }}>{products.length} entrées</span>
      </div>

      <div style={{ border: "1px solid #1e1e1e", borderRadius: "4px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#111" }}>
            <tr>
              <th style={th}>ID</th>
              <th style={th}>NOM</th>
              <th style={th}>CATÉGORIE</th>
              <th style={th}>PRIX</th>
              <th style={th}>SLUG</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr
                key={p.id}
                style={{ background: i % 2 === 0 ? "#0d0d0d" : "#111" }}
              >
                <td style={{ ...td, color: "#555", width: "40px" }}>{p.id}</td>
                <td style={{ ...td, color: "#e0e0e0" }}>{p.name}</td>
                <td style={{ ...td, color: "#888" }}>{p.category}</td>
                <td style={{ ...td, color: "#ff3c3c", fontWeight: "bold" }}>
                  {p.price.toFixed(2)} €
                </td>
                <td style={{ ...td, color: "#555", fontFamily: "monospace", fontSize: "0.7rem" }}>
                  {p.slug}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
