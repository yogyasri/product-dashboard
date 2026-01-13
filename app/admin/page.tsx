import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-md px-8 py-10 max-w-md w-full">
        <h1 className="text-2xl font-bold text-slate-900 text-center">
          Admin Panel
        </h1>
        <p className="mt-2 text-sm text-slate-600 text-center">
          Access the dashboard to manage products, stock, and analytics.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/admin/dashboard"
            className="w-full text-center rounded-lg bg-blue-600 text-white py-2.5 font-medium hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="w-full text-center rounded-lg border border-slate-300 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
