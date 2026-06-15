// One-off helper to push the homepage hero HEADLINE + DESCRIPTION to the live
// database, while preserving the existing hero image / secondary image / video.
//
//   node scripts/update-hero-text.mjs
//
// (The same copy is also the built-in default in lib/site-settings-actions.ts,
// so a fresh install shows it without running this. You can also edit the text
// any time from Admin → Settings → Hero.)
import { neon } from "@neondatabase/serverless"
import { config } from "dotenv"

config()

const sql = neon(process.env.DATABASE_URL)

const TITLE = "Better Medicines. Healthier Lives."
const DESCRIPTION =
  "WHO-GMP certified formulations across pain relief, anti-infectives, dermatology, gastro and nutraceuticals — crafted with uncompromising quality and made affordable for the people we serve."

const rows = await sql`SELECT value FROM site_settings WHERE key = 'hero'`
const current = rows[0]?.value && typeof rows[0].value === "object" ? rows[0].value : {}
const updated = { ...current, title: TITLE, description: DESCRIPTION }

if (rows.length > 0) {
  await sql`UPDATE site_settings SET value = ${JSON.stringify(updated)} WHERE key = 'hero'`
} else {
  await sql`INSERT INTO site_settings (key, value) VALUES ('hero', ${JSON.stringify(updated)})`
}

console.log("Hero text updated (image / secondaryImage / video preserved).")
console.log(JSON.stringify(updated, null, 2))
