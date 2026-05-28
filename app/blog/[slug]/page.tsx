import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CalendarDays, User } from "lucide-react"
import { getBlogPostBySlug } from "@/lib/blog-actions"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return { title: "Article Not Found - Healingdoc Pharma" }
  return { title: `${post.title} - Healingdoc Pharma`, description: post.excerpt }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post || !post.published) {
    notFound()
  }

  const date = new Date(post.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <main className="bg-background">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 gap-2 -ml-3">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Button>
        </Link>

        <Badge className="bg-primary text-white mb-4">{post.category}</Badge>
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground mb-8">
          <span className="flex items-center gap-2">
            <User className="w-4 h-4" />
            {post.author}
          </span>
          <span className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            {date}
          </span>
        </div>

        {post.coverImage && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-lg">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        <div className="space-y-5 text-lg text-foreground/90 leading-relaxed">
          {post.content.split(/\n\n+/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground italic mb-6">
            Disclaimer: This article is for general awareness only and is not a substitute for professional medical
            advice. Always consult a qualified healthcare professional.
          </p>
          <Link href="/products">
            <Button className="gap-2">Explore Our Products</Button>
          </Link>
        </div>
      </article>
    </main>
  )
}
