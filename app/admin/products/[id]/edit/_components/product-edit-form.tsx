"use client";

import { useActionState } from "react";
import type { Product } from "@/lib/generated/prisma/client";
import { updateProduct, type UpdateProductState } from "../actions";

type Props = { product: Product };

const initialState: UpdateProductState = {};

export default function ProductEditForm({ product }: Props) {
  const updateProductWithId = updateProduct.bind(null, product.id);
  const [state, action, isPending] = useActionState(updateProductWithId, initialState);

  return (
    <form
      action={action}
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
      <Field label="NOM" name="name" defaultValue={product.name} errors={state.errors?.name} />
      <Field label="CATÉGORIE" name="category" defaultValue={product.category} errors={state.errors?.category} />
      <Field label="PRIX (€)" name="price" type="number" defaultValue={String(product.price)} errors={state.errors?.price} />
      <Field label="SLUG" name="slug" defaultValue={product.slug} errors={state.errors?.slug} />
      <Field label="IMAGE" name="image" defaultValue={product.image} errors={state.errors?.image} />
      <Field label="DESCRIPTION" name="description" defaultValue={product.description} textarea errors={state.errors?.description} />
      <Field label="SPECS" name="specs" defaultValue={product.specs} textarea errors={state.errors?.specs} />

      {state.globalError && (
        <div style={{
          padding: "0.75rem 1rem",
          background: "rgba(255, 60, 60, 0.1)",
          border: "1px solid rgba(255, 60, 60, 0.4)",
          borderRadius: "3px",
          color: "#ff3c3c",
          fontSize: "0.7rem",
          letterSpacing: "0.05em",
        }}>
          ⚠ {state.globalError}
        </div>
      )}

      <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
        <button type="submit" disabled={isPending} style={submitStyle(isPending)}>
          {isPending ? "ENREGISTREMENT…" : "ENREGISTRER"}
        </button>
        <button
          type="submit"
          name="_trigger_error"
          value="1"
          disabled={isPending}
          style={errorBtnStyle(isPending)}
        >
          TESTER ERREUR
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
  errors?: string[];
};

function Field({ label, name, defaultValue, type = "text", textarea = false, errors }: FieldProps) {
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
          style={{ ...inputStyle, ...(errors ? errorBorder : {}) }}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          defaultValue={defaultValue}
          step={type === "number" ? "0.01" : undefined}
          style={{ ...inputStyle, ...(errors ? errorBorder : {}) }}
        />
      )}
      {errors && (
        <span style={{ color: "#ff3c3c", fontSize: "0.65rem", letterSpacing: "0.05em" }}>
          {errors[0]}
        </span>
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

const errorBorder: React.CSSProperties = {
  border: "1px solid rgba(255, 60, 60, 0.6)",
};

const errorBtnStyle = (isPending: boolean): React.CSSProperties => ({
  padding: "0.65rem 1.5rem",
  background: isPending ? "rgba(123,47,255,0.2)" : "transparent",
  color: "var(--arcade-purple, #7b2fff)",
  border: "1px solid var(--arcade-purple, #7b2fff)",
  borderRadius: "3px",
  fontSize: "0.6rem",
  letterSpacing: "0.12em",
  fontFamily: "monospace",
  cursor: isPending ? "not-allowed" : "pointer",
  transition: "all 0.2s",
});

const submitStyle = (isPending: boolean): React.CSSProperties => ({
  padding: "0.65rem 1.5rem",
  background: isPending ? "rgba(255,60,60,0.4)" : "#ff3c3c",
  color: "#fff",
  border: "none",
  borderRadius: "3px",
  fontSize: "0.6rem",
  letterSpacing: "0.12em",
  fontFamily: "monospace",
  cursor: isPending ? "not-allowed" : "pointer",
  boxShadow: isPending ? "none" : "0 0 10px rgba(255,60,60,0.4)",
  transition: "all 0.2s",
});
