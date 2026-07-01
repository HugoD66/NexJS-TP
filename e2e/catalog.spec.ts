import { test, expect } from "@playwright/test";

test("affiche le catalogue avec au moins un produit et un prix formaté", async ({ page, context, baseURL }) => {
  // Force la locale française, indépendamment de l'Accept-Language du navigateur de test
  await context.addCookies([{ name: "NEXT_LOCALE", value: "fr", url: baseURL }]);

  await page.goto("/products");

  await expect(page.getByRole("heading", { name: "CATALOGUE" })).toBeVisible();

  const cards = page.locator('a[href^="/products/"]');
  await expect(cards.first()).toBeVisible();
  await expect(cards.first().getByText(/\d+[.,]\d{2}\s?€/)).toBeVisible();
});
