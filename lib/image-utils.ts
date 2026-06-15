// Treats the generic shipped placeholders (and empty values) as "no real image"
// so the UI can render a branded fallback instead of a blank/stretched image.
const PLACEHOLDER_HINTS = ["placeholder"]

// A tiny inline placeholder (light brand-grey) used as next/image's blur-up
// while the real photo streams in — improves perceived load speed everywhere.
export const IMAGE_BLUR =
  "data:image/svg+xml;base64," +
  "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNlNmVkZjUiLz48L3N2Zz4="

export function hasRealImage(src?: string | null): boolean {
  if (!src) return false
  const value = src.trim().toLowerCase()
  if (!value) return false
  return !PLACEHOLDER_HINTS.some((hint) => value.includes(hint))
}
