import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  // Pass the 'image' helper into the schema function
  schema: ({ image }) => z.object({
    title: z.string().max(70, "Title should be under 70 characters for optimal SEO."),
    description: z.string().max(160, "Description should be under 160 characters."),
    author: z.string().default('Pulkit Bansal'),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    category: z.string(),
    tags: z.array(z.string()),
    // Upgrade featuredImage to use the image() processor
    featuredImage: image().optional(),
    isDraft: z.boolean().default(false),
  }),
});

export const collections = {
  'blog': blogCollection,
};