import { hasRealImage } from "./image-utils"

// Catalogue images extracted from the official product catalogue (details.pdf)
// and shipped in /public/products. Keyed by the product name (lower-cased,
// trimmed) so the correct photo is shown even if the database row still holds
// a placeholder/empty value (e.g. before the DB has been re-seeded).
const PRODUCT_IMAGES: Record<string, string> = {
  "acloheal-sp tablets": "/products/acloheal-sp.jpg",
  "acloheal-mr tablets": "/products/acloheal-mr.jpg",
  "healderm cream": "/products/healderm-cream.jpg",
  "luliderm cream": "/products/lulidrum.jpg",
  "healergy-lc tablets": "/products/healergy-lc.jpg",
  "healoxin-oz tablets": "/products/healoxin-oz.jpg",
  "diclodoc gel": "/products/dicloheal-gel.jpg",
  "acloheal-p tablets": "/products/acloheal-p.jpg",
  "acloheal-np tablets": "/products/acloheal-np.jpg",
  "paraheal-650 tablets": "/products/paraheal-650.jpg",
  "cefidoc-200 tablets": "/products/cefidoc-200.jpg",
  "pandoc-dsr capsules": "/products/pandoc-dsr.jpg",
  "omedoc-20 capsules": "/products/omedoc-20.jpg",
  "panoheal-40 injection": "/products/panoheal-40.jpg",
  "healoxin-200 tablets": "/products/healoxin-200.jpg",
  "zitroheal-500 tablets": "/products/zitroheal-500.jpg",
  "healzin tablets": "/products/healzin.jpg",
  "healmin tablets": "/products/healmin.jpg",
}

/**
 * Returns the best image for a product: the stored image if it's a real photo,
 * otherwise the catalogue image matched by name. Falls back to the original
 * value (placeholder) when there's no match so the branded fallback still renders.
 */
export function resolveProductImage(name: string, image?: string | null): string {
  if (hasRealImage(image)) return image as string
  const match = PRODUCT_IMAGES[name?.trim().toLowerCase()]
  return match || image || ""
}
