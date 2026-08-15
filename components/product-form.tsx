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
import { X, Check, FileText, FlaskConical, ImageIcon, Plus, AlertCircle } from "lucide-react"
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

// Mobile browsers routinely discard the page while the OS photo picker is open,
// which used to wipe a half-finished edit (and the crop) with no warning. The
// draft is mirrored into sessionStorage so the dashboard can reopen the form
// exactly where the admin left it. See the draft effect in admin-dashboard.
export const PRODUCT_DRAFT_KEY = "hd:product-form-draft"

export function clearProductDraft() {
  try {
    sessionStorage.removeItem(PRODUCT_DRAFT_KEY)
  } catch {
    /* private mode / storage disabled — drafts are a nicety, never required */
  }
}

const REQUIRED: { field: keyof Omit<Product, "id" | "image" | "inStock">; label: string }[] = [
  { field: "name", label: "Product name" },
  { field: "category", label: "Category" },
  { field: "description", label: "Short description" },
  { field: "detailedDescription", label: "Detailed description" },
  { field: "composition", label: "Composition" },
  { field: "dosage", label: "Dosage" },
  { field: "price", label: "Price" },
  { field: "batchNumber", label: "Batch number" },
  { field: "manufactureDate", label: "Manufacture date" },
  { field: "expiryDate", label: "Expiry date" },
]

export function ProductForm({ product, categories = [], onClose }: ProductFormProps) {
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

  const formRef = useRef<HTMLFormElement | null>(null)

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
    } catch {
      /* corrupt draft — start from the product as loaded */
    }
  }, [product?.id])

  useEffect(() => {
    try {
      sessionStorage.setItem(PRODUCT_DRAFT_KEY, JSON.stringify({ productId: product?.id ?? null, formData }))
    } catch {
      /* quota exceeded (very large crop) — saving still works, only the
         crash-recovery draft is skipped */
    }
  }, [product?.id, formData])

  // Always include the product's current category so editing never loses it.
  const categoryOptions = Array.from(
    new Set([...categories, product?.category].filter((c): c is string => Boolean(c && c.trim()))),
  ).sort((a, b) => a.localeCompare(b))

  const set = (patch: Partial<typeof formData>) => setFormData((prev) => ({ ...prev, ...patch }))

  const missing = REQUIRED.filter((r) => !String(formData[r.field] ?? "").trim())

  const closeAndClear = () => {
    clearProductDraft()
    onClose()
  }

  const save = async () => {
    if (missing.length > 0) {
      setShowErrors(true)
      // Put the first empty field on screen and in focus rather than just
      // refusing to save.
      const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${missing[0].field}"]`)
      el?.scrollIntoView({ behavior: "smooth", block: "center" })
      el?.focus({ preventScroll: true })
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
    void save()
  }

  // Enter in a single-line field must not submit the form — an accidental
  // Enter used to save and close the modal mid-edit. Textareas keep their
  // newline; the category dropdown is portaled out of the form, so Radix's own
  // Enter handling is untouched.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter") return
    if ((e.target as HTMLElement).tagName !== "INPUT") return
    e.preventDefault()
  }

  const invalid = (field: string) =>
    showErrors && !String(formData[field as keyof typeof formData] ?? "").trim()

  const fieldClass = (field: string) =>
    invalid(field) ? "border-destructive focus-visible:ring-destructive" : ""

  return (
    <Card className="w-full max-w-4xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{product ? "Edit Product" : "Add New Product"}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Everything is on this one page — edit any field, change the photo, then save.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={closeAndClear} aria-label="Close">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-8">
        {/* ── Product image ─────────────────────────────────────────────── */}
        <Section icon={ImageIcon} title="Product Image" description="Upload and crop a square photo, or paste a URL.">
          <div className="grid gap-6 md:grid-cols-[1fr_240px]">
            <div className="space-y-4">
              <ImageCropper onCropped={(dataUrl) => set({ image: dataUrl })} />

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
                <p className="mt-1 text-sm text-muted-foreground">
                  Leave the default to use an auto-matched catalogue image.
                </p>
              </div>
            </div>

            <div>
              <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Preview
              </span>
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-surface">
                <ProductImage
                  src={formData.image}
                  name={formData.name || "Product"}
                  sizes="(max-width: 768px) 100vw, 240px"
                  className="object-contain p-4"
                />
              </div>
            </div>
          </div>
        </Section>

        {/* ── Basics ────────────────────────────────────────────────────── */}
        <Section icon={FileText} title="Product Details" description="Name, category and the descriptions shown online.">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  data-field="name"
                  value={formData.name}
                  onChange={(e) => set({ name: e.target.value })}
                  className={cn("mt-2", fieldClass("name"))}
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                {customCategory ? (
                  <div className="mt-2 flex gap-2">
                    <Input
                      id="category"
                      data-field="category"
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
                      <SelectTrigger id="category" data-field="category" className={cn("mt-2 w-full", fieldClass("category"))}>
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
                data-field="description"
                value={formData.description}
                onChange={(e) => set({ description: e.target.value })}
                className={cn("mt-2", fieldClass("description"))}
              />
            </div>

            <div>
              <Label htmlFor="detailedDescription">Detailed Description *</Label>
              <Textarea
                id="detailedDescription"
                data-field="detailedDescription"
                value={formData.detailedDescription}
                onChange={(e) => set({ detailedDescription: e.target.value })}
                rows={4}
                className={cn("mt-2", fieldClass("detailedDescription"))}
              />
            </div>
          </div>
        </Section>

        {/* ── Specifications ────────────────────────────────────────────── */}
        <Section
          icon={FlaskConical}
          title="Specifications"
          description="Composition, price and your internal batch records."
        >
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="composition">Composition *</Label>
                <Input
                  id="composition"
                  data-field="composition"
                  value={formData.composition}
                  onChange={(e) => set({ composition: e.target.value })}
                  className={cn("mt-2", fieldClass("composition"))}
                />
              </div>
              <div>
                <Label htmlFor="dosage">Dosage *</Label>
                <Input
                  id="dosage"
                  data-field="dosage"
                  value={formData.dosage}
                  onChange={(e) => set({ dosage: e.target.value })}
                  className={cn("mt-2", fieldClass("dosage"))}
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  data-field="price"
                  value={formData.price}
                  onChange={(e) => set({ price: e.target.value })}
                  placeholder="₹0.00"
                  className={cn("mt-2", fieldClass("price"))}
                />
              </div>
              <div>
                <Label htmlFor="batchNumber">Batch Number *</Label>
                <Input
                  id="batchNumber"
                  data-field="batchNumber"
                  value={formData.batchNumber}
                  onChange={(e) => set({ batchNumber: e.target.value })}
                  className={cn("mt-2", fieldClass("batchNumber"))}
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="manufactureDate">Manufacture Date *</Label>
                <Input
                  id="manufactureDate"
                  data-field="manufactureDate"
                  type="date"
                  value={formData.manufactureDate}
                  onChange={(e) => set({ manufactureDate: e.target.value })}
                  className={cn("mt-2", fieldClass("manufactureDate"))}
                />
              </div>
              <div>
                <Label htmlFor="expiryDate">Expiry Date *</Label>
                <Input
                  id="expiryDate"
                  data-field="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => set({ expiryDate: e.target.value })}
                  className={cn("mt-2", fieldClass("expiryDate"))}
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
        </Section>

        {showErrors && missing.length > 0 && (
          <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>Still required: {missing.map((m) => m.label).join(", ")}.</span>
          </div>
        )}

        {saveError && (
          <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{saveError}</span>
          </div>
        )}

        {/* Footer controls — sticky so Save is always reachable in a long form. */}
        <div className="sticky bottom-0 -mx-6 -mb-6 flex items-center justify-end gap-3 border-t border-border bg-card/95 px-6 py-4 backdrop-blur sm:-mx-8 sm:-mb-8 sm:px-8">
          <Button type="button" variant="ghost" onClick={closeAndClear}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="gap-2">
            <Check className="h-4 w-4" />
            {isSubmitting ? "Saving..." : product ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </form>
    </Card>
  )
}

function Section({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-border bg-muted/20 p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </section>
  )
}
