import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CalendarDays, Newspaper } from "lucide-react"
import type { BlogPost } from "@/lib/blog-actions"
import { hasRealImage } from "@/lib/image-utils"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="reveal group block h-full">
      <Card className="glass-card overflow-hidden h-full flex flex-col border-0 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-accent/20">
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          {hasRealImage(post.coverImage) ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/15 via-accent/10 to-surface">
              <Newspaper className="w-12 h-12 text-primary/50" />
            </div>
          )}
          <Badge className="absolute top-3 left-3 bg-primary text-white">{post.category}</Badge>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <CalendarDays className="w-3.5 h-3.5" />
            {formatDate(post.createdAt)}
            <span>•</span>
            {post.author}
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
          <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
            Read More
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Card>
    </Link>
  )
}
