"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { productSchema } from "@/lib/validators/product";
type ProductFormData ={
  name: string;
  price: number;
  stock: number;
  description?: string | null;
  imageUrl?: string | null;
}
type Props = {
  submitUrl: string;
  submitLabel: string;
  initialData?: ProductFormData;
};
export default function ProductForm({ submitUrl, submitLabel,initialData, }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
 async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setError(null);
  setLoading(true);

  const formData = new FormData(e.currentTarget);

  let imageUrl: string | null = null;

  // 1) Upload image first (if any file selected)
  if (file) {
    const imgForm = new FormData();
    imgForm.append("file", file);

    const imgRes = await fetch("/api/admin/upload", {
      method: "POST",
      body: imgForm,
    });

    const imgData = await imgRes.json();

    if (!imgRes.ok) {
      setError(imgData.error || "Image upload failed");
      setLoading(false);
      return;
    }

    imageUrl = imgData.url; // your upload route should return { url }
  }

  // 2) Build raw data for Zod
  const rawData = {
    name: formData.get("name"),
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
    description: formData.get("description") || undefined,
    imageUrl, // may be null if no file selected
  };

  // 3) Zod validation
  const parsed = productSchema.safeParse(rawData);
  if (!parsed.success) {
    setError(parsed.error.issues[0].message);
    setLoading(false);
    return;
  }

  // 4) Submit to your products API
  const res = await fetch(submitUrl, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
  });

  const data = await res.json();

  if (!res.ok) {
    setError(data.error || "Something went wrong");
    setLoading(false);
    return;
  }

  router.push("/admin/products");
}

return (
  <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
    <input
      name="name"
      placeholder="Product name"
      defaultValue={initialData?.name ?? ""}
      required
    />

    <input
      name="price"
      type="number"
      placeholder="Price"
      defaultValue={initialData?.price ?? 0}
      required
    />
    <input
      name="stock"
      type="number"
      placeholder="Stock"
      defaultValue={initialData?.stock ?? 0}
      required
    />

    <textarea
      name="description"
      placeholder="Description"
      defaultValue={initialData?.description ?? ""}
    />

    {/* SHOW OLD IMAGE (EDIT MODE) */}
    {initialData?.imageUrl && (
      <img
        src={initialData.imageUrl}
        alt="Product image"
        style={{ width: 120, marginTop: 8 }}
      />
    )}

    <input
      type="file"
      accept="image/*"
      onChange={(e) => setFile(e.target.files?.[0] || null)}
    />

    {error && <p style={{ color: "red" }}>{error}</p>}

    <button disabled={loading}>
      {loading ? "Saving..." : submitLabel}
    </button>
  </form>
);
}