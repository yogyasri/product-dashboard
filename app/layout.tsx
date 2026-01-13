import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Product Dashboard",
  description: "Admin product management dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Top Navigation */}
        <header style={{ padding: 16, borderBottom: "1px solid #e5e7eb" }}>
          <nav style={{ display: "flex", gap: 16 }}>
            <a href="/">Home</a>
            <a href="/products">Products</a>
            <a href="/admin">Admin</a>
          </nav>
        </header>

        {/* Page Content */}
        <main style={{ padding: 24 }}>{children}</main>
      </body>
    </html>
  );
}
