/**
 * Turn whatever the admin pastes into a Google Maps embed URL that works inside
 * an <iframe> WITHOUT a Google Maps API key.
 *
 * Accepts:
 *   - A full `<iframe ... src="...">` snippet (we extract the src)
 *   - A ready-made embed URL (…/maps/embed… or …output=embed)
 *   - "lat,lng" coordinates, e.g. "28.7515,77.1129"
 *   - A normal Google Maps / goo.gl link (we pull coordinates out of it, or
 *     append output=embed to the link itself)
 *   - A plain address / place name
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

  // 4) A Google Maps / goo.gl link. Pasting the whole URL into q= makes Google
  //    search for the literal URL text (wrong place), so instead pull the real
  //    coordinates out of the link when we can.
  if (/^https?:\/\/[^\s]*(google\.[a-z.]+\/maps|maps\.google\.|maps\.app\.goo\.gl|goo\.gl\/maps)/i.test(raw)) {
    const coords =
      raw.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/)?.slice(1, 3) ||
      raw.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/)?.slice(1, 3) ||
      raw.match(/[?&](?:q|ll|center|destination)=(-?\d+\.\d+)(?:%2C|,)(-?\d+\.\d+)/i)?.slice(1, 3)
    if (coords) {
      return `https://www.google.com/maps?q=${coords[0]},${coords[1]}&z=15&output=embed`
    }
    // No parseable coordinates — append output=embed to the link itself. This
    // renders for full /maps/place/… URLs; very short share links
    // (maps.app.goo.gl/…) can't be resolved client-side, so the admin UI steers
    // users toward lat,lng or the "Embed a map" link instead.
    return raw.includes("?") ? `${raw}&output=embed` : `${raw}?output=embed`
  }

  // 5) Anything else (address or place name) → keyless query embed.
  return `https://www.google.com/maps?q=${encodeURIComponent(raw)}&z=14&output=embed`
}
