"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Tag, FolderPlus } from "lucide-react"
import { addCategory, deleteCategory, getCategories } from "@/lib/category-actions"

export function CategoryManager({ initialCategories }: { initialCategories: string[] }) {
  const router = useRouter()
  const [categories, setCategories] = useState<string[]>(initialCategories)
  const [newName, setNewName] = useState("")
  const [adding, setAdding] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const refresh = async () => {
    setCategories(await getCategories())
    router.refresh()
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const clean = newName.trim()
    if (!clean) return
    setAdding(true)
    const result = await addCategory(clean)
    if (result.success) {
      setNewName("")
      await refresh()
    } else {
      setError(result.error || "Failed to add category")
    }
    setAdding(false)
  }

  const handleDelete = async (name: string) => {
    if (!confirm(`Remove the category "${name}"?`)) return
    setDeleting(name)
    const result = await deleteCategory(name)
    if (result.success) await refresh()
    else alert(result.error || "Failed to delete category")
    setDeleting(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Product Categories</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Create the categories you can assign to products. They appear in the dropdown when adding or editing a product.
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleAdd} className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="new-category" className="mb-2 block text-sm font-medium text-foreground">
              New category name
            </label>
            <Input
              id="new-category"
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value)
                setError(null)
              }}
              placeholder="e.g. Cardiac Care"
            />
          </div>
          <Button type="submit" disabled={adding || !newName.trim()} className="gap-2 sm:w-auto">
            <Plus className="h-4 w-4" />
            {adding ? "Adding..." : "Add Category"}
          </Button>
        </form>
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      </Card>

      <Card className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <Tag className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-foreground">All categories ({categories.length})</h3>
        </div>

        {categories.length === 0 ? (
          <div className="py-10 text-center">
            <FolderPlus className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">No categories yet. Add your first one above.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {categories.map((name) => (
              <span
                key={name}
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm font-medium text-foreground"
              >
                {name}
                <button
                  type="button"
                  onClick={() => handleDelete(name)}
                  disabled={deleting === name}
                  aria-label={`Delete ${name}`}
                  className="text-muted-foreground transition-colors hover:text-destructive disabled:opacity-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
        <p className="mt-4 text-xs text-muted-foreground">
          Categories that are still used by one or more products always stay in the list, even after you remove them
          here.
        </p>
      </Card>
    </div>
  )
}
