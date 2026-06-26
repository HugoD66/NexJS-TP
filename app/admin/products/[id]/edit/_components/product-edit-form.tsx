"use client";

import type { Product } from "@/lib/generated/prisma/client";

type Props = { product: Product };

export default function ProductEditForm({ product }: Props) {
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        background: "#111",
        border: "1px solid #1e1e1e",
        borderRadius: "4px",
        padding: "2rem",
      }}
    >
      <Field label="NOM" name="name" defaultValue={product.name} />
      <Field label="CATÉGORIE" name="category" defaultValue={product.category} />
      <Field label="PRIX (€)" name="price" type="number" defaultValue={String(product.price)} />
      <Field label="SLUG" name="slug" defaultValue={product.slug} />
      <Field label="IMAGE" name="image" defaultValue={product.image} />
      <Field label="DESCRIPTION" name="description" defaultValue={product.description} textarea />
      <Field label="SPECS" name="specs" defaultValue={product.specs} textarea />

      <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
        <button type="submit" style={submitStyle}>
          ENREGISTRER
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  defaultValue: string;
  type?: string;
  textarea?: boolean;
};

function Field({ label, name, defaultValue, type = "text", textarea = false }: FieldProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label
        htmlFor={name}
        style={{ fontSize: "0.6rem", letterSpacing: "0.12em", color: "#555" }}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          defaultValue={defaultValue}
          rows={4}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue}
          step={type === "number" ? "0.01" : undefined}
          style={inputStyle}
        />
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: "#0d0d0d",
  border: "1px solid #222",
  borderRadius: "3px",
  padding: "0.6rem 0.75rem",
  color: "#ccc",
  fontSize: "0.75rem",
  fontFamily: "monospace",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};

const submitStyle: React.CSSProperties = {
  padding: "0.65rem 1.5rem",
  background: "#ff3c3c",
  color: "#fff",
  border: "none",
  borderRadius: "3px",
  fontSize: "0.6rem",
  letterSpacing: "0.12em",
  fontFamily: "monospace",
  cursor: "pointer",
  boxShadow: "0 0 10px rgba(255,60,60,0.4)",
};
