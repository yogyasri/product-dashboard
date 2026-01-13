"use client";

type Props = { productId: string };

export default function DeleteProductButton({ productId }: Props) {
  async function handleDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetch(`/api/admin/products/${productId}`, {
      method: "DELETE",
    });
    location.reload();
  }

  return (
    <form
      onSubmit={handleDelete}
      style={{ display: "inline", marginLeft: 8 }}
    >
      <button type="submit">Delete</button>
    </form>
  );
}
