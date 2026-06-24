import data from "./products.json";

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  description: string;
  specs: string;
  price: number;
  image: string;
};

const products: Product[] = data;

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | null {
  return products.find((p) => p.slug === slug) ?? null;
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}
