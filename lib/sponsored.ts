const ENDPOINT = "https://graphqlstore.julienfroidefond.com/api/2024-01/graphql.json";

export type SponsoredProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage: { url: string } | null;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
  };
};

async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600, tags: ["sponsored-products"] },
  });
  const { data } = await res.json();
  return data;
}

export async function getSponsoredProducts(first = 4): Promise<SponsoredProduct[]> {
  const data = await gql<{ products: { nodes: SponsoredProduct[] } }>(`
    query GetProducts($first: Int!) {
      products(first: $first) {
        nodes {
          id title handle description
          featuredImage { url }
          priceRange { minVariantPrice { amount currencyCode } }
        }
      }
    }
  `, { first });
  return data.products.nodes;
}

export async function getSponsoredProductByHandle(handle: string): Promise<SponsoredProduct | null> {
  const data = await gql<{ productByHandle: SponsoredProduct | null }>(`
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id title handle description
        featuredImage { url }
        priceRange { minVariantPrice { amount currencyCode } }
      }
    }
  `, { handle });
  return data.productByHandle;
}

export async function getAllSponsoredHandles(): Promise<string[]> {
  const products = await getSponsoredProducts(50);
  return products.map(p => p.handle);
}
