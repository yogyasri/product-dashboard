import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { z } from "zod";

export const dynamic = "force-dynamic";

const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  price: z.number().positive("Price must be greater than 0"),
  stock: z.number().int().nonnegative("Stock cannot be negative"),
  description: z.string().nullable(),
});

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { id } = params;

  const body = await req.json();

  const parsed = productSchema.safeParse({
    name: body.name,
    price: Number(body.price),
    stock: Number(body.stock),
    description: body.description ?? null,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  await prisma.product.update({
    where: { id },
    data: parsed.data,
  });

  return NextResponse.json({ success: true });
}
