"use server";

import { revalidateTag, revalidatePath } from "next/cache";

// Approche 1 — ciblée par tag : invalide uniquement les fetches taggués 'sponsored-products'
export async function revalidateSponsoredProducts() {
  revalidateTag("sponsored-products", {});
}

// Approche 2 — par chemin : invalide toutes les données d'une route entière
export async function revalidateSponsoredPath() {
  revalidatePath("/");
  revalidatePath("/products/[slug]", "page");
}
