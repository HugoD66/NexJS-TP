import { describe, it, expect } from "vitest";
import { productSchema } from "./schema";

const validProduct = {
  name: "Nintendo Entertainment System",
  category: "Console",
  price: "129.99",
  slug: "nes",
  image: "/products/nes.png",
  description: "La console qui a sauvé l'industrie du jeu vidéo en 1983.",
  specs: "CPU : MOS 6502 @ 1.79 MHz",
};

describe("productSchema", () => {
  it("accepte un produit valide", () => {
    const result = productSchema.safeParse(validProduct);
    expect(result.success).toBe(true);
  });

  it("rejette un prix négatif", () => {
    const result = productSchema.safeParse({ ...validProduct, price: "-10" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.price).toBeDefined();
    }
  });

  it("rejette un slug invalide (majuscules/espaces)", () => {
    const result = productSchema.safeParse({ ...validProduct, slug: "NES Console" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.slug).toBeDefined();
    }
  });

  it("rejette un nom vide", () => {
    const result = productSchema.safeParse({ ...validProduct, name: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name).toBeDefined();
    }
  });
});
