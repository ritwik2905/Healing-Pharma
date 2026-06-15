import { BookOpen } from "lucide-react"
import { getBlogPosts } from "@/lib/blog-actions"
import { BlogCard } from "@/components/blog-card"
import { PageHero } from "@/components/page-hero"
import { SITE_IMAGES } from "@/lib/site-images"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Health tips, awareness articles and company updates from Healingdoc Pharma Private Limited",
  path: "/blog",
})

export const dynamic = "force-dynamic"

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <main>
      <PageHero
        image={SITE_IMAGES.blog.hero}
        imageAlt="Stethoscope resting on a notebook"
        eyebrow="From Our Blog"
        eyebrowIcon={<BookOpen className="h-4 w-4" />}
        title="Health Insights & Updates"
        description="Practical health tips, awareness articles and the latest news from Healingdoc Pharma."
        priority
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">No articles yet</h2>
              <p className="text-muted-foreground">Our team is working on fresh content. Check back soon.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
