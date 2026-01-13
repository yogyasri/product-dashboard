import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  price: z.number().positive("Price must be greater than 0"),
  stock: z.number().int().nonnegative("Stock cannot be negative"),
  description: z.string().nullable(),
});
export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { id } = await context.params;

  const body = await req.json();

  const name = body.get("name") as string;
  const price = Number(body.get("price"));
  const stock = Number(body.get("stock"));
  const description = body.get("description") as string | null;
  const parsed = productSchema.safeParse({
    name,
    price,
    stock,
    description,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  await prisma.product.update({
    where: { id },
    data: {
      name,
      price,
      stock,
      description,
    },
  });

  return NextResponse.redirect(
    new URL("/admin/products", req.url)
  );
}