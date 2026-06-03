import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import type { Product } from "@/lib/product-actions"
import { ProductImage } from "@/components/product-image"

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="reveal group block h-full">
      <Card className="glass-card overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-accent/20 hover:border-primary/30">
        <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/10 via-surface to-accent/10 p-4">
          <ProductImage
            src={product.image}
            name={product.name}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
          />
          {product.inStock ? (
            <Badge className="absolute top-3 right-3 bg-success text-white">In Stock</Badge>
          ) : (
            <Badge className="absolute top-3 right-3 bg-destructive text-white">Out of Stock</Badge>
          )}
        </div>
        <div className="p-5 flex flex-col flex-1">
          <Badge variant="outline" className="mb-2 w-fit text-xs">
            {product.category}
          </Badge>
          <h3 className="text-lg font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-lg font-bold text-primary">{product.price}</span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
              View Details
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
