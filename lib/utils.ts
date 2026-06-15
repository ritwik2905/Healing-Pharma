import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Split a brand wordmark into a main line and an optional legal suffix so the
 * full legal name ("Healingdoc Pharma Private Limited") renders cleanly on two
 * lines. If the configured brand text already ends in a legal suffix we keep it
 * as-is; otherwise we append "Private Limited" as the sub-line.
 */
export function brandParts(text?: string): { main: string; sub: string } {
  const value = (text || "Healingdoc Pharma").trim()
  const match = value.match(/^(.*?)[\s,]*((?:Private Limited|Pvt\.?\s*Ltd\.?))\s*$/i)
  if (match) return { main: match[1].trim(), sub: match[2].trim() }
  return { main: value, sub: "Private Limited" }
}
