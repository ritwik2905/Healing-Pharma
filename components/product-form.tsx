"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductImage } from "@/components/product-image"
import { ImageCropper } from "@/components/image-cropper"
import { X, ChevronLeft, ChevronRight, Check, FileText, FlaskConical, ImageIcon, Plus, AlertCircle } from "lucide-react"
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

const LAST_STEP = STEPS.length - 1

// Mobile browsers routinely discard the page while the OS photo picker is open,
// which used to wipe a half-finished edit (and the crop) with no warning. The
// draft is mirrored into sessionStorage so the dashboard can reopen the form
// exactly where the admin left it. See `readProductDraft` in admin-dashboard.
export const PRODUCT_DRAFT_KEY = "hd:product-form-draft"

export function clearProductDraft() {
  try {
    sessionStorage.removeItem(PRODUCT_DRAFT_KEY)
  } catch {
    /* private mode / storage disabled — drafts are a nicety, never required */
  }
}

const FIELD_LABELS: Record<string, string> = {
  name: "Product name",
  category: "Category",
  description: "Short description",
  detailedDescription: "Detailed description",
  composition: "Composition",
  dosage: "Dosage",
  price: "Price",
  batchNumber: "Batch number",
  manufactureDate: "Manufacture date",
  expiryDate: "Expiry date",
}

const STEP_FIELDS: string[][] = [
  ["name", "category", "description", "detailedDescription"],
  ["composition", "dosage", "price", "batchNumber", "manufactureDate", "expiryDate"],
  [],
]

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
  const [saveError, setSaveError] = useState<string | null>(null)
  const [showErrors, setShowErrors] = useState(false)
  // Free-type a brand-new category that isn't in the dropdown yet.
  const [customCategory, setCustomCategory] = useState(false)

  // Restore an interrupted edit (see PRODUCT_DRAFT_KEY above).
  const restored = useRef(false)
  useEffect(() => {
    if (restored.current) return
    restored.current = true
    try {
      const raw = sessionStorage.getItem(PRODUCT_DRAFT_KEY)
      if (!raw) return
      const draft = JSON.parse(raw)
      if (draft?.productId !== (product?.id ?? null)) return
      if (draft.formData) setFormData((prev) => ({ ...prev, ...draft.formData }))
      if (typeof draft.step === "number") setStep(Math.min(Math.max(draft.step, 0), LAST_STEP))
    } catch {
      /* corrupt draft — start from the product as loaded */
    }
  }, [product?.id])

  useEffect(() => {
    try {
      sessionStorage.setItem(
        PRODUCT_DRAFT_KEY,
        JSON.stringify({ productId: product?.id ?? null, step, formData }),
      )
    } catch {
      /* quota exceeded (very large crop) — saving still works, only the
         crash-recovery draft is skipped */
    }
  }, [product?.id, step, formData])

  // Always include the product's current category so editing never loses it.
  const categoryOptions = Array.from(
    new Set([...categories, product?.category].filter((c): c is string => Boolean(c && c.trim()))),
  ).sort((a, b) => a.localeCompare(b))

  const set = (patch: Partial<typeof formData>) => setFormData((prev) => ({ ...prev, ...patch }))

  const missingIn = (s: number) =>
    STEP_FIELDS[s].filter((f) => !String(formData[f as keyof typeof formData] ?? "").trim())

  const isStepValid = (s: number) => missingIn(s).length === 0
  const allValid = [0, 1, 2].every(isStepValid)
  const missingHere = missingIn(step)

  const goTo = (s: number) => {
    setSaveError(null)
    setStep(Math.min(Math.max(s, 0), LAST_STEP))
  }
  // Moving forward is never blocked — the admin must always be able to reach the
  // Image step, even if an older product is missing a batch number or a date.
  const goNext = () => goTo(step + 1)
  const goBack = () => goTo(step - 1)

  const closeAndClear = () => {
    clearProductDraft()
    onClose()
  }

  const save = async () => {
    const firstInvalid = [0, 1, 2].find((s) => !isStepValid(s))
    if (firstInvalid !== undefined) {
      setShowErrors(true)
      setStep(firstInvalid)
      return
    }

    setSaveError(null)
    setIsSubmitting(true)
    try {
      const result = product ? await updateProduct(product.id, formData) : await addProduct(formData)
      if (result.success) {
        clearProductDraft()
        onClose()
        return
      }
      setSaveError(result.error || "Failed to save product.")
    } catch (err) {
      // A rejected Server Action (payload too large, network drop, expired
      // session) used to leave the button stuck on "Saving..." with no reason
      // shown. Surface it instead.
      console.error("Failed to save product:", err)
      setSaveError(
        "Couldn't reach the server. If you just cropped a large photo, try a tighter crop — otherwise check your connection and log in again.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Only the final step may save. Without this, pressing Enter on step 1 or 2
    // of an existing product (where every field is already filled) submitted the
    // form and closed the whole modal before the admin ever reached the image.
    if (step < LAST_STEP) {
      goNext()
      return
    }
    void save()
  }

  // Enter inside a single-line field means "next", never "save and close".
  // (Textareas keep their newline; the category dropdown is portaled out of the
  // form, so Radix's own Enter handling is untouched.)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter") return
    if ((e.target as HTMLElement).tagName !== "INPUT") return
    e.preventDefault()
    if (step < LAST_STEP) goNext()
  }

  const invalidClass = (field: string) =>
    showErrors && !String(formData[field as keyof typeof formData] ?? "").trim()
      ? "border-destructive focus-visible:ring-destructive"
      : ""

  return (
    <Card className="w-full max-w-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">{product ? "Edit Product" : "Add New Product"}</h2>
        <Button variant="ghost" size="sm" onClick={closeAndClear} aria-label="Close">
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Stepper — every step stays reachable at any time. */}
      <ol className="mb-8 flex items-center gap-2">
        {STEPS.map((s, i) => {
          const isDone = i < step
          const active = i === step
          const Icon = s.icon
          return (
            <li key={s.title} className="flex flex-1 items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(i)}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-left transition-colors hover:bg-muted",
                  !active && "cursor-pointer",
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

      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-6">
        {showErrors && missingHere.length > 0 && (
          <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>Still required: {missingHere.map((f) => FIELD_LABELS[f]).join(", ")}.</span>
          </div>
        )}

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
                  className={cn("mt-2", invalidClass("name"))}
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
                      <SelectTrigger id="category" className={cn("mt-2 w-full", invalidClass("category"))}>
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
                className={cn("mt-2", invalidClass("description"))}
              />
            </div>

            <div>
              <Label htmlFor="detailedDescription">Detailed Description *</Label>
              <Textarea
                id="detailedDescription"
                value={formData.detailedDescription}
                onChange={(e) => set({ detailedDescription: e.target.value })}
                rows={4}
                className={cn("mt-2", invalidClass("detailedDescription"))}
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
                  className={cn("mt-2", invalidClass("composition"))}
                />
              </div>
              <div>
                <Label htmlFor="dosage">Dosage *</Label>
                <Input
                  id="dosage"
                  value={formData.dosage}
                  onChange={(e) => set({ dosage: e.target.value })}
                  className={cn("mt-2", invalidClass("dosage"))}
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
                  className={cn("mt-2", invalidClass("price"))}
                />
              </div>
              <div>
                <Label htmlFor="batchNumber">Batch Number *</Label>
                <Input
                  id="batchNumber"
                  value={formData.batchNumber}
                  onChange={(e) => set({ batchNumber: e.target.value })}
                  className={cn("mt-2", invalidClass("batchNumber"))}
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
                  className={cn("mt-2", invalidClass("manufactureDate"))}
                />
              </div>
              <div>
                <Label htmlFor="expiryDate">Expiry Date *</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => set({ expiryDate: e.target.value })}
                  className={cn("mt-2", invalidClass("expiryDate"))}
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
                  <Label>Product Image</Label>
                  <p className="mb-3 mt-1 text-sm text-muted-foreground">
                    Upload and crop a square photo, or paste an image URL below.
                  </p>
                  <ImageCropper onCropped={(dataUrl) => set({ image: dataUrl })} />
                </div>

                <div className="flex items-center gap-3">
                  <span className="h-px flex-1 bg-border" />
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">or</span>
                  <span className="h-px flex-1 bg-border" />
                </div>

                <div>
                  <Label htmlFor="image">Image URL</Label>
                  {formData.image.startsWith("data:") ? (
                    <div className="mt-2 flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm">
                      <span className="font-medium text-foreground">
                        Cropped image ready ({Math.round(formData.image.length / 1024)}KB)
                      </span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => set({ image: "/placeholder.jpg" })}>
                        Clear
                      </Button>
                    </div>
                  ) : (
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => set({ image: e.target.value })}
                      placeholder="/placeholder.jpg or https://..."
                      className="mt-2"
                    />
                  )}
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

        {saveError && (
          <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{saveError}</span>
          </div>
        )}

        {/* Footer controls */}
        <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
          <Button type="button" variant="ghost" onClick={step === 0 ? closeAndClear : goBack} className="gap-2">
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

          {step < LAST_STEP ? (
            <Button type="button" onClick={goNext} className="gap-2">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="button" onClick={() => void save()} disabled={isSubmitting} className="gap-2">
              <Check className="h-4 w-4" />
              {isSubmitting ? "Saving..." : product ? "Update Product" : "Add Product"}
            </Button>
          )}
        </div>

        {step === LAST_STEP && !allValid && (
          <p className="text-right text-xs text-muted-foreground">
            Some required fields are still empty — saving will take you back to them.
          </p>
        )}
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
