import { z } from "zod";

export const TestimonialSchema = z.object({
  id:            z.string(),
  name:          z.string().min(1),
  role:          z.string().min(1),
  company:       z.string().min(1),
  quote:         z.string().min(1),
  metric:        z.string().min(1),
  stars:         z.number().int().min(1).max(5),
  datePublished: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD"),
});

export type Testimonial = z.infer<typeof TestimonialSchema>;

export const TestimonialsSchema = z.array(TestimonialSchema);
