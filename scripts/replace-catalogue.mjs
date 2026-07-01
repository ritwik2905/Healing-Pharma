// Replaces ONLY the product catalogue and the category list.
//
// Unlike `scripts/seed.mjs` (which wipes and re-seeds everything), this script
// leaves testimonials, blog posts and every other site_settings row (hero,
// logo, contact, chairman, directors) untouched. It:
//   1. deletes all rows from `products`
//   2. inserts the 18 products from `catalogue-data.mjs`
//   3. upserts the `categories` site_settings row with the 6 category names
//
// Run with:  npm run db:replace   (or: node scripts/replace-catalogue.mjs)

import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { products, categories } from "./catalogue-data.mjs";

config();

const sql = neon(process.env.DATABASE_URL);

async function run() {
  console.log("Replacing product catalogue...");

  await sql`DELETE FROM products`;
  console.log("Cleared existing products.");

  for (const p of products) {
    await sql`
      INSERT INTO products (name, category, description, detailed_description, manufacture_date, expiry_date, batch_number, composition, dosage, image, price, in_stock)
      VALUES (${p.name}, ${p.category}, ${p.description}, ${p.detailed_description}, ${p.manufacture_date}, ${p.expiry_date}, ${p.batch_number}, ${p.composition}, ${p.dosage}, ${p.image}, ${p.price}, ${p.in_stock})
    `;
  }
  console.log(`Inserted ${products.length} products.`);

  // Upsert the categories row (JSON string[]). category-actions.ts reads this
  // key and unions it with any category used by a product.
  const value = JSON.stringify(categories);
  const existing = await sql`SELECT id FROM site_settings WHERE key = 'categories'`;
  if (existing.length > 0) {
    await sql`UPDATE site_settings SET value = ${value}::jsonb WHERE key = 'categories'`;
  } else {
    await sql`INSERT INTO site_settings (key, value) VALUES ('categories', ${value}::jsonb)`;
  }
  console.log(`Set ${categories.length} categories: ${categories.join(", ")}.`);

  console.log("Catalogue replaced successfully!");
}

run().catch((err) => {
  console.error("Failed to replace catalogue:", err);
  process.exit(1);
});
