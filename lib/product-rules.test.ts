import { describe, it, expect } from "vitest";
import { formatPrice } from "./product-rules";

describe("formatPrice", () => {
  it("formate un prix avec deux décimales et le symbole euro", () => {
    expect(formatPrice(129.99)).toBe("129.99 €");
  });

  it("complète les décimales manquantes", () => {
    expect(formatPrice(0)).toBe("0.00 €");
  });

  it("arrondit correctement au centime", () => {
    expect(formatPrice(19.999)).toBe("20.00 €");
  });
});
