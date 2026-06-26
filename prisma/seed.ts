import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { hash } from "bcryptjs";
import products from "../lib/products.json";

const dbUrl = process.env.DATABASE_URL!.replace("file:", "");
const adapter = new PrismaBetterSqlite3({ url: dbUrl });
const prisma = new PrismaClient({ adapter });

// Produits similaires curatés (slug → slugs similaires)
const SIMILAR: Record<string, string[]> = {
  "nes":                     ["snes", "nintendo-64", "super-mario-world"],
  "snes":                    ["nes", "nintendo-64", "zelda-link-to-the-past", "super-mario-world"],
  "nintendo-64":             ["nes", "snes", "game-boy-color"],
  "game-boy-color":          ["nintendo-64", "pokemon-rouge"],
  "sega-mega-drive":         ["playstation-1", "sonic-the-hedgehog", "manette-retro-usb"],
  "playstation-1":           ["sega-mega-drive", "crash-bandicoot", "carte-memoire-playstation"],
  "super-mario-world":       ["zelda-link-to-the-past", "sonic-the-hedgehog", "snes"],
  "zelda-link-to-the-past":  ["super-mario-world", "pokemon-rouge", "snes"],
  "sonic-the-hedgehog":      ["super-mario-world", "crash-bandicoot", "sega-mega-drive"],
  "pokemon-rouge":           ["zelda-link-to-the-past", "crash-bandicoot", "game-boy-color"],
  "crash-bandicoot":         ["sonic-the-hedgehog", "pokemon-rouge", "playstation-1"],
  "manette-retro-usb":       ["adaptateur-hdmi-retro", "cartouche-collection"],
  "adaptateur-hdmi-retro":   ["manette-retro-usb", "carte-memoire-playstation"],
  "cartouche-collection":    ["manette-retro-usb", "carte-memoire-playstation"],
  "carte-memoire-playstation": ["adaptateur-hdmi-retro", "cartouche-collection"],
};

async function main() {
  console.log("Seeding database...");

  console.log("Clearing database...");
  await prisma.productSimilar.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
  console.log("Database cleared.\n");

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

  console.log("\nCreating similar product links...");

  const all = await prisma.product.findMany({ select: { id: true, slug: true } });
  const bySlug = Object.fromEntries(all.map(p => [p.slug, p.id]));

  for (const [fromSlug, toSlugs] of Object.entries(SIMILAR)) {
    const fromId = bySlug[fromSlug];
    if (!fromId) continue;
    for (const toSlug of toSlugs) {
      const toId = bySlug[toSlug];
      if (!toId) continue;
      await prisma.productSimilar.create({ data: { fromId, toId } });
    }
    console.log(`  ✓ ${fromSlug} → ${toSlugs.join(", ")}`);
  }

  console.log(`\n${products.length} produits et ${Object.values(SIMILAR).flat().length} liens similaires insérés.`);

  console.log("\nCreating admin user...");
  const hashedPassword = await hash("test@test.com", 12);
  await prisma.user.create({
    data: {
      email: "test@test.com",
      name: "test@test.com",
      password: hashedPassword,
      role: "admin",
    },
  });
  console.log("  ✓ test@test.com (admin)");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
