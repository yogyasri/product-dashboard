import ProductForm from "@/components/ProductForm";

export default function NewProductPage() {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-3xl px-6 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Create Product
          </h1>
          <p className="mt-2 text-sm book text-slate-700">
            Add a new product with price, stock, description, and image.
          </p>
        </header>

        <section className="bg-white rounded-xl shadow px-6 py-6">
          <ProductForm
            submitUrl="/api/admin/products"
            submitLabel="Create Product"
          />
        </section>
      </div>
    </main>
  );
}
