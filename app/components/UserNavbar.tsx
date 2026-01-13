import Link from "next/link";

export default function UserNavbar() {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="mx-auto max-w-5xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold text-slate-900">
          ProductApp
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/products"
            className="text-slate-700 hover:text-slate-900 hover:underline"
          >
            Products
          </Link>
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-700 hover:underline"
          >
            Admin Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
