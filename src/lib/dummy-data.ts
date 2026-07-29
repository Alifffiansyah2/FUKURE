export type Product = {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  price: number;
};

export const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Matcha Mochi Classic",
    description:
      "Mochi lembut dengan isian matcha creamy, rasa earthy yang seimbang, dan tekstur chewy.",
    image_url:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200&auto=format&fit=crop",
    price: 25000,
  },
  {
    id: "2",
    name: "Strawberry Mochi",
    description:
      "Mochi manis segar dengan sentuhan strawberry dan krim ringan untuk preorder harian.",
    image_url:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1200&auto=format&fit=crop",
    price: 28000,
  },
  {
    id: "3",
    name: "Chocolate Mochi",
    description:
      "Mochi premium dengan isian cokelat lembut, cocok untuk hadiah kecil atau dessert sore.",
    image_url:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop",
    price: 27000,
  },
  {
    id: "4",
    name: "Mango Mochi",
    description:
      "Mochi tropis dengan rasa mango manis dan aroma buah yang ringan.",
    image_url:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1200&auto=format&fit=crop",
    price: 30000,
  },
];

export function getDummyProducts(limit?: number) {
  return typeof limit === "number" ? dummyProducts.slice(0, limit) : dummyProducts;
}

export function getDummyProduct(id: string) {
  return dummyProducts.find((product) => product.id === id) ?? null;
}
