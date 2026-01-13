import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  price: z.number().positive("Price must be greater than 0"),
  stock: z.number().int().nonnegative("Stock cannot be negative"),
  description: z.string().optional(),
  imageUrl: z.string().url().optional().nullable(),
});

export type ProductInput = z.infer<typeof productSchema>;