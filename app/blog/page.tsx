import { BookOpen } from "lucide-react"
import { getBlogPosts } from "@/lib/blog-actions"
import { BlogCard } from "@/components/blog-card"

export const metadata = {
  title: "Blog - Healingdoc Pharma",
  description:
    "Health tips, awareness articles and company updates from Healingdoc Pharma Pvt. Ltd.",
}

export const dynamic = "force-dynamic"

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <main className="bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">Health Insights & Updates</h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Practical health tips, awareness articles and the latest news from Healingdoc Pharma.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">No articles yet</h2>
              <p className="text-muted-foreground">Our team is working on fresh content. Check back soon.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
