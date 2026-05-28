"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductImage } from "@/components/product-image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Package, Pill, AlertCircle, FileDown, PhoneCall } from "lucide-react"
import { PurchaseInquiryForm } from "@/components/purchase-inquiry-form"
import type { Product } from "@/lib/product-actions"

export function ProductDetailClient({ product }: { product: Product }) {
  const [showPurchaseForm, setShowPurchaseForm] = useState(false)

  const today = new Date()
  const expiryDate = new Date(product.expiryDate)
  const daysUntilExpiry = Math.floor((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/products">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="relative">
            <div className="relative aspect-square bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl overflow-hidden sticky top-24 p-6">
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

            <Card className="p-6 mb-6 bg-surface">
              <div className="flex items-start gap-3">
                <Pill className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Composition</h3>
                  <p className="text-muted-foreground">{product.composition}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 mb-6 bg-surface">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-accent shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-foreground mb-2">Recommended Dosage</h3>
                  <p className="text-muted-foreground">{product.dosage}</p>
                  <p className="text-sm text-warning mt-2">Always consult with a healthcare professional before use.</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 mb-6">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Manufacturing Information
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Batch Number</span>
                  <span className="font-semibold text-foreground">{product.batchNumber}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Manufacture Date
                  </span>
                  <span className="font-semibold text-foreground">
                    {new Date(product.manufactureDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Expiry Date
                  </span>
                  <span className="font-semibold text-foreground">
                    {new Date(product.expiryDate).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                {daysUntilExpiry < 180 && daysUntilExpiry > 0 && (
                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mt-4">
                    <p className="text-warning text-sm font-medium">
                      Note: This product will expire in {daysUntilExpiry} days. Please use before expiry date.
                    </p>
                  </div>
                )}
                {daysUntilExpiry <= 0 && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mt-4">
                    <p className="text-destructive text-sm font-medium">Warning: This product has expired.</p>
                  </div>
                )}
              </div>
            </Card>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="flex-1 gap-2"
                disabled={!product.inStock}
                onClick={() => setShowPurchaseForm(true)}
              >
                <PhoneCall className="w-4 h-4" />
                {product.inStock ? "Contact for Purchase" : "Out of Stock"}
              </Button>
              <Link href="/products" className="flex-1">
                <Button size="lg" variant="outline" className="w-full bg-transparent">
                  View More Products
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <Card className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-accent/5">
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
