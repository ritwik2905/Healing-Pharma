// Additively syncs the catalogue from `catalogue-data.mjs` into the database.
//
// Unlike `scripts/replace-catalogue.mjs` (which does DELETE FROM products and
// restarts the serial — wiping anything the admin added through the panel and
// churning every /products/<id> URL), this script never deletes a row:
//
//   1. inserts any product in `catalogue-data.mjs` whose name is not in the DB
//   2. updates the `image` column of existing products when the catalogue points
//      at a different file (image swaps are the common out-of-band change)
//   3. unions any missing category names into the `categories` site_settings row
//
// Every other column of an existing product is left alone, so edits made in the
// admin panel survive. Use `npm run db:replace` when you deliberately want the
// file to overwrite the whole catalogue.
//
// Run with:  npm run db:sync   (or: node scripts/sync-catalogue.mjs)

import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { products, categories } from "./catalogue-data.mjs";

config();

const sql = neon(process.env.DATABASE_URL);

async function run() {
  console.log("Syncing product catalogue (additive)...");

  const existing = await sql`SELECT id, name, image FROM products`;
  const byName = new Map(existing.map((r) => [r.name.trim().toLowerCase(), r]));

  let inserted = 0;
  let reimaged = 0;

  for (const p of products) {
    const row = byName.get(p.name.trim().toLowerCase());

    if (!row) {
      await sql`
        INSERT INTO products (name, category, description, detailed_description, manufacture_date, expiry_date, batch_number, composition, dosage, image, price, in_stock)
        VALUES (${p.name}, ${p.category}, ${p.description}, ${p.detailed_description}, ${p.manufacture_date}, ${p.expiry_date}, ${p.batch_number}, ${p.composition}, ${p.dosage}, ${p.image}, ${p.price}, ${p.in_stock})
      `;
      console.log(`  + inserted  ${p.name}`);
      inserted++;
      continue;
    }

    if (row.image !== p.image) {
      await sql`UPDATE products SET image = ${p.image} WHERE id = ${row.id}`;
      console.log(`  ~ image     ${p.name}: ${row.image} -> ${p.image}`);
      reimaged++;
    }
  }

  // Union the category list so admin-created categories are never dropped.
  const settings = await sql`SELECT value FROM site_settings WHERE key = 'categories'`;
  const current = Array.isArray(settings[0]?.value) ? settings[0].value : [];
  const merged = [...current];
  for (const c of categories) if (!merged.includes(c)) merged.push(c);

  if (merged.length !== current.length || settings.length === 0) {
    const value = JSON.stringify(merged);
    if (settings.length > 0) {
      await sql`UPDATE site_settings SET value = ${value}::jsonb WHERE key = 'categories'`;
    } else {
      await sql`INSERT INTO site_settings (key, value) VALUES ('categories', ${value}::jsonb)`;
    }
    console.log(`  ~ categories: ${merged.join(", ")}`);
  }

  console.log(
    `\nDone. ${inserted} product(s) inserted, ${reimaged} image(s) updated, ${existing.length + inserted} total in database.`,
  );
}

run().catch((err) => {
  console.error("Failed to sync catalogue:", err);
  process.exit(1);
});
