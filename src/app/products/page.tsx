import { getDummyProducts, type Product } from "@/lib/dummy-data";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react";

function formatPrice(price: Product["price"]) {
  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return price;
  }

  return numericPrice.toLocaleString("id-ID");
}

export default async function ProductsPage() {
  const products = getDummyProducts();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFF9F4] px-5 pb-20 pt-28 text-[#4A3731] sm:px-10 sm:pt-32 lg:px-20 lg:pb-28">
      {/* Decorative backgrounds */}
      <div className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-[#F8DEDF]/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-48 h-96 w-96 rounded-full bg-[#E7EFE2]/70 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-[#F6E4CD]/45 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <section className="mb-12 rounded-[2.25rem] border border-[#EADFD8] bg-white/70 p-6 shadow-[0_20px_60px_rgba(91,68,59,0.08)] backdrop-blur-xl sm:p-9 lg:p-12">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#EDC9CB] bg-[#FFF5F5] px-4 py-2">
                <Sparkles
                  className="h-4 w-4 text-[#D98286]"
                  aria-hidden="true"
                />

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B45F64]">
                  Remocha Collection
                </p>
              </div>

              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#44332E] sm:text-6xl lg:text-7xl">
                Find your favorite
                <span className="mt-2 block text-[#D98286]">
                  handmade mochi.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-[#806B62] sm:text-lg">
                Pilih mochi premium favorit kamu. Setiap produk dibuat fresh
                mengikuti sistem preorder agar tekstur, rasa, dan kualitasnya
                tetap terjaga.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF2E6] px-4 py-2 text-sm font-semibold text-[#607554]">
                  <span className="h-2 w-2 rounded-full bg-[#718E64]" />
                  Fresh preorder
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-[#F8E2E3] px-4 py-2 text-sm font-semibold text-[#B65E63]">
                  <span className="h-2 w-2 rounded-full bg-[#D98286]" />
                  Handmade daily
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-[#F8ECD8] px-4 py-2 text-sm font-semibold text-[#9B743E]">
                  <Star
                    className="h-3.5 w-3.5 fill-current"
                    aria-hidden="true"
                  />
                  Premium filling
                </div>
              </div>
            </div>

            <Link
              href="/"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#DDD0C8] bg-white px-6 py-3 text-sm font-bold text-[#554039] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#D98286] hover:text-[#C66E72] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#F5DCDD]"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
                aria-hidden="true"
              />
              Back Home
            </Link>
          </div>
        </section>

        {/* Toolbar */}
        <section className="mb-8 flex flex-col gap-4 rounded-[1.5rem] border border-[#E8DDD6] bg-white/75 p-4 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F7DFE0] text-[#C76D72]">
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A28A80]">
                Available products
              </p>
              <p className="mt-0.5 text-sm font-semibold text-[#4A3731]">
                {products.length} product{products.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#E5D8D0] bg-[#FFFDFC] px-4 py-2.5 text-sm text-[#8A746A]">
            <Search className="h-4 w-4" aria-hidden="true" />
            Explore all Remocha flavors
          </div>
        </section>

        {products.length === 0 ? (
          <section className="rounded-[2rem] border border-dashed border-[#DCCFC7] bg-white/70 px-6 py-20 text-center shadow-sm backdrop-blur">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F7DFE0] text-2xl">
              🍡
            </div>

            <h2 className="mt-6 text-3xl font-semibold tracking-[-0.03em] text-[#44332E]">
              Belum ada produk
            </h2>

            <p className="mx-auto mt-3 max-w-md leading-7 text-[#806B62]">
              Produk Remocha akan tampil di sini setelah data produk
              ditambahkan.
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#D98286] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(217,130,134,0.25)] transition hover:-translate-y-1 hover:bg-[#C66E72]"
            >
              Return Home
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>
        ) : (
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product, index) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group relative overflow-hidden rounded-[1.8rem] border border-[#E7DCD5] bg-white shadow-[0_12px_40px_rgba(91,68,59,0.07)] transition duration-300 hover:-translate-y-2 hover:border-[#E3B9BB] hover:shadow-[0_24px_60px_rgba(91,68,59,0.15)] focus:outline-none focus:ring-4 focus:ring-[#F5DCDD]"
              >
                {/* Card badge */}
                <div className="absolute left-4 top-4 z-20 flex items-center gap-2">
                  <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#C66E72] shadow-sm backdrop-blur">
                    {index === 0
                      ? "Best Seller"
                      : index === 1
                        ? "Customer Favorite"
                        : "Fresh Batch"}
                  </span>
                </div>

                {/* Favorite button visual */}
                <div className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#D98286] opacity-0 shadow-md backdrop-blur transition duration-300 group-hover:opacity-100">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                </div>

                {/* Product image */}
                <div className="relative h-[320px] overflow-hidden bg-[#F4ECE7]">
                  <img
                    src={product.image_url ?? "/next.svg"}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#3B2923]/35 via-transparent to-transparent opacity-70" />

                  <div className="absolute bottom-4 left-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#987029] shadow-sm backdrop-blur">
                    <Star
                      className="h-3.5 w-3.5 fill-current"
                      aria-hidden="true"
                    />
                    4.9
                  </div>
                </div>

                {/* Product content */}
                <div className="p-6 sm:p-7">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A28A80]">
                      Handmade Mochi
                    </p>

                    <span className="rounded-full bg-[#EAF2E6] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#607554]">
                      Preorder
                    </span>
                  </div>

                  <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[#46342E] transition duration-300 group-hover:text-[#C66E72]">
                    {product.name}
                  </h2>

                  <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-[#806B62]">
                    {product.description}
                  </p>

                  <div className="my-5 h-px bg-[#EFE5DF]" />

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A89389]">
                        Start from
                      </p>

                      <span className="mt-1 block text-xl font-bold text-[#B85F64]">
                        Rp {formatPrice(product.price)}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-2 rounded-full bg-[#718E64] px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(113,142,100,0.2)] transition duration-300 group-hover:bg-[#5E7953]">
                      Detail

                      <ArrowUpRightIcon />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        )}

        {/* Bottom CTA */}
        {products.length > 0 && (
          <section className="mt-16 overflow-hidden rounded-[2.25rem] border border-[#E9C9CB] bg-[#F8DEDF] p-8 shadow-[0_20px_60px_rgba(173,103,107,0.12)] sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#A65D61]">
                Need help choosing?
              </p>

              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-[#4A3530] sm:text-4xl">
                Temukan rasa mochi yang paling cocok untuk kamu.
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-[#775D56]">
                Lihat detail setiap produk, pilih jumlah pesanan, lalu
                lanjutkan checkout dengan mudah.
              </p>
            </div>

            <Link
              href="/#products"
              className="group mt-7 inline-flex shrink-0 items-center gap-2 rounded-full bg-[#D98286] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(194,103,108,0.25)] transition duration-300 hover:-translate-y-1 hover:bg-[#C66E72] lg:mt-0"
            >
              View Best Sellers

              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      aria-hidden="true"
    >
      <path
        d="M7 17 17 7M8 7h9v9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}