import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const mediaSchema = z
  .object({
    featured: z.string().optional(),
    background: z.string().optional(),
    alt: z.string().optional(),
    focalPoint: z
      .object({
        x: z.number(),
        y: z.number()
      })
      .optional()
  })
  .default({});

const seoSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    ogImage: z.string().optional()
  })
  .default({});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(""),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    slug: z.string().optional(),
    section: z.string().default("posts"),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    series: z.array(z.string()).default([]),
    seriesOrder: z.number().optional(),
    themeColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).default("#146b5b"),
    media: mediaSchema,
    seo: seoSchema,
    extensionFields: z.record(z.string(), z.unknown()).default({})
  })
});

export const collections = { posts };
