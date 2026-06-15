"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductImage } from "@/components/product-image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Pill, AlertCircle, FileDown, PhoneCall } from "lucide-react"
import { PurchaseInquiryForm } from "@/components/purchase-inquiry-form"
import type { Product } from "@/lib/product-actions"

export function ProductDetailClient({ product }: { product: Product }) {
  const [showPurchaseForm, setShowPurchaseForm] = useState(false)

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/products">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="relative">
            <div className="glass-card relative aspect-square overflow-hidden rounded-3xl border-0 sticky top-24 p-6">
              <ProductImage
                src={product.image}
                name={product.name}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-6"
              />
              {product.inStock ? (
                <Badge className="absolute top-6 right-6 bg-success text-white text-base px-4 py-2">In Stock</Badge>
              ) : (
                <Badge className="absolute top-6 right-6 bg-destructive text-white text-base px-4 py-2">
                  Out of Stock
                </Badge>
              )}
            </div>
          </div>

          <div>
            <Badge variant="outline" className="mb-4 text-sm">
              {product.category}
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">{product.name}</h1>
            <p className="text-3xl font-bold text-primary mb-6">{product.price}</p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">{product.detailedDescription}</p>

            <Card className="soft-card border-0 p-6 mb-6">
              <div className="flex items-start gap-3">
                <Pill className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Composition</h3>
                  <p className="text-muted-foreground">{product.composition}</p>
                </div>
              </div>
            </Card>

            <Card className="soft-card border-0 p-6 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-accent shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Recommended Dosage</h3>
                  <p className="text-muted-foreground">{product.dosage}</p>
                  <p className="text-sm text-warning-foreground mt-2">Always consult with a healthcare professional before use.</p>
                </div>
              </div>
            </Card>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="w-full gap-2 sm:flex-1"
                disabled={!product.inStock}
                onClick={() => setShowPurchaseForm(true)}
              >
                <PhoneCall className="w-4 h-4" />
                {product.inStock ? "Contact for Purchase" : "Out of Stock"}
              </Button>
              <Link href="/products" className="w-full sm:flex-1">
                <Button size="lg" variant="outline" className="w-full bg-transparent">
                  View More Products
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Card className="glass-card border-0 mt-12 p-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">Need More Information?</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            For bulk orders, institutional purchases, or government supplies, please contact our sales team. We offer
            competitive pricing and flexible payment terms for qualified buyers.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact">
              <Button variant="default" className="gap-2">
                <PhoneCall className="w-4 h-4" />
                Contact Sales
              </Button>
            </Link>
            <Button variant="outline" className="gap-2 bg-transparent">
              <FileDown className="w-4 h-4" />
              Download Product Sheet
            </Button>
          </div>
        </Card>
      </div>

      {showPurchaseForm && (
        <PurchaseInquiryForm
          productId={product.id}
          productName={product.name}
          onClose={() => setShowPurchaseForm(false)}
        />
      )}
    </main>
  )
}
