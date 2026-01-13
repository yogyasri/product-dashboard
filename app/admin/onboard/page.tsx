import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export default async function AdminOnboardPage() {
  // Check if an admin already exists
  const adminExists = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  async function createAdmin(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      throw new Error("Email and password required");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "ADMIN",
      },
    });
  }

  if (adminExists) {
    return (
      <div className="p-6 text-center text-red-600">
        Admin already exists. Onboarding is disabled.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <form action={createAdmin} className="bg-white p-6 rounded shadow w-96">
        <h1 className="text-xl font-bold mb-4 text-center">
          Create Root Admin
        </h1>

        <input
          name="email"
          type="email"
          placeholder="Admin Email"
          required
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded"
        >
          Create Admin
        </button>
      </form>
    </div>
  );
}
