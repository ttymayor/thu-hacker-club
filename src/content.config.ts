import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/pages/posts" }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.string(),
    layout: z.string().optional()
  })
});

export const collections = { blog };
