import { z } from "zod";

export const InsightSchema = z.object({
  id:           z.string(),
  slug:         z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase kebab-case"),
  title:        z.string().min(1),
  excerpt:      z.string().min(1),
  tag:          z.string().min(1),
  readMinutes:  z.number().positive(),
  publishedAt:  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD"),
  updatedAt:    z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD"),
  author:       z.object({
    name: z.string().min(1),
    url:  z.string().url(),
  }),
  canonicalUrl: z.string().url(),
});

export type Insight = z.infer<typeof InsightSchema>;

export const InsightsSchema = z.array(InsightSchema);
