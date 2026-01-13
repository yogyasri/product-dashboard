import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/require-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const result: any = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "products" }, (err, res) => {
        if (err || !res) reject(err);
        else resolve(res);
      })
      .end(buffer);
  });

  return NextResponse.json({ url: result.secure_url });
}
