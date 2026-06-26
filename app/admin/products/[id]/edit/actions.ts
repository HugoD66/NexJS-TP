"use server";

import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const productSchema = z.object({
  name:        z.string().min(1, "Le nom est requis."),
  category:    z.string().min(1, "La catégorie est requise."),
  price:       z.coerce.number().positive("Le prix doit être positif."),
  slug:        z.string().min(1, "Le slug est requis.").regex(/^[a-z0-9-]+$/, "Slug invalide (minuscules, chiffres et tirets uniquement)."),
  image:       z.string().min(1, "L'image est requise."),
  description: z.string().min(1, "La description est requise."),
  specs:       z.string().min(1, "Les specs sont requises."),
});

export type UpdateProductState = {
  errors?: Partial<Record<keyof z.infer<typeof productSchema>, string[]>>;
  globalError?: string;
  success?: boolean;
};

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
