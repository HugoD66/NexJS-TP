import { test, expect } from "@playwright/test";

test("navigue depuis le catalogue vers une fiche produit", async ({ page }) => {
  await page.goto("/products");

  const firstCard = page.locator('a[href^="/products/"]').first();
  const productName = await firstCard.locator("h2").innerText();

  await firstCard.click();

  await expect(page).toHaveURL(/\/products\/[a-z0-9-]+$/);
  await expect(page.getByRole("heading", { name: productName })).toBeVisible();
  await expect(page.getByRole("button", { name: "Ajouter au panier" })).toBeVisible();
});
