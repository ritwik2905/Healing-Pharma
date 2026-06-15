"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductImage } from "@/components/product-image"
import { X, ChevronLeft, ChevronRight, Check, FileText, FlaskConical, ImageIcon, Plus } from "lucide-react"
import { addProduct, updateProduct } from "@/lib/product-actions"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  category: string
  description: string
  detailedDescription: string
  manufactureDate: string
  expiryDate: string
  batchNumber: string
  composition: string
  dosage: string
  image: string
  price: string
  inStock: boolean
}

interface ProductFormProps {
  product?: Product | null
  categories?: string[]
  onClose: () => void
}

const STEPS = [
  { title: "Basics", description: "Name & description", icon: FileText },
  { title: "Specifications", description: "Composition, price, dates", icon: FlaskConical },
  { title: "Image & Review", description: "Photo & confirm", icon: ImageIcon },
] as const

export function ProductForm({ product, categories = [], onClose }: ProductFormProps) {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "",
    description: product?.description || "",
    detailedDescription: product?.detailedDescription || "",
    manufactureDate: product?.manufactureDate || "",
    expiryDate: product?.expiryDate || "",
    batchNumber: product?.batchNumber || "",
    composition: product?.composition || "",
    dosage: product?.dosage || "",
    image: product?.image || "/placeholder.jpg",
    price: product?.price || "",
    inStock: product?.inStock ?? true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  // Free-type a brand-new category that isn't in the dropdown yet.
  const [customCategory, setCustomCategory] = useState(false)

  // Always include the product's current category so editing never loses it.
  const categoryOptions = Array.from(
    new Set([...categories, product?.category].filter((c): c is string => Boolean(c && c.trim()))),
  ).sort((a, b) => a.localeCompare(b))

  const set = (patch: Partial<typeof formData>) => setFormData((prev) => ({ ...prev, ...patch }))

  const isStepValid = (s: number) => {
    const d = formData
    if (s === 0) return [d.name, d.category, d.description, d.detailedDescription].every((v) => v.trim())
    if (s === 1)
      return [d.composition, d.dosage, d.price, d.batchNumber, d.manufactureDate, d.expiryDate].every((v) =>
        String(v).trim(),
      )
    return true
  }

  const allValid = [0, 1, 2].every(isStepValid)

  const goNext = () => {
    if (isStepValid(step) && step < STEPS.length - 1) setStep(step + 1)
  }
  const goBack = () => step > 0 && setStep(step - 1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // If a field on an earlier step is missing, jump back to it.
    const firstInvalid = [0, 1, 2].find((s) => !isStepValid(s))
    if (firstInvalid !== undefined) {
      setStep(firstInvalid)
      return
    }

    setIsSubmitting(true)
    const result = product ? await updateProduct(product.id, formData) : await addProduct(formData)
    if (result.success) onClose()
    else alert(result.error || "Failed to save product")
    setIsSubmitting(false)
  }

  return (
    <Card className="w-full max-w-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">{product ? "Edit Product" : "Add New Product"}</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Stepper */}
      <ol className="mb-8 flex items-center gap-2">
        {STEPS.map((s, i) => {
          const completed = i < step || (i === step && false)
          const isDone = i < step
          const active = i === step
          const Icon = s.icon
          return (
            <li key={s.title} className="flex flex-1 items-center gap-2">
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                disabled={i > step}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-left transition-colors",
                  i < step && "cursor-pointer hover:bg-muted",
                  i > step && "cursor-not-allowed",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors",
                    active && "border-primary bg-primary text-white",
                    isDone && "border-success bg-success text-white",
                    !active && !isDone && "border-border bg-card text-muted-foreground",
                  )}
                >
                  {isDone ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </span>
                <span className="hidden sm:block">
                  <span
                    className={cn(
                      "block text-sm font-semibold",
                      active ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {s.title}
                  </span>
                  <span className="block text-xs text-muted-foreground">{s.description}</span>
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <span className={cn("h-0.5 flex-1 rounded-full", i < step ? "bg-success" : "bg-border")} />
              )}
            </li>
          )
        })}
      </ol>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* STEP 1 — Basics */}
        {step === 0 && (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => set({ name: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                {customCategory ? (
                  <div className="mt-2 flex gap-2">
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => set({ category: e.target.value })}
                      placeholder="New category name"
                      autoFocus
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setCustomCategory(false)
                        set({ category: product?.category || "" })
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <Select value={formData.category} onValueChange={(v) => set({ category: v })}>
                      <SelectTrigger id="category" className="mt-2 w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.length === 0 ? (
                          <div className="px-3 py-2 text-sm text-muted-foreground">No categories yet</div>
                        ) : (
                          categoryOptions.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <button
                      type="button"
                      onClick={() => {
                        setCustomCategory(true)
                        set({ category: "" })
                      }}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add a new category
                    </button>
                  </>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="description">Short Description *</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => set({ description: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="detailedDescription">Detailed Description *</Label>
              <Textarea
                id="detailedDescription"
                value={formData.detailedDescription}
                onChange={(e) => set({ detailedDescription: e.target.value })}
                rows={4}
                className="mt-2"
              />
            </div>
          </div>
        )}

        {/* STEP 2 — Specifications */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="composition">Composition *</Label>
                <Input
                  id="composition"
                  value={formData.composition}
                  onChange={(e) => set({ composition: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="dosage">Dosage *</Label>
                <Input
                  id="dosage"
                  value={formData.dosage}
                  onChange={(e) => set({ dosage: e.target.value })}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => set({ price: e.target.value })}
                  placeholder="₹0.00"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="batchNumber">Batch Number *</Label>
                <Input
                  id="batchNumber"
                  value={formData.batchNumber}
                  onChange={(e) => set({ batchNumber: e.target.value })}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="manufactureDate">Manufacture Date *</Label>
                <Input
                  id="manufactureDate"
                  type="date"
                  value={formData.manufactureDate}
                  onChange={(e) => set({ manufactureDate: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="expiryDate">Expiry Date *</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => set({ expiryDate: e.target.value })}
                  className="mt-2"
                />
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Batch number, manufacture and expiry dates are for your records only — they are not shown on the public
              product pages.
            </p>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="inStock"
                checked={formData.inStock}
                onChange={(e) => set({ inStock: e.target.checked })}
                className="h-4 w-4 rounded border-input"
              />
              <Label htmlFor="inStock" className="cursor-pointer">
                In Stock
              </Label>
            </div>
          </div>
        )}

        {/* STEP 3 — Image & Review */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => set({ image: e.target.value })}
                    placeholder="/placeholder.jpg or https://..."
                    className="mt-2"
                  />
                  <p className="mt-1 text-sm text-muted-foreground">Leave the default to use an auto-matched image.</p>
                </div>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-surface">
                <ProductImage
                  src={formData.image}
                  name={formData.name || "Product"}
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-contain p-4"
                />
              </div>
            </div>

            {/* Review summary */}
            <div className="rounded-2xl border border-border bg-muted/30 p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Review</h3>
              <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                <ReviewRow label="Name" value={formData.name} />
                <ReviewRow label="Category" value={formData.category} />
                <ReviewRow label="Price" value={formData.price} />
                <ReviewRow label="In stock" value={formData.inStock ? "Yes" : "No"} />
                <ReviewRow label="Composition" value={formData.composition} />
                <ReviewRow label="Dosage" value={formData.dosage} />
              </dl>
            </div>
          </div>
        )}

        {/* Footer controls */}
        <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
          <Button type="button" variant="ghost" onClick={step === 0 ? onClose : goBack} className="gap-2">
            {step === 0 ? (
              "Cancel"
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                Back
              </>
            )}
          </Button>

          <span className="text-sm text-muted-foreground">
            Step {step + 1} of {STEPS.length}
          </span>

          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={goNext} disabled={!isStepValid(step)} className="gap-2">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting || !allValid} className="gap-2">
              <Check className="h-4 w-4" />
              {isSubmitting ? "Saving..." : product ? "Update Product" : "Add Product"}
            </Button>
          )}
        </div>
      </form>
    </Card>
  )
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-border/60 py-1.5 text-sm sm:border-b-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="max-w-[60%] truncate text-right font-medium text-foreground">{value || "—"}</dd>
    </div>
  )
}
