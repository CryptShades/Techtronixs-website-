import { z } from "zod";

export const ServiceSchema = z.object({
  id:          z.string(),
  slug:        z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase kebab-case"),
  title:       z.string().min(1),
  description: z.string().min(1),
  icon:        z.string().min(1),
  features:    z.array(z.string()).min(1),
  process:     z.array(z.string()).min(1),
});

export type Service = z.infer<typeof ServiceSchema>;

export const ServicesSchema = z.array(ServiceSchema);
