import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getProductById } from "@/lib/product-actions"
import { ProductDetailClient } from "./product-detail-client"
import { pageMetadata, siteConfig, absoluteUrl } from "@/lib/seo"
import { hasRealImage } from "@/lib/image-utils"

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(id)
  if (!product) {
    return pageMetadata({ title: "Product Not Found", path: `/products/${id}`, noIndex: true })
  }
  const image = hasRealImage(product.image) ? product.image : siteConfig.ogImage
  return pageMetadata({
    title: product.name,
    description: `${product.description} Composition: ${product.composition}.`,
    path: `/products/${product.id}`,
    image,
  })
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    image: hasRealImage(product.image) ? absoluteUrl(product.image) : absoluteUrl(siteConfig.ogImage),
    brand: { "@type": "Brand", name: siteConfig.name },
    ...(product.composition && {
      additionalProperty: {
        "@type": "PropertyValue",
        name: "Composition",
        value: product.composition,
      },
    }),
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: absoluteUrl(`/products/${product.id}`),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailClient product={product} />
    </>
  )
}
