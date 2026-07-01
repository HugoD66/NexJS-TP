import { test, expect } from "@playwright/test";

test("bascule la langue de français à anglais sans rechargement complet", async ({ page, context, baseURL }) => {
  // Force une locale de départ connue (fr), indépendamment de l'Accept-Language du navigateur de test
  await context.addCookies([
    { name: "NEXT_LOCALE", value: "fr", url: baseURL },
  ]);

  await page.goto("/");
  await expect(page.getByRole("link", { name: "Connexion" })).toBeVisible();

  const urlBefore = page.url();

  await page.getByRole("button", { name: "EN", exact: true }).click();

  await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
  expect(page.url()).toBe(urlBefore);

  const cookies = await context.cookies();
  expect(cookies.find((c) => c.name === "NEXT_LOCALE")?.value).toBe("en");
});
