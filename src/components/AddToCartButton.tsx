"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";

type Product = {
  id: string | number;
  name: string;
  price: number | string;
  image_url: string | null;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const addToCart = useCart((state) => state.addToCart);
  const price = Number(product.price);

  return (
    <button
      onClick={() =>
        addToCart({
          id: String(product.id),
          name: product.name,
          price: Number.isNaN(price) ? 0 : price,
          image_url: product.image_url ?? "",
        })
      }
      className="inline-flex w-full items-center justify-center gap-3 border border-[#1f2420] bg-[#1f2420] px-8 py-4 text-sm font-semibold text-white transition hover:bg-transparent hover:text-[#1f2420]"
    >
      <ShoppingBag className="h-5 w-5" />
      Add to Cart
    </button>
  );
}
