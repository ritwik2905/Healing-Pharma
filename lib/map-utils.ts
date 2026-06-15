/**
 * Turn whatever the admin pastes into a Google Maps embed URL that works inside
 * an <iframe> WITHOUT a Google Maps API key.
 *
 * Accepts:
 *   - A full `<iframe ... src="...">` snippet (we extract the src)
 *   - A ready-made embed URL (…/maps/embed… or …output=embed)
 *   - "lat,lng" coordinates, e.g. "28.7515,77.1129"
 *   - A plain address / place name
 *   - A normal Google Maps link (used as a query fallback)
 *
 * Returns `null` when there is nothing usable to embed.
 */
export function toMapEmbedSrc(input?: string | null): string | null {
  if (!input) return null
  const raw = input.trim()
  if (!raw) return null

  // 1) Full <iframe> snippet → pull out the src attribute.
  const iframeSrc = raw.match(/src=["']([^"']+)["']/i)?.[1]
  if (iframeSrc) return iframeSrc

  // 2) Already an embed URL → use as-is.
  if (/\/maps\/embed|[?&]output=embed/i.test(raw)) return raw

  // 3) Bare "lat,lng" pair.
  if (/^-?\d{1,3}(\.\d+)?\s*,\s*-?\d{1,3}(\.\d+)?$/.test(raw)) {
    const coords = raw.replace(/\s+/g, "")
    return `https://www.google.com/maps?q=${coords}&z=15&output=embed`
  }

  // 4) Anything else (address, place name, or a maps link) → query embed.
  return `https://www.google.com/maps?q=${encodeURIComponent(raw)}&z=14&output=embed`
}
