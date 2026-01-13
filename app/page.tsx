import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl px-8 py-10 max-w-lg w-full">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 text-center">
          Admin Product Dashboard
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900 text-center">
          Product Dashboard
        </h1>

        <p className="mt-3 text-slate-600 text-center text-sm">
          Manage your catalog, monitor stock levels, and control admin access
          from a single place.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <Link
            href="/products"
            className="w-full text-center rounded-lg bg-blue-600 text-white py-2.5 text-sm font-medium hover:bg-blue-700 transition"
          >
            View Products
          </Link>

          <Link
            href="/admin"
            className="w-full text-center rounded-lg border border-slate-300 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 transition"
          >
            Go to Admin Panel
          </Link>
        </div>

        <p className="mt-6 text-[11px] text-center text-slate-400">
          Built with Next.js, Prisma, Zod, and Cloudinary.
        </p>
      </div>
    </main>
  );
}
