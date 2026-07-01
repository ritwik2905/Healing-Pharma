import { getProducts } from "@/lib/product-actions"
import { getCategories } from "@/lib/category-actions"
import { ProductsClient } from "./products-client"
import { pageMetadata } from "@/lib/seo"

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
