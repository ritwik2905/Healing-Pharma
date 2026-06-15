"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X, LayoutGrid, Package } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/product-actions"
import { ProductCard } from "@/components/product-card"
import { PageHero } from "@/components/page-hero"
import { SITE_IMAGES } from "@/lib/site-images"

export function ProductsClient({
  products,
  allCategories = [],
}: {
  products: Product[]
  allCategories?: string[]
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Unique categories, each with its total count. Categories that products use
  // come first (in first-appearance order); admin-created categories with no
  // products yet are appended so they still show as filter chips (count 0).
  const categories = useMemo(() => {
    const order: string[] = []
    const counts: Record<string, number> = {}
    for (const p of products) {
      if (!(p.category in counts)) {
        counts[p.category] = 0
        order.push(p.category)
      }
      counts[p.category] += 1
    }
    for (const name of allCategories) {
      const clean = name?.trim()
      if (clean && !(clean in counts)) {
        counts[clean] = 0
        order.push(clean)
      }
    }
    return order.map((name) => ({ name, count: counts[name] }))
  }, [products, allCategories])

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return products.filter((product) => {
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.composition?.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q)

      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory, products])

  // Group the filtered products by category, preserving the category order.
  const groupedProducts = useMemo(() => {
    return categories
      .map((c) => ({
        category: c.name,
        items: filteredProducts.filter((p) => p.category === c.name),
      }))
      .filter((g) => g.items.length > 0)
  }, [categories, filteredProducts])

  const hasResults = filteredProducts.length > 0
  const isFiltering = searchQuery.trim() !== "" || selectedCategory !== "all"

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
  }

  return (
    <main>
      <PageHero
        image={SITE_IMAGES.products.hero}
        imageAlt="Colourful pharmaceutical tablets and capsules"
        eyebrow="Our Catalogue"
        eyebrowIcon={<Package className="h-4 w-4" />}
        title="Our Products"
        description="Explore our comprehensive range of quality pharmaceutical products, manufactured to the highest standards and available for government supplies, institutional sales, and general trade."
        align="left"
        stats={[
          { value: `${products.length}`, label: "Products" },
          { value: `${categories.length}`, label: "Categories" },
          { value: "WHO-GMP", label: "Certified" },
        ]}
        priority
      />

      {/* Products */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search medicines by name, composition, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 h-14 text-base lg:text-lg"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Browse by Category
            </h2>
            <div className="flex flex-wrap gap-2.5">
              <CategoryChip
                label="All Products"
                count={products.length}
                icon
                active={selectedCategory === "all"}
                onClick={() => setSelectedCategory("all")}
              />
              {categories.map((category) => (
                <CategoryChip
                  key={category.name}
                  label={category.name}
                  count={category.count}
                  active={selectedCategory === category.name}
                  onClick={() => setSelectedCategory(category.name)}
                />
              ))}
            </div>
          </div>

          {/* Result summary */}
          {isFiltering && hasResults && (
            <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span>{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
                {searchQuery && (
                  <>
                    {" "}
                    for &quot;<span className="font-semibold text-foreground">{searchQuery}</span>&quot;
                  </>
                )}
                {selectedCategory !== "all" && (
                  <>
                    {" "}
                    in <span className="font-semibold text-foreground">{selectedCategory}</span>
                  </>
                )}
              </p>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1.5">
                <X className="h-4 w-4" />
                Clear filters
              </Button>
            </div>
          )}

          {/* Grouped products */}
          {hasResults ? (
            <div className="space-y-14 lg:space-y-20">
              {groupedProducts.map((group) => (
                <div key={group.category} className="scroll-mt-24">
                  {/* Category heading */}
                  <div className="reveal flex items-center gap-4 mb-6 lg:mb-8">
                    <h3 className="text-2xl lg:text-3xl font-bold text-brand-gradient sm:whitespace-nowrap">
                      {group.category}
                    </h3>
                    <span className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {group.items.length}
                    </span>
                    <span className="hidden sm:block h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {group.items.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
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
              <Button onClick={clearFilters}>Clear Search</Button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

function CategoryChip({
  label,
  count,
  active,
  onClick,
  icon = false,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
  icon?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
        active
          ? "bg-brand-gradient text-white border-transparent shadow-md shadow-primary/25"
          : "bg-card text-foreground border-border hover:border-primary/40 hover:text-primary hover:bg-primary/5",
      )}
    >
      {icon && <LayoutGrid className="h-4 w-4" />}
      <span>{label}</span>
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full px-1.5 min-w-5 h-5 text-xs font-semibold",
          active ? "bg-white/25 text-white" : "bg-muted text-muted-foreground",
        )}
      >
        {count}
      </span>
    </button>
  )
}
