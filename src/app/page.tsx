import { getDummyProducts, type Product } from "@/lib/dummy-data";
import Link from "next/link";
import RotatingText from "@/components/ui/RotatingText";

function formatPrice(price: Product["price"]) {
  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return price;
  }

  return numericPrice.toLocaleString("id-ID");
}

const benefits = [
  {
    title: "Freshly Made",
    description: "Dibuat setelah preorder masuk.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path
          d="M12 21c4.5 0 8-3.5 8-8 0-4.8-4.2-8.3-8-10-3.8 1.7-8 5.2-8 10 0 4.5 3.5 8 8 8Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 14.5c1.4 1.1 3 1.6 5 1.2 1-.2 1.8-.7 2.5-1.4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Premium Ingredients",
    description: "Bahan pilihan dengan tekstur lembut.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path
          d="M12 3 9.7 8.1 4 8.8l4.2 4-.9 5.7L12 16l4.7 2.5-.9-5.7 4.2-4-5.7-.7L12 3Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Easy Ordering",
    description: "Pilih produk dan checkout via WhatsApp.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path
          d="M6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H11l-4.5 4v-4A2.5 2.5 0 0 1 4 13.5v-7A2.5 2.5 0 0 1 6.5 4Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 10h.01M12 10h.01M16 10h.01"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default async function Home() {
  const products = getDummyProducts(3);

  return (
    <main className="min-h-screen overflow-hidden bg-[#FFF9F4] text-[#3E302B]">
      {/* HERO */}
      <section className="relative isolate px-5 pb-12 pt-8 sm:px-10 sm:pt-12 lg:px-20 lg:pb-20 lg:pt-16">
        <div className="pointer-events-none absolute -left-24 top-32 -z-10 h-72 w-72 rounded-full bg-[#F4C9CC]/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-10 -z-10 h-96 w-96 rounded-full bg-[#CFE3C5]/40 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#F8E3C7]/60 blur-3xl" />

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#EBC9C7] bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D9888B] opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#D9888B]" />
              </span>

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A65D61]">
                Weekly preorder is open
              </span>
            </div>

            <h1 className="max-w-3xl text-[3.25rem] font-semibold leading-[0.98] tracking-[-0.04em] text-[#44332E] sm:text-7xl lg:text-[5.2rem]">
              Mochi preorder,
              <br />
              made{" "}
              <span className="mt-3 inline-flex align-middle sm:mt-0">
                <RotatingText
                  texts={["simple.", "fresh.", "easy."]}
                  mainClassName="px-3 sm:px-4 bg-[#718E64] text-white overflow-hidden py-1.5 sm:py-2.5 justify-center rounded-2xl shadow-[0_10px_30px_rgba(113,142,100,0.25)]"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
                  transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 400,
                  }}
                  rotationInterval={2000}
                />
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-[#765F56] sm:text-lg">
              Remocha menghadirkan mochi lembut dengan isian premium yang
              dibuat fresh berdasarkan preorder. Pilih rasa favoritmu dan
              selesaikan pesanan dengan mudah melalui WhatsApp.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="#products"
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#D98286] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(217,130,134,0.3)] transition duration-300 hover:-translate-y-1 hover:bg-[#C96E73] hover:shadow-[0_16px_35px_rgba(217,130,134,0.38)] focus:outline-none focus:ring-4 focus:ring-[#F1C6C8]"
              >
                Shop Products

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14M14 7l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <Link
                href="/products"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#DDCFC7] bg-white/70 px-7 py-3.5 text-sm font-bold text-[#554039] shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#D98286] hover:bg-white hover:text-[#C96E73] focus:outline-none focus:ring-4 focus:ring-[#F4DFDF]"
              >
                View Catalog
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-[#735F57]">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#DDEBD8] text-[#638057]">
                  ✓
                </span>
                100% fresh preorder
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F5DDDE] text-[#C36E72]">
                  ✓
                </span>
                Premium filling
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F5E8D3] text-[#A77B43]">
                  ✓
                </span>
                Handmade with care
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl lg:mx-0">
            <div className="absolute -left-5 top-20 z-20 hidden rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl backdrop-blur sm:block lg:-left-10">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F6DFDF] text-xl">
                  🍓
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#A9847F]">
                    Customer favorite
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-[#4A3832]">
                    Strawberry Mochi
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 right-4 z-20 rounded-2xl border border-white/80 bg-white/95 p-4 shadow-xl backdrop-blur sm:right-8 lg:-right-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A9847F]">
                Preorder batch
              </p>

              <div className="mt-2 flex items-center gap-3">
                <span className="text-2xl font-bold text-[#D98286]">24</span>
                <span className="max-w-24 text-xs leading-5 text-[#765F56]">
                  slots available this week
                </span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border-[8px] border-white bg-[#E8E0D5] shadow-[0_30px_80px_rgba(91,68,59,0.2)]">
              <img
                src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1400&auto=format&fit=crop"
                alt="Premium matcha mochi"
                className="h-[460px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[580px] lg:h-[650px]"
              />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#3A2924]/70 via-[#3A2924]/20 to-transparent" />

              <div className="absolute bottom-7 left-7 right-7 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/75">
                  Flavor of the week
                </p>
                <p className="mt-2 text-2xl font-semibold sm:text-3xl">
                  Matcha Cream Mochi
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="px-5 py-8 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-[#E9DDD5] bg-white shadow-[0_16px_50px_rgba(96,73,61,0.07)] md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`group flex items-center gap-4 p-6 transition hover:bg-[#FFF8F5] sm:p-7 ${
                index !== benefits.length - 1
                  ? "border-b border-[#EFE4DD] md:border-b-0 md:border-r"
                  : ""
              }`}
            >
              <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-[#F4E2E2] text-[#C87074] transition duration-300 group-hover:-rotate-6 group-hover:scale-110">
                {benefit.icon}
              </div>

              <div>
                <h2 className="font-bold text-[#4A3731]">{benefit.title}</h2>
                <p className="mt-1 text-sm leading-6 text-[#806B62]">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section
        id="products"
        className="relative scroll-mt-8 px-5 py-20 sm:px-10 lg:px-20 lg:py-28"
      >
        <div className="pointer-events-none absolute left-0 top-20 -z-10 h-80 w-80 rounded-full bg-[#E7F0E1]/70 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#E8F0E4] px-4 py-2">
                <span className="text-base">🍡</span>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#66805B]">
                  Signature menu
                </p>
              </div>

              <h2 className="text-4xl font-semibold tracking-[-0.03em] text-[#44332E] sm:text-5xl lg:text-6xl">
                Our Best Sellers
              </h2>

              <p className="mt-4 max-w-xl text-base leading-7 text-[#806B62]">
                Pilihan mochi favorit pelanggan dengan tekstur lembut dan
                isian yang creamy.
              </p>
            </div>

            <Link
              href="/products"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-[#DDCFC7] bg-white px-6 py-3 text-sm font-bold text-[#554039] shadow-sm transition hover:-translate-y-1 hover:border-[#D98286] hover:text-[#C96E73]"
            >
              View All Products
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14M14 7l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group relative overflow-hidden rounded-[1.75rem] border border-[#E7DCD5] bg-white shadow-[0_12px_40px_rgba(91,68,59,0.07)] transition duration-300 hover:-translate-y-2 hover:border-[#E1B7B9] hover:shadow-[0_25px_60px_rgba(91,68,59,0.14)]"
              >
                <div className="absolute left-4 top-4 z-20 flex items-center gap-2">
                  <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#C66E72] shadow-sm backdrop-blur">
                    {index === 0 ? "Best Seller" : "Fresh Batch"}
                  </span>
                </div>

                <div className="relative h-[310px] overflow-hidden bg-[#F5EDE8]">
                  <img
                    src={product.image_url ?? "/next.svg"}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#3C2A24]/25 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                  <div className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-white text-[#D0797D] opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 12h14M14 7l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-semibold tracking-[-0.02em] text-[#46342E] transition group-hover:text-[#C66E72]">
                      {product.name}
                    </h3>

                    <div className="flex shrink-0 items-center gap-1 rounded-full bg-[#FFF3D9] px-2.5 py-1 text-xs font-bold text-[#9D712D]">
                      <span>★</span>
                      4.9
                    </div>
                  </div>

                  <p className="line-clamp-2 min-h-12 text-sm leading-6 text-[#806B62]">
                    {product.description}
                  </p>

                  <div className="my-5 h-px bg-[#EFE5DF]" />

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#A18C82]">
                        Start from
                      </p>
                      <span className="mt-1 block text-xl font-bold text-[#B85F64]">
                        Rp {formatPrice(product.price)}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-2 rounded-full bg-[#718E64] px-5 py-2.5 text-sm font-bold text-white transition group-hover:bg-[#5E7C53]">
                      Order
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO ORDER */}
      <section className="px-5 pb-20 sm:px-10 lg:px-20 lg:pb-28">
        <div className="mx-auto max-w-7xl rounded-[2.25rem] bg-[#6F8963] px-6 py-12 text-white shadow-[0_25px_70px_rgba(91,117,80,0.24)] sm:px-10 lg:px-14 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.23em] text-white/70">
                Simple ordering
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                From craving to checkout in three easy steps.
              </h2>

              <p className="mt-5 max-w-lg leading-7 text-white/75">
                Tidak perlu proses yang rumit. Pilih produk, masukkan ke
                keranjang, lalu lanjutkan pesanan melalui WhatsApp.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Choose",
                  description: "Pilih rasa mochi favoritmu.",
                },
                {
                  number: "02",
                  title: "Add to cart",
                  description: "Atur jumlah pesanan yang dibutuhkan.",
                },
                {
                  number: "03",
                  title: "WhatsApp",
                  description: "Konfirmasi pesanan dengan cepat.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="group rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/15"
                >
                  <span className="text-xs font-bold tracking-[0.2em] text-white/55">
                    {step.number}
                  </span>
                  <h3 className="mt-8 text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-20 sm:px-10 lg:px-20 lg:pb-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-[#ECCFD0] bg-[#F8DEDF] px-6 py-14 text-center shadow-[0_20px_60px_rgba(173,103,107,0.13)] sm:px-10 md:py-20">
          <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/35 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-[#D9E7D2]/60 blur-2xl" />

          <div className="relative z-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
              🍡
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#A65D61]">
              Weekly preorder
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-[#4A3530] md:text-6xl">
              Open Preorder This Week
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#775D56]">
              Semua produk dibuat fresh setelah order masuk. Slot preorder
              terbatas setiap minggu agar kualitas dan kesegaran tetap terjaga.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#products"
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#D98286] px-8 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(194,103,108,0.26)] transition duration-300 hover:-translate-y-1 hover:bg-[#C66E72]"
              >
                Start Order

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 transition group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h14M14 7l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <Link
                href="/products"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#D9B5B7] bg-white/55 px-8 py-3.5 text-sm font-bold text-[#76504C] transition hover:-translate-y-1 hover:bg-white"
              >
                Explore Flavors
              </Link>
            </div>

            <p className="mt-5 text-xs font-medium text-[#96746D]">
              Limited weekly slots • Freshly prepared • Handmade with care
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}