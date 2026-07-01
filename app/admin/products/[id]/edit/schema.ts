import { z } from "zod";

export const productSchema = z.object({
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
