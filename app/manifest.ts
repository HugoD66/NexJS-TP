import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pixel Palace",
    short_name: "Pixel Palace",
    description: "Boutique en ligne spécialisée dans le rétro gaming",
    start_url: "/",
    display: "standalone",
    background_color: "#0D0D1A",
    theme_color: "#7B2FFF",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
