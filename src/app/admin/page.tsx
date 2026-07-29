"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Edit3, Plus, RefreshCw, Save, Trash2, X } from "lucide-react";
import { dummyProducts } from "@/lib/dummy-data";

type Product = {
  id: string | number;
  name: string;
  description: string | null;
  price: number | string;
  image_url: string | null;
};

type ProductForm = {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
};

const initialForm: ProductForm = {
  name: "",
  description: "",
  price: "",
  imageUrl: "",
};

function formatPrice(price: Product["price"]) {
  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return price;
  }

  return numericPrice.toLocaleString("id-ID");
}

export default function AdminPage() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [form, setForm] = useState<ProductForm>(initialForm);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const totalProducts = products.length;
  const averagePrice = useMemo(() => {
    if (products.length === 0) {
      return 0;
    }

    const total = products.reduce((sum, product) => {
      const price = Number(product.price);
      return sum + (Number.isNaN(price) ? 0 : price);
    }, 0);

    return Math.round(total / products.length);
  }, [products]);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsLoading(false);
    setProducts(dummyProducts);
    setForm(initialForm);
    setEditingProduct(null);
    setMessage("Data dummy berhasil dimuat ulang.");
  }, []);

  useEffect(() => {
    const init = async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setIsCheckingAuth(false);
      setIsLoading(false);
    };

    init();
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setEditingProduct(null);
    setErrorMessage("");
    setMessage("");
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name ?? "",
      description: product.description ?? "",
      price: String(product.price ?? ""),
      imageUrl: product.image_url ?? "",
    });
    setErrorMessage("");
    setMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setMessage("");

    const price = Number(form.price);

    if (!form.name.trim()) {
      setErrorMessage("Nama produk wajib diisi.");
      return;
    }

    if (Number.isNaN(price) || price < 0) {
      setErrorMessage("Harga produk harus berupa angka valid.");
      return;
    }

    setIsSaving(true);

    const payload = {
      name: form.name.trim(),
      description: form.description.trim() || null,
      price,
      image_url: form.imageUrl.trim() || null,
    };

    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsSaving(false);

    if (editingProduct) {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingProduct.id ? { ...product, ...payload } : product
        )
      );
    } else {
      setProducts((current) => [
        {
          id: String(Date.now()),
          ...payload,
        },
        ...current,
      ]);
    }

    const successMessage = editingProduct
      ? "Produk berhasil diupdate."
      : "Produk baru berhasil ditambahkan.";

    resetForm();
    setMessage(successMessage);
  };

  const handleDelete = async (product: Product) => {
    const isConfirmed = window.confirm(`Hapus produk "${product.name}"?`);

    if (!isConfirmed) {
      return;
    }

    setErrorMessage("");
    setMessage("");

    setProducts((current) => current.filter((item) => item.id !== product.id));

    if (editingProduct?.id === product.id) {
      resetForm();
    }

    setMessage("Produk berhasil dihapus.");
    await fetchProducts();
  };

  const handleLogout = async () => {
    router.push("/auth/login");
  };

  if (isCheckingAuth) {
    return (
      <main className="min-h-screen bg-[#f4f8ee] px-6 py-16 text-[#244c2d]">
        <div className="mx-auto max-w-7xl rounded-[32px] border border-[#d7e8cf] bg-white/80 p-10 text-center shadow-[0_24px_70px_rgba(74,112,67,0.12)]">
          <p className="font-black">Checking admin session...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f8ee] px-6 py-10 text-[#244c2d] sm:px-10 lg:px-20 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.32em] text-[#6d9368]">
              Remocha Admin
            </p>
            <h1 className="text-5xl font-black leading-none text-[#1f4f29] sm:text-6xl">
              Products
            </h1>
            <p className="mt-4 max-w-2xl font-medium leading-relaxed text-[#527d4e]">
              Kelola katalog produk, gambar, deskripsi, dan harga preorder.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={fetchProducts}
              className="inline-flex items-center gap-2 rounded-full border border-[#6d9368]/30 bg-white/70 px-5 py-3 text-sm font-black text-[#416f43] transition hover:bg-white"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-[#244c2d] px-5 py-3 text-sm font-black text-white transition hover:bg-[#3f7344]"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[28px] border border-[#d7e8cf] bg-white/80 p-6 shadow-[0_18px_45px_rgba(74,112,67,0.1)]">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[#6d9368]">
              Total Products
            </p>
            <p className="text-4xl font-black">{totalProducts}</p>
          </div>
          <div className="rounded-[28px] border border-[#d7e8cf] bg-white/80 p-6 shadow-[0_18px_45px_rgba(74,112,67,0.1)]">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[#6d9368]">
              Average Price
            </p>
            <p className="text-4xl font-black">Rp {formatPrice(averagePrice)}</p>
          </div>
          <div className="rounded-[28px] border border-[#d7e8cf] bg-[#244c2d] p-6 text-white shadow-[0_18px_45px_rgba(36,76,45,0.16)]">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[#b9dcb2]">
              Status
            </p>
            <p className="text-3xl font-black">Live Catalog</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <form
            onSubmit={handleSubmit}
            className="h-fit rounded-[32px] border border-[#d7e8cf] bg-white/85 p-6 shadow-[0_24px_70px_rgba(74,112,67,0.14)] sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.26em] text-[#6d9368]">
                  {editingProduct ? "Edit Product" : "New Product"}
                </p>
                <h2 className="text-3xl font-black text-[#1f4f29]">
                  {editingProduct ? "Update produk" : "Tambah produk"}
                </h2>
              </div>

              {editingProduct && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef7e8] text-[#244c2d] transition hover:bg-[#c8e8bf]"
                  aria-label="Batal edit"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-black text-[#416f43]">
                  Nama produk
                </span>
                <input
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-[#c8ddc0] bg-[#f8fbf4] px-4 py-3 font-semibold outline-none transition focus:border-[#6d9368] focus:bg-white"
                  placeholder="Matcha Mochi"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-black text-[#416f43]">
                  Harga
                </span>
                <input
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, price: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-[#c8ddc0] bg-[#f8fbf4] px-4 py-3 font-semibold outline-none transition focus:border-[#6d9368] focus:bg-white"
                  placeholder="25000"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-black text-[#416f43]">
                  URL gambar produk
                </span>
                <input
                  value={form.imageUrl}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, imageUrl: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-[#c8ddc0] bg-[#f8fbf4] px-4 py-3 font-semibold outline-none transition focus:border-[#6d9368] focus:bg-white"
                  placeholder="https://..."
                />
              </label>

              {form.imageUrl && (
                <img
                  src={form.imageUrl}
                  alt="Preview produk"
                  className="h-48 w-full rounded-[24px] border border-[#d7e8cf] object-cover"
                />
              )}

              <label className="block">
                <span className="mb-2 block text-sm font-black text-[#416f43]">
                  Deskripsi
                </span>
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  className="min-h-32 w-full resize-none rounded-2xl border border-[#c8ddc0] bg-[#f8fbf4] px-4 py-3 font-semibold outline-none transition focus:border-[#6d9368] focus:bg-white"
                  placeholder="Deskripsi rasa, tekstur, dan detail preorder."
                />
              </label>
            </div>

            {errorMessage && (
              <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                {errorMessage}
              </p>
            )}

            {message && (
              <p className="mt-5 rounded-2xl bg-[#eef7e8] px-4 py-3 text-sm font-bold text-[#244c2d]">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSaving}
              className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#244c2d] px-8 py-4 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_18px_45px_rgba(36,76,45,0.2)] transition hover:-translate-y-0.5 hover:bg-[#3f7344] disabled:cursor-not-allowed disabled:bg-[#9fb59e] disabled:shadow-none"
            >
              {editingProduct ? <Save className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
              {isSaving ? "Saving..." : editingProduct ? "Save Changes" : "Add Product"}
            </button>
          </form>

          <section className="rounded-[32px] border border-[#d7e8cf] bg-white/70 p-4 shadow-[0_24px_70px_rgba(74,112,67,0.1)] sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-[0.26em] text-[#6d9368]">
                  Catalog
                </p>
                <h2 className="text-3xl font-black text-[#1f4f29]">
                  Product List
                </h2>
              </div>
            </div>

            {isLoading ? (
              <div className="rounded-[24px] bg-white/80 p-8 text-center font-black text-[#527d4e]">
                Loading products...
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-[24px] bg-white/80 p-8 text-center">
                <h3 className="mb-2 text-2xl font-black">Belum ada produk</h3>
                <p className="font-medium text-[#527d4e]">
                  Tambahkan produk pertama lewat form di samping.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <article
                    key={product.id}
                    className="grid gap-4 rounded-[24px] border border-[#d7e8cf] bg-white/85 p-4 sm:grid-cols-[112px_1fr_auto] sm:items-center"
                  >
                    <img
                      src={product.image_url ?? "/next.svg"}
                      alt={product.name}
                      className="h-28 w-full rounded-[18px] object-cover sm:w-28"
                    />

                    <div>
                      <h3 className="text-2xl font-black text-[#1f4f29]">
                        {product.name}
                      </h3>
                      <p className="mt-1 font-black text-[#2d6b37]">
                        Rp {formatPrice(product.price)}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm font-medium leading-relaxed text-[#527d4e]">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex gap-2 sm:flex-col">
                      <button
                        type="button"
                        onClick={() => handleEdit(product)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef7e8] text-[#244c2d] transition hover:bg-[#c8e8bf]"
                        aria-label={`Edit ${product.name}`}
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(product)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600 transition hover:bg-red-100"
                        aria-label={`Hapus ${product.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
