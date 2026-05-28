"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { ProductImage } from "@/components/product-image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  Package,
  Settings,
  MessageSquare,
  Mail,
  Phone,
  Star,
  BookOpen,
  Quote,
} from "lucide-react"
import { ProductForm } from "@/components/product-form"
import { TestimonialForm } from "@/components/testimonial-form"
import { BlogForm } from "@/components/blog-form"
import { logoutAdmin } from "@/lib/admin-auth"
import { deleteProduct } from "@/lib/product-actions"
import { SiteSettingsForm } from "@/components/site-settings-form"
import { deleteInquiry, type Inquiry } from "@/lib/inquiry-actions"
import { deleteTestimonial, type Testimonial } from "@/lib/testimonial-actions"
import { deleteBlogPost, type BlogPost } from "@/lib/blog-actions"

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
  testimonials: Testimonial[]
  blogPosts: BlogPost[]
}

function ModalShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto">
      <div className="my-8 w-full flex justify-center">{children}</div>
    </div>
  )
}

export function AdminDashboard({ products, inquiries, testimonials, blogPosts }: AdminDashboardProps) {
  const router = useRouter()

  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [deletingInquiry, setDeletingInquiry] = useState<string | null>(null)

  const [showTestimonialForm, setShowTestimonialForm] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [deletingTestimonial, setDeletingTestimonial] = useState<string | null>(null)

  const [showBlogForm, setShowBlogForm] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [deletingPost, setDeletingPost] = useState<string | null>(null)

  const handleLogout = async () => {
    await logoutAdmin()
    router.push("/admin/login")
    router.refresh()
  }

  // ---- Products ----
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    setIsDeleting(id)
    const result = await deleteProduct(id)
    if (result.success) router.refresh()
    else alert(result.error || "Failed to delete product")
    setIsDeleting(null)
  }
  const handleProductFormClose = () => {
    setShowForm(false)
    setEditingProduct(null)
    router.refresh()
  }

  // ---- Inquiries ----
  const handleDeleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return
    setDeletingInquiry(id)
    const result = await deleteInquiry(id)
    if (result.success) router.refresh()
    else alert(result.error || "Failed to delete inquiry")
    setDeletingInquiry(null)
  }

  // ---- Testimonials ----
  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return
    setDeletingTestimonial(id)
    const result = await deleteTestimonial(id)
    if (result.success) router.refresh()
    else alert(result.error || "Failed to delete testimonial")
    setDeletingTestimonial(null)
  }
  const handleTestimonialFormClose = () => {
    setShowTestimonialForm(false)
    setEditingTestimonial(null)
    router.refresh()
  }

  // ---- Blog ----
  const handleDeletePost = async (id: string) => {
    if (!confirm("Delete this blog post?")) return
    setDeletingPost(id)
    const result = await deleteBlogPost(id)
    if (result.success) router.refresh()
    else alert(result.error || "Failed to delete blog post")
    setDeletingPost(null)
  }
  const handleBlogFormClose = () => {
    setShowBlogForm(false)
    setEditingPost(null)
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Admin Dashboard</h1>
              <p className="text-white/90 text-sm sm:text-base">Manage products, content and site settings</p>
            </div>
            <Button
              variant="secondary"
              onClick={handleLogout}
              className="gap-2 bg-white text-primary hover:bg-white/90 w-full sm:w-auto"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Tabs defaultValue="products" className="w-full">
          <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 mb-6 lg:mb-8">
            <TabsList className="w-max">
              <TabsTrigger value="products" className="gap-2">
                <Package className="w-4 h-4" />
                Products
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="gap-2">
                <Star className="w-4 h-4" />
                Testimonials
              </TabsTrigger>
              <TabsTrigger value="blog" className="gap-2">
                <BookOpen className="w-4 h-4" />
                Blog
              </TabsTrigger>
              <TabsTrigger value="inquiries" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                Inquiries ({inquiries.length})
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>
          </div>

          {/* PRODUCTS */}
          <TabsContent value="products">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 lg:mb-12">
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
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
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center shrink-0">
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
                  <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Out of Stock</p>
                    <p className="text-3xl font-bold text-foreground">{products.filter((p) => !p.inStock).length}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 lg:mb-8">
              <h2 className="text-2xl font-bold text-foreground">Products</h2>
              <Button
                onClick={() => {
                  setEditingProduct(null)
                  setShowForm(true)
                }}
                className="gap-2 w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" />
                Add New Product
              </Button>
            </div>

            {showForm && (
              <ModalShell>
                <ProductForm product={editingProduct} onClose={handleProductFormClose} />
              </ModalShell>
            )}

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px]">
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
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-surface shrink-0">
                              <ProductImage
                                src={product.image}
                                name={product.name}
                                sizes="48px"
                                className="object-contain p-1"
                                compact
                              />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{product.name}</p>
                              <p className="text-sm text-muted-foreground line-clamp-1 max-w-[280px]">
                                {product.composition}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline">{product.category}</Badge>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-foreground whitespace-nowrap">{product.price}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-muted-foreground">{product.batchNumber}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-muted-foreground whitespace-nowrap">
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
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingProduct(product)
                                setShowForm(true)
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(product.id)}
                              disabled={isDeleting === product.id}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
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

          {/* TESTIMONIALS */}
          <TabsContent value="testimonials">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 lg:mb-8">
              <h2 className="text-2xl font-bold text-foreground">Testimonials ({testimonials.length})</h2>
              <Button
                onClick={() => {
                  setEditingTestimonial(null)
                  setShowTestimonialForm(true)
                }}
                className="gap-2 w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" />
                Add Testimonial
              </Button>
            </div>

            {showTestimonialForm && (
              <ModalShell>
                <TestimonialForm testimonial={editingTestimonial} onClose={handleTestimonialFormClose} />
              </ModalShell>
            )}

            {testimonials.length === 0 ? (
              <Card className="p-12 text-center">
                <Quote className="w-14 h-14 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No testimonials yet</h3>
                <p className="text-muted-foreground">Add your first testimonial to display it on the site.</p>
              </Card>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {testimonials.map((t) => (
                  <Card key={t.id} className="p-5 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < t.rating ? "fill-warning text-warning" : "fill-muted text-muted"}`}
                          />
                        ))}
                      </div>
                      {t.featured && <Badge className="bg-primary text-white text-xs">Featured</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 flex-1">{t.message}</p>
                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground text-sm">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingTestimonial(t)
                            setShowTestimonialForm(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTestimonial(t.id)}
                          disabled={deletingTestimonial === t.id}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* BLOG */}
          <TabsContent value="blog">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6 lg:mb-8">
              <h2 className="text-2xl font-bold text-foreground">Blog Posts ({blogPosts.length})</h2>
              <Button
                onClick={() => {
                  setEditingPost(null)
                  setShowBlogForm(true)
                }}
                className="gap-2 w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" />
                Add Blog Post
              </Button>
            </div>

            {showBlogForm && (
              <ModalShell>
                <BlogForm post={editingPost} onClose={handleBlogFormClose} />
              </ModalShell>
            )}

            {blogPosts.length === 0 ? (
              <Card className="p-12 text-center">
                <BookOpen className="w-14 h-14 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No blog posts yet</h3>
                <p className="text-muted-foreground">Write your first article to publish it on the blog.</p>
              </Card>
            ) : (
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px]">
                    <thead className="bg-surface border-b border-border">
                      <tr>
                        <th className="text-left p-4 font-semibold text-foreground">Title</th>
                        <th className="text-left p-4 font-semibold text-foreground">Category</th>
                        <th className="text-left p-4 font-semibold text-foreground">Date</th>
                        <th className="text-left p-4 font-semibold text-foreground">Status</th>
                        <th className="text-right p-4 font-semibold text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogPosts.map((post) => (
                        <tr key={post.id} className="border-b border-border hover:bg-surface transition-colors">
                          <td className="p-4">
                            <p className="font-medium text-foreground line-clamp-1 max-w-[320px]">{post.title}</p>
                            <p className="text-xs text-muted-foreground">/{post.slug}</p>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline">{post.category}</Badge>
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-muted-foreground whitespace-nowrap">
                              {new Date(post.createdAt).toLocaleDateString("en-IN")}
                            </span>
                          </td>
                          <td className="p-4">
                            {post.published ? (
                              <Badge className="bg-success text-white">Published</Badge>
                            ) : (
                              <Badge variant="secondary">Draft</Badge>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setEditingPost(post)
                                  setShowBlogForm(true)
                                }}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeletePost(post.id)}
                                disabled={deletingPost === post.id}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
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
            )}
          </TabsContent>

          {/* INQUIRIES */}
          <TabsContent value="inquiries">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Customer Inquiries</h2>
                <Badge variant="outline" className="text-base px-3 py-1.5">
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
                    <Card key={inquiry.id} className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
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

                          <div className="grid sm:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Name</p>
                              <p className="font-medium text-foreground">{inquiry.name}</p>
                            </div>
                            <div className="flex items-center gap-2 min-w-0">
                              <Mail className="w-4 h-4 text-accent shrink-0" />
                              <div className="min-w-0">
                                <p className="text-sm text-muted-foreground mb-1">Email</p>
                                <a
                                  href={`mailto:${inquiry.email}`}
                                  className="font-medium text-accent hover:underline break-all"
                                >
                                  {inquiry.email}
                                </a>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-success shrink-0" />
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Phone</p>
                                <a href={`tel:${inquiry.phone}`} className="font-medium text-foreground hover:underline">
                                  {inquiry.phone}
                                </a>
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm text-muted-foreground mb-2">Message</p>
                            <p className="text-foreground leading-relaxed break-words">{inquiry.message}</p>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteInquiry(inquiry.id)}
                          disabled={deletingInquiry === inquiry.id}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
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

          {/* SETTINGS */}
          <TabsContent value="settings">
            <SiteSettingsForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
