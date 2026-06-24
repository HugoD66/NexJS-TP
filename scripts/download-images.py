import requests
import os
import time

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "../public/products")

# Mapping slug → titre article Wikipedia (en anglais pour meilleurs résultats)
PRODUCTS = {
    "nes":                    "Nintendo Entertainment System",
    "snes":                   "Super Nintendo Entertainment System",
    "nintendo-64":            "Nintendo 64",
    "game-boy-color":         "Game Boy Color",
    "sega-mega-drive":        "Sega Genesis",
    "playstation-1":          "PlayStation (console)",
    "super-mario-world":      "Super Mario World",
    "zelda-link-to-the-past": "The Legend of Zelda: A Link to the Past",
    "sonic-the-hedgehog":     "Sonic the Hedgehog (1991 video game)",
    "pokemon-rouge":          "Pokémon Red and Blue",
    "crash-bandicoot":        "Crash Bandicoot (video game)",
    "manette-retro-usb":      "Game controller",
    "cartouche-collection":   "ROM cartridge",
    "carte-memoire-playstation": "PlayStation memory card",
    "adaptateur-hdmi-retro":  "HDMI",
}

def get_wikipedia_image(title: str) -> str | None:
    url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + requests.utils.quote(title)
    resp = requests.get(url, timeout=10, headers={"User-Agent": "PixelPalace/1.0"})
    if resp.status_code != 200:
        print(f"  ✗ Article introuvable : {title}")
        return None
    data = resp.json()
    image = data.get("originalimage") or data.get("thumbnail")
    if not image:
        print(f"  ✗ Pas d'image pour : {title}")
        return None
    return image["source"]

def download_image(url: str, slug: str) -> bool:
    resp = requests.get(url, timeout=15, headers={"User-Agent": "PixelPalace/1.0"})
    if resp.status_code != 200:
        return False
    ext = ".png" if "png" in url.lower() else ".jpg"
    path = os.path.join(OUTPUT_DIR, f"{slug}{ext}")
    with open(path, "wb") as f:
        f.write(resp.content)
    print(f"  ✓ {slug}{ext}  ({len(resp.content) // 1024} Ko)")
    return True

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"Téléchargement vers : {OUTPUT_DIR}\n")

    for slug, title in PRODUCTS.items():
        print(f"[{slug}]  ← {title}")
        img_url = get_wikipedia_image(title)
        if img_url:
            download_image(img_url, slug)
        time.sleep(0.3)  # respecter le rate limit Wikipedia

    print("\nTerminé.")

if __name__ == "__main__":
    main()
