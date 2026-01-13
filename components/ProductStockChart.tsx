"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Product = {
  id: string;
  name: string;
  stock: number;
};

export default function ProductStockChart({
  products,
}: {
  products: Product[];
}) {
  if (products.length === 0) {
    return <p>No data to display</p>;
  }

  return (
    <div
      style={{
        width: "100%",
        height: 350,       // ✅ IMPORTANT
        marginTop: 20,
        background: "#fff",
        padding: 16,
        borderRadius: 8,
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={products}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="stock" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}