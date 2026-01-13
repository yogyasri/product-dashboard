import { prisma } from "@/lib/prisma";
import ProductStockChart from "@/components/ProductStockChart";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const totalProducts = await prisma.product.count();
  const lowStockCount = await prisma.product.count({
    where: { stock: { lt: 5 } },
  });
  const products = await prisma.product.findMany({
    select: { id: true, name: true, stock: true },
  });

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Quick overview of products and stock levels.
            </p>
          </div>

          <Link
            href="/admin/products/new"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
          >
            + Add Product
          </Link>
        </header>

        {/* Stats cards */}
        <section className="grid gap-4 sm:grid-cols-2 max-w-xl mb-10">
          <StatCard label="Total Products" value={totalProducts} />
          <StatCard
            label="Low Stock Products ( &lt; 5 )"
            value={lowStockCount}
            highlight={lowStockCount > 0}
          />
        </section>

        {/* Chart */}
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Stock Overview
          </h2>
          <ProductStockChart products={products} />
        </section>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border bg-white px-5 py-4 shadow-sm ${
        highlight ? "border-red-300 bg-red-50" : "border-slate-200"
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
