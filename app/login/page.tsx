"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
      setError("Invalid email or password format");
      return;
    }

    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: parsed.data.email,
      password: parsed.data.password,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid credentials");
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white px-8 py-8 rounded-2xl shadow-lg w-full max-w-sm space-y-5 border border-slate-200"
      >
        <h1 className="text-2xl font-bold text-center text-slate-900">
          Admin Login
        </h1>
        <p className="text-xs text-center text-slate-500">
          Enter your admin credentials to access the dashboard.
        </p>

        {error && (
          <p className="text-red-500 text-xs text-center bg-red-50 border border-red-200 rounded py-1 px-2">
            {error}
          </p>
        )}

        <div className="space-y-3">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border border-slate-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border border-slate-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-70 transition"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
