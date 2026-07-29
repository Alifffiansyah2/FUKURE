import AddToCartButton from "@/components/AddToCartButton";
import { getDummyProduct, type Product } from "@/lib/dummy-data";
import Link from "next/link";

const highlights = [
  "Fresh dibuat setelah preorder masuk",
  "Tekstur mochi lembut dan chewy",
  "Dikemas rapi untuk hadiah atau konsumsi harian",
];

function formatPrice(price: Product["price"]) {
  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return price;
  }

  return numericPrice.toLocaleString("id-ID");
}

function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <main className="min-h-screen bg-[#f7f7f4] px-6 py-16 text-[#1f2420] sm:px-10 lg:px-20">
      <div className="mx-auto max-w-2xl border border-[#deded8] bg-[#fbfbf8] p-10 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#858881]">
          Product Detail
        </p>
        <h1 className="mb-4 text-4xl font-semibold">{title}</h1>
        <p className="mb-8 text-[#686b65]">{message}</p>
        <Link
          href="/#products"
          className="inline-flex border border-[#1f2420] bg-[#1f2420] px-6 py-3 text-sm font-semibold text-white transition hover:bg-transparent hover:text-[#1f2420]"
        >
          Back to Menu
        </Link>
      </div>
    </main>
  );
}

export default async function ProductDetail(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  if (!id) {
    return (
      <EmptyState
        title="Invalid Product"
        message="Produk yang kamu buka belum punya ID yang valid."
      />
    );
  }

  const product = getDummyProduct(id);

  if (!product) {
    return (
      <EmptyState
        title="Product Not Found"
        message="Produk ini belum tersedia atau sudah tidak ada di katalog."
      />
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f7f4] text-[#1f2420]">
      <section className="px-6 py-10 sm:px-10 lg:px-20 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/#products"
            className="mb-8 inline-flex items-center border border-[#c9cac4] px-5 py-2.5 text-sm font-semibold text-[#1f2420] transition hover:border-[#1f2420]"
          >
            Back to menu
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <img
              src={product.image_url ?? "/next.svg"}
              alt={product.name}
              className="h-[420px] w-full border border-[#deded8] object-cover sm:h-[560px]"
            />

            <div className="lg:pl-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#858881]">
                Handmade Mochi
              </p>

              <h1 className="max-w-2xl text-5xl font-semibold leading-tight text-[#1f2420] sm:text-6xl">
                {product.name}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-[#686b65] sm:text-lg">
                {product.description ??
                  "Mochi premium dengan tekstur lembut, rasa seimbang, dan dibuat fresh mengikuti jadwal preorder."}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_0.85fr]">
                <div className="border border-[#deded8] bg-[#fbfbf8] p-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#858881]">
                    Price
                  </p>
                  <p className="text-3xl font-semibold text-[#1f2420]">
                    Rp {formatPrice(product.price)}
                  </p>
                </div>

                <div className="border border-[#1f2420] bg-[#1f2420] p-6 text-white">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    Preorder
                  </p>
                  <p className="text-base font-medium leading-6">
                    Dibuat fresh setelah order masuk.
                  </p>
                </div>
              </div>

              <div className="mt-7 border border-[#deded8] bg-[#fbfbf8] p-6">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#858881]">
                  Why You&apos;ll Love It
                </p>

                <div className="space-y-3">
                  {highlights.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-px w-5 shrink-0 bg-[#1f2420]" />
                      <p className="leading-7 text-[#686b65]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7">
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
