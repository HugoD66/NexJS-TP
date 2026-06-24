import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import products from "../lib/products.json";

const dbUrl = process.env.DATABASE_URL!.replace("file:", "");
const adapter = new PrismaBetterSqlite3({ url: dbUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  await prisma.product.deleteMany();

  for (const product of products) {
    await prisma.product.create({
      data: {
        slug:        product.slug,
        name:        product.name,
        category:    product.category,
        description: product.description,
        specs:       product.specs,
        price:       product.price,
        image:       product.image,
      },
    });
    console.log(`  ✓ ${product.name}`);
  }

  console.log(`\n${products.length} produits insérés.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
