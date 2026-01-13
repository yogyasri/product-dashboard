"use client";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          padding: 20,
          borderRight: "1px solid #ddd",
        }}
      >
        <h2>Admin</h2>

        <nav style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
          <Link href="/admin/dashboard">Dashboard</Link>
          <Link href="/admin/products">Products</Link>
          <Link href="/admin/products/new">Add Product</Link>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            style={{
              marginTop: 20,
              background: "none",
              border: "none",
              color: "red",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: 24 }}>{children}</main>
    </div>
  );
}
