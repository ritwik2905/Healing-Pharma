"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"
import { addBlogPost, updateBlogPost, type BlogPost } from "@/lib/blog-actions"

interface BlogFormProps {
  post?: BlogPost | null
  onClose: () => void
}

export function BlogForm({ post, onClose }: BlogFormProps) {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    category: post?.category || "Health Tips",
    author: post?.author || "Healingdoc Pharma",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    coverImage: post?.coverImage || "",
    published: post?.published ?? true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const result = post ? await updateBlogPost(post.id, formData) : await addBlogPost(formData)
    if (result.success) {
      onClose()
    } else {
      alert(result.error || "Failed to save blog post")
    }
    setIsSubmitting(false)
  }

  return (
    <Card className="w-full max-w-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">{post ? "Edit Post" : "Add Blog Post"}</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="b-title">Title *</Label>
          <Input
            id="b-title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="mt-2"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="b-slug">Slug (optional)</Label>
            <Input
              id="b-slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="auto-generated from title"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="b-category">Category *</Label>
            <Input
              id="b-category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              className="mt-2"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="b-author">Author *</Label>
            <Input
              id="b-author"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              required
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="b-cover">Cover Image URL</Label>
            <Input
              id="b-cover"
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              placeholder="/image.jpg or https://..."
              className="mt-2"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="b-excerpt">Excerpt *</Label>
          <Textarea
            id="b-excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            required
            rows={2}
            className="mt-2"
            placeholder="Short summary shown on cards"
          />
        </div>

        <div>
          <Label htmlFor="b-content">Content *</Label>
          <Textarea
            id="b-content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            rows={10}
            className="mt-2"
            placeholder="Full article. Separate paragraphs with a blank line."
          />
          <p className="text-xs text-muted-foreground mt-1">Separate paragraphs with a blank line.</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="b-published"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            className="w-4 h-4 rounded border-input"
          />
          <Label htmlFor="b-published" className="cursor-pointer">
            Published (visible on site)
          </Label>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? "Saving..." : post ? "Update Post" : "Add Post"}
          </Button>
          <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
