import { z } from "zod";

export const ProductSchema = z.object({
  id:          z.string(),
  title:       z.string().min(1),
  brand:       z.string().min(1),
  description: z.string().min(1),
  image:       z.string(),
  tags:        z.array(z.string()).min(1),
  category:    z.string().min(1),
  link:        z.string().startsWith("/"),
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductsSchema = z.array(ProductSchema);
