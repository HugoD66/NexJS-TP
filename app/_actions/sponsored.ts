"use server";

import { revalidatePath } from "next/cache";

// revalidateTag(tag, profile) dans Next.js 16 accepte un 2e arg profile — passer {}
// équivaut à expire:0 et provoque une boucle de re-fetch. On utilise revalidatePath à la place.
export async function revalidateSponsoredProducts() {
  revalidatePath("/", "layout");
}
