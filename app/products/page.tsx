import { getProducts } from "@/lib/product-actions"
import { ProductsClient } from "./products-client"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Products",
  description:
    "Browse the Healingdoc Pharma product range — tablets, capsules, creams, gels, syrups and injections across pain relief, anti-infectives, dermatology, gastro, respiratory care, anti-allergy and nutraceuticals. All WHO-GMP certified.",
  path: "/products",
})

export default async function ProductsPage() {
  const products = await getProducts()
  return <ProductsClient products={products} />
}
