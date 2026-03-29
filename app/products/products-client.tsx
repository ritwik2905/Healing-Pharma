"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import type { Product } from "@/lib/product-actions"

export function ProductsClient({ products }: { products: Product[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = Array.from(new Set(products.map((p) => p.category)))

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.composition?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory, products])

  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 text-balance">Our Products</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore our comprehensive range of quality pharmaceutical products, manufactured to the highest standards
              and available for government supplies, institutional sales, and general trade.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search medicines by name, composition, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-12">
            <h2 className="text-sm font-semibold text-muted-foreground mb-4">CATEGORIES</h2>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === "all" ? "secondary" : "outline"}
                className="text-sm px-4 py-2 cursor-pointer hover:bg-secondary transition-colors"
                onClick={() => setSelectedCategory("all")}
              >
                All Products ({products.length})
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "secondary" : "outline"}
                  className="text-sm px-4 py-2 cursor-pointer hover:bg-secondary transition-colors"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {searchQuery && (
            <div className="mb-6">
              <p className="text-muted-foreground">
                Found <span className="font-semibold text-foreground">{filteredProducts.length}</span>{" "}
                {filteredProducts.length === 1 ? "product" : "products"} matching &quot;{searchQuery}&quot;
              </p>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden group hover:shadow-xl transition-all">
                  <Link href={`/products/${product.id}`}>
                    <div className="relative h-64 bg-surface overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.inStock ? (
                        <Badge className="absolute top-4 right-4 bg-success text-white">In Stock</Badge>
                      ) : (
                        <Badge className="absolute top-4 right-4 bg-destructive text-white">Out of Stock</Badge>
                      )}
                    </div>
                    <div className="p-6">
                      <Badge variant="outline" className="mb-3">
                        {product.category}
                      </Badge>
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">{product.price}</span>
                        <Button
                          variant="ghost"
                          className="group-hover:bg-primary group-hover:text-white transition-colors"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter to find what you&apos;re looking for
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                }}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
