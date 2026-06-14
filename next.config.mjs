/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Optimize local images (WebP/AVIF + responsive sizing). Allow remote URLs
    // that admins may paste for product/hero/blog/testimonial images.
    formats: ["image/avif", "image/webp"],
    // Cache optimized variants for a year so repeat visits never re-optimize.
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
}

export default nextConfig
