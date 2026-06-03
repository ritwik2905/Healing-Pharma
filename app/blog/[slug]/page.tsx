import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CalendarDays, User } from "lucide-react"
import { getBlogPostBySlug } from "@/lib/blog-actions"
import { hasRealImage } from "@/lib/image-utils"
import { pageMetadata, siteConfig, absoluteUrl } from "@/lib/seo"
import type { Metadata } from "next"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) {
    return pageMetadata({ title: "Article Not Found", path: `/blog/${slug}`, noIndex: true })
  }
  const image = hasRealImage(post.coverImage) ? post.coverImage : siteConfig.ogImage
  const meta = pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image,
  })
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      authors: [post.author],
      publishedTime: post.createdAt,
      section: post.category,
    },
  }
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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: hasRealImage(post.coverImage) ? absoluteUrl(post.coverImage) : absoluteUrl(siteConfig.ogImage),
    datePublished: post.createdAt,
    dateModified: post.createdAt,
    author: { "@type": "Organization", name: post.author || siteConfig.legalName },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.jpeg") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/blog/${post.slug}`) },
    articleSection: post.category,
  }

  return (
    <main className="bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
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

        {hasRealImage(post.coverImage) && (
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
