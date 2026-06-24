import requests
import os
import time

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "../public/products")

MISSING = {
    "game-boy-color":         "Game Boy Color",
    "sega-mega-drive":        "Sega Mega Drive",
    "sonic-the-hedgehog":     "Sonic the Hedgehog",
    "crash-bandicoot":        "Crash Bandicoot",
    "manette-retro-usb":      "Gamepad",
    "cartouche-collection":   "Video game cartridge",
    "carte-memoire-playstation": "Memory card",
    "adaptateur-hdmi-retro":  "HDMI",
}

def get_wikipedia_image(title: str) -> str | None:
    url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + requests.utils.quote(title, safe="")
    resp = requests.get(url, timeout=10, headers={"User-Agent": "PixelPalace/1.0"})
    if resp.status_code != 200:
        print(f"  ✗ Introuvable ({resp.status_code}) : {title}")
        return None
    data = resp.json()
    image = data.get("originalimage") or data.get("thumbnail")
    if not image:
        print(f"  ✗ Pas d'image : {title}")
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

for slug, title in MISSING.items():
    print(f"[{slug}]  ← {title}")
    img_url = get_wikipedia_image(title)
    if img_url:
        download_image(img_url, slug)
    time.sleep(0.3)

print("\nTerminé.")
