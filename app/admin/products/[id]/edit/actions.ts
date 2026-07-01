"use server";

import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { productSchema, type UpdateProductState } from "./schema";

export async function updateProduct(
  id: number,
  _prevState: UpdateProductState,
  formData: FormData
): Promise<UpdateProductState> {
  // Bouton "test erreur" : déclenche intentionnellement une erreur
  if (formData.get("_trigger_error") === "1") {
    return { globalError: "Erreur simulée : la mise à jour a échoué volontairement (test)." };
  }

  const result = productSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  try {
    await prisma.product.update({
      where: { id },
      data: result.data,
    });
  } catch {
    return { globalError: "Erreur base de données : la mise à jour a échoué. Réessayez." };
  }

  revalidateTag("products", "max");
  revalidatePath("/admin/products");
  revalidatePath(`/products/${result.data.slug}`);

  redirect("/admin/products");
}
