import { getProducts } from "@/lib/product-actions"
import { getCategories } from "@/lib/category-actions"
import { ProductsClient } from "./products-client"
import { pageMetadata } from "@/lib/seo"

// Product IDs are a Postgres serial that advances every time the catalogue is
// re-seeded out-of-band (scripts/replace-catalogue.mjs / seed.mjs). If this page
// were statically prerendered, its "View Details" links would freeze the IDs
// from build time and 404 after the next re-seed. Render on each request so the
// product links always match the live database.
export const dynamic = "force-dynamic"

export const metadata = pageMetadata({
  title: "Products",
  description:
    "Browse the Healingdoc Pharma product range — tablets, capsules, creams, gels and injections across pain relief, anti-infectives, gastro, anti-allergy, dermatology and nutraceuticals. All WHO-GMP certified.",
  path: "/products",
})

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()])
  return <ProductsClient products={products} allCategories={categories} />
}
