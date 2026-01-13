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

export default function ProductChart({ products }: { products: Product[] }) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={products}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="stock" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}