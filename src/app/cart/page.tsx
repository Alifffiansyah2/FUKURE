"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/store/cart";

const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";

function formatPrice(price: number) {
  return price.toLocaleString("id-ID");
}

function buildWhatsappMessage(
  items: ReturnType<typeof useCart.getState>["items"],
  total: number
) {
  const orderLines = items
    .map((item, index) => {
      const subtotal = item.price * item.quantity;
      return `${index + 1}. ${item.name} x${item.quantity} - Rp ${formatPrice(subtotal)}`;
    })
    .join("\n");

  return [
    "Halo Remocha, saya mau preorder:",
    "",
    orderLines,
    "",
    `Total: Rp ${formatPrice(total)}`,
    "Status: pending",
    "",
    "Terima kasih.",
  ].join("\n");
}

export default function CartPage() {
  const { items, increaseQty, decreaseQty, removeFromCart, clearCart } =
    useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const canCheckout =
    items.length > 0 && total > 0 && !isSubmitting;

  const handleCheckout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!canCheckout) {
      setErrorMessage("Cart masih kosong atau total order belum valid.");
      return;
    }

    if (!whatsappNumber) {
      setErrorMessage("Nomor WhatsApp toko belum diatur.");
      return;
    }

    setIsSubmitting(true);
    const message = buildWhatsappMessage(items, total);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    await new Promise((resolve) => setTimeout(resolve, 250));
    setIsSubmitting(false);

    clearCart();
    window.location.href = whatsappUrl;
  };

  return (
    <main className="min-h-screen bg-[#f7f7f4] px-6 py-10 text-[#1f2420] sm:px-10 lg:px-20 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#858881]">
              Preorder Checkout
            </p>
            <h1 className="text-5xl font-semibold leading-tight text-[#1f2420] sm:text-6xl">
              Your Cart
            </h1>
          </div>

          <Link
            href="/#products"
            className="w-fit border border-[#c9cac4] px-5 py-3 text-sm font-semibold text-[#1f2420] transition hover:border-[#1f2420]"
          >
            Back to Menu
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="border border-[#deded8] bg-[#fbfbf8] p-10 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center border border-[#deded8]">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <h2 className="mb-3 text-3xl font-semibold">Cart masih kosong</h2>
            <p className="mb-7 text-[#686b65]">
              Pilih mochi favorit kamu dulu sebelum checkout.
            </p>
            <Link
              href="/#products"
              className="inline-flex border border-[#1f2420] bg-[#1f2420] px-8 py-3 text-sm font-semibold text-white transition hover:bg-transparent hover:text-[#1f2420]"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
            <section className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-4 border border-[#deded8] bg-[#fbfbf8] p-4 sm:grid-cols-[112px_1fr_auto] sm:items-center"
                >
                  <img
                    src={item.image_url || "/next.svg"}
                    alt={item.name}
                    className="h-28 w-full object-cover sm:w-28"
                  />

                  <div>
                    <h2 className="text-2xl font-semibold text-[#1f2420]">
                      {item.name}
                    </h2>
                    <p className="mt-1 font-medium text-[#686b65]">
                      Rp {formatPrice(item.price)}
                    </p>
                    <p className="mt-2 text-sm text-[#858881]">
                      Subtotal Rp {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 sm:justify-end">
                    <button
                      type="button"
                      onClick={() => decreaseQty(item.id)}
                      className="flex h-10 w-10 items-center justify-center border border-[#c9cac4] text-[#1f2420] transition hover:border-[#1f2420]"
                      aria-label={`Kurangi ${item.name}`}
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <span className="min-w-8 text-center text-lg font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => increaseQty(item.id)}
                      className="flex h-10 w-10 items-center justify-center border border-[#c9cac4] text-[#1f2420] transition hover:border-[#1f2420]"
                      aria-label={`Tambah ${item.name}`}
                    >
                      <Plus className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="ml-1 flex h-10 w-10 items-center justify-center border border-red-200 text-red-600 transition hover:border-red-600"
                      aria-label={`Hapus ${item.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </section>

            <form
              onSubmit={handleCheckout}
              className="h-fit border border-[#deded8] bg-[#fbfbf8] p-6 sm:p-8"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#858881]">
                Order Summary
              </p>
              <h2 className="mb-6 text-3xl font-semibold text-[#1f2420]">
                Checkout PO
              </h2>

              <div className="border border-[#deded8] bg-[#f7f7f4] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-semibold">Items</span>
                  <span className="font-semibold text-[#1f2420]">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-semibold">Order Status</span>
                  <span className="border border-[#c9cac4] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#1f2420]">
                    pending
                  </span>
                </div>
              </div>

              <div className="my-6 border border-[#1f2420] p-5">
                <div className="flex items-center justify-between text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="text-2xl font-semibold text-[#1f2420]">
                    Rp {formatPrice(total)}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#686b65]">
                  Checkout akan membuka WhatsApp dengan pesan order sesuai isi
                  cart.
                </p>
              </div>

              {errorMessage && (
                <p className="mb-4 border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={!canCheckout}
                className="inline-flex w-full items-center justify-center border border-[#1f2420] bg-[#1f2420] px-8 py-4 text-sm font-semibold text-white transition hover:bg-transparent hover:text-[#1f2420] disabled:cursor-not-allowed disabled:border-[#c9cac4] disabled:bg-[#c9cac4] disabled:text-white"
              >
                {isSubmitting ? "Processing..." : "Place Preorder"}
              </button>

              <button
                type="button"
                onClick={clearCart}
                className="mt-4 w-full text-sm font-semibold text-[#686b65] transition hover:text-red-600"
              >
                Clear Cart
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
