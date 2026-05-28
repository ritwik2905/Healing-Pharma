"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import { addTestimonial, updateTestimonial, type Testimonial } from "@/lib/testimonial-actions"

interface TestimonialFormProps {
  testimonial?: Testimonial | null
  onClose: () => void
}

export function TestimonialForm({ testimonial, onClose }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    name: testimonial?.name || "",
    role: testimonial?.role || "",
    message: testimonial?.message || "",
    rating: testimonial?.rating ?? 5,
    image: testimonial?.image || "",
    featured: testimonial?.featured ?? false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const result = testimonial
      ? await updateTestimonial(testimonial.id, formData)
      : await addTestimonial(formData)
    if (result.success) {
      onClose()
    } else {
      alert(result.error || "Failed to save testimonial")
    }
    setIsSubmitting(false)
  }

  return (
    <Card className="w-full max-w-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
          {testimonial ? "Edit Testimonial" : "Add Testimonial"}
        </h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="t-name">Name *</Label>
            <Input
              id="t-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="t-role">Role / Designation *</Label>
            <Input
              id="t-role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g. Physician, Delhi"
              required
              className="mt-2"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="t-message">Message *</Label>
          <Textarea
            id="t-message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            rows={4}
            className="mt-2"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="t-rating">Rating (1-5) *</Label>
            <select
              id="t-rating"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
              className="mt-2 w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} Star{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="t-image">Image URL (optional)</Label>
            <Input
              id="t-image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="/photo.jpg or https://..."
              className="mt-2"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="t-featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-4 h-4 rounded border-input"
          />
          <Label htmlFor="t-featured" className="cursor-pointer">
            Show on homepage (featured)
          </Label>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? "Saving..." : testimonial ? "Update" : "Add Testimonial"}
          </Button>
          <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
