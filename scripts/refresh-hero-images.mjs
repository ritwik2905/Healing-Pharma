// One-off, surgical refresh of the homepage hero imagery.
// Updates ONLY the image fields of the `hero` site setting (and seeds the row
// if absent), preserving the existing title/description. Safe + reversible via
// the admin panel.
import { neon } from "@neondatabase/serverless"
import { config } from "dotenv"

config()

const sql = neon(process.env.DATABASE_URL)

const NEW_HERO_IMAGE = "/heroes/home-hero.jpg"
const NEW_HERO_SECONDARY = "/heroes/home-about.jpg"

async function run() {
  const rows = await sql`SELECT value FROM site_settings WHERE key = 'hero'`
  const existing = rows[0]?.value ?? null
  console.log("Current hero setting:", JSON.stringify(existing))

  const base = existing && typeof existing === "object" ? existing : {
    title: "Delivering Trust Through Quality Healthcare",
    description:
      "Healingdoc Pharma Private Limited is a rapidly growing pharmaceutical company committed to high-quality, affordable and innovative medicines, manufactured at WHO-GMP certified facilities under strict quality control.",
  }

  const next = { ...base, image: NEW_HERO_IMAGE, secondaryImage: NEW_HERO_SECONDARY }

  if (rows.length > 0) {
    await sql`UPDATE site_settings SET value = ${next} WHERE key = 'hero'`
  } else {
    await sql`INSERT INTO site_settings (key, value) VALUES ('hero', ${next})`
  }

  const after = await sql`SELECT value FROM site_settings WHERE key = 'hero'`
  console.log("Updated hero setting:", JSON.stringify(after[0]?.value))
  console.log("DONE")
}

run().catch((e) => {
  console.error("FAILED:", e.message)
  process.exit(1)
})
