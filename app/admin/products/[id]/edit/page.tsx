import ProductForm from "@/components/ProductForm";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) redirect("/admin/products");

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) redirect("/admin/products");

  return (
    <div style={{ padding: 24, maxWidth: 500 }}>
      <h1>Edit Product</h1>

      <ProductForm
        submitUrl={`/api/admin/products/${id}`}
        submitLabel="Update Product"
        initialData={{
          name: product.name,
          price: product.price,
          stock: product.stock,
          description: product.description,
          imageUrl: product.imageUrl, 
        }}
      />
    </div>
  );
}