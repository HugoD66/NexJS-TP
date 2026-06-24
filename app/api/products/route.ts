import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { id: "asc" } });
  return Response.json(products);
}
