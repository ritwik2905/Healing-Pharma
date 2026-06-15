import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import type { Product } from "@/lib/product-actions"
import { ProductImage } from "@/components/product-image"

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="reveal group block h-full">
      <Card className="glass-card relative flex h-full flex-col overflow-hidden ring-1 ring-transparent transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/25 hover:ring-2 hover:ring-primary/40">
        {/* Colour accent that sweeps in on hover */}
        <span className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-brand-gradient transition-transform duration-300 group-hover:scale-x-100" />
        <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/10 via-surface to-accent/10 p-4 transition-colors duration-300 group-hover:from-primary/20 group-hover:to-accent/20">
          <ProductImage
            src={product.image}
            name={product.name}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
          />
          {product.inStock ? (
            <Badge className="absolute top-3 right-3 bg-success text-white">In Stock</Badge>
          ) : (
            <Badge className="absolute top-3 right-3 bg-destructive text-white">Out of Stock</Badge>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <Badge
            variant="outline"
            className="mb-2 w-fit text-xs transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white"
          >
            {product.category}
          </Badge>
          <h3 className="mb-1.5 line-clamp-2 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-lg font-bold text-primary">{product.price}</span>
            <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium text-primary transition-all duration-300 group-hover:gap-2 group-hover:bg-primary group-hover:text-white">
              View Details
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
