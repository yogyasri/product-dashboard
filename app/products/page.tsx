import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="mt-1 text-sm text-slate-600">
            Public view of all available products.
          </p>
        </header>

        {products.length === 0 ? (
          <p className="mt-8 text-slate-600">No products available.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <article
                key={p.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col"
              >
                {p.imageUrl ? (
                  <div className="h-40 w-full bg-slate-100 overflow-hidden">
                    {/* basic image; you can swap to next/image later */}
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-40 w-full bg-slate-100 flex items-center justify-center text-xs text-slate-500">
                    No image
                  </div>
                )}

                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {p.name}
                  </h3>
                  {p.description && (
                    <p className="mt-1 text-sm text-slate-600 line-clamp-3">
                      {p.description}
                    </p>
                  )}

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-900">
                      ₹{p.price}
                    </span>
                    <span
                      className={
                        p.stock < 5
                          ? "inline-flex rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700"
                          : "inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700"
                      }
                    >
                      Stock: {p.stock}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
