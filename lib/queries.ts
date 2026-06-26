import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";

export const getProducts = unstable_cache(
  async () => prisma.product.findMany({ orderBy: { id: "asc" } }),
  ["products-list"],
  { tags: ["products"] }
);
