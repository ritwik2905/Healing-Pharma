// Treats the generic shipped placeholders (and empty values) as "no real image"
// so the UI can render a branded fallback instead of a blank/stretched image.
const PLACEHOLDER_HINTS = ["placeholder"]

export function hasRealImage(src?: string | null): boolean {
  if (!src) return false
  const value = src.trim().toLowerCase()
  if (!value) return false
  return !PLACEHOLDER_HINTS.some((hint) => value.includes(hint))
}
