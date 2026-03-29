"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, LogOut, Package, Settings, MessageSquare, Mail, Phone } from "lucide-react"
import { ProductForm } from "@/components/product-form"
import { logoutAdmin } from "@/lib/admin-auth"
import { deleteProduct } from "@/lib/product-actions"
import { SiteSettingsForm } from "@/components/site-settings-form"
import { deleteInquiry, type Inquiry } from "@/lib/inquiry-actions"

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

interface AdminDashboardProps {
  products: Product[]
  inquiries: Inquiry[]
}

export function AdminDashboard({ products, inquiries }: AdminDashboardProps) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [deletingInquiry, setDeletingInquiry] = useState<string | null>(null)

  const handleLogout = async () => {
    await logoutAdmin()
    router.push("/admin/login")
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    setIsDeleting(id)
    const result = await deleteProduct(id)

    if (result.success) {
      router.refresh()
    } else {
      alert(result.error || "Failed to delete product")
    }
    setIsDeleting(null)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleAddNew = () => {
    setEditingProduct(null)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingProduct(null)
    router.refresh()
  }

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return

    setDeletingInquiry(id)
    const result = await deleteInquiry(id)

    if (result.success) {
      router.refresh()
    } else {
      alert(result.error || "Failed to delete inquiry")
    }
    setDeletingInquiry(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-white/90">Manage your pharmaceutical products and site content</p>
            </div>
            <Button
              variant="secondary"
              onClick={handleLogout}
              className="gap-2 bg-white text-primary hover:bg-white/90"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs for Products and Site Settings */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="products" className="gap-2">
              <Package className="w-4 h-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Inquiries ({inquiries.length})
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="w-4 h-4" />
              Site Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Products</p>
                    <p className="text-3xl font-bold text-foreground">{products.length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">In Stock</p>
                    <p className="text-3xl font-bold text-foreground">{products.filter((p) => p.inStock).length}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Out of Stock</p>
                    <p className="text-3xl font-bold text-foreground">{products.filter((p) => !p.inStock).length}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-foreground">Products</h2>
              <Button onClick={handleAddNew} className="gap-2">
                <Plus className="w-4 h-4" />
                Add New Product
              </Button>
            </div>

            {/* Product Form Modal */}
            {showForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                <div className="my-8">
                  <ProductForm product={editingProduct} onClose={handleFormClose} />
                </div>
              </div>
            )}

            {/* Products Table */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-surface border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-semibold text-foreground">Product</th>
                      <th className="text-left p-4 font-semibold text-foreground">Category</th>
                      <th className="text-left p-4 font-semibold text-foreground">Price</th>
                      <th className="text-left p-4 font-semibold text-foreground">Batch</th>
                      <th className="text-left p-4 font-semibold text-foreground">Expiry</th>
                      <th className="text-left p-4 font-semibold text-foreground">Status</th>
                      <th className="text-right p-4 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-border hover:bg-surface transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium text-foreground">{product.name}</p>
                              <p className="text-sm text-muted-foreground">{product.composition}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline">{product.category}</Badge>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-foreground">{product.price}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-muted-foreground">{product.batchNumber}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-muted-foreground">
                            {new Date(product.expiryDate).toLocaleDateString("en-IN")}
                          </span>
                        </td>
                        <td className="p-4">
                          {product.inStock ? (
                            <Badge className="bg-success text-white">In Stock</Badge>
                          ) : (
                            <Badge className="bg-destructive text-white">Out of Stock</Badge>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleEdit(product)} className="gap-2">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(product.id)}
                              disabled={isDeleting === product.id}
                              className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Inquiries Tab Content */}
          <TabsContent value="inquiries">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Customer Inquiries</h2>
                <Badge variant="outline" className="text-lg px-4 py-2">
                  {inquiries.length} Total
                </Badge>
              </div>

              {inquiries.length === 0 ? (
                <Card className="p-12 text-center">
                  <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No inquiries yet</h3>
                  <p className="text-muted-foreground">Customer inquiries will appear here</p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inquiry) => (
                    <Card key={inquiry.id} className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge variant={inquiry.type === "purchase" ? "default" : "secondary"}>
                              {inquiry.type === "purchase" ? "Purchase Inquiry" : "Contact Form"}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {new Date(inquiry.timestamp).toLocaleString("en-IN", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })}
                            </span>
                          </div>

                          {inquiry.productName && (
                            <p className="text-sm text-muted-foreground mb-2">
                              Product: <span className="font-semibold text-foreground">{inquiry.productName}</span>
                            </p>
                          )}

                          <div className="grid md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Name</p>
                              <p className="font-medium text-foreground">{inquiry.name}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-accent" />
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Email</p>
                                <a href={`mailto:${inquiry.email}`} className="font-medium text-accent hover:underline">
                                  {inquiry.email}
                                </a>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-success" />
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Phone</p>
                                <a
                                  href={`tel:${inquiry.phone}`}
                                  className="font-medium text-foreground hover:underline"
                                >
                                  {inquiry.phone}
                                </a>
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm text-muted-foreground mb-2">Message</p>
                            <p className="text-foreground leading-relaxed">{inquiry.message}</p>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteInquiry(inquiry.id)}
                          disabled={deletingInquiry === inquiry.id}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <SiteSettingsForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
