import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string(),
    category: z.string(),
    excerpt: z.string(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    pinned: z.boolean().default(false), // Pin post to top of blog listing
    // Custom metadata fields
    tags: z.array(z.string()).optional(), // Array of tags for filtering/categorization
    readingTime: z.number().optional(), // Estimated reading time in minutes
    lastModified: z.coerce.date().optional(), // Last modification date
    publish: z.boolean().default(true), // Draft/publish toggle
    seo: z.object({
      title: z.string().optional(), // Custom SEO title
      description: z.string().optional(), // Custom SEO description
      keywords: z.array(z.string()).optional(), // SEO keywords
    }).optional(),
    relatedPosts: z.array(z.string()).optional(), // IDs of related posts
  }),
});

export const collections = { posts };
