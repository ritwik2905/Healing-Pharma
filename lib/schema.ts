import { pgTable, text, boolean, timestamp, jsonb, serial, integer } from "drizzle-orm/pg-core"

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  detailedDescription: text("detailed_description").notNull(),
  manufactureDate: text("manufacture_date").notNull(),
  expiryDate: text("expiry_date").notNull(),
  batchNumber: text("batch_number").notNull(),
  composition: text("composition").notNull(),
  dosage: text("dosage").notNull(),
  image: text("image").notNull(),
  price: text("price").notNull(),
  inStock: boolean("in_stock").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
})

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // "contact" | "purchase"
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  productId: text("product_id"),
  productName: text("product_name"),
  timestamp: timestamp("timestamp").defaultNow(),
})

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: jsonb("value").notNull(),
})

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  message: text("message").notNull(),
  rating: integer("rating").notNull().default(5),
  image: text("image").notNull().default(""),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
})

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image").notNull().default(""),
  author: text("author").notNull().default("Healingdoc Pharma"),
  category: text("category").notNull().default("News"),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
})
