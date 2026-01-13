import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { z } from "zod";

export const dynamic = "force-dynamic";

const productSchema = z.object({
  name: z.string().min(2),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  description: z.string().nullable(),
});

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const { id } = await context.params; // 👈 VERY IMPORTANT

  const body = await request.json();

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
